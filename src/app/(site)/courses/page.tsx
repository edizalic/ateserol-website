import type { Metadata } from 'next'
import CoursesClient from './CoursesClient'

export const metadata: Metadata = {
  title: 'Teaching Areas & Courses',
  description: 'Six teaching areas covering e-commerce, management, project management, strategy, sectoral business, and research methods.',
}

export default function Page() {
  return <CoursesClient />
}
