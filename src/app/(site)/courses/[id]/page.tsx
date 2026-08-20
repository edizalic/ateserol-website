import type { Metadata } from 'next'
import CourseDetailClient from './CourseDetailClient'

export const metadata: Metadata = {
  title: 'Course Detail',
  description: 'Course overview, learning outcomes, weekly schedule and assessment.',
}

export default function Page() {
  return <CourseDetailClient />
}
