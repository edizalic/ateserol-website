'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface LocalizedString { en: string; tr: string; fr?: string }

interface PortfolioEntry {
  id: string
  type: string
  title: unknown
  published: boolean
  createdAt: Date
}

function locStr(val: unknown): string {
  if (val && typeof val === 'object' && 'en' in val) return (val as LocalizedString).en
  return String(val ?? '')
}

export default function AdminPortfolioClient({ entries }: { entries: PortfolioEntry[] }) {
  const router = useRouter()

  async function handleDelete(entry: PortfolioEntry) {
    if (!confirm(`Delete "${locStr(entry.title)}"?`)) return
    await fetch(`/api/portfolio/${entry.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={entries}
      columns={[
        { header: 'Title', accessor: r => locStr(r.title) },
        { header: 'Type', accessor: r => r.type, width: '90px' },
        { header: 'Published', accessor: r => r.published ? 'Yes' : 'No', width: '80px' },
        { header: 'Created', accessor: r => new Date(r.createdAt).toLocaleDateString(), width: '110px' },
      ]}
      editHref={r => `/admin/portfolio/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No portfolio entries yet."
    />
  )
}
