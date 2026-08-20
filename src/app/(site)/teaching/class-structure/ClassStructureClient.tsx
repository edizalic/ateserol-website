'use client'

import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const COPY = {
  en: {
    eyebrow: 'Class Structure',
    heading: 'A progression, not a fixed weekly formula',
    intro: 'Courses do not all follow the same sequence. Their structure depends on the subject, level, and learning objective. What remains consistent is a progression from foundation to practice, combination, and examination.',
    progression: 'Learning progression',
    formats: 'Forms a class may take',
    character: 'Course character',
    characterBody: 'Some courses are more quantitative; others depend more heavily on qualitative interpretation. The balance changes, but evidence, reasoning, and careful judgment remain central.',
    responsibility: 'Shared responsibilities',
    student: 'Students prepare, participate, test their reasoning, and take responsibility for their own work.',
    instructor: 'The instructor defines objectives, provides structure and materials, gives feedback, and applies expectations consistently.',
  },
  tr: {
    eyebrow: 'Ders Yapısı',
    heading: 'Sabit bir haftalık formül değil, bir ilerleme',
    intro: 'Tüm dersler aynı sırayı izlemez. Yapı; konuya, düzeye ve öğrenme hedefine göre değişir.',
    progression: 'Öğrenme ilerlemesi',
    formats: 'Bir dersin alabileceği biçimler',
    character: 'Dersin karakteri',
    characterBody: 'Bazı dersler daha nicel, bazıları ise daha çok nitel yoruma dayanır. Denge değişse de kanıt, akıl yürütme ve dikkatli yargı merkezde kalır.',
    responsibility: 'Ortak sorumluluklar',
    student: 'Öğrenciler hazırlanır, katılır, akıl yürütmelerini sınar ve kendi çalışmalarının sorumluluğunu üstlenir.',
    instructor: 'Eğitimci hedefleri tanımlar, yapı ve materyal sağlar, geri bildirim verir ve beklentileri tutarlı biçimde uygular.',
  },
  fr: {
    eyebrow: 'Structure des cours',
    heading: 'Une progression, non une formule hebdomadaire fixe',
    intro: 'Les cours ne suivent pas tous la même séquence. Leur structure dépend du sujet, du niveau et de l’objectif d’apprentissage. Ce qui demeure constant est une progression du fondement à la pratique, à la combinaison et à l’examen.',
    progression: 'Progression de l’apprentissage',
    formats: 'Formes qu’un cours peut prendre',
    character: 'Caractère du cours',
    characterBody: 'Certains cours sont plus quantitatifs ; d’autres dépendent davantage de l’interprétation qualitative. L’équilibre change, mais les preuves, le raisonnement et un jugement attentif restent centraux.',
    responsibility: 'Responsabilités partagées',
    student: 'Les étudiants se préparent, participent, mettent à l’épreuve leur raisonnement et assument la responsabilité de leur propre travail.',
    instructor: 'L’enseignant définit les objectifs, fournit la structure et les supports, donne un retour et applique les attentes de façon cohérente.',
  },
}

const STEPS = {
  en: [
    ['01', 'Frame the question', 'Clarify what is being examined and why it matters.'],
    ['02', 'Build the foundation', 'Establish the concepts, methods, and evidence needed for the task.'],
    ['03', 'Practise', 'Use focused exercises to test understanding and method.'],
    ['04', 'Apply and combine', 'Bring ideas and methods together in cases, projects, or extended problems.'],
    ['05', 'Review', 'Examine the result, identify weaknesses, and refine the reasoning.'],
  ],
  tr: [
    ['01', 'Soruyu çerçevele', 'Neyin incelendiğini ve neden önemli olduğunu açıklaştır.'],
    ['02', 'Temeli kur', 'Görev için gerekli kavramları, yöntemleri ve kanıtları oluştur.'],
    ['03', 'Uygula', 'Anlayışı ve yöntemi odaklı alıştırmalarla sına.'],
    ['04', 'Birleştir ve kullan', 'Fikirleri ve yöntemleri vaka, proje veya kapsamlı problemlerde bir araya getir.'],
    ['05', 'Gözden geçir', 'Sonucu incele, zayıflıkları belirle ve akıl yürütmeyi geliştir.'],
  ],
  fr: [
    ['01', 'Cadre la question', 'Clarifier ce qui est examiné et pourquoi cela compte.'],
    ['02', 'Construire le fondement', 'Établir les concepts, méthodes et preuves nécessaires à la tâche.'],
    ['03', 'Pratiquer', 'Utiliser des exercices ciblés pour tester la compréhension et la méthode.'],
    ['04', 'Appliquer et combiner', 'Réunir idées et méthodes dans des cas, des projets ou des problèmes étendus.'],
    ['05', 'Revoir', 'Examiner le résultat, identifier les faiblesses et affiner le raisonnement.'],
  ],
}

const LEVELS = {
  en: [
    ['Tier I · Foundations', 'Students first need a working command of concepts, language, methods, and basic applications.'],
    ['Tier II · Synthesis and judgment', 'Students then combine what they know, work with incomplete information, compare alternatives, and defend a reasoned conclusion.'],
  ],
  tr: [
    ['Düzey I · Temeller', 'Öğrencilerin önce kavramlara, dile, yöntemlere ve temel uygulamalara işler düzeyde hâkim olması gerekir.'],
    ['Düzey II · Sentez ve yargı', 'Ardından bildiklerini birleştirir, eksik bilgiyle çalışır, seçenekleri karşılaştırır ve gerekçeli bir sonucu savunurlar.'],
  ],
  fr: [
    ['Niveau I · Fondements', 'Les étudiants ont d’abord besoin d’une maîtrise opérationnelle des concepts, du langage, des méthodes et des applications de base.'],
    ['Niveau II · Synthèse et jugement', 'Les étudiants combinent ensuite ce qu’ils savent, travaillent avec une information incomplète, comparent des alternatives et défendent une conclusion raisonnée.'],
  ],
}

const FORMATS = {
  en: ['Lecture and explanation', 'Case and discussion', 'Workshop and exercise', 'Project work'],
  tr: ['Ders anlatımı ve açıklama', 'Vaka ve tartışma', 'Atölye ve alıştırma', 'Proje çalışması'],
  fr: ['Cours et explication', 'Cas et discussion', 'Atelier et exercice', 'Travail de projet'],
}

export default function ClassStructureClient() {
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
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>{L.eyebrow}</div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 48px)', color: '#0B1F33', lineHeight: 1.15, margin: '0 0 20px' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.8, maxWidth: 690, margin: '0 auto' }}>{L.intro}</p>
        </div>
      </section>

      <section style={{ padding: '48px 32px 24px' }}>
        <div className="structure-levels" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
          {LEVELS[lang].map(([title, body]) => (
            <article key={title} style={{ padding: '34px 30px', backgroundColor: '#FFFFFF' }}>
              <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 21, color: '#0B1F33', margin: '0 0 12px' }}>{title}</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: 0 }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 32px 48px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, color: '#0B1F33', margin: '0 0 24px' }}>{L.progression}</h2>
          <div className="structure-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', border: '1px solid #E7E0D3' }}>
            {STEPS[lang].map(([number, title, body], index) => (
              <article key={number} style={{ backgroundColor: '#FFFFFF', padding: '28px 22px', borderLeft: index ? '1px solid #E7E0D3' : 'none' }}>
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', color: '#B08D45', fontSize: 12, fontWeight: 700, marginBottom: 14 }}>{number}</div>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', color: '#0B1F33', fontSize: 16, lineHeight: 1.3, margin: '0 0 10px' }}>{title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#6A747D', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', borderBottom: '1px solid #E7E0D3', padding: '48px 32px' }}>
        <div className="structure-bottom" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, color: '#0B1F33', margin: '0 0 18px' }}>{L.formats}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {FORMATS[lang].map(format => <li key={format} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', padding: '12px 14px', border: '1px solid #E7E0D3' }}>{format}</li>)}
            </ul>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, color: '#0B1F33', margin: '0 0 12px' }}>{L.character}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: '0 0 22px' }}>{L.characterBody}</p>
            <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, color: '#0B1F33', margin: '0 0 8px' }}>{L.responsibility}</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.7, margin: '0 0 6px' }}>{L.student}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.7, margin: 0 }}>{L.instructor}</p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 920px) { .structure-steps { grid-template-columns: repeat(2, 1fr) !important; } .structure-steps article { border-top: 1px solid #E7E0D3; } }
        @media (max-width: 720px) { .structure-levels, .structure-bottom, .structure-steps { grid-template-columns: 1fr !important; } .structure-steps article { border-left: 0 !important; } }
      `}</style>
    </div>
  )
}
