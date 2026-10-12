import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AdminForm from '@/components/admin/AdminForm'
import AdminFilesPanel from '@/components/admin/AdminFilesPanel'

export const metadata: Metadata = { title: 'Edit Event' }

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let event
  try {
    event = await prisma.academicEvent.findUnique({ where: { id } })
  } catch { /* db not connected */ }

  if (!event) notFound()

  return (
    <>
    <AdminForm
      title="Edit Academic Event"
      apiPath={`/api/events/${id}`}
      method="PUT"
      redirectTo="/admin/events"
      initialValues={event as Record<string, unknown>}
      fields={[
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'date', label: 'Date', type: 'date', required: true },
        { key: 'location', label: 'Location (optional)' },
        { key: 'type', label: 'Event Type (optional)' },
        {
          key: 'status', label: 'Status', type: 'select',
          options: [
            { value: 'Upcoming', label: 'Upcoming' },
            { value: 'Past', label: 'Past' },
          ],
        },
        { key: 'featured', label: 'Featured', type: 'checkbox' },
      ]}
    />
    <AdminFilesPanel apiPath={`/api/entity-files/event/${id}`} />
    </>
  )
}
