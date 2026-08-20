import type { Metadata } from 'next'
import TeachingEthosClient from './TeachingEthosClient'

export const metadata: Metadata = {
  title: 'Teaching Ethos',
  description: 'Clear expectations, careful judgment, shared responsibility in the business classroom.',
}

export default function Page() {
  return <TeachingEthosClient />
}
