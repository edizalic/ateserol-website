'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const FAQ = {
  en: [
    { q: 'Can I submit late?', a: 'Late submissions are penalised at 10% per day unless prior approval has been obtained. No extensions after the due date has passed.' },
    { q: 'Can I use AI tools?', a: 'AI tools are permitted for defined tasks (grammar checking, research support) but not as a substitute for original analysis. Specific policies are in the course syllabus.' },
    { q: 'How are groups formed?', a: 'Groups are assigned, not self-selected, to ensure balanced composition. Group changes require written justification and instructor approval.' },
    { q: 'Is the exam open-book?', a: 'Tier I exams are generally closed-book. Tier II exams may be open-book but without smart devices — you may bring notes but must produce independent judgment.' },
  ],
  tr: [
    { q: 'Geç teslim yapabilir miyim?', a: 'Önceden onay alınmadıkça geç teslimler günde %10 cezalandırılır. Son tarih geçtikten sonra uzatma yoktur.' },
    { q: 'Yapay zekâ araçları kullanabilir miyim?', a: 'YZ araçları tanımlı görevler için (dil bilgisi, araştırma desteği) izinlidir; özgün analizin yerine geçemez. Ayrıntılı kurallar ders izlencesindedir.' },
    { q: 'Gruplar nasıl oluşturulur?', a: 'Gruplar dengeli bir yapı için atanır, öğrenci seçimine bırakılmaz. Değişiklik yazılı gerekçe ve eğitmen onayı gerektirir.' },
    { q: 'Sınav açık kitap mıdır?', a: 'Kademe I sınavları genellikle kapalı kitaptır. Kademe II sınavları açık kitap olabilir ancak akıllı cihazsızdır — not getirebilirsiniz, bağımsız yargı üretmeniz gerekir.' },
  ],
  fr: [
    { q: 'Puis-je rendre en retard ?', a: 'Les rendus tardifs sont pénalisés de 10 % par jour sauf autorisation préalable. Aucune prolongation après la date limite.' },
    { q: 'Puis-je utiliser des outils d’IA ?', a: 'Les outils d’IA sont autorisés pour des tâches définies (correction, aide à la recherche) mais pas comme substitut à une analyse originale. Les règles précises figurent dans le syllabus.' },
    { q: 'Comment les groupes sont-ils formés ?', a: 'Les groupes sont assignés, non auto-sélectionnés, pour assurer une composition équilibrée. Tout changement exige une justification écrite et l’accord de l’enseignant.' },
    { q: 'L’examen est-il à livre ouvert ?', a: 'Les examens de niveau I sont généralement à livre fermé. Ceux de niveau II peuvent être à livre ouvert mais sans appareils connectés — vous pouvez apporter des notes, mais devez produire un jugement indépendant.' },
  ],
}

const COPY = {
  en: {
    home: 'Home', courses: 'Courses', course: 'Course',
    notFound: 'Course Not Found', back: '← Back to Courses',
    heading: 'Course Detail',
    intro: 'Course records will be displayed here as they are confirmed and added to the database.',
    note: 'Detailed weekly schedule and course information is distributed on the first day of class. Course records will be added to this database as they are confirmed.',
    faqEyebrow: 'Common Questions', faqHeading: 'FAQ',
    relatedEyebrow: 'See Also', relatedHeading: 'Related Pages',
    links: [
      { label: 'Assessment Philosophy', href: '/teaching/assessment', desc: 'How work is evaluated across all courses' },
      { label: 'Teaching Philosophy', href: '/teaching/ethos', desc: 'The principles behind course design' },
      { label: 'Presentations', href: '/presentations', desc: 'Slide decks and lecture materials' },
      { label: 'All Teaching Areas', href: '/courses', desc: 'Overview of courses taught' },
    ],
  },
  tr: {
    home: 'Ana Sayfa', courses: 'Dersler', course: 'Ders',
    notFound: 'Ders Bulunamadı', back: '← Derslere Geri Dön',
    heading: 'Ders Ayrıntısı',
    intro: 'Ders kayıtları onaylandıkça ve veritabanına eklendikçe burada görüntülenecektir.',
    note: 'Ayrıntılı haftalık program ve ders bilgisi dersin ilk gününde dağıtılır. Ders kayıtları onaylandıkça bu veritabanına eklenecektir.',
    faqEyebrow: 'Sık Sorulanlar', faqHeading: 'SSS',
    relatedEyebrow: 'Ayrıca Bakınız', relatedHeading: 'İlgili Sayfalar',
    links: [
      { label: 'Değerlendirme Felsefesi', href: '/teaching/assessment', desc: 'Çalışmaların tüm derslerde nasıl değerlendirildiği' },
      { label: 'Öğretim Felsefesi', href: '/teaching/ethos', desc: 'Ders tasarımının arkasındaki ilkeler' },
      { label: 'Sunumlar', href: '/presentations', desc: 'Slaytlar ve ders materyalleri' },
      { label: 'Tüm Öğretim Alanları', href: '/courses', desc: 'Verilen derslere genel bakış' },
    ],
  },
  fr: {
    home: 'Accueil', courses: 'Cours', course: 'Cours',
    notFound: 'Cours introuvable', back: '← Retour aux cours',
    heading: 'Fiche de cours',
    intro: 'Les notices de cours s’afficheront ici à mesure qu’elles seront confirmées et ajoutées à la base de données.',
    note: 'Le calendrier hebdomadaire détaillé et les informations de cours sont distribués le premier jour. Les notices seront ajoutées à cette base à mesure qu’elles seront confirmées.',
    faqEyebrow: 'Questions fréquentes', faqHeading: 'FAQ',
    relatedEyebrow: 'Voir aussi', relatedHeading: 'Pages liées',
    links: [
      { label: 'Philosophie d’évaluation', href: '/teaching/assessment', desc: 'Comment le travail est évalué dans tous les cours' },
      { label: 'Philosophie d’enseignement', href: '/teaching/ethos', desc: 'Les principes derrière la conception des cours' },
      { label: 'Présentations', href: '/presentations', desc: 'Diaporamas et supports de cours' },
      { label: 'Tous les domaines d’enseignement', href: '/courses', desc: 'Vue d’ensemble des cours enseignés' },
    ],
  },
}

export default function CourseDetailClient() {
  const params = useParams()
  const { lang } = useLanguage()
  const id = params?.id as string | undefined
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const L = COPY[lang]
  const faq = FAQ[lang]

  if (!id) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, color: '#0B1F33', marginBottom: 12 }}>{L.notFound}</div>
        <Link href="/courses" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#B08D45', textDecoration: 'none' }}>{L.back}</Link>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.courses, href: '/courses' }, { label: `${L.course}: ${id}` }]} />

      <section style={{ backgroundColor: '#0B1F33', padding: '56px 32px 48px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 42px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 14px', lineHeight: 1.15 }}>
            {L.heading}
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#A8B4BE', lineHeight: 1.75, margin: 0 }}>
            {L.intro}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '36px 32px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75 }}>
            {L.note}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 32px 56px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="detail-bot-2col">
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px 28px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{L.faqEyebrow}</div>
            <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', margin: '0 0 16px', lineHeight: 1.25 }}>{L.faqHeading}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {faq.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid #F0EBE2' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, padding: '13px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1E2328', lineHeight: 1.4 }}>{item.q}</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginTop: 4, color: '#6A747D' }}>
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ paddingBottom: 14 }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px 28px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{L.relatedEyebrow}</div>
            <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', margin: '0 0 16px', lineHeight: 1.25 }}>{L.relatedHeading}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {L.links.map((link, i, arr) => (
                <Link key={link.href} href={link.href} style={{ display: 'flex', flexDirection: 'column', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid #E7E0D3' : 'none', textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1E2328', marginBottom: 3 }}>{link.label}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', lineHeight: 1.5 }}>{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { .detail-bot-2col { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
