'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Courses', href: '/admin/courses' },
  { label: 'Portfolio', href: '/admin/portfolio' },
  { label: 'Reflections', href: '/admin/reflections' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Materials', href: '/admin/materials' },
  { label: 'Student Projects', href: '/admin/student-projects' },
  { label: 'Library', href: '/admin/library' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#F8F5F0' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, backgroundColor: '#0B1F33', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.01em' }}>Ateş Erol</div>
          <div style={{ fontSize: 11, color: '#B08D45', marginTop: 2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV.map(item => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'block', padding: '9px 24px',
                fontSize: 13, fontWeight: active ? 600 : 400,
                color: active ? '#FFFFFF' : '#A8B4BE',
                backgroundColor: active ? 'rgba(176,141,69,0.15)' : 'transparent',
                textDecoration: 'none',
                borderLeft: active ? '2px solid #B08D45' : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={handleLogout} disabled={loggingOut} style={{ width: '100%', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#A8B4BE', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.15s' }}>
            {loggingOut ? 'Logging out…' : 'Log Out'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
