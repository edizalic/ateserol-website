import type { Metadata } from 'next'
import LibraryClient from './LibraryClient'

export const metadata: Metadata = {
  title: 'Resources & Library',
  description: 'An academic resource hub: presentations, teaching materials, reading lists, and data sources.',
}

export default function Page() {
  return <LibraryClient />
}
