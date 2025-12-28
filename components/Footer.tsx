import React from 'react';
import { useLanguage } from '../LanguageContext';
import type { PageView } from '../types';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">

          {/* Column 1: Brand (Left) */}
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-white mb-2">Maxim Klapf</div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs mx-auto md:mx-0">{t.footer.desc}</p>
          </div>

          {/* Column 2: LinkedIn (Center) */}
          <div className="flex justify-center">
            <a
              href="https://www.linkedin.com/in/maxim-klapf-36b295249/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 text-indigo-400 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all border border-slate-800 shadow-lg shadow-indigo-900/10 group"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 group-hover:stroke-indigo-400 transition-colors"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* Column 3: Legal Links (Right) */}
          <div className="flex flex-col md:items-end items-center gap-3 md:gap-1">
            <div className="flex gap-6 md:gap-4 text-sm font-medium">
              <button
                onClick={() => onNavigate('imprint')}
                className="hover:text-white transition-colors"
              >
                {t.footer.imprint}
              </button>
              <button
                onClick={() => onNavigate('privacy')}
                className="hover:text-white transition-colors"
              >
                {t.footer.privacy}
              </button>
              <span className="opacity-50 cursor-not-allowed hidden md:inline">|</span>
              <span className="opacity-50 cursor-not-allowed">{t.footer.terms}</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-900/50 w-full mb-8"></div>

        {/* Bottom Section: Copyright */}
        <div className="text-center text-xs text-slate-600">
          &copy; {currentYear} Maxim Klapf. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;