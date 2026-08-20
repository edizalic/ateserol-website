'use client'

import Link from 'next/link'
import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const arrow = (
  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path d="M7 1l2.5 2.5L7 6M1 3.5h8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const T = {
  en: {
    breadcrumbHome: 'Home', breadcrumbContact: 'Contact',
    eyebrow: 'Get in Touch', heading: 'Contact',
    subheading: 'For academic collaboration, research enquiries, or questions about teaching and course material.',
    role: 'Lecturer',
    privacyNote: 'Contact details are shared on request through institutional channels. No general inbox is listed here.',
    enquiryTypesEyebrow: 'What this page is for', enquiryTypesHeading: 'Enquiry Types',
    note: "No contact form is provided. This is a deliberate choice: a contact form implies a general inbox. Institutional contact details are available through the relevant institution's directory. For all other enquiries, the pages linked above are the appropriate starting point.",
    items: [
      { heading: 'Academic Collaboration', body: 'Research collaboration, joint projects, or academic exchange. See the Research page for current lines of inquiry and the Projects page for applied work.', link: { label: 'Research', href: '/portfolio#research' } },
      { heading: 'Teaching & Course Material', body: 'Questions about course content, teaching frameworks, or the educational philosophy behind course design. The presentations archive shows what is currently available.', link: { label: 'Presentations', href: '/presentations' } },
      { heading: 'Project Enquiries', body: 'The Portfolio page contains reserved records for Acafor, Acapoll, and future applied projects. Verified project details can be added there as they become available.', link: { label: 'Projects', href: '/portfolio#projects' } },
      { heading: 'About Ateş Erol', body: 'Academic background, teaching identity, and current roles. The About page contains the relevant professional context.', link: { label: 'About', href: '/about' } },
    ],
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa', breadcrumbContact: 'İletişim',
    eyebrow: 'İletişime Geçin', heading: 'İletişim',
    subheading: 'Akademik iş birliği, araştırma sorguları veya öğretim ve ders materyalleri hakkındaki sorular için.',
    role: 'Öğretim Görevlisi',
    privacyNote: 'İletişim bilgileri kurumsal kanallar aracılığıyla talep üzerine paylaşılmaktadır. Burada genel bir gelen kutusu yer almamaktadır.',
    enquiryTypesEyebrow: 'Bu sayfa ne için', enquiryTypesHeading: 'Sorgulama Türleri',
    note: 'Burada iletişim formu bulunmamaktadır. Bu bilinçli bir tercihtir: iletişim formu genel bir gelen kutusunu ima eder. Kurumsal iletişim bilgilerine ilgili kurumun rehberi aracılığıyla ulaşılabilir. Diğer tüm sorular için yukarıda bağlantısı verilen sayfalar uygun başlangıç noktasıdır.',
    items: [
      { heading: 'Akademik İş Birliği', body: 'Araştırma iş birliği, ortak projeler veya akademik değişim. Mevcut araştırma hatları için Araştırma sayfasına, uygulamalı çalışmalar için Projeler sayfasına bakınız.', link: { label: 'Araştırmalar', href: '/portfolio#research' } },
      { heading: 'Öğretim ve Ders Materyali', body: 'Ders içeriği, öğretim çerçeveleri veya ders tasarımının arkasındaki eğitim felsefesi hakkındaki sorular. Sunumlar arşivi şu anda erişilebilir olan içerikleri gösterir.', link: { label: 'Sunumlar', href: '/presentations' } },
      { heading: 'Proje Sorguları', body: 'Portfolyo sayfasında Acafor, Acapoll ve gelecekteki uygulamalı projeler için ayrılmış kayıtlar bulunur. Doğrulanmış proje bilgileri hazır oldukça buraya eklenebilir.', link: { label: 'Projeler', href: '/portfolio#projects' } },
      { heading: 'Ateş Erol Hakkında', body: 'Akademik geçmiş, öğretim kimliği ve mevcut roller. Hakkında sayfası ilgili mesleki bağlamı içermektedir.', link: { label: 'Hakkında', href: '/about' } },
    ],
  },
  fr: {
    breadcrumbHome: 'Accueil', breadcrumbContact: 'Contact',
    eyebrow: 'Prendre contact', heading: 'Contact',
    subheading: 'Pour une collaboration académique, des questions de recherche, ou des interrogations sur l’enseignement et les supports de cours.',
    role: 'Enseignant',
    privacyNote: 'Les coordonnées sont communiquées sur demande par les canaux institutionnels. Aucune boîte de réception générale n’est indiquée ici.',
    enquiryTypesEyebrow: 'À quoi sert cette page', enquiryTypesHeading: 'Types de demandes',
    note: 'Aucun formulaire de contact n’est proposé. C’est un choix délibéré : un formulaire implique une boîte de réception générale. Les coordonnées institutionnelles sont disponibles dans l’annuaire de l’établissement concerné. Pour toute autre demande, les pages liées ci-dessus constituent le point de départ approprié.',
    items: [
      { heading: 'Collaboration académique', body: 'Collaboration de recherche, projets conjoints ou échanges académiques. Consultez la page Recherche pour les axes actuels et la page Projets pour le travail appliqué.', link: { label: 'Recherche', href: '/portfolio#research' } },
      { heading: 'Enseignement et supports de cours', body: 'Questions sur le contenu des cours, les cadres pédagogiques ou la philosophie éducative derrière la conception des cours. L’archive des présentations montre ce qui est actuellement disponible.', link: { label: 'Présentations', href: '/presentations' } },
      { heading: 'Demandes de projet', body: 'La page Portfolio contient des notices réservées pour Acafor, Acapoll et de futurs projets appliqués. Les détails vérifiés pourront y être ajoutés à mesure qu’ils seront disponibles.', link: { label: 'Projets', href: '/portfolio#projects' } },
      { heading: 'À propos d’Ateş Erol', body: 'Parcours académique, identité pédagogique et fonctions actuelles. La page À propos fournit le contexte professionnel pertinent.', link: { label: 'À propos', href: '/about' } },
    ],
  },
}

export default function ContactClient() {
  const { lang } = useLanguage()
  const L = T[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Breadcrumb items={[{ label: L.breadcrumbHome, href: '/' }, { label: L.breadcrumbContact }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '72px 32px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
            <span style={{ display: 'block', width: 32, height: 1.5, backgroundColor: '#B08D45' }} />
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, color: '#0B1F33', margin: '0 0 16px', lineHeight: 1.12, letterSpacing: '-0.01em' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A747D', lineHeight: 1.8, margin: 0 }}>{L.subheading}</p>
        </div>
      </section>

      <section style={{ padding: '56px 32px', backgroundColor: '#FFFFFF' }}>
        <div className="contact-grid" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E7E0D3', border: '1px solid #E7E0D3' }}>
          <div style={{ backgroundColor: '#0B1F33', padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 400 }}>
            <div>
              <div style={{ width: 56, height: 56, border: '1.5px solid #B08D45', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                <span style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#B08D45', letterSpacing: '0.05em' }}>AE</span>
              </div>
              <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 28, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>Ateş Erol</h2>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A8B4BE', marginBottom: 32, lineHeight: 1.5 }}>{L.role}</div>
            </div>
            <div style={{ marginTop: 36, paddingTop: 20, borderTop: '1px solid rgba(255,253,248,0.08)' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', lineHeight: 1.7 }}>{L.privacyNote}</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '52px 48px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{L.enquiryTypesEyebrow}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0B1F33', margin: '0 0 28px', lineHeight: 1.2 }}>{L.enquiryTypesHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {L.items.map((item, i, arr) => (
                <div key={item.heading} style={{ padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid #F0EBE2' : 'none' }}>
                  <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 6 }}>{item.heading}</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.7, margin: '0 0 10px' }}>{item.body}</p>
                  <Link href={item.link.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.link.label} {arrow}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E0D3', padding: '40px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="8" cy="8" r="6.5" stroke="#B08D45" strokeWidth="1.2" />
            <line x1="8" y1="7" x2="8" y2="11" stroke="#B08D45" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="5" r="0.7" fill="#B08D45" />
          </svg>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', lineHeight: 1.75, margin: 0 }}>{L.note}</p>
        </div>
      </section>

      <style>{`@media (max-width: 767px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
