import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { uploadedFilePath } from '@/lib/uploads'

type Params = { params: Promise<{ slug: string; fileId: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

// DELETE /api/reflections/[slug]/files/[fileId]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { fileId } = await params

  let file
  try {
    file = await prisma.postFile.findUnique({ where: { id: fileId } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Delete from disk (best-effort)
  try {
    await fs.unlink(uploadedFilePath(file.filename))
  } catch {
    // File may already be missing — proceed with DB deletion
  }

  try {
    await prisma.postFile.delete({ where: { id: fileId } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
