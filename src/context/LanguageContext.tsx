"use client";
/**
 * @fileOverview Flat-key Language Context implementation.
 * Ensures site-wide language persistence and instant UI updates.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import translations, { languageCodes } from '@/utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languageCodes: typeof languageCodes;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');

  // Load saved language after mount to avoid SSR mismatch
  useEffect(() => {
    const saved = localStorage.getItem('fastrack-language');
    if (saved && languageCodes[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((newLang: string) => {
    if (languageCodes[newLang]) {
      setLanguageState(newLang);
      localStorage.setItem('fastrack-language', newLang);
    }
  }, []);

  /**
   * Flat-key translation function.
   * Traverses the translations object for the current language.
   * Falls back to English if key is missing.
   */
  const t = useCallback((key: string): string => {
    // 1. Try active language
    const currentLangSet = translations[language];
    if (currentLangSet && currentLangSet[key]) {
      return currentLangSet[key];
    }

    // 2. Fallback to English
    if (language !== 'en') {
      const englishSet = translations['en'];
      if (englishSet && englishSet[key]) {
        return englishSet[key];
      }
    }

    // 3. Last resort fallback to key itself
    return key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    languageCodes
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
