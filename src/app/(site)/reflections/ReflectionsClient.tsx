'use client'

import Link from 'next/link'
import { Breadcrumb, SectionLabel, Tag } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const ARTICLES_DATA = {
  en: [
    { id: 'why-most-business-plans-miss-the-point', title: 'Why Most Business Plans Miss the Point', subtitle: 'A polished document can still avoid the difficult questions.', category: 'Teaching Reflections', excerpt: 'A business plan can be polished, complete and analytically weak. The problem begins when the template becomes the task instead of a way to examine whether the assumptions holding the business together deserve to be believed.', published: true as const },
    { id: 'on-not-knowing-your-competitive-advantage', title: 'On Not Knowing Your Competitive Advantage', subtitle: 'A confession that most strategy courses avoid.', category: 'Entrepreneurship Education', published: false as const },
    { id: 'what-chatgpt-can-and-cannot-do-for-students', title: 'What ChatGPT Can and Cannot Do for Students', subtitle: 'A practical and slightly uncomfortable assessment.', category: 'AI and Education', published: false as const },
    { id: 'the-trouble-with-entrepreneurship-education', title: 'The Trouble with Entrepreneurship Education', subtitle: 'We train for the rare case, not the common one.', category: 'Entrepreneurship Education', published: false as const },
    { id: 'grading-against-reality', title: 'Grading Against Reality', subtitle: 'What happens when professional standards enter the classroom.', category: 'Teaching Reflections', published: false as const },
    { id: 'on-the-useful-limits-of-frameworks', title: 'On the Useful Limits of Frameworks', subtitle: 'When analytical tools become obstacles to analysis.', category: 'Higher Education', published: false as const },
    { id: 'project-based-learning-honest-audit', title: 'Project-Based Learning: An Honest Audit', subtitle: 'What projects reveal—and what they can hide.', category: 'Project-Based Learning', published: false as const },
    { id: 'on-academic-culture-and-honest-disagreement', title: 'On Academic Culture and Honest Disagreement', subtitle: 'The seminar room should be a place where being wrong matters.', category: 'Academic Culture', published: false as const },
  ],
  tr: [
    { id: 'why-most-business-plans-miss-the-point', title: 'Çoğu İş Planı Neden Konuyu Kaçırır', subtitle: 'Özenle hazırlanmış bir belge yine de zor sorulardan kaçınabilir.', category: 'Öğretim Düşünceleri', excerpt: 'Bir iş planı özenli, eksiksiz ve yine de analitik açıdan zayıf olabilir. Sorun, şablonun işi düzenleyen bir araç olmaktan çıkıp görevin kendisine dönüşmesiyle başlar.', published: true as const },
    { id: 'on-not-knowing-your-competitive-advantage', title: 'Rekabet Avantajını Bilmemek Üzerine', subtitle: 'Çoğu strateji dersinin kaçındığı bir itiraf.', category: 'Girişimcilik Eğitimi', published: false as const },
    { id: 'what-chatgpt-can-and-cannot-do-for-students', title: 'ChatGPT Öğrenciler İçin Ne Yapabilir, Ne Yapamaz', subtitle: 'Pratik ve biraz rahatsız edici bir değerlendirme.', category: 'Yapay Zeka ve Eğitim', published: false as const },
    { id: 'the-trouble-with-entrepreneurship-education', title: 'Girişimcilik Eğitiminin Sorunu', subtitle: 'Yaygın durum için değil, nadir durum için eğitiyoruz.', category: 'Girişimcilik Eğitimi', published: false as const },
    { id: 'grading-against-reality', title: 'Gerçekliğe Karşı Notlandırma', subtitle: 'Mesleki standartlar sınıfa girdiğinde ne olur.', category: 'Öğretim Düşünceleri', published: false as const },
    { id: 'on-the-useful-limits-of-frameworks', title: 'Çerçevelerin Yararlı Sınırları Üzerine', subtitle: 'Analitik araçlar analizin önünde engele dönüştüğünde.', category: 'Yükseköğretim', published: false as const },
    { id: 'project-based-learning-honest-audit', title: 'Proje Tabanlı Öğrenme: Dürüst Bir Denetim', subtitle: 'Projelerin ortaya çıkardıkları ve gizleyebildikleri.', category: 'Proje Tabanlı Öğrenme', published: false as const },
    { id: 'on-academic-culture-and-honest-disagreement', title: 'Akademik Kültür ve Dürüst Anlaşmazlık Üzerine', subtitle: 'Seminer salonu yanılmanın önemli olduğu bir yer olmalıdır.', category: 'Akademik Kültür', published: false as const },
  ],
  fr: [
    { id: 'why-most-business-plans-miss-the-point', title: 'Pourquoi la plupart des business plans passent à côté de l’essentiel', subtitle: 'Un document soigné peut encore éviter les questions difficiles.', category: 'Réflexions pédagogiques', excerpt: 'Un business plan peut être soigné, complet et pourtant analytiquement faible. Le problème commence lorsque le modèle devient la tâche, au lieu d’être un moyen d’examiner si les hypothèses qui tiennent l’entreprise ensemble méritent d’être crues.', published: true as const },
    { id: 'on-not-knowing-your-competitive-advantage', title: 'Ne pas connaître son avantage concurrentiel', subtitle: 'Un aveu que la plupart des cours de stratégie évitent.', category: 'Formation à l’entrepreneuriat', published: false as const },
    { id: 'what-chatgpt-can-and-cannot-do-for-students', title: 'Ce que ChatGPT peut et ne peut pas faire pour les étudiants', subtitle: 'Une évaluation pratique, et un peu inconfortable.', category: 'IA et éducation', published: false as const },
    { id: 'the-trouble-with-entrepreneurship-education', title: 'Le problème de la formation à l’entrepreneuriat', subtitle: 'Nous formons pour le cas rare, non pour le cas courant.', category: 'Formation à l’entrepreneuriat', published: false as const },
    { id: 'grading-against-reality', title: 'Noter face à la réalité', subtitle: 'Ce qui se produit lorsque les standards professionnels entrent en classe.', category: 'Réflexions pédagogiques', published: false as const },
    { id: 'on-the-useful-limits-of-frameworks', title: 'Sur les limites utiles des cadres d’analyse', subtitle: 'Lorsque les outils d’analyse deviennent des obstacles à l’analyse.', category: 'Enseignement supérieur', published: false as const },
    { id: 'project-based-learning-honest-audit', title: 'L’apprentissage par projet : un audit honnête', subtitle: 'Ce que les projets révèlent — et ce qu’ils peuvent cacher.', category: 'Apprentissage par projet', published: false as const },
    { id: 'on-academic-culture-and-honest-disagreement', title: 'Culture académique et désaccord honnête', subtitle: 'La salle de séminaire devrait être un lieu où se tromper compte.', category: 'Culture académique', published: false as const },
  ],
}

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbReflections: 'Reflections',
    sectionLabel: 'Writing',
    heading: 'Notes on teaching, business and judgment',
    subheading: 'Shorter essays drawn from questions that recur in teaching: what a framework helps us see, what a project reveals, how students should use AI, and what happens when education rewards the appearance of certainty more than honest reasoning.',
    publishedTag: 'Published', minRead: 'min read', readEssay: 'Read essay',
    forthcomingHeading: 'Forthcoming Essays', forthcomingNote: 'In progress — not yet published',
    forthcomingBadge: 'Forthcoming',
    forthcomingDisclaimer: 'These titles represent editorial concepts under development. They are listed here as intended pieces, not available articles.',
    featuredQuote: '"The form has been mastered. The thinking has been replaced by it."',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbReflections: 'Düşünceler',
    sectionLabel: 'Yazılar',
    heading: 'Öğretim, işletme ve muhakeme üzerine notlar',
    subheading: 'Öğretimde tekrar tekrar karşıma çıkan sorulardan doğan kısa yazılar: bir çerçevenin neyi görmemize yardımcı olduğu, bir projenin neyi açığa çıkardığı, öğrencilerin yapay zekâyı nasıl kullanması gerektiği.',
    publishedTag: 'Yayınlandı', minRead: 'dak okuma', readEssay: 'Denemeyi oku',
    forthcomingHeading: 'Yakında Yayınlanacak Denemeler', forthcomingNote: 'Devam ediyor — henüz yayınlanmadı',
    forthcomingBadge: 'Yakında',
    forthcomingDisclaimer: 'Bu başlıklar geliştirme aşamasındaki editoryal kavramları temsil etmektedir. Burada mevcut makaleler olarak değil, planlanan yazılar olarak listelenmiştir.',
    featuredQuote: '"Form ustalıkla uygulanmış. Düşünce ise formun yerini almış."',
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbReflections: 'Réflexions',
    sectionLabel: 'Écrits',
    heading: 'Notes sur l’enseignement, la gestion et le jugement',
    subheading: 'Essais plus courts nés de questions qui reviennent dans l’enseignement : ce qu’un cadre nous aide à voir, ce qu’un projet révèle, comment les étudiants devraient utiliser l’IA, et ce qui se produit lorsque l’éducation récompense l’apparence de certitude plus qu’un raisonnement honnête.',
    publishedTag: 'Publié', minRead: 'min de lecture', readEssay: 'Lire l’essai',
    forthcomingHeading: 'Essais à venir', forthcomingNote: 'En cours — pas encore publié',
    forthcomingBadge: 'À venir',
    forthcomingDisclaimer: 'Ces titres représentent des concepts éditoriaux en développement. Ils figurent ici comme pièces prévues, non comme articles disponibles.',
    featuredQuote: '« La forme a été maîtrisée. La pensée a été remplacée par elle. »',
  },
}

export default function ReflectionsClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const ARTICLES = ARTICLES_DATA[lang]
  const featured = ARTICLES.find(a => a.published)
  const forthcoming = ARTICLES.filter(a => !a.published)

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbReflections }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '56px 32px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <SectionLabel text={L.sectionLabel} />
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.75, margin: 0, maxWidth: 560 }}>{L.subheading}</p>
        </div>
      </section>

      {featured && 'excerpt' in featured && (
        <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '0 32px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <Link href={`/reflections/${featured.id}`} style={{ display: 'block', textDecoration: 'none', padding: '40px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'center' }} className="ref-featured-grid">
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                    <Tag label={L.publishedTag} color="#3D5A4A" />
                    <Tag label={featured.category} />
                  </div>
                  <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{featured.title}</h2>
                  {featured.subtitle && <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontStyle: 'italic', fontSize: 16, color: '#6A747D', marginBottom: 14 }}>{featured.subtitle}</div>}
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: '0 0 20px' }}>{(featured as typeof ARTICLES_DATA.en[0] & { excerpt?: string }).excerpt}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#0B1F33', borderBottom: '1px solid #0B1F33', paddingBottom: 1, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {L.readEssay}
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M6 1l3 3-3 3M1 4h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
                <div style={{ backgroundColor: '#0B1F33', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 32, height: 1.5, backgroundColor: '#B08D45', margin: '0 auto 16px' }} />
                    <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontStyle: 'italic', color: '#D6D0C5', lineHeight: 1.65 }}>{L.featuredQuote}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section style={{ padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0B1F33', margin: 0 }}>{L.forthcomingHeading}</h2>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D' }}>{L.forthcomingNote}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="ref-forthcoming-grid">
            {forthcoming.map(article => (
              <div key={article.id} style={{ backgroundColor: '#FFFFFF', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: '#B08D45', border: '1px solid #B08D45', padding: '2px 7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.forthcomingBadge}</span>
                  <Tag label={article.category} />
                </div>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#6A747D', margin: 0, lineHeight: 1.35 }}>{article.title}</h3>
                {article.subtitle && <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#8A9299', lineHeight: 1.4 }}>{article.subtitle}</div>}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', fontStyle: 'italic', marginTop: 16, lineHeight: 1.65 }}>{L.forthcomingDisclaimer}</p>
        </div>
      </section>

      <style>{`
        .ref-featured-grid { grid-template-columns: 1fr 280px; }
        @media (max-width: 900px) { .ref-featured-grid { grid-template-columns: 1fr !important; } .ref-forthcoming-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .ref-forthcoming-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
