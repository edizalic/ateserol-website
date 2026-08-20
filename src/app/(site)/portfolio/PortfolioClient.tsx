'use client'

import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const COPY = {
  en: {
    home: 'Home', eyebrow: 'Portfolio',
    heading: 'Research, projects and events',
    intro: 'A flexible record of academic work, applied projects, and events. The structure is ready to grow as verified content and visual material become available.',
    jump: 'Explore portfolio',
    research: 'Research', researchTitle: 'Research and publications',
    researchIntro: 'Reserved for research articles, papers, working notes, and other verified academic outputs. Each record can include a citation, abstract, link, and optional visual.',
    projects: 'Projects', projectsTitle: 'Applied projects',
    projectsIntro: 'Project records are built as reusable cards. New entries can be added without changing the overall layout, and each can support an image, summary, metadata, and links.',
    events: 'Events', eventsTitle: 'Events and public activity',
    eventsIntro: 'A place for seminars, workshops, panels, and other documented events. Event records can include a feature image or remain text-led.',
    placeholder: 'Placeholder', visual: 'Visual placeholder',
    replace: 'Replace with a verified image when available',
    fields: 'Content fields',
    mediaLabel: 'Optional media area',
    mediaTitle: 'Portfolio images can live here',
    mediaBody: 'This reserved gallery strip can later hold event photographs, project interface previews, research figures, or other portfolio images.',
    imageSlot: 'Image slot',
  },
  tr: {
    home: 'Ana Sayfa', eyebrow: 'Portfolyo',
    heading: 'Araştırmalar, projeler ve etkinlikler',
    intro: 'Akademik çalışmalar, uygulamalı projeler ve etkinlikler için esnek bir kayıt alanı. Yapı, doğrulanmış içerik ve görsel materyaller hazır oldukça büyütülebilir.',
    jump: 'Portfolyoyu keşfet',
    research: 'Araştırmalar', researchTitle: 'Araştırmalar ve yayınlar',
    researchIntro: 'Araştırma makaleleri, bildiriler, çalışma notları ve doğrulanmış diğer akademik çıktılar için ayrılmıştır.',
    projects: 'Projeler', projectsTitle: 'Uygulamalı projeler',
    projectsIntro: 'Proje kayıtları yeniden kullanılabilir kartlar olarak tasarlanmıştır. Genel düzen değişmeden yeni kayıtlar eklenebilir.',
    events: 'Etkinlikler', eventsTitle: 'Etkinlikler ve kamusal çalışmalar',
    eventsIntro: 'Seminerler, atölyeler, paneller ve belgelenen diğer etkinlikler için bir alan.',
    placeholder: 'Yer tutucu', visual: 'Görsel alanı',
    replace: 'Hazır olduğunda doğrulanmış bir görselle değiştirin',
    fields: 'İçerik alanları',
    mediaLabel: 'İsteğe bağlı medya alanı',
    mediaTitle: 'Portfolyo görselleri burada yer alabilir',
    mediaBody: 'Bu ayrılmış galeri şeridi daha sonra etkinlik fotoğrafları, proje arayüz önizlemeleri, araştırma görselleri veya diğer portfolyo görsellerini barındırabilir.',
    imageSlot: 'Görsel alanı',
  },
  fr: {
    home: 'Accueil', eyebrow: 'Portfolio',
    heading: 'Recherche, projets et événements',
    intro: 'Un registre souple du travail académique, des projets appliqués et des événements. La structure est prête à s’étendre à mesure que du contenu vérifié et du matériel visuel deviennent disponibles.',
    jump: 'Explorer le portfolio',
    research: 'Recherche', researchTitle: 'Recherche et publications',
    researchIntro: 'Réservé aux articles de recherche, communications, notes de travail et autres productions académiques vérifiées. Chaque notice peut inclure une citation, un résumé, un lien et un visuel optionnel.',
    projects: 'Projets', projectsTitle: 'Projets appliqués',
    projectsIntro: 'Les notices de projet sont conçues comme des cartes réutilisables. De nouvelles entrées peuvent être ajoutées sans changer la mise en page, et chacune peut accueillir une image, un résumé, des métadonnées et des liens.',
    events: 'Événements', eventsTitle: 'Événements et activité publique',
    eventsIntro: 'Un lieu pour les séminaires, ateliers, panels et autres événements documentés. Les notices d’événement peuvent inclure une image ou rester principalement textuelles.',
    placeholder: 'Emplacement réservé', visual: 'Emplacement visuel',
    replace: 'Remplacer par une image vérifiée lorsqu’elle sera disponible',
    fields: 'Champs de contenu',
    mediaLabel: 'Espace média optionnel',
    mediaTitle: 'Les images du portfolio peuvent se situer ici',
    mediaBody: 'Cette bande de galerie réservée pourra plus tard accueillir des photographies d’événements, des aperçus d’interfaces de projet, des figures de recherche ou d’autres images de portfolio.',
    imageSlot: 'Emplacement image',
  },
}

const PORTFOLIO_SECTIONS = {
  en: {
    research: [
      { id: 'acafor', title: 'Acafor — Academic Forecasting Research', kind: 'Research', description: 'Reserved for the Acafor research project. Verified details, methodology, and outputs will be published here as the project progresses.', details: ['Project scope and objectives', 'Methodology and data sources', 'Key findings and contributions', 'Publication record'] },
      { id: 'research-2', title: 'Research Record — Slot 2', kind: 'Research', description: 'Reserved for a second research entry. Academic papers, working notes, and other verified research outputs can be listed here.', details: ['Citation and abstract', 'Research context', 'Link to publication or preprint', 'Optional visual'] },
    ],
    projects: [
      { id: 'acapoll', title: 'Acapoll — Academic Polling Platform', kind: 'Project', description: 'Reserved for the Acapoll project. This card will display the project summary, interface previews, and key outcomes when verified details are available.', details: ['Project overview and objectives', 'Technical approach', 'Outcomes and current status', 'Visual: interface screenshot or diagram'] },
      { id: 'project-2', title: 'Applied Project — Slot 2', kind: 'Project', description: 'A placeholder for a second applied project. Each project card can include a summary, metadata, links, and an optional image.', details: ['Project context', 'Applied methodology', 'Results and outputs', 'Links to deliverables'] },
      { id: 'project-3', title: 'Applied Project — Slot 3', kind: 'Project', description: 'A placeholder for a third applied project entry. The grid expands automatically as records are added.', details: ['Project context', 'Key methodology', 'Outputs and findings', 'Related materials'] },
    ],
    events: [
      { id: 'event-1', title: 'Seminar or Panel — Slot 1', kind: 'Event', description: 'Reserved for a documented seminar, workshop, or panel appearance. Each event record can include a feature image, date, location, and summary.', details: ['Event title and format', 'Date and location', 'Topic and participation role', 'Optional photograph or visual'] },
      { id: 'event-2', title: 'Event — Slot 2', kind: 'Event', description: 'A placeholder for a second event entry. The format adapts to conferences, invited talks, public panels, or workshop facilitation.', details: ['Event context', 'Format and audience', 'Summary of participation', 'Links to recording or materials'] },
    ],
  },
  tr: {
    research: [
      { id: 'acafor', title: 'Acafor — Akademik Tahmin Araştırması', kind: 'Araştırma', description: 'Acafor araştırma projesi için ayrılmıştır. Doğrulanmış ayrıntılar, metodoloji ve çıktılar proje ilerledikçe burada yayımlanacaktır.', details: ['Proje kapsamı ve hedefleri', 'Metodoloji ve veri kaynakları', 'Temel bulgular ve katkılar', 'Yayın kaydı'] },
      { id: 'research-2', title: 'Araştırma Kaydı — Slot 2', kind: 'Araştırma', description: 'İkinci bir araştırma girişi için ayrılmıştır. Akademik makaleler, çalışma notları ve diğer doğrulanmış araştırma çıktıları burada listelenebilir.', details: ['Atıf ve özet', 'Araştırma bağlamı', 'Yayın veya ön baskıya bağlantı', 'İsteğe bağlı görsel'] },
    ],
    projects: [
      { id: 'acapoll', title: 'Acapoll — Akademik Anket Platformu', kind: 'Proje', description: 'Acapoll projesi için ayrılmıştır. Doğrulanmış ayrıntılar hazır olduğunda bu kart proje özetini, arayüz önizlemelerini ve temel sonuçları gösterecektir.', details: ['Proje genel bakışı ve hedefleri', 'Teknik yaklaşım', 'Sonuçlar ve mevcut durum', 'Görsel: arayüz ekran görüntüsü veya diyagram'] },
      { id: 'project-2', title: 'Uygulamalı Proje — Slot 2', kind: 'Proje', description: 'İkinci bir uygulamalı proje için yer tutucu. Her proje kartı özet, meta veriler, bağlantılar ve isteğe bağlı görsel içerebilir.', details: ['Proje bağlamı', 'Uygulanan metodoloji', 'Sonuçlar ve çıktılar', 'Teslimatların bağlantıları'] },
      { id: 'project-3', title: 'Uygulamalı Proje — Slot 3', kind: 'Proje', description: 'Üçüncü bir uygulamalı proje girişi için yer tutucu. Kayıtlar eklendikçe ızgara otomatik olarak genişler.', details: ['Proje bağlamı', 'Temel metodoloji', 'Çıktılar ve bulgular', 'İlgili materyaller'] },
    ],
    events: [
      { id: 'event-1', title: 'Seminer veya Panel — Slot 1', kind: 'Etkinlik', description: 'Belgelenmiş bir seminer, atölye veya panel katılımı için ayrılmıştır. Her etkinlik kaydı öne çıkan bir görsel, tarih, konum ve özet içerebilir.', details: ['Etkinlik başlığı ve formatı', 'Tarih ve konum', 'Konu ve katılım rolü', 'İsteğe bağlı fotoğraf veya görsel'] },
      { id: 'event-2', title: 'Etkinlik — Slot 2', kind: 'Etkinlik', description: 'İkinci bir etkinlik girişi için yer tutucu. Format konferanslara, davetli konuşmalara, halka açık panellere veya atölye kolaylaştırıcılığına uyum sağlar.', details: ['Etkinlik bağlamı', 'Format ve hedef kitle', 'Katılım özeti', 'Kayıt veya materyallerin bağlantıları'] },
    ],
  },
  fr: {
    research: [
      { id: 'acafor', title: 'Acafor — Recherche en prévision académique', kind: 'Recherche', description: 'Réservé au projet de recherche Acafor. Les détails vérifiés, la méthodologie et les résultats seront publiés ici à mesure que le projet progressera.', details: ['Périmètre et objectifs du projet', 'Méthodologie et sources de données', 'Principaux résultats et contributions', 'Historique des publications'] },
      { id: 'research-2', title: 'Notice de recherche — Emplacement 2', kind: 'Recherche', description: 'Réservé à une deuxième notice de recherche. Articles académiques, notes de travail et autres productions de recherche vérifiées peuvent y figurer.', details: ['Citation et résumé', 'Contexte de la recherche', 'Lien vers la publication ou le preprint', 'Visuel optionnel'] },
    ],
    projects: [
      { id: 'acapoll', title: 'Acapoll — Plateforme de sondage académique', kind: 'Projet', description: 'Réservé au projet Acapoll. Cette carte affichera le résumé du projet, des aperçus d’interface et les principaux résultats lorsque les détails vérifiés seront disponibles.', details: ['Vue d’ensemble et objectifs du projet', 'Approche technique', 'Résultats et statut actuel', 'Visuel : capture d’interface ou schéma'] },
      { id: 'project-2', title: 'Projet appliqué — Emplacement 2', kind: 'Projet', description: 'Emplacement pour un deuxième projet appliqué. Chaque carte peut inclure un résumé, des métadonnées, des liens et une image optionnelle.', details: ['Contexte du projet', 'Méthodologie appliquée', 'Résultats et livrables', 'Liens vers les livrables'] },
      { id: 'project-3', title: 'Projet appliqué — Emplacement 3', kind: 'Projet', description: 'Emplacement pour une troisième notice de projet. La grille s’étend automatiquement à mesure que des notices sont ajoutées.', details: ['Contexte du projet', 'Méthodologie principale', 'Livrables et résultats', 'Matériaux associés'] },
    ],
    events: [
      { id: 'event-1', title: 'Séminaire ou panel — Emplacement 1', kind: 'Événement', description: 'Réservé à un séminaire, atelier ou panel documenté. Chaque notice d’événement peut inclure une image, une date, un lieu et un résumé.', details: ['Titre et format de l’événement', 'Date et lieu', 'Sujet et rôle de participation', 'Photographie ou visuel optionnel'] },
      { id: 'event-2', title: 'Événement — Emplacement 2', kind: 'Événement', description: 'Emplacement pour une deuxième notice d’événement. Le format s’adapte aux conférences, interventions invitées, panels publics ou animation d’ateliers.', details: ['Contexte de l’événement', 'Format et public', 'Résumé de la participation', 'Liens vers l’enregistrement ou les supports'] },
    ],
  },
}

function PlaceholderCard({ entry, replaceLabel, fieldsLabel, placeholderLabel }: { entry: (typeof PORTFOLIO_SECTIONS.en.research)[0]; replaceLabel: string; fieldsLabel: string; placeholderLabel: string }) {
  return (
    <article id={entry.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', minWidth: 0, scrollMarginTop: 96 }}>
      <div style={{ minHeight: 160, background: 'linear-gradient(145deg, #F3F0EA 0%, #FFFFFF 52%, #ECE8E0 100%)', borderBottom: '1px solid #E7E0D3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 24 }}>
        <div aria-hidden="true" style={{ position: 'absolute', width: 120, height: 120, border: '1px solid rgba(176,141,69,0.25)', borderRadius: '50%', right: -30, top: -40 }} />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" style={{ marginBottom: 8 }}>
            <rect x="2.5" y="4.5" width="23" height="19" rx="1" stroke="#B08D45" /><circle cx="9" cy="10" r="2" stroke="#B08D45" /><path d="M5 20l6-6 4 4 3-3 5 5" stroke="#0B1F33" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: 'Inter, sans-serif', color: '#6A747D', fontSize: 10, lineHeight: 1.5 }}>{replaceLabel}</div>
        </div>
      </div>
      <div style={{ padding: '28px 26px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#B08D45', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{entry.kind}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#6A747D', border: '1px solid #D8CEBD', padding: '3px 7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{placeholderLabel}</span>
        </div>
        <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 19, lineHeight: 1.25, color: '#0B1F33', margin: '0 0 12px' }}>{entry.title}</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.75, color: '#6A747D', margin: '0 0 22px' }}>{entry.description}</p>
        <div style={{ borderTop: '1px solid #E7E0D3', paddingTop: 17 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, fontWeight: 700, color: '#0B1F33', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 9 }}>{fieldsLabel}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
            {entry.details.map(detail => (
              <li key={detail} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.55, color: '#1E2328' }}>
                <span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#B08D45', flexShrink: 0, marginTop: 7 }} />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(280px, 1.1fr)', gap: 40, alignItems: 'end', marginBottom: 30 }} className="portfolio-section-head">
      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 13 }}>
          <span style={{ width: 30, height: 2, backgroundColor: '#B08D45' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 700, color: '#B08D45', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{eyebrow}</span>
        </div>
        <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(25px, 3vw, 34px)', lineHeight: 1.2, color: '#0B1F33', margin: 0 }}>{title}</h2>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#6A747D', margin: 0 }}>{body}</p>
    </div>
  )
}

export default function PortfolioClient() {
  const { lang } = useLanguage()
  const L = COPY[lang]
  const sections_data = PORTFOLIO_SECTIONS[lang]
  const sections = [
    { label: L.research, href: '/portfolio#research', number: '01' },
    { label: L.projects, href: '/portfolio#projects', number: '02' },
    { label: L.events, href: '/portfolio#events', number: '03' },
  ]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.eyebrow }]} />

      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 58px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)', gap: 64, alignItems: 'end' }} className="portfolio-hero">
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#B08D45', letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: 18 }}>{L.eyebrow}</div>
            <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(36px, 5.5vw, 62px)', lineHeight: 1.08, color: '#0B1F33', letterSpacing: '-0.025em', margin: '0 0 22px' }}>{L.heading}</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15.5, lineHeight: 1.8, color: '#6A747D', margin: 0, maxWidth: 680 }}>{L.intro}</p>
          </div>
          <nav aria-label={L.jump} style={{ borderTop: '1px solid #E7E0D3' }}>
            {sections.map(item => (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '15px 2px', borderBottom: '1px solid #E7E0D3', color: '#0B1F33', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{item.label}</span>
                <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 11, color: '#B08D45' }}>{item.number} ↓</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section id="research" style={{ padding: '64px 32px', scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <SectionHeader eyebrow={L.research} title={L.researchTitle} body={L.researchIntro} />
          <div className="portfolio-grid two" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
            {sections_data.research.map(entry => <PlaceholderCard key={entry.id} entry={entry} replaceLabel={L.replace} fieldsLabel={L.fields} placeholderLabel={L.placeholder} />)}
          </div>
        </div>
      </section>

      <section id="projects" style={{ padding: '64px 32px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', borderBottom: '1px solid #E7E0D3', scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <SectionHeader eyebrow={L.projects} title={L.projectsTitle} body={L.projectsIntro} />
          <div className="portfolio-grid three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18 }}>
            {sections_data.projects.map(entry => <PlaceholderCard key={entry.id} entry={entry} replaceLabel={L.replace} fieldsLabel={L.fields} placeholderLabel={L.placeholder} />)}
          </div>
        </div>
      </section>

      <section id="events" style={{ padding: '64px 32px', scrollMarginTop: 76 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <SectionHeader eyebrow={L.events} title={L.eventsTitle} body={L.eventsIntro} />
          <div className="portfolio-grid two" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
            {sections_data.events.map(entry => <PlaceholderCard key={entry.id} entry={entry} replaceLabel={L.replace} fieldsLabel={L.fields} placeholderLabel={L.placeholder} />)}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#0B1F33', padding: '56px 32px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div className="portfolio-media" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: 54, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: '#B08D45', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 13 }}>{L.mediaLabel}</div>
              <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 28, lineHeight: 1.2, color: '#FFFFFF', margin: '0 0 15px' }}>{L.mediaTitle}</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.75, color: '#A8B4BE', margin: 0 }}>{L.mediaBody}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.85fr', gap: 10, minHeight: 230 }}>
              <div role="img" aria-label={L.imageSlot} style={{ backgroundColor: 'rgba(255,253,248,0.06)', border: '1px solid rgba(176,141,69,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B08D45', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{L.imageSlot}</div>
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 10 }}>
                {[1, 2].map(item => <div key={item} role="img" aria-label={L.imageSlot} style={{ backgroundColor: 'rgba(255,253,248,0.04)', border: '1px solid rgba(255,253,248,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A8B4BE', fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{L.imageSlot}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-hero, .portfolio-media { grid-template-columns: 1fr !important; }
          .portfolio-hero { gap: 36px !important; }
          .portfolio-grid.three { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 700px) {
          .portfolio-section-head, .portfolio-grid.two, .portfolio-grid.three { grid-template-columns: 1fr !important; }
          .portfolio-section-head { gap: 14px !important; }
        }
      `}</style>
    </div>
  )
}
