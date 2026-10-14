import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import path from 'path'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { ensureUploadsDir, uploadedFilePath } from '@/lib/uploads'

type Params = { params: Promise<{ entityType: string; entityId: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

// GET /api/entity-files/[entityType]/[entityId] — public, list files
export async function GET(_req: NextRequest, { params }: Params) {
  const { entityType, entityId } = await params
  try {
    const files = await prisma.entityFile.findMany({
      where: { entityType, entityId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, originalName: true, mimeType: true, size: true, createdAt: true },
    })
    return NextResponse.json(files)
  } catch (err) {
    console.error(`[GET /api/entity-files/${entityType}/${entityId}] error:`, err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/entity-files/[entityType]/[entityId] — admin only, upload files
export async function POST(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { entityType, entityId } = await params

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
      console.error(`[POST entity-files/${entityType}/${entityId}] disk write failed:`, err)
      return NextResponse.json({ error: 'Could not save file to disk. Check uploads directory permissions.' }, { status: 500 })
    }

    try {
      const record = await prisma.entityFile.create({
        data: {
          entityType,
          entityId,
          filename: storedName,
          originalName: file.name,
          mimeType: file.type || 'application/octet-stream',
          size: buffer.length,
        },
        select: { id: true, originalName: true, mimeType: true, size: true, createdAt: true },
      })
      created.push(record)
    } catch (err) {
      await fs.unlink(uploadedFilePath(storedName)).catch(() => {})
      console.error(`[POST entity-files/${entityType}/${entityId}] db write failed:`, err)
      return NextResponse.json({ error: 'Could not save file record to database.' }, { status: 500 })
    }
  }

  return NextResponse.json(created, { status: 201 })
}
