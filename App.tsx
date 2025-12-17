
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
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

  // Handle Hash Scrolling (e.g. #contact)
  useEffect(() => {
    // Function to scroll to hash
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash && currentView === 'home') {
        // Remove # from id
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); // Small delay to ensure rendering
        }
      } else if (currentView === 'home' && !hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Run on mount and when view changes to home
    if (currentView === 'home') {
      scrollToHash();
    }
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
    // Don't do anything if we are already on the view and it's not home (to allow scrolling on home)
    if (currentView === view && view !== 'home') return;

    setCurrentView(view);

    // Safety check for sandboxed environments
    const isSandboxed =
      typeof window === 'undefined' ||
      window.location.protocol === 'blob:' ||
      window.location.protocol === 'data:' ||
      window.location.hostname === '';

    if (!isSandboxed) {
      try {
        if (view === 'home') {
          // If navigating to home, we preserve the hash if it exists in the click handler, 
          // otherwise we clean it up in the component logic
        } else {
          // Remove hash when going to legal pages
          window.history.pushState({ view }, '', `?p=${view}`);
        }
      } catch (e) {
        console.warn('Navigation history update skipped:', e);
      }
    }

    if (view !== 'home') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Header
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Services />
            <Pricing />
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
