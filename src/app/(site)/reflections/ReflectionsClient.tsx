'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Breadcrumb, SectionLabel, Tag } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface Reflection {
  id: string
  slug: string
  title: Record<string, string>
  subtitle?: Record<string, string>
  excerpt?: Record<string, string>
  category?: Record<string, string>
  status: string
  featured: boolean
  publishedAt?: string
}

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbReflections: 'Reflections',
    sectionLabel: 'Writing',
    heading: 'Notes on teaching, business and judgment',
    subheading: 'Shorter essays drawn from questions that recur in teaching: what a framework helps us see, what a project reveals, how students should use AI, and what happens when education rewards the appearance of certainty more than honest reasoning.',
    publishedTag: 'Published', readEssay: 'Read essay',
    forthcomingBadge: 'Forthcoming',
    forthcomingHeading: 'Forthcoming Essays', forthcomingNote: 'In progress — not yet published',
    forthcomingDisclaimer: 'These titles represent editorial concepts under development.',
    empty: 'No reflections published yet.',
    featuredQuote: '"The form has been mastered. The thinking has been replaced by it."',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbReflections: 'Düşünceler',
    sectionLabel: 'Yazılar',
    heading: 'Öğretim, işletme ve muhakeme üzerine notlar',
    subheading: 'Öğretimde tekrar tekrar karşıma çıkan sorulardan doğan kısa yazılar.',
    publishedTag: 'Yayınlandı', readEssay: 'Denemeyi oku',
    forthcomingBadge: 'Yakında',
    forthcomingHeading: 'Yakında Yayınlanacak Denemeler', forthcomingNote: 'Devam ediyor — henüz yayınlanmadı',
    forthcomingDisclaimer: 'Bu başlıklar geliştirme aşamasındaki editoryal kavramları temsil etmektedir.',
    empty: 'Henüz yayınlanmış düşünce yok.',
    featuredQuote: '"Form ustalıkla uygulanmış. Düşünce ise formun yerini almış."',
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbReflections: 'Réflexions',
    sectionLabel: 'Écrits',
    heading: "Notes sur l'enseignement, la gestion et le jugement",
    subheading: "Essais plus courts nés de questions qui reviennent dans l'enseignement.",
    publishedTag: 'Publié', readEssay: "Lire l'essai",
    forthcomingBadge: 'À venir',
    forthcomingHeading: 'Essais à venir', forthcomingNote: 'En cours — pas encore publié',
    forthcomingDisclaimer: 'Ces titres représentent des concepts éditoriaux en développement.',
    empty: "Aucune réflexion publiée pour l'instant.",
    featuredQuote: '« La forme a été maîtrisée. La pensée a été remplacée par elle. »',
  },
}

function loc(obj: Record<string, string> | undefined, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

export default function ReflectionsClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const [published, setPublished] = useState<Reflection[]>([])
  const [forthcoming, setForthcoming] = useState<Reflection[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/reflections').then(r => r.ok ? r.json() : []),
      fetch('/api/reflections?status=forthcoming').then(r => r.ok ? r.json() : []),
    ]).then(([pub, forth]) => {
      setPublished(pub)
      setForthcoming(forth)
      setLoaded(true)
    }).catch(() => setLoaded(true))
  }, [])

  const featured = published.find(r => r.featured) ?? published[0]
  const rest = published.filter(r => r.id !== featured?.id)

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbReflections }]} />

      {/* Header */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '56px 32px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <SectionLabel text={L.sectionLabel} />
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.75, margin: 0, maxWidth: 560 }}>{L.subheading}</p>
        </div>
      </section>

      {/* Published — featured */}
      {loaded && !featured && (
        <section style={{ padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D' }}>{L.empty}</p>
          </div>
        </section>
      )}

      {featured && (
        <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '0 32px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <Link href={`/reflections/${featured.slug}`} style={{ display: 'block', textDecoration: 'none', padding: '40px 0' }}>
              <div style={{ display: 'grid', gap: 48, alignItems: 'center' }} className="ref-featured-grid">
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                    <Tag label={L.publishedTag} color="#3D5A4A" />
                    {featured.category && <Tag label={loc(featured.category, lang)} />}
                  </div>
                  <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{loc(featured.title, lang)}</h2>
                  {featured.subtitle && <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontStyle: 'italic', fontSize: 16, color: '#6A747D', marginBottom: 14 }}>{loc(featured.subtitle, lang)}</div>}
                  {featured.excerpt && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: '0 0 20px' }}>{loc(featured.excerpt, lang)}</p>}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#0B1F33', borderBottom: '1px solid #0B1F33', paddingBottom: 1, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {L.readEssay}
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M6 1l3 3-3 3M1 4h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
                <div style={{ backgroundColor: '#0B1F33', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 32, height: 1.5, backgroundColor: '#B08D45', margin: '0 auto 16px' }} />
                    <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontStyle: 'italic', color: '#D6D0C5', lineHeight: 1.65 }}>{L.featuredQuote}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Published — rest */}
      {rest.length > 0 && (
        <section style={{ padding: '48px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="ref-grid">
            {rest.map(r => (
              <Link key={r.id} href={`/reflections/${r.slug}`} style={{ display: 'block', backgroundColor: '#FFFFFF', padding: '28px 26px', textDecoration: 'none' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                  <Tag label={L.publishedTag} color="#3D5A4A" />
                  {r.category && <Tag label={loc(r.category, lang)} />}
                </div>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', margin: '0 0 6px', lineHeight: 1.3 }}>{loc(r.title, lang)}</h3>
                {r.subtitle && <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontStyle: 'italic', fontSize: 14, color: '#6A747D', lineHeight: 1.4 }}>{loc(r.subtitle, lang)}</div>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Forthcoming */}
      {forthcoming.length > 0 && (
        <section style={{ padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0B1F33', margin: 0 }}>{L.forthcomingHeading}</h2>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D' }}>{L.forthcomingNote}</span>
            </div>
            <div style={{ display: 'grid', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="ref-forthcoming-grid">
              {forthcoming.map(r => (
                <div key={r.id} style={{ backgroundColor: '#FFFFFF', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: '#B08D45', border: '1px solid #B08D45', padding: '2px 7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.forthcomingBadge}</span>
                    {r.category && <Tag label={loc(r.category, lang)} />}
                  </div>
                  <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#6A747D', margin: 0, lineHeight: 1.35 }}>{loc(r.title, lang)}</h3>
                  {r.subtitle && <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#8A9299', lineHeight: 1.4 }}>{loc(r.subtitle, lang)}</div>}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', fontStyle: 'italic', marginTop: 16, lineHeight: 1.65 }}>{L.forthcomingDisclaimer}</p>
          </div>
        </section>
      )}

      <style>{`
        .ref-featured-grid { grid-template-columns: 1fr 280px; }
        .ref-grid { grid-template-columns: repeat(2, 1fr); }
        .ref-forthcoming-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .ref-featured-grid { grid-template-columns: 1fr !important; }
          .ref-grid { grid-template-columns: 1fr !important; }
          .ref-forthcoming-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .ref-forthcoming-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
