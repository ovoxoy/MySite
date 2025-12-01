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

// Wrapper component to handle language-dependent side effects
const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const { t, language } = useLanguage();

  // Handle Browser History (Back Button)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    
    // Push new state to history
    if (view === 'home') {
      window.history.pushState({ view: 'home' }, '', '/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    } else {
      window.history.pushState({ view }, '', `?p=${view}`);
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