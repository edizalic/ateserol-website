import type { Metadata } from 'next'
import ClassificationClient from './ClassificationClient'

export const metadata: Metadata = {
  title: 'Course Classification',
  description: 'How courses are classified along two dimensions: function and type — quantitative or qualitative reasoning.',
}

export default function Page() {
  return <ClassificationClient />
}
