import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateLibraryResourceSchema } from '@/lib/schemas/library.schema'
import { categoryConnect } from '@/lib/categories'
import { getSession } from '@/lib/auth'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categoryId = searchParams.get('categoryId')

  try {
    const session = await getSession()
    const admin = isAdmin(session)
    const resources = await prisma.libraryResource.findMany({
      where: {
        ...(categoryId ? { categories: { some: { id: categoryId } } } : {}),
        ...(admin ? {} : { published: true }),
      },
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(resources)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateLibraryResourceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const { categoryIds, ...data } = parsed.data
    const resource = await prisma.libraryResource.create({
      data: { ...data, categories: categoryConnect(categoryIds ?? []) },
    })
    return NextResponse.json(resource, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
