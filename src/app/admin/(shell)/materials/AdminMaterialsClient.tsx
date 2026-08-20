'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface LocalizedString { en: string; tr: string; fr?: string }

interface TeachingMaterial {
  id: string
  title: unknown
  type: string
  course: string | null
  published: boolean
  createdAt: Date
}

function locStr(val: unknown): string {
  if (val && typeof val === 'object' && 'en' in val) return (val as LocalizedString).en
  return String(val ?? '')
}

export default function AdminMaterialsClient({ materials }: { materials: TeachingMaterial[] }) {
  const router = useRouter()

  async function handleDelete(m: TeachingMaterial) {
    if (!confirm(`Delete "${locStr(m.title)}"?`)) return
    await fetch(`/api/materials/${m.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={materials}
      columns={[
        { header: 'Title', accessor: r => locStr(r.title) },
        { header: 'Type', accessor: r => r.type, width: '110px' },
        { header: 'Course', accessor: r => r.course ?? '—', width: '140px' },
        { header: 'Published', accessor: r => r.published ? 'Yes' : 'No', width: '80px' },
        { header: 'Created', accessor: r => new Date(r.createdAt).toLocaleDateString(), width: '110px' },
      ]}
      editHref={r => `/admin/materials/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No materials yet."
    />
  )
}
