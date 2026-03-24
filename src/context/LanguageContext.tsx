'use client';
/**
 * @fileOverview Definitive Language Context implementation.
 * Handles dot-notation translation keys and site-wide persistence.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from '@/utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('fastrack-language');
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((newLang: string) => {
    setLanguageState(newLang);
    localStorage.setItem('fastrack-language', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    
    const getVal = (obj: any, path: string[]) => {
      let current = obj;
      for (const k of path) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          return null;
        }
      }
      return typeof current === 'string' ? current : null;
    };

    // 1. Try active language
    let result = getVal(translations[language], keys);

    // 2. Fallback to English
    if (!result && language !== 'en') {
      result = getVal(translations['en'], keys);
    }

    return result || key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
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
