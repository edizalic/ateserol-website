import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'
import { loadCategoryFieldOptions } from '@/lib/categories'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'New Course' }

export default async function NewCoursePage() {
  let options: { value: string; label: string }[] = []
  try {
    options = await loadCategoryFieldOptions()
  } catch { /* db not connected */ }

  return (
    <AdminForm
      title="New Course"
      apiPath="/api/courses"
      method="POST"
      redirectTo="/admin/courses"
      fileUploadPath="/api/entity-files/course/{id}"
      fields={[
        { key: 'slug', label: 'Slug', required: true, placeholder: 'e.g. intro-to-business' },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'subtitle', label: 'Subtitle (optional)', localized: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 4 },
        { key: 'categoryIds', label: 'Categories', type: 'multiselect', options },
        { key: 'published', label: 'Published', type: 'checkbox' },
        { key: 'files', label: 'Attach Files (optional)', type: 'files' },
      ]}
    />
  )
}
