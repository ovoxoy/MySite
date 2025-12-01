import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { PageView } from '../types';

interface HeaderProps {
  onNavigate: (view: PageView) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Optimization: Only update state if value changes to avoid re-renders
      const shouldBeScrolled = window.scrollY > 20;
      setIsScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate('home');
    setMobileMenuOpen(false);
    
    // Small delay to allow View change to propagate before scrolling
    setTimeout(() => {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
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
          <button 
            onClick={() => handleNavClick('top')} 
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Zurück zum Start"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-sky-500/10 border border-white/5 bg-slate-900">
              <img 
                src="/favicon.png" 
                alt="Maxim Klapf Logo" 
                width="40"
                height="40"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight group-hover:text-indigo-200 transition-colors">
              Maxim Klapf
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('top')}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:text-white"
            >
              {t.nav.home}
            </button>
            <button 
              onClick={() => handleNavClick('services')}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:text-white"
            >
              {t.nav.services}
            </button>

            <button 
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2 bg-white text-slate-950 text-sm font-semibold rounded hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {t.nav.contact}
            </button>

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
            <button 
              className="text-left text-slate-300 hover:text-white px-6 py-4 border-b border-slate-900 transition-colors active:bg-slate-900"
              onClick={() => handleNavClick('top')}
            >
              {t.nav.home}
            </button>
            <button 
              className="text-left text-slate-300 hover:text-white px-6 py-4 border-b border-slate-900 transition-colors active:bg-slate-900"
              onClick={() => handleNavClick('services')}
            >
              {t.nav.services}
            </button>
            <div className="p-4">
              <button 
                className="w-full text-center bg-sky-600 text-white py-3 rounded font-semibold active:bg-sky-700 transition-colors"
                onClick={() => handleNavClick('contact')}
              >
                {t.nav.contactBtn}
              </button>
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