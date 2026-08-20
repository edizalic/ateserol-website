'use client'

import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const CATEGORIES_DATA = {
  en: [
    { title: 'Presentations', description: 'A working archive for selected lecture and seminar presentations, organised by course area as materials are prepared for public use.', href: '/presentations', status: 'available' as const, count: 'Archive' },
    { title: 'Teaching Materials', description: 'Templates, worksheets, exercises and other materials that can be used directly in class or project work.', status: 'forthcoming' as const },
    { title: 'Reading Lists', description: 'Curated reading recommendations by teaching area. Added as individual course records are confirmed.', status: 'forthcoming' as const },
    { title: 'Data & External Sources', description: 'Public datasets, official sources and useful external tools. Links will be checked before they are added.', status: 'forthcoming' as const },
  ],
  tr: [
    { title: 'Sunumlar', description: 'Materyaller kamuya açık kullanıma hazırlandıkça ders alanlarına göre düzenlenecek seçilmiş ders ve seminer sunumları için gelişen bir arşiv.', href: '/presentations', status: 'available' as const, count: 'Arşiv' },
    { title: 'Öğretim Materyalleri', description: 'Sınıfta veya proje çalışmalarında doğrudan kullanılabilecek şablonlar, çalışma kâğıtları, alıştırmalar ve diğer materyaller.', status: 'forthcoming' as const },
    { title: 'Okuma Listeleri', description: 'Öğretim alanına göre seçilmiş okuma önerileri. Bireysel ders kayıtları onaylandıkça eklenmektedir.', status: 'forthcoming' as const },
    { title: 'Veri ve Dış Kaynaklar', description: 'Kamuya açık veri setleri, resmî kaynaklar ve yararlı dış araçlar. Bağlantılar eklenmeden önce kontrol edilecektir.', status: 'forthcoming' as const },
  ],
  fr: [
    { title: 'Présentations', description: 'Une archive de travail pour des présentations de cours et de séminaires sélectionnées, organisée par domaine d’enseignement à mesure que les supports sont préparés pour un usage public.', href: '/presentations', status: 'available' as const, count: 'Archive' },
    { title: 'Supports d’enseignement', description: 'Modèles, fiches, exercices et autres supports utilisables directement en cours ou dans un travail de projet.', status: 'forthcoming' as const },
    { title: 'Listes de lecture', description: 'Recommandations de lecture sélectionnées par domaine d’enseignement. Ajoutées à mesure que les notices de cours sont confirmées.', status: 'forthcoming' as const },
    { title: 'Données et sources externes', description: 'Jeux de données publics, sources officielles et outils externes utiles. Les liens seront vérifiés avant d’être ajoutés.', status: 'forthcoming' as const },
  ],
}

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbResources: 'Resources',
    eyebrow: 'Teaching Archive', heading: 'Resources',
    subheading: 'An academic resource hub supporting the teaching and research work documented on this site. Resources are added progressively as course records are confirmed and materials are cleared for open access.',
    currentlyAvailable: 'Currently available', forthcoming: 'Forthcoming',
    view: 'View', forthcomingBadge: 'Forthcoming',
    quote: '"The only price for knowledge should be the effort to obtain it."',
    quoteNote: 'Materials will be made available without registration when they have been checked and prepared for public use.',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbResources: 'Kaynaklar',
    eyebrow: 'Öğretim Arşivi', heading: 'Kaynaklar',
    subheading: 'Bu sitede belgelenen öğretim ve araştırma çalışmalarını destekleyen akademik bir kaynak merkezi. Kaynaklar, ders kayıtları onaylandıkça ve materyaller açık erişim için hazır hale geldikçe aşamalı olarak eklenmektedir.',
    currentlyAvailable: 'Şu anda mevcut', forthcoming: 'Yakında',
    view: 'Görüntüle', forthcomingBadge: 'Yakında',
    quote: '"Bilginin tek bedeli onu elde etmek için gereken çaba olmalıdır."',
    quoteNote: 'Materyaller kontrol edilip kamuya açık kullanıma hazırlandıklarında kayıt gerektirmeden paylaşılacaktır.',
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbResources: 'Ressources',
    eyebrow: 'Archives d’enseignement', heading: 'Ressources',
    subheading: 'Un pôle de ressources académiques au service de l’enseignement et de la recherche documentés sur ce site. Les ressources sont ajoutées progressivement à mesure que les notices de cours sont confirmées et que les supports sont autorisés en accès ouvert.',
    currentlyAvailable: 'Actuellement disponibles', forthcoming: 'À venir',
    view: 'Voir', forthcomingBadge: 'À venir',
    quote: '« Le seul prix du savoir devrait être l’effort pour l’obtenir. »',
    quoteNote: 'Les supports seront mis à disposition sans inscription lorsqu’ils auront été vérifiés et préparés pour un usage public.',
  },
}

const arrow = (<svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M8 1l3 3-3 3M1 4h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>)

export default function LibraryClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const CATEGORIES = CATEGORIES_DATA[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbResources }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 56px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'end' }} className="library-hero-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
            </div>
            <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 18px', lineHeight: 1.12, letterSpacing: '-0.01em' }}>{L.heading}</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.8, margin: 0, maxWidth: 520 }}>{L.subheading}</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '24px 26px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{L.currentlyAvailable}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CATEGORIES.filter(c => c.status === 'available').map(c => (
                <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, backgroundColor: '#3D5A4A', borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328' }}>{c.title}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #E7E0D3' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{L.forthcoming}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CATEGORIES.filter(c => c.status === 'forthcoming').map(c => (
                  <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, border: '1px solid #B08D45', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{c.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="library-grid">
            {CATEGORIES.map(cat => {
              const isAvailable = cat.status === 'available'
              const inner = (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF', padding: '36px 30px 30px', borderTop: `2px solid ${isAvailable ? '#B08D45' : '#E7E0D3'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: isAvailable ? '#0B1F33' : '#6A747D', margin: 0, lineHeight: 1.25 }}>{cat.title}</h3>
                    {isAvailable && 'count' in cat && cat.count ? (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#3D5A4A', padding: '3px 8px', flexShrink: 0, marginLeft: 10 }}>{cat.count}</span>
                    ) : !isAvailable ? (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: '#B08D45', border: '1px solid #B08D45', padding: '2px 7px', flexShrink: 0, marginLeft: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.forthcomingBadge}</span>
                    ) : null}
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: isAvailable ? '#6A747D' : '#8A9299', lineHeight: 1.75, margin: '0 0 auto', flexGrow: 1 }}>{cat.description}</p>
                  {isAvailable && (
                    <div style={{ marginTop: 24, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {L.view} {arrow}
                    </div>
                  )}
                </div>
              )

              if (isAvailable && 'href' in cat && cat.href) {
                return (
                  <Link key={cat.title} href={cat.href} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
                    {inner}
                  </Link>
                )
              }
              return <div key={cat.title} style={{ display: 'flex', flexDirection: 'column' }}>{inner}</div>
            })}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', padding: '48px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 32, height: 1.5, backgroundColor: '#B08D45', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 16, fontStyle: 'italic', color: '#6A747D', lineHeight: 1.8, margin: '0 0 24px' }}>{L.quote}</p>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Ateş Erol</div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.75, margin: '20px auto 0', maxWidth: 480 }}>{L.quoteNote}</p>
        </div>
      </section>

      <style>{`
        @media (max-width: 1023px) { .library-hero-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) { .library-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .library-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
