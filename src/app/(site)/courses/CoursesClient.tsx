'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface Course {
  id: string
  slug: string
  title: Record<string, string>
  subtitle?: Record<string, string>
  description?: Record<string, string>
  published: boolean
  categories?: { name: Record<string, string> }[]
}

function loc(obj: Record<string, string> | undefined | null, lang: string): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || ''
}

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbCourses: 'Courses',
    heroLabel: 'Teaching Areas', heroHeading: 'Teaching Areas & Course Structure',
    heroBody: 'The six areas below represent the domains in which courses are taught. A verified course catalogue will be added as individual course records are confirmed.',
    filterPlaceholder: 'Filter by area or topic…',
    noResultsHeading: 'No areas match your search', noResultsClear: 'Clear',
    exploreArea: 'Explore Area',
    courseFunctionsLabel: 'Course Functions', courseFunctionsHeading: 'What each course does',
    learningProgressionLabel: 'Learning Progression', learningProgressionHeading: 'From foundations to judgment',
    tierILabel: 'TIER I', tierIHeading: 'Foundations', tierIBody: 'Accuracy, consistency, and command of established frameworks. There are better and worse answers. Students learn to use analytical tools correctly.',
    tierIILabel: 'TIER II', tierIIHeading: 'Synthesis & Judgment', tierIIBody: 'Independent analysis and defensible positions in genuinely ambiguous situations. Students evaluate frameworks critically and exercise their own judgment.',
    teachingPhilosophyLink: 'Teaching Philosophy',
    more: 'more',
    courseFunctionItems: [
      { label: 'Theoretical', desc: 'Builds conceptual foundations — frameworks and models students will apply elsewhere.' },
      { label: 'Practical', desc: 'Develops applied skills — translating concepts into real outputs: feasibility studies, analyses, financial models.' },
      { label: 'Business Development', desc: 'Oriented toward creating and expanding commercial activity — viability testing and growth structuring.' },
      { label: 'Technical', desc: 'Develops quantitative or domain-specific competency — econometrics, data analysis, trade modelling.' },
    ],
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbCourses: 'Dersler',
    heroLabel: 'Öğretim Alanları', heroHeading: 'Öğretim Alanları & Ders Yapısı',
    heroBody: 'Aşağıdaki altı alan, derslerin verildiği disiplinleri temsil etmektedir. Bireysel ders kayıtları onaylandıkça doğrulanmış bir ders kataloğu eklenecektir.',
    filterPlaceholder: 'Alan veya konuya göre filtrele…',
    noResultsHeading: 'Aramanızla eşleşen alan bulunamadı', noResultsClear: 'Temizle',
    exploreArea: 'Alana Göz At',
    courseFunctionsLabel: 'Ders İşlevleri', courseFunctionsHeading: 'Her dersin işlevi',
    learningProgressionLabel: 'Öğrenme İlerlemesi', learningProgressionHeading: 'Temellerden yargıya',
    tierILabel: 'KADEME I', tierIHeading: 'Temeller', tierIBody: 'Yerleşik çerçevelere doğruluk, tutarlılık ve hâkimiyet. Daha iyi ve daha kötü yanıtlar mevcuttur. Öğrenciler analitik araçları doğru kullanmayı öğrenir.',
    tierIILabel: 'KADEME II', tierIIHeading: 'Sentez & Yargı', tierIIBody: 'Gerçek anlamda belirsiz durumlarda bağımsız analiz ve savunulabilir pozisyonlar. Öğrenciler çerçeveleri eleştirel olarak değerlendirir ve kendi yargılarını kullanır.',
    teachingPhilosophyLink: 'Öğretim Felsefesi',
    more: 'daha',
    courseFunctionItems: [
      { label: 'Kuramsal', desc: 'Kavramsal temeller oluşturur — öğrencilerin başka yerlerde uygulayacağı çerçeveler ve modeller.' },
      { label: 'Uygulamalı', desc: 'Uygulamalı beceriler geliştirir — kavramları gerçek çıktılara dönüştürür: fizibilite çalışmaları, analizler, finansal modeller.' },
      { label: 'İş Geliştirme', desc: 'Ticari faaliyeti yaratmaya ve büyütmeye yöneliktir — fizibilite testi ve büyüme yapılandırma.' },
      { label: 'Teknik', desc: 'Nicel veya alana özgü yetkinlik geliştirir — ekonometri, veri analizi, ticaret modellemesi.' },
    ],
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbCourses: 'Cours',
    heroLabel: 'Domaines d’enseignement', heroHeading: 'Domaines d’enseignement et structure des cours',
    heroBody: 'Les six domaines ci-dessous représentent les champs dans lesquels les cours sont enseignés. Un catalogue de cours vérifié sera ajouté à mesure que les notices individuelles seront confirmées.',
    filterPlaceholder: 'Filtrer par domaine ou sujet…',
    noResultsHeading: 'Aucun domaine ne correspond à votre recherche', noResultsClear: 'Effacer',
    exploreArea: 'Explorer le domaine',
    courseFunctionsLabel: 'Fonctions des cours', courseFunctionsHeading: 'Ce que chaque cours fait',
    learningProgressionLabel: 'Progression de l’apprentissage', learningProgressionHeading: 'Des fondements au jugement',
    tierILabel: 'NIVEAU I', tierIHeading: 'Fondements', tierIBody: 'Exactitude, cohérence et maîtrise des cadres établis. Il existe de meilleures et de moins bonnes réponses. Les étudiants apprennent à utiliser correctement les outils d’analyse.',
    tierIILabel: 'NIVEAU II', tierIIHeading: 'Synthèse et jugement', tierIIBody: 'Analyse indépendante et positions défendables dans des situations réellement ambiguës. Les étudiants évaluent les cadres de manière critique et exercent leur propre jugement.',
    teachingPhilosophyLink: 'Philosophie d’enseignement',
    more: 'de plus',
    courseFunctionItems: [
      { label: 'Théorique', desc: 'Construit les fondements conceptuels — cadres et modèles que les étudiants appliqueront ailleurs.' },
      { label: 'Pratique', desc: 'Développe des compétences appliquées — traduire les concepts en productions réelles : études de faisabilité, analyses, modèles financiers.' },
      { label: 'Développement d’entreprise', desc: 'Orienté vers la création et l’expansion d’une activité commerciale — test de viabilité et structuration de la croissance.' },
      { label: 'Technique', desc: 'Développe une compétence quantitative ou spécifique à un domaine — économétrie, analyse de données, modélisation du commerce.' },
    ],
  },
}

const TEACHING_AREAS = {
  en: [
    { slug: 'e-commerce', title: 'E-Commerce', subtitle: 'Digital business models & platforms', description: 'Business model design, platform economics, digital marketing fundamentals, and e-commerce feasibility. From concept to operational plan.', topics: ['Business models', 'SEO & digital marketing', 'Platform strategy', 'Feasibility analysis', 'Competition analysis'], accent: '#0B1F33' },
    { slug: 'management-organization', title: 'Management & Organization', subtitle: 'Leadership, behaviour & organizational design', description: 'Organizational behavior, management theory, leadership models, and team dynamics. How organizations work and how to run them better.', topics: ['Organizational behavior', 'Leadership models', 'Change management', 'Team dynamics', 'Motivation theory'], accent: '#1A3550' },
    { slug: 'project-management-feasibility', title: 'Project Management & Feasibility', subtitle: 'From idea to implementable plan', description: 'Feasibility analysis methodology, project planning, financial modeling, and business case construction. The rigorous path from idea to defensible plan.', topics: ['Feasibility frameworks', 'Financial projections', 'Risk analysis', 'Project milestones', 'Business case writing'], accent: '#B08D45' },
    { slug: 'strategy-leadership', title: 'Strategy & Leadership', subtitle: 'Strategic thinking & decision-making', description: 'Strategic analysis, competitive positioning, decision-making under uncertainty, and corporate governance. Systems-level thinking applied to business strategy.', topics: ['Competitive analysis', 'Strategic positioning', 'Corporate governance', 'Systems thinking', 'Decision frameworks'], accent: '#0B1F33' },
    { slug: 'aviation-sectoral', title: 'Sectoral Business', subtitle: 'Sector-specific business management', description: 'Business management applied to specialized sectors — demand modelling, revenue management, regulatory context, and operational economics.', topics: ['Revenue management', 'Demand modeling', 'Regulatory environment', 'Operational economics', 'Sector analysis'], accent: '#1A3550' },
    { slug: 'research-methods-ai', title: 'Research Methods / AI in Business', subtitle: 'Analytical methods & emerging tools', description: 'Research methodology, trade data analysis, and the critical evaluation of AI tools in business contexts. How to work with data and information rigorously.', topics: ['Research design', 'Trade data analysis', 'AI tool evaluation', 'Quantitative methods', 'Data interpretation'], accent: '#B08D45' },
  ],
  tr: [
    { slug: 'e-commerce', title: 'E-Ticaret', subtitle: 'Dijital iş modelleri & platformlar', description: 'İş modeli tasarımı, platform ekonomisi, dijital pazarlama temelleri ve e-ticaret fizibilitesi. Kavramdan operasyonel plana.', topics: ['İş modelleri', 'SEO & dijital pazarlama', 'Platform stratejisi', 'Fizibilite analizi', 'Rekabet analizi'], accent: '#0B1F33' },
    { slug: 'management-organization', title: 'Yönetim & Organizasyon', subtitle: 'Liderlik, davranış & organizasyon tasarımı', description: 'Örgütsel davranış, yönetim teorisi, liderlik modelleri ve ekip dinamikleri. Organizasyonların nasıl işlediği ve nasıl daha iyi yönetileceği.', topics: ['Örgütsel davranış', 'Liderlik modelleri', 'Değişim yönetimi', 'Ekip dinamikleri', 'Motivasyon teorisi'], accent: '#1A3550' },
    { slug: 'project-management-feasibility', title: 'Proje Yönetimi & Fizibilite', subtitle: 'Fikirden uygulanabilir plana', description: 'Fizibilite analizi metodolojisi, proje planlaması, finansal modelleme ve iş gerekçesi oluşturma. Fikirden savunulabilir plana uzanan titiz yol.', topics: ['Fizibilite çerçeveleri', 'Finansal projeksiyonlar', 'Risk analizi', 'Proje kilometre taşları', 'İş gerekçesi yazımı'], accent: '#B08D45' },
    { slug: 'strategy-leadership', title: 'Strateji & Liderlik', subtitle: 'Stratejik düşünce & karar verme', description: 'Stratejik analiz, rekabetçi konumlandırma, belirsizlik altında karar verme ve kurumsal yönetim. İşletme stratejisine sistem düzeyinde düşünce.', topics: ['Rekabet analizi', 'Stratejik konumlandırma', 'Kurumsal yönetim', 'Sistem düşüncesi', 'Karar çerçeveleri'], accent: '#0B1F33' },
    { slug: 'aviation-sectoral', title: 'Sektörel İşletme', subtitle: 'Sektöre özgü işletme yönetimi', description: 'Özel sektörlere uygulanmış işletme yönetimi — talep modellemesi, gelir yönetimi, düzenleyici bağlam ve operasyonel ekonomi.', topics: ['Gelir yönetimi', 'Talep modellemesi', 'Düzenleyici ortam', 'Operasyonel ekonomi', 'Sektör analizi'], accent: '#1A3550' },
    { slug: 'research-methods-ai', title: 'Araştırma Yöntemleri / İşletmede YZ', subtitle: 'Analitik yöntemler & gelişen araçlar', description: 'Araştırma metodolojisi, ticaret verisi analizi ve iş bağlamlarında yapay zeka araçlarının eleştirel değerlendirmesi. Veri ve bilgiyle titizlikle çalışma.', topics: ['Araştırma tasarımı', 'Ticaret verisi analizi', 'YZ araç değerlendirmesi', 'Nicel yöntemler', 'Veri yorumlama'], accent: '#B08D45' },
  ],
  fr: [
    { slug: 'e-commerce', title: 'E-commerce', subtitle: 'Modèles d’affaires numériques et plateformes', description: 'Conception de modèles d’affaires, économie des plateformes, bases du marketing digital et faisabilité e-commerce. Du concept au plan opérationnel.', topics: ['Modèles d’affaires', 'SEO et marketing digital', 'Stratégie de plateforme', 'Analyse de faisabilité', 'Analyse concurrentielle'], accent: '#0B1F33' },
    { slug: 'management-organization', title: 'Management et organisation', subtitle: 'Leadership, comportement et conception organisationnelle', description: 'Comportement organisationnel, théorie du management, modèles de leadership et dynamique d’équipe. Comment les organisations fonctionnent et comment les diriger mieux.', topics: ['Comportement organisationnel', 'Modèles de leadership', 'Gestion du changement', 'Dynamique d’équipe', 'Théorie de la motivation'], accent: '#1A3550' },
    { slug: 'project-management-feasibility', title: 'Gestion de projet et faisabilité', subtitle: 'De l’idée au plan réalisable', description: 'Méthodologie d’analyse de faisabilité, planification de projet, modélisation financière et construction d’un dossier d’affaires. Le chemin rigoureux de l’idée au plan défendable.', topics: ['Cadres de faisabilité', 'Projections financières', 'Analyse de risques', 'Jalons de projet', 'Rédaction du dossier d’affaires'], accent: '#B08D45' },
    { slug: 'strategy-leadership', title: 'Stratégie et leadership', subtitle: 'Pensée stratégique et prise de décision', description: 'Analyse stratégique, positionnement concurrentiel, décision sous incertitude et gouvernance d’entreprise. Pensée systémique appliquée à la stratégie.', topics: ['Analyse concurrentielle', 'Positionnement stratégique', 'Gouvernance d’entreprise', 'Pensée systémique', 'Cadres de décision'], accent: '#0B1F33' },
    { slug: 'aviation-sectoral', title: 'Gestion sectorielle', subtitle: 'Management appliqué à un secteur', description: 'Management appliqué à des secteurs spécialisés — modélisation de la demande, gestion des revenus, contexte réglementaire et économie opérationnelle.', topics: ['Gestion des revenus', 'Modélisation de la demande', 'Environnement réglementaire', 'Économie opérationnelle', 'Analyse sectorielle'], accent: '#1A3550' },
    { slug: 'research-methods-ai', title: 'Méthodes de recherche / IA en gestion', subtitle: 'Méthodes analytiques et outils émergents', description: 'Méthodologie de recherche, analyse de données commerciales et évaluation critique des outils d’IA en contexte d’affaires. Travailler rigoureusement avec les données et l’information.', topics: ['Conception de la recherche', 'Analyse des données commerciales', 'Évaluation des outils d’IA', 'Méthodes quantitatives', 'Interprétation des données'], accent: '#B08D45' },
  ],
}

const arrow = (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M8 1l3 3-3 3M1 4h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const COURSES_T = {
  en: { eyebrow: 'Course Catalogue', heading: 'Published Courses', viewCourse: 'View Course', noCourses: 'No courses have been published yet.' },
  tr: { eyebrow: 'Ders Kataloğu', heading: 'Yayımlanan Dersler', viewCourse: 'Dersi İncele', noCourses: 'Henüz yayımlanmış ders yok.' },
  fr: { eyebrow: 'Catalogue de cours', heading: 'Cours publiés', viewCourse: 'Voir le cours', noCourses: "Aucun cours n'a encore été publié." },
}

export default function CoursesClient() {
  const [search, setSearch] = useState('')
  const [courses, setCourses] = useState<Course[]>([])
  const { lang } = useLanguage()
  const L = T[lang]
  const CL = COURSES_T[lang]
  const teachingAreas = TEACHING_AREAS[lang]

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.ok ? r.json() : [])
      .then(setCourses)
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return teachingAreas
    const q = search.toLowerCase()
    return teachingAreas.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.topics.some(t => t.toLowerCase().includes(q)))
  }, [search, teachingAreas])

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbCourses }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.heroLabel}</span>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 16px', lineHeight: 1.12, letterSpacing: '-0.01em' }}>{L.heroHeading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.8, margin: '0 auto 32px', maxWidth: 560 }}>{L.heroBody}</p>
          <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="7" cy="7" r="5" stroke="#6A747D" strokeWidth="1.3" /><line x1="11" y1="11" x2="15" y2="15" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder={L.filterPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 42, paddingRight: 16, paddingTop: 13, paddingBottom: 13, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#0B1F33')} onBlur={e => (e.target.style.borderColor = '#E7E0D3')} />
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, color: '#0B1F33', marginBottom: 10 }}>{L.noResultsHeading}</div>
              <button onClick={() => setSearch('')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#B08D45', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>{L.noResultsClear}</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="courses-cat-grid">
              {filtered.map(area => (
                <Link key={area.slug} href={`/courses/category/${area.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', padding: '36px 30px 30px', textDecoration: 'none', borderTop: '2px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderTopColor = area.accent }}
                  onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent' }}>
                  <div style={{ width: 24, height: 1.5, backgroundColor: area.accent, marginBottom: 20 }} />
                  <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', margin: '0 0 4px', lineHeight: 1.25 }}>{area.title}</h3>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontStyle: 'italic', color: '#6A747D', marginBottom: 14 }}>{area.subtitle}</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.7, margin: '0 0 20px', flexGrow: 1 }}>{area.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                    {area.topics.slice(0, 3).map(t => <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '3px 8px' }}>{t}</span>)}
                    {area.topics.length > 3 && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B08D45', padding: '3px 0' }}>+{area.topics.length - 3} {L.more}</span>}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {L.exploreArea} {arrow}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Published courses from DB */}
      {courses.length > 0 && (
        <section style={{ padding: '56px 32px', backgroundColor: '#FAFAF8', borderTop: '1px solid #E7E0D3' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: '#B08D45' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{CL.eyebrow}</span>
            </div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 28px', lineHeight: 1.2 }}>{CL.heading}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
              {courses.map(course => (
                <Link key={course.id} href={`/courses/${course.id}`}
                  style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', padding: '28px 26px', textDecoration: 'none', borderTop: '2px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#B08D45' }}
                  onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent' }}>
                  {(course.categories ?? []).some(category => loc(category.name, lang)) && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#B08D45', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{(course.categories ?? []).map(category => loc(category.name, lang)).filter(Boolean).join(' · ')}</div>}
                  <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', margin: '0 0 6px', lineHeight: 1.25 }}>{loc(course.title, lang)}</h3>
                  {loc(course.subtitle, lang) && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontStyle: 'italic', color: '#6A747D', margin: '0 0 12px' }}>{loc(course.subtitle, lang)}</p>}
                  {loc(course.description, lang) && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.65, margin: '0 0 16px', flexGrow: 1 }}>{loc(course.description, lang).slice(0, 160)}{loc(course.description, lang).length > 160 ? '…' : ''}</p>}
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                    {CL.viewCourse} {arrow}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', borderBottom: '1px solid #E7E0D3', padding: '56px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="courses-structure-2col">
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px 36px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{L.courseFunctionsLabel}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0B1F33', margin: '0 0 20px', lineHeight: 1.2 }}>{L.courseFunctionsHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {L.courseFunctionItems.map((f, i, arr) => (
                <div key={f.label} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid #F0EBE2' : 'none' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0, paddingTop: 2, minWidth: 120 }}>{f.label}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.65 }}>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px 36px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{L.learningProgressionLabel}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0B1F33', margin: '0 0 20px', lineHeight: 1.2 }}>{L.learningProgressionHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div style={{ backgroundColor: '#0B1F33', padding: '24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 10, fontWeight: 700, color: '#B08D45', letterSpacing: '0.06em', backgroundColor: 'rgba(176,141,69,0.15)', padding: '4px 8px' }}>{L.tierILabel}</div>
                  <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>{L.tierIHeading}</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8B4BE', lineHeight: 1.7, margin: 0 }}>{L.tierIBody}</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 10, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', backgroundColor: '#B08D45', padding: '4px 8px' }}>{L.tierIILabel}</div>
                  <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 16, fontWeight: 700, color: '#0B1F33' }}>{L.tierIIHeading}</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.7, margin: 0 }}>{L.tierIIBody}</p>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Link href="/teaching" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                {L.teachingPhilosophyLink} {arrow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .courses-cat-grid { grid-template-columns: repeat(2, 1fr) !important; } .courses-structure-2col { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .courses-cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
