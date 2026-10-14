import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'
import { loadCategoryFieldOptions } from '@/lib/categories'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'New Reflection' }

export default async function NewReflectionPage() {
  let options: { value: string; label: string }[] = []
  try {
    options = await loadCategoryFieldOptions()
  } catch { /* db not connected */ }

  return (
    <AdminForm
      title="New Reflection"
      apiPath="/api/reflections"
      method="POST"
      redirectTo="/admin/reflections"
      fileUploadPath="/api/reflections/{slug}/files"
      fields={[
        { key: 'slug', label: 'Slug', required: true, placeholder: 'e.g. on-teaching-purpose' },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'body', label: 'Body', localized: true, type: 'textarea', rows: 12 },
        { key: 'categoryIds', label: 'Categories', type: 'multiselect', options },
        {
          key: 'status', label: 'Status', type: 'select',
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'forthcoming', label: 'Forthcoming' },
            { value: 'published', label: 'Published' },
          ],
        },
        { key: 'publishedAt', label: 'Publish Date', type: 'date' },
        { key: 'imageUrl', label: 'Thumbnail', type: 'image' },
        { key: 'featured', label: 'Featured', type: 'checkbox' },
        { key: 'files', label: 'Additional Files', type: 'files' },
      ]}
    />
  )
}
