"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from './translations';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.de;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Beim Start: Prüfen ob ?lang=en in der URL steht
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('lang') === 'en' ? 'en' : 'de';
    }
    return 'de';
  });

  // 2. Funktion zum Ändern der Sprache inkl. URL-Update
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);

      if (lang === 'en') {
        url.searchParams.set('lang', 'en');
      } else {
        url.searchParams.delete('lang'); // Bei Deutsch entfernen wir den Parameter (Standard)
      }

      // URL aktualisieren ohne die Seite neu zu laden
      window.history.pushState({}, '', url.toString());
    }
  };

  // 3. Auf Browser-Zurück-Button reagieren (wenn man zurück navigiert)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') === 'en' ? 'en' : 'de';
      setLanguageState(urlLang);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};