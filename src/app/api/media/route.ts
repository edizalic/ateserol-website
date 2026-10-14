import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'
import { streamUploadFiles, uploadedFilePath } from '@/lib/uploads'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

// POST /api/media — admin only, upload a single image or file
// Returns { id, url } where url = "/api/media/{id}"
export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let savedFiles
  try {
    savedFiles = await streamUploadFiles(req)
  } catch (err) {
    console.error('[POST /api/media] stream/disk write failed:', err)
    return NextResponse.json({ error: 'Could not save file to disk.' }, { status: 500 })
  }

  const f = savedFiles[0]
  if (!f) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  try {
    const record = await prisma.mediaFile.create({
      data: {
        filename: f.storedName,
        mimeType: f.mimeType || 'application/octet-stream',
        size: f.size,
      },
    })
    return NextResponse.json({ id: record.id, url: `/api/media/${record.id}` }, { status: 201 })
  } catch (err) {
    await fs.unlink(uploadedFilePath(f.storedName)).catch(() => {})
    console.error('[POST /api/media] db write failed:', err)
    return NextResponse.json({ error: 'Could not save file record to database.' }, { status: 500 })
  }
}
