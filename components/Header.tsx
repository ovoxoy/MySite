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
        isScrolled || mobileMenuOpen ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-2xl tracking-tight">
          Maxim<span className="text-blue-500">Klapf</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Start</a>
          <a href="#services" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Leistungen</a>
          <a href="#contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-colors">
            Kontakt
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 md:hidden flex flex-col p-4 gap-4 shadow-xl">
          <a 
            href="#" 
            className="text-slate-300 hover:text-white py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start
          </a>
          <a 
            href="#services" 
            className="text-slate-300 hover:text-white py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Leistungen
          </a>
          <a 
            href="#contact" 
            className="text-center w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
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
