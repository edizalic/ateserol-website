'use client'

import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const COPY = {
  en: {
    home: 'Home', eyebrow: 'About', title: 'Teaching business as a practice of careful judgment',
    opening: [
      'I am a lecturer working in business education, with interests that meet around feasibility, decision-making, research methods and the responsible use of data and AI. I am particularly interested in the point where a student has to move beyond knowing a concept and decide what to do with it.',
      'For me, that distinction matters. Business education can become too comfortable when students are rewarded mainly for recognising the correct framework or reproducing a definition. Those things have a place, especially at the beginning of a course, but they are not enough on their own. Students also need practice in working with incomplete information, defending assumptions, revising an argument and accepting that a reasonable answer may still be open to criticism.',
      'My teaching therefore changes with the character of the course. Some subjects require technical accuracy and repeated practice. Others benefit from cases, projects, debate or analysis of competing choices. I prefer this kind of structured flexibility to the idea that one method is automatically more modern or more effective than another.',
    ],
    habitsTitle: 'What I am trying to teach',
    habits: 'The immediate subject may be feasibility, strategy, economics, research or another area of business. Underneath the subject, however, I usually return to the same habits: read carefully, distinguish evidence from assumption, calculate when calculation is needed, explain your reasoning, and take responsibility for the conclusion you reach.',
    pathsTitle: 'Business education has more than one destination',
    paths: 'I do not think business education should be organised as if every student is preparing for the same corporate career. Students may become employees, business owners, freelancers, entrepreneurs or academics. These paths overlap, but they do not demand exactly the same combination of skills, confidence and judgment.',
    interestsTitle: 'Current areas of interest',
    interests: [
      'Feasibility analysis and business planning',
      'Strategy, systems thinking and managerial decision-making',
      'Project-based learning and assessment design',
      'Research methods and evidence quality',
      'Explainable decision-support systems',
      'Responsible use of AI in education and business',
    ],
    profileTitle: 'Profile', position: 'Position', positionValue: 'Lecturer',
    whyTitle: 'Why this site exists',
    why: 'Part of this site is practical: students need a stable place to find course information and materials. Part of it is archival: projects, presentations and teaching ideas are easier to improve when they are documented. The rest is simply a place to think in public about education, business and the questions that sit between them.',
  },
  tr: {
    home: 'Ana Sayfa', eyebrow: 'Hakkında', title: 'İşletme eğitimini dikkatli muhakeme pratiği olarak ele almak',
    opening: [
      'İşletme eğitimi alanında çalışan bir öğretim görevlisiyim. İlgi alanlarım fizibilite, karar verme, araştırma yöntemleri ile veri ve yapay zekânın sorumlu kullanımı etrafında birleşiyor. Özellikle öğrencinin bir kavramı bilmenin ötesine geçip onunla ne yapacağına karar vermek zorunda kaldığı noktayla ilgileniyorum.',
      'Bu ayrım benim için önemlidir. Öğrenciler ağırlıklı olarak doğru çerçeveyi tanıdıkları veya bir tanımı yeniden ürettikleri için ödüllendirildiğinde işletme eğitimi fazla rahat bir alana dönüşebilir. Bunların, özellikle dersin başlangıcında, bir yeri vardır; fakat tek başlarına yeterli değildir.',
      'Bu nedenle öğretim biçimim dersin niteliğine göre değişir. Bazı konular teknik doğruluk ve tekrarlı alıştırma gerektirir. Bazıları ise vakalardan, projelerden, tartışmadan veya rakip seçeneklerin analizinden yararlanır.',
    ],
    habitsTitle: 'Öğretmeye çalıştığım şey',
    habits: 'Doğrudan konu fizibilite, strateji, ekonomi, araştırma veya işletmenin başka bir alanı olabilir. Konunun altında ise genellikle aynı alışkanlıklara dönüyorum: dikkatli oku, kanıtı varsayımdan ayır, hesap gerektiğinde hesapla, muhakemeni açıkla ve vardığın sonucun sorumluluğunu üstlen.',
    pathsTitle: 'İşletme eğitiminin tek bir varış noktası yoktur',
    paths: 'İşletme eğitiminin her öğrenci aynı kurumsal kariyere hazırlanıyormuş gibi düzenlenmesi gerektiğini düşünmüyorum. Öğrenciler çalışan, işletme sahibi, serbest çalışan, girişimci veya akademisyen olabilir.',
    interestsTitle: 'Güncel ilgi alanları',
    interests: [
      'Fizibilite analizi ve iş planlaması',
      'Strateji, sistem düşüncesi ve yönetsel karar verme',
      'Proje tabanlı öğrenme ve değerlendirme tasarımı',
      'Araştırma yöntemleri ve kanıt kalitesi',
      'Açıklanabilir karar destek sistemleri',
      'Eğitimde ve işletmede yapay zekânın sorumlu kullanımı',
    ],
    profileTitle: 'Profil', position: 'Görev', positionValue: 'Öğretim Görevlisi',
    whyTitle: 'Bu site neden var',
    why: 'Bu sitenin bir bölümü pratiktir: öğrencilerin ders bilgilerine ve materyallere ulaşabileceği istikrarlı bir yere ihtiyacı vardır. Bir bölümü arşiv niteliğindedir: projeler, sunumlar ve öğretim fikirleri belgelendiklerinde daha kolay geliştirilebilir. Geri kalanı ise eğitim, işletme ve ikisinin arasında yer alan sorular hakkında kamusal biçimde düşünmek için bir alandır.',
  },
  fr: {
    home: 'Accueil', eyebrow: 'À propos', title: 'Enseigner la gestion comme une pratique de jugement attentif',
    opening: [
      'Je suis enseignant en formation en gestion, avec des intérêts qui se rencontrent autour de la faisabilité, de la prise de décision, des méthodes de recherche et de l’usage responsable des données et de l’IA. Je m’intéresse particulièrement au moment où un étudiant doit dépasser la connaissance d’un concept et décider quoi en faire.',
      'Cette distinction m’importe. La formation en gestion devient trop confortable lorsque les étudiants sont surtout récompensés pour reconnaître le bon cadre ou reproduire une définition. Ces choses ont leur place, surtout au début d’un cours, mais elles ne suffisent pas. Les étudiants ont aussi besoin de s’exercer à travailler avec une information incomplète, à défendre des hypothèses, à réviser un argument et à accepter qu’une réponse raisonnable puisse encore être critiquée.',
      'Mon enseignement change donc selon le caractère du cours. Certains sujets exigent une exactitude technique et une pratique répétée. D’autres bénéficient de cas, de projets, de débats ou de l’analyse de choix concurrents. Je préfère cette flexibilité structurée à l’idée qu’une méthode serait automatiquement plus moderne ou plus efficace qu’une autre.',
    ],
    habitsTitle: 'Ce que je cherche à enseigner',
    habits: 'Le sujet immédiat peut être la faisabilité, la stratégie, l’économie, la recherche ou un autre domaine de la gestion. Sous le sujet, je reviens cependant aux mêmes habitudes : lire avec attention, distinguer la preuve de l’hypothèse, calculer lorsque le calcul est nécessaire, expliquer son raisonnement, et assumer la conclusion à laquelle on parvient.',
    pathsTitle: 'La formation en gestion a plus d’une destination',
    paths: 'Je ne pense pas que la formation en gestion doive être organisée comme si chaque étudiant se préparait à la même carrière en entreprise. Les étudiants peuvent devenir salariés, chefs d’entreprise, indépendants, entrepreneurs ou universitaires. Ces chemins se recoupent, mais ils n’exigent pas exactement la même combinaison de compétences, de confiance et de jugement.',
    interestsTitle: 'Domaines d’intérêt actuels',
    interests: [
      'Analyse de faisabilité et planification d’entreprise',
      'Stratégie, pensée systémique et décision managériale',
      'Apprentissage par projet et conception de l’évaluation',
      'Méthodes de recherche et qualité des preuves',
      'Systèmes d’aide à la décision explicables',
      'Usage responsable de l’IA dans l’éducation et les affaires',
    ],
    profileTitle: 'Profil', position: 'Fonction', positionValue: 'Enseignant',
    whyTitle: 'Pourquoi ce site existe',
    why: 'Une partie de ce site est pratique : les étudiants ont besoin d’un lieu stable pour trouver les informations et les supports de cours. Une partie est archivistique : les projets, présentations et idées pédagogiques s’améliorent plus facilement lorsqu’ils sont documentés. Le reste est simplement un lieu pour penser en public à l’éducation, à la gestion et aux questions qui se situent entre les deux.',
  },
}

export default function AboutClient() {
  const { lang } = useLanguage()
  const L = COPY[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.eyebrow }]} />
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 34, height: 2, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.13em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(30px, 5vw, 50px)', lineHeight: 1.14, color: '#0B1F33', margin: 0 }}>{L.title}</h1>
        </div>
      </header>

      <div>
        <section style={{ padding: '60px 32px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            {L.opening.map((p, i) => (
              <p key={i} style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: i === 0 ? 'clamp(18px, 2.5vw, 22px)' : 17, lineHeight: 1.85, color: i === 0 ? '#0B1F33' : '#1E2328', margin: '0 0 22px' }}>{p}</p>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', borderBottom: '1px solid #E7E0D3', padding: '56px 32px' }}>
          <div className="about-two-col" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
            {[{ title: L.habitsTitle, body: L.habits }, { title: L.pathsTitle, body: L.paths }].map(item => (
              <article key={item.title} style={{ backgroundColor: '#FFFFFF', padding: 'clamp(30px, 5vw, 46px)' }}>
                <div style={{ width: 28, height: 2, backgroundColor: '#B08D45', marginBottom: 18 }} />
                <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 23, lineHeight: 1.3, color: '#0B1F33', margin: '0 0 16px' }}>{item.title}</h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.8, color: '#6A747D', margin: 0 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ padding: '60px 32px' }}>
          <div className="about-profile" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 27, color: '#0B1F33', margin: '0 0 24px' }}>{L.interestsTitle}</h2>
              <div style={{ display: 'grid', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
                {L.interests.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: '#FFFFFF', padding: '16px 18px' }}>
                    <span style={{ width: 4, height: 4, marginTop: 8, borderRadius: '50%', backgroundColor: '#B08D45', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: '#1E2328' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside id="profile" style={{ backgroundColor: '#0B1F33', borderTop: '3px solid #B08D45', padding: '30px 28px', scrollMarginTop: 100 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>{L.profileTitle}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#A8B4BE', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{L.position}</div>
              <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 20, color: '#FFFFFF' }}>{L.positionValue}</div>
            </aside>
          </div>
        </section>

        <section style={{ backgroundColor: '#0B1F33', padding: '60px 32px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 34, height: 2, backgroundColor: '#B08D45', margin: '0 auto 22px' }} />
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 27, color: '#FFFFFF', margin: '0 0 16px' }}>{L.whyTitle}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.8, color: '#A8B4BE', margin: 0 }}>{L.why}</p>
          </div>
        </section>
      </div>

      <style>{`@media (max-width: 800px) { .about-two-col, .about-profile { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
