
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { PageView } from '../types';

interface HeaderProps {
  onNavigate: (view: PageView) => void;
  currentView?: PageView;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      setIsScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'de' ? 'en' : 'de';
    setLanguage(newLang);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // 1. URL Hash aktualisieren (für "Standard" Browser Verhalten Feeling)
    const isSandboxed = typeof window === 'undefined' || window.location.hostname === '';
    
    if (!isSandboxed) {
        try {
            if (target === 'top') {
                window.history.pushState({ view: 'home' }, '', window.location.pathname);
            } else {
                window.history.pushState({ view: 'home' }, '', `#${target}`);
            }
        } catch (err) {
            console.warn("History update failed", err);
        }
    }

    // 2. Navigation auslösen
    // Wenn wir nicht auf Home sind, wechselt App.tsx die View und der useEffect dort scrollt zum Hash
    // Wenn wir schon auf Home sind, scrollen wir manuell
    if (currentView !== 'home') {
        onNavigate('home');
    } else {
        if (target === 'top') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen 
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-3 shadow-sm' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#"
            onClick={(e) => handleNavClick(e, 'top')} 
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Zurück zum Start"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-sky-500/10 border border-white/5 bg-slate-900">
              <img 
                src="/icon32.png?v=5" 
                alt="Maxim Klapf Logo" 
                width="40"
                height="40"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight group-hover:text-indigo-200 transition-colors">
              Maxim Klapf
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#"
              onClick={(e) => handleNavClick(e, 'top')}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:text-white"
            >
              {t.nav.home}
            </a>
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:text-white"
            >
              {t.nav.services}
            </a>

            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-5 py-2 bg-white text-slate-950 text-sm font-semibold rounded hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {t.nav.contact}
            </a>

            <button 
              onClick={toggleLanguage}
              aria-label={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <Globe className="w-3 h-3" />
              <span className="uppercase">{language}</span>
            </button>
          </nav>
          

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              aria-label="Sprache wechseln"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300 text-xs font-medium border border-slate-700"
            >
              <span className="uppercase">{language}</span>
            </button>

            <button 
              className="text-white p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 md:hidden flex flex-col shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <a 
              href="#"
              className="text-left text-slate-300 hover:text-white px-6 py-4 border-b border-slate-900 transition-colors active:bg-slate-900"
              onClick={(e) => handleNavClick(e, 'top')}
            >
              {t.nav.home}
            </a>
            <a 
              href="#services"
              className="text-left text-slate-300 hover:text-white px-6 py-4 border-b border-slate-900 transition-colors active:bg-slate-900"
              onClick={(e) => handleNavClick(e, 'services')}
            >
              {t.nav.services}
            </a>
            <div className="p-4">
              <a 
                href="#contact"
                className="block w-full text-center bg-sky-600 text-white py-3 rounded font-semibold active:bg-sky-700 transition-colors"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                {t.nav.contactBtn}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
