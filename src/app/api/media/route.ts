import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import path from 'path'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { ensureUploadsDir, uploadedFilePath } from '@/lib/uploads'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

// POST /api/media — admin only, upload a single image or file
// Returns { id, url } where url = "/api/media/{id}"
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  await ensureUploadsDir()

  const ext = path.extname(file.name)
  const storedName = `${randomUUID()}${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(uploadedFilePath(storedName), buffer)

  const record = await prisma.mediaFile.create({
    data: {
      filename: storedName,
      mimeType: file.type || 'application/octet-stream',
      size: buffer.length,
    },
  })

  return NextResponse.json({ id: record.id, url: `/api/media/${record.id}` }, { status: 201 })
}
