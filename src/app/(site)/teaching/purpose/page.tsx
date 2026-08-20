import type { Metadata } from 'next'
import PurposeClient from './PurposeClient'

export const metadata: Metadata = {
  title: 'Purpose of Business Education',
  description: 'The deeper ideal behind business education and the five pathways available to graduates.',
}

export default function Page() {
  return <PurposeClient />
}
