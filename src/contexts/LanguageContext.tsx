'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'en' | 'tr' | 'fr'
export const LANGS: Lang[] = ['en', 'tr', 'fr']

export function loc(
  value: Partial<Record<Lang, string>> | string | null | undefined,
  lang: Lang,
): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.en || value.tr || value.fr || ''
}

export function pick<T>(map: Partial<Record<Lang, T>> & { en: T }, lang: Lang): T {
  return (map[lang] ?? map.en) as T
}

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
})

function setCookieLang(l: Lang) {
  try {
    document.cookie = `ae-lang=${l};path=/;max-age=31536000;SameSite=Lax`
  } catch {}
}

export function LanguageProvider({
  children,
  initialLang = 'en',
}: {
  children: ReactNode
  initialLang?: Lang
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Migration: on first mount, read any existing localStorage preference and promote
  // it to a cookie so the server can render the correct language on the next reload.
  // If localStorage differs from the server-supplied initialLang, update state immediately
  // so the correct language is shown without waiting for a reload.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ae-lang')
      if (saved === 'en' || saved === 'tr' || saved === 'fr') {
        setCookieLang(saved as Lang)
        if (saved !== initialLang) setLangState(saved as Lang)
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('ae-lang', l) } catch {}
    setCookieLang(l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
