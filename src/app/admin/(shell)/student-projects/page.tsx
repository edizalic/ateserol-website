import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import AdminStudentProjectsClient from './AdminStudentProjectsClient'

export const metadata: Metadata = { title: 'Student Projects' }

export default async function AdminStudentProjectsPage() {
  let projects: Awaited<ReturnType<typeof prisma.studentProject.findMany>> = []
  try {
    projects = await prisma.studentProject.findMany({
      include: { course: true },
      orderBy: { year: 'desc' },
    })
  } catch { /* db not connected */ }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Content</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Student Projects</h1>
        </div>
        <Link href="/admin/student-projects/new" style={{ padding: '10px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
          + New Project
        </Link>
      </div>
      <AdminStudentProjectsClient projects={projects as Parameters<typeof AdminStudentProjectsClient>[0]['projects']} />
    </div>
  )
}
