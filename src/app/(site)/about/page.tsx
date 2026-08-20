import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About — Ateş Erol',
  description: 'Teaching business as a practice of careful judgment. About Ateş Erol, lecturer in business education.',
}

export default function Page() {
  return <AboutClient />
}
