
import React from 'react';
import { Hammer, Utensils, Briefcase, Smartphone, BarChart3, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { ServiceItem } from '../types';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services: ServiceItem[] = [
    {
      title: t.services.items[0].title,
      description: t.services.items[0].desc,
      icon: Hammer,
      highlight: false,
      type: 'contact'
    },
    {
      title: t.services.items[1].title,
      description: t.services.items[1].desc,
      icon: Utensils,
      highlight: false,
      type: 'contact'
    },
    {
      title: t.services.items[2].title,
      description: t.services.items[2].desc,
      icon: Briefcase,
      highlight: true,
      type: 'projects',
      links: [
        { label: t.services.demoHorse, url: 'https://pferdephysiotherapie-muenchen.de/' },
        { label: t.services.demoHair, url: 'https://www.artofhair-salon.com/' }
      ]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="container mx-auto px-4 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {t.services.headline} <span className="text-indigo-400">{t.services.headlineHighlight}</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              {t.services.subheadline}
            </p>
          </div>
          {/* Decorative line */}
          <div className="hidden md:block h-px flex-1 bg-slate-800 ml-12 mb-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl transition-all duration-300 border flex flex-col h-full bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div className="mb-6 inline-flex p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-indigo-200 transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              {/* Action Buttons area */}
              <div className="mt-auto flex flex-col gap-4">
                {service.type === 'projects' && service.links && (
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      {t.services.examplesLabel}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 w-full"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Link - Always visible */}
                <a href="#contact" className="inline-flex items-center text-xs font-bold text-indigo-400 uppercase tracking-wider group-hover:text-indigo-300 transition-colors py-2">
                  {t.services.requestDemo} <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Grid - Simple explanations */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-t border-b border-slate-800 bg-slate-900/20 rounded-lg overflow-hidden">
          <div className="p-8 flex flex-col items-center text-center hover:bg-slate-900/40 transition-colors">
            <Smartphone className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
            <h4 className="font-semibold text-white mb-2">{t.services.features.responsive.title}</h4>
            <p className="text-sm text-slate-400 max-w-[200px]">{t.services.features.responsive.desc}</p>
          </div>
          <div className="p-8 flex flex-col items-center text-center hover:bg-slate-900/40 transition-colors">
            <BarChart3 className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
            <h4 className="font-semibold text-white mb-2">{t.services.features.seo.title}</h4>
            <p className="text-sm text-slate-400 max-w-[200px]">{t.services.features.seo.desc}</p>
          </div>
          <div className="p-8 flex flex-col items-center text-center hover:bg-slate-900/40 transition-colors">
            <ShieldCheck className="w-8 h-8 text-slate-500 mb-4" strokeWidth={1.5} />
            <h4 className="font-semibold text-white mb-2">{t.services.features.legal.title}</h4>
            <p className="text-sm text-slate-400 max-w-[200px]">{t.services.features.legal.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;