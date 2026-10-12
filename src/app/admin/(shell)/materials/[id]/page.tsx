import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'
import AdminFilesPanel from '@/components/admin/AdminFilesPanel'

export const metadata: Metadata = { title: 'Edit Material' }

export default async function EditMaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let material
  try {
    material = await prisma.teachingMaterial.findUnique({ where: { id } })
  } catch { /* db not connected */ }

  if (!material) notFound()

  return (
    <>
    <AdminForm
      title="Edit Teaching Material"
      apiPath={`/api/materials/${id}`}
      method="PUT"
      redirectTo="/admin/materials"
      initialValues={material as Record<string, unknown>}
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
        { key: 'fileUrl', label: 'File (optional)', type: 'upload' },
        { key: 'course', label: 'Course (optional)' },
        { key: 'semester', label: 'Semester (optional)' },
        { key: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
    <AdminFilesPanel apiPath={`/api/entity-files/material/${id}`} />
    </>
  )
}
