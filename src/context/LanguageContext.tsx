'use client';
/**
 * @fileOverview Global Language Context for FasTrack.
 * Provides current language state and translation functions to the entire app.
 * Optimized with server-safe initialization and robust window guards.
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
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fastrack-language');
      if (saved && (translations as any)[saved]) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = useCallback((lang: string) => {
    if (typeof window === 'undefined') return;
    setLanguageState(lang);
    localStorage.setItem('fastrack-language', lang);
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

    // 1. Try current language
    const currentLangDict = (translations as any)[language];
    let result = getVal(currentLangDict, keys);

    // 2. Fallback to English
    if (result === null && language !== 'en') {
      const englishDict = (translations as any)['en'];
      result = getVal(englishDict, keys);
    }

    // 3. Final fallback: return the key itself
    return result !== null ? result : key;
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
