import type { Metadata } from 'next'
import AdminForm from '@/components/admin/AdminForm'

export const metadata: Metadata = { title: 'New Event' }

export default function NewEventPage() {
  return (
    <AdminForm
      title="New Academic Event"
      apiPath="/api/events"
      method="POST"
      redirectTo="/admin/events"
      fields={[
        { key: 'title', label: 'Title', localized: true, required: true },
        { key: 'description', label: 'Description', localized: true, type: 'textarea', rows: 3 },
        { key: 'date', label: 'Date', type: 'date', required: true },
        { key: 'location', label: 'Location (optional)' },
        { key: 'type', label: 'Event Type (optional)', placeholder: 'e.g. Conference, Workshop, Lecture' },
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
  )
}
