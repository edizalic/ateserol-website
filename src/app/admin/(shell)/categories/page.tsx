import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import AdminCategoriesClient from './AdminCategoriesClient'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Categories' }

export default async function AdminCategoriesPage() {
  let categories: Parameters<typeof AdminCategoriesClient>[0]['categories'] = []
  try {
    const rows = await prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { courses: true, reflections: true, libraryItems: true } } },
    })
    categories = rows.map(row => ({
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
      _count: row._count,
    }))
  } catch { /* db not connected */ }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Content</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Categories</h1>
        </div>
        <Link href="/admin/categories/new" style={{ padding: '10px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
          + New Category
        </Link>
      </div>
      <AdminCategoriesClient categories={categories} />
    </div>
  )
}
