'use client'

import { useRouter } from 'next/navigation'
import AdminTable from '@/components/admin/AdminTable'

interface Category {
  id: string
  name: unknown
  createdAt: Date
  _count: { courses: number; reflections: number; libraryItems: number }
}

function lang(val: unknown, code: 'en' | 'tr' | 'fr'): string {
  if (val && typeof val === 'object' && code in val) {
    const text = (val as Record<string, unknown>)[code]
    if (typeof text === 'string' && text.trim()) return text
  }
  return '—'
}

export default function AdminCategoriesClient({ categories }: { categories: Category[] }) {
  const router = useRouter()

  async function handleDelete(category: Category) {
    const name = lang(category.name, 'en')
    if (!confirm(`Delete "${name}"? It will be removed from anything that uses it.`)) return
    await fetch(`/api/categories/${category.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <AdminTable
      rows={categories}
      columns={[
        { header: 'English', accessor: r => lang(r.name, 'en') },
        { header: 'Turkish', accessor: r => lang(r.name, 'tr') },
        { header: 'French', accessor: r => lang(r.name, 'fr') },
        {
          header: 'Used',
          accessor: r => String(r._count.courses + r._count.reflections + r._count.libraryItems),
          width: '80px',
        },
      ]}
      editHref={r => `/admin/categories/${r.id}`}
      onDelete={handleDelete}
      emptyMessage="No categories yet. Create one to use it on courses, reflections, and library resources."
    />
  )
}
