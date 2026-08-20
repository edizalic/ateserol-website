'use client'

import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const COPY = {
  en: {
    eyebrow: 'Assessment Philosophy',
    heading: 'Assess the thing the course is actually trying to teach',
    intro: 'There is no single assessment formula for every course. The form of assessment should follow the learning objective, the level of the course, and the kind of judgment students are expected to develop.',
    forms: 'Assessment by level',
    criteria: 'What I look for',
    feedback: 'Feedback that carries forward',
    feedbackBody: 'Feedback should help students improve later work. Not every task is revised for a new grade, but the reasoning, method, and communication lessons should carry forward to the next task.',
    integrity: 'Integrity and AI responsibility',
    integrityBody: 'Students remain responsible for the accuracy, reasoning, evidence, and attribution in submitted work. Any permitted use of AI or other tools must be transparent and consistent with the requirements of the specific course and task.',
    courseNote: 'Exact assessment components and weights belong only on a verified course page or syllabus.',
  },
  tr: {
    eyebrow: 'Değerlendirme Felsefesi',
    heading: 'Dersin gerçekten öğretmeye çalıştığı şeyi değerlendir',
    intro: 'Her ders için geçerli tek bir değerlendirme formülü yoktur. Değerlendirme biçimi; öğrenme hedefini, dersin düzeyini ve öğrencilerin geliştirmesi beklenen yargı türünü izlemelidir.',
    forms: 'Düzeye göre değerlendirme',
    criteria: 'Neye bakarım',
    feedback: 'Sonraki çalışmaya taşınan geri bildirim',
    feedbackBody: 'Geri bildirim öğrencilerin sonraki çalışmalarını geliştirmesine yardımcı olmalıdır.',
    integrity: 'Akademik dürüstlük ve yapay zekâ sorumluluğu',
    integrityBody: 'Öğrenciler teslim ettikleri çalışmadaki doğruluk, akıl yürütme, kanıt ve atıftan sorumludur.',
    courseNote: 'Kesin değerlendirme bileşenleri ve ağırlıkları yalnızca doğrulanmış bir ders sayfasında veya ders izlencesinde yer alır.',
  },
  fr: {
    eyebrow: 'Philosophie d’évaluation',
    heading: 'Évaluer ce que le cours cherche réellement à enseigner',
    intro: 'Il n’existe pas de formule d’évaluation unique pour chaque cours. La forme de l’évaluation devrait suivre l’objectif d’apprentissage, le niveau du cours et le type de jugement que les étudiants sont censés développer.',
    forms: 'Évaluation par niveau',
    criteria: 'Ce que je cherche',
    feedback: 'Un retour qui se reporte',
    feedbackBody: 'Le retour devrait aider les étudiants à améliorer le travail suivant. Toute tâche n’est pas révisée pour une nouvelle note, mais les leçons de raisonnement, de méthode et de communication devraient se reporter à la tâche suivante.',
    integrity: 'Intégrité et responsabilité face à l’IA',
    integrityBody: 'Les étudiants restent responsables de l’exactitude, du raisonnement, des preuves et de l’attribution dans le travail soumis. Tout usage autorisé de l’IA ou d’autres outils doit être transparent et cohérent avec les exigences du cours et de la tâche.',
    courseNote: 'Les composantes et pondérations exactes de l’évaluation n’appartiennent qu’à une page de cours vérifiée ou à un syllabus.',
  },
}

const LEVELS = {
  en: [
    ['Tier I · Foundations', 'Direct tasks such as short problems, quizzes, definitions, calculations, demonstrations, and focused exercises can show whether the foundations are in place.'],
    ['Tier II · Synthesis and judgment', 'Cases, feasibility work, projects, presentations, and written or oral analysis can show how students combine evidence and method. Different conclusions may be valid when the evidence and reasoning support them.'],
  ],
  tr: [
    ['Düzey I · Temeller', 'Kısa problemler, kısa sınavlar, tanımlar, hesaplamalar, gösterimler ve odaklı alıştırmalar gibi doğrudan görevler temelin kurulup kurulmadığını gösterebilir.'],
    ['Düzey II · Sentez ve yargı', 'Vakalar, fizibilite çalışmaları, projeler, sunumlar ve yazılı ya da sözlü analiz; öğrencilerin kanıt ve yöntemi nasıl birleştirdiğini gösterebilir.'],
  ],
  fr: [
    ['Niveau I · Fondements', 'Des tâches directes telles que problèmes courts, quiz, définitions, calculs, démonstrations et exercices ciblés peuvent montrer si les fondements sont en place.'],
    ['Niveau II · Synthèse et jugement', 'Les cas, le travail de faisabilité, les projets, les présentations et l’analyse écrite ou orale peuvent montrer comment les étudiants combinent preuves et méthode. Des conclusions différentes peuvent être valides lorsque les preuves et le raisonnement les soutiennent.'],
  ],
}

const CRITERIA = {
  en: [
    ['Accuracy', 'Are the facts, calculations, and representations sound?'],
    ['Reasoning', 'Can the conclusion be followed and defended?'],
    ['Evidence', 'Are claims supported with relevant and credible material?'],
    ['Feasibility', 'Do the assumptions and recommendations work under real constraints?'],
    ['Communication', 'Is the work clear, structured, and appropriate to its audience?'],
    ['Responsibility', 'Is the work honest about sources, tools, limitations, and uncertainty?'],
  ],
  tr: [
    ['Doğruluk', 'Olgular, hesaplamalar ve gösterimler sağlam mı?'],
    ['Akıl yürütme', 'Sonuç takip edilebilir ve savunulabilir mi?'],
    ['Kanıt', 'İddialar ilgili ve güvenilir materyalle destekleniyor mu?'],
    ['Fizibilite', 'Varsayımlar ve öneriler gerçek kısıtlar altında işler mi?'],
    ['İletişim', 'Çalışma açık, yapılandırılmış ve hedef kitlesine uygun mu?'],
    ['Sorumluluk', 'Çalışma; kaynaklar, araçlar, sınırlılıklar ve belirsizlik konusunda dürüst mü?'],
  ],
  fr: [
    ['Exactitude', 'Les faits, calculs et représentations sont-ils solides ?'],
    ['Raisonnement', 'La conclusion peut-elle être suivie et défendue ?'],
    ['Preuves', 'Les affirmations sont-elles soutenues par un matériau pertinent et crédible ?'],
    ['Faisabilité', 'Les hypothèses et recommandations tiennent-elles sous de vraies contraintes ?'],
    ['Communication', 'Le travail est-il clair, structuré et adapté à son public ?'],
    ['Responsabilité', 'Le travail est-il honnête sur les sources, les outils, les limites et l’incertitude ?'],
  ],
}

export default function AssessmentClient() {
  const { lang } = useLanguage()
  const L = COPY[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[
        { label: lang === 'tr' ? 'Ana Sayfa' : lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
        { label: lang === 'tr' ? 'Öğretim' : lang === 'fr' ? 'Enseignement' : 'Teaching', href: '/teaching' },
        { label: L.eyebrow },
      ]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 850, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>{L.eyebrow}</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 48px)', color: '#0B1F33', lineHeight: 1.15, margin: '0 0 20px' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.8, maxWidth: 690, margin: '0 auto' }}>{L.intro}</p>
        </div>
      </section>

      <section style={{ padding: '48px 32px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, color: '#0B1F33', margin: '0 0 24px' }}>{L.forms}</h2>
          <div className="assessment-levels" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #E7E0D3' }}>
            {LEVELS[lang].map(([title, body], index) => (
              <article key={title} style={{ padding: '36px 32px', backgroundColor: '#FFFFFF', borderLeft: index ? '1px solid #E7E0D3' : 'none' }}>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 21, color: '#0B1F33', margin: '0 0 12px' }}>{title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '24px 32px 48px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, color: '#0B1F33', margin: '0 0 24px' }}>{L.criteria}</h2>
          <div className="assessment-criteria" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {CRITERIA[lang].map(([title, body]) => (
              <article key={title} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '26px 24px' }}>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, color: '#0B1F33', margin: '0 0 9px' }}>{title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.65, margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#0B1F33', padding: '48px 32px' }}>
        <div className="assessment-notes" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <article>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, color: '#FFFFFF', margin: '0 0 13px' }}>{L.feedback}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#C2CBD2', lineHeight: 1.75, margin: 0 }}>{L.feedbackBody}</p>
          </article>
          <article>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, color: '#FFFFFF', margin: '0 0 13px' }}>{L.integrity}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#C2CBD2', lineHeight: 1.75, margin: '0 0 14px' }}>{L.integrityBody}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#B08D45', lineHeight: 1.65, margin: 0 }}>{L.courseNote}</p>
          </article>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) { .assessment-levels, .assessment-notes { grid-template-columns: 1fr !important; } .assessment-levels article { border-left: 0 !important; border-top: 1px solid #E7E0D3; } .assessment-levels article:first-child { border-top: 0; } .assessment-criteria { grid-template-columns: 1fr !important; } }
        @media (min-width: 761px) and (max-width: 980px) { .assessment-criteria { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
