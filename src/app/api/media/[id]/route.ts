import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { uploadedFilePath } from '@/lib/uploads'

type Params = { params: Promise<{ id: string }> }

// GET /api/media/[id] — public, serve an uploaded media file
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params

  let file
  try {
    file = await prisma.mediaFile.findUnique({ where: { id } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const filePath = uploadedFilePath(file.filename)
  try {
    await fs.access(filePath)
  } catch {
    return NextResponse.json({ error: 'File not found on disk' }, { status: 404 })
  }

  const buffer = await fs.readFile(filePath)

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': file.mimeType || 'application/octet-stream',
      'Content-Length': String(file.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
