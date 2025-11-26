import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Header: React.FC = () => {
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

  // Use Intl.DisplayNames for proper language names
  const langName = new Intl.DisplayNames([language], { type: 'language' });

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className="w-10 h-8 bg-gradient-to-br from-indigo-800 to-blue-900 rounded flex items-center justify-center shadow-lg shadow-sky-500/20">
            <span className="text-white font-bold font-serif text-lg">MK</span>
          </div>
          <div className="text-white font-semibold text-lg tracking-tight">
            Maxim Klapf
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#" 
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            {t.nav.home}
          </a>
          <a 
            href="#services" 
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            {t.nav.services}
          </a>

          <a href="#contact" className="px-5 py-2 bg-white text-slate-950 text-sm font-semibold rounded hover:bg-slate-200 transition-colors">
            {t.nav.contact}
          </a>

          <button 
            onClick={toggleLanguage}
            aria-label="Sprache wechseln / Switch language"
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
        <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 md:hidden flex flex-col p-4 shadow-2xl">
          <a 
            href="#" 
            className="text-slate-300 hover:text-white px-4 py-4 border-b border-slate-900 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.home}
          </a>
          <a 
            href="#services" 
            className="text-slate-300 hover:text-white px-4 py-4 border-b border-slate-900 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.services}
          </a>
          <a 
            href="#contact" 
            className="mt-4 text-center w-full bg-sky-600 text-white py-3 rounded font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.contactBtn}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;