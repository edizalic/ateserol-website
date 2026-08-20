import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateStudentProjectSchema } from '@/lib/schemas/student-project.schema'
import { getSession } from '@/lib/auth'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const courseId = searchParams.get('courseId')
  const year = searchParams.get('year')

  try {
    const projects = await prisma.studentProject.findMany({
      where: {
        ...(courseId ? { courseId } : {}),
        ...(year ? { year: parseInt(year) } : {}),
      },
      include: { course: true },
      orderBy: { year: 'desc' },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateStudentProjectSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const project = await prisma.studentProject.create({ data: parsed.data })
    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
