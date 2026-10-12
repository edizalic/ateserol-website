import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Library Resource' }

export default function NewLibraryResourcePage() {
  return (
    <AdminForm
      title="New Library Resource"
      apiPath="/api/library"
      method="POST"
      redirectTo="/admin/library"
      fileUploadPath="/api/entity-files/library/{id}"
      fields={[
        { key: 'title', label: 'Title (plain text)', required: true },
        { key: 'category', label: 'Category', required: true, placeholder: 'e.g. Strategy, Feasibility' },
        { key: 'author', label: 'Author (optional)' },
        { key: 'url', label: 'URL (optional)', type: 'url' },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'published', label: 'Published', type: 'checkbox' },
        { key: 'files', label: 'Attach Files (optional)', type: 'files' },
      ]}
    />
  )
}
