import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_COOKIE = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'change-me-in-production'

export async function createSession(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value ?? null
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session || session !== SESSION_SECRET) {
    redirect('/admin/login')
  }
}

export function validateAdminToken(token: string): boolean {
  return token === SESSION_SECRET
}
