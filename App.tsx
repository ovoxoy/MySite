
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { PageView } from './types';

// Lazy load non-critical components to reduce initial bundle size
const Legal = lazy(() => import('./components/Legal'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));

// Wrapper component to handle language-dependent side effects
const AppContent: React.FC = () => {
  // Initialize view based on URL query parameter to support direct linking/refresh
  const [currentView, setCurrentView] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('p');
      if (page === 'imprint' || page === 'privacy') {
        return page;
      }
    }
    return 'home';
  });

  const { t, language } = useLanguage();

  // Handle Browser History (Back Button)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        // Fallback checks URL if state is null
        const params = new URLSearchParams(window.location.search);
        const page = params.get('p');
        if (page === 'imprint' || page === 'privacy') {
          setCurrentView(page);
        } else {
          setCurrentView('home');
        }
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
    
    if (view === 'home') {
      window.history.pushState({ view: 'home' }, '', '/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    } else {
      // Legal pages maintain query params
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
          <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
              <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          }>
            <Legal 
              page={currentView} 
              onBack={() => handleNavigate('home')} 
            />
          </Suspense>
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} />
      
      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
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
