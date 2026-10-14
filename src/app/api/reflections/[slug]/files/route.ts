import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import path from 'path'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { ensureUploadsDir, uploadedFilePath } from '@/lib/uploads'

type Params = { params: Promise<{ slug: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

// GET /api/reflections/[slug]/files  — public, list files for a reflection
export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params
  try {
    const reflection = await prisma.reflection.findUnique({ where: { slug }, select: { id: true } })
    if (!reflection) {
      console.warn(`[GET /api/reflections/${slug}/files] reflection not found in DB`)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const files = await prisma.postFile.findMany({
      where: { reflectionId: reflection.id },
      orderBy: { createdAt: 'asc' },
      select: { id: true, originalName: true, mimeType: true, size: true, createdAt: true },
    })
    console.log(`[GET /api/reflections/${slug}/files] found ${files.length} file(s) for reflectionId=${reflection.id}`)
    return NextResponse.json(files)
  } catch (err) {
    console.error(`[GET /api/reflections/${slug}/files] error:`, err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/reflections/[slug]/files  — admin only, upload one or more files
export async function POST(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await params

  let reflection
  try {
    reflection = await prisma.reflection.findUnique({ where: { slug }, select: { id: true } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
  if (!reflection) return NextResponse.json({ error: 'Reflection not found' }, { status: 404 })

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  await ensureUploadsDir()

  const entries = formData.getAll('files') as File[]
  if (!entries.length) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 })
  }

  const created = []
  for (const file of entries) {
    if (!(file instanceof File)) continue
    const ext = path.extname(file.name)
    const storedName = `${randomUUID()}${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    try {
      await fs.writeFile(uploadedFilePath(storedName), buffer)
    } catch (err) {
      console.error('[POST reflections/files] disk write failed:', err)
      return NextResponse.json({ error: 'Could not save file to disk. Check uploads directory permissions.' }, { status: 500 })
    }

    try {
      const record = await prisma.postFile.create({
        data: {
          reflectionId: reflection.id,
          filename: storedName,
          originalName: file.name,
          mimeType: file.type || 'application/octet-stream',
          size: buffer.length,
        },
        select: { id: true, originalName: true, mimeType: true, size: true, createdAt: true },
      })
      created.push(record)
    } catch (err) {
      // DB write failed — remove the orphaned file from disk
      await fs.unlink(uploadedFilePath(storedName)).catch(() => {})
      console.error('[POST reflections/files] db write failed:', err)
      return NextResponse.json({ error: 'Could not save file record to database.' }, { status: 500 })
    }
  }

  return NextResponse.json(created, { status: 201 })
}
