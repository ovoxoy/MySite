import React, { useState } from 'react';
import { generateWebConcept } from '../services/geminiService';
import { WebConcept, LoadingState } from '../types';
import { Sparkles, Loader2, LayoutTemplate, Lightbulb } from 'lucide-react';

const IdeaGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [concept, setConcept] = useState<WebConcept | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !businessType) return;

    setLoadingState(LoadingState.LOADING);
    setConcept(null);

    try {
      const result = await generateWebConcept(businessName, businessType);
      setConcept(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Input */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                AI Powered
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Noch keine Idee? <br/>
              Lassen Sie sich inspirieren.
            </h2>
            <p className="text-slate-600 mb-8">
              Nutzen Sie meine integrierte KI, um einen ersten Entwurf für die Struktur und Slogans Ihrer neuen Webseite zu erstellen. Kostenlos und sofort.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name Ihres Unternehmens</label>
                <input
                  id="name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="z.B. Bäckerei Müller"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Branche / Tätigkeit</label>
                <input
                  id="type"
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="z.B. Handwerk, Restaurant, Friseur"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loadingState === LoadingState.LOADING || !businessName || !businessType}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loadingState === LoadingState.LOADING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generiere Konzept...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Konzept erstellen
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Output */}
          <div className="w-full lg:w-1/2">
             <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden min-h-[400px] flex flex-col relative">
                
                {/* Placeholder State */}
                {loadingState === LoadingState.IDLE && (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                    <LayoutTemplate className="w-16 h-16 mb-4 opacity-20" />
                    <p>Geben Sie Ihre Daten ein, um einen Vorschlag zu sehen.</p>
                  </div>
                )}

                {/* Loading State */}
                {loadingState === LoadingState.LOADING && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <p className="text-indigo-900 font-medium">Die KI arbeitet für Sie...</p>
                  </div>
                )}

                {/* Error State */}
                {loadingState === LoadingState.ERROR && (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-red-500">
                    <p>Hoppla, da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut.</p>
                  </div>
                )}

                {/* Success Content */}
                {concept && loadingState === LoadingState.SUCCESS && (
                  <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        Slogan Ideen
                      </h3>
                      <div className="space-y-3">
                        {concept.slogans.map((slogan, i) => (
                          <div key={i} className="p-3 bg-amber-50 text-amber-900 rounded-lg text-sm border-l-4 border-amber-400 italic">
                            "{slogan}"
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                        <LayoutTemplate className="w-5 h-5 text-blue-500" />
                        Vorschlag Seitenstruktur
                      </h3>
                      <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                        <ul className="space-y-2">
                          {concept.structure.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-400">
                                {i + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                      <p className="text-sm text-slate-500 mb-2">Gefällt Ihnen dieser Ansatz?</p>
                      <a href="#contact" className="text-indigo-600 font-semibold hover:underline">
                        Jetzt unverbindlich anfragen &rarr;
                      </a>
                    </div>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IdeaGenerator;
