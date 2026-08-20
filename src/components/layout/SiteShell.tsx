'use client'

import { LanguageProvider, type Lang } from '@/contexts/LanguageContext'
import Header from './Header'
import Footer from './Footer'

export default function SiteShell({
  children,
  initialLang = 'en',
}: {
  children: React.ReactNode
  initialLang?: Lang
}) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <div style={{ backgroundColor: '#F7F5F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main id="main-content" className="site-main" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
