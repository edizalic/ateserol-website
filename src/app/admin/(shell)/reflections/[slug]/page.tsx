import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'Edit Reflection' }

export default async function EditReflectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let reflection
  try {
    reflection = await prisma.reflection.findUnique({ where: { slug } })
  } catch { /* db not connected */ }

  if (!reflection) notFound()

  return (
    <AdminForm
      title="Edit Reflection"
      apiPath={`/api/reflections/${slug}`}
      method="PUT"
      redirectTo="/admin/reflections"
      initialValues={reflection as Record<string, unknown>}
      fields={[
        { key: 'slug', label: 'Slug', required: true },
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
