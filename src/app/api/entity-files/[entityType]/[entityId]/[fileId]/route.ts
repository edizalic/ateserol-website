import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { uploadedFilePath } from '@/lib/uploads'

type Params = { params: Promise<{ entityType: string; entityId: string; fileId: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

// GET /api/entity-files/[entityType]/[entityId]/[fileId] — public, download a file
export async function GET(_req: NextRequest, { params }: Params) {
  const { fileId } = await params
  try {
    const file = await prisma.entityFile.findUnique({ where: { id: fileId } })
    if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const buffer = await fs.readFile(uploadedFilePath(file.filename))
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(file.originalName)}"`,
        'Content-Length': String(buffer.length),
      },
    })
  } catch (err) {
    console.error('[GET entity-file] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/entity-files/[entityType]/[entityId]/[fileId] — admin only
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { fileId } = await params
  try {
    const file = await prisma.entityFile.findUnique({ where: { id: fileId } })
    if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Best-effort: remove from disk
    try { await fs.unlink(uploadedFilePath(file.filename)) } catch { /* already gone */ }

    await prisma.entityFile.delete({ where: { id: fileId } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[DELETE entity-file] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
