import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Reflection' }

export default function NewReflectionPage() {
  return (
    <AdminForm
      title="New Reflection"
      apiPath="/api/reflections"
      method="POST"
      redirectTo="/admin/reflections"
      fields={[
        { key: 'slug', label: 'Slug', required: true, placeholder: 'e.g. on-teaching-purpose' },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'subtitle', label: 'Subtitle (optional)', localized: true },
        { key: 'excerpt', label: 'Excerpt', localized: true, type: 'textarea', rows: 2 },
        { key: 'body', label: 'Body', localized: true, type: 'textarea', rows: 12 },
        { key: 'category', label: 'Category', localized: true },
        {
          key: 'status', label: 'Status', type: 'select',
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'forthcoming', label: 'Forthcoming' },
            { value: 'published', label: 'Published' },
          ],
        },
        { key: 'publishedAt', label: 'Publish Date', type: 'date' },
        { key: 'featured', label: 'Featured', type: 'checkbox' },
      ]}
    />
  )
}
