'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const CATEGORY_DATA: Record<string, { en: { title: string; subtitle: string; rationale: string; topicMap: string[] }; tr: { title: string; subtitle: string; rationale: string; topicMap: string[] }; fr: { title: string; subtitle: string; rationale: string; topicMap: string[] } }> = {
  'e-commerce': { en: { title: 'E-Commerce Education', subtitle: 'Digital business models, platforms & online strategy', rationale: "E-commerce courses address the entire lifecycle of an online business — from concept validation to operational execution. The emphasis is not on tools or trends, but on the underlying business logic: why certain models work, how platforms create or destroy value, and how to build a financial case that holds up under scrutiny.", topicMap: ['Business model design', 'Platform economics', 'SEO & digital marketing', 'E-commerce feasibility analysis', 'Payment systems & logistics', 'Customer acquisition cost modeling', 'Competitive positioning online', 'Legal & regulatory basics'] }, tr: { title: 'E-Ticaret Eğitimi', subtitle: 'Dijital iş modelleri, platformlar ve çevrimiçi strateji', rationale: "E-ticaret dersleri, kavram doğrulamasından operasyonel yürütmeye kadar bir çevrimiçi işletmenin tüm yaşam döngüsünü ele alır. Vurgu araçlar veya trendler üzerinde değil, temel iş mantığı üzerindedir.", topicMap: ['İş modeli tasarımı', 'Platform ekonomisi', 'SEO ve dijital pazarlama', 'E-ticaret fizibilite analizi', 'Ödeme sistemleri ve lojistik', 'Müşteri edinme maliyeti modelleme', 'Çevrimiçi rekabetçi konumlanma', 'Yasal ve düzenleyici temel bilgiler'] }, fr: { title: 'Formation e-commerce', subtitle: 'Modèles d’affaires numériques, plateformes et stratégie en ligne', rationale: "Les cours d’e-commerce portent sur l’ensemble du cycle de vie d’une entreprise en ligne — de la validation du concept à l’exécution opérationnelle. L’accent n’est pas mis sur les outils ou les tendances, mais sur la logique d’affaires sous-jacente : pourquoi certains modèles fonctionnent, comment les plateformes créent ou détruisent de la valeur, et comment construire un dossier financier qui résiste à l’examen.", topicMap: ['Conception de modèles d’affaires', 'Économie des plateformes', 'SEO et marketing digital', 'Analyse de faisabilité e-commerce', 'Systèmes de paiement et logistique', 'Modélisation du coût d’acquisition', 'Positionnement concurrentiel en ligne', 'Bases juridiques et réglementaires'] } },
  'management-organization': { en: { title: 'Management & Organization', subtitle: 'Leadership, organizational behavior & team dynamics', rationale: "Management courses teach how organizations work from the inside — motivation, coordination, communication, and the structural conditions that make teams effective or dysfunctional. The approach is empirical: frameworks are introduced as tools for analysis, not as prescriptions.", topicMap: ['Motivation theory (Maslow, Herzberg)', 'Leadership models (Tannenbaum-Schmidt)', 'Organizational structure', 'Change management', 'Group dynamics', 'Conflict resolution', 'Managerial decision-making', 'Corporate culture'] }, tr: { title: 'Yönetim ve Organizasyon', subtitle: 'Liderlik, örgütsel davranış ve ekip dinamikleri', rationale: "Yönetim dersleri, organizasyonların içten nasıl işlediğini öğretir: motivasyon, koordinasyon, iletişim ve ekipleri etkin ya da işlevsiz kılan yapısal koşullar.", topicMap: ['Motivasyon teorisi (Maslow, Herzberg)', 'Liderlik modelleri (Tannenbaum-Schmidt)', 'Organizasyon yapısı', 'Değişim yönetimi', 'Grup dinamikleri', 'Çatışma çözümü', 'Yönetimsel karar verme', 'Kurumsal kültür'] }, fr: { title: 'Management et organisation', subtitle: 'Leadership, comportement organisationnel et dynamique d’équipe', rationale: "Les cours de management enseignent le fonctionnement interne des organisations — motivation, coordination, communication, et les conditions structurelles qui rendent les équipes efficaces ou dysfonctionnelles. L’approche est empirique : les cadres sont présentés comme des outils d’analyse, non comme des prescriptions.", topicMap: ['Théorie de la motivation (Maslow, Herzberg)', 'Modèles de leadership (Tannenbaum-Schmidt)', 'Structure organisationnelle', 'Gestion du changement', 'Dynamique de groupe', 'Résolution des conflits', 'Décision managériale', 'Culture d’entreprise'] } },
  'project-management-feasibility': { en: { title: 'Project Management & Feasibility', subtitle: 'From idea to implementable, defensible plan', rationale: "Feasibility analysis is the discipline of asking whether an idea is actually viable — not whether it sounds good. These courses develop the ability to construct a financial model, state assumptions explicitly, rank uncertainties, and produce a recommendation that can be defended under questioning.", topicMap: ['Market feasibility', 'Technical feasibility', 'Financial modeling & projections', 'Assumption identification', 'Risk analysis', 'Project planning & milestones', 'Business case construction', 'Investment return analysis'] }, tr: { title: 'Proje Yönetimi ve Fizibilite', subtitle: 'Fikirden uygulanabilir ve savunulabilir plana', rationale: "Fizibilite analizi, bir fikrin kulağa hoş gelmesinden değil gerçekten uygulanabilir olup olmadığından sorulmasının disiplinidir.", topicMap: ['Pazar fizibilitesi', 'Teknik fizibilite', 'Finansal modelleme ve projeksiyonlar', 'Varsayım tespiti', 'Risk analizi', 'Proje planlaması ve kilometre taşları', 'İş senaryosu oluşturma', 'Yatırım getirisi analizi'] }, fr: { title: 'Gestion de projet et faisabilité', subtitle: 'De l’idée à un plan réalisable et défendable', rationale: "L’analyse de faisabilité est la discipline qui consiste à demander si une idée est réellement viable — et non si elle sonne bien. Ces cours développent la capacité à construire un modèle financier, à énoncer explicitement les hypothèses, à classer les incertitudes et à produire une recommandation défendable.", topicMap: ['Faisabilité de marché', 'Faisabilité technique', 'Modélisation financière et projections', 'Identification des hypothèses', 'Analyse de risques', 'Planification de projet et jalons', 'Construction du dossier d’affaires', 'Analyse du rendement de l’investissement'] } },
  'strategy-leadership': { en: { title: 'Strategy & Leadership', subtitle: 'Strategic analysis, competitive positioning & systems thinking', rationale: "Strategy courses develop the capacity to think about organizations at the level of competitive position, long-run advantage, and systemic risk. Systems thinking is the unifying thread: feedback loops, unintended consequences, and dynamic complexity.", topicMap: ["Competitive analysis frameworks", "Porter's Five Forces", 'Strategic positioning', 'Systems dynamics', 'Corporate governance', 'Scenario planning', 'Resource-based view', 'Strategic risk assessment'] }, tr: { title: 'Strateji ve Liderlik', subtitle: 'Stratejik analiz, rekabetçi konumlanma ve sistem düşüncesi', rationale: "Strateji dersleri, organizasyonları rekabetçi konum, uzun vadeli avantaj ve sistemik risk düzeyinde düşünme kapasitesini geliştirir.", topicMap: ["Rekabetçi analiz çerçeveleri", "Porter'ın Beş Kuvveti", 'Stratejik konumlanma', 'Sistem dinamiği', 'Kurumsal yönetim', 'Senaryo planlaması', 'Kaynak tabanlı görüş', 'Stratejik risk değerlendirmesi'] }, fr: { title: 'Stratégie et leadership', subtitle: 'Analyse stratégique, positionnement concurrentiel et pensée systémique', rationale: "Les cours de stratégie développent la capacité à penser les organisations au niveau de la position concurrentielle, de l’avantage de long terme et du risque systémique. La pensée systémique en est le fil conducteur : boucles de rétroaction, conséquences non voulues et complexité dynamique.", topicMap: ['Cadres d’analyse concurrentielle', 'Cinq forces de Porter', 'Positionnement stratégique', 'Dynamique des systèmes', 'Gouvernance d’entreprise', 'Planification de scénarios', 'Approche par les ressources', 'Évaluation du risque stratégique'] } },
  'aviation-sectoral': { en: { title: 'Sectoral Business', subtitle: 'Business management applied to aviation and specialized sectors', rationale: "Sectoral business courses apply general management principles to specific operational and regulatory contexts. Aviation is a case study in complexity: demand forecasting, revenue optimization, safety culture, and regulatory constraint.", topicMap: ['Revenue management & pricing', 'Demand elasticity modeling', 'Regulatory environment', 'Fleet economics', 'Route profitability analysis', 'Safety management systems', 'Sector-specific KPIs', 'Labor relations in aviation'] }, tr: { title: 'Sektörel İşletme', subtitle: 'Havacılık ve uzmanlaşmış sektörlere uygulanan işletme yönetimi', rationale: "Sektörel işletme dersleri, genel yönetim ilkelerini belirli operasyonel ve düzenleyici bağlamlara uygular.", topicMap: ['Gelir yönetimi ve fiyatlandırma', 'Talep esnekliği modelleme', 'Düzenleyici çevre', 'Filo ekonomisi', 'Rota karlılık analizi', 'Güvenlik yönetim sistemleri', "Sektöre özgü KPI'lar", 'Havacılıkta çalışan ilişkileri'] }, fr: { title: 'Gestion sectorielle', subtitle: 'Management appliqué à l’aviation et aux secteurs spécialisés', rationale: "Les cours de gestion sectorielle appliquent les principes généraux du management à des contextes opérationnels et réglementaires spécifiques. L’aviation est un cas d’étude de la complexité : prévision de la demande, optimisation des revenus, culture de sécurité et contrainte réglementaire.", topicMap: ['Gestion des revenus et tarification', 'Modélisation de l’élasticité de la demande', 'Environnement réglementaire', 'Économie de flotte', 'Analyse de rentabilité des routes', 'Systèmes de gestion de la sécurité', 'Indicateurs propres au secteur', 'Relations du travail dans l’aviation'] } },
  'research-methods-ai': { en: { title: 'Research Methods / AI in Business', subtitle: 'Analytical methodology, trade data & critical AI evaluation', rationale: "Research methodology courses develop the ability to design a study, collect usable data, and interpret results without overstating conclusions. AI modules address the tools that students already use — critically, practically.", topicMap: ['Research design', 'Quantitative data analysis', 'Trade statistics & index construction', 'Qualitative research methods', 'AI tool evaluation', 'Prompt engineering & limitations', 'Citation and sourcing standards', 'Data visualization'] }, tr: { title: 'Araştırma Yöntemleri / İşletmede Yapay Zeka', subtitle: 'Analitik metodoloji, ticaret verisi ve eleştirel yapay zeka değerlendirmesi', rationale: "Araştırma metodolojisi dersleri, bir çalışmayı tasarlama, kullanılabilir veri toplama ve sonuçları abartmadan yorumlama becerisini geliştirir.", topicMap: ['Araştırma tasarımı', 'Nicel veri analizi', 'Ticaret istatistikleri ve endeks yapımı', 'Nitel araştırma yöntemleri', 'Yapay zeka araç değerlendirmesi', 'Prompt mühendisliği ve sınırları', 'Atıf ve kaynak gösterme standartları', 'Veri görselleştirme'] }, fr: { title: 'Méthodes de recherche / IA en gestion', subtitle: 'Méthodologie analytique, données commerciales et évaluation critique de l’IA', rationale: "Les cours de méthodologie de recherche développent la capacité à concevoir une étude, à collecter des données utilisables et à interpréter les résultats sans en exagérer les conclusions. Les modules d’IA traitent les outils que les étudiants utilisent déjà — de façon critique et pratique.", topicMap: ['Conception de la recherche', 'Analyse de données quantitatives', 'Statistiques commerciales et construction d’indices', 'Méthodes de recherche qualitative', 'Évaluation des outils d’IA', 'Ingénierie de prompts et limites', 'Normes de citation et de sourcing', 'Visualisation des données'] } },
}

const T = {
  en: { teachingArea: 'Teaching Area', whyThisArea: 'Why This Teaching Area', rationale: 'Rationale', coveredTopics: 'Covered Topics', topicMap: 'Topic Map', courseMaterials: 'Course Materials', slidesHeading: 'Presentations Archive', slidesBody: 'Verified slide decks and teaching materials will be listed in the presentations archive when they are ready to publish.', presentationsLink: 'Presentations Archive', notFound: 'Category Not Found', backToCourses: '← Back to Courses' },
  tr: { teachingArea: 'Öğretim Alanı', whyThisArea: 'Bu Öğretim Alanı Neden', rationale: 'Gerekçe', coveredTopics: 'Kapsanan Konular', topicMap: 'Konu Haritası', courseMaterials: 'Ders Materyalleri', slidesHeading: 'Sunumlar Arşivi', slidesBody: 'Doğrulanmış slaytlar ve öğretim materyalleri yayıma hazır olduklarında sunumlar arşivinde listelenecektir.', presentationsLink: 'Sunumlar Arşivi', notFound: 'Kategori Bulunamadı', backToCourses: '← Derslere Geri Dön' },
  fr: { teachingArea: 'Domaine d’enseignement', whyThisArea: 'Pourquoi ce domaine', rationale: 'Justification', coveredTopics: 'Sujets couverts', topicMap: 'Carte des sujets', courseMaterials: 'Supports de cours', slidesHeading: 'Archive des présentations', slidesBody: 'Les diaporamas et supports d’enseignement vérifiés seront listés dans l’archive des présentations lorsqu’ils seront prêts à être publiés.', presentationsLink: 'Archive des présentations', notFound: 'Catégorie introuvable', backToCourses: '← Retour aux cours' },
}

const arrow = (<svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M7 1l2.5 2.5L7 6M1 3.5h8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>)

export default function CourseCategoryClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const params = useParams()
  const slug = params?.slug as string | undefined
  const categoryEntry = CATEGORY_DATA[slug || '']

  if (!categoryEntry) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, color: '#0B1F33', marginBottom: 12 }}>{L.notFound}</div>
        <Link href="/courses" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#B08D45', textDecoration: 'none' }}>{L.backToCourses}</Link>
      </div>
    )
  }

  const data = categoryEntry[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: lang === 'tr' ? 'Ana Sayfa' : lang === 'fr' ? 'Accueil' : 'Home', href: '/' }, { label: lang === 'tr' ? 'Dersler' : lang === 'fr' ? 'Cours' : 'Courses', href: '/courses' }, { label: data.title }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '64px 32px 52px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.teachingArea}</span>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 44px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px', lineHeight: 1.12, letterSpacing: '-0.01em' }}>{data.title}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.75, margin: 0 }}>{data.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="category-top-2col">
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px 36px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{L.whyThisArea}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 21, fontWeight: 700, color: '#0B1F33', margin: '0 0 18px', lineHeight: 1.25 }}>{L.rationale}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', lineHeight: 1.8, margin: 0 }}>{data.rationale}</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px 36px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{L.coveredTopics}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 21, fontWeight: 700, color: '#0B1F33', margin: '0 0 18px', lineHeight: 1.25 }}>{L.topicMap}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {data.topicMap.map((topic, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ width: 3, height: 3, backgroundColor: '#B08D45', borderRadius: '50%', flexShrink: 0, marginTop: 8 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', lineHeight: 1.5 }}>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 32px 56px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', backgroundColor: '#0B1F33', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#B08D45', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{L.courseMaterials}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 20, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px', lineHeight: 1.2 }}>{L.slidesHeading}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8B4BE', lineHeight: 1.65, margin: 0, maxWidth: 480 }}>{L.slidesBody}</p>
          </div>
          <Link href="/presentations" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', backgroundColor: '#B08D45', padding: '12px 20px', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0 }}>
            {L.presentationsLink} {arrow}
          </Link>
        </div>
      </section>

      <style>{`@media (max-width: 767px) { .category-top-2col { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
