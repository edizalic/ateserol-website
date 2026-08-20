import type { Metadata } from 'next'
import PresentationsClient from './PresentationsClient'

export const metadata: Metadata = {
  title: 'Presentations & Teaching Materials',
  description: 'A working archive of presentations, class notes, templates and selected teaching materials.',
}

export default function Page() {
  return <PresentationsClient />
}
