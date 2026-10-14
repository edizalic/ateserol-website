import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'
import { streamUploadFiles, uploadedFilePath } from '@/lib/uploads'

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
  const session = getSessionFromRequest(req)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await params

  let reflection
  try {
    reflection = await prisma.reflection.findUnique({ where: { slug }, select: { id: true } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
  if (!reflection) return NextResponse.json({ error: 'Reflection not found' }, { status: 404 })

  let savedFiles
  try {
    savedFiles = await streamUploadFiles(req)
  } catch (err) {
    console.error('[POST reflections/files] stream/disk write failed:', err)
    return NextResponse.json({ error: 'Could not save file to disk. Check uploads directory permissions.' }, { status: 500 })
  }

  if (!savedFiles.length) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 })
  }

  const created = []
  for (const f of savedFiles) {
    try {
      const record = await prisma.postFile.create({
        data: {
          reflectionId: reflection.id,
          filename: f.storedName,
          originalName: f.originalName,
          mimeType: f.mimeType || 'application/octet-stream',
          size: f.size,
        },
        select: { id: true, originalName: true, mimeType: true, size: true, createdAt: true },
      })
      created.push(record)
    } catch (err) {
      await fs.unlink(uploadedFilePath(f.storedName)).catch(() => {})
      console.error('[POST reflections/files] db write failed:', err)
      return NextResponse.json({ error: 'Could not save file record to database.' }, { status: 500 })
    }
  }

  return NextResponse.json(created, { status: 201 })
}
