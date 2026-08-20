'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage, type Lang } from '@/contexts/LanguageContext'
import AcademicMark from '@/components/AcademicMark'

const NAV_ITEMS = {
  en: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Teaching Hub',
      href: '/teaching',
      children: [
        { label: 'Teaching Ethos', href: '/teaching/ethos' },
        { label: 'Purpose of Business Education', href: '/teaching' },
        { label: 'Student Pathways', href: '/teaching/pathways' },
        { label: 'Course Classification', href: '/teaching/classification' },
        { label: 'Four-Year Progression', href: '/teaching/progression' },
        { label: 'Assessment Philosophy', href: '/teaching/assessment' },
      ],
    },
    {
      label: 'Courses',
      href: '/courses',
      children: [
        { label: 'All Courses', href: '/courses' },
      ],
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      children: [
        { label: 'Research', href: '/portfolio#research' },
        { label: 'Projects', href: '/portfolio#projects' },
        { label: 'Events', href: '/portfolio#events' },
      ],
    },
    { label: 'Reflections', href: '/reflections' },
    {
      label: 'Resources',
      href: '/presentations',
      children: [
        { label: 'Presentations', href: '/presentations' },
        { label: 'Teaching Materials', href: '/library' },
        { label: 'Reading Lists', href: '/library' },
        { label: 'Data & External Sources', href: '/library' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ],
  tr: [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hakkında', href: '/about' },
    {
      label: 'Öğretim Merkezi',
      href: '/teaching',
      children: [
        { label: 'Öğretim Ethosu', href: '/teaching/ethos' },
        { label: 'İşletme Eğitiminin Amacı', href: '/teaching' },
        { label: 'Öğrenci Yolları', href: '/teaching/pathways' },
        { label: 'Ders Sınıflandırması', href: '/teaching/classification' },
        { label: 'Dört Yıllık İlerleme', href: '/teaching/progression' },
        { label: 'Değerlendirme Felsefesi', href: '/teaching/assessment' },
      ],
    },
    {
      label: 'Dersler',
      href: '/courses',
      children: [
        { label: 'Tüm Dersler', href: '/courses' },
      ],
    },
    {
      label: 'Portfolyo',
      href: '/portfolio',
      children: [
        { label: 'Araştırmalar', href: '/portfolio#research' },
        { label: 'Projeler', href: '/portfolio#projects' },
        { label: 'Etkinlikler', href: '/portfolio#events' },
      ],
    },
    { label: 'Düşünceler', href: '/reflections' },
    {
      label: 'Kaynaklar',
      href: '/presentations',
      children: [
        { label: 'Sunumlar', href: '/presentations' },
        { label: 'Öğretim Materyalleri', href: '/library' },
        { label: 'Okuma Listeleri', href: '/library' },
        { label: 'Veri ve Dış Kaynaklar', href: '/library' },
      ],
    },
    { label: 'İletişim', href: '/contact' },
  ],
  fr: [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    {
      label: 'Pôle pédagogique',
      href: '/teaching',
      children: [
        { label: 'Éthique pédagogique', href: '/teaching/ethos' },
        { label: 'Finalité de la formation en gestion', href: '/teaching' },
        { label: 'Parcours étudiants', href: '/teaching/pathways' },
        { label: 'Classification des cours', href: '/teaching/classification' },
        { label: 'Progression sur quatre ans', href: '/teaching/progression' },
        { label: "Philosophie de l'évaluation", href: '/teaching/assessment' },
      ],
    },
    {
      label: 'Cours',
      href: '/courses',
      children: [{ label: 'Tous les cours', href: '/courses' }],
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      children: [
        { label: 'Recherche', href: '/portfolio#research' },
        { label: 'Projets', href: '/portfolio#projects' },
        { label: 'Événements', href: '/portfolio#events' },
      ],
    },
    { label: 'Réflexions', href: '/reflections' },
    {
      label: 'Ressources',
      href: '/presentations',
      children: [
        { label: 'Présentations', href: '/presentations' },
        { label: 'Matériel pédagogique', href: '/library' },
        { label: 'Listes de lecture', href: '/library' },
        { label: 'Données et sources externes', href: '/library' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ],
}

type NavItemType = (typeof NAV_ITEMS)['en'][0]

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div style={{
      position: 'absolute', top: '100%', left: 0,
      backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3',
      minWidth: 220, zIndex: 200, boxShadow: '0 4px 16px rgba(11,31,51,0.08)',
    }}>
      {items.map((item) => (
        <Link key={item.label} href={item.href} style={{
          display: 'block', padding: '10px 20px',
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400,
          color: '#1E2328', textDecoration: 'none',
          borderBottom: '1px solid #F3EFE8', letterSpacing: '0.01em',
        }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#B08D45'; el.style.backgroundColor = '#FAFAF7' }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#1E2328'; el.style.backgroundColor = 'transparent' }}>
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function NavItemComponent({ item }: { item: NavItemType }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isResourceHub = item.href === '/presentations' && (
    pathname === '/presentations' ||
    pathname === '/library' ||
    pathname.startsWith('/resources/')
  )
  const isActive = isResourceHub || pathname === item.href || pathname.startsWith(item.href + '/')

  if (!item.children) {
    return (
      <Link href={item.href} style={{
        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
        color: isActive ? '#B08D45' : '#1E2328', textDecoration: 'none',
        letterSpacing: '0.04em', textTransform: 'uppercase', padding: '4px 0',
        transition: 'color 0.15s', borderBottom: isActive ? '1px solid #B08D45' : '1px solid transparent', paddingBottom: 2,
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#B08D45')}
        onMouseLeave={e => (e.currentTarget.style.color = isActive ? '#B08D45' : '#1E2328')}>
        {item.label}
      </Link>
    )
  }

  return (
    <div style={{ position: 'relative' }} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true" style={{
        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
        color: open || isActive ? '#B08D45' : '#1E2328', background: 'none', border: 'none',
        cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase',
        padding: '4px 0', display: 'flex', alignItems: 'center', gap: 4,
        transition: 'color 0.15s', borderBottom: isActive ? '1px solid #B08D45' : '1px solid transparent', paddingBottom: 2,
      }}>
        {item.label}
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
          <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <DropdownMenu items={item.children} />}
    </div>
  )
}

function MobileNavGroup({ item, onClose }: { item: NavItemType; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

  if (!item.children) {
    return (
      <div style={{ borderBottom: '1px solid #E7E0D3' }}>
        <Link href={item.href} onClick={onClose} style={{
          display: 'flex', alignItems: 'center', minHeight: 52,
          padding: '0 20px', fontFamily: 'Inter, sans-serif', fontSize: 14,
          fontWeight: 600, color: isActive ? '#B08D45' : '#0B1F33',
          textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          {item.label}
        </Link>
      </div>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid #E7E0D3' }}>
      <button onClick={() => setExpanded(!expanded)} aria-expanded={expanded} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        minHeight: 52, padding: '0 20px', fontFamily: 'Inter, sans-serif', fontSize: 14,
        fontWeight: 600, color: isActive ? '#B08D45' : '#0B1F33',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
      }}>
        {item.label}
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, color: '#6A747D' }}>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded && (
        <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3' }}>
          {item.children.map(child => (
            <Link key={child.label} href={child.href} onClick={onClose} style={{
              display: 'flex', alignItems: 'center', minHeight: 44,
              padding: '0 20px 0 32px', fontFamily: 'Inter, sans-serif', fontSize: 14,
              fontWeight: 400, color: '#1E2328', textDecoration: 'none',
              borderBottom: '1px solid #E7E0D3',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#B08D45')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1E2328')}>
              <span style={{ width: 4, height: 4, backgroundColor: '#B08D45', borderRadius: '50%', marginRight: 12, flexShrink: 0, display: 'inline-block' }} />
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function LangToggle() {
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const languages: { code: Lang; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'fr', label: 'Français' },
  ]

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          minWidth: 58, minHeight: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
          color: '#0B1F33', backgroundColor: '#FFFFFF', border: '1px solid #DCD6CB', padding: '5px 9px', cursor: 'pointer',
          transition: 'color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#B08D45'; e.currentTarget.style.borderColor = '#B08D45' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#0B1F33'; e.currentTarget.style.borderColor = '#DCD6CB' }}
      >
        {lang.toUpperCase()}
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} aria-hidden="true">
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div role="listbox" aria-label="Language" style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 128, zIndex: 230, backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', boxShadow: '0 6px 18px rgba(11,31,51,0.10)', overflow: 'hidden' }}>
          {languages.map(language => (
            <button
              type="button"
              key={language.code}
              role="option"
              aria-selected={lang === language.code}
              onClick={() => { setLang(language.code); setOpen(false) }}
              style={{
                width: '100%', minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                padding: '0 12px', background: lang === language.code ? '#F7F5F0' : '#FFFFFF', border: 'none', borderBottom: '1px solid #F0EBE0',
                color: lang === language.code ? '#B08D45' : '#1E2328', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: lang === language.code ? 700 : 500, letterSpacing: '0.03em',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F7F5F0'; e.currentTarget.style.color = '#B08D45' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = lang === language.code ? '#F7F5F0' : '#FFFFFF'; e.currentTarget.style.color = lang === language.code ? '#B08D45' : '#1E2328' }}
            >
              <span>{language.label}</span>
              <span style={{ fontSize: 9, letterSpacing: '0.08em', color: '#6A747D' }}>{language.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { lang } = useLanguage()
  const navItems = NAV_ITEMS[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  const isTurkish = lang === 'tr'
  const isFrench = lang === 'fr'
  const role = isTurkish ? 'Öğretim Görevlisi · İşletme Eğitimi' : isFrench ? 'Chargé de cours · Formation en gestion' : 'Lecturer · Business Education'
  const primaryNavigation = isTurkish ? 'Ana gezinme' : isFrench ? 'Navigation principale' : 'Primary navigation'
  const mobileNavigation = isTurkish ? 'Mobil gezinme' : isFrench ? 'Navigation mobile' : 'Mobile navigation'
  const menuLabel = menuOpen ? (isTurkish ? 'Menüyü kapat' : isFrench ? 'Fermer le menu' : 'Close menu') : (isTurkish ? 'Menüyü aç' : isFrench ? 'Ouvrir le menu' : 'Open menu')
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isTurkish ? 'Ana içeriğe geç' : isFrench ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <header style={{
        backgroundColor: '#F7F5F0', borderBottom: '1px solid #DED8CC',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1420, margin: '0 auto',
          padding: '0 24px', height: 80,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Brand */}
          <Link href="/" onClick={closeMenu} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            textDecoration: 'none', flexShrink: 0,
          }}>
            <AcademicMark />
            <div className="header-identity">
              <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', letterSpacing: '0.015em', lineHeight: 1.1 }}>Ateş Erol</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 400, color: '#3D454A', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.5 }}>
                {role}
              </div>
            </div>
          </Link>

          {/* Desktop Nav + Lang toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="header-desktop-nav">
            <nav aria-label={primaryNavigation} style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {navItems.map(item => <NavItemComponent key={item.label} item={item} />)}
            </nav>
            <LangToggle />
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div style={{ display: 'none', alignItems: 'center', gap: 10 }} className="header-mobile-btn">
            <LangToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuLabel} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', display: 'flex', minWidth: 44, minHeight: 44,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {menuOpen ? (
                  <path d="M5 5l12 12M17 5L5 17" stroke="#1E2328" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="19" y2="6" stroke="#1E2328" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="11" x2="19" y2="11" stroke="#1E2328" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="16" x2="19" y2="16" stroke="#1E2328" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div id="mobile-navigation" style={{
          position: 'fixed', inset: 0, backgroundColor: '#F7F5F0',
          zIndex: 90, paddingTop: 80, overflowY: 'auto',
        }}>
          <nav aria-label={mobileNavigation}>
            {navItems.map(item => <MobileNavGroup key={item.label} item={item} onClose={closeMenu} />)}
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .header-desktop-nav { display: none !important; }
          .header-mobile-btn { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .header-mobile-btn { display: none !important; }
          .header-desktop-nav { display: flex !important; }
        }
        @media (max-width: 480px) {
          .header-identity { display: none; }
        }
      `}</style>
    </>
  )
}
