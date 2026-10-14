'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, Tag } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import ReflectionFilesSection from './ReflectionFilesSection'

interface Reflection {
  id: string
  slug: string
  title: Record<string, string>
  subtitle?: Record<string, string>
  body?: Record<string, string>
  categories?: { id: string; name: Record<string, string> }[]
  status: string
  publishedAt?: string
}

function loc(obj: Record<string, string> | undefined | null, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

const UI = {
  en: { home: 'Home', reflections: 'Reflections', back: 'Back to reflections', forthcoming: 'Reflection · Forthcoming', working: 'I am still working on this piece. It will be published here when the argument is ready rather than simply when the page is ready.', notFound: 'This reflection could not be found.', loading: 'Loading…' },
  tr: { home: 'Ana Sayfa', reflections: 'Düşünceler', back: 'Düşüncelere dön', forthcoming: 'Düşünce · Yakında', working: 'Bu yazı üzerinde hâlâ çalışıyorum. Sayfa hazır olduğunda değil, sav hazır olduğunda burada yayımlanacaktır.', notFound: 'Bu düşünce bulunamadı.', loading: 'Yükleniyor…' },
  fr: { home: 'Accueil', reflections: 'Réflexions', back: 'Retour aux réflexions', forthcoming: 'Réflexion · À venir', working: "Je travaille encore sur ce texte. Il sera publié ici lorsque l'argument sera prêt, et non simplement lorsque la page le sera.", notFound: 'Cette réflexion est introuvable.', loading: 'Chargement…' },
}

function AuthorBadge({ lang }: { lang: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, paddingTop: 20, borderTop: '1px solid #E7E0D3' }}>
      <div style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: 700, fontSize: 12 }}>AE</div>
      <div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1E2328' }}>Ateş Erol</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D' }}>{lang === 'tr' ? 'Öğretim Görevlisi · İşletme Eğitimi' : lang === 'fr' ? 'Enseignant · Formation en gestion' : 'Lecturer · Business Education'}</div>
      </div>
    </div>
  )
}

export default function ReflectionArticleClient() {
  const { lang } = useLanguage()
  const L = UI[lang]
  const params = useParams()
  const slug = params?.slug as string | undefined

  const [reflection, setReflection] = useState<Reflection | null | 'forthcoming' | 'loading'>('loading')

  useEffect(() => {
    if (!slug) return
    fetch(`/api/reflections/${slug}`)
      .then(async r => {
        if (r.status === 404) { setReflection('forthcoming'); return }
        if (!r.ok) { setReflection(null); return }
        const data: Reflection = await r.json()
        // Treat forthcoming/draft reflections as forthcoming UI
        if (data.status !== 'published') { setReflection('forthcoming'); return }
        setReflection(data)
      })
      .catch(() => setReflection(null))
  }, [slug])

  const breadcrumbs = [{ label: L.home, href: '/' }, { label: L.reflections, href: '/reflections' }]

  if (reflection === 'loading') {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{L.loading}</span>
      </div>
    )
  }

  if (reflection === null) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '70vh' }}>
        <Breadcrumb items={breadcrumbs} />
        <section style={{ padding: '72px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', margin: '0 0 20px' }}>{L.notFound}</p>
            <Link href="/reflections" style={{ display: 'inline-block', border: '1px solid #0B1F33', padding: '11px 20px', color: '#0B1F33', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.back}</Link>
          </div>
        </section>
      </div>
    )
  }

  if (reflection === 'forthcoming') {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '70vh' }}>
        <Breadcrumb items={breadcrumbs} />
        <section style={{ padding: '72px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{L.forthcoming}</div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#6A747D', margin: '0 auto 26px', maxWidth: 560 }}>{L.working}</p>
            <Link href="/reflections" style={{ display: 'inline-block', border: '1px solid #0B1F33', padding: '11px 20px', color: '#0B1F33', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.back}</Link>
          </div>
        </section>
      </div>
    )
  }

  // Render published reflection from DB
  const title = loc(reflection.title, lang)
  const subtitle = loc(reflection.subtitle, lang)
  const categories = (reflection.categories ?? [])
    .map(category => ({ id: category.id, label: loc(category.name, lang) }))
    .filter(category => category.label)
  const bodyText = loc(reflection.body, lang)

  // Split body into paragraphs on blank lines
  const paragraphs = bodyText
    ? bodyText.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
    : []

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[...breadcrumbs, { label: title }]} />

      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '64px 32px 48px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(category => <Tag key={category.id} label={category.label} />)}
            </div>
          )}
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.12, color: '#0B1F33', margin: '18px 0 16px' }}>{title}</h1>
          {subtitle && <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(17px, 2.5vw, 21px)', fontStyle: 'italic', lineHeight: 1.65, color: '#6A747D', margin: 0 }}>{subtitle}</p>}
          <AuthorBadge lang={lang} />
        </div>
      </header>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 32px 72px' }}>
        <article>
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p key={i} style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.85, color: '#1E2328', margin: '0 0 24px' }}>{para}</p>
            ))
          ) : (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', fontStyle: 'italic' }}>No content yet.</p>
          )}
          <Link href="/reflections" style={{ display: 'inline-block', borderBottom: '1px solid #0B1F33', color: '#0B1F33', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.back}</Link>
        </article>
      </div>

      {slug && <ReflectionFilesSection slug={slug} />}
    </div>
  )
}
