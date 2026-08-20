'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface LocalizedString { en: string; tr: string; fr?: string }

interface AcademicEvent {
  id: string
  title: unknown
  date: Date
  location: string | null
  featured: boolean
}

function locStr(val: unknown): string {
  if (val && typeof val === 'object' && 'en' in val) return (val as LocalizedString).en
  return String(val ?? '')
}

export default function AdminEventsClient({ events }: { events: AcademicEvent[] }) {
  const router = useRouter()

  async function handleDelete(e: AcademicEvent) {
    if (!confirm(`Delete "${locStr(e.title)}"?`)) return
    await fetch(`/api/events/${e.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={events}
      columns={[
        { header: 'Title', accessor: r => locStr(r.title) },
        { header: 'Date', accessor: r => new Date(r.date).toLocaleDateString(), width: '110px' },
        { header: 'Location', accessor: r => r.location ?? '—', width: '140px' },
        { header: 'Featured', accessor: r => r.featured ? 'Yes' : 'No', width: '80px' },
      ]}
      editHref={r => `/admin/events/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No events yet."
    />
  )
}
