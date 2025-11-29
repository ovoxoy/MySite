import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Legal from './components/Legal';
import CookieBanner from './components/CookieBanner';
import { PageView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
        <Header 
          onNavigate={(view) => setCurrentView(view)} 
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
              onBack={() => setCurrentView('home')} 
            />
          )}
        </main>
        
        <Footer onNavigate={(view) => setCurrentView(view)} />
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}

export default App;