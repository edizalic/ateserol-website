import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import AdminLibraryClient from './AdminLibraryClient'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Library' }

export default async function AdminLibraryPage() {
  let resources: Awaited<ReturnType<typeof prisma.libraryResource.findMany>> = []
  try {
    resources = await prisma.libraryResource.findMany({
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch { /* db not connected */ }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Content</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Library Resources</h1>
        </div>
        <Link href="/admin/library/new" style={{ padding: '10px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
          + New Resource
        </Link>
      </div>
      <AdminLibraryClient resources={resources as Parameters<typeof AdminLibraryClient>[0]['resources']} />
    </div>
  )
}
