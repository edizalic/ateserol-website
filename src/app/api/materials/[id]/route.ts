import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { UpdateTeachingMaterialSchema } from '@/lib/schemas/material.schema'
import { getSession } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const material = await prisma.teachingMaterial.findUnique({ where: { id } })
    if (!material) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(material)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = UpdateTeachingMaterialSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const material = await prisma.teachingMaterial.update({ where: { id }, data: parsed.data })
    return NextResponse.json(material)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.teachingMaterial.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
