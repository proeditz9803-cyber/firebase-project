'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode
} from 'react'
import translations, { languageCodes } from '@/utils/translations'

type LanguageContextType = {
  language: string
  setLanguage: (code: string) => void
  t: (key: string) => string
  languageCodes: typeof languageCodes
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fastrack-language')
      if (saved && translations[saved] !== undefined) {
        setLanguageState(saved)
      }
    } catch (e) {
      console.error('Failed to read language from storage', e)
    }
  }, [])

  const setLanguage = (code: string) => {
    if (translations[code] !== undefined) {
      setLanguageState(code)
      try {
        localStorage.setItem('fastrack-language', code)
      } catch (e) {
        console.error('Failed to save language to storage', e)
      }
    }
  }

  const t = (key: string): string => {
    const currentTranslations = translations[language]
    if (currentTranslations !== undefined && currentTranslations[key] !== undefined) {
      return currentTranslations[key]
    }
    const englishTranslations = translations['en']
    if (englishTranslations !== undefined && englishTranslations[key] !== undefined) {
      return englishTranslations[key]
    }
    return key
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      languageCodes
    }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
