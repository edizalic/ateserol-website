import type { Metadata } from 'next'
import TeachingPageClient from './TeachingPageClient'

export const metadata: Metadata = {
  title: 'Teaching',
  description: 'Structured flexibility in the classroom — teaching philosophy, course functions, and approach to business education.',
}

export default function Page() {
  return <TeachingPageClient />
}
