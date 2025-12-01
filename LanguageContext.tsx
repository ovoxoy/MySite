import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';
import { getLanguageFromPath, getPathForLanguage, getCurrentPageFromUrl, type Language } from './urlUtils';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.de;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialisiere Sprache aus URL
  const [language, setLanguageState] = useState<Language>(() => getLanguageFromPath());

  // Synchronisiere Sprache mit URL beim Laden und bei URL-Änderungen
  useEffect(() => {
    const updateLanguageFromUrl = () => {
      const langFromUrl = getLanguageFromPath();
      if (langFromUrl !== language) {
        setLanguageState(langFromUrl);
      }
    };

    // Initiale Prüfung
    updateLanguageFromUrl();

    // Listener für URL-Änderungen (z.B. Browser Back/Forward)
    window.addEventListener('popstate', updateLanguageFromUrl);
    return () => window.removeEventListener('popstate', updateLanguageFromUrl);
  }, [language]);

  // Setter, der auch die URL aktualisiert
  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      const currentPage = getCurrentPageFromUrl();
      const newPath = getPathForLanguage(lang, currentPage === 'home' ? undefined : currentPage);
      window.history.pushState({ lang }, '', newPath);
      setLanguageState(lang);
    }
  };

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