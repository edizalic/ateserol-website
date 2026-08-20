'use client'

import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const COPY = {
  en: {
    home: 'Home', eyebrow: 'Teaching', title: 'Structured flexibility in the classroom',
    intro: 'Education is in a period of transition. Some older practices deserve to be questioned; some newer practices deserve the same scrutiny. I do not see much value in choosing between tradition and innovation as identities. The more useful question is whether a method helps students do the kind of thinking the course requires.',
    positionTitle: 'My basic position',
    position: 'A course needs structure: students should know what they are learning, why it matters, how their work will be judged and where they are expected to improve. Within that structure, the teaching method can change. A lecture may be the clearest way to establish a difficult foundation. A case may be better for interpretation. A project may reveal whether students can integrate several ideas at once. Discussion can be useful when disagreement itself exposes the assumptions behind a decision.',
    positionEnd: 'That is what I mean by structured flexibility. The structure protects clarity and fairness; the flexibility lets the method fit the objective.',
    outcomesLabel: 'Potential outcomes',
    outcomesTitle: 'A school of business should not exist solely to produce people who will go to work for large organizations. That is only one of the potential outcomes.',
    outcomesIntro: 'Business education should develop people who are capable of understanding, managing, improving, creating and expanding organizations in different industries and across the full range of roles those people will actually occupy.',
    outcomes: [
      { title: 'Academia', body: 'Builds and tests knowledge through research, writing and teaching.', skills: 'Method · evidence · clear argument' },
      { title: 'Business owner', body: 'Carries responsibility for an organization\u2019s continuity, people, finances and improvement.', skills: 'Operations · finance · long-term judgment' },
      { title: 'Entrepreneur', body: 'Creates and tests a new venture where demand, resources and outcomes are uncertain.', skills: 'Opportunity evaluation · experimentation · resource use' },
      { title: 'Freelancer', body: 'Works directly with clients and turns specialist judgment into a viable independent practice.', skills: 'Self-management · client judgment · pricing' },
      { title: 'Corporate employee', body: 'Contributes within an organization by coordinating expertise, decisions and responsibilities with others.', skills: 'Functional competence · collaboration · organizational judgment' },
    ],
    curiosityLabel: 'Curiosity and systems',
    curiosityTitle: 'The best business thinkers are curious about systems.',
    curiosity: 'They ask how things connect, what drives outcomes and where models break down. Curiosity is teachable when it is modeled and rewarded, not merely mentioned.',
    explore: 'Explore the teaching approach',
    cards: [
      { title: 'Teaching ethos', body: 'Why I place feasibility, evidence, judgment and responsibility at the centre of business education, and why I do not expect every student to be moving toward the same professional path.', label: 'Read teaching ethos', href: '/teaching/ethos' },
      { title: 'Class structure', body: 'How a course can move from foundations to synthesis without pretending that every subject needs the same weekly pattern.', label: 'See class structure', href: '/teaching/class-structure' },
      { title: 'Assessment', body: 'Why foundational knowledge and higher-level judgment should not be assessed in exactly the same way.', label: 'Read assessment approach', href: '/teaching/assessment' },
    ],
    functionsTitle: 'Course functions',
    functions: [
      { title: 'Theoretical', body: 'Build the concepts and language students need before they can analyse more complicated situations.' },
      { title: 'Practical', body: 'Use knowledge to carry out a task, interpret a situation or produce a defensible piece of work.' },
      { title: 'Business development', body: 'Examine whether an idea creates value, for whom, under what assumptions and with what constraints.' },
      { title: 'Technical', body: 'Develop the quantitative, analytical or tool-based competence required to work accurately.' },
    ],
    aiTitle: 'Use of AI',
    ai: 'I do not treat AI as automatically acceptable or automatically harmful. Its value depends on the task. If the objective is to practise a skill that the AI would perform in the student\u2019s place, using it may defeat the purpose. If the objective is comparison, critique, exploration or checking alternatives, it may be useful. In either case, the student remains responsible for sources, calculations, claims and the final argument.',
    guideTitle: 'A short guide for students',
    guide: [
      'Understand the question before looking for a framework.',
      'Separate what you know from what you are assuming.',
      'Show the reasoning behind a number, recommendation or conclusion.',
      'Use sources because they strengthen the argument, not because the assignment requires a bibliography.',
      'When feedback shows a weakness, revise the work rather than merely explaining why you did it that way.',
      'If you use AI, verify its contribution and be prepared to explain your own decisions without it.',
    ],
    responsibilityTitle: 'My responsibility as an instructor',
    responsibility: 'I should make expectations intelligible, provide material that students can actually work with, distinguish difficulty from unnecessary confusion, and apply standards consistently. Students should not have to guess what counts as good work. They should, however, still have to do the work of producing it.',
  },
  tr: {
    home: 'Ana Sayfa', eyebrow: 'Öğretim', title: 'Sınıfta yapılandırılmış esneklik',
    intro: 'Eğitim bir geçiş dönemindedir. Bazı eski uygulamaların sorgulanması gerekir; bazı yeni uygulamalar da aynı ölçüde incelenmeyi hak eder.',
    positionTitle: 'Temel yaklaşımım',
    position: 'Bir dersin yapıya ihtiyacı vardır: öğrenciler ne öğrendiklerini, bunun neden önemli olduğunu, çalışmalarının nasıl değerlendirileceğini ve nerede gelişmelerinin beklendiğini bilmelidir.',
    positionEnd: 'Yapılandırılmış esneklik derken bunu kastediyorum. Yapı açıklığı ve adaleti korur; esneklik yöntemin amaca uymasını sağlar.',
    outcomesLabel: 'Olası yönelimler',
    outcomesTitle: 'Bir işletme okulunun amacı yalnızca büyük kuruluşlarda çalışacak insanlar yetiştirmek olmamalıdır.',
    outcomesIntro: 'İşletme eğitimi; farklı sektörlerde ve insanların gerçekte üstleneceği rollerin tamamında kuruluşları anlayabilen, yönetebilen, geliştirebilen, kurabilen ve büyütebilen bireyler yetiştirmelidir.',
    outcomes: [
      { title: 'Akademi', body: 'Araştırma yaparak, yazarak ve öğreterek bilgiyi üretir ve sınar.', skills: 'Yöntem · kanıt · açık anlatım' },
      { title: 'İşletme sahibi', body: 'Bir kuruluşun sürekliliği, çalışanları, mali yapısı ve gelişimiyle ilgili sorumluluk üstlenir.', skills: 'Operasyon · finans · uzun vadeli karar verme' },
      { title: 'Girişimci', body: 'Talebin, kaynakların ve sonuçların belirsiz olduğu bir ortamda yeni bir girişim kurar ve onu sınar.', skills: 'Fırsat değerlendirme · deneme · kaynak yönetimi' },
      { title: 'Serbest çalışan', body: 'Müşterilerle doğrudan çalışır; uzmanlığını ve muhakemesini sürdürülebilir bir bağımsız çalışma pratiğine dönüştürür.', skills: 'Öz yönetim · müşteri seçimi · fiyatlandırma' },
      { title: 'Kurumsal çalışan', body: 'Bir kuruluşta, uzmanlığını başkalarıyla birlikte kullanarak kararların alınmasına ve sorumlulukların paylaşılmasına katkı sağlar.', skills: 'Mesleki yetkinlik · iş birliği · kurum içi muhakeme' },
    ],
    curiosityLabel: 'Merak ve sistemler',
    curiosityTitle: 'En iyi işletme düşünürleri, sistemlerin nasıl işlediğini merak eder.',
    curiosity: 'Bu kişiler, unsurların nasıl birbirine bağlandığını, sonuçları nelerin belirlediğini ve modellerin nerede aksadığını sorgular.',
    explore: 'Öğretim yaklaşımını inceleyin',
    cards: [
      { title: 'Öğretim anlayışı', body: 'Fizibiliteyi, kanıtı, muhakemeyi ve sorumluluğu neden işletme eğitiminin merkezine yerleştirdiğim üzerine.', label: 'Öğretim anlayışını oku', href: '/teaching/ethos' },
      { title: 'Ders yapısı', body: 'Her konunun aynı haftalık düzene ihtiyaç duyduğunu varsaymadan bir dersin temellerden senteze nasıl ilerleyebileceği üzerine.', label: 'Ders yapısını gör', href: '/teaching/class-structure' },
      { title: 'Değerlendirme', body: 'Temel bilginin ve üst düzey muhakemenin neden aynı biçimde değerlendirilmemesi gerektiği üzerine.', label: 'Değerlendirme yaklaşımını oku', href: '/teaching/assessment' },
    ],
    functionsTitle: 'Ders işlevleri',
    functions: [
      { title: 'Kuramsal', body: 'Öğrencilerin daha karmaşık durumları analiz etmeden önce ihtiyaç duyduğu kavramları ve dili oluşturur.' },
      { title: 'Uygulamalı', body: 'Bilgiyi bir görevi yerine getirmek, bir durumu yorumlamak veya savunulabilir bir çalışma üretmek için kullanır.' },
      { title: 'İş geliştirme', body: 'Bir fikrin değer yaratıp yaratmadığını, kimin için, hangi varsayımlar altında ve hangi kısıtlarla yarattığını inceler.' },
      { title: 'Teknik', body: 'Doğru çalışmak için gereken nicel, analitik veya araç temelli yetkinliği geliştirir.' },
    ],
    aiTitle: 'Yapay zekâ kullanımı',
    ai: 'Yapay zekâyı kendiliğinden kabul edilebilir veya kendiliğinden zararlı görmüyorum. Değeri göreve bağlıdır.',
    guideTitle: 'Öğrenciler için kısa bir rehber',
    guide: [
      'Bir çerçeve aramadan önce soruyu anlayın.',
      'Bildiklerinizle varsaydıklarınızı birbirinden ayırın.',
      'Bir sayının, önerinin veya sonucun arkasındaki muhakemeyi gösterin.',
      'Kaynakları ödev kaynakça istediği için değil, savı güçlendirdikleri için kullanın.',
      'Geri bildirim bir zayıflık gösterdiğinde yalnızca neden öyle yaptığınızı açıklamak yerine çalışmayı gözden geçirin.',
      'Yapay zekâ kullanıyorsanız katkısını doğrulayın ve kendi kararlarınızı onsuz açıklamaya hazır olun.',
    ],
    responsibilityTitle: 'Eğitmen olarak sorumluluğum',
    responsibility: 'Beklentileri anlaşılır kılmalı, öğrencilerin gerçekten çalışabileceği materyalleri sunmalı, zorluk ile gereksiz karmaşayı birbirinden ayırmalı ve standartları tutarlı biçimde uygulamalıyım.',
  },
  fr: {
    home: 'Accueil', eyebrow: 'Enseignement', title: 'Une flexibilité structurée en classe',
    intro: 'L’éducation est dans une période de transition. Certaines pratiques anciennes méritent d’être questionnées ; certaines pratiques plus récentes méritent le même examen. Je ne vois pas beaucoup d’intérêt à choisir entre tradition et innovation comme identités. La question plus utile est de savoir si une méthode aide les étudiants à faire le type de pensée que le cours exige.',
    positionTitle: 'Ma position de base',
    position: 'Un cours a besoin de structure : les étudiants doivent savoir ce qu’ils apprennent, pourquoi cela compte, comment leur travail sera jugé et où ils sont censés progresser. Dans cette structure, la méthode d’enseignement peut changer. Un cours magistral peut être la façon la plus claire d’établir une fondation difficile. Un cas peut mieux convenir à l’interprétation. Un projet peut révéler si les étudiants peuvent intégrer plusieurs idées à la fois. La discussion peut être utile lorsque le désaccord lui-même expose les hypothèses derrière une décision.',
    positionEnd: 'C’est ce que j’entends par flexibilité structurée. La structure protège la clarté et l’équité ; la flexibilité permet à la méthode de s’adapter à l’objectif.',
    outcomesLabel: 'Issues possibles',
    outcomesTitle: 'Une école de gestion ne devrait pas exister uniquement pour former des personnes destinées à de grandes organisations. Ce n’est qu’une des issues possibles.',
    outcomesIntro: 'La formation en gestion devrait former des personnes capables de comprendre, gérer, améliorer, créer et développer des organisations dans différents secteurs et dans toute la gamme des rôles qu’elles occuperont réellement.',
    outcomes: [
      { title: 'Université', body: 'Construit et met à l’épreuve le savoir par la recherche, l’écriture et l’enseignement.', skills: 'Méthode · preuves · argument clair' },
      { title: 'Chef d’entreprise', body: 'Porte la responsabilité de la continuité, des personnes, des finances et de l’amélioration d’une organisation.', skills: 'Opérations · finance · jugement de long terme' },
      { title: 'Entrepreneur', body: 'Crée et met à l’épreuve une nouvelle entreprise lorsque la demande, les ressources et les résultats sont incertains.', skills: 'Évaluation d’opportunités · expérimentation · usage des ressources' },
      { title: 'Indépendant', body: 'Travaille directement avec des clients et transforme un jugement spécialisé en une pratique indépendante viable.', skills: 'Autogestion · jugement client · tarification' },
      { title: 'Salarié', body: 'Contribue au sein d’une organisation en coordonnant expertise, décisions et responsabilités avec d’autres.', skills: 'Compétence fonctionnelle · collaboration · jugement organisationnel' },
    ],
    curiosityLabel: 'Curiosité et systèmes',
    curiosityTitle: 'Les meilleurs penseurs de la gestion s’intéressent aux systèmes.',
    curiosity: 'Ils demandent comment les choses se relient, ce qui produit les résultats et où les modèles se brisent. La curiosité s’enseigne lorsqu’elle est incarnée et récompensée, et non seulement mentionnée.',
    explore: 'Explorer l’approche pédagogique',
    cards: [
      { title: 'Éthos pédagogique', body: 'Pourquoi je place la faisabilité, les preuves, le jugement et la responsabilité au centre de la formation en gestion, et pourquoi je n’attends pas de chaque étudiant qu’il se dirige vers le même parcours professionnel.', label: 'Lire l’éthos pédagogique', href: '/teaching/ethos' },
      { title: 'Structure des cours', body: 'Comment un cours peut passer des fondements à la synthèse sans prétendre que chaque sujet nécessite le même rythme hebdomadaire.', label: 'Voir la structure des cours', href: '/teaching/class-structure' },
      { title: 'Évaluation', body: 'Pourquoi les connaissances de base et le jugement de niveau supérieur ne devraient pas être évalués exactement de la même façon.', label: 'Lire l’approche d’évaluation', href: '/teaching/assessment' },
    ],
    functionsTitle: 'Fonctions des cours',
    functions: [
      { title: 'Théorique', body: 'Construire les concepts et le langage dont les étudiants ont besoin avant de pouvoir analyser des situations plus complexes.' },
      { title: 'Pratique', body: 'Utiliser le savoir pour accomplir une tâche, interpréter une situation ou produire un travail défendable.' },
      { title: 'Développement d’entreprise', body: 'Examiner si une idée crée de la valeur, pour qui, sous quelles hypothèses et avec quelles contraintes.' },
      { title: 'Technique', body: 'Développer la compétence quantitative, analytique ou outillée nécessaire pour travailler avec exactitude.' },
    ],
    aiTitle: 'Usage de l’IA',
    ai: 'Je ne traite pas l’IA comme automatiquement acceptable ou automatiquement nuisible. Sa valeur dépend de la tâche. Si l’objectif est de pratiquer une compétence que l’IA accomplirait à la place de l’étudiant, l’utiliser peut faire échouer le propos. Si l’objectif est la comparaison, la critique, l’exploration ou la vérification d’alternatives, elle peut être utile. Dans les deux cas, l’étudiant reste responsable des sources, des calculs, des affirmations et de l’argument final.',
    guideTitle: 'Un court guide pour les étudiants',
    guide: [
      'Comprenez la question avant de chercher un cadre.',
      'Séparez ce que vous savez de ce que vous supposez.',
      'Montrez le raisonnement derrière un chiffre, une recommandation ou une conclusion.',
      'Utilisez les sources parce qu’elles renforcent l’argument, non parce que le devoir exige une bibliographie.',
      'Lorsque le retour montre une faiblesse, révisez le travail plutôt que de seulement expliquer pourquoi vous l’avez fait ainsi.',
      'Si vous utilisez l’IA, vérifiez sa contribution et soyez prêt à expliquer vos propres décisions sans elle.',
    ],
    responsibilityTitle: 'Ma responsabilité en tant qu’enseignant',
    responsibility: 'Je dois rendre les attentes intelligibles, fournir un matériau avec lequel les étudiants peuvent réellement travailler, distinguer la difficulté de la confusion inutile, et appliquer les standards de façon cohérente. Les étudiants ne devraient pas avoir à deviner ce qui compte comme un bon travail. Ils devraient néanmoins encore devoir faire le travail de le produire.',
  },
}

export default function TeachingPageClient() {
  const { lang } = useLanguage()
  const L = COPY[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.eyebrow }]} />
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 58px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 34, height: 2, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.13em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 50px)', lineHeight: 1.14, color: '#0B1F33', margin: '0 0 18px' }}>{L.title}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.8, color: '#6A747D', margin: 0, maxWidth: 760 }}>{L.intro}</p>
        </div>
      </header>

      <section style={{ padding: '60px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 27, color: '#0B1F33', margin: '0 0 18px' }}>{L.positionTitle}</h2>
          <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, lineHeight: 1.85, color: '#1E2328', margin: '0 0 18px' }}>{L.position}</p>
          <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, lineHeight: 1.85, color: '#1E2328', margin: 0 }}>{L.positionEnd}</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', borderBottom: '1px solid #E7E0D3', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ maxWidth: 900, marginBottom: 38 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
              <span style={{ width: 30, height: 2, backgroundColor: '#B08D45' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 700, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.outcomesLabel}</span>
            </div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(24px, 3.5vw, 35px)', lineHeight: 1.35, color: '#0B1F33', margin: '0 0 20px' }}>{L.outcomesTitle}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.8, color: '#6A747D', margin: 0 }}>{L.outcomesIntro}</p>
          </div>

          <div className="teaching-outcomes" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12 }}>
            {L.outcomes.map((item, index) => (
              <article key={item.title} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '26px 22px', minWidth: 0 }}>
                <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 10, color: '#B08D45', marginBottom: 15 }}>0{index + 1}</div>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, lineHeight: 1.3, color: '#0B1F33', margin: '0 0 11px' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.7, color: '#6A747D', margin: '0 0 18px' }}>{item.body}</p>
                <div style={{ borderTop: '1px solid #E7E0D3', paddingTop: 12, fontFamily: 'Inter, sans-serif', fontSize: 9.5, lineHeight: 1.55, color: '#0B1F33', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.skills}</div>
              </article>
            ))}
          </div>

          <div className="teaching-curiosity" style={{ marginTop: 28, padding: '34px clamp(24px, 5vw, 48px)', backgroundColor: '#FFFFFF', borderLeft: '3px solid #B08D45', display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(280px, 1.15fr)', gap: 36, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{L.curiosityLabel}</div>
              <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, lineHeight: 1.35, color: '#0B1F33', margin: 0 }}>{L.curiosityTitle}</h3>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.8, color: '#6A747D', margin: 0 }}>{L.curiosity}</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '56px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 27, color: '#0B1F33', margin: '0 0 26px' }}>{L.explore}</h2>
          <div className="teaching-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
            {L.cards.map(card => (
              <Link key={card.href} href={card.href} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', padding: '32px 28px', color: 'inherit', textDecoration: 'none' }}>
                <div style={{ width: 28, height: 2, backgroundColor: '#B08D45', marginBottom: 18 }} />
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 20, color: '#0B1F33', margin: '0 0 12px' }}>{card.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.75, color: '#6A747D', margin: '0 0 22px', flexGrow: 1 }}>{card.body}</p>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{card.label} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 27, color: '#0B1F33', margin: '0 0 26px' }}>{L.functionsTitle}</h2>
          <div className="teaching-four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
            {L.functions.map(item => (
              <article key={item.title} style={{ backgroundColor: '#FFFFFF', padding: '28px 24px' }}>
                <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, color: '#0B1F33', margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.7, color: '#6A747D', margin: 0 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#0B1F33', padding: '60px 32px' }}>
        <div className="teaching-two-col" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <article>
            <div style={{ width: 30, height: 2, backgroundColor: '#B08D45', marginBottom: 18 }} />
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 16px' }}>{L.aiTitle}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.8, color: '#A8B4BE', margin: 0 }}>{L.ai}</p>
          </article>
          <article>
            <div style={{ width: 30, height: 2, backgroundColor: '#B08D45', marginBottom: 18 }} />
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 16px' }}>{L.guideTitle}</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {L.guide.map(item => (
                <li key={item} style={{ display: 'flex', gap: 11, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: '#D6D0C5' }}>
                  <span style={{ color: '#B08D45' }}>•</span>{item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', padding: '56px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 27, color: '#0B1F33', margin: '0 0 16px' }}>{L.responsibilityTitle}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.8, color: '#6A747D', margin: 0 }}>{L.responsibility}</p>
        </div>
      </section>

      <style>{`
        @media (max-width: 1080px) { .teaching-outcomes { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) { .teaching-four-col { grid-template-columns: repeat(2, 1fr) !important; } .teaching-curiosity { grid-template-columns: 1fr !important; } }
        @media (max-width: 720px) { .teaching-three-col, .teaching-two-col, .teaching-four-col, .teaching-outcomes { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
