import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { UpdateCourseSchema } from '@/lib/schemas/course.schema'
import { getSession } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const course = await prisma.course.findFirst({
      where: { OR: [{ id }, { slug: id }], published: true },
      include: { category: true },
    })
    if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(course)
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
    const parsed = UpdateCourseSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const course = await prisma.course.update({ where: { id }, data: parsed.data })
    return NextResponse.json(course)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.course.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
