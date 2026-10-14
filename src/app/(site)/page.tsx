import type { Metadata } from 'next'
import prisma from '@/lib/prisma'
import HomePageClient, { type FeaturedEvent } from './HomePageClient'

export const metadata: Metadata = {
  title: 'Ateş Erol — Lecturer, Business Education',
  description:
    'Teaching, research, applied projects and notes on business education, feasibility and management.',
  openGraph: {
    title: 'Ateş Erol — Lecturer, Business Education',
    description:
      'Teaching, research, applied projects and notes on business education, feasibility and management.',
  },
}

export const dynamic = 'force-dynamic'

function asLocalized(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const out: Record<string, string> = {}
  for (const [key, val] of Object.entries(value)) {
    if (typeof val === 'string' && val.trim()) out[key] = val
  }
  return Object.keys(out).length ? out : undefined
}

export default async function Page() {
  let featuredEvent: FeaturedEvent | null = null
  try {
    const event = await prisma.academicEvent.findFirst({
      where: { featured: true },
      orderBy: { date: 'desc' },
    })
    const title = event ? asLocalized(event.title) : undefined
    if (event && title) {
      featuredEvent = {
        title,
        description: asLocalized(event.description),
        date: event.date.toISOString(),
        location: event.location ?? undefined,
        type: event.type ?? undefined,
      }
    }
  } catch {
    featuredEvent = null
  }

  return <HomePageClient featuredEvent={featuredEvent} />
}
