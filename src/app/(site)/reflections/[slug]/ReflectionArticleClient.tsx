'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, Tag } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

type Section = { id: string; heading: string; body: string[] }

const ARTICLE: Record<'en' | 'tr' | 'fr', { title: string; standfirst: string; category: string; sections: Section[] }> = {
  en: {
    title: 'Why Most Business Plans Miss the Point',
    standfirst: 'A business plan should make uncertainty easier to examine. Too often, it does the opposite: it turns uncertain assumptions into neat headings and gives them the appearance of settled facts.',
    category: 'Reflection',
    sections: [
      { id: 'the-familiar-document', heading: 'A complete document can still avoid the question', body: ['There is a familiar moment in business-plan assignments. The document has all the expected sections. The market has been described. Competitors have been named. There is a marketing plan, an operations section and a financial forecast. The file looks complete. And yet, after a few questions, it becomes difficult to tell why anyone should believe the business will work.', 'I do not think this is mainly a writing problem. It is a problem of what we have taught students to believe the task is.'] },
      { id: 'template', heading: 'A template is useful—until it becomes the objective', body: ['Templates have a legitimate purpose. They remind students that a business has several connected parts and that an idea cannot be evaluated from the product alone.', 'The difficulty begins when completion is confused with analysis. If every heading contains a paragraph, the plan feels finished. But a section can be present without doing any useful work.'] },
      { id: 'assumptions', heading: 'The real plan is the chain of assumptions', body: ['Underneath every business plan is a chain of propositions that have to be true often enough, and at the same time, for the business to remain viable. Customers have to notice the offer. Some proportion of them have to care. A smaller proportion have to buy.', "That chain is more interesting to me than the number of pages in the plan. Once students can see it, the work changes."] },
      { id: 'forecasts', heading: 'Good forecasts are not predictions of certainty', body: ['Financial projections often create the strongest illusion of certainty because they contain numbers. A spreadsheet can extend a weak assumption across thirty-six months with perfect arithmetic.', 'I therefore want students to explain where an important number comes from and what would happen if it changed.'] },
      { id: 'original-idea', heading: 'The point is not to defend the original idea', body: ['Students sometimes treat a feasibility project as if success means proving that the original idea was good. That creates a strange incentive: inconvenient evidence becomes something to explain away.', 'In that sense, a negative conclusion can be excellent work. The student has learned something before spending more time or money.'] },
      { id: 'rather-see', heading: 'What I would rather see', body: ['I would rather read a shorter plan in which the important assumptions are explicit than a longer plan that hides them inside polished prose. I would rather see a student say "we do not yet know" and propose a sensible way to investigate.', 'Most of all, I want the document to preserve the thinking that produced it.'] },
      { id: 'not-the-business', heading: 'The business plan is not the business', body: ['No plan removes uncertainty. Markets change, people behave differently from survey responses, costs move and unexpected constraints appear. The purpose of planning is not to make those facts disappear.', "That is why I think most weak business plans miss the point even when they look professional."] },
    ],
  },
  tr: {
    title: 'Çoğu İş Planı Neden Konuyu Kaçırır',
    standfirst: 'Bir iş planı belirsizliği incelemeyi kolaylaştırmalıdır. Oysa çoğu zaman bunun tersini yapar: belirsiz varsayımları düzenli başlıklara dönüştürür ve onlara kesinleşmiş gerçeklerin görünümünü verir.',
    category: 'Düşünce',
    sections: [
      { id: 'the-familiar-document', heading: 'Eksiksiz bir belge yine de asıl sorudan kaçabilir', body: ['İş planı ödevlerinde tanıdık bir an vardır. Belgede beklenen bütün bölümler bulunur. Pazar anlatılmış, rakipler sıralanmış. Dosya tamamlanmış görünür. Fakat birkaç sorudan sonra işletmenin neden çalışacağına inanmamız gerektiğini açıklamak zorlaşır.', 'Bunun öncelikle bir yazma sorunu olduğunu düşünmüyorum.'] },
      { id: 'template', heading: 'Şablon yararlıdır—ta ki amacın kendisine dönüşene kadar', body: ['Şablonların meşru bir işlevi vardır. Öğrencilere bir işletmenin birbiriyle bağlantılı birçok parçadan oluştuğunu hatırlatırlar.', 'Sorun, tamamlamanın analizle karıştırıldığı yerde başlar.'] },
      { id: 'assumptions', heading: 'Asıl plan varsayımlar zinciridir', body: ['Her iş planının altında önermeler zinciri vardır. Müşterilerin teklifi fark etmesi, bir kısmının önemsemesi, daha küçük bir kısmının satın alması gerekir.', 'Bu zincir benim için planın sayfa sayısından daha ilginçtir.'] },
      { id: 'forecasts', heading: 'İyi tahminler kesinlik iddiası değildir', body: ['Finansal projeksiyonlar sayılar içerdikleri için çoğu zaman en güçlü kesinlik yanılsamasını yaratır.', 'Bu nedenle öğrencilerin önemli bir sayının nereden geldiğini açıklamasını isterim.'] },
      { id: 'original-idea', heading: 'Amaç ilk fikri savunmak değildir', body: ['Öğrenciler bazen fizibilite projesini, başarının ilk fikrin iyi olduğunu kanıtlamak anlamına geldiği bir çalışma gibi görür.', 'Bu anlamda olumsuz bir sonuç mükemmel bir çalışma olabilir.'] },
      { id: 'rather-see', heading: 'Görmeyi tercih ettiğim şey', body: ['Önemli varsayımları açıkça gösteren kısa bir planı, onları cilalı düzyazı içinde saklayan uzun bir plana tercih ederim.', 'Her şeyden önce belge, kendisini üreten düşünceyi korumalıdır.'] },
      { id: 'not-the-business', heading: 'İş planı işletmenin kendisi değildir', body: ['Hiçbir plan belirsizliği ortadan kaldırmaz. Pazarlar değişir, insanlar anket yanıtlarından farklı davranır.', 'Bu nedenle zayıf iş planlarının profesyonel görünseler bile asıl noktayı kaçırdığını düşünüyorum.'] },
    ],
  },
  fr: {
    title: 'Pourquoi la plupart des business plans passent à côté de l’essentiel',
    standfirst: 'Un business plan devrait rendre l’incertitude plus facile à examiner. Trop souvent, il fait l’inverse : il transforme des hypothèses incertaines en rubriques soignées et leur donne l’apparence de faits établis.',
    category: 'Réflexion',
    sections: [
      { id: 'the-familiar-document', heading: 'Un document complet peut encore éviter la question', body: ['Il existe un moment familier dans les devoirs de business plan. Le document a toutes les sections attendues. Le marché a été décrit. Les concurrents ont été nommés. Il y a un plan marketing, une section opérations et une prévision financière. Le fichier paraît complet. Et pourtant, après quelques questions, il devient difficile de dire pourquoi quiconque devrait croire que l’entreprise fonctionnera.', 'Je ne pense pas qu’il s’agisse surtout d’un problème d’écriture. C’est un problème de ce que nous avons appris aux étudiants à croire que la tâche consiste à faire.'] },
      { id: 'template', heading: 'Un modèle est utile — jusqu’à ce qu’il devienne l’objectif', body: ['Les modèles ont une fonction légitime. Ils rappellent aux étudiants qu’une entreprise a plusieurs parties liées et qu’une idée ne peut pas être évaluée à partir du seul produit.', 'La difficulté commence lorsque l’achèvement est confondu avec l’analyse. Si chaque rubrique contient un paragraphe, le plan semble terminé. Mais une section peut être présente sans faire aucun travail utile.'] },
      { id: 'assumptions', heading: 'Le vrai plan est la chaîne d’hypothèses', body: ['Sous chaque business plan se trouve une chaîne de propositions qui doivent être assez souvent vraies, et en même temps, pour que l’entreprise reste viable. Les clients doivent remarquer l’offre. Une partie d’entre eux doit s’en soucier. Une plus petite partie doit acheter.', 'Cette chaîne m’intéresse davantage que le nombre de pages du plan. Une fois que les étudiants la voient, le travail change.'] },
      { id: 'forecasts', heading: 'Les bonnes prévisions ne sont pas des prédictions de certitude', body: ['Les projections financières créent souvent la plus forte illusion de certitude parce qu’elles contiennent des chiffres. Un tableur peut étendre une hypothèse faible sur trente-six mois avec une arithmétique parfaite.', 'Je veux donc que les étudiants expliquent d’où vient un chiffre important et ce qui se passerait s’il changeait.'] },
      { id: 'original-idea', heading: 'Le but n’est pas de défendre l’idée initiale', body: ['Les étudiants traitent parfois un projet de faisabilité comme si le succès consistait à prouver que l’idée initiale était bonne. Cela crée une incitation étrange : les preuves gênantes deviennent quelque chose à écarter.', 'En ce sens, une conclusion négative peut être un excellent travail. L’étudiant a appris quelque chose avant de dépenser davantage de temps ou d’argent.'] },
      { id: 'rather-see', heading: 'Ce que je préférerais voir', body: ['Je préfère lire un plan plus court où les hypothèses importantes sont explicites qu’un plan plus long qui les cache dans une prose soignée. Je préfère voir un étudiant dire « nous ne savons pas encore » et proposer une façon raisonnable d’enquêter.', 'Surtout, je veux que le document préserve la pensée qui l’a produit.'] },
      { id: 'not-the-business', heading: 'Le business plan n’est pas l’entreprise', body: ['Aucun plan n’élimine l’incertitude. Les marchés changent, les gens se comportent autrement que dans les réponses d’enquête, les coûts bougent et des contraintes imprévues apparaissent. Le but de la planification n’est pas de faire disparaître ces faits.', 'C’est pourquoi je pense que la plupart des business plans faibles passent à côté de l’essentiel, même lorsqu’ils paraissent professionnels.'] },
    ],
  },
}

const FORTHCOMING: Record<string, { en: string; tr: string; fr: string }> = {
  'on-not-knowing-your-competitive-advantage': { en: 'On Not Knowing Your Competitive Advantage', tr: 'Rekabet Avantajını Bilmemek Üzerine', fr: 'Ne pas connaître son avantage concurrentiel' },
  'what-chatgpt-can-and-cannot-do-for-students': { en: 'What ChatGPT Can and Cannot Do for Students', tr: 'ChatGPT Öğrenciler İçin Ne Yapabilir, Ne Yapamaz', fr: 'Ce que ChatGPT peut et ne peut pas faire pour les étudiants' },
  'the-trouble-with-entrepreneurship-education': { en: 'The Trouble with Entrepreneurship Education', tr: 'Girişimcilik Eğitiminin Sorunu', fr: 'Le problème de la formation à l’entrepreneuriat' },
  'grading-against-reality': { en: 'Grading Against Reality', tr: 'Gerçekliğe Karşı Notlandırma', fr: 'Noter face à la réalité' },
  'on-the-useful-limits-of-frameworks': { en: 'On the Useful Limits of Frameworks', tr: 'Çerçevelerin Yararlı Sınırları Üzerine', fr: 'Sur les limites utiles des cadres d’analyse' },
  'project-based-learning-honest-audit': { en: 'Project-Based Learning: An Honest Audit', tr: 'Proje Tabanlı Öğrenme: Dürüst Bir Denetim', fr: 'L’apprentissage par projet : un audit honnête' },
  'on-academic-culture-and-honest-disagreement': { en: 'On Academic Culture and Honest Disagreement', tr: 'Akademik Kültür ve Dürüst Anlaşmazlık Üzerine', fr: 'Culture académique et désaccord honnête' },
}

const UI = {
  en: { home: 'Home', reflections: 'Reflections', back: 'Back to reflections', contents: 'Contents', forthcoming: 'Reflection · Forthcoming', working: 'I am still working on this piece. It will be published here when the argument is ready rather than simply when the page is ready.' },
  tr: { home: 'Ana Sayfa', reflections: 'Düşünceler', back: 'Düşüncelere dön', contents: 'İçindekiler', forthcoming: 'Düşünce · Yakında', working: 'Bu yazı üzerinde hâlâ çalışıyorum. Sayfa hazır olduğunda değil, sav hazır olduğunda burada yayımlanacaktır.' },
  fr: { home: 'Accueil', reflections: 'Réflexions', back: 'Retour aux réflexions', contents: 'Sommaire', forthcoming: 'Réflexion · À venir', working: 'Je travaille encore sur ce texte. Il sera publié ici lorsque l’argument sera prêt, et non simplement lorsque la page le sera.' },
}

export default function ReflectionArticleClient() {
  const { lang } = useLanguage()
  const L = UI[lang]
  const params = useParams()
  const slug = params?.slug as string | undefined
  const forthcoming = slug ? FORTHCOMING[slug] : undefined

  if (slug !== 'why-most-business-plans-miss-the-point') {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '70vh' }}>
        <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.reflections, href: '/reflections' }]} />
        <section style={{ padding: '72px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{L.forthcoming}</div>
            <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.2, color: '#0B1F33', margin: '0 0 18px' }}>{forthcoming ? forthcoming[lang] : L.reflections}</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#6A747D', margin: '0 auto 26px', maxWidth: 560 }}>{L.working}</p>
            <Link href="/reflections" style={{ display: 'inline-block', border: '1px solid #0B1F33', padding: '11px 20px', color: '#0B1F33', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.back}</Link>
          </div>
        </section>
      </div>
    )
  }

  const article = ARTICLE[lang]
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.reflections, href: '/reflections' }, { label: article.title }]} />

      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '64px 32px 48px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Tag label={article.category} />
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.12, color: '#0B1F33', margin: '18px 0 16px' }}>{article.title}</h1>
          <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(17px, 2.5vw, 21px)', fontStyle: 'italic', lineHeight: 1.65, color: '#6A747D', margin: 0 }}>{article.standfirst}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, paddingTop: 20, borderTop: '1px solid #E7E0D3' }}>
            <div style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: 700, fontSize: 12 }}>AE</div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1E2328' }}>Ateş Erol</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D' }}>{lang === 'tr' ? 'Öğretim Görevlisi · İşletme Eğitimi' : lang === 'fr' ? 'Enseignant · Formation en gestion' : 'Lecturer · Business Education'}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="article-layout" style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 32px 72px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 220px', gap: 64, alignItems: 'start' }}>
        <article style={{ maxWidth: 760 }}>
          {article.sections.map(section => (
            <section key={section.id} id={section.id} style={{ marginBottom: 44, scrollMarginTop: 90 }}>
              <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(21px, 3vw, 27px)', lineHeight: 1.3, color: '#0B1F33', margin: '0 0 18px' }}>{section.heading}</h2>
              {section.body.map((paragraph, i) => <p key={i} style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.85, color: '#1E2328', margin: '0 0 20px' }}>{paragraph}</p>)}
            </section>
          ))}
          <Link href="/reflections" style={{ display: 'inline-block', borderBottom: '1px solid #0B1F33', color: '#0B1F33', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.back}</Link>
        </article>

        <aside className="article-toc" style={{ position: 'sticky', top: 82, backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '20px 18px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{L.contents}</div>
          {article.sections.map(section => <a key={section.id} href={`#${section.id}`} style={{ display: 'block', padding: '7px 0', color: '#6A747D', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 12, lineHeight: 1.4 }}>{section.heading}</a>)}
        </aside>
      </div>

      <style>{`@media (max-width: 900px) { .article-layout { grid-template-columns: 1fr !important; } .article-toc { display: none !important; } }`}</style>
    </div>
  )
}
