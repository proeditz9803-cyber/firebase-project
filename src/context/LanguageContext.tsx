'use client';
/**
 * @fileOverview Global Language Context for FasTrack.
 * Provides current language state and translation functions to the entire app.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '@/utils/translations';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('fastrack-language');
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('fastrack-language', lang);
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let current: any = (translations as any)[language] || translations['en'];
    
    for (const k of keys) {
      if (current && current[k]) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback: any = translations['en'];
        for (const fk of keys) {
           if (fallback && fallback[fk]) fallback = fallback[fk];
           else return key; // Final fallback
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    return typeof current === 'string' ? current : key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
