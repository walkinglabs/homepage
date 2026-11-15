import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { chinese } from '@/data/chinese'

import { isLanguage, languages, type Language } from '@/data/languages'
import { translate } from '@/data/translations'
type Locale = {
  language: Language
  setLanguage: (language: Language) => void
  t: (english: string, translated?: string) => string
}

const localeKey = 'walkinglabs-language'
const LocaleContext = createContext<Locale | null>(null)

function initialLanguage(): Language {
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (isLanguage(requested)) return requested
  try {
    const saved = localStorage.getItem(localeKey)
    return isLanguage(saved) ? saved : 'en'
  } catch {
    return 'en'
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLocale] = useState(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = languages.find(option => option.value === language)?.lang ?? 'en'
  }, [language])

  function setLanguage(next: Language) {
    setLocale(next)
    try {
      localStorage.setItem(localeKey, next)
    } catch {
      // The current selection still works when storage is unavailable.
    }
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState(window.history.state, '', url)
  }

  const t = (english: string, translated?: string) =>
    language === 'zh' ? translated ?? chinese[english] ?? english : language === 'en' ? english : translate(language, english)

  return <LocaleContext.Provider value={{ language, setLanguage, t }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale requires a LocaleProvider')
  return value
}
