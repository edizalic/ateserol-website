import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreateAcademicEventSchema } from '@/lib/schemas/event.schema'
import { getSession } from '@/lib/auth'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const featured = searchParams.get('featured')

  try {
    const events = await prisma.academicEvent.findMany({
      where: featured !== null ? { featured: featured === 'true' } : {},
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(events)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreateAcademicEventSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const event = await prisma.academicEvent.create({ data: parsed.data })
    return NextResponse.json(event, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
