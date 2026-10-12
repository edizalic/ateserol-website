import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import prisma from '@/lib/prisma'
import { uploadedFilePath } from '@/lib/uploads'

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params

  let file
  try {
    file = await prisma.postFile.findUnique({ where: { id } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const filePath = uploadedFilePath(file.filename)

  // Check file exists on disk
  try {
    await fs.promises.access(filePath)
  } catch {
    return NextResponse.json({ error: 'File not found on disk' }, { status: 404 })
  }

  const fileBuffer = await fs.promises.readFile(filePath)

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': file.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(file.originalName)}"`,
      'Content-Length': String(file.size),
      'Cache-Control': 'private, no-cache',
    },
  })
}
