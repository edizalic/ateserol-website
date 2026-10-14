'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface CategoryRef {
  id: string
  name: Record<string, string>
}

interface LibraryResource {
  id: string
  title: string
  categories?: CategoryRef[]
  author?: string
  url?: string
  description?: Record<string, string>
  published: boolean
}

function loc(obj: Record<string, string> | undefined | null, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbResources: 'Resources',
    eyebrow: 'Teaching Archive', heading: 'Library',
    subheading: 'A curated collection of references, resources and materials supporting the teaching and research work on this site.',
    searchPlaceholder: 'Search by title, author or category…',
    allCategories: 'All Categories',
    visit: 'Visit', noResults: 'No resources match your search.',     noPublished: 'No library resources have been published yet.',
    author: 'Author',
    uncategorized: 'Uncategorized',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbResources: 'Kaynaklar',
    eyebrow: 'Öğretim Arşivi', heading: 'Kütüphane',
    subheading: "Bu sitedeki öğretim ve araştırma çalışmalarını destekleyen seçilmiş referans, kaynak ve materyallerin derlemesi.",
    searchPlaceholder: 'Başlık, yazar veya kategoriye göre ara…',
    allCategories: 'Tüm Kategoriler',
    visit: 'Ziyaret Et', noResults: 'Aramanızla eşleşen kaynak bulunamadı.',     noPublished: 'Henüz yayımlanmış kütüphane kaynağı yok.',
    author: 'Yazar',
    uncategorized: 'Kategorisiz',
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbResources: 'Ressources',
    eyebrow: "Archives d'enseignement", heading: 'Bibliothèque',
    subheading: "Une collection sélectionnée de références, ressources et supports accompagnant le travail d'enseignement et de recherche présenté sur ce site.",
    searchPlaceholder: 'Rechercher par titre, auteur ou catégorie…',
    allCategories: 'Toutes les catégories',
    visit: 'Consulter', noResults: "Aucune ressource ne correspond à votre recherche.",     noPublished: "Aucune ressource de bibliothèque n'a encore été publiée.",
    author: 'Auteur',
    uncategorized: 'Sans catégorie',
  },
}

const arrow = (<svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M7 1l3 3-3 3M1 3.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>)

export default function LibraryClient() {
  const { lang } = useLanguage()
  const L = T[lang]

  const [resources, setResources] = useState<LibraryResource[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetch('/api/library')
      .then(r => r.ok ? r.json() : [])
      .then(setResources)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const map = new Map<string, CategoryRef>()
    for (const resource of resources) {
      for (const category of resource.categories ?? []) map.set(category.id, category)
    }
    return Array.from(map.values()).sort((a, b) => loc(a.name, lang).localeCompare(loc(b.name, lang)))
  }, [resources, lang])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return resources.filter(r => {
      const names = (r.categories ?? []).map(category => loc(category.name, lang).toLowerCase())
      const matchCat = activeCategory === 'all' || (r.categories ?? []).some(category => category.id === activeCategory)
      const matchQ = !q || r.title.toLowerCase().includes(q) || (r.author ?? '').toLowerCase().includes(q) || names.some(name => name.includes(q)) || loc(r.description, lang).toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [resources, search, activeCategory, lang])

  const grouped = useMemo(() => {
    const map = new Map<string, { id: string; label: string; items: LibraryResource[] }>()
    const uncategorized: LibraryResource[] = []
    for (const resource of filtered) {
      const cats = activeCategory === 'all'
        ? (resource.categories ?? [])
        : (resource.categories ?? []).filter(category => category.id === activeCategory)
      if (cats.length === 0) {
        uncategorized.push(resource)
        continue
      }
      for (const category of cats) {
        const existing = map.get(category.id)
        if (existing) existing.items.push(resource)
        else map.set(category.id, { id: category.id, label: loc(category.name, lang), items: [resource] })
      }
    }
    const entries = Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label))
    if (uncategorized.length) entries.push({ id: 'uncategorized', label: L.uncategorized, items: uncategorized })
    return entries
  }, [filtered, activeCategory, lang, L.uncategorized])

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbResources }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '64px 32px 48px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 14px', lineHeight: 1.12 }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 600 }}>{L.subheading}</p>

          {/* Search + filter row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 460 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="7" cy="7" r="5" stroke="#6A747D" strokeWidth="1.3" /><line x1="11" y1="11" x2="15" y2="15" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input type="text" placeholder={L.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 10, paddingBottom: 10, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', border: '1px solid #E7E0D3', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button onClick={() => setActiveCategory('all')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: activeCategory === 'all' ? 600 : 400, color: activeCategory === 'all' ? '#FFFFFF' : '#1E2328', backgroundColor: activeCategory === 'all' ? '#0B1F33' : 'transparent', border: '1px solid #E7E0D3', padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.03em' }}>{L.allCategories}</button>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: activeCategory === cat.id ? 600 : 400, color: activeCategory === cat.id ? '#FFFFFF' : '#1E2328', backgroundColor: activeCategory === cat.id ? '#0B1F33' : 'transparent', border: '1px solid #E7E0D3', padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.03em' }}>{loc(cat.name, lang)}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section style={{ padding: '48px 32px 72px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {loading ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>Loading…</p>
          ) : resources.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '56px 32px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D' }}>{L.noPublished}</p>
            </div>
          ) : filtered.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{L.noResults}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {grouped.map(group => (
                <div key={group.id}>
                  {/* Category heading */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <span style={{ display: 'block', width: 24, height: 1.5, backgroundColor: '#B08D45', flexShrink: 0 }} />
                    <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{group.label}</h2>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D', marginLeft: 'auto' }}>{group.items.length}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid #E7E0D3' }}>
                    {group.items.map(r => (
                      <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '18px 22px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0EBE2' }}>
                        <div>
                          <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 3 }}>{r.title}</div>
                          {r.author && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', marginBottom: 4 }}>{L.author}: {r.author}</div>}
                          {loc(r.description, lang) && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.65, marginTop: 4 }}>{loc(r.description, lang)}</div>}
                        </div>
                        {r.url && (
                          <Link href={r.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #0B1F33', paddingBottom: 1, flexShrink: 0, whiteSpace: 'nowrap' }}>
                            {L.visit} {arrow}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
