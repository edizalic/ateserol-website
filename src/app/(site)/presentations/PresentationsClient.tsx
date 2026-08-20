'use client'

import { Breadcrumb } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

const T = {
  en: {
    home: 'Home', teaching: 'Teaching', page: 'Presentations',
    eyebrow: 'Teaching Archive',
    heading: 'Presentations & teaching materials',
    intro: 'A working archive of presentations, class notes, templates and selected teaching materials. Items are organised by course area and are added when the material is ready to be useful outside the class in which it was first used.',
    emptyEyebrow: 'Archive not yet populated',
    emptyTitle: 'Materials will be added here as they are prepared for public use.',
    emptyBody: 'I would rather publish a smaller archive that is clear and usable than fill the page with unfinished files.',
  },
  tr: {
    home: 'Ana Sayfa', teaching: 'Öğretim', page: 'Sunumlar',
    eyebrow: 'Öğretim Arşivi',
    heading: 'Sunumlar ve öğretim materyalleri',
    intro: 'Sunumlar, ders notları, şablonlar ve seçilmiş öğretim materyallerinden oluşan gelişen bir arşiv. İçerikler ders alanlarına göre düzenlenir ve ilk kullanıldıkları sınıfın dışında da yararlı olacak duruma geldiklerinde eklenir.',
    emptyEyebrow: 'Arşiv henüz oluşturulmadı',
    emptyTitle: 'Materyaller kamuya açık kullanıma hazırlandıkça burada yayımlanacaktır.',
    emptyBody: 'Sayfayı tamamlanmamış dosyalarla doldurmak yerine, açık ve kullanılabilir daha küçük bir arşiv yayımlamayı tercih ederim.',
  },
  fr: {
    home: 'Accueil', teaching: 'Enseignement', page: 'Présentations',
    eyebrow: 'Archives d’enseignement',
    heading: 'Présentations et supports d’enseignement',
    intro: 'Une archive de travail de présentations, notes de cours, modèles et supports d’enseignement sélectionnés. Les contenus sont organisés par domaine de cours et ajoutés lorsque le matériau est utile en dehors de la classe dans laquelle il a d’abord été utilisé.',
    emptyEyebrow: 'Archive pas encore constituée',
    emptyTitle: 'Les supports seront ajoutés ici à mesure qu’ils seront préparés pour un usage public.',
    emptyBody: 'Je préfère publier une archive plus petite, claire et utilisable, plutôt que de remplir la page de fichiers inachevés.',
  },
}

export default function PresentationsClient() {
  const { lang } = useLanguage()
  const L = T[lang]

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '70vh' }}>
      <Breadcrumb items={[{ label: L.home, href: '/' }, { label: L.teaching, href: '/teaching' }, { label: L.page }]} />

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '64px 32px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ width: 32, height: 2, backgroundColor: '#B08D45' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.12, color: '#0B1F33', margin: '0 0 18px' }}>{L.heading}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.8, color: '#6A747D', maxWidth: 720, margin: 0 }}>{L.intro}</p>
        </div>
      </section>

      <section style={{ padding: '56px 32px 72px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: 'clamp(32px, 7vw, 64px)', textAlign: 'center' }}>
            <div style={{ width: 36, height: 2, backgroundColor: '#B08D45', margin: '0 auto 20px' }} />
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#6A747D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{L.emptyEyebrow}</div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 'clamp(19px, 3vw, 25px)', lineHeight: 1.35, color: '#0B1F33', maxWidth: 620, margin: '0 auto 14px' }}>{L.emptyTitle}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#6A747D', maxWidth: 620, margin: '0 auto' }}>{L.emptyBody}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
