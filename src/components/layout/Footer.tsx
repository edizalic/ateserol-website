'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import AcademicMark from '@/components/AcademicMark'

const FOOTER_DATA = {
  en: {
    tagline: 'Teaching, research, applied projects and notes on business education, feasibility and management.',
    teaching: {
      heading: 'Teaching',
      links: [
        { label: 'Purpose of Business Education', href: '/teaching' },
        { label: 'Student Pathways', href: '/teaching/pathways' },
        { label: 'Teaching Ethos', href: '/teaching/ethos' },
        { label: 'Course Classification', href: '/teaching/classification' },
        { label: 'Four-Year Progression', href: '/teaching/progression' },
        { label: 'Assessment Philosophy', href: '/teaching/assessment' },
      ],
    },
    quickLinks: {
      heading: 'Quick Links',
      links: [
        { label: 'All Courses', href: '/courses' },
        { label: 'Presentations', href: '/presentations' },
        { label: 'Research', href: '/portfolio#research' },
        { label: 'Projects', href: '/portfolio#projects' },
        { label: 'Events', href: '/portfolio#events' },
      ],
    },
    resources: {
      heading: 'Resources',
      links: [
        { label: 'Presentations', href: '/presentations' },
        { label: 'Teaching Materials', href: '/library' },
        { label: 'Reading Lists', href: '/library' },
        { label: 'Data & Sources', href: '/library' },
      ],
    },
    connect: { heading: 'Connect', link: 'Contact', href: '/contact' },
    copyright: `© ${new Date().getFullYear()} Ateş Erol.`,
    about: 'About',
    contact: 'Contact',
  },
  tr: {
    tagline: 'İşletme eğitimi, araştırmalar, uygulamalı projeler ve fizibilite ile yönetim üzerine notlar.',
    teaching: {
      heading: 'Öğretim',
      links: [
        { label: 'İşletme Eğitiminin Amacı', href: '/teaching' },
        { label: 'Öğrenci Yolları', href: '/teaching/pathways' },
        { label: 'Öğretim Ethosu', href: '/teaching/ethos' },
        { label: 'Ders Sınıflandırması', href: '/teaching/classification' },
        { label: 'Dört Yıllık İlerleme', href: '/teaching/progression' },
        { label: 'Değerlendirme Felsefesi', href: '/teaching/assessment' },
      ],
    },
    quickLinks: {
      heading: 'Hızlı Bağlantılar',
      links: [
        { label: 'Tüm Dersler', href: '/courses' },
        { label: 'Sunumlar', href: '/presentations' },
        { label: 'Araştırmalar', href: '/portfolio#research' },
        { label: 'Projeler', href: '/portfolio#projects' },
        { label: 'Etkinlikler', href: '/portfolio#events' },
      ],
    },
    resources: {
      heading: 'Kaynaklar',
      links: [
        { label: 'Sunumlar', href: '/presentations' },
        { label: 'Öğretim Materyalleri', href: '/library' },
        { label: 'Okuma Listeleri', href: '/library' },
        { label: 'Veri ve Kaynaklar', href: '/library' },
      ],
    },
    connect: { heading: 'Bağlantı', link: 'İletişim', href: '/contact' },
    copyright: `© ${new Date().getFullYear()} Ateş Erol.`,
    about: 'Hakkında',
    contact: 'İletişim',
  },
  fr: {
    tagline: 'Enseignement, recherche, projets appliqués et notes sur la formation en gestion, la faisabilité et le management.',
    teaching: {
      heading: 'Enseignement',
      links: [
        { label: 'Finalité de la formation en gestion', href: '/teaching' },
        { label: 'Parcours étudiants', href: '/teaching/pathways' },
        { label: 'Éthique pédagogique', href: '/teaching/ethos' },
        { label: 'Classification des cours', href: '/teaching/classification' },
        { label: 'Progression sur quatre ans', href: '/teaching/progression' },
        { label: "Philosophie de l'évaluation", href: '/teaching/assessment' },
      ],
    },
    quickLinks: {
      heading: 'Accès rapides',
      links: [
        { label: 'Tous les cours', href: '/courses' },
        { label: 'Présentations', href: '/presentations' },
        { label: 'Recherche', href: '/portfolio#research' },
        { label: 'Projets', href: '/portfolio#projects' },
        { label: 'Événements', href: '/portfolio#events' },
      ],
    },
    resources: {
      heading: 'Ressources',
      links: [
        { label: 'Présentations', href: '/presentations' },
        { label: 'Matériel pédagogique', href: '/library' },
        { label: 'Listes de lecture', href: '/library' },
        { label: 'Données et sources', href: '/library' },
      ],
    },
    connect: { heading: 'Contact', link: 'Contact', href: '/contact' },
    copyright: `© ${new Date().getFullYear()} Ateş Erol.`,
    about: 'À propos',
    contact: 'Contact',
  },
}

function ConnectIcon({ kind }: { kind: 'youtube' | 'instagram' | 'phone' | 'mail' }) {
  if (kind === 'youtube') return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </svg>
  )
  if (kind === 'instagram') return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
  if (kind === 'phone') return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 4.5 5 6c-.8.5-.9 1.6-.5 2.5 2.1 5 6 8.9 11 11 .9.4 2 .3 2.5-.5l1.5-2.5-4-2.5-1.7 1.7a14.7 14.7 0 0 1-4.5-4.5L11 9 7.5 4.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export default function Footer() {
  const { lang } = useLanguage()
  const F = FOOTER_DATA[lang]
  const isTurkish = lang === 'tr'
  const isFrench = lang === 'fr'
  const role = isTurkish ? 'Öğretim Görevlisi · İşletme Eğitimi' : isFrench ? 'Chargé de cours · Formation en gestion' : 'Lecturer · Business Education'

  return (
    <footer className="ref-footer">
      <div className="ref-footer-inner">
        {/* Brand column */}
        <div className="ref-footer-brand">
          <div className="ref-footer-brand-row">
            <AcademicMark size={52} />
            <div>
              <div className="ref-footer-name">Ateş Erol</div>
              <div className="ref-footer-role">{role}</div>
            </div>
          </div>
          <p>{F.tagline}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="ref-footer-heading">{F.quickLinks.heading}</h4>
          <ul className="ref-footer-links">
            {F.quickLinks.links.map(link => (
              <li key={`ql-${link.label}`}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Teaching */}
        <div>
          <h4 className="ref-footer-heading">{F.teaching.heading}</h4>
          <ul className="ref-footer-links ref-footer-links-2col">
            {F.teaching.links.map(link => (
              <li key={`t-${link.label}`}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="ref-footer-heading">{F.resources.heading}</h4>
          <ul className="ref-footer-links">
            {F.resources.links.map(link => (
              <li key={`r-${link.label}`}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="ref-footer-heading">{F.connect.heading}</h4>
          <Link className="ref-footer-contact" href={F.connect.href}>
            {F.connect.link} <span aria-hidden="true">→</span>
          </Link>
          <div className="ref-footer-icons">
            {(['youtube', 'instagram', 'phone', 'mail'] as const).map(kind => (
              <span key={kind}><ConnectIcon kind={kind} /></span>
            ))}
          </div>
        </div>
      </div>

      <div className="ref-footer-bottom">
        <span>{F.copyright}</span>
        <Link href="/about">{F.about}</Link>
        <Link href="/contact">{F.contact}</Link>
      </div>

      <style>{`
        .ref-footer { background:#0B1F33; color:#FFF; border-top:1px solid #20354A; }
        .ref-footer-inner { max-width:1420px; margin:0 auto; padding:48px 58px 36px; display:grid; grid-template-columns:1.45fr 1fr 1.3fr 1fr 1.15fr; gap:25px; }
        .ref-footer-brand-row { display:flex; align-items:center; gap:9px; margin-bottom:9px; }
        .ref-footer-brand-row img { width:52px; height:52px; flex-shrink:0; object-fit:contain; }
        .ref-footer-name { color:#F7F5F0; font:700 12px/1.2 'Libre Baskerville',Georgia,serif; }
        .ref-footer-role { color:#9BA9B2; font:400 10px/1.35 Inter,system-ui,sans-serif; letter-spacing:.07em; text-transform:uppercase; }
        .ref-footer-brand p { color:#9BA9B2; font:400 11px/1.45 Inter,system-ui,sans-serif; max-width:235px; margin:0; }
        .ref-footer-heading { color:#D3BD87; font:700 10px/1.2 Inter,system-ui,sans-serif; letter-spacing:.08em; text-transform:uppercase; margin:0 0 9px; }
        .ref-footer-links { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:4px; }
        .ref-footer-links-2col { display:grid; grid-template-columns:1fr 1fr; column-gap:14px; }
        .ref-footer-links a { color:#AAB5BC; font:400 10px/1.35 Inter,system-ui,sans-serif; text-decoration:none; }
        .ref-footer-links a:hover { color:#D3BD87; }
        .ref-footer-contact { color:#F7F5F0; font:400 11px/1.4 Inter,system-ui,sans-serif; text-decoration:none; }
        .ref-footer-contact span { color:#D3BD87; margin-left:7px; }
        .ref-footer-contact:hover { color:#D3BD87; }
        .ref-footer-icons { display:flex; gap:12px; margin-top:21px; color:#D3BD87; }
        .ref-footer-icons span { width:19px; height:19px; display:block; }
        .ref-footer-icons svg { width:100%; height:100%; }
        .ref-footer-bottom { max-width:1420px; margin:0 auto; padding:6px 58px 14px; border-top:1px solid #20354A; display:flex; align-items:center; justify-content:flex-end; gap:20px; }
        .ref-footer-bottom span { margin-right:auto; color:#AAB5BC; font:400 10px/1.35 Inter,system-ui,sans-serif; }
        .ref-footer-bottom a { color:#AAB5BC; font:400 10px/1.35 Inter,system-ui,sans-serif; text-decoration:none; }
        .ref-footer-bottom a:hover { color:#D3BD87; }
        @media (max-width:1050px) {
          .ref-footer-inner { grid-template-columns:1.3fr 1fr 1fr; padding-left:28px; padding-right:28px; }
          .ref-footer-inner > :last-child { grid-column:1/-1; }
          .ref-footer-bottom { padding-left:28px; padding-right:28px; }
        }
        @media (max-width:620px) {
          .ref-footer-inner { grid-template-columns:1fr 1fr; gap:24px; padding:27px 20px; }
          .ref-footer-brand { grid-column:1/-1; }
          .ref-footer-inner > :last-child { grid-column:auto; }
          .ref-footer-bottom { padding:13px 20px; flex-wrap:wrap; justify-content:flex-start; gap:12px 18px; }
          .ref-footer-bottom span { width:100%; }
        }
      `}</style>
    </footer>
  )
}
