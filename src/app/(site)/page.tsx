import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Ateş Erol — Lecturer, Business Education',
  description:
    'Teaching, research, applied projects and notes on business education, feasibility and management.',
  openGraph: {
    title: 'Ateş Erol — Lecturer, Business Education',
    description:
      'Teaching, research, applied projects and notes on business education, feasibility and management.',
  },
}

export default function Page() {
  return <HomePageClient />
}
