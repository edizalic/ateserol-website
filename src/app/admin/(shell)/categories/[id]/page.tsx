import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit Category' }

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let category
  try {
    category = await prisma.category.findUnique({ where: { id } })
  } catch { /* db not connected */ }

  if (!category) notFound()

  return (
    <AdminForm
      title="Edit Category"
      apiPath={`/api/categories/${id}`}
      method="PUT"
      redirectTo="/admin/categories"
      initialValues={{ name: category.name }}
      fields={[
        { key: 'name', label: 'Name', localized: true, required: true },
      ]}
    />
  )
}
