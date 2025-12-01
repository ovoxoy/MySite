import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Legal from './components/Legal';
import CookieBanner from './components/CookieBanner';
import { PageView } from './types';
import { getPathForLanguage, getCurrentPageFromUrl } from './urlUtils';

// Wrapper component to handle language-dependent side effects
const AppContent: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Initialisiere View aus URL
  const [currentView, setCurrentView] = useState<PageView>(() => {
    const page = getCurrentPageFromUrl();
    return (page === 'imprint' || page === 'privacy') ? page : 'home';
  });

  // Redirect von /de zu / (falls jemand alte URL aufruft)
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/de')) {
      const page = getCurrentPageFromUrl();
      const newPath = getPathForLanguage('de', page === 'home' ? undefined : page);
      window.history.replaceState({ lang: 'de', view: page === 'home' ? 'home' : page }, '', newPath);
    }
  }, []);

  // Handle Browser History (Back Button) und URL-Änderungen
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = getCurrentPageFromUrl();
      const view = (page === 'imprint' || page === 'privacy') ? page : 'home';
      setCurrentView(view);
    };

    // Initiale Synchronisation mit URL
    const page = getCurrentPageFromUrl();
    const view = (page === 'imprint' || page === 'privacy') ? page : 'home';
    if (view !== currentView) {
      setCurrentView(view);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  // Update Page Title based on View and Language
  useEffect(() => {
    let title = "Maxim Klapf | Webdesign";
    if (currentView === 'home') {
      title = language === 'de' 
        ? "Maxim Klapf | Webdesign Altomünster - Handwerk & Gastro" 
        : "Maxim Klapf | Web Design Altomünster - Crafts & Gastro";
    } else if (currentView === 'imprint') {
      title = t.legal.imprint.title + " | Maxim Klapf";
    } else if (currentView === 'privacy') {
      title = t.legal.privacy.title + " | Maxim Klapf";
    }
    document.title = title;
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [currentView, language, t]);

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    
    // Push new state to history mit Sprach-Präfix
    const path = getPathForLanguage(language, view === 'home' ? undefined : view);
    window.history.pushState({ lang: language, view }, '', path);
    
    if (view === 'home') {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Header 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Services />
            <Contact />
          </>
        ) : (
          <Legal 
            page={currentView} 
            onBack={() => handleNavigate('home')} 
          />
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} />
      <CookieBanner />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;