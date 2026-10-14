import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { UpdateReflectionSchema } from '@/lib/schemas/reflection.schema'
import { categorySet } from '@/lib/categories'
import { getSession } from '@/lib/auth'

type Params = { params: Promise<{ slug: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params
  try {
    // Return published reflections to the public; forthcoming/draft require admin.
    const reflection = await prisma.reflection.findFirst({
      where: { slug, status: { in: ['published', 'forthcoming'] } },
      include: { categories: true },
    })
    if (!reflection) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(reflection)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { slug } = await params
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = UpdateReflectionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const { categoryIds, ...data } = parsed.data
    const reflection = await prisma.reflection.update({
      where: { slug },
      data: {
        ...data,
        ...(categoryIds !== undefined ? { categories: categorySet(categoryIds) } : {}),
      },
    })
    return NextResponse.json(reflection)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { slug } = await params
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.reflection.delete({ where: { slug } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
