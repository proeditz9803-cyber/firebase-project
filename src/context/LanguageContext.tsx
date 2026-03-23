'use client';
/**
 * @fileOverview Global Language Context for FasTrack.
 * Provides current language state and translation functions to the entire app.
 * Optimized with server-safe initialization and robust window guards.
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
  // Always initialize with default 'en' for SSR stability
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Only access browser APIs in useEffect
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fastrack-language');
        if (saved) setLanguageState(saved);
      } catch (e) {
        console.warn('Failed to read language from localStorage', e);
      }
    }
  }, []);

  const setLanguage = (lang: string) => {
    if (typeof window === 'undefined') return;
    
    setLanguageState(lang);
    try {
      localStorage.setItem('fastrack-language', lang);
    } catch (e) {
      console.warn('Failed to save language to localStorage', e);
    }
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let current: any = (translations as any)[language] || translations['en'];
    
    for (const k of keys) {
      if (current && current[k]) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback: any = (translations as any)['en'];
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
