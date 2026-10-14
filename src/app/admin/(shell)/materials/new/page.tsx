import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Material' }

export default function NewMaterialPage() {
  return (
    <AdminForm
      title="New Teaching Material"
      apiPath="/api/materials"
      method="POST"
      redirectTo="/admin/materials"
      fileUploadPath="/api/entity-files/material/{id}"
      fields={[
        { key: 'title', label: 'Title', localized: true, required: true },
        {
          key: 'type', label: 'Type', type: 'select', required: true,
          options: [
            { value: 'presentation', label: 'Presentation' },
            { value: 'note', label: 'Note' },
            { value: 'template', label: 'Template' },
            { value: 'dataset', label: 'Dataset' },
          ],
        },
        { key: 'course', label: 'Course (optional)', placeholder: 'e.g. BUS 101' },
        { key: 'semester', label: 'Semester (optional)', placeholder: 'e.g. Spring 2026' },
        { key: 'published', label: 'Published', type: 'checkbox' },
        { key: 'files', label: 'Attach Files (optional)', type: 'files' },
      ]}
    />
  )
}
