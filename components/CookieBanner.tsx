"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { ShieldCheck, X } from 'lucide-react';

const GOOGLE_TAG_ID = 'G-M9JRS109CN';

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prüfen, ob bereits eine Entscheidung getroffen wurde
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Verzögerung auf 3.5 Sekunden erhöht für bessere Lighthouse Performance
      const timer = setTimeout(() => setIsVisible(true), 3500);
      return () => clearTimeout(timer);
    } else if (consent === 'granted') {
      loadGoogleScripts();
    }
  }, []);

  const loadGoogleScripts = () => {
    // Verhindert doppeltes Laden
    if (document.getElementById('google-analytics-script')) return;

    // 1. Google Tag Manager Script laden
    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
    document.head.appendChild(script);

    // 2. Konfiguration initialisieren
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_TAG_ID}');
    `;
    document.head.appendChild(inlineScript);

    console.log("Google Scripts geladen.");
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    setIsVisible(false);
    loadGoogleScripts();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-6 md:flex items-center gap-6 ring-1 ring-white/10">

        <div className="flex-grow space-y-2 mb-4 md:mb-0">
          <div className="flex items-center gap-2 text-white font-semibold text-lg">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <h3>{t.cookie.title}</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t.cookie.text}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
          <button
            onClick={handleDecline}
            className="px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            {t.cookie.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/20 transition-all active:scale-95 text-sm"
          >
            {t.cookie.accept}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookieBanner;