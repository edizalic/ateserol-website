'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbTeaching: 'Teaching', breadcrumbCurrent: 'Purpose of Business Education',
    label: 'Teaching · Philosophical Foundations',
    title: 'Purpose of Business Education',
    metaCategory: 'Category', metaCategoryValue: 'Teaching Philosophy',
    metaSection: 'Section', metaSectionValue: 'Teaching Hub',
    metaReading: 'Reading time', metaReadingValue: 'Approx. 8 min',
    tocContents: 'Contents', related: 'Related',
    relatedLinks: [
      { label: 'Student Pathways', href: '/teaching/pathways' },
      { label: 'Teaching Ethos', href: '/teaching/ethos' },
      { label: 'Teaching Hub', href: '/teaching' },
    ],
    openingQuote: '"It was never the sole purpose of the School of Business to create corporate workers."',
    opening1: 'The deeper ideal behind business education is to develop educated individuals who can understand, manage, improve, and expand different aspects of a business. A business graduate should not be limited to one narrow function. They should be able to understand accounting, marketing, operations, information systems, strategy, finance, communication, and organizational decision-making as parts of a larger system.',
    opening2: 'In this sense, the School of Business should produce people with a sophisticated understanding of how businesses function. Ideally, these individuals should be capable of improving their own organizations through scientific reasoning, practical know-how, and responsible decision-making.',
    systemH2: 'Business as an Interconnected System',
    system1: 'The disciplines taught within a business school are not independent. Accounting, marketing, operations, information systems, finance, communication, strategy and organizational decision-making are components of the same underlying system — and the system does not function well when one component is understood in isolation from the others.',
    system2: 'A financial decision is never purely financial. It affects organizational capacity, shapes what operations can deliver, constrains what marketing can promise and determines what the firm can communicate credibly.',
    system3: 'The purpose of a business curriculum is to build the capacity to reason across these interconnections — to understand not only what each discipline does, but how they condition each other.',
    beyondH2: 'Education Beyond Employability',
    beyond1: 'Business education should not be reduced to employability alone. Employment is one possible outcome, but not the only one. A strong business education should prepare students for multiple paths.',
    beyondQuote: '"A curriculum organized around understanding produces graduates who can adapt. A curriculum organized around employability produces graduates who fit — until they don\'t."',
    beyond2: 'When business knowledge is limited only to large corporations, small businesses and independent entrepreneurs are placed at a structural disadvantage.',
    smallerH2: 'Knowledge and Smaller Market Actors',
    smaller1: 'Large corporations have departments — lawyers, accountants, marketing agencies, financial analysts, HR teams. A small business owner, independent entrepreneur or freelance professional has none of these resources on retainer, and so must understand what each of them does.',
    smaller2: 'These people were expected to improve their own businesses with scientific reasoning and know-how, which in turn will result in a more balanced market.',
    smallerNote: 'A sole proprietor who understands pricing strategy, inventory management and customer lifetime value does not need to hire consultants to explain these things. The knowledge itself is the resource.',
    scientificH2: 'Scientific Reasoning and Responsible Decision-Making',
    scientific1: 'Scientific reasoning means forming hypotheses before collecting evidence, evaluating evidence honestly rather than selectively, revising conclusions when the evidence requires it, and acknowledging the limits of what is known.',
    scientificQuote: '"Proposing something that cannot work is not merely an intellectual error. It is a failure of responsibility."',
    scientific2: 'Practical know-how — the capacity to execute rather than merely to analyze — is the other half of this equation.',
    pathwaysH2: 'Five Pathways Forward',
    pathways1: 'The orientation described in this essay does not prescribe a single career trajectory. It is consistent with all five of the major paths available to a business graduate:',
    pathways2: 'None of these paths is superior to another. What they share is that all of them benefit from the same foundational understanding.',
    pathwayRows: [
      { title: 'Employee', desc: 'Stability, professional development, and success through efficiency and productivity.' },
      { title: 'Business Owner', desc: 'Freedom derived from ownership authority. Requires discipline, operational awareness, and financial responsibility.' },
      { title: 'Freelancer', desc: 'Flexibility and independence. Relies on individual expertise, reputation, adaptability, and client relationships.' },
      { title: 'Entrepreneur', desc: 'Change and dynamism. Entrepreneurs search for new ideas, new ventures, and new models.' },
      { title: 'Academic', desc: 'The satisfaction of curiosity through research, questioning, and understanding.' },
    ],
    exploreBtn: 'Explore Student Pathways',
    navTitle: 'Continue through the teaching system',
    navSub: 'See how students can use this education across five distinct career paths.',
    navPathways: 'Student Pathways',
    navHub: 'Teaching Hub',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbTeaching: 'Öğretim', breadcrumbCurrent: 'İşletme Eğitiminin Amacı',
    label: 'Öğretim · Felsefi Temeller',
    title: 'İşletme Eğitiminin Amacı',
    metaCategory: 'Kategori', metaCategoryValue: 'Öğretim Felsefesi',
    metaSection: 'Bölüm', metaSectionValue: 'Öğretim Merkezi',
    metaReading: 'Okuma süresi', metaReadingValue: 'Yakl. 8 dak',
    tocContents: 'İçindekiler', related: 'İlgili',
    relatedLinks: [
      { label: 'Kariyer Yolları', href: '/teaching/pathways' },
      { label: 'Öğretim Anlayışı', href: '/teaching/ethos' },
      { label: 'Öğretim Merkezi', href: '/teaching' },
    ],
    openingQuote: '"İşletme Okulu\'nun tek amacının kurumsal çalışanlar yetiştirmek olduğu hiçbir zaman düşünülmemiştir."',
    opening1: 'İşletme eğitiminin arkasındaki daha derin ideal, bir işletmenin farklı boyutlarını anlayabilen, yönetebilen, geliştirebilen ve genişletebilen bireyler yetiştirmektir.',
    opening2: 'Bu anlamda İşletme Okulu, işletmelerin nasıl işlediğini derinlemesine anlayan bireyler yetiştirmelidir.',
    systemH2: 'Birbirine Bağlı Bir Sistem Olarak İşletme',
    system1: 'Bir işletme okulunda öğretilen disiplinler bağımsız değildir. Muhasebe, pazarlama, operasyonlar, bilgi sistemleri, finans, iletişim, strateji ve örgütsel karar verme; aynı temel sistemin bileşenleridir.',
    system2: 'Bir finansal karar hiçbir zaman salt finansal değildir. Örgütün kapasitesini etkiler, operasyonların neler sunabileceğini şekillendirir.',
    system3: 'Bir işletme müfredatının amacı, bu karşılıklı bağlantılar üzerinden akıl yürütme kapasitesi inşa etmektir.',
    beyondH2: 'İstihdam Ötesinde Eğitim',
    beyond1: 'İşletme eğitimi yalnızca istihdama indirgenemez. İstihdam olası çıktılardan biridir, tek çıktı değil.',
    beyondQuote: '"Anlayış odaklı bir müfredat uyum sağlayabilen mezunlar yetiştirir. İstihdam odaklı bir müfredat uyum sağlayan mezunlar yetiştirir — ta ki artık sağlayamayana kadar."',
    beyond2: 'İşletme bilgisi yalnızca büyük şirketlerle sınırlı kaldığında, küçük işletmeler ve bağımsız girişimciler yapısal bir dezavantajla karşı karşıya kalır.',
    smallerH2: 'Bilgi ve Küçük Piyasa Aktörleri',
    smaller1: 'Büyük şirketlerin avukatları, muhasebecileri, pazarlama ajansları, finansal analistleri, insan kaynakları ekipleri vardır. Küçük işletme sahibi bu kaynakların hiçbirini sürekli olarak bünyesinde bulunduramaz.',
    smaller2: 'Bu kişilerin bilimsel akıl yürütme ve pratik bilgi birikimiyle kendi işletmelerini geliştirmeleri beklenmektedir.',
    smallerNote: 'Fiyatlandırma stratejisini, stok yönetimini ve müşteri yaşam boyu değerini anlayan bir sole proprietor danışman tutmak zorunda değildir. Bilginin kendisi kaynaktır.',
    scientificH2: 'Bilimsel Akıl Yürütme ve Sorumlu Karar Alma',
    scientific1: 'Bilimsel akıl yürütme; kanıt toplamadan önce hipotez oluşturmayı, kanıtları seçici değil dürüst biçimde değerlendirmeyi gerektirir.',
    scientificQuote: '"İşe yaramayacak bir şey önermek yalnızca entelektüel bir hata değildir. Sorumluluk başarısızlığıdır."',
    scientific2: 'Pratik bilgi birikimi — yalnızca analiz etmek değil, icra edebilme kapasitesi — bu denklemin diğer yarısıdır.',
    pathwaysH2: 'Beş Kariyer Yolu',
    pathways1: 'Bu makalede tanımlanan yönelim tek bir kariyer yolu öngörmez. Bir işletme mezununa açık beş temel yolun tamamıyla uyumludur:',
    pathways2: 'Bu yolların hiçbiri diğerinden üstün değildir.',
    pathwayRows: [
      { title: 'Çalışan', desc: 'Verimlilik ve üretkenlik yoluyla istikrar, mesleki gelişim ve başarı.' },
      { title: 'İşletme Sahibi', desc: 'Mülkiyet otoritesinden kaynaklanan özgürlük. Disiplin ve finansal sorumluluk gerektirir.' },
      { title: 'Serbest Çalışan', desc: 'Esneklik ve bağımsızlık. Bireysel uzmanlığa, itibare ve müşteri ilişkilerine dayanır.' },
      { title: 'Girişimci', desc: 'Değişim ve dinamizm. Girişimciler yeni fikirler, yeni girişimler ve yeni modeller arar.' },
      { title: 'Akademisyen', desc: 'Araştırma, sorgulama ve anlama yoluyla merakın tatmini.' },
    ],
    exploreBtn: 'Kariyer Yollarını Keşfedin',
    navTitle: 'Öğretim sisteminde ilerlemeye devam edin',
    navSub: "Öğrencilerin bu eğitimi beş farklı kariyer yolunda nasıl kullanabildiğini görün.",
    navPathways: 'Kariyer Yolları',
    navHub: 'Öğretim Merkezi',
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbTeaching: 'Enseignement', breadcrumbCurrent: 'Finalité de la formation en gestion',
    label: 'Enseignement · Fondements philosophiques',
    title: 'Finalité de la formation en gestion',
    metaCategory: 'Catégorie', metaCategoryValue: 'Philosophie d’enseignement',
    metaSection: 'Section', metaSectionValue: 'Pôle enseignement',
    metaReading: 'Temps de lecture', metaReadingValue: 'Environ 8 min',
    tocContents: 'Sommaire', related: 'Liens',
    relatedLinks: [
      { label: 'Parcours étudiants', href: '/teaching/pathways' },
      { label: 'Éthos pédagogique', href: '/teaching/ethos' },
      { label: 'Pôle enseignement', href: '/teaching' },
    ],
    openingQuote: '« Ce n’a jamais été le seul but de l’École de gestion de former des salariés d’entreprise. »',
    opening1: 'L’idéal plus profond de la formation en gestion est de former des individus capables de comprendre, gérer, améliorer et développer différents aspects d’une entreprise. Un diplômé en gestion ne devrait pas être limité à une fonction étroite. Il devrait pouvoir comprendre la comptabilité, le marketing, les opérations, les systèmes d’information, la stratégie, la finance, la communication et la décision organisationnelle comme parties d’un système plus large.',
    opening2: 'En ce sens, l’École de gestion devrait produire des personnes ayant une compréhension sophistiquée du fonctionnement des entreprises. Idéalement, ces personnes devraient être capables d’améliorer leurs propres organisations par un raisonnement scientifique, un savoir-faire pratique et une décision responsable.',
    systemH2: 'L’entreprise comme système interconnecté',
    system1: 'Les disciplines enseignées dans une école de gestion ne sont pas indépendantes. Comptabilité, marketing, opérations, systèmes d’information, finance, communication, stratégie et décision organisationnelle sont des composantes du même système sous-jacent — et le système ne fonctionne pas bien lorsqu’une composante est comprise isolément des autres.',
    system2: 'Une décision financière n’est jamais purement financière. Elle affecte la capacité organisationnelle, façonne ce que les opérations peuvent livrer, contraint ce que le marketing peut promettre et détermine ce que l’entreprise peut communiquer de façon crédible.',
    system3: 'La finalité d’un curriculum de gestion est de construire la capacité à raisonner à travers ces interconnexions — à comprendre non seulement ce que chaque discipline fait, mais comment elles se conditionnent mutuellement.',
    beyondH2: 'Une éducation au-delà de l’employabilité',
    beyond1: 'La formation en gestion ne devrait pas être réduite à l’employabilité seule. L’emploi est une issue possible, mais pas la seule. Une formation solide devrait préparer les étudiants à plusieurs chemins.',
    beyondQuote: '« Un curriculum organisé autour de la compréhension produit des diplômés qui peuvent s’adapter. Un curriculum organisé autour de l’employabilité produit des diplômés qui s’insèrent — jusqu’au moment où ils ne le peuvent plus. »',
    beyond2: 'Lorsque le savoir de gestion est limité aux grandes entreprises, les petites entreprises et les entrepreneurs indépendants se trouvent structurellement désavantagés.',
    smallerH2: 'Le savoir et les plus petits acteurs du marché',
    smaller1: 'Les grandes entreprises ont des services — juristes, comptables, agences marketing, analystes financiers, équipes RH. Un chef de petite entreprise, un entrepreneur indépendant ou un professionnel freelance n’a aucune de ces ressources en permanence, et doit donc comprendre ce que chacune d’elles fait.',
    smaller2: 'On attendait de ces personnes qu’elles améliorent leurs propres entreprises par le raisonnement scientifique et le savoir-faire, ce qui contribue à un marché plus équilibré.',
    smallerNote: 'Un entrepreneur individuel qui comprend la stratégie de prix, la gestion des stocks et la valeur vie client n’a pas besoin d’embaucher des consultants pour expliquer ces choses. Le savoir lui-même est la ressource.',
    scientificH2: 'Raisonnement scientifique et décision responsable',
    scientific1: 'Le raisonnement scientifique consiste à former des hypothèses avant de collecter des preuves, à évaluer les preuves honnêtement plutôt que sélectivement, à réviser les conclusions lorsque les preuves l’exigent, et à reconnaître les limites de ce qui est connu.',
    scientificQuote: '« Proposer quelque chose qui ne peut pas fonctionner n’est pas seulement une erreur intellectuelle. C’est un échec de responsabilité. »',
    scientific2: 'Le savoir-faire pratique — la capacité d’exécuter plutôt que seulement d’analyser — est l’autre moitié de cette équation.',
    pathwaysH2: 'Cinq parcours possibles',
    pathways1: 'L’orientation décrite dans cet essai ne prescrit pas une seule trajectoire de carrière. Elle est compatible avec les cinq grands chemins ouverts à un diplômé en gestion :',
    pathways2: 'Aucun de ces chemins n’est supérieur à un autre. Ce qu’ils partagent, c’est que tous bénéficient de la même compréhension fondamentale.',
    pathwayRows: [
      { title: 'Salarié', desc: 'Stabilité, développement professionnel et succès par l’efficacité et la productivité.' },
      { title: 'Chef d’entreprise', desc: 'Liberté dérivée de l’autorité de propriété. Exige discipline, conscience opérationnelle et responsabilité financière.' },
      { title: 'Indépendant', desc: 'Flexibilité et indépendance. Repose sur l’expertise individuelle, la réputation, l’adaptabilité et les relations clients.' },
      { title: 'Entrepreneur', desc: 'Changement et dynamisme. Les entrepreneurs cherchent de nouvelles idées, de nouvelles entreprises et de nouveaux modèles.' },
      { title: 'Universitaire', desc: 'La satisfaction de la curiosité par la recherche, le questionnement et la compréhension.' },
    ],
    exploreBtn: 'Explorer les parcours étudiants',
    navTitle: 'Poursuivre dans le système d’enseignement',
    navSub: 'Voir comment les étudiants peuvent utiliser cette formation selon cinq parcours de carrière distincts.',
    navPathways: 'Parcours étudiants',
    navHub: 'Pôle enseignement',
  },
}

const TOC_DATA = {
  en: [
    { id: 'opening', label: 'Opening Statement' },
    { id: 'system', label: 'Business as a System' },
    { id: 'beyond', label: 'Beyond Employability' },
    { id: 'smaller', label: 'Smaller Market Actors' },
    { id: 'scientific', label: 'Scientific Reasoning' },
    { id: 'pathways', label: 'Five Pathways' },
  ],
  tr: [
    { id: 'opening', label: 'Giriş' },
    { id: 'system', label: 'Sistem Olarak İşletme' },
    { id: 'beyond', label: 'İstihdam Ötesinde' },
    { id: 'smaller', label: 'Küçük Piyasa Aktörleri' },
    { id: 'scientific', label: 'Bilimsel Akıl Yürütme' },
    { id: 'pathways', label: 'Beş Kariyer Yolu' },
  ],
  fr: [
    { id: 'opening', label: 'Ouverture' },
    { id: 'system', label: 'L’entreprise comme système' },
    { id: 'beyond', label: 'Au-delà de l’employabilité' },
    { id: 'smaller', label: 'Plus petits acteurs du marché' },
    { id: 'scientific', label: 'Raisonnement scientifique' },
    { id: 'pathways', label: 'Cinq parcours' },
  ],
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 20px', lineHeight: 1.3 }}>{children}</h2>
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#1E2328', lineHeight: 1.85, margin: '0 0 22px' }}>{children}</p>
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote style={{ margin: '32px 0', borderLeft: '2px solid #B08D45', paddingLeft: 24 }}>
      <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(16px, 1.8vw, 20px)', fontStyle: 'italic', color: '#0B1F33', lineHeight: 1.55, margin: 0 }}>{children}</p>
    </blockquote>
  )
}

function BlockquoteNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', borderLeft: '2px solid #0B1F33', padding: '20px 24px', margin: '24px 0' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', lineHeight: 1.75, margin: 0 }}>{children}</p>
    </div>
  )
}

export default function PurposeClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const tocItems = TOC_DATA[lang]
  const [activeSection, setActiveSection] = useState('opening')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [tocItems])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '0 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', height: 44, display: 'flex', alignItems: 'center', gap: 8 }}>
          {[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbTeaching, href: '/teaching' }, { label: L.breadcrumbCurrent }].map((item, i) => (
            <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <svg width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="#E7E0D3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              {'href' in item && item.href ? (
                <Link href={item.href} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', textDecoration: 'none' }}>{item.label}</Link>
              ) : (
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#1E2328' }}>{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 56px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.label}</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 28px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{L.title}</h1>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingBottom: 24, borderBottom: '1px solid #E7E0D3' }}>
            {[{ label: L.metaCategory, value: L.metaCategoryValue }, { label: L.metaSection, value: L.metaSectionValue }, { label: L.metaReading, value: L.metaReadingValue }].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, alignItems: 'start' }} className="purpose-essay-layout">
        <aside className="purpose-desktop-toc" style={{ position: 'sticky', top: 80 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{L.tocContents}</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {tocItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: activeSection === item.id ? 600 : 400, color: activeSection === item.id ? '#B08D45' : '#6A747D', borderLeft: `2px solid ${activeSection === item.id ? '#B08D45' : 'transparent'}`, transition: 'all 0.15s' }}>
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ height: 1, backgroundColor: '#E7E0D3', margin: '24px 0' }} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{L.related}</div>
          {L.relatedLinks.map(link => (
            <Link key={link.label} href={link.href} style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', textDecoration: 'none', padding: '5px 0', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#B08D45')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6A747D')}>
              → {link.label}
            </Link>
          ))}
        </aside>

        <article style={{ maxWidth: 680 }}>
          <section id="opening" style={{ marginBottom: 64 }}>
            <PullQuote>{L.openingQuote}</PullQuote>
            <Prose>{L.opening1}</Prose>
            <Prose>{L.opening2}</Prose>
          </section>
          <section id="system" style={{ marginBottom: 64 }}>
            <H2>{L.systemH2}</H2>
            <Prose>{L.system1}</Prose>
            <Prose>{L.system2}</Prose>
            <Prose>{L.system3}</Prose>
          </section>
          <section id="beyond" style={{ marginBottom: 64 }}>
            <H2>{L.beyondH2}</H2>
            <Prose>{L.beyond1}</Prose>
            <PullQuote>{L.beyondQuote}</PullQuote>
            <Prose>{L.beyond2}</Prose>
          </section>
          <section id="smaller" style={{ marginBottom: 64 }}>
            <H2>{L.smallerH2}</H2>
            <Prose>{L.smaller1}</Prose>
            <Prose>{L.smaller2}</Prose>
            <BlockquoteNote>{L.smallerNote}</BlockquoteNote>
          </section>
          <section id="scientific" style={{ marginBottom: 64 }}>
            <H2>{L.scientificH2}</H2>
            <Prose>{L.scientific1}</Prose>
            <PullQuote>{L.scientificQuote}</PullQuote>
            <Prose>{L.scientific2}</Prose>
          </section>
          <section id="pathways" style={{ marginBottom: 0 }}>
            <H2>{L.pathwaysH2}</H2>
            <Prose>{L.pathways1}</Prose>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #E7E0D3', margin: '28px 0' }}>
              {L.pathwayRows.map((p, i, arr) => (
                <div key={p.title} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0 24px', padding: '16px 20px', borderBottom: i < arr.length - 1 ? '1px solid #E7E0D3' : 'none', alignItems: 'start' }}>
                  <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 14, fontWeight: 700, color: '#0B1F33' }}>{p.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              ))}
            </div>
            <Prose>{L.pathways2}</Prose>
            <div style={{ marginTop: 32 }}>
              <Link href="/teaching/pathways" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#0B1F33', padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1A3550')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0B1F33')}>
                {L.exploreBtn}
                <svg width="13" height="9" viewBox="0 0 13 9" fill="none"><path d="M8 1l4 3.5L8 8M1 4.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </section>
        </article>
      </div>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '40px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>{L.navTitle}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{L.navSub}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/teaching/pathways" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1A3550')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0B1F33')}>
              {L.navPathways}
            </Link>
            <Link href="/teaching" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#0B1F33', border: '1px solid #0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {L.navHub}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .purpose-essay-layout { grid-template-columns: 220px 1fr !important; }
        .purpose-desktop-toc { display: block !important; }
        @media (max-width: 900px) {
          .purpose-essay-layout { grid-template-columns: 1fr !important; }
          .purpose-desktop-toc { display: none !important; }
        }
      `}</style>
    </div>
  )
}
