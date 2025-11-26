import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-white mb-2">Maxim Klapf</h4>
            <p className="text-sm">{t.footer.desc}</p>
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">{t.footer.imprint}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-600">
          &copy; {currentYear} Maxim Klapf. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;