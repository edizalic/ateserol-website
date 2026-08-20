'use client'

import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const COPY = {
  en: {
    eyebrow: 'Teaching Ethos',
    heading: 'Clear expectations, careful judgment, shared responsibility',
    intro: 'Business education should help students learn how to examine a question, work with evidence, explain a position, and revise it when better reasoning becomes available.',
    studentLabel: 'From students',
    studentHeading: 'What I expect from students',
    instructorLabel: 'From the instructor',
    instructorHeading: 'What students can expect from me',
    responsibility: 'Responsible participation',
    responsibilityBody: 'A serious learning environment depends on preparation, intellectual honesty, respect, and responsibility. Digital and AI tools belong within those same expectations: their use should support learning, remain transparent, and never replace the student\'s own judgment.',
  },
  tr: {
    eyebrow: 'Öğretim Yaklaşımı',
    heading: 'Açık beklentiler, dikkatli yargı, ortak sorumluluk',
    intro: 'İşletme eğitimi; öğrencilerin bir soruyu incelemeyi, kanıtlarla çalışmayı, bir görüşü açıklamayı ve daha güçlü bir akıl yürütme ortaya çıktığında onu gözden geçirmeyi öğrenmesine yardımcı olmalıdır.',
    studentLabel: 'Öğrencilerden',
    studentHeading: 'Öğrencilerden beklentilerim',
    instructorLabel: 'Eğitimciden',
    instructorHeading: 'Öğrenciler benden ne bekleyebilir',
    responsibility: 'Sorumlu katılım',
    responsibilityBody: 'Ciddi bir öğrenme ortamı; hazırlık, entelektüel dürüstlük, saygı ve sorumluluk gerektirir. Dijital araçlar ve yapay zekâ da aynı beklentiler içinde yer alır.',
  },
  fr: {
    eyebrow: 'Éthos pédagogique',
    heading: 'Attentes claires, jugement attentif, responsabilité partagée',
    intro: 'La formation en gestion devrait aider les étudiants à apprendre à examiner une question, à travailler avec des preuves, à expliquer une position et à la réviser lorsqu’un meilleur raisonnement devient disponible.',
    studentLabel: 'De la part des étudiants',
    studentHeading: 'Ce que j’attends des étudiants',
    instructorLabel: 'De la part de l’enseignant',
    instructorHeading: 'Ce que les étudiants peuvent attendre de moi',
    responsibility: 'Participation responsable',
    responsibilityBody: 'Un environnement d’apprentissage sérieux dépend de la préparation, de l’honnêteté intellectuelle, du respect et de la responsabilité. Les outils numériques et l’IA relèvent des mêmes attentes : leur usage doit soutenir l’apprentissage, rester transparent et ne jamais remplacer le jugement propre de l’étudiant.',
  },
}

const EXPECTATIONS = {
  en: {
    student: [
      'Preparation appropriate to the course and the task',
      'A clear distinction between evidence and assumption',
      'Willingness to explain a position and revise it when needed',
      'Respect for classmates, including during serious disagreement',
      'Responsibility for one\'s own work, including the use of digital and AI tools',
    ],
    instructor: [
      'Clear learning objectives and assessment criteria',
      'Access to the materials needed for the work',
      'Feedback intended to support improvement',
      'Consistency in expectations and evaluation',
      'Room to question, provided questions are supported by reasoning',
    ],
  },
  tr: {
    student: [
      'Derse ve göreve uygun hazırlık',
      'Kanıt ile varsayım arasında açık bir ayrım',
      'Bir görüşü açıklama ve gerektiğinde gözden geçirme isteği',
      'Ciddi görüş ayrılıklarında dahi sınıf arkadaşlarına saygı',
      'Dijital araçlar ve yapay zekâ kullanımı dâhil, kişinin kendi çalışmasından sorumlu olması',
    ],
    instructor: [
      'Açık öğrenme hedefleri ve değerlendirme ölçütleri',
      'Çalışma için gerekli materyallere erişim',
      'Gelişimi desteklemeyi amaçlayan geri bildirim',
      'Beklentilerde ve değerlendirmede tutarlılık',
      'Akıl yürütmeyle desteklendiğinde sorgulamaya alan açılması',
    ],
  },
  fr: {
    student: [
      'Une préparation adaptée au cours et à la tâche',
      'Une distinction claire entre preuve et hypothèse',
      'La volonté d’expliquer une position et de la réviser si besoin',
      'Le respect des camarades, y compris en cas de désaccord sérieux',
      'La responsabilité de son propre travail, y compris l’usage des outils numériques et de l’IA',
    ],
    instructor: [
      'Des objectifs d’apprentissage et des critères d’évaluation clairs',
      'L’accès aux supports nécessaires au travail',
      'Un retour destiné à soutenir la progression',
      'Une cohérence dans les attentes et l’évaluation',
      'De la place pour questionner, pourvu que les questions soient soutenues par un raisonnement',
    ],
  },
}

function ExpectationList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item, index) => (
        <li key={item} style={{ display: 'flex', gap: 12, padding: '13px 0', borderBottom: index < items.length - 1 ? '1px solid #E7E0D3' : 'none' }}>
          <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: accent, flexShrink: 0, marginTop: 8 }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', lineHeight: 1.65 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TeachingEthosClient() {
  const { lang } = useLanguage()
  const L = COPY[lang]
  const expectations = EXPECTATIONS[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[
        { label: lang === 'tr' ? 'Ana Sayfa' : lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
        { label: lang === 'tr' ? 'Öğretim' : lang === 'fr' ? 'Enseignement' : 'Teaching', href: '/teaching' },
        { label: L.eyebrow },
      ]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>{L.eyebrow}</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, color: '#0B1F33', lineHeight: 1.15, margin: '0 0 20px' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.8, maxWidth: 680, margin: '0 auto' }}>{L.intro}</p>
        </div>
      </section>

      <section style={{ padding: '48px 32px' }}>
        <div className="ethos-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #E7E0D3' }}>
          <article style={{ backgroundColor: '#FFFFFF', padding: '40px 36px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{L.studentLabel}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, color: '#0B1F33', margin: '0 0 18px' }}>{L.studentHeading}</h2>
            <ExpectationList items={expectations.student} accent="#0B1F33" />
          </article>
          <article style={{ backgroundColor: '#FFFFFF', padding: '40px 36px', borderLeft: '1px solid #E7E0D3' }} className="ethos-second">
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{L.instructorLabel}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, color: '#0B1F33', margin: '0 0 18px' }}>{L.instructorHeading}</h2>
            <ExpectationList items={expectations.instructor} accent="#B08D45" />
          </article>
        </div>
      </section>

      <section style={{ backgroundColor: '#0B1F33', padding: '48px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 25, color: '#FFFFFF', margin: '0 0 14px' }}>{L.responsibility}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#C2CBD2', lineHeight: 1.8, margin: 0 }}>{L.responsibilityBody}</p>
        </div>
      </section>

      <style>{`@media (max-width: 760px) { .ethos-grid { grid-template-columns: 1fr !important; } .ethos-second { border-left: 0 !important; border-top: 1px solid #E7E0D3; } }`}</style>
    </div>
  )
}
