'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface LocalizedString { en: string; tr: string; fr?: string }

interface Reflection {
  id: string
  slug: string
  title: unknown
  status: string
  createdAt: Date
}

function locStr(val: unknown): string {
  if (val && typeof val === 'object' && 'en' in val) return (val as LocalizedString).en
  return String(val ?? '')
}

export default function AdminReflectionsClient({ reflections }: { reflections: Reflection[] }) {
  const router = useRouter()

  async function handleDelete(r: Reflection) {
    if (!confirm(`Delete "${locStr(r.title)}"?`)) return
    await fetch(`/api/reflections/${r.slug}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={reflections}
      columns={[
        { header: 'Title', accessor: r => locStr(r.title) },
        { header: 'Slug', accessor: r => r.slug, width: '180px' },
        { header: 'Status', accessor: r => r.status, width: '100px' },
        { header: 'Created', accessor: r => new Date(r.createdAt).toLocaleDateString(), width: '110px' },
      ]}
      editHref={r => `/admin/reflections/${r.slug}`}
      onDelete={handleDelete}
      emptyMessage="No reflections yet."
    />
  )
}
