import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export const metadata: Metadata = { title: 'Dashboard' }

async function getStats() {
  try {
    const [courses, reflections, portfolio, events, materials, projects, library] = await Promise.all([
      prisma.course.count(),
      prisma.reflection.count(),
      prisma.portfolioEntry.count(),
      prisma.academicEvent.count(),
      prisma.teachingMaterial.count(),
      prisma.studentProject.count(),
      prisma.libraryResource.count(),
    ])
    return { courses, reflections, portfolio, events, materials, projects, library }
  } catch {
    return { courses: 0, reflections: 0, portfolio: 0, events: 0, materials: 0, projects: 0, library: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const CARDS = [
    { label: 'Courses', count: stats.courses, href: '/admin/courses', description: 'Manage published courses and categories' },
    { label: 'Reflections', count: stats.reflections, href: '/admin/reflections', description: 'Articles and forthcoming essays' },
    { label: 'Portfolio', count: stats.portfolio, href: '/admin/portfolio', description: 'Research, projects, and events' },
    { label: 'Academic Events', count: stats.events, href: '/admin/events', description: 'Conferences, workshops, lectures' },
    { label: 'Materials', count: stats.materials, href: '/admin/materials', description: 'Presentations and teaching materials' },
    { label: 'Student Projects', count: stats.projects, href: '/admin/student-projects', description: 'Student project showcase' },
    { label: 'Library Resources', count: stats.library, href: '/admin/library', description: 'Curated reading and references' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Admin Panel</div>
        <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 30, fontWeight: 700, color: '#0B1F33', margin: 0 }}>Dashboard</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', margin: '8px 0 0' }}>Overview of all content managed through this panel.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {CARDS.map(card => (
          <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '24px', borderTop: '2px solid #B08D45', transition: 'border-color 0.15s' }}>
              <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 36, fontWeight: 700, color: '#0B1F33', lineHeight: 1 }}>{card.count}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0B1F33', margin: '8px 0 4px' }}>{card.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', lineHeight: 1.5 }}>{card.description}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 40, backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '24px 28px' }}>
        <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>Quick Links</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: 'New Course', href: '/admin/courses/new' },
            { label: 'New Reflection', href: '/admin/reflections/new' },
            { label: 'New Portfolio Entry', href: '/admin/portfolio/new' },
            { label: 'New Event', href: '/admin/events/new' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ padding: '8px 16px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
              + {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
