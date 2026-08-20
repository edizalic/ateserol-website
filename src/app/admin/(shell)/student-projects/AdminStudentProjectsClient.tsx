'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface Project {
  id: string
  title: string
  year: number | null
  published: boolean
  course?: { title: unknown } | null
}

export default function AdminStudentProjectsClient({ projects }: { projects: Project[] }) {
  const router = useRouter()

  async function handleDelete(p: Project) {
    if (!confirm(`Delete "${p.title}"?`)) return
    await fetch(`/api/student-projects/${p.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={projects}
      columns={[
        { header: 'Title', accessor: r => r.title },
        { header: 'Year', accessor: r => r.year ?? '—', width: '70px' },
        { header: 'Published', accessor: r => r.published ? 'Yes' : 'No', width: '80px' },
      ]}
      editHref={r => `/admin/student-projects/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No student projects yet."
    />
  )
}
