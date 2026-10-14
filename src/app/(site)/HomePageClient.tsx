'use client'

import Link from 'next/link'
import { useState, useEffect, type ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import IllustratedIcon, { type IllustratedIconName } from '@/components/IllustratedIcon'

interface Reflection {
  slug: string
  title: Record<string, string>
  subtitle?: Record<string, string>
  excerpt?: Record<string, string>
}

export interface FeaturedEvent {
  title: Record<string, string>
  description?: Record<string, string>
  date: string
  location?: string
  type?: string
}

function loc(obj: Record<string, string> | undefined, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

function formatEventDate(iso: string, lang: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const locale = lang === 'tr' ? 'tr-TR' : lang === 'fr' ? 'fr-FR' : 'en-GB'
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

/* ─── Section label ─── */

function SectionLabel({
  children,
  dark = false,
  icon,
  iconSize = 32,
}: {
  children: ReactNode
  dark?: boolean
  icon: IllustratedIconName
  iconSize?: number
}) {
  return (
    <div className={dark ? 'ref-label ref-label-dark' : 'ref-label'}>
      <IllustratedIcon name={icon} size={iconSize} />
      <span className="ref-label-text">{children}</span>
    </div>
  )
}

/* ─── Feature icon ─── */

type FeatureIconKind = 'feasibility' | 'strategy' | 'research' | 'projects' | 'trophy' | 'document'

function FeatureIcon({ kind }: { kind: FeatureIconKind }) {
  const map: Record<FeatureIconKind, IllustratedIconName> = {
    feasibility: 'feasibility-project-thinking',
    strategy: 'strategy-decision-making',
    research: 'research-data-ai',
    projects: 'portfolio',
    trophy: 'tough-but-fair',
    document: 'presentations-materials',
  }
  return <IllustratedIcon name={map[kind]} size="100%" />
}

/* ─── Arrow icons ─── */

function ArrowRight() {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true">
      <path d="M9.5 1 13 4.5 9.5 8M1 4.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v8M4 6l3 3 3-3M2 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Content data ─── */

const COURSE_AREAS = [
  { title: 'Feasibility & project thinking', titleTr: 'Fizibilite ve proje düşüncesi', titleFr: 'Faisabilité et réflexion par projet' },
  { title: 'Strategy & decision-making', titleTr: 'Strateji ve karar verme', titleFr: 'Stratégie et prise de décision' },
  { title: 'Research, data & AI', titleTr: 'Araştırma, veri ve yapay zekâ', titleFr: 'Recherche, données et IA' },
]

const TEXT = {
  en: {
    motto: 'The only price for knowledge should be the effort to obtain it.',
    intro: 'This website is designed as a teaching archive, course guide, and intellectual space for business education. It brings together my teaching ethos, course structures, academic presentations, student projects, and reflections on education, business, entrepreneurship, and academic life.',
    aim: 'My aim is to make knowledge accessible without making it effortless. Education should not be artificially restricted, but neither should it be reduced to passive consumption. Students should be expected to work, question, apply, and produce.',
    cta2: 'Browse Course Areas',
    cta2Link: 'Browse Presentations',
    card1Label: 'Course Areas',
    card2Label: 'Teaching Archive',
    viewCourse: 'View Course',
    card2Link: 'Browse Presentations',
    card3Title: 'Portfolio',
    card3Desc: 'Research, projects and events all in one place.',
    card3Link: 'Explore Portfolio',
    portfolioCategories: ['Research', 'Projects', 'Events'],
    latestLabel: 'Latest Reflection',
    latestRead: 'Read Essay',
    eventName: 'Tough but Fair',
    eventSub: 'Ideas · Pressure · Impact',
    curiosityLabel: 'Curiosity and systems',
    curiosityBody: 'They ask how things connect, what drives outcomes and where models break down. Curiosity is teachable when it is modeled and rewarded, not merely mentioned.',
    ethosLink: 'Teaching Ethos',
    archiveItems: ['Presentations', 'Class notes', 'Templates and selected datasets'],
    archiveOpen: 'View',
  },
  tr: {
    motto: 'Bilginin tek bedeli, onu edinmek için gösterilen çaba olmalıdır.',
    intro: 'Bu site; işletme eğitimine ayrılmış bir öğretim arşivi, ders rehberi ve düşünsel alan olarak tasarlandı. Öğretim yaklaşımımı, ders yapılarını, akademik sunumları, öğrenci projelerini ve eğitim, işletme, girişimcilik ile akademik yaşama dair düşüncelerimi bir araya getiriyor.',
    aim: 'Amacım, bilgiyi zahmetsiz bir tüketime dönüştürmeden erişilebilir kılmak. Eğitim yapay biçimde kısıtlanmamalı, ancak pasif bir tüketim biçimine de indirgenmemelidir. Öğrencilerden çalışmaları, sorgulamaları, uygulamaları ve üretmeleri beklenmelidir.',
    cta2: 'Ders Alanlarına Göz At',
    cta2Link: 'Sunumlara Göz At',
    card1Label: 'Ders Alanları',
    card2Label: 'Öğretim Arşivi',
    viewCourse: 'Dersi İncele',
    card2Link: 'Sunumlara Göz At',
    card3Title: 'Portfolyo',
    card3Desc: 'Araştırmalar, projeler ve etkinlikler tek bir yerde.',
    card3Link: 'Portfolyoyu Keşfet',
    portfolioCategories: ['Araştırmalar', 'Projeler', 'Etkinlikler'],
    latestLabel: 'Son Düşünce',
    latestRead: 'Makaleyi Oku',
    eventName: 'Tough but Fair',
    eventSub: 'Fikirler · Baskı · Etki',
    curiosityLabel: 'Merak ve sistemler',
    curiosityBody: 'Bu kişiler, unsurların nasıl birbirine bağlandığını, sonuçları nelerin belirlediğini ve modellerin nerede aksadığını sorgular. Merak, yalnızca sözünü etmekle değil; örnek olarak gösterilip teşvik edildiğinde öğretilebilir.',
    ethosLink: 'Öğretim Ethosu',
    archiveItems: ['Sunumlar', 'Ders notları', 'Şablonlar ve seçilmiş veri setleri'],
    archiveOpen: 'Aç',
  },
  fr: {
    motto: "Le seul prix du savoir devrait être l'effort nécessaire pour l'acquérir.",
    intro: "Ce site est conçu comme une archive pédagogique, un guide de cours et un espace de réflexion consacré à la formation en gestion. Il réunit mon éthique pédagogique, les structures des cours, des présentations universitaires, des projets étudiants et des réflexions sur l'éducation, l'entreprise, l'entrepreneuriat et la vie académique.",
    aim: "Mon objectif est de rendre le savoir accessible sans le rendre exempt d'effort. L'éducation ne devrait pas être artificiellement restreinte, mais elle ne devrait pas non plus être réduite à une consommation passive. Les étudiants doivent travailler, questionner, appliquer et produire.",
    cta2: 'Explorer les domaines de cours',
    cta2Link: 'Voir les présentations',
    card1Label: 'Domaines de cours',
    card2Label: 'Archives pédagogiques',
    viewCourse: 'Voir les cours',
    card2Link: 'Voir les présentations',
    card3Title: 'Portfolio',
    card3Desc: 'Recherche, projets et événements réunis au même endroit.',
    card3Link: 'Explorer le portfolio',
    portfolioCategories: ['Recherche', 'Projets', 'Événements'],
    latestLabel: 'Dernière réflexion',
    latestRead: "Lire l'essai",
    eventName: 'Tough but Fair',
    eventSub: 'Idées · Pression · Impact',
    curiosityLabel: 'Curiosité et systèmes',
    curiosityBody: "Ils se demandent comment les éléments se relient, ce qui produit les résultats et où les modèles se décomposent. La curiosité s'enseigne lorsqu'elle est incarnée et valorisée, et pas seulement évoquée.",
    ethosLink: 'Éthique pédagogique',
    archiveItems: ['Présentations', 'Notes de cours', 'Modèles et jeux de données sélectionnés'],
    archiveOpen: 'Voir',
  },
}

export default function HomePageClient({ featuredEvent = null }: { featuredEvent?: FeaturedEvent | null }) {
  const { lang } = useLanguage()
  const L = TEXT[lang]
  const [ref, setRef] = useState<Reflection | null>(null)

  const eventTitle = featuredEvent ? (loc(featuredEvent.title, lang) || L.eventName) : L.eventName
  const eventSubtitle = featuredEvent
    ? [featuredEvent.type, featuredEvent.location, formatEventDate(featuredEvent.date, lang)].filter(Boolean).join(' · ')
    : L.eventSub
  const eventBody = featuredEvent ? (loc(featuredEvent.description, lang) || L.aim) : L.aim

  useEffect(() => {
    fetch('/api/reflections')
      .then(r => r.ok ? r.json() : [])
      .then((data: Reflection[]) => { if (data.length) setRef(data[0]) })
      .catch(() => {})
  }, [])

  const courseCards = [
    {
      title: COURSE_AREAS[0][lang === 'tr' ? 'titleTr' : lang === 'fr' ? 'titleFr' : 'title'],
      body: lang === 'tr' ? 'Fizibilite, sistemler ve uygulanabilir proje çalışmaları' : lang === 'fr' ? 'Faisabilité, systèmes et travail de projet appliqué' : 'Feasibility, systems and applied project work',
      icon: 'feasibility' as FeatureIconKind,
    },
    {
      title: COURSE_AREAS[1][lang === 'tr' ? 'titleTr' : lang === 'fr' ? 'titleFr' : 'title'],
      body: lang === 'tr' ? 'Karar verme ve örgütsel düşünme' : lang === 'fr' ? 'Prise de décision et réflexion organisationnelle' : 'Decision-making and organisational thinking',
      icon: 'strategy' as FeatureIconKind,
    },
    {
      title: COURSE_AREAS[2][lang === 'tr' ? 'titleTr' : lang === 'fr' ? 'titleFr' : 'title'],
      body: lang === 'tr' ? 'Araştırma, veri ve yapay zekâ' : lang === 'fr' ? 'Recherche, données et intelligence artificielle' : 'Research, data and AI',
      icon: 'research' as FeatureIconKind,
    },
    { title: L.card3Title, body: L.card3Desc, icon: 'projects' as FeatureIconKind },
  ]

  return (
    <div className="ref-home">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="ref-hero">
        <div className="ref-hero-inner">
          <div className="ref-hero-copy">
            <svg className="ref-column-art" viewBox="0 0 190 365" fill="none" aria-hidden="true">
              <path d="M0 35h112M0 45h102M17 45v224M75 45v224M133 45v224M7 269h150M0 282h170M0 294h180M35 35c9-13 24-17 39 0M112 35c9-13 24-17 39 0" stroke="#BEB7AA" strokeWidth="1.1" />
              <path d="M0 0h190v365H0z" stroke="#D7D0C4" strokeWidth="1" />
            </svg>
            <div className="ref-hero-copy-inner">
              <h1>{L.motto}</h1>
              <div className="ref-hero-body"><p>{L.intro}</p></div>
              <div className="ref-hero-actions">
                <Link href="/courses" className="ref-button ref-button-dark">{L.cta2}<ArrowRight /></Link>
                <Link href="/presentations" className="ref-button ref-button-light">{L.cta2Link}<ArrowDown /></Link>
              </div>
            </div>
          </div>
          <div className="ref-hero-visual" aria-hidden="true" />
        </div>
      </section>

      {/* ── Feature band ─────────────────────────────────────── */}
      <section className="ref-feature-band">

        {/* Course areas */}
        <div className="ref-feature-courses">
          <SectionLabel icon="courses" iconSize={58}>{L.card1Label}</SectionLabel>
          <div className="ref-course-grid">
            {courseCards.map(course => (
              <Link href="/courses" className="ref-course-card" key={course.title}>
                <div className="ref-course-icon"><FeatureIcon kind={course.icon} /></div>
                <h2>{course.title}</h2>
                <p>{course.body}</p>
                <span>{L.viewCourse} <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Presentations / Teaching archive */}
        <div className="ref-presentations">
          <SectionLabel icon="teaching-archive" iconSize={66}>{L.card2Label}</SectionLabel>
          <div className="ref-presentation-list">
            {L.archiveItems.map(item => (
              <div className="ref-presentation-row" key={item}>
                <div className="ref-document-icon"><FeatureIcon kind="document" /></div>
                <div>
                  <strong>{item}</strong>
                  <small>{L.card2Label}</small>
                </div>
                <span>{L.archiveOpen} <ArrowDown /></span>
              </div>
            ))}
          </div>
          <Link href="/presentations" className="ref-inline-link">{L.card2Link} <ArrowRight /></Link>
        </div>

        {/* Teaching ethos / curiosity */}
        <div className="ref-ethos">
          <SectionLabel icon="curiosity-systems" iconSize={66}>{L.curiosityLabel}</SectionLabel>
          <p>{L.curiosityBody}</p>
          <Link href="/teaching/ethos" className="ref-inline-link">{L.ethosLink} <ArrowRight /></Link>
        </div>
      </section>

      {/* ── Lower band ───────────────────────────────────────── */}
      <section className="ref-lower-band">

        {/* Event intro */}
        <div className="ref-event-intro">
          <div className="ref-event-icon"><FeatureIcon kind="trophy" /></div>
          <h2>{eventTitle}</h2>
          <p>{eventBody}</p>
          <Link href="/portfolio" className="ref-inline-link">{L.card3Link} <ArrowRight /></Link>
        </div>

        {/* Event image panel */}
        <Link href="/portfolio" className="ref-event-image" aria-label={eventTitle}>
          <div className="ref-event-image-overlay">
            <span>{eventTitle}</span>
            {eventSubtitle && <small>{eventSubtitle}</small>}
          </div>
        </Link>

        {/* Portfolio promo */}
        <Link href="/portfolio" className="ref-portfolio-promo">
          <div className="ref-portfolio-header">
            <div className="ref-portfolio-icon"><FeatureIcon kind="projects" /></div>
            <h2>{L.card3Title}</h2>
          </div>
          <p>{L.card3Desc}</p>
          <span className="ref-inline-link">{L.card3Link} <ArrowRight /></span>
        </Link>

        {/* Latest reflection */}
        <div className="ref-latest-list">
          <SectionLabel icon="reflections" iconSize={36}>{L.latestLabel}</SectionLabel>
          {ref ? (
            <>
              <h2>{loc(ref.title, lang)}</h2>
              {ref.subtitle && <p>{loc(ref.subtitle, lang)}</p>}
              {ref.excerpt && <p>{loc(ref.excerpt, lang)}</p>}
              <Link href={`/reflections/${ref.slug}`} className="ref-inline-link">{L.latestRead} <ArrowRight /></Link>
            </>
          ) : (
            <p style={{ color: '#6A747D', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>—</p>
          )}
        </div>
      </section>

      <style>{`
        .ref-home { background:#F7F5F0; color:#1E2328; --navy:#0B1F33; --gold:#B08D45; --line:#DCD6CB; --muted:#6A747D; }
        .ref-home a { text-decoration:none; transition:background .15s ease,color .15s ease,border-color .15s ease; }

        /* ── Hero ── */
        .ref-hero { border-bottom:1px solid var(--line); background-color:#F1EEE8; background-image:linear-gradient(90deg,rgba(247,245,240,.12),rgba(247,245,240,.04)),url('/images/academic-hero-portrait.jpeg'); background-size:cover; background-position:center center; }
        .ref-hero-inner { display:grid; grid-template-columns:47% 53%; min-height:415px; max-width:1536px; margin:0 auto; }
        .ref-hero-copy { position:relative; overflow:hidden; border-right:1px solid rgba(220,214,203,.9); background:linear-gradient(90deg,rgba(247,245,240,.74),rgba(247,245,240,.38)); }
        .ref-column-art { display:none; }
        .ref-hero-copy-inner { position:relative; z-index:1; max-width:510px; margin-left:clamp(110px,15.7vw,242px); padding:37px 22px 32px 0; }
        .ref-hero h1 { color:var(--navy); font:400 clamp(34px,3vw,48px)/1.1 'Libre Baskerville',Georgia,serif; letter-spacing:-.025em; margin:0 0 17px; max-width:500px; }
        .ref-hero-body { max-width:480px; }
        .ref-hero-body p { color:#1E2328; font:400 15px/1.62 Inter,system-ui,sans-serif; margin:0; }
        .ref-hero-actions { display:flex; gap:12px; margin-top:22px; flex-wrap:wrap; }
        .ref-button { min-height:44px; display:inline-flex; align-items:center; gap:11px; padding:0 16px; font:700 10.5px/1 Inter,system-ui,sans-serif; letter-spacing:.06em; text-transform:uppercase; white-space:nowrap; }
        .ref-button-dark { color:#FFF; background:var(--navy); }
        .ref-button-dark:hover { background:#193853; }
        .ref-button-light { color:#6C542C; border:1px solid #B9A98D; background:transparent; }
        .ref-button-light:hover { color:var(--navy); border-color:var(--navy); }
        .ref-hero-visual { min-height:415px; position:relative; overflow:hidden; background:transparent; }

        /* ── Section label ── */
        .ref-label { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; margin-bottom:20px; font:700 11.5px/1.25 Inter,system-ui,sans-serif; color:#5A4A2F; letter-spacing:.075em; text-align:center; text-transform:uppercase; }
        .ref-label img { width:25px; height:25px; object-fit:contain; flex-shrink:0; }
        .ref-label-text { display:inline-block; }
        .ref-label-dark { color:#D6BC81; }
        .ref-label-dark .ref-label-text { color:#D6BC81; }

        /* ── Feature band ── */
        .ref-feature-band { display:grid; grid-template-columns:2.2fr 1.35fr .95fr; gap:0; padding:25px 58px 28px; max-width:1536px; margin:0 auto; border-bottom:1px solid var(--line); }
        .ref-feature-courses { padding-right:31px; border-right:1px solid var(--line); text-align:center; }
        .ref-presentations { padding:0 31px; border-right:1px solid var(--line); text-align:center; }
        .ref-ethos { padding-left:31px; display:flex; flex-direction:column; text-align:center; }

        .ref-course-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
        .ref-course-card { min-height:242px; padding:20px 16px 17px; border:1px solid var(--line); background:#F9F8F4; display:flex; flex-direction:column; color:var(--navy); }
        .ref-course-card:hover { border-color:var(--gold); background:#FFFDF8; }
        .ref-course-icon { width:60px; height:60px; color:var(--navy); margin:0 auto 12px; display:flex; align-items:center; justify-content:center; }
        .ref-course-icon img { width:100%; height:100%; object-fit:contain; display:block; }
        .ref-course-card h2 { color:var(--navy); font:700 16px/1.3 'Libre Baskerville',Georgia,serif; text-align:center; margin:0 0 11px; }
        .ref-course-card p { color:#343A3E; font:400 12.5px/1.58 Inter,system-ui,sans-serif; text-align:center; margin:0 0 13px; }
        .ref-course-card span { display:flex; align-items:center; justify-content:center; gap:7px; margin-top:auto; color:#26313A; font:700 10.5px/1.15 Inter,system-ui,sans-serif; letter-spacing:.035em; }

        .ref-feature-courses > .ref-label .ref-label-text,
        .ref-presentations > .ref-label .ref-label-text,
        .ref-ethos > .ref-label .ref-label-text { color:var(--navy); font:700 18px/1.28 'Libre Baskerville',Georgia,serif; letter-spacing:0; text-transform:none; }
        .ref-presentations > .ref-label .ref-label-text,
        .ref-ethos > .ref-label .ref-label-text { font-size:20px; }

        .ref-presentation-list { border-top:1px solid var(--line); }
        .ref-presentation-row { display:grid; grid-template-columns:30px 1fr auto; gap:10px; align-items:center; min-height:56px; border-bottom:1px solid var(--line); }
        .ref-document-icon { color:#434A4D; width:24px; height:24px; }
        .ref-document-icon img { width:100%; height:100%; object-fit:contain; display:block; }
        .ref-presentation-row strong { display:block; color:#1C2328; font:600 13px/1.32 Inter,system-ui,sans-serif; }
        .ref-presentation-row small { display:block; color:#6A747D; font:400 11px/1.4 Inter,system-ui,sans-serif; }
        .ref-presentation-row > span { display:flex; align-items:center; gap:6px; color:#1E2328; font:500 10.5px/1 Inter,system-ui,sans-serif; white-space:nowrap; }

        .ref-inline-link { display:inline-flex; align-items:center; gap:8px; color:var(--navy); font:700 11px/1.15 Inter,system-ui,sans-serif; letter-spacing:.06em; text-transform:uppercase; }
        .ref-inline-link:hover { color:var(--gold); }
        .ref-ethos p { color:#343A3E; font:400 12.5px/1.6 Inter,system-ui,sans-serif; margin:0 0 16px; }
        .ref-ethos .ref-inline-link { margin:0 auto; }

        /* ── Lower band ── */
        .ref-lower-band { display:grid; grid-template-columns:1.02fr 1.47fr 1.47fr .96fr; gap:16px; align-items:stretch; padding:28px 58px 30px; max-width:1536px; margin:0 auto; border-bottom:1px solid var(--line); }
        .ref-event-intro { padding:16px 24px 18px; min-height:250px; display:flex; flex-direction:column; text-align:center; }
        .ref-event-icon { width:58px; height:58px; color:var(--gold); margin:0 auto 12px; }
        .ref-event-icon img { width:100%; height:100%; object-fit:contain; display:block; }
        .ref-event-intro h2 { color:var(--navy); font:700 15px/1.28 'Libre Baskerville',Georgia,serif; margin:0 0 11px; text-transform:uppercase; }
        .ref-event-intro p { color:#343A3E; font:400 12px/1.55 Inter,system-ui,sans-serif; margin:0 0 16px; display:-webkit-box; -webkit-line-clamp:6; -webkit-box-orient:vertical; overflow:hidden; }
        .ref-event-intro .ref-inline-link { margin:auto auto 0; }

        .ref-event-image { min-height:250px; background:linear-gradient(120deg,#2A2925 0%,#121C20 54%,#3C372E 100%); position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .ref-event-image:before { content:''; position:absolute; inset:0; opacity:.35; background:repeating-linear-gradient(90deg,transparent 0 22px,rgba(255,255,255,.08) 23px 24px); }
        .ref-event-image-overlay { position:relative; text-align:center; color:#F7F5F0; padding:27px; border:1px solid rgba(211,189,135,.46); }
        .ref-event-image-overlay span { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; font:700 28px/1.18 'Libre Baskerville',Georgia,serif; letter-spacing:.03em; }
        .ref-event-image-overlay small { display:block; color:#D3BD87; font:700 10px/1.25 Inter,system-ui,sans-serif; letter-spacing:.15em; text-transform:uppercase; margin-top:11px; }

        .ref-portfolio-promo { min-height:250px; position:relative; background:var(--navy); padding:22px 24px 20px; color:#FFF; overflow:hidden; display:flex; flex-direction:column; text-align:center; }
        .ref-portfolio-header { display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; }
        .ref-portfolio-icon { width:104px; height:104px; padding:7px; margin:0 auto 12px; background:rgba(255,255,255,.94); border:1px solid rgba(211,189,135,.52); border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .ref-portfolio-icon img { width:100%; height:100%; object-fit:contain; display:block; }
        .ref-portfolio-promo h2 { width:100%; color:#FFF; font:400 23px/1.23 'Libre Baskerville',Georgia,serif; margin:0 0 13px; text-align:center; }
        .ref-portfolio-promo p { color:#C7D0D5; font:400 12.5px/1.6 Inter,system-ui,sans-serif; max-width:240px; margin:0 auto 18px; }
        .ref-portfolio-promo .ref-inline-link { margin:0 auto; color:#D3BD87; }
        .ref-portfolio-promo .ref-inline-link:hover { color:#FFF; }

        .ref-latest-list { padding:16px 4px 18px 12px; min-height:250px; display:flex; flex-direction:column; text-align:center; }
        .ref-latest-list h2 { color:var(--navy); font:700 15px/1.36 'Libre Baskerville',Georgia,serif; margin:0 0 12px; }
        .ref-latest-list p { color:#343A3E; font:400 12px/1.58 Inter,system-ui,sans-serif; margin:0 0 11px; }
        .ref-latest-list .ref-inline-link { align-self:center; margin-top:auto; padding-top:6px; }

        /* ── Responsive ── */
        @media (max-width:1120px) {
          .ref-hero-copy-inner { margin-left:100px; }
          .ref-feature-band { padding-left:28px; padding-right:28px; grid-template-columns:1.5fr 1fr; gap:28px 0; }
          .ref-feature-courses { padding-right:28px; }
          .ref-course-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .ref-ethos { grid-column:1/-1; padding-left:0; border-top:1px solid var(--line); padding-top:24px; }
          .ref-lower-band { padding-left:28px; padding-right:28px; grid-template-columns:1fr 1.25fr; }
          .ref-latest-list { padding-left:0; }
        }
        @media (max-width:820px) {
          .ref-hero { background-image:none; }
          .ref-hero-inner { grid-template-columns:1fr; min-height:0; }
          .ref-hero-copy { order:2; border-right:0; background:#F7F5F0; }
          .ref-hero-copy-inner { max-width:640px; margin-left:clamp(28px,12vw,90px); padding-right:28px; }
          .ref-hero-visual { order:1; min-height:clamp(290px,78vw,430px); border-bottom:1px solid var(--line); background-image:url('/images/academic-hero-portrait.jpeg'); background-repeat:no-repeat; background-size:cover; background-position:76% center; }
          .ref-feature-band { grid-template-columns:1fr; gap:28px; }
          .ref-feature-courses, .ref-presentations { padding:0 0 28px; border-right:0; border-bottom:1px solid var(--line); }
          .ref-ethos { grid-column:auto; border-top:0; padding:0; }
          .ref-course-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .ref-lower-band { grid-template-columns:1fr; padding-top:28px; padding-bottom:30px; }
          .ref-event-intro, .ref-event-image, .ref-portfolio-promo, .ref-latest-list { min-height:0; }
          .ref-event-intro { padding-left:0; }
          .ref-latest-list { padding-left:0; }
        }
        @media (max-width:620px) {
          .ref-hero-copy-inner { margin-left:24px; padding:32px 24px 34px 0; }
          .ref-hero-visual { min-height:clamp(300px,92vw,390px); background-position:79% center; }
          .ref-hero h1 { font-size:clamp(32px,9.5vw,40px); }
          .ref-hero-body p { font-size:16px; line-height:1.65; }
          .ref-hero-actions { gap:10px; }
          .ref-button { width:100%; justify-content:space-between; font-size:12px; }
          .ref-feature-band, .ref-lower-band { padding-left:22px; padding-right:22px; }
          .ref-course-grid { grid-template-columns:1fr; }
          .ref-course-card { min-height:0; padding:26px 22px 22px; }
          .ref-course-icon { width:72px; height:72px; }
          .ref-course-card h2 { font-size:19px; }
          .ref-course-card p { font-size:15px; }
          .ref-presentation-row { grid-template-columns:38px 1fr; gap:12px; padding:11px 0; }
          .ref-document-icon { width:32px; height:32px; }
          .ref-presentation-row strong { font-size:15px; }
          .ref-presentation-row small { font-size:13px; }
          .ref-presentation-row > span { grid-column:2; padding-bottom:3px; font-size:12px; }
          .ref-ethos p, .ref-event-intro p, .ref-portfolio-promo p, .ref-latest-list p { font-size:14px; }
          .ref-event-intro { padding:0 0 4px; }
          .ref-event-icon { width:72px; height:72px; }
          .ref-event-image { min-height:245px; }
          .ref-portfolio-promo { min-height:270px; }
          .ref-latest-list { padding-top:4px; }
        }
      `}</style>
    </div>
  )
}
