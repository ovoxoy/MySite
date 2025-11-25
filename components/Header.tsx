import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold font-serif text-lg">M</span>
          </div>
          <div className="text-white font-semibold text-lg tracking-tight">
            Maxim Klapf
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Start', 'Leistungen'].map((item) => (
            <a 
              key={item}
              href={`#${item === 'Start' ? '' : item.toLowerCase()}`} 
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 bg-white text-slate-950 text-sm font-semibold rounded hover:bg-slate-200 transition-colors">
            Kontakt
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 md:hidden flex flex-col p-4 shadow-2xl">
          <a 
            href="#" 
            className="text-slate-300 hover:text-white px-4 py-4 border-b border-slate-900 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start
          </a>
          <a 
            href="#services" 
            className="text-slate-300 hover:text-white px-4 py-4 border-b border-slate-900 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Leistungen
          </a>
          <a 
            href="#contact" 
            className="mt-4 text-center w-full bg-indigo-600 text-white py-3 rounded font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kontakt aufnehmen
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;