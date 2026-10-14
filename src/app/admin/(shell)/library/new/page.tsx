import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'
import { loadCategoryFieldOptions } from '@/lib/categories'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'New Library Resource' }

export default async function NewLibraryResourcePage() {
  let options: { value: string; label: string }[] = []
  try {
    options = await loadCategoryFieldOptions()
  } catch { /* db not connected */ }

  return (
    <AdminForm
      title="New Library Resource"
      apiPath="/api/library"
      method="POST"
      redirectTo="/admin/library"
      fileUploadPath="/api/entity-files/library/{id}"
      fields={[
        { key: 'title', label: 'Title (plain text)', required: true },
        { key: 'categoryIds', label: 'Categories', type: 'multiselect', options },
        { key: 'author', label: 'Author (optional)' },
        { key: 'url', label: 'URL (optional)', type: 'url' },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'published', label: 'Published', type: 'checkbox' },
        { key: 'files', label: 'Attach Files (optional)', type: 'files' },
      ]}
    />
  )
}
