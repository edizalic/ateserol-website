import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'For academic collaboration, research enquiries, or questions about teaching and course material.',
}

export default function Page() {
  return <ContactClient />
}
