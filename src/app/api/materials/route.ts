import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateTeachingMaterialSchema } from '@/lib/schemas/material.schema'
import { getSession } from '@/lib/auth'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')

  try {
    const materials = await prisma.teachingMaterial.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(materials)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateTeachingMaterialSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const material = await prisma.teachingMaterial.create({ data: parsed.data })
    return NextResponse.json(material, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
