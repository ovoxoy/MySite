import React from 'react';
import { Hammer, Utensils, Briefcase, Smartphone, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.items[0].title,
      description: t.services.items[0].desc,
      icon: Hammer,
      highlight: false
    },
    {
      title: t.services.items[1].title,
      description: t.services.items[1].desc,
      icon: Utensils,
      highlight: true
    },
    {
      title: t.services.items[2].title,
      description: t.services.items[2].desc,
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
                    {t.services.headline} <span className="text-indigo-400">{t.services.headlineHighlight}</span>
                </h2>
                <p className="text-slate-400 text-lg font-light">
                    {t.services.subheadline}
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
                {t.services.more} <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Grid - Simple explanations */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-t border-b border-slate-800 bg-slate-900/20">
            <div className="p-8 flex flex-col items-center text-center">
                <Smartphone className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
                <h4 className="font-semibold text-white mb-2">{t.services.features.responsive.title}</h4>
                <p className="text-sm text-slate-400">{t.services.features.responsive.desc}</p>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
                <BarChart3 className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
                <h4 className="font-semibold text-white mb-2">{t.services.features.seo.title}</h4>
                <p className="text-sm text-slate-400">{t.services.features.seo.desc}</p>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
                <ShieldCheck className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
                <h4 className="font-semibold text-white mb-2">{t.services.features.legal.title}</h4>
                <p className="text-sm text-slate-400">{t.services.features.legal.desc}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;