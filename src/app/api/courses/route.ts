import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateCourseSchema } from '@/lib/schemas/course.schema'
import { getSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId')
    const published = searchParams.get('published')

    const courses = await prisma.course.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(published !== null ? { published: published === 'true' } : { published: true }),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(courses)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session !== (process.env.SESSION_SECRET ?? 'change-me-in-production')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = CreateCourseSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const course = await prisma.course.create({ data: parsed.data })
    return NextResponse.json(course, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
