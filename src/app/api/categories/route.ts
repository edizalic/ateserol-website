import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateCategorySchema } from '@/lib/schemas/category.schema'
import { uniqueCategorySlug } from '@/lib/categories'
import { getSession } from '@/lib/auth'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET() {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { courses: true, reflections: true, libraryItems: true } } },
    })
    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateCategorySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const slug = await uniqueCategorySlug(parsed.data.name.en)
    const category = await prisma.category.create({
      data: { slug, name: parsed.data.name },
    })
    return NextResponse.json(category, { status: 201 })
  } catch (err) {
    console.error('[POST /api/categories]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
