import type { Metadata } from 'next'
import ProgressionClient from './ProgressionClient'

export const metadata: Metadata = {
  title: 'Four-Year Learning Progression',
  description: 'The undergraduate business curriculum organized as a two-tier progression from foundations to synthesis and judgment.',
}

export default function Page() {
  return <ProgressionClient />
}
