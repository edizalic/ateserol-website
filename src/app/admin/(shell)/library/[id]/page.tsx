import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'
import AdminFilesPanel from '@/components/admin/AdminFilesPanel'
import { loadCategoryFieldOptions } from '@/lib/categories'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit Library Resource' }

export default async function EditLibraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let resource
  let options: { value: string; label: string }[] = []
  try {
    ;[resource, options] = await Promise.all([
      prisma.libraryResource.findUnique({ where: { id }, include: { categories: { select: { id: true } } } }),
      loadCategoryFieldOptions(),
    ])
  } catch { /* db not connected */ }

  if (!resource) notFound()

  return (
    <>
    <AdminForm
      title="Edit Library Resource"
      apiPath={`/api/library/${id}`}
      method="PUT"
      redirectTo="/admin/library"
      initialValues={{
        ...(resource as Record<string, unknown>),
        categoryIds: resource.categories.map(category => category.id),
      }}
      fields={[
        { key: 'title', label: 'Title (plain text)', required: true },
        { key: 'categoryIds', label: 'Categories', type: 'multiselect', options },
        { key: 'author', label: 'Author (optional)' },
        { key: 'url', label: 'URL (optional)', type: 'url' },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
    <AdminFilesPanel apiPath={`/api/entity-files/library/${id}`} />
    </>
  )
}
