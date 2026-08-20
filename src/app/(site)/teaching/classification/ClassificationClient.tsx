'use client'

import Link from 'next/link'
import { Breadcrumb, SectionLabel } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const T = {
  en: {
    breadcrumb: ['Home', 'Teaching', 'Course Classification'] as const,
    sectionLabel: 'Course Classification',
    heroTitle: 'How Courses Are Classified',
    heroP1a: 'Every course in this teaching portfolio is classified along two dimensions: its',
    heroP1function: ' function',
    heroP1b: ' — what educational work the course performs — and its',
    heroP1type: ' type',
    heroP1c: ' — whether it proceeds primarily through quantitative or qualitative reasoning.',
    heroP2: 'These two dimensions are independent. A theoretical course can be quantitative or qualitative. A practical course can be either. Understanding the classification helps students know not only what a course covers, but how it will ask them to think.',
    sec1Label: 'Section 1', sec1Title: 'Course Functions',
    sec1Desc: 'Function describes what a course', sec1DescEm: ' does', sec1DescRest: ' — the kind of educational transformation it is designed to produce. A course can perform more than one function, but one typically dominates.',
    sec2Label: 'Section 2', sec2Title: 'Course Types',
    sec2Desc: 'Type describes the primary mode of reasoning the course employs. It is not about difficulty — a qualitative course can be far more demanding than a quantitative one, and vice versa.',
    sec3Label: 'Section 3', sec3Title: 'Combined Classification Matrix',
    sec3Desc: 'A course can contain all four functions while still being predominantly quantitative or qualitative. The matrix below shows the typical emphasis of each function within each type. No cell is empty — every function appears in some degree in every type.',
    matrixHeaderFunction: 'Course Function', matrixHeaderQ: 'Quantitative', matrixHeaderQl: 'Qualitative',
    legendLabel: 'Legend:', exampleLabel: 'Example Course',
    exampleCourseTitle: 'Trade Indicators', exampleCourseTagline: 'Method-Oriented Quantitative Course',
    exampleCourseTags: [{ label: 'Technical', color: '#1A3550' }, { label: 'Quantitative', color: '#0B1F33' }, { label: 'Practical (secondary)', color: '#6A747D' }],
    exampleCourseDesc: 'Trade Indicators is classified as', exampleCourseDescTechnical: ' Technical', exampleCourseDescMid: ' in function and', exampleCourseDescQuantitative: ' Quantitative',
    exampleCourseDescRest: ' in type. Students collect real export and import data, apply standardized statistical methods, and interpret outputs in an economic context. The course has a secondary Practical dimension — students must produce analysis that could be used by actual trade practitioners — but its dominant character is methodological precision. Assessment is primarily closed-book examination with data problems.',
    navTitle: 'Continue through the teaching system', navSub: 'See how courses are sequenced across four years of undergraduate study.',
    navProgression: 'Four-Year Progression', navHub: 'Teaching Hub',
    purposeLabel: 'Purpose', principalQLabel: 'Principal Questions', typicalActLabel: 'Typical Activities',
    expectedPerfLabel: 'Expected Student Performance', typicalAssessLabel: 'Typical Assessment', examplesLabel: 'Examples',
    emphasisLabels: ['Minimal', 'Moderate', 'Significant', 'Primary'] as const,
  },
  tr: {
    breadcrumb: ['Ana Sayfa', 'Öğretim', 'Ders Sınıflandırması'] as const,
    sectionLabel: 'Ders Sınıflandırması',
    heroTitle: 'Dersler Nasıl Sınıflandırılır',
    heroP1a: 'Bu öğretim portföyündeki her ders iki boyut üzerinden sınıflandırılmaktadır:',
    heroP1function: ' işlev', heroP1b: ' — dersin hangi eğitsel dönüşümü gerçekleştirmek üzere tasarlandığı — ve', heroP1type: ' tür',
    heroP1c: ' — dersin öncelikli olarak nicel mi yoksa nitel akıl yürütmeyle mi ilerlediği.',
    heroP2: 'Bu iki boyut birbirinden bağımsızdır. Kuramsal bir ders nicel ya da nitel olabilir. Uygulamalı bir ders de her ikisi olabilir. Sınıflandırmayı anlamak, öğrencilerin yalnızca bir dersin ne kapsadığını değil, nasıl düşünmeyi gerektireceğini de bilmesine yardımcı olur.',
    sec1Label: 'Bölüm 1', sec1Title: 'Ders İşlevleri',
    sec1Desc: 'İşlev, bir dersin', sec1DescEm: ' ne yaptığını', sec1DescRest: ' — tasarlandığı eğitsel dönüşümün türünü — tanımlar. Bir ders birden fazla işlev yerine getirebilir, ancak genellikle biri ön plana çıkar.',
    sec2Label: 'Bölüm 2', sec2Title: 'Ders Türleri',
    sec2Desc: 'Tür, dersin benimsediği birincil akıl yürütme biçimini tanımlar. Zorlukla ilgili değildir — nitel bir ders nicel bir dersten çok daha zorlu olabilir ve tersi de geçerlidir.',
    sec3Label: 'Bölüm 3', sec3Title: 'Bileşik Sınıflandırma Matrisi',
    sec3Desc: 'Bir ders tüm dört işlevi barındırırken ağırlıklı olarak nicel ya da nitel olabilir. Aşağıdaki matris, her işlevin her türdeki tipik vurgusunu göstermektedir. Hiçbir hücre boş değildir — her işlev her türde bir ölçüde yer alır.',
    matrixHeaderFunction: 'Ders İşlevi', matrixHeaderQ: 'Nicel', matrixHeaderQl: 'Nitel',
    legendLabel: 'Gösterge:', exampleLabel: 'Örnek Ders',
    exampleCourseTitle: 'Ticaret Göstergeleri', exampleCourseTagline: 'Yöntem Odaklı Nicel Ders',
    exampleCourseTags: [{ label: 'Teknik', color: '#1A3550' }, { label: 'Nicel', color: '#0B1F33' }, { label: 'Uygulamalı (ikincil)', color: '#6A747D' }],
    exampleCourseDesc: 'Ticaret Göstergeleri işlev olarak', exampleCourseDescTechnical: ' Teknik', exampleCourseDescMid: ', tür olarak ise', exampleCourseDescQuantitative: ' Nicel',
    exampleCourseDescRest: ' olarak sınıflandırılmaktadır. Öğrenciler gerçek ihracat ve ithalat verilerini toplar, standartlaştırılmış istatistiksel yöntemler uygular ve çıktıları ekonomik bir bağlamda yorumlar. Dersin ikincil bir Uygulamalı boyutu da vardır — öğrencilerin gerçek ticaret uygulayıcılarının kullanabileceği analizler üretmesi gerekmektedir — ancak dersin baskın karakteri metodolojik kesinliktir. Değerlendirme öncelikli olarak veri problemleri içeren kapalı kitap sınavından oluşmaktadır.',
    navTitle: 'Öğretim sisteminde ilerlemeye devam edin', navSub: 'Derslerin lisans eğitiminin dört yılına nasıl dağıtıldığını görün.',
    navProgression: 'Dört Yıllık İlerleme', navHub: 'Öğretim Merkezi',
    purposeLabel: 'Amaç', principalQLabel: 'Temel Sorular', typicalActLabel: 'Tipik Etkinlikler',
    expectedPerfLabel: 'Beklenen Öğrenci Performansı', typicalAssessLabel: 'Tipik Değerlendirme', examplesLabel: 'Örnekler',
    emphasisLabels: ['Minimum', 'Orta', 'Belirgin', 'Birincil'] as const,
  },
  fr: {
    breadcrumb: ['Accueil', 'Enseignement', 'Classification des cours'] as const,
    sectionLabel: 'Classification des cours',
    heroTitle: 'Comment les cours sont classés',
    heroP1a: 'Chaque cours de ce portefeuille d’enseignement est classé selon deux dimensions : sa',
    heroP1function: ' fonction',
    heroP1b: ' — le travail éducatif que le cours accomplit — et son',
    heroP1type: ' type',
    heroP1c: ' — s’il procède principalement par un raisonnement quantitatif ou qualitatif.',
    heroP2: 'Ces deux dimensions sont indépendantes. Un cours théorique peut être quantitatif ou qualitatif. Un cours pratique peut être l’un ou l’autre. Comprendre la classification aide les étudiants à savoir non seulement ce qu’un cours couvre, mais comment il leur demandera de penser.',
    sec1Label: 'Section 1', sec1Title: 'Fonctions des cours',
    sec1Desc: 'La fonction décrit ce qu’un cours', sec1DescEm: ' fait', sec1DescRest: ' — le type de transformation éducative qu’il est conçu pour produire. Un cours peut accomplir plus d’une fonction, mais l’une domine généralement.',
    sec2Label: 'Section 2', sec2Title: 'Types de cours',
    sec2Desc: 'Le type décrit le mode de raisonnement principal du cours. Il ne s’agit pas de difficulté — un cours qualitatif peut être bien plus exigeant qu’un cours quantitatif, et inversement.',
    sec3Label: 'Section 3', sec3Title: 'Matrice de classification combinée',
    sec3Desc: 'Un cours peut contenir les quatre fonctions tout en restant principalement quantitatif ou qualitatif. La matrice ci-dessous montre l’accent typique de chaque fonction dans chaque type. Aucune cellule n’est vide — chaque fonction apparaît à un degré dans chaque type.',
    matrixHeaderFunction: 'Fonction du cours', matrixHeaderQ: 'Quantitatif', matrixHeaderQl: 'Qualitatif',
    legendLabel: 'Légende :', exampleLabel: 'Cours d’exemple',
    exampleCourseTitle: 'Indicateurs du commerce', exampleCourseTagline: 'Cours quantitatif orienté méthode',
    exampleCourseTags: [{ label: 'Technique', color: '#1A3550' }, { label: 'Quantitatif', color: '#0B1F33' }, { label: 'Pratique (secondaire)', color: '#6A747D' }],
    exampleCourseDesc: 'Indicateurs du commerce est classé comme', exampleCourseDescTechnical: ' Technique', exampleCourseDescMid: ' en fonction et', exampleCourseDescQuantitative: ' Quantitatif',
    exampleCourseDescRest: ' en type. Les étudiants collectent de vraies données d’export et d’import, appliquent des méthodes statistiques standardisées et interprètent les sorties dans un contexte économique. Le cours a une dimension pratique secondaire — les étudiants doivent produire une analyse utilisable par de vrais praticiens du commerce — mais son caractère dominant est la précision méthodologique. L’évaluation est principalement un examen à livre fermé avec des problèmes de données.',
    navTitle: 'Poursuivre dans le système d’enseignement', navSub: 'Voir comment les cours sont séquencés sur quatre années de premier cycle.',
    navProgression: 'Progression sur quatre ans', navHub: 'Pôle enseignement',
    purposeLabel: 'Objectif', principalQLabel: 'Questions principales', typicalActLabel: 'Activités typiques',
    expectedPerfLabel: 'Performance attendue de l’étudiant', typicalAssessLabel: 'Évaluation typique', examplesLabel: 'Exemples',
    emphasisLabels: ['Minimal', 'Modéré', 'Significatif', 'Principal'] as const,
  },
}

const FUNCTIONS_DATA = {
  en: [
    { id: 'theoretical', label: 'Theoretical', code: 'T', color: '#0B1F33', borderColor: '#0B1F33', purpose: 'The theoretical function presents the academic background of a course. It introduces students to the foundational concepts, theories, models, and thinkers that shaped the field. Theory is important because students cannot meaningfully apply concepts that they do not first understand. Theory provides the intellectual structure through which business problems can be interpreted.', questions: ['What pioneering research led to the development of this field?', 'Who are the relevant key figures?', 'What impact did these ideas have at a national or global scale?', 'Which theories and approaches were derived from them?'], activities: ['Conceptual reading and close analysis', 'Structured discussion of competing frameworks', 'Written synthesis and theoretical critique'], performance: 'Accurate reproduction of core ideas combined with the capacity to apply them to novel cases and identify their limits.', example: 'Managerial Economics: Theory of the Firm — students analyze the assumptions underlying production functions before applying them.' },
    { id: 'practical', label: 'Practical', code: 'P', color: '#3D5A4A', borderColor: '#3D5A4A', purpose: 'The practical function analyzes the real-life application of theories, methods, and models. Students examine how ideas are implemented in actual business contexts. This function helps students understand that business knowledge is not purely abstract — the value of an idea depends partly on how it performs in practice.', questions: ['How did a specific company implement this theory or method?', 'What were the apparent benefits and drawbacks of this case?', 'What is considered a strong implementation in the industry?', 'What happens when theory meets real organizational constraints?'], activities: ['Case analysis with real organizational data', 'Role-based simulations', 'Applied project work with defined deliverables'], performance: 'Competent execution of the relevant method under realistic constraints, with transparent documentation of decisions.', example: 'Business Communication: students draft, present and receive structured critique on actual professional documents.' },
    { id: 'business-dev', label: 'Business Development', code: 'BD', color: '#6E2C2C', borderColor: '#6E2C2C', purpose: 'The business development function teaches students how to use theories, practices, and techniques to create business value. Students focus on start-ups, business models, feasibility, market opportunities, incentives, legal structures, public support mechanisms, and government-related opportunities.', questions: ['Is this a real opportunity or a compelling story?', 'What is required to make this viable?', 'What would failure look like, and how early could it be detected?', 'What legal structures, incentives, or public mechanisms are relevant?'], activities: ['Feasibility analysis across market, technical, financial and organizational dimensions', 'Structured project critique and revision cycles', 'Competitive landscape mapping'], performance: 'A rigorous, defensible analysis that arrives at a clear recommendation — pursued, revised or abandoned — with full reasoning.', example: 'Feasibility Analysis and Business Planning: the complete project cycle from concept through defended final report.' },
    { id: 'technical', label: 'Technical', code: 'TC', color: '#1A3550', borderColor: '#1A3550', purpose: 'The technical function focuses on the tools, systems, and applied know-how required in modern professional life. Business education is increasingly connected to neighboring fields such as information technologies, communication systems, management information systems, software development, analytics, and decision-support systems.', questions: ['How do I calculate this correctly?', 'What does this output actually mean?', 'Where does this method introduce error or distortion?'], activities: ['Data collection and cleaning', 'Statistical analysis and interpretation', 'System operation and output evaluation'], performance: 'Accurate execution with transparent methodology, honest reporting of limitations and correct interpretation of results.', example: 'Trade Indicators: students collect, process and interpret real export/import data using standardized statistical methods.' },
  ],
  tr: [
    { id: 'theoretical', label: 'Kuramsal', code: 'T', color: '#0B1F33', borderColor: '#0B1F33', purpose: 'Kuramsal işlev, bir dersin akademik arka planını sunar. Öğrencileri alanı şekillendiren temel kavramlar, kuramlar, modeller ve düşünürlerle tanıştırır.', questions: ['Bu alanın gelişimine öncülük eden araştırmalar hangileridir?', 'İlgili kilit isimler kimlerdir?', 'Bu fikirler ulusal ya da küresel ölçekte nasıl bir etki bıraktı?', 'Bunlardan hangi kuram ve yaklaşımlar türetilmiştir?'], activities: ['Kavramsal okuma ve yakın analiz', 'Rakip çerçevelerin yapılandırılmış tartışması', 'Yazılı sentez ve kuramsal eleştiri'], performance: 'Temel fikirlerin doğru biçimde yeniden üretilmesi ile bunları yeni durumlara uygulama ve sınırlarını belirleme kapasitesinin bir arada bulunması.', example: 'Yönetim Ekonomisi: Firma Teorisi — öğrenciler üretim fonksiyonlarının altında yatan varsayımları uygulamadan önce analiz eder.' },
    { id: 'practical', label: 'Uygulamalı', code: 'P', color: '#3D5A4A', borderColor: '#3D5A4A', purpose: 'Uygulamalı işlev, kuram, yöntem ve modellerin gerçek hayattaki uygulamasını inceler. Öğrenciler fikirlerin gerçek iş bağlamlarında nasıl hayata geçirildiğini araştırır.', questions: ['Belirli bir şirket bu kuram ya da yöntemi nasıl uyguladı?', 'Bu vakanın görünür avantajları ve dezavantajları nelerdi?', 'Sektörde güçlü bir uygulama olarak ne kabul edilir?', 'Kuram gerçek örgütsel kısıtlarla karşılaştığında ne olur?'], activities: ['Gerçek örgütsel verilerle vaka analizi', 'Role dayalı simülasyonlar', 'Tanımlanmış çıktılarla uygulamalı proje çalışması'], performance: 'Gerçekçi kısıtlar altında ilgili yöntemin yetkin biçimde uygulanması ve kararların şeffaf belgelenmesi.', example: 'İş İletişimi: öğrenciler gerçek mesleki belgeler taslak hazırlar, sunar ve yapılandırılmış eleştiri alır.' },
    { id: 'business-dev', label: 'İş Geliştirme', code: 'BD', color: '#6E2C2C', borderColor: '#6E2C2C', purpose: "İş geliştirme işlevi, öğrencilere kuram, uygulama ve teknikleri kullanarak iş değeri yaratmayı öğretir. Öğrenciler start-up'lara, iş modellerine, fizibiliteye, piyasa fırsatlarına odaklanır.", questions: ['Bu gerçek bir fırsat mı yoksa zorlayıcı bir hikaye mi?', 'Bunu uygulanabilir kılmak için ne gerekiyor?', 'Başarısızlık nasıl görünür ve ne kadar erken tespit edilebilir?', 'Hangi hukuki yapılar, teşvikler ya da kamu mekanizmaları ilgilidir?'], activities: ['Piyasa, teknik, finansal ve örgütsel boyutlarda fizibilite analizi', 'Yapılandırılmış proje eleştirisi ve revizyon döngüleri', 'Rekabet ortamı haritalama'], performance: 'Tam gerekçesiyle birlikte net bir öneri — sürdürülecek, revize edilecek ya da terk edilecek — sunan titiz ve savunulabilir bir analiz.', example: 'Fizibilite Analizi ve İş Planlaması: kavramdan savunulmuş nihai rapora uzanan tam proje döngüsü.' },
    { id: 'technical', label: 'Teknik', code: 'TC', color: '#1A3550', borderColor: '#1A3550', purpose: 'Teknik işlev, modern mesleki yaşamda gerekli araçlara, sistemlere ve uygulamalı bilgi birikimine odaklanır.', questions: ['Bunu nasıl doğru hesaplarım?', 'Bu çıktı gerçekte ne anlama geliyor?', 'Bu yöntem nerede hata ya da bozulma yaratır?'], activities: ['Veri toplama ve temizleme', 'İstatistiksel analiz ve yorumlama', 'Sistem kullanımı ve çıktı değerlendirmesi'], performance: 'Şeffaf metodoloji, sınırlılıkların dürüst raporlanması ve sonuçların doğru yorumlanmasıyla birlikte hassas uygulama.', example: 'Ticaret Göstergeleri: öğrenciler standartlaştırılmış istatistiksel yöntemler kullanarak gerçek ihracat/ithalat verilerini toplar, işler ve yorumlar.' },
  ],
  fr: [
    { id: 'theoretical', label: 'Théorique', code: 'T', color: '#0B1F33', borderColor: '#0B1F33', purpose: 'La fonction théorique présente l’arrière-plan académique d’un cours. Elle introduit les étudiants aux concepts, théories, modèles et penseurs fondateurs qui ont façonné le champ. La théorie importe parce que les étudiants ne peuvent pas appliquer de façon significative des concepts qu’ils ne comprennent pas d’abord. La théorie fournit la structure intellectuelle à travers laquelle les problèmes d’entreprise peuvent être interprétés.', questions: ['Quelles recherches pionnières ont conduit au développement de ce champ ?', 'Qui sont les figures clés pertinentes ?', 'Quel impact ces idées ont-elles eu à l’échelle nationale ou mondiale ?', 'Quelles théories et approches en ont été dérivées ?'], activities: ['Lecture conceptuelle et analyse serrée', 'Discussion structurée de cadres concurrents', 'Synthèse écrite et critique théorique'], performance: 'Reproduction exacte des idées de base combinée à la capacité de les appliquer à des cas nouveaux et d’en identifier les limites.', example: 'Économie managériale : théorie de la firme — les étudiants analysent les hypothèses sous-jacentes aux fonctions de production avant de les appliquer.' },
    { id: 'practical', label: 'Pratique', code: 'P', color: '#3D5A4A', borderColor: '#3D5A4A', purpose: 'La fonction pratique analyse l’application réelle des théories, méthodes et modèles. Les étudiants examinent comment les idées sont mises en œuvre dans de vrais contextes d’entreprise. Cette fonction aide à comprendre que le savoir de gestion n’est pas purement abstrait — la valeur d’une idée dépend en partie de la façon dont elle fonctionne en pratique.', questions: ['Comment une entreprise précise a-t-elle mis en œuvre cette théorie ou méthode ?', 'Quels étaient les avantages et inconvénients apparents de ce cas ?', 'Qu’est-ce qui est considéré comme une mise en œuvre solide dans le secteur ?', 'Que se passe-t-il lorsque la théorie rencontre de vraies contraintes organisationnelles ?'], activities: ['Analyse de cas avec de vraies données organisationnelles', 'Simulations par rôles', 'Travail de projet appliqué avec des livrables définis'], performance: 'Exécution compétente de la méthode pertinente sous des contraintes réalistes, avec une documentation transparente des décisions.', example: 'Communication d’entreprise : les étudiants rédigent, présentent et reçoivent une critique structurée de documents professionnels réels.' },
    { id: 'business-dev', label: 'Développement d’entreprise', code: 'BD', color: '#6E2C2C', borderColor: '#6E2C2C', purpose: 'La fonction de développement d’entreprise enseigne aux étudiants à utiliser théories, pratiques et techniques pour créer de la valeur. Les étudiants se concentrent sur les start-up, les modèles d’affaires, la faisabilité, les opportunités de marché, les incitations, les structures juridiques, les mécanismes de soutien public et les opportunités liées à l’État.', questions: ['S’agit-il d’une vraie opportunité ou d’une histoire séduisante ?', 'Que faut-il pour la rendre viable ?', 'À quoi ressemblerait l’échec, et à quel moment pourrait-il être détecté ?', 'Quelles structures juridiques, incitations ou mécanismes publics sont pertinents ?'], activities: ['Analyse de faisabilité sur les dimensions de marché, technique, financière et organisationnelle', 'Cycles de critique et de révision de projet structurés', 'Cartographie du paysage concurrentiel'], performance: 'Une analyse rigoureuse et défendable qui aboutit à une recommandation claire — poursuivie, révisée ou abandonnée — avec un raisonnement complet.', example: 'Analyse de faisabilité et planification d’entreprise : le cycle de projet complet du concept au rapport final défendu.' },
    { id: 'technical', label: 'Technique', code: 'TC', color: '#1A3550', borderColor: '#1A3550', purpose: 'La fonction technique se concentre sur les outils, systèmes et savoir-faire appliqués requis dans la vie professionnelle moderne. La formation en gestion est de plus en plus liée à des champs voisins tels que les technologies de l’information, les systèmes de communication, les systèmes d’information de gestion, le développement logiciel, l’analytique et les systèmes d’aide à la décision.', questions: ['Comment calculer cela correctement ?', 'Que signifie réellement cette sortie ?', 'Où cette méthode introduit-elle de l’erreur ou de la distorsion ?'], activities: ['Collecte et nettoyage des données', 'Analyse statistique et interprétation', 'Exploitation d’un système et évaluation des sorties'], performance: 'Exécution exacte avec une méthodologie transparente, un reporting honnête des limites et une interprétation correcte des résultats.', example: 'Indicateurs du commerce : les étudiants collectent, traitent et interprètent de vraies données d’export/import à l’aide de méthodes statistiques standardisées.' },
  ],
}

const COURSE_TYPES_DATA = {
  en: [
    { type: 'Quantitative', code: 'Q', color: '#0B1F33', tagline: 'Precision, calculation, measurement', desc: 'Quantitative courses are method-oriented courses. While some theoretical background is always necessary, these courses focus primarily on application, calculation, measurement, and analysis. For example, in a course such as Trade Indicators, the main focus is not on who first developed each indicator, but on how to calculate, analyze, and interpret them.', dimensions: ['Application of statistical and mathematical methods', 'Measurement and data interpretation', 'Analytical reasoning from numerical evidence', 'Methodological accuracy and replicability', 'Transparent reporting of uncertainty'], assessment: 'Problems, data analysis tasks, closed-book examinations with calculations, and structured reports requiring methodology sections.', example: 'Trade Indicators, Financial Analysis for Decision Making, Managerial Economics' },
    { type: 'Qualitative', code: "Q'", color: '#6E2C2C', tagline: 'Interpretation, synthesis, argumentation', desc: 'Qualitative courses focus on the bigger picture. Their aim is to familiarize students with a field by explaining its conception, evolution, current state, and major debates. In other words, these courses follow a narrative. They focus more heavily on theory, interpretation, cases, and business development, with less emphasis on technical calculation.', dimensions: ['Theoretical literacy and conceptual connection', 'Case analysis and contextual interpretation', 'Literature engagement and synthesis', 'Narrative construction and argumentation', 'Identification of implications and limits'], assessment: 'Essays, case reports, presentations, open-book examinations and research papers requiring interpretation and argument.', example: 'Strategic Management, Business Communication, Organizational Behavior' },
  ],
  tr: [
    { type: 'Nicel', code: 'Q', color: '#0B1F33', tagline: 'Kesinlik, hesaplama, ölçüm', desc: 'Nicel dersler yöntem odaklı derslerdir. Belirli bir kuramsal arka plan her zaman gerekli olsa da bu dersler öncelikli olarak uygulama, hesaplama, ölçüm ve analize odaklanır.', dimensions: ['İstatistiksel ve matematiksel yöntemlerin uygulanması', 'Ölçüm ve veri yorumlama', 'Sayısal kanıtlardan analitik akıl yürütme', 'Metodolojik doğruluk ve tekrarlanabilirlik', 'Belirsizliğin şeffaf raporlanması'], assessment: 'Problem kümeleri, veri analizi görevleri, hesaplama içeren kapalı kitap sınavları ve metodoloji bölümü gerektiren yapılandırılmış raporlar.', example: 'Ticaret Göstergeleri, Karar Alma İçin Finansal Analiz, Yönetim Ekonomisi' },
    { type: 'Nitel', code: "Q'", color: '#6E2C2C', tagline: 'Yorum, sentez, argümantasyon', desc: 'Nitel dersler büyük resme odaklanır. Amacı, öğrencileri bir alanla; onun doğuşunu, evrimini, mevcut durumunu ve temel tartışmalarını açıklayarak tanıştırmaktır.', dimensions: ['Kuramsal okuryazarlık ve kavramsal bağlantı', 'Vaka analizi ve bağlamsal yorum', 'Literatür etkileşimi ve sentez', 'Anlatı inşası ve argümantasyon', 'Çıkarımların ve sınırların belirlenmesi'], assessment: 'Yorum ve argüman gerektiren denemeler, vaka raporları, sunumlar, açık kitap sınavları ve araştırma makaleleri.', example: 'Stratejik Yönetim, İş İletişimi, Örgütsel Davranış' },
  ],
  fr: [
    { type: 'Quantitatif', code: 'Q', color: '#0B1F33', tagline: 'Précision, calcul, mesure', desc: 'Les cours quantitatifs sont orientés méthode. Bien qu’un arrière-plan théorique soit toujours nécessaire, ces cours se concentrent principalement sur l’application, le calcul, la mesure et l’analyse. Par exemple, dans un cours tel qu’Indicateurs du commerce, l’accent n’est pas mis sur qui a d’abord développé chaque indicateur, mais sur la façon de les calculer, les analyser et les interpréter.', dimensions: ['Application de méthodes statistiques et mathématiques', 'Mesure et interprétation des données', 'Raisonnement analytique à partir de preuves numériques', 'Exactitude méthodologique et réplicabilité', 'Reporting transparent de l’incertitude'], assessment: 'Problèmes, tâches d’analyse de données, examens à livre fermé avec calculs, et rapports structurés exigeant des sections méthodologiques.', example: 'Indicateurs du commerce, Analyse financière pour la décision, Économie managériale' },
    { type: 'Qualitatif', code: "Q'", color: '#6E2C2C', tagline: 'Interprétation, synthèse, argumentation', desc: 'Les cours qualitatifs se concentrent sur la vue d’ensemble. Leur but est de familiariser les étudiants avec un champ en expliquant sa conception, son évolution, son état actuel et ses grands débats. Autrement dit, ces cours suivent un récit. Ils insistent davantage sur la théorie, l’interprétation, les cas et le développement d’entreprise, avec moins d’accent sur le calcul technique.', dimensions: ['Littératie théorique et connexion conceptuelle', 'Analyse de cas et interprétation contextuelle', 'Engagement avec la littérature et synthèse', 'Construction narrative et argumentation', 'Identification des implications et des limites'], assessment: 'Essais, rapports de cas, présentations, examens à livre ouvert et articles de recherche exigeant interprétation et argument.', example: 'Management stratégique, Communication d’entreprise, Comportement organisationnel' },
  ],
}

const MATRIX_ROWS_DATA = {
  en: [{ function: 'Theoretical', q: 2, ql: 3 }, { function: 'Practical', q: 3, ql: 2 }, { function: 'Business Development', q: 2, ql: 3 }, { function: 'Technical', q: 3, ql: 1 }],
  tr: [{ function: 'Kuramsal', q: 2, ql: 3 }, { function: 'Uygulamalı', q: 3, ql: 2 }, { function: 'İş Geliştirme', q: 2, ql: 3 }, { function: 'Teknik', q: 3, ql: 1 }],
  fr: [{ function: 'Théorique', q: 2, ql: 3 }, { function: 'Pratique', q: 3, ql: 2 }, { function: 'Développement d’entreprise', q: 2, ql: 3 }, { function: 'Technique', q: 3, ql: 1 }],
}

const emphasisColors = ['#E7E0D3', '#C9BFB0', '#B08D45', '#0B1F33']

export default function ClassificationClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const functions = FUNCTIONS_DATA[lang]
  const courseTypes = COURSE_TYPES_DATA[lang]
  const matrixRows = MATRIX_ROWS_DATA[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumb[0], href: '/' }, { label: L.breadcrumb[1], href: '/teaching' }, { label: L.breadcrumb[2] }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 64px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <SectionLabel text={L.sectionLabel} />
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 24px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{L.heroTitle}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#6A747D', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 680 }}>
            {L.heroP1a}<strong style={{ fontWeight: 600, color: '#1E2328' }}>{L.heroP1function}</strong>{L.heroP1b}<strong style={{ fontWeight: 600, color: '#1E2328' }}>{L.heroP1type}</strong>{L.heroP1c}
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.8, margin: 0, maxWidth: 680 }}>{L.heroP2}</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', padding: '72px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel text={L.sec1Label} />
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px' }}>{L.sec1Title}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>{L.sec1Desc}<em>{L.sec1DescEm}</em>{L.sec1DescRest}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #E7E0D3' }}>
            {functions.map((fn, i) => (
              <div key={fn.id} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 0, borderBottom: i === functions.length - 1 ? 'none' : '1px solid #E7E0D3', backgroundColor: '#FFFFFF' }} className="fn-row">
                <div style={{ padding: '28px 24px', borderRight: '1px solid #E7E0D3', borderLeft: `3px solid ${fn.borderColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: fn.color, border: `1px solid ${fn.color}`, padding: '2px 8px', letterSpacing: '0.05em' }}>{fn.code}</span>
                  </div>
                  <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', lineHeight: 1.2 }}>{fn.label}</div>
                </div>
                <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px' }} className="fn-content">
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{L.purposeLabel}</div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', lineHeight: 1.65, margin: 0 }}>{fn.purpose}</p>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{L.principalQLabel}</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {fn.questions.map(q => (
                        <li key={q} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 11, color: '#B08D45', marginTop: 2, flexShrink: 0 }}>—</span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.55, fontStyle: 'italic' }}>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{L.typicalActLabel}</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {fn.activities.map(a => (
                        <li key={a} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: fn.color, flexShrink: 0, marginTop: 8 }} />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.55 }}>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{L.expectedPerfLabel}</div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', lineHeight: 1.65, margin: '0 0 12px' }}>{fn.performance}</p>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontStyle: 'italic', color: '#B08D45' }}>{fn.example}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', padding: '72px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel text={L.sec2Label} />
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px' }}>{L.sec2Title}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>{L.sec2Desc}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3', marginBottom: 40 }} className="types-grid">
            {courseTypes.map(ct => (
              <div key={ct.type} style={{ backgroundColor: '#FFFFFF', padding: '36px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 40, height: 40, border: `1.5px solid ${ct.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 13, fontWeight: 700, color: ct.color }}>{ct.code}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 20, fontWeight: 700, color: '#0B1F33' }}>{ct.type}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B08D45', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{ct.tagline}</div>
                  </div>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: '0 0 20px' }}>{ct.desc}</p>
                <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {ct.dimensions.map(d => (
                    <li key={d} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: ct.color, flexShrink: 0, marginTop: 8 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', lineHeight: 1.55 }}>{d}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid #E7E0D3', paddingTop: 14 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>{L.typicalAssessLabel}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.55 }}>{ct.assessment}</div>
                </div>
                <div style={{ borderTop: '1px solid #E7E0D3', paddingTop: 12, marginTop: 12 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{L.examplesLabel}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontStyle: 'italic', color: '#6A747D' }}>{ct.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', padding: '72px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel text={L.sec3Label} />
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 12px' }}>{L.sec3Title}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>{L.sec3Desc}</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 520, border: '1px solid #E7E0D3' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', backgroundColor: '#0B1F33' }}>
                <div style={{ padding: '14px 20px', borderRight: '1px solid #1A3550' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{L.matrixHeaderFunction}</span></div>
                <div style={{ padding: '14px 20px', textAlign: 'center', borderRight: '1px solid #1A3550' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.matrixHeaderQ}</span></div>
                <div style={{ padding: '14px 20px', textAlign: 'center' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{L.matrixHeaderQl}</span></div>
              </div>
              {matrixRows.map((row) => (
                <div key={row.function} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', borderTop: '1px solid #E7E0D3', backgroundColor: '#FFFFFF' }}>
                  <div style={{ padding: '18px 20px', borderRight: '1px solid #E7E0D3', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 14, fontWeight: 700, color: '#0B1F33' }}>{row.function}</span>
                  </div>
                  {[row.q, row.ql].map((level, ci) => (
                    <div key={ci} style={{ padding: '18px 20px', borderLeft: ci === 1 ? '1px solid #E7E0D3' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28 }}>
                        {[0, 1, 2, 3].map(i => <div key={i} style={{ width: 10, height: `${(i + 1) * 7}px`, backgroundColor: i < level ? emphasisColors[level] : '#E7E0D3' }} />)}
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#6A747D' }}>{L.emphasisLabels[level]}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ borderTop: '1px solid #E7E0D3', padding: '14px 20px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{L.legendLabel}</span>
                {L.emphasisLabels.map((lbl, i) => (
                  <span key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 16, height: 16, backgroundColor: emphasisColors[i], display: 'inline-block', border: '1px solid #E7E0D3' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D' }}>{lbl}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 40, backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', borderLeft: '3px solid #0B1F33', padding: '28px 32px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{L.exampleLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px 32px', alignItems: 'start' }} className="example-grid">
              <div>
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>{L.exampleCourseTitle}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B08D45', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{L.exampleCourseTagline}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {L.exampleCourseTags.map(tag => <span key={tag.label} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: tag.color, border: `1px solid ${tag.color}`, padding: '4px 10px', letterSpacing: '0.04em' }}>{tag.label}</span>)}
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.75, margin: 0, gridColumn: '1 / -1' }}>
                {L.exampleCourseDesc}<strong style={{ fontWeight: 600, color: '#1E2328' }}>{L.exampleCourseDescTechnical}</strong>{L.exampleCourseDescMid}<strong style={{ fontWeight: 600, color: '#1E2328' }}>{L.exampleCourseDescQuantitative}</strong>{L.exampleCourseDescRest}
              </p>
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
            <Link href="/teaching/progression" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{L.navProgression}</Link>
            <Link href="/teaching" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#0B1F33', border: '1px solid #0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{L.navHub}</Link>
          </div>
        </div>
      </section>

      <style>{`
        .types-grid { grid-template-columns: 1fr 1fr !important; }
        .example-grid { grid-template-columns: auto 1fr !important; }
        .fn-row { grid-template-columns: 220px 1fr !important; }
        .fn-content { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 700px) {
          .types-grid { grid-template-columns: 1fr !important; }
          .example-grid { grid-template-columns: 1fr !important; }
          .fn-row { grid-template-columns: 1fr !important; }
          .fn-content { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
