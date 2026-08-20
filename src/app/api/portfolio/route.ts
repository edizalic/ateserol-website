import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CreatePortfolioEntrySchema } from '@/lib/schemas/portfolio.schema'
import { getSession } from '@/lib/auth'
import type { PortfolioType } from '@/generated/prisma/client'

function isAdmin(session: string | null) {
  return session === (process.env.SESSION_SECRET ?? 'change-me-in-production')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') as PortfolioType | null

  try {
    const entries = await prisma.portfolioEntry.findMany({
      where: { ...(type ? { type } : {}), published: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(entries)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = CreatePortfolioEntrySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }
    const entry = await prisma.portfolioEntry.create({ data: parsed.data })
    return NextResponse.json(entry, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
