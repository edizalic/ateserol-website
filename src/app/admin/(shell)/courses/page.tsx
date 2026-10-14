import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import AdminCoursesClient from './AdminCoursesClient'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Courses' }

export default async function AdminCoursesPage() {
  let courses: Awaited<ReturnType<typeof prisma.course.findMany>> = []
  try {
    courses = await prisma.course.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch { /* db not connected yet */ }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Content</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Courses</h1>
        </div>
        <Link href="/admin/courses/new" style={{ padding: '10px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
          + New Course
        </Link>
      </div>
      <AdminCoursesClient courses={courses as Parameters<typeof AdminCoursesClient>[0]['courses']} />
    </div>
  )
}
