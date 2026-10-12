import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Student Project' }

export default function NewStudentProjectPage() {
  return (
    <AdminForm
      title="New Student Project"
      apiPath="/api/student-projects"
      method="POST"
      redirectTo="/admin/student-projects"
      fileUploadPath="/api/entity-files/student-project/{id}"
      fields={[
        { key: 'title', label: 'Title (plain text)', required: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'year', label: 'Year', type: 'number', placeholder: '2026' },
        { key: 'courseId', label: 'Course ID (optional)' },
        { key: 'imageUrl', label: 'Image (optional)', type: 'image' },
        { key: 'published', label: 'Published', type: 'checkbox' },
        { key: 'files', label: 'Attach Files (optional)', type: 'files' },
      ]}
    />
  )
}
