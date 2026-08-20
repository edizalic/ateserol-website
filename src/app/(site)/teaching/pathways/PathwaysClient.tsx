'use client'

import Link from 'next/link'
import { Breadcrumb, SectionLabel } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const T = {
  en: {
    breadcrumb: ['Home', 'Teaching', 'Student Pathways'] as const,
    sectionLabel: 'Student Pathways',
    heroTitle: 'Student Pathways After Business Education',
    heroP1: "Graduates of the School of Business have five major career paths available to them. These paths are not a hierarchy — they are five genuinely distinct orientations, each requiring a different combination of strengths, tolerances and priorities.",
    heroP2: "Understanding which path aligns with your abilities and values is one of the most useful things a business education can help you figure out — ideally before you graduate, not after.",
    closingLabel: 'Closing Comparison',
    closingTitle: 'Two Paths of Productive Uncertainty',
    closingQuote: '"Both the entrepreneur and the academic work in domains without established answers. The difference is the entrepreneur builds under that uncertainty; the academic investigates it."',
    navTitle: 'Continue exploring the teaching system',
    navSub: 'Read the Purpose of Business Education or explore how courses are classified.',
    navPurpose: 'Purpose of Education',
    navClass: 'Course Classification',
    coreStrengths: 'Core Strengths Required',
    diagramFoundation: 'Business Education',
    diagramShared: 'Shared Knowledge Foundation',
  },
  tr: {
    breadcrumb: ['Ana Sayfa', 'Öğretim', 'Kariyer Yolları'] as const,
    sectionLabel: 'Kariyer Yolları',
    heroTitle: 'İşletme Eğitimi Sonrası Kariyer Yolları',
    heroP1: "İşletme Okulu mezunlarına beş temel kariyer yolu açıktır. Bu yollar bir hiyerarşi değildir — her biri farklı güçlerin, toleransların ve önceliklerin farklı bir bileşimini gerektiren beş yönelimdir.",
    heroP2: "Hangi yolun yetenekleriniz ve değerlerinizle örtüştüğünü anlamak, işletme eğitiminin size yardımcı olabileceği en değerli şeylerden biridir.",
    closingLabel: 'Kapanış Karşılaştırması',
    closingTitle: 'Üretken Belirsizliğin İki Yolu',
    closingQuote: '"Hem girişimci hem de akademisyen, yerleşik yanıtların bulunmadığı alanlarda çalışır. Fark şudur: girişimci o belirsizlik altında inşa eder; akademisyen onu araştırır."',
    navTitle: 'Öğretim sistemini keşfetmeye devam edin',
    navSub: "İşletme Eğitiminin Amacı'nı okuyun ya da derslerin nasıl sınıflandırıldığını inceleyin.",
    navPurpose: 'Eğitimin Amacı',
    navClass: 'Ders Sınıflandırması',
    coreStrengths: 'Gereken Temel Güçlü Yönler',
    diagramFoundation: 'İşletme Eğitimi',
    diagramShared: 'Ortak Bilgi Temeli',
  },
  fr: {
    breadcrumb: ['Accueil', 'Enseignement', 'Parcours étudiants'] as const,
    sectionLabel: 'Parcours étudiants',
    heroTitle: 'Parcours étudiants après une formation en gestion',
    heroP1: "Les diplômés de l’École de gestion ont cinq grands parcours de carrière. Ces chemins ne forment pas une hiérarchie — ce sont cinq orientations réellement distinctes, chacune exigeant une combinaison différente de forces, de tolérances et de priorités.",
    heroP2: "Comprendre quel chemin s’aligne avec vos capacités et vos valeurs est l’une des choses les plus utiles qu’une formation en gestion puisse vous aider à clarifier — idéalement avant le diplôme, non après.",
    closingLabel: 'Comparaison finale',
    closingTitle: 'Deux chemins d’incertitude productive',
    closingQuote: '« L’entrepreneur comme l’universitaire travaillent dans des domaines sans réponses établies. La différence est que l’entrepreneur construit sous cette incertitude ; l’universitaire l’enquête. »',
    navTitle: 'Continuer à explorer le système d’enseignement',
    navSub: 'Lire la Finalité de la formation en gestion ou explorer comment les cours sont classés.',
    navPurpose: 'Finalité de la formation',
    navClass: 'Classification des cours',
    coreStrengths: 'Forces essentielles requises',
    diagramFoundation: 'Formation en gestion',
    diagramShared: 'Fondement de savoir partagé',
  },
}

const PATHWAYS_DATA = {
  en: [
    { id: 'employee', number: '01', title: 'Employee', valueProposition: 'Stability and professional development', tagline: 'Stability and success through efficiency and productivity.', intro: 'The employee path offers stability, professional development, and success through efficiency and productivity. Students must learn how organizations work, how value is created inside structured systems, and how professional competence contributes to institutional performance.', strengths: [{ label: 'Efficiency', desc: 'Producing high-quality output within defined constraints.' }, { label: 'Productivity', desc: 'Maintaining consistent performance across varying conditions.' }, { label: 'Organizational Competence', desc: 'Navigating institutional structures and working effectively within hierarchies.' }, { label: 'Institutional Performance', desc: 'Aligning individual effort with organizational objectives.' }], closingNote: 'The employee who understands business systems — not just their job description — becomes the one who improves them.' },
    { id: 'owner', number: '02', title: 'Business Owner', valueProposition: 'Authority and ownership', tagline: 'Freedom derived from proprietary authority.', intro: 'A business owner is responsible for maintaining, improving, and expanding an existing business. This path requires discipline, operational awareness, financial responsibility, and the ability to make decisions under real market constraints.', strengths: [{ label: 'Operations Management', desc: 'Keeping every function of the organization running reliably.' }, { label: 'Financial Responsibility', desc: 'Owning the numbers — cash flow, margins, obligations.' }, { label: 'Discipline', desc: 'Maintaining standards even under pressure or fatigue.' }, { label: 'Improvement and Expansion', desc: 'Building capacity over time rather than reacting to crises.' }], closingNote: 'Ownership is not freedom from constraints. It is the responsibility to manage them honestly.' },
    { id: 'freelancer', number: '03', title: 'Freelancer', valueProposition: 'Flexibility and independence', tagline: 'Flexibility and independence upon individual terms.', intro: 'Freelancers rely heavily on individual expertise, reputation, adaptability, and client relationships. This path requires self-management, communication, pricing awareness, and personal discipline.', strengths: [{ label: 'Expertise', desc: 'Deep, marketable competence in a specific domain.' }, { label: 'Reputation', desc: 'The track record that replaces institutional brand as the primary trust signal.' }, { label: 'Adaptability', desc: 'Adjusting to client requirements and changing conditions without structural support.' }, { label: 'Client Relations', desc: 'Building long-term professional relationships.' }, { label: 'Pricing and Self-Management', desc: 'Setting rates that reflect value and managing the full business cycle independently.' }], closingNote: 'The freelancer who cannot price their own work properly has not yet become independent.' },
    { id: 'entrepreneur', number: '04', title: 'Entrepreneur', valueProposition: 'Change, experimentation and dynamism', tagline: 'Change and dynamism through ever-changing ventures.', intro: 'Entrepreneurs are distinguished by their search for new ideas, new ventures, new models, and new opportunities. Future entrepreneurs need a broad knowledge base — their changing path requires them to recognize opportunities, calculate risks, and act with courage.', strengths: [{ label: 'Opportunity Recognition', desc: 'Identifying problems worth solving and markets willing to pay.' }, { label: 'Calculated Risk', desc: 'Distinguishing between uncertainty that can be managed and exposure that should be avoided.' }, { label: 'Broad Knowledge', desc: 'Understanding enough about every business function to build a coherent organization.' }, { label: 'Creation of New Models', desc: 'Designing organizational and commercial structures that do not yet have templates.' }], closingNote: 'Entrepreneurship and academia share a fundamental property: both operate in territories where the answers are not yet known.' },
    { id: 'academic', number: '05', title: 'Academic', valueProposition: 'Curiosity, research and understanding', tagline: 'Satisfied curiosity through research and understanding.', intro: 'Future academics must learn not only to ask correct questions, but also to ask questions that have not yet been asked. This path requires curiosity, determination, methodological discipline, and humility.', strengths: [{ label: 'Methodology', desc: 'Knowing how knowledge is produced, validated and revised.' }, { label: 'Questioning', desc: 'Sustaining productive doubt — the capacity to ask why the accepted answer might be wrong.' }, { label: 'Humility', desc: "Acknowledging the limits of current knowledge, including one's own." }, { label: 'Epistemic Discipline', desc: 'Distinguishing between what is known, what is believed and what is merely assumed.' }, { label: 'Intellectual Persistence', desc: 'Continuing to investigate difficult questions without external pressure.' }], closingNote: 'Both the entrepreneur and the academic work in domains without established answers. The difference is the entrepreneur builds under that uncertainty; the academic investigates it.' },
  ],
  tr: [
    { id: 'employee', number: '01', title: 'Çalışan', valueProposition: 'İstikrar ve mesleki gelişim', tagline: 'Verimlilik ve üretkenlik yoluyla istikrar ve başarı.', intro: 'Çalışan yolu istikrar, mesleki gelişim ve verimlilik ile üretkenlik yoluyla başarı sunar. Bu yolu izleyen öğrenciler örgütlerin nasıl işlediğini, yapılandırılmış sistemler içinde değerin nasıl yaratıldığını öğrenmelidir.', strengths: [{ label: 'Verimlilik', desc: 'Belirlenmiş kısıtlar çerçevesinde yüksek kaliteli çıktı üretmek.' }, { label: 'Üretkenlik', desc: 'Değişen koşullar altında tutarlı performansı sürdürmek.' }, { label: 'Örgütsel Yeterlilik', desc: 'Kurumsal yapılarda etkin biçimde ilerlemek ve hiyerarşiler içinde çalışmak.' }, { label: 'Kurumsal Performans', desc: 'Bireysel çabayı örgütsel hedeflerle uyumlu kılmak.' }], closingNote: 'Yalnızca görev tanımını değil, iş sistemlerinin tamamını anlayan çalışan; onları geliştiren kişi haline gelir.' },
    { id: 'owner', number: '02', title: 'İşletme Sahibi', valueProposition: 'Otorite ve mülkiyet', tagline: 'Mülkiyet otoritesinden kaynaklanan özgürlük.', intro: 'Bir işletme sahibi, mevcut bir işletmeyi sürdürmek, geliştirmek ve büyütmekten sorumludur. Bu yol disiplin, operasyonel farkındalık, finansal sorumluluk gerektirir.', strengths: [{ label: 'Operasyon Yönetimi', desc: "Örgütün her işlevini güvenilir biçimde işletmek." }, { label: 'Finansal Sorumluluk', desc: 'Nakit akışı ve marjların sahipliğini üstlenmek.' }, { label: 'Disiplin', desc: 'Baskı altında bile standartları sürdürmek.' }, { label: 'İyileştirme ve Büyüme', desc: 'Krizlere tepki vermek yerine zamanla kapasite inşa etmek.' }], closingNote: 'Sahiplik kısıtlardan özgürlük değildir. Onları dürüstçe yönetme sorumluluğudur.' },
    { id: 'freelancer', number: '03', title: 'Serbest Çalışan', valueProposition: 'Esneklik ve bağımsızlık', tagline: 'Bireysel koşullarda esneklik ve bağımsızlık.', intro: 'Serbest çalışanlar bireysel uzmanlığa, itibare, uyum yeteneğine ve müşteri ilişkilerine büyük ölçüde dayanır. Bu yol öz yönetimi, iletişimi ve fiyatlandırma bilincini gerektirir.', strengths: [{ label: 'Uzmanlık', desc: 'Belirli bir alanda derin, pazarlanabilir yetkinlik.' }, { label: 'İtibar', desc: 'Kurumsal markayı ikame eden geçmiş performans kaydı.' }, { label: 'Uyum Yeteneği', desc: 'Yapısal destek olmaksızın koşullara uyum sağlamak.' }, { label: 'Müşteri İlişkileri', desc: 'Uzun vadeli mesleki ilişkiler kurmak.' }, { label: 'Fiyatlandırma ve Öz Yönetim', desc: 'Değere yansıyan ücretler belirlemek.' }], closingNote: "Kendi işini doğru fiyatlandıramayan serbest çalışan henüz bağımsız olmamıştır." },
    { id: 'entrepreneur', number: '04', title: 'Girişimci', valueProposition: 'Değişim, deney ve dinamizm', tagline: 'Sürekli değişen girişimler yoluyla değişim ve dinamizm.', intro: 'Girişimciler yeni fikirler, yeni girişimler, yeni modeller ve yeni fırsatlar arayışlarıyla öne çıkar. Gelecekteki girişimciler geniş bir bilgi tabanına ihtiyaç duyar.', strengths: [{ label: 'Fırsat Tanıma', desc: 'Çözmeye değer sorunları ve bu çözüm için ödeme yapmaya hazır piyasaları belirlemek.' }, { label: 'Hesaplı Risk', desc: 'Yönetilebilir belirsizlikle kaçınılması gereken maruziyeti ayırt etmek.' }, { label: 'Geniş Bilgi', desc: 'Sıfırdan tutarlı bir örgüt inşa edebilmek için yeterli anlayış.' }, { label: 'Yeni Model Yaratma', desc: 'Henüz yerleşik şablonu bulunmayan yapılar tasarlamak.' }], closingNote: 'Girişimcilik ve akademi temel bir özelliği paylaşır: ikisi de yanıtların henüz bilinmediği alanlarda çalışır.' },
    { id: 'academic', number: '05', title: 'Akademisyen', valueProposition: 'Merak, araştırma ve anlama', tagline: 'Araştırma ve anlama yoluyla merakın tatmini.', intro: 'Gelecekteki akademisyenler yalnızca doğru sorular sormayı değil, henüz sorulmamış soruları sormayı da öğrenmelidir. Bu yol merak, kararlılık ve alçakgönüllülük gerektirir.', strengths: [{ label: 'Metodoloji', desc: 'Belirli bir disiplinde bilginin nasıl üretildiğini bilmek.' }, { label: 'Sorgulama', desc: "Üretken şüpheyi sürdürmek." }, { label: 'Alçakgönüllülük', desc: 'Mevcut bilginin sınırlarını kabul etmek.' }, { label: 'Epistemik Disiplin', desc: 'Bilinenle inanılanı birbirinden ayırt etmek.' }, { label: 'Entelektüel Azim', desc: 'Zorlu soruları uzun süreler boyunca araştırmayı sürdürmek.' }], closingNote: 'Hem girişimci hem de akademisyen, yerleşik yanıtların bulunmadığı alanlarda çalışır.' },
  ],
  fr: [
    { id: 'employee', number: '01', title: 'Salarié', valueProposition: 'Stabilité et développement professionnel', tagline: 'Stabilité et succès par l’efficacité et la productivité.', intro: 'Le parcours salarié offre la stabilité, le développement professionnel et le succès par l’efficacité et la productivité. Les étudiants doivent apprendre comment les organisations fonctionnent, comment la valeur est créée dans des systèmes structurés, et comment la compétence professionnelle contribue à la performance institutionnelle.', strengths: [{ label: 'Efficacité', desc: 'Produire une sortie de haute qualité dans des contraintes définies.' }, { label: 'Productivité', desc: 'Maintenir une performance constante dans des conditions variables.' }, { label: 'Compétence organisationnelle', desc: 'Naviguer dans les structures institutionnelles et travailler efficacement dans les hiérarchies.' }, { label: 'Performance institutionnelle', desc: 'Aligner l’effort individuel sur les objectifs organisationnels.' }], closingNote: 'Le salarié qui comprend les systèmes d’entreprise — et non seulement sa fiche de poste — devient celui qui les améliore.' },
    { id: 'owner', number: '02', title: 'Chef d’entreprise', valueProposition: 'Autorité et propriété', tagline: 'Liberté dérivée de l’autorité propriétaire.', intro: 'Un chef d’entreprise est responsable de maintenir, améliorer et développer une entreprise existante. Ce parcours exige discipline, conscience opérationnelle, responsabilité financière et la capacité à décider sous de vraies contraintes de marché.', strengths: [{ label: 'Gestion des opérations', desc: 'Faire fonctionner de façon fiable chaque fonction de l’organisation.' }, { label: 'Responsabilité financière', desc: 'Posséder les chiffres — trésorerie, marges, obligations.' }, { label: 'Discipline', desc: 'Maintenir les standards même sous pression ou fatigue.' }, { label: 'Amélioration et expansion', desc: 'Construire la capacité dans le temps plutôt que de réagir aux crises.' }], closingNote: 'La propriété n’est pas la liberté vis-à-vis des contraintes. C’est la responsabilité de les gérer honnêtement.' },
    { id: 'freelancer', number: '03', title: 'Indépendant', valueProposition: 'Flexibilité et indépendance', tagline: 'Flexibilité et indépendance selon des termes individuels.', intro: 'Les indépendants s’appuient fortement sur l’expertise individuelle, la réputation, l’adaptabilité et les relations clients. Ce parcours exige autogestion, communication, conscience des prix et discipline personnelle.', strengths: [{ label: 'Expertise', desc: 'Une compétence profonde et commercialisable dans un domaine spécifique.' }, { label: 'Réputation', desc: 'Le parcours qui remplace la marque institutionnelle comme signal de confiance principal.' }, { label: 'Adaptabilité', desc: 'S’ajuster aux exigences des clients et aux conditions changeantes sans soutien structurel.' }, { label: 'Relations clients', desc: 'Construire des relations professionnelles de long terme.' }, { label: 'Tarification et autogestion', desc: 'Fixer des tarifs qui reflètent la valeur et gérer le cycle d’affaires de façon indépendante.' }], closingNote: 'L’indépendant qui ne peut pas tarifer correctement son propre travail n’est pas encore devenu indépendant.' },
    { id: 'entrepreneur', number: '04', title: 'Entrepreneur', valueProposition: 'Changement, expérimentation et dynamisme', tagline: 'Changement et dynamisme par des entreprises en évolution.', intro: 'Les entrepreneurs se distinguent par leur recherche de nouvelles idées, de nouvelles entreprises, de nouveaux modèles et de nouvelles opportunités. Les futurs entrepreneurs ont besoin d’une base de connaissances large — leur chemin changeant leur demande de reconnaître les opportunités, de calculer les risques et d’agir avec courage.', strengths: [{ label: 'Reconnaissance d’opportunités', desc: 'Identifier des problèmes qui méritent d’être résolus et des marchés prêts à payer.' }, { label: 'Risque calculé', desc: 'Distinguer l’incertitude gérable de l’exposition à éviter.' }, { label: 'Savoir large', desc: 'Comprendre suffisamment chaque fonction d’entreprise pour construire une organisation cohérente.' }, { label: 'Création de nouveaux modèles', desc: 'Concevoir des structures organisationnelles et commerciales qui n’ont pas encore de modèle.' }], closingNote: 'L’entrepreneuriat et l’université partagent une propriété fondamentale : tous deux opèrent dans des territoires où les réponses ne sont pas encore connues.' },
    { id: 'academic', number: '05', title: 'Universitaire', valueProposition: 'Curiosité, recherche et compréhension', tagline: 'Curiosité satisfaite par la recherche et la compréhension.', intro: 'Les futurs universitaires doivent apprendre non seulement à poser les bonnes questions, mais aussi à poser des questions qui n’ont pas encore été posées. Ce parcours exige curiosité, détermination, discipline méthodologique et humilité.', strengths: [{ label: 'Méthodologie', desc: 'Savoir comment le savoir est produit, validé et révisé.' }, { label: 'Questionnement', desc: 'Soutenir un doute productif — la capacité à demander pourquoi la réponse acceptée pourrait être fausse.' }, { label: 'Humilité', desc: 'Reconnaître les limites du savoir actuel, y compris le sien.' }, { label: 'Discipline épistémique', desc: 'Distinguer ce qui est connu, ce qui est cru et ce qui n’est que supposé.' }, { label: 'Persistance intellectuelle', desc: 'Continuer à enquêter sur des questions difficiles sans pression externe.' }], closingNote: 'L’entrepreneur comme l’universitaire travaillent dans des domaines sans réponses établies. La différence est que l’entrepreneur construit sous cette incertitude ; l’universitaire l’enquête.' },
  ],
}

const COMPARISON_DATA = {
  en: [
    { title: 'Entrepreneurship', lines: ['Operates before established structures exist', 'Builds organizations under uncertainty', 'Measures progress through market and user response', 'Produces value through commercial creation', 'Fails when the model cannot sustain itself'] },
    { title: 'Academic Research', lines: ['Operates beyond the boundaries of existing knowledge', 'Investigates uncertainty rather than resolving it by force', 'Measures progress through peer scrutiny and replication', 'Produces value through the extension of understanding', 'Fails when conclusions cannot withstand examination'] },
  ],
  tr: [
    { title: 'Girişimcilik', lines: ['Yerleşik yapılar henüz var olmadan önce faaliyet gösterir', 'Belirsizlik altında örgütler inşa eder', 'İlerlemeyi piyasa ve kullanıcı tepkisiyle ölçer', 'Ticari yaratım yoluyla değer üretir', 'Model kendini sürdüremediğinde başarısız olur'] },
    { title: 'Akademik Araştırma', lines: ['Mevcut bilginin sınırlarının ötesinde faaliyet gösterir', 'Belirsizliği zorla çözmek yerine araştırır', 'İlerlemeyi meslektaş denetimi ve tekrarlanabilirlikle ölçer', 'Anlayışın genişlemesi yoluyla değer üretir', 'Sonuçlar incelemeye dayanamadığında başarısız olur'] },
  ],
  fr: [
    { title: 'Entrepreneuriat', lines: ['Opère avant que des structures établies n’existent', 'Construit des organisations sous l’incertitude', 'Mesure le progrès par la réponse du marché et des utilisateurs', 'Produit de la valeur par la création commerciale', 'Échoue lorsque le modèle ne peut se soutenir'] },
    { title: 'Recherche académique', lines: ['Opère au-delà des frontières du savoir existant', 'Enquête l’incertitude plutôt que de la résoudre par la force', 'Mesure le progrès par l’examen par les pairs et la réplication', 'Produit de la valeur par l’extension de la compréhension', 'Échoue lorsque les conclusions ne résistent pas à l’examen'] },
  ],
}

export default function PathwaysClient() {
  const { lang } = useLanguage()
  const L = T[lang]
  const pathways = PATHWAYS_DATA[lang]
  const comparisonCols = COMPARISON_DATA[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumb[0], href: '/' }, { label: L.breadcrumb[1], href: '/teaching' }, { label: L.breadcrumb[2] }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 64px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <SectionLabel text={L.sectionLabel} />
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 24px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{L.heroTitle}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#6A747D', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 680 }}>{L.heroP1}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.8, margin: 0, maxWidth: 680 }}>{L.heroP2}</p>
        </div>
      </section>

      {/* Foundation diagram */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '64px 32px', borderBottom: '1px solid #E7E0D3' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#0B1F33', padding: '20px 48px', marginBottom: 0 }}>
            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{L.diagramFoundation}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B08D45', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{L.diagramShared}</div>
          </div>
          <div style={{ width: 1, height: 28, backgroundColor: '#B08D45', margin: '0 auto' }} />
          <div style={{ position: 'relative', height: 1, backgroundColor: '#B08D45', maxWidth: 860, margin: '0 auto' }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{ position: 'absolute', top: 0, left: `${i * 25}%`, transform: i === 4 ? 'translateX(-100%)' : i === 0 ? 'translateX(0)' : 'translateX(-50%)', width: 1, height: 28, backgroundColor: '#B08D45' }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, maxWidth: 860, margin: '0 auto' }} className="pathways-diagram-grid">
            {pathways.map((p, i) => (
              <div key={p.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', borderTop: '2px solid #B08D45', padding: '14px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#B08D45', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{`0${i + 1}`}</div>
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 13, fontWeight: 700, color: '#0B1F33' }}>{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pathways.map((pathway, idx) => (
        <section key={pathway.id} style={{ backgroundColor: '#FFFFFF', padding: '64px 32px', borderBottom: '1px solid #E7E0D3' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'start', marginBottom: 48 }} className="pathway-header-grid">
              <div>
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 48, fontWeight: 700, color: '#E7E0D3', lineHeight: 1, marginBottom: 8 }}>{pathway.number}</div>
                <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 10px', lineHeight: 1.15 }}>{pathway.title}</h2>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#B08D45', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{pathway.valueProposition}</div>
                <div style={{ width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 16, fontStyle: 'italic', color: '#1E2328', lineHeight: 1.6, margin: '0 0 16px', borderLeft: '2px solid #B08D45', paddingLeft: 18 }}>"{pathway.tagline}"</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6A747D', lineHeight: 1.8, margin: 0 }}>{pathway.intro}</p>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E7E0D3' }}>{L.coreStrengths}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }} className="strengths-grid">
                {pathway.strengths.map(s => (
                  <div key={s.label} style={{ backgroundColor: '#FFFFFF', padding: '22px 20px' }}>
                    <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 14, fontWeight: 700, color: '#0B1F33', marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #E7E0D3' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2328', lineHeight: 1.7, margin: 0 }}>{pathway.closingNote}</p>
            </div>
          </div>
          <style>{`.pathway-header-grid { grid-template-columns: 1fr 2fr !important; } .strengths-grid { grid-template-columns: repeat(3, 1fr) !important; } @media (max-width: 760px) { .pathway-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; } .strengths-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
        </section>
      ))}

      <section style={{ backgroundColor: '#0B1F33', padding: '72px 32px', borderBottom: '1px solid #0B1F33' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.closingLabel}</span>
          </div>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px', lineHeight: 1.25 }}>{L.closingTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#1A3550', marginBottom: 40 }} className="comparison-grid">
            {comparisonCols.map(col => (
              <div key={col.title} style={{ backgroundColor: '#0F2840', padding: '36px 28px' }}>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px' }}>{col.title}</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.lines.map((line, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#B08D45', flexShrink: 0, marginTop: 8 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8B4BE', lineHeight: 1.65 }}>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontStyle: 'italic', color: '#D0C9BC', lineHeight: 1.65, margin: 0, borderLeft: '2px solid #B08D45', paddingLeft: 20 }}>{L.closingQuote}</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '40px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>{L.navTitle}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{L.navSub}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/teaching/purpose" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1A3550')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0B1F33')}>
              {L.navPurpose}
            </Link>
            <Link href="/teaching/classification" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#0B1F33', border: '1px solid #0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {L.navClass}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .comparison-grid { grid-template-columns: 1fr 1fr !important; }
        .pathways-diagram-grid { grid-template-columns: repeat(5, 1fr) !important; }
        @media (max-width: 700px) { .comparison-grid { grid-template-columns: 1fr !important; } .pathways-diagram-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
