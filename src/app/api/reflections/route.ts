import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateReflectionSchema } from '@/lib/schemas/reflection.schema'
import { categoryConnect } from '@/lib/categories'
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
      // Admins can filter by any status or get all.
      // Public visitors get published + forthcoming (so forthcoming titles are visible on the list).
      where: admin
        ? (status ? { status } : {})
        : (status === 'forthcoming' ? { status: 'forthcoming' } : { status: 'published' }),
      include: { categories: true },
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
    console.log('[POST /api/reflections] body received:', JSON.stringify(body, null, 2))

    const parsed = CreateReflectionSchema.safeParse(body)
    if (!parsed.success) {
      const flat = parsed.error.flatten()
      console.error('[POST /api/reflections] validation failed:', JSON.stringify(flat, null, 2))
      return NextResponse.json({ error: 'Validation failed', details: flat }, { status: 400 })
    }

    console.log('[POST /api/reflections] parsed ok, creating…')
    const { categoryIds, ...data } = parsed.data
    const reflection = await prisma.reflection.create({
      data: { ...data, categories: categoryConnect(categoryIds ?? []) },
    })
    console.log('[POST /api/reflections] created id=%s slug=%s', reflection.id, reflection.slug)
    return NextResponse.json(reflection, { status: 201 })
  } catch (err) {
    console.error('[POST /api/reflections] unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
