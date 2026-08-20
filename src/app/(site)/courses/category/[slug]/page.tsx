import type { Metadata } from 'next'
import CourseCategoryClient from './CourseCategoryClient'

export const metadata: Metadata = {
  title: 'Course Category',
  description: 'Teaching area rationale and topic map.',
}

export default function Page() {
  return <CourseCategoryClient />
}
