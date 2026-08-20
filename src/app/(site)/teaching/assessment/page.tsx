import type { Metadata } from 'next'
import AssessmentClient from './AssessmentClient'

export const metadata: Metadata = {
  title: 'Assessment Philosophy',
  description: 'Assess the thing the course is actually trying to teach.',
}

export default function Page() {
  return <AssessmentClient />
}
