import type { Metadata } from 'next'
import ClassStructureClient from './ClassStructureClient'

export const metadata: Metadata = {
  title: 'Class Structure',
  description: 'How courses progress from foundations to synthesis and judgment.',
}

export default function Page() {
  return <ClassStructureClient />
}
