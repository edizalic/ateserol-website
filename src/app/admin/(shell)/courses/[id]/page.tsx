import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'
import AdminFilesPanel from '@/components/admin/AdminFilesPanel'
import { loadCategoryFieldOptions } from '@/lib/categories'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit Course' }

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let course
  let options: { value: string; label: string }[] = []
  try {
    ;[course, options] = await Promise.all([
      prisma.course.findUnique({ where: { id }, include: { categories: { select: { id: true } } } }),
      loadCategoryFieldOptions(),
    ])
  } catch { /* db not connected */ }

  if (!course) notFound()

  return (
    <>
    <AdminForm
      title="Edit Course"
      apiPath={`/api/courses/${id}`}
      method="PUT"
      redirectTo="/admin/courses"
      initialValues={{
        ...(course as Record<string, unknown>),
        categoryIds: course.categories.map(category => category.id),
      }}
      fields={[
        { key: 'slug', label: 'Slug', required: true },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'subtitle', label: 'Subtitle (optional)', localized: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 4 },
        { key: 'categoryIds', label: 'Categories', type: 'multiselect', options },
        { key: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
    <AdminFilesPanel apiPath={`/api/entity-files/course/${id}`} />
    </>
  )
}
