'use client'

import Link from 'next/link'
import { Breadcrumb, SectionLabel } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const T = {
  en: {
    breadcrumb: ['Home', 'Teaching', 'Four-Year Progression'] as const,
    sectionLabel: 'Learning Progression',
    heroTitle: 'Four-Year Learning Progression',
    heroP1: 'The undergraduate business curriculum is organized as a two-tier progression. The tiers are not separated by difficulty — they are separated by the kind of intellectual work they require.',
    heroP2: 'Tier I builds the foundations that make Tier II possible. Neither tier is more important — both are necessary, and together they form a complete undergraduate education.',
    transitionQuote: '"Students may consult knowledge, but they must produce judgment."',
    transitionSub: 'The principle that separates Tier I from Tier II',
    compLabel: 'Comparison', compTitle: 'Tier I vs. Tier II at a Glance',
    assessLabel: 'On Assessment', assessTitle: 'Why Open-Book Does Not Mean Easy',
    assessT1Title: 'Tier I: Closed-Book', assessT1Body: 'Foundational courses should test accuracy, clarity, and conceptual knowledge. Students must learn the basic theories, models, definitions, and methods of their field. Without this foundation, advanced interpretation becomes weak, arbitrary, or purely rhetorical.',
    assessT2Title: 'Tier II: Open-Book, No Smart Devices', assessT2Body: 'Advanced courses should test reasoning, synthesis, application, and judgment. Exams may be open-book, but smart devices are not allowed. The purpose is to allow access to static knowledge while still requiring independent thought.',
    navTitle: 'See the full teaching system', navSub: 'Explore course classification or return to the Teaching Hub.',
    navClass: 'Course Classification', navHub: 'Teaching Hub',
    keyDimensions: 'Key Dimensions', assessApproach: 'Assessment Approach', tierLabel: 'Tier', tierIIBegins: 'Tier II begins',
  },
  tr: {
    breadcrumb: ['Ana Sayfa', 'Öğretim', 'Dört Yıllık İlerleme'] as const,
    sectionLabel: 'Öğrenme İlerlemesi',
    heroTitle: 'Dört Yıllık Öğrenme İlerlemesi',
    heroP1: 'Lisans işletme müfredatı iki kademeli bir ilerleme olarak düzenlenmiştir. Kademeler zorluk düzeyine göre değil — gerektirdikleri entelektüel çalışma türüne göre birbirinden ayrılır.',
    heroP2: "Kademe I, Kademe II'yi mümkün kılan temelleri inşa eder. Hiçbir kademe diğerinden daha önemli değildir — ikisi de zorunludur ve birlikte tam bir lisans eğitimini oluşturur.",
    transitionQuote: '"Öğrenciler bilgiye başvurabilir, ancak yargı üretmek zorundadır."',
    transitionSub: "Kademe I'i Kademe II'den ayıran ilke",
    compLabel: 'Karşılaştırma', compTitle: "Kademe I ve Kademe II: Bir Bakışta",
    assessLabel: 'Değerlendirme Üzerine', assessTitle: 'Açık Kitap Neden Kolay Anlamına Gelmez',
    assessT1Title: 'Kademe I: Kapalı Kitap', assessT1Body: 'Temel dersler doğruluğu, netliği ve kavramsal bilgiyi test etmelidir. Öğrenciler alanlarının temel kuramlarını, modellerini, tanımlarını ve yöntemlerini öğrenmelidir.',
    assessT2Title: "Kademe II: Açık Kitap, Akıllı Cihaz Yok", assessT2Body: 'İleri dersler akıl yürütmeyi, sentezi, uygulamayı ve yargıyı test etmelidir. Sınavlar açık kitap olabilir, ancak akıllı cihazlara izin verilmez.',
    navTitle: 'Tam öğretim sistemini görün', navSub: "Ders sınıflandırmasını inceleyin ya da Öğretim Merkezi'ne dönün.",
    navClass: 'Ders Sınıflandırması', navHub: 'Öğretim Merkezi',
    keyDimensions: 'Temel Boyutlar', assessApproach: 'Değerlendirme Yaklaşımı', tierLabel: 'Kademe', tierIIBegins: "Kademe II başlıyor",
  },
  fr: {
    breadcrumb: ['Accueil', 'Enseignement', 'Progression sur quatre ans'] as const,
    sectionLabel: 'Progression de l’apprentissage',
    heroTitle: 'Progression d’apprentissage sur quatre ans',
    heroP1: 'Le curriculum de gestion de premier cycle est organisé comme une progression à deux niveaux. Les niveaux ne sont pas séparés par la difficulté — ils sont séparés par le type de travail intellectuel qu’ils exigent.',
    heroP2: 'Le niveau I construit les fondements qui rendent le niveau II possible. Aucun niveau n’est plus important — tous deux sont nécessaires, et ensemble ils forment une formation de premier cycle complète.',
    transitionQuote: '« Les étudiants peuvent consulter le savoir, mais ils doivent produire un jugement. »',
    transitionSub: 'Le principe qui sépare le niveau I du niveau II',
    compLabel: 'Comparaison', compTitle: 'Niveau I et niveau II en un coup d’œil',
    assessLabel: 'Sur l’évaluation', assessTitle: 'Pourquoi un examen à livre ouvert n’est pas facile',
    assessT1Title: 'Niveau I : livre fermé', assessT1Body: 'Les cours de fondement devraient tester l’exactitude, la clarté et le savoir conceptuel. Les étudiants doivent apprendre les théories, modèles, définitions et méthodes de base de leur domaine. Sans ce fondement, l’interprétation avancée devient faible, arbitraire ou purement rhétorique.',
    assessT2Title: 'Niveau II : livre ouvert, sans appareils connectés', assessT2Body: 'Les cours avancés devraient tester le raisonnement, la synthèse, l’application et le jugement. Les examens peuvent être à livre ouvert, mais les appareils connectés ne sont pas autorisés. Le but est d’autoriser l’accès à un savoir statique tout en exigeant encore une pensée indépendante.',
    navTitle: 'Voir le système d’enseignement complet', navSub: 'Explorer la classification des cours ou revenir au pôle enseignement.',
    navClass: 'Classification des cours', navHub: 'Pôle enseignement',
    keyDimensions: 'Dimensions clés', assessApproach: 'Approche d’évaluation', tierLabel: 'Niveau', tierIIBegins: 'Le niveau II commence',
  },
}

const TIER_ONE = {
  en: { number: 'I', title: 'Foundations', years: 'First & Second Years', color: '#1A3550', tagline: 'Understand the foundations before you interpret them.', description: "Tier I corresponds to the first two years of university education. During this period, students are expected to understand, and in some cases memorize, the core knowledge of their respective fields. Foundational theories and models such as Maslow's Hierarchy of Needs or the Tannenbaum and Schmidt Leadership Continuum can act as pillars for more sophisticated courses in later years.", dimensions: [{ label: 'Core Concepts, Theories and Models', desc: 'The fundamental frameworks of economics, accounting, finance, management, marketing and organizational behavior — understood accurately, not superficially.' }, { label: 'Disciplinary Language', desc: 'The precise vocabulary of each field, which allows communication with specialists and distinguishes genuine understanding from approximate familiarity.' }, { label: 'Scientific Methodology', desc: 'Basic research methods, logical reasoning, statistical literacy and the capacity to evaluate evidence rather than merely receive it.' }, { label: 'Structural Guidance', desc: 'Greater instructor-provided scaffolding: structured problem sets, defined criteria, clear expectations.' }, { label: 'Conceptual Accuracy', desc: 'Precision matters more than creativity at this stage. Getting the concept right is the prerequisite for applying it with flexibility later.' }], assessment: ['Exams are generally NOT open-book — the aim is to test what has been understood, not what can be looked up', 'Greater emphasis on accurate theoretical knowledge than on broad interpretive answers', 'Students may be given limited space for their answers to encourage precision, clarity, and discipline', 'Limited interpretive flexibility — the discipline has a structure; students are learning to work within it'], note: 'Tier I is not inferior. It is prior. The student who skips the foundations does not advance — they simply build on an unstable base.' },
  tr: { number: 'I', title: 'Temeller', years: '1. ve 2. Yıllar', color: '#1A3550', tagline: 'Yorumlamadan önce temelleri anlayın.', description: "Kademe I üniversite eğitiminin ilk iki yılına karşılık gelir. Bu dönemde öğrencilerin kendi alanlarının temel bilgilerini anlamaları, bazı durumlarda ise ezberlemeleri beklenir.", dimensions: [{ label: 'Temel Kavramlar, Kuramlar ve Modeller', desc: "Ekonomi, muhasebe, finans, yönetim, pazarlama ve örgütsel davranışın temel çerçeveleri — yüzeysel değil, doğru biçimde anlaşılmış olarak." }, { label: 'Disiplin Dili', desc: 'Uzmanlarla iletişimi sağlayan ve gerçek anlamayı yaklaşık alışkanlıktan ayırt eden her alanın kesin söz dağarcığı.' }, { label: 'Bilimsel Metodoloji', desc: 'Temel araştırma yöntemleri, mantıksal akıl yürütme, istatistik okuryazarlığı ve kanıtları yalnızca almak değil değerlendirme kapasitesi.' }, { label: 'Yapısal Rehberlik', desc: 'Eğitmen tarafından sağlanan daha fazla iskele: yapılandırılmış problem kümeleri, tanımlı kriterler, açık beklentiler.' }, { label: 'Kavramsal Doğruluk', desc: 'Bu aşamada yaratıcılıktan daha önemli olan kesinliktir.' }], assessment: ['Sınavlar genellikle KAPALI KİTAP değildir — amaç neyin anlaşıldığını test etmektir', 'Geniş yorumlayıcı yanıtlardan çok doğru kuramsal bilgiye daha fazla vurgu', 'Kesinliği ve netliği teşvik etmek için öğrencilere sınırlı yanıt alanı verilebilir', 'Sınırlı yorumlayıcı esneklik — disiplinin bir yapısı vardır'], note: "Kademe I aşağı değildir. Öncedir. Temelleri atlayan öğrenci ilerlemez — yalnızca istikrarsız bir temel üzerine inşa eder." },
  fr: { number: 'I', title: 'Fondements', years: 'Première et deuxième années', color: '#1A3550', tagline: 'Comprenez les fondements avant de les interpréter.', description: "Le niveau I correspond aux deux premières années d’université. Durant cette période, les étudiants sont censés comprendre, et dans certains cas mémoriser, le savoir de base de leurs domaines. Des théories et modèles fondateurs tels que la hiérarchie des besoins de Maslow ou le continuum de leadership de Tannenbaum et Schmidt peuvent servir de piliers à des cours plus sophistiqués plus tard.", dimensions: [{ label: 'Concepts, théories et modèles de base', desc: 'Les cadres fondamentaux de l’économie, de la comptabilité, de la finance, du management, du marketing et du comportement organisationnel — compris avec exactitude, non superficiellement.' }, { label: 'Langage disciplinaire', desc: 'Le vocabulaire précis de chaque champ, qui permet de communiquer avec des spécialistes et distingue une compréhension réelle d’une familiarité approximative.' }, { label: 'Méthodologie scientifique', desc: 'Méthodes de recherche de base, raisonnement logique, littératie statistique et capacité à évaluer les preuves plutôt que de seulement les recevoir.' }, { label: 'Guidance structurelle', desc: 'Plus d’échafaudage fourni par l’enseignant : ensembles de problèmes structurés, critères définis, attentes claires.' }, { label: 'Exactitude conceptuelle', desc: 'La précision compte davantage que la créativité à ce stade. Bien saisir le concept est le préalable à l’appliquer ensuite avec flexibilité.' }], assessment: ['Les examens ne sont généralement PAS à livre ouvert — le but est de tester ce qui a été compris, non ce qui peut être recherché', 'Plus d’accent sur un savoir théorique exact que sur des réponses interprétatives larges', 'Les étudiants peuvent disposer d’un espace de réponse limité pour encourager la précision, la clarté et la discipline', 'Flexibilité interprétative limitée — la discipline a une structure ; les étudiants apprennent à travailler à l’intérieur'], note: 'Le niveau I n’est pas inférieur. Il est antérieur. L’étudiant qui saute les fondements n’avance pas — il construit simplement sur une base instable.' },
}

const TIER_TWO = {
  en: { number: 'II', title: 'Synthesis and Judgment', years: 'Third & Fourth Years', color: '#6E2C2C', tagline: 'Connect, hypothesize, and produce defensible conclusions.', description: 'Tier II corresponds to the final two years of university education. Students are expected to connect knowledge across different courses and fields — linking economics with trade, business administration with communication, strategy with technology, and theory with practice. Students are expected to hypothesize, research, compare, interpret, and derive conclusions in a rational and scientific manner.', dimensions: [{ label: 'Cross-Disciplinary Connection', desc: 'Linking economics with trade, business with communication, strategy with technology, finance with organizational behavior — because real decisions require all of them simultaneously.' }, { label: 'Hypothesis-Building', desc: 'Forming testable positions about how something works or why something happened, rather than simply describing it.' }, { label: 'Research and Comparison', desc: 'Identifying, evaluating and synthesizing sources — primary data, academic literature, case evidence — into coherent analysis.' }, { label: 'Interpretation and Defensible Conclusions', desc: 'Arriving at specific, reasoned positions that can be challenged and defended, rather than open-ended summaries.' }, { label: 'Greater Individuality and Judgment', desc: 'Students are expected to have academic voices. Analysis that merely repeats established positions without adding reasoning does not meet Tier II standards.' }], assessment: ['Exams may be OPEN BOOK — students may consult knowledge, but they must produce judgment', 'Smart devices are NOT allowed, even during open-book exams', 'Student answers are expected to reflect individuality — almost no room for replicated or generic responses', 'Assessment relies on personal deduction, hypothesis-building, applied reasoning, and argumentation'], note: '"Students may consult knowledge, but they must produce judgment."', noteIsQuote: true },
  tr: { number: 'II', title: 'Sentez ve Yargı', years: '3. ve 4. Yıllar', color: '#6E2C2C', tagline: 'Bağlantı kurun, hipotez oluşturun ve savunulabilir sonuçlar üretin.', description: "Kademe II üniversite eğitiminin son iki yılına karşılık gelir. Öğrencilerin farklı dersler ve alanlar arasında bilgiyi bağlamaları beklenir.", dimensions: [{ label: 'Disiplinlerarası Bağlantı', desc: 'Ekonomiyi ticaretle, işletmeyi iletişimle, stratejiyi teknolojiyle, finansı örgütsel davranışla ilişkilendirmek.' }, { label: 'Hipotez Oluşturma', desc: "Bir şeyin nasıl işlediğini ya da neden gerçekleştiğini yalnızca tanımlamak yerine, sınanabilir pozisyonlar geliştirmek." }, { label: 'Araştırma ve Karşılaştırma', desc: 'Birincil veri, akademik literatür, vaka kanıtı gibi kaynakları belirleme, değerlendirme ve tutarlı analize dönüştürme.' }, { label: 'Yorum ve Savunulabilir Sonuçlar', desc: 'Ucu açık özetler yerine sorgulanabilir ve savunulabilir özgün pozisyonlara ulaşmak.' }, { label: 'Artan Bireysellik ve Yargı', desc: "Öğrencilerin akademik sesleri olması beklenir." }], assessment: ["Sınavlar AÇIK KİTAP olabilir — öğrenciler bilgiye başvurabilir, ancak yargı üretmek zorundadır", 'Açık kitap sınavlarda bile akıllı cihazlara İZİN VERİLMEZ', 'Öğrenci yanıtlarının bireyselliği yansıtması beklenir', 'Değerlendirme kişisel çıkarım, hipotez kurma ve argümantasyona dayanır'], note: '"Öğrenciler bilgiye başvurabilir, ancak yargı üretmek zorundadır."', noteIsQuote: true },
  fr: { number: 'II', title: 'Synthèse et jugement', years: 'Troisième et quatrième années', color: '#6E2C2C', tagline: 'Relier, formuler des hypothèses et produire des conclusions défendables.', description: 'Le niveau II correspond aux deux dernières années d’université. Les étudiants sont censés relier le savoir entre différents cours et domaines — lier l’économie au commerce, l’administration des affaires à la communication, la stratégie à la technologie, et la théorie à la pratique. Ils sont censés formuler des hypothèses, rechercher, comparer, interpréter et tirer des conclusions de façon rationnelle et scientifique.', dimensions: [{ label: 'Connexion interdisciplinaire', desc: 'Relier l’économie au commerce, les affaires à la communication, la stratégie à la technologie, la finance au comportement organisationnel — parce que les décisions réelles les exigent simultanément.' }, { label: 'Construction d’hypothèses', desc: 'Former des positions testables sur le fonctionnement de quelque chose ou les raisons d’un événement, plutôt que de seulement le décrire.' }, { label: 'Recherche et comparaison', desc: 'Identifier, évaluer et synthétiser des sources — données primaires, littérature académique, preuves de cas — en une analyse cohérente.' }, { label: 'Interprétation et conclusions défendables', desc: 'Parvenir à des positions spécifiques et raisonnées qui peuvent être contestées et défendues, plutôt qu’à des résumés ouverts.' }, { label: 'Plus d’individualité et de jugement', desc: 'Les étudiants sont censés avoir une voix académique. Une analyse qui se contente de répéter des positions établies sans ajouter de raisonnement ne satisfait pas aux standards du niveau II.' }], assessment: ['Les examens peuvent être À LIVRE OUVERT — les étudiants peuvent consulter le savoir, mais ils doivent produire un jugement', 'Les appareils connectés ne sont PAS autorisés, même pendant les examens à livre ouvert', 'Les réponses des étudiants sont censées refléter une individualité — presque aucun espace pour des réponses répliquées ou génériques', 'L’évaluation s’appuie sur la déduction personnelle, la construction d’hypothèses, le raisonnement appliqué et l’argumentation'], note: '« Les étudiants peuvent consulter le savoir, mais ils doivent produire un jugement. »', noteIsQuote: true },
}

const PROGRESSION_ITEMS = {
  en: [
    { year: 'Year 1', tier: 'I', label: 'Disciplinary Entry', desc: 'Core vocabulary, foundational models, scientific methodology', color: '#1A3550' },
    { year: 'Year 2', tier: 'I', label: 'Deepening Foundations', desc: 'Advanced theoretical frameworks, functional specialization, quantitative methods', color: '#1A3550' },
    { year: 'Year 3', tier: 'II', label: 'Synthesis Begins', desc: 'Cross-disciplinary connections, hypothesis formation, structured research', color: '#6E2C2C' },
    { year: 'Year 4', tier: 'II', label: 'Independent Judgment', desc: 'Original analysis, defended conclusions, capstone project work', color: '#6E2C2C' },
  ],
  tr: [
    { year: '1. Yıl', tier: 'I', label: 'Disipline Giriş', desc: 'Temel söz dağarcığı, temel modeller, bilimsel metodoloji', color: '#1A3550' },
    { year: '2. Yıl', tier: 'I', label: 'Temellerin Derinleşmesi', desc: 'Gelişmiş kuramsal çerçeveler, işlevsel uzmanlaşma, nicel yöntemler', color: '#1A3550' },
    { year: '3. Yıl', tier: 'II', label: 'Sentez Başlıyor', desc: 'Disiplinlerarası bağlantılar, hipotez oluşturma, yapılandırılmış araştırma', color: '#6E2C2C' },
    { year: '4. Yıl', tier: 'II', label: 'Bağımsız Yargı', desc: 'Özgün analiz, savunulmuş sonuçlar, bitirme projesi çalışması', color: '#6E2C2C' },
  ],
  fr: [
    { year: 'Année 1', tier: 'I', label: 'Entrée disciplinaire', desc: 'Vocabulaire de base, modèles fondateurs, méthodologie scientifique', color: '#1A3550' },
    { year: 'Année 2', tier: 'I', label: 'Approfondissement des fondements', desc: 'Cadres théoriques avancés, spécialisation fonctionnelle, méthodes quantitatives', color: '#1A3550' },
    { year: 'Année 3', tier: 'II', label: 'La synthèse commence', desc: 'Connexions interdisciplinaires, formation d’hypothèses, recherche structurée', color: '#6E2C2C' },
    { year: 'Année 4', tier: 'II', label: 'Jugement indépendant', desc: 'Analyse originale, conclusions défendues, travail de projet de fin d’études', color: '#6E2C2C' },
  ],
}

const COMPARISONS_DATA = {
  en: [
    { dimension: 'Years', t1: '1st and 2nd', t2: '3rd and 4th' },
    { dimension: 'Primary focus', t1: 'Core concepts, theories and models', t2: 'Synthesis, hypothesis and judgment' },
    { dimension: 'Instructor scaffolding', t1: 'Higher — structured problem sets, defined criteria', t2: 'Lower — students design more of their own inquiry' },
    { dimension: 'Interpretive flexibility', t1: 'Limited — accuracy over creativity', t2: 'Higher — defensible positions expected' },
    { dimension: 'Typical assessment', t1: 'Closed-book, structured problems', t2: 'Open-book, research papers, defended projects' },
    { dimension: 'Smart devices in exams', t1: 'Not permitted', t2: 'Not permitted' },
    { dimension: 'Cross-disciplinary links', t1: 'Introduced at the end of Tier I', t2: 'Central to all Tier II work' },
    { dimension: 'Student voice', t1: 'Developing — accuracy first', t2: 'Expected — positions must be original and defended' },
  ],
  tr: [
    { dimension: 'Yıllar', t1: '1. ve 2. yıl', t2: '3. ve 4. yıl' },
    { dimension: 'Birincil odak', t1: 'Temel kavramlar, kuramlar ve modeller', t2: 'Sentez, hipotez ve yargı' },
    { dimension: 'Eğitmen iskelesi', t1: 'Yüksek — yapılandırılmış problem kümeleri, tanımlı kriterler', t2: "Düşük — öğrenciler araştırmalarını daha fazla kendileri tasarlar" },
    { dimension: 'Yorumlayıcı esneklik', t1: 'Sınırlı — yaratıcılık yerine doğruluk', t2: 'Yüksek — savunulabilir pozisyonlar beklenir' },
    { dimension: 'Tipik değerlendirme', t1: 'Kapalı kitap, yapılandırılmış problemler', t2: 'Açık kitap, araştırma makaleleri, savunulmuş projeler' },
    { dimension: 'Sınavda akıllı cihaz', t1: 'İzin verilmez', t2: 'İzin verilmez' },
    { dimension: 'Disiplinlerarası bağlantılar', t1: "Kademe I'in sonunda tanıtılır", t2: "Tüm Kademe II çalışmalarının merkezindedir" },
    { dimension: 'Öğrenci sesi', t1: 'Geliştirilmekte — önce doğruluk', t2: 'Beklenir — pozisyonlar özgün ve savunulmuş olmalı' },
  ],
  fr: [
    { dimension: 'Années', t1: '1re et 2e', t2: '3e et 4e' },
    { dimension: 'Focus principal', t1: 'Concepts, théories et modèles de base', t2: 'Synthèse, hypothèse et jugement' },
    { dimension: 'Échafaudage de l’enseignant', t1: 'Plus élevé — ensembles de problèmes structurés, critères définis', t2: 'Plus faible — les étudiants conçoivent davantage leur propre enquête' },
    { dimension: 'Flexibilité interprétative', t1: 'Limitée — exactitude plutôt que créativité', t2: 'Plus élevée — des positions défendables sont attendues' },
    { dimension: 'Évaluation typique', t1: 'Livre fermé, problèmes structurés', t2: 'Livre ouvert, articles de recherche, projets défendus' },
    { dimension: 'Appareils connectés aux examens', t1: 'Non autorisés', t2: 'Non autorisés' },
    { dimension: 'Liens interdisciplinaires', t1: 'Introduits à la fin du niveau I', t2: 'Centraux dans tout le travail du niveau II' },
    { dimension: 'Voix de l’étudiant', t1: 'En développement — l’exactitude d’abord', t2: 'Attendue — les positions doivent être originales et défendues' },
  ],
}

type TierData = typeof TIER_ONE.en & { noteIsQuote?: boolean }

function TierSection({ tier, keyDimensionsLabel, assessApproachLabel, tierLabel }: { tier: TierData; keyDimensionsLabel: string; assessApproachLabel: string; tierLabel: string }) {
  return (
    <section style={{ padding: '72px 32px', borderBottom: '1px solid #E7E0D3' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, marginBottom: 48, alignItems: 'start' }} className="tier-header-grid">
          <div>
            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 72, fontWeight: 700, color: tier.color, opacity: 0.12, lineHeight: 1, marginBottom: -16 }}>{tier.number}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{tierLabel} {tier.number}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px', lineHeight: 1.15 }}>{tier.title}</h2>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', marginBottom: 16 }}>{tier.years}</div>
            <div style={{ width: 32, height: 1.5, backgroundColor: tier.color }} />
          </div>
          <div>
            <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 16, fontStyle: 'italic', color: '#1E2328', lineHeight: 1.65, margin: '0 0 16px', borderLeft: '2px solid #B08D45', paddingLeft: 18 }}>"{tier.tagline}"</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.8, margin: 0 }}>{tier.description}</p>
          </div>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E7E0D3' }}>{keyDimensionsLabel}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {tier.dimensions.map((dim, i) => (
              <div key={dim.label} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px 28px', padding: '18px 0', borderBottom: i < tier.dimensions.length - 1 ? '1px solid #E7E0D3' : 'none', alignItems: 'start' }} className="dim-row">
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 14, fontWeight: 700, color: '#0B1F33' }}>{dim.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.65 }}>{dim.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: '1px solid #E7E0D3', padding: '28px 32px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{assessApproachLabel}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tier.assessment.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: tier.color, flexShrink: 0, marginTop: 8 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', lineHeight: 1.65 }}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #E7E0D3' }}>
          <p style={{ fontFamily: tier.noteIsQuote ? 'Libre Baskerville, Georgia, serif' : 'Inter, sans-serif', fontSize: tier.noteIsQuote ? 16 : 14, fontStyle: tier.noteIsQuote ? 'italic' : 'normal', color: '#1E2328', lineHeight: 1.7, margin: 0 }}>{tier.note}</p>
        </div>
      </div>
      <style>{`.tier-header-grid { grid-template-columns: 1fr 2fr !important; } .dim-row { grid-template-columns: 220px 1fr !important; } @media (max-width: 760px) { .tier-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; } .dim-row { grid-template-columns: 1fr !important; gap: 6px !important; } }`}</style>
    </section>
  )
}

export default function ProgressionClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const tierOne = TIER_ONE[lang] as TierData
  const tierTwo = TIER_TWO[lang] as TierData
  const progressionItems = PROGRESSION_ITEMS[lang]
  const comparisons = COMPARISONS_DATA[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumb[0], href: '/' }, { label: L.breadcrumb[1], href: '/teaching' }, { label: L.breadcrumb[2] }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 64px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <SectionLabel text={L.sectionLabel} />
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 24px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{L.heroTitle}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#6A747D', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 700 }}>{L.heroP1}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.8, margin: 0, maxWidth: 700 }}>{L.heroP2}</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', padding: '64px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="prog-grid">
            {progressionItems.map(item => (
              <div key={item.year} style={{ backgroundColor: '#FFFFFF', padding: '22px 20px', borderTop: `3px solid ${item.color}` }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: item.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{item.year} · {L.tierLabel} {item.tier}</div>
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 14, fontWeight: 700, color: '#0B1F33', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TierSection tier={tierOne} keyDimensionsLabel={L.keyDimensions} assessApproachLabel={L.assessApproach} tierLabel={L.tierLabel} />

      <section style={{ backgroundColor: '#0B1F33', padding: '56px 32px', borderBottom: '1px solid #0B1F33' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 40, height: 1.5, backgroundColor: '#B08D45', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.55, margin: '0 0 12px' }}>{L.transitionQuote}</p>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{L.transitionSub}</span>
        </div>
      </section>

      <TierSection tier={tierTwo} keyDimensionsLabel={L.keyDimensions} assessApproachLabel={L.assessApproach} tierLabel={L.tierLabel} />

      <section style={{ backgroundColor: '#FFFFFF', padding: '56px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <SectionLabel text={L.compLabel} />
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 24, fontWeight: 700, color: '#0B1F33', margin: '0 0 28px' }}>{L.compTitle}</h2>
          <div style={{ overflowX: 'auto', border: '1px solid #E7E0D3' }}>
            <div style={{ minWidth: 600 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', backgroundColor: '#0B1F33' }}>
                <div style={{ padding: '12px 20px', borderRight: '1px solid #1A3550' }} />
                {[tierOne, tierTwo].map(t => <div key={t.number} style={{ padding: '12px 20px', textAlign: 'center', borderRight: '1px solid #1A3550' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.tierLabel} {t.number}: {t.title}</span></div>)}
              </div>
              {comparisons.map((row, i) => (
                <div key={row.dimension} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', borderTop: '1px solid #E7E0D3', backgroundColor: '#FFFFFF' }}>
                  <div style={{ padding: '14px 20px', borderRight: '1px solid #E7E0D3' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6A747D' }}>{row.dimension}</span></div>
                  <div style={{ padding: '14px 20px', borderRight: '1px solid #E7E0D3' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', lineHeight: 1.55 }}>{row.t1}</span></div>
                  <div style={{ padding: '14px 20px' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', lineHeight: 1.55 }}>{row.t2}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', padding: '64px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <SectionLabel text={L.assessLabel} />
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 24px' }}>{L.assessTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="assessment-grid">
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', borderTop: '2px solid #1A3550', padding: '28px 24px' }}>
              <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>{L.assessT1Title}</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: 0 }}>{L.assessT1Body}</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', borderTop: '2px solid #6E2C2C', padding: '28px 24px' }}>
              <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>{L.assessT2Title}</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: 0 }}>{L.assessT2Body}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '40px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>{L.navTitle}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{L.navSub}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/teaching/classification" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{L.navClass}</Link>
            <Link href="/teaching" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#0B1F33', border: '1px solid #0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{L.navHub}</Link>
          </div>
        </div>
      </section>

      <style>{`
        .prog-grid { grid-template-columns: repeat(4, 1fr) !important; }
        .assessment-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 760px) {
          .prog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .assessment-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
