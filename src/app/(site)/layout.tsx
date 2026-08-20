import { cookies } from 'next/headers'
import SiteShell from '@/components/layout/SiteShell'
import type { Lang } from '@/contexts/LanguageContext'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const saved = cookieStore.get('ae-lang')?.value
  const initialLang: Lang = saved === 'en' || saved === 'tr' || saved === 'fr' ? saved : 'en'
  return <SiteShell initialLang={initialLang}>{children}</SiteShell>
}
