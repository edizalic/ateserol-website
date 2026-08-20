import type { Metadata } from 'next'
import PathwaysClient from './PathwaysClient'

export const metadata: Metadata = {
  title: 'Student Pathways',
  description: 'Five career pathways available to business graduates: employee, business owner, freelancer, entrepreneur, and academic.',
}

export default function Page() {
  return <PathwaysClient />
}
