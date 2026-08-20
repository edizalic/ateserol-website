import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import AdminPortfolioClient from './AdminPortfolioClient'

export const metadata: Metadata = { title: 'Portfolio' }

export default async function AdminPortfolioPage() {
  let entries: Awaited<ReturnType<typeof prisma.portfolioEntry.findMany>> = []
  try {
    entries = await prisma.portfolioEntry.findMany({ orderBy: { createdAt: 'desc' } })
  } catch { /* db not connected */ }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Content</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Portfolio</h1>
        </div>
        <Link href="/admin/portfolio/new" style={{ padding: '10px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
          + New Entry
        </Link>
      </div>
      <AdminPortfolioClient entries={entries as Parameters<typeof AdminPortfolioClient>[0]['entries']} />
    </div>
  )
}
