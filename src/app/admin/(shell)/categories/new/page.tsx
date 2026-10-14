import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Category' }

export default function NewCategoryPage() {
  return (
    <AdminForm
      title="New Category"
      apiPath="/api/categories"
      method="POST"
      redirectTo="/admin/categories"
      fields={[
        { key: 'name', label: 'Name', localized: true, required: true },
      ]}
    />
  )
}
