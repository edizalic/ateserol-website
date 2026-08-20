import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'Edit Portfolio Entry' }

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let entry
  try {
    entry = await prisma.portfolioEntry.findUnique({ where: { id } })
  } catch { /* db not connected */ }

  if (!entry) notFound()

  return (
    <AdminForm
      title="Edit Portfolio Entry"
      apiPath={`/api/portfolio/${id}`}
      method="PUT"
      redirectTo="/admin/portfolio"
      initialValues={entry as Record<string, unknown>}
      fields={[
        {
          key: 'type', label: 'Type', type: 'select', required: true,
          options: [
            { value: 'research', label: 'Research' },
            { value: 'project', label: 'Project' },
            { value: 'event', label: 'Event' },
          ],
        },
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 4 },
        { key: 'url', label: 'URL (optional)', type: 'url' },
        { key: 'imageUrl', label: 'Image URL (optional)', type: 'url' },
        { key: 'date', label: 'Date (optional)', type: 'date' },
        { key: 'tags', label: 'Tags (comma-separated)', placeholder: 'strategy, research, AI' },
        { key: 'featured', label: 'Featured', type: 'checkbox' },
        { key: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
