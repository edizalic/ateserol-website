'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface PortfolioEntry {
  id: string
  type: 'research' | 'project' | 'event'
  title: Record<string, string>
  description?: Record<string, string>
  tags: string[]
  url?: string
  imageUrl?: string
  date?: string
  published: boolean
  featured: boolean
}

function loc(obj: Record<string, string> | undefined | null, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

const COPY = {
  en: {
    home: 'Home', eyebrow: 'Portfolio',
    heading: 'Research, projects and events',
    intro: 'A record of academic work, applied projects, and events.',
    jump: 'Explore portfolio',
    research: 'Research', researchTitle: 'Research and publications',
    researchIntro: 'Research articles, papers, working notes, and other academic outputs.',
    projects: 'Projects', projectsTitle: 'Applied projects',
    projectsIntro: 'Project records with summaries, outcomes, and links.',
    events: 'Events', eventsTitle: 'Events and public activity',
    eventsIntro: 'Seminars, workshops, panels, and other documented events.',
    empty: 'Nothing published here yet.',
    visitUrl: 'Visit →',
  },
  tr: {
    home: 'Ana Sayfa', eyebrow: 'Portfolyo',
    heading: 'Araştırmalar, projeler ve etkinlikler',
    intro: 'Akademik çalışmalar, uygulamalı projeler ve etkinliklerin kaydı.',
    jump: 'Portfolyoyu keşfet',
    research: 'Araştırmalar', researchTitle: 'Araştırmalar ve yayınlar',
    researchIntro: 'Araştırma makaleleri, bildiriler, çalışma notları ve diğer akademik çıktılar.',
    projects: 'Projeler', projectsTitle: 'Uygulamalı projeler',
    projectsIntro: 'Özetler, sonuçlar ve bağlantılarla proje kayıtları.',
    events: 'Etkinlikler', eventsTitle: 'Etkinlikler ve kamusal çalışmalar',
    eventsIntro: 'Seminerler, atölyeler, paneller ve belgelenen diğer etkinlikler.',
    empty: 'Henüz yayınlanmış içerik yok.',
    visitUrl: 'Ziyaret et →',
  },
  fr: {
    home: 'Accueil', eyebrow: 'Portfolio',
    heading: 'Recherche, projets et événements',
    intro: 'Un registre du travail académique, des projets appliqués et des événements.',
    jump: 'Explorer le portfolio',
    research: 'Recherche', researchTitle: 'Recherche et publications',
    researchIntro: 'Articles, communications, notes de travail et autres productions académiques.',
    projects: 'Projets', projectsTitle: 'Projets appliqués',
    projectsIntro: 'Notices de projet avec résumés, résultats et liens.',
    events: 'Événements', eventsTitle: 'Événements et activité publique',
    eventsIntro: 'Séminaires, ateliers, panels et autres événements documentés.',
    empty: "Rien de publié pour l'instant.",
    visitUrl: 'Visiter →',
  },
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(280px, 1.1fr)', gap: 40, alignItems: 'end', marginBottom: 30 }} className="portfolio-section-head">
      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 13 }}>
          <span style={{ width: 30, height: 2, backgroundColor: '#B08D45' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 700, color: '#B08D45', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{eyebrow}</span>
        </div>
        <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(25px, 3vw, 34px)', lineHeight: 1.2, color: '#0B1F33', margin: 0 }}>{title}</h2>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#6A747D', margin: 0 }}>{body}</p>
    </div>
  )
}

function EntryCard({ entry, lang, visitUrl }: { entry: PortfolioEntry; lang: string; visitUrl: string }) {
  const title = loc(entry.title, lang)
  const desc = loc(entry.description, lang)
  return (
    <article style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', minWidth: 0 }}>
      {entry.imageUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={entry.imageUrl} alt={title} style={{ display: 'block', width: '100%', height: 180, objectFit: 'cover', borderBottom: '1px solid #E7E0D3' }} />
      ) : (
        <div style={{ height: 80, background: 'linear-gradient(145deg, #F3F0EA 0%, #FFFFFF 52%, #ECE8E0 100%)', borderBottom: '1px solid #E7E0D3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="23" height="19" rx="1" stroke="#B08D45" /><circle cx="9" cy="10" r="2" stroke="#B08D45" /><path d="M5 20l6-6 4 4 3-3 5 5" stroke="#0B1F33" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
      <div style={{ padding: '22px 22px 24px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#B08D45', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{entry.type}</span>
          {entry.tags.slice(0, 2).map(t => (
            <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#6A747D', border: '1px solid #E7E0D3', padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t}</span>
          ))}
          {entry.date && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#6A747D', marginLeft: 'auto' }}>{new Date(entry.date).getFullYear()}</span>}
        </div>
        <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, lineHeight: 1.3, color: '#0B1F33', margin: '0 0 10px' }}>{title}</h3>
        {desc && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.7, color: '#6A747D', margin: '0 0 16px' }}>{desc}</p>}
        {entry.url && (
          <a href={entry.url} target="_blank" rel="noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', textDecoration: 'none', borderBottom: '1px solid #0B1F33', paddingBottom: 1, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{visitUrl}</a>
        )}
      </div>
    </article>
  )
}

function EmptySection({ message }: { message: string }) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '40px 32px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', margin: 0, fontStyle: 'italic' }}>{message}</p>
    </div>
  )
}

export default function PortfolioClient() {
  const { lang } = useLanguage()
  const L = COPY[lang]
  const [entries, setEntries] = useState<PortfolioEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.ok ? r.json() : [])
      .then((data: PortfolioEntry[]) => { setEntries(data.filter(e => e.published)); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  const research = entries.filter(e => e.type === 'research')
  const projects = entries.filter(e => e.type === 'project')
  const events   = entries.filter(e => e.type === 'event')

  const sections = [
    { label: L.research, href: '/portfolio#research', number: '01' },
    { label: L.projects, href: '/portfolio#projects', number: '02' },
    { label: L.events,   href: '/portfolio#events',   number: '03' },
  ]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.eyebrow }]} />

      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 58px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)', gap: 64, alignItems: 'end' }} className="portfolio-hero">
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#B08D45', letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: 18 }}>{L.eyebrow}</div>
            <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(36px, 5.5vw, 62px)', lineHeight: 1.08, color: '#0B1F33', letterSpacing: '-0.025em', margin: '0 0 22px' }}>{L.heading}</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15.5, lineHeight: 1.8, color: '#6A747D', margin: 0, maxWidth: 680 }}>{L.intro}</p>
          </div>
          <nav aria-label={L.jump} style={{ borderTop: '1px solid #E7E0D3' }}>
            {sections.map(item => (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '15px 2px', borderBottom: '1px solid #E7E0D3', color: '#0B1F33', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{item.label}</span>
                <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 11, color: '#B08D45' }}>{item.number} ↓</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Research */}
      <section id="research" style={{ padding: '64px 32px', scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <SectionHeader eyebrow={L.research} title={L.researchTitle} body={L.researchIntro} />
          {loaded && research.length === 0 ? <EmptySection message={L.empty} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }} className="portfolio-grid two">
              {research.map(e => <EntryCard key={e.id} entry={e} lang={lang} visitUrl={L.visitUrl} />)}
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '64px 32px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', borderBottom: '1px solid #E7E0D3', scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <SectionHeader eyebrow={L.projects} title={L.projectsTitle} body={L.projectsIntro} />
          {loaded && projects.length === 0 ? <EmptySection message={L.empty} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18 }} className="portfolio-grid three">
              {projects.map(e => <EntryCard key={e.id} entry={e} lang={lang} visitUrl={L.visitUrl} />)}
            </div>
          )}
        </div>
      </section>

      {/* Events */}
      <section id="events" style={{ padding: '64px 32px', scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <SectionHeader eyebrow={L.events} title={L.eventsTitle} body={L.eventsIntro} />
          {loaded && events.length === 0 ? <EmptySection message={L.empty} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }} className="portfolio-grid two">
              {events.map(e => <EntryCard key={e.id} entry={e} lang={lang} visitUrl={L.visitUrl} />)}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-hero { grid-template-columns: 1fr !important; gap: 36px !important; }
          .portfolio-grid.three { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 700px) {
          .portfolio-section-head, .portfolio-grid.two, .portfolio-grid.three { grid-template-columns: 1fr !important; }
          .portfolio-section-head { gap: 14px !important; }
        }
      `}</style>
    </div>
  )
}
