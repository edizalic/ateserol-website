import type { Metadata } from 'next'
import ReflectionsClient from './ReflectionsClient'

export const metadata: Metadata = {
  title: 'Reflections — Notes on Teaching & Business',
  description: 'Shorter essays drawn from questions that recur in teaching: frameworks, projects, AI, and honest reasoning.',
}

export default function Page() {
  return <ReflectionsClient />
}
