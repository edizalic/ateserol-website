import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'admin_session'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = req.cookies.get(SESSION_COOKIE)?.value
    const secret = process.env.SESSION_SECRET ?? 'change-me-in-production'

    if (!session || session !== secret) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
