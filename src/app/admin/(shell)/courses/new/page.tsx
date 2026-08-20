import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Course' }

export default function NewCoursePage() {
  return (
    <AdminForm
      title="New Course"
      apiPath="/api/courses"
      method="POST"
      redirectTo="/admin/courses"
      fields={[
        { key: 'slug', label: 'Slug', required: true, placeholder: 'e.g. intro-to-business' },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'subtitle', label: 'Subtitle (optional)', localized: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 4 },
        { key: 'categoryId', label: 'Category ID (optional)', placeholder: 'Prisma cuid of category' },
        { key: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
