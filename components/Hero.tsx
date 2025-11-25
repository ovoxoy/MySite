import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background - Technical Grid & Spotlight */}
      <div className="absolute inset-0 bg-slate-950 z-0">
        <div className="absolute inset-0 bg-grid-slate [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
        {/* Subtle top spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Badge - Minimalist */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Verfügbar für neue Projekte
          </div>
          
          {/* Headline - Clear & Strong */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Ihr Partner für
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg pb-2">
              Digitales Wachstum
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Ich entwickle leistungsstarke Webseiten für Unternehmen, die Wert auf Qualität legen. 
            Maßgeschneidert, schnell und optimiert für Ihren Umsatz.
          </p>

          {/* Buttons - Solid & Professional */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <a href="#contact" className="group relative px-8 py-3.5 bg-white text-slate-950 font-semibold rounded-lg transition-all hover:bg-slate-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Kostenloses Angebot anfordern
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="px-8 py-3.5 bg-slate-900 border border-slate-800 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center">
              Leistungen ansehen
            </a>
          </div>

          {/* Trust Indicators - Clean List */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-4 animate-in fade-in duration-1000 delay-500">
            {[
              "Express Umsetzung", 
              "Persönlicher Ansprechpartner", 
              "Faires Festpreis-Angebot"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;