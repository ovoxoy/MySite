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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleNavClick('top')} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-sky-500/10 border border-white/5">
            <img 
              src="/favicon.png" 
              alt="Maxim Klapf Logo" 
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
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            {t.nav.home}
          </button>
          <button 
            onClick={() => handleNavClick('services')}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            {t.nav.services}
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2 bg-white text-slate-950 text-sm font-semibold rounded hover:bg-slate-200 transition-colors"
          >
            {t.nav.contact}
          </button>

          <button 
            onClick={toggleLanguage}
            aria-label={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
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
            className="text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 md:hidden flex flex-col p-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <button 
            className="text-left text-slate-300 hover:text-white px-4 py-4 border-b border-slate-900 transition-colors"
            onClick={() => handleNavClick('top')}
          >
            {t.nav.home}
          </button>
          <button 
            className="text-left text-slate-300 hover:text-white px-4 py-4 border-b border-slate-900 transition-colors"
            onClick={() => handleNavClick('services')}
          >
            {t.nav.services}
          </button>
          <button 
            className="mt-4 text-center w-full bg-sky-600 text-white py-3 rounded font-semibold"
            onClick={() => handleNavClick('contact')}
          >
            {t.nav.contactBtn}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;