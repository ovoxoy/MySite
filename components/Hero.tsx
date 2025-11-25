import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden pb-20 pt-32 lg:pt-40">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 z-0">
         <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl"></div>
         <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Jetzt Web-Präsenz sichern
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Webseiten, die <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">funktionieren</span>.
            <br />
            <span className="text-slate-400 text-3xl md:text-5xl">Aus Altomünster.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Ich bin Maxim Klapf. Ich erstelle professionelle, kostengünstige Webseiten für Handwerker, Restaurants und lokale Unternehmen. Schnell, lokal und persönlich.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
              Kostenloses Angebot
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#services" className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all border border-slate-700 flex items-center justify-center">
              Leistungen ansehen
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Optimiert für Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>WhatsApp Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>SEO Basis-Setup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
