import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateReflectionSchema } from '@/lib/schemas/reflection.schema'
import { getSession } from '@/lib/auth'
import type { ReflectionStatus } from '@/generated/prisma/client'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') as ReflectionStatus | null
  const session = await getSession()
  const admin = isAdmin(session)

  try {
    const reflections = await prisma.reflection.findMany({
      where: admin ? (status ? { status } : {}) : { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    })
    return NextResponse.json(reflections)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateReflectionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const reflection = await prisma.reflection.create({ data: parsed.data })
    return NextResponse.json(reflection, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
