'use client'

import { useState, useEffect, useMemo } from 'react'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface Material {
  id: string
  title: Record<string, string>
  type: 'presentation' | 'note' | 'template' | 'dataset'
  fileUrl?: string
  course?: string
  semester?: string
  published: boolean
}

function loc(obj: Record<string, string> | undefined | null, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

const T = {
  en: {
    home: 'Home', teaching: 'Teaching', page: 'Presentations',
    eyebrow: 'Teaching Archive',
    heading: 'Presentations & Teaching Materials',
    intro: 'A working archive of presentations, class notes, templates and selected teaching materials. Items are organised by type and added when the material is ready to be useful outside the class in which it was first used.',
    searchPlaceholder: 'Search by title or course…',
    allTypes: 'All Types',
    types: { presentation: 'Presentation', note: 'Note', template: 'Template', dataset: 'Dataset' },
    download: 'Open', course: 'Course', semester: 'Semester',
    noPublished: 'No materials have been published yet.',
    noResults: 'No materials match your search.',
  },
  tr: {
    home: 'Ana Sayfa', teaching: 'Öğretim', page: 'Sunumlar',
    eyebrow: 'Öğretim Arşivi',
    heading: 'Sunumlar ve Öğretim Materyalleri',
    intro: 'Sunumlar, ders notları, şablonlar ve seçilmiş öğretim materyallerinden oluşan gelişen bir arşiv. İçerikler türe göre düzenlenir ve ilk kullanıldıkları sınıfın dışında da yararlı olacak duruma geldiklerinde eklenir.',
    searchPlaceholder: 'Başlık veya derse göre ara…',
    allTypes: 'Tüm Türler',
    types: { presentation: 'Sunum', note: 'Not', template: 'Şablon', dataset: 'Veri Seti' },
    download: 'Aç', course: 'Ders', semester: 'Dönem',
    noPublished: 'Henüz yayımlanmış materyal yok.',
    noResults: 'Aramanızla eşleşen materyal bulunamadı.',
  },
  fr: {
    home: 'Accueil', teaching: 'Enseignement', page: 'Présentations',
    eyebrow: "Archives d'enseignement",
    heading: "Présentations et supports d'enseignement",
    intro: "Une archive de travail de présentations, notes de cours, modèles et supports d'enseignement sélectionnés. Les contenus sont organisés par type et ajoutés lorsque le matériau est utile en dehors de la classe dans laquelle il a d'abord été utilisé.",
    searchPlaceholder: 'Rechercher par titre ou cours…',
    allTypes: 'Tous les types',
    types: { presentation: 'Présentation', note: 'Note', template: 'Modèle', dataset: 'Jeu de données' },
    download: 'Ouvrir', course: 'Cours', semester: 'Semestre',
    noPublished: "Aucun support n'a encore été publié.",
    noResults: "Aucun support ne correspond à votre recherche.",
  },
}

const TYPE_ORDER: Material['type'][] = ['presentation', 'note', 'template', 'dataset']

function FileIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <rect x="1" y="1" width="14" height="16" rx="1" stroke="#B08D45" strokeWidth="1.2" />
      <path d="M4 6h8M4 9h8M4 12h5" stroke="#B08D45" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

const arrow = (<svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M7 1l3 3-3 3M1 3.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>)

export default function PresentationsClient() {
  const { lang } = useLanguage()
  const L = T[lang]

  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<'all' | Material['type']>('all')

  useEffect(() => {
    fetch('/api/materials')
      .then(r => r.ok ? r.json() : [])
      .then(setMaterials)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const presentTypes = useMemo(() => {
    const s = new Set(materials.map(m => m.type))
    return TYPE_ORDER.filter(t => s.has(t))
  }, [materials])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return materials.filter(m => {
      const matchType = activeType === 'all' || m.type === activeType
      const matchQ = !q || loc(m.title, lang).toLowerCase().includes(q) || (m.course ?? '').toLowerCase().includes(q)
      return matchType && matchQ
    })
  }, [materials, search, activeType, lang])

  const grouped = useMemo(() => {
    const map = new Map<Material['type'], Material[]>()
    for (const m of filtered) {
      if (!map.has(m.type)) map.set(m.type, [])
      map.get(m.type)!.push(m)
    }
    return TYPE_ORDER.map(t => [t, map.get(t) ?? []] as [Material['type'], Material[]]).filter(([, items]) => items.length > 0)
  }, [filtered])

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '70vh' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.teaching, href: '/teaching' }, { label: L.page }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '64px 32px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ width: 32, height: 1.5, backgroundColor: '#B08D45', display: 'block' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 4vw, 44px)', lineHeight: 1.12, color: '#0B1F33', margin: '0 0 14px' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.8, color: '#6A747D', maxWidth: 680, margin: '0 0 28px' }}>{L.intro}</p>

          {/* Search + type filter */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 400 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="7" cy="7" r="5" stroke="#6A747D" strokeWidth="1.3" /><line x1="11" y1="11" x2="15" y2="15" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input type="text" placeholder={L.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', border: '1px solid #E7E0D3', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            {materials.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button onClick={() => setActiveType('all')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: activeType === 'all' ? 600 : 400, color: activeType === 'all' ? '#FFFFFF' : '#1E2328', backgroundColor: activeType === 'all' ? '#0B1F33' : 'transparent', border: '1px solid #E7E0D3', padding: '6px 13px', cursor: 'pointer' }}>{L.allTypes}</button>
                {presentTypes.map(t => (
                  <button key={t} onClick={() => setActiveType(t)} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: activeType === t ? 600 : 400, color: activeType === t ? '#FFFFFF' : '#1E2328', backgroundColor: activeType === t ? '#0B1F33' : 'transparent', border: '1px solid #E7E0D3', padding: '6px 13px', cursor: 'pointer' }}>{L.types[t]}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Materials list */}
      <section style={{ padding: '48px 32px 72px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {loading ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>Loading…</p>
          ) : materials.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center' }}>
              <div style={{ width: 36, height: 1.5, backgroundColor: '#B08D45', margin: '0 auto 20px' }} />
              <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, color: '#0B1F33', margin: '0 auto', maxWidth: 560 }}>{L.noPublished}</p>
            </div>
          ) : grouped.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{L.noResults}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {grouped.map(([type, items]) => (
                <div key={type}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ display: 'block', width: 20, height: 1.5, backgroundColor: '#B08D45' }} />
                    <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{L.types[type]}</h2>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D', marginLeft: 'auto' }}>{items.length}</span>
                  </div>

                  <div style={{ border: '1px solid #E7E0D3' }}>
                    {items.map((m, i) => (
                      <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '16px 22px', backgroundColor: '#FFFFFF', borderBottom: i < items.length - 1 ? '1px solid #F0EBE2' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                          <div style={{ flexShrink: 0, marginTop: 2 }}><FileIcon /></div>
                          <div>
                            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#0B1F33', lineHeight: 1.3 }}>{loc(m.title, lang)}</div>
                            <div style={{ display: 'flex', gap: 14, marginTop: 4, flexWrap: 'wrap' }}>
                              {m.course && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D' }}>{L.course}: {m.course}</span>}
                              {m.semester && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D' }}>{L.semester}: {m.semester}</span>}
                            </div>
                          </div>
                        </div>
                        {m.fileUrl && (
                          <a href={m.fileUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #0B1F33', paddingBottom: 1, flexShrink: 0, whiteSpace: 'nowrap' }}>
                            {L.download} {arrow}
                          </a>
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
