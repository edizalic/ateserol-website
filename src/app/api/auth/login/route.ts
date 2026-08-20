import { NextRequest, NextResponse } from 'next/server'
import { LoginSchema } from '@/lib/schemas/auth.schema'
import { createSession, validateAdminToken } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { compare } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = LoginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
    }

    const { email, password } = parsed.data

    const admin = await prisma.adminUser.findUnique({ where: { email } })
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await compare(password, admin.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const sessionToken = process.env.SESSION_SECRET ?? 'change-me-in-production'
    await createSession(sessionToken)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
