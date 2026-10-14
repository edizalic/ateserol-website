import type { Metadata } from 'next'
import AdminShell from '@/components/admin/AdminShell'

// All admin pages must render at request time so they always reflect the
// latest database state. Without this, Next.js pre-renders them at build
// time when the database is unreachable, producing empty static pages.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s — Admin | Ateş Erol' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
