
import React from 'react';
import { Check, Sparkles, RefreshCw, Server } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Pricing: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-10 bg-slate-950 relative border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        {t.pricing.headline} <span className="text-indigo-400">{t.pricing.headlineHighlight}</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-light leading-relaxed">
                        {t.pricing.subheadline}
                    </p>
                    <p className="text-indigo-400 font-medium mt-2">
                        {t.pricing.hostingHighlight}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* Website Card - Highlighted */}
                    <div className="relative group p-8 rounded-2xl bg-slate-900 border border-indigo-500/30 flex flex-col shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-24 h-24 text-indigo-500 rotate-12" />
                        </div>

                        <div className="mb-4 inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider w-fit">
                            Best Seller
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.web.title}</h3>
                        <p className="text-slate-400 text-sm mb-6 h-10">{t.pricing.web.desc}</p>

                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold text-white tracking-tight">{t.pricing.web.price}</span>
                            <span className="text-slate-500 text-sm">{t.pricing.oneTime}</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {t.pricing.web.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="#contact" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-center transition-colors shadow-lg shadow-indigo-900/20">
                            {t.pricing.cta}
                        </a>
                    </div>

                    {/* Maintenance Card */}
                    <div className="relative group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/60 transition-all duration-300 flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <RefreshCw className="w-24 h-24 text-slate-500 -rotate-12" />
                        </div>

                        <div className="mb-4 inline-flex px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-semibold uppercase tracking-wider w-fit">
                            Service
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.updates.title}</h3>
                        <p className="text-slate-400 text-sm mb-6 h-10">{t.pricing.updates.desc}</p>

                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold text-white tracking-tight">{t.pricing.updates.price}</span>
                            <span className="text-slate-500 text-sm">{t.pricing.perOrder}</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {t.pricing.updates.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <Check className="w-5 h-5 text-slate-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="#contact" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium rounded-lg text-center transition-colors border border-slate-700">
                            {t.pricing.cta}
                        </a>
                    </div>

                    {/* Hosting Card */}
                    <div className="relative group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/60 transition-all duration-300 flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Server className="w-24 h-24 text-slate-500 rotate-12" />
                        </div>

                        <div className="mb-4 inline-flex px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-semibold uppercase tracking-wider w-fit">
                            Abo
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.hosting.title}</h3>
                        <p className="text-slate-400 text-sm mb-6 h-10">{t.pricing.hosting.desc}</p>

                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold text-white tracking-tight">{t.pricing.hosting.price}</span>
                            <span className="text-slate-500 text-sm">{t.pricing.perMonth}</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {t.pricing.hosting.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <Check className="w-5 h-5 text-slate-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="#contact" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium rounded-lg text-center transition-colors border border-slate-700">
                            {t.pricing.cta}
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Pricing;
