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
    console.log('setLanguage called with:', code)
    console.log('translations available:', Object.keys(translations))
    console.log('translation exists for code:', translations[code] !== undefined)
    
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
    let result = key

    if (currentTranslations !== undefined && currentTranslations[key] !== undefined) {
      result = currentTranslations[key]
    } else {
      const englishTranslations = translations['en']
      if (englishTranslations !== undefined && englishTranslations[key] !== undefined) {
        result = englishTranslations[key]
      }
    }

    console.log('t called with key:', key, 'language:', language, 'result:', result)
    return result
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
