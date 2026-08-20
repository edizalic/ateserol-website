import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import AdminMaterialsClient from './AdminMaterialsClient'

export const metadata: Metadata = { title: 'Teaching Materials' }

export default async function AdminMaterialsPage() {
  let materials: Awaited<ReturnType<typeof prisma.teachingMaterial.findMany>> = []
  try {
    materials = await prisma.teachingMaterial.findMany({ orderBy: { createdAt: 'desc' } })
  } catch { /* db not connected */ }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Content</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Teaching Materials</h1>
        </div>
        <Link href="/admin/materials/new" style={{ padding: '10px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
          + New Material
        </Link>
      </div>
      <AdminMaterialsClient materials={materials as Parameters<typeof AdminMaterialsClient>[0]['materials']} />
    </div>
  )
}
