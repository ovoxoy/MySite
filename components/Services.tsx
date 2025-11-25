import React from 'react';
import { Hammer, Utensils, Briefcase, Smartphone, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Handwerk & Bau",
      description: "Überzeugen Sie Bauherren mit professionellen Referenzen. Digitale Anfrageformulare reduzieren Ihren Büroaufwand.",
      icon: Hammer,
      highlight: false
    },
    {
      title: "Gastronomie",
      description: "Moderne Speisekarten und direkte WhatsApp-Bestellungen. Sparen Sie sich die Provisionen der Lieferdienste.",
      icon: Utensils,
      highlight: true
    },
    {
      title: "Dienstleistung",
      description: "Zeigen Sie Expertise. Perfekt für Kanzleien, Praxen und Berater, die seriös und kompetent auftreten wollen.",
      icon: Briefcase,
      highlight: false
    }
  ];

  return (
    <section id="services" className="py-32 bg-slate-950 relative border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    Lösungen für Ihr <span className="text-indigo-400">Business</span>
                </h2>
                <p className="text-slate-400 text-lg font-light">
                    Keine Baukästen, keine Kompromisse. Handgefertigtes Webdesign mit Fokus auf Performance und Sichtbarkeit.
                </p>
            </div>
            {/* Decorative line */}
            <div className="hidden md:block h-px flex-1 bg-slate-800 ml-12 mb-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group relative p-8 rounded-xl transition-all duration-300 border flex flex-col h-full ${
                service.highlight 
                  ? 'bg-slate-900/80 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="mb-6 inline-flex p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-indigo-200 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              <div className="flex items-center text-xs font-bold text-indigo-400 uppercase tracking-wider opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Details ansehen <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Grid - Technical Look */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-t border-b border-slate-800 bg-slate-900/20">
            <div className="p-8 flex flex-col items-center text-center">
                <Smartphone className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
                <h4 className="font-semibold text-white mb-2">Responsive Design</h4>
                <p className="text-sm text-slate-400">Perfekte Darstellung auf Smartphone, Tablet und Desktop.</p>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
                <BarChart3 className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
                <h4 className="font-semibold text-white mb-2">SEO Optimiert</h4>
                <p className="text-sm text-slate-400">Technische Basis für beste Rankings bei Google.</p>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
                <ShieldCheck className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
                <h4 className="font-semibold text-white mb-2">DSGVO Konform</h4>
                <p className="text-sm text-slate-400">Rechtssichere Einbindung von Cookies und Impressum.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;