import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'
import AdminFilesPanel from '@/components/admin/AdminFilesPanel'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit Student Project' }

export default async function EditStudentProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let project
  try {
    project = await prisma.studentProject.findUnique({ where: { id } })
  } catch { /* db not connected */ }

  if (!project) notFound()

  return (
    <>
    <AdminForm
      title="Edit Student Project"
      apiPath={`/api/student-projects/${id}`}
      method="PUT"
      redirectTo="/admin/student-projects"
      initialValues={project as Record<string, unknown>}
      fields={[
        { key: 'title', label: 'Title (plain text)', required: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'year', label: 'Year', type: 'number' },
        { key: 'courseId', label: 'Course ID (optional)' },
        { key: 'imageUrl', label: 'Image (optional)', type: 'image' },
        { key: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
    <AdminFilesPanel apiPath={`/api/entity-files/student-project/${id}`} />
    </>
  )
}
