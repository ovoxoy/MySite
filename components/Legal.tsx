import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { PageView } from '../types';

interface LegalProps {
  page: PageView;
  onBack: () => void;
}

const Legal: React.FC<LegalProps> = ({ page, onBack }) => {
  const { t } = useLanguage();

  // Scroll to top when opening legal pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = page === 'imprint' ? t.legal.imprint : t.legal.privacy;

  return (
    <div className="pt-32 pb-20 bg-slate-950 min-h-screen text-slate-300">
      <div className="container mx-auto px-4 max-w-3xl">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.nav.home}
        </button>

        <article className="prose prose-invert prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">{content.title}</h1>
          
          {page === 'imprint' ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{t.legal.imprint.tmg}</h2>
                <p>
                  {t.legal.imprint.name}<br />
                  {t.legal.imprint.address}<br />
                  {t.legal.imprint.zipCity}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{t.legal.imprint.contactTitle}</h2>
                <p>
                  {t.legal.imprint.phone}<br />
                  {t.legal.imprint.email}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{t.legal.imprint.taxTitle}</h2>
                <p>{t.legal.imprint.smallBusiness}</p>
                {/* <p>{t.legal.imprint.taxId}</p> */} 
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{t.legal.imprint.contentResp}</h2>
                <p>
                  {t.legal.imprint.name}<br />
                  {t.legal.imprint.address}<br />
                  {t.legal.imprint.zipCity}
                </p>
              </div>

              <div className="pt-8 border-t border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">{t.legal.imprint.disputeTitle}</h3>
                <p className="text-sm text-slate-400">{t.legal.imprint.disputeText}</p>
                
                <h3 className="text-lg font-semibold text-white mb-2 mt-4">{t.legal.imprint.liabilityTitle}</h3>
                <p className="text-sm text-slate-400">{t.legal.imprint.liabilityText}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <p className="lead text-lg">{t.legal.privacy.intro}</p>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.legal.privacy.controllerTitle}</h3>
                <p>{t.legal.privacy.controllerText}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.legal.privacy.hostingTitle}</h3>
                <p>{t.legal.privacy.hostingText}</p>
              </div>

              <div>
                 <h3 className="text-xl font-semibold text-white mb-2">{t.legal.privacy.securityTitle}</h3>
                 <p>{t.legal.privacy.securityText}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.legal.privacy.formspreeTitle}</h3>
                <p>{t.legal.privacy.formspreeText}</p>
              </div>

               <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.legal.privacy.toolsTitle}</h3>
                <p>{t.legal.privacy.toolsText}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.legal.privacy.rightsTitle}</h3>
                <p>{t.legal.privacy.rightsText}</p>
              </div>
              
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-400 mt-8">
                Hinweis: Diese Datenschutzerklärung ist eine Muster-Vorlage basierend auf den von Ihnen angegebenen Tools. Für eine rechtsverbindliche Absicherung wenden Sie sich bitte an einen Anwalt oder nutzen Sie einen zertifizierten Generator (z.B. e-recht24.de).
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Legal;