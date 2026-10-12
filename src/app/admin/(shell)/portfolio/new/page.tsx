import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Portfolio Entry' }

export default function NewPortfolioPage() {
  return (
    <AdminForm
      title="New Portfolio Entry"
      apiPath="/api/portfolio"
      method="POST"
      redirectTo="/admin/portfolio"
      fileUploadPath="/api/entity-files/portfolio/{id}"
      fields={[
        {
          key: 'type', label: 'Type', type: 'select', required: true,
          options: [
            { value: 'research', label: 'Research' },
            { value: 'project', label: 'Project' },
            { value: 'event', label: 'Event' },
          ],
        },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 4 },
        { key: 'url', label: 'URL (optional)', type: 'url' },
        { key: 'imageUrl', label: 'Image (optional)', type: 'image' },
        { key: 'date', label: 'Date (optional)', type: 'date' },
        { key: 'tags', label: 'Tags (comma-separated)', placeholder: 'strategy, research, AI' },
        { key: 'featured', label: 'Featured', type: 'checkbox' },
        { key: 'published', label: 'Published', type: 'checkbox' },
        { key: 'files', label: 'Attach Files (optional)', type: 'files' },
      ]}
    />
  )
}
