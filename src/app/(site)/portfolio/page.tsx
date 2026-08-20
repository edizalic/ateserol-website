import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio — Research, Projects & Events',
  description: 'A flexible record of academic work, applied projects, and events.',
}

export default function Page() {
  return <PortfolioClient />
}
