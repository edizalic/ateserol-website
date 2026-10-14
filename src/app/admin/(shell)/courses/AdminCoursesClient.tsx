'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface LocalizedString { en: string; tr: string; fr?: string }

interface Course {
  id: string
  slug: string
  title: unknown
  published: boolean
  createdAt: Date
  categories?: { name: unknown }[]
}

function locStr(val: unknown): string {
  if (val && typeof val === 'object' && 'en' in val) return (val as LocalizedString).en
  return String(val ?? '')
}

export default function AdminCoursesClient({ courses }: { courses: Course[] }) {
  const router = useRouter()

  async function handleDelete(course: Course) {
    if (!confirm(`Delete "${locStr(course.title)}"?`)) return
    await fetch(`/api/courses/${course.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={courses}
      columns={[
        { header: 'Title', accessor: r => locStr(r.title) },
        { header: 'Slug', accessor: r => r.slug, width: '160px' },
        { header: 'Categories', accessor: r => r.categories?.length ? r.categories.map(category => locStr(category.name)).filter(Boolean).join(', ') : '—' },
        { header: 'Published', accessor: r => r.published ? 'Yes' : 'No', width: '80px' },
        { header: 'Created', accessor: r => new Date(r.createdAt).toLocaleDateString(), width: '110px' },
      ]}
      editHref={r => `/admin/courses/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No courses yet. Create one to get started."
    />
  )
}
