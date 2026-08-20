'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface LibraryResource {
  id: string
  title: string
  category: string
  author: string | null
  published: boolean
  createdAt: Date
}

export default function AdminLibraryClient({ resources }: { resources: LibraryResource[] }) {
  const router = useRouter()

  async function handleDelete(r: LibraryResource) {
    if (!confirm(`Delete "${r.title}"?`)) return
    await fetch(`/api/library/${r.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={resources}
      columns={[
        { header: 'Title', accessor: r => r.title },
        { header: 'Category', accessor: r => r.category, width: '120px' },
        { header: 'Author', accessor: r => r.author ?? '—', width: '140px' },
        { header: 'Published', accessor: r => r.published ? 'Yes' : 'No', width: '80px' },
        { header: 'Created', accessor: r => new Date(r.createdAt).toLocaleDateString(), width: '110px' },
      ]}
      editHref={r => `/admin/library/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No library resources yet."
    />
  )
}
