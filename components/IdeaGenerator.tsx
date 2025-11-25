import React, { useState } from 'react';
import { generateWebConcept } from '../services/geminiService';
import { WebConcept, LoadingState } from '../types';
import { Sparkles, Loader2, LayoutTemplate, Lightbulb, ArrowRight, Wand2 } from 'lucide-react';

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
    <section id="idea-generator" className="py-24 bg-slate-950 relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
       
       <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Input */}
          <div className="w-full lg:w-5/12 pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              AI Powered Design
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Keine Idee? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Frag die KI.</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Meine integrierte KI analysiert dein Business und erstellt in Sekunden ein erstes Konzept für Struktur und Marketing-Texte.
            </p>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="group relative">
                <input
                  id="name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-transparent"
                />
                <label htmlFor="name" className="absolute left-4 top-4 text-slate-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-indigo-400 pointer-events-none">
                  Name deines Unternehmens
                </label>
              </div>

              <div className="group relative">
                <input
                  id="type"
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-transparent"
                />
                <label htmlFor="type" className="absolute left-4 top-4 text-slate-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-indigo-400 pointer-events-none">
                  Branche (z.B. Pizzeria)
                </label>
              </div>

              <button
                type="submit"
                disabled={loadingState === LoadingState.LOADING || !businessName || !businessType}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loadingState === LoadingState.LOADING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analysiere Daten...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Konzept generieren
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Output Interface */}
          <div className="w-full lg:w-7/12">
             <div className="glass-panel rounded-2xl border border-slate-800/50 overflow-hidden min-h-[500px] flex flex-col relative shadow-2xl">
                
                {/* Interface Header */}
                <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-slate-950/50 rounded text-[10px] font-mono text-slate-500">
                    concept-generator-v2.tsx
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-8 relative">
                    
                    {/* Placeholder */}
                    {loadingState === LoadingState.IDLE && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
                        <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 animate-pulse">
                          <LayoutTemplate className="w-10 h-10 text-indigo-400" />
                        </div>
                        <p className="text-slate-400 font-light">Warte auf Input...</p>
                      </div>
                    )}

                    {/* Loading Animation */}
                    {loadingState === LoadingState.LOADING && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm z-20">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                          </div>
                        </div>
                        <p className="mt-4 text-indigo-300 font-mono text-sm animate-pulse">Generiere Inhalte...</p>
                      </div>
                    )}

                    {/* Result */}
                    {concept && loadingState === LoadingState.SUCCESS && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        
                        {/* Slogans Section */}
                        <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            Slogan Vorschläge
                          </h3>
                          <div className="grid gap-3">
                            {concept.slogans.map((slogan, i) => (
                              <div key={i} className="p-4 bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500/50 rounded-r-lg text-amber-100 font-medium italic hover:pl-6 transition-all duration-300">
                                "{slogan}"
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Structure Section */}
                        <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <LayoutTemplate className="w-4 h-4 text-blue-400" />
                            Webseiten Struktur
                          </h3>
                          <div className="bg-slate-950/50 rounded-xl border border-white/5 p-2">
                            {concept.structure.map((item, i) => (
                              <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors group cursor-default">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  {i + 1}
                                </span>
                                <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                                <div className="ml-auto w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500/50 w-2/3"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                            <a href="#contact" className="text-xs font-bold text-indigo-400 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                                Projekt anfragen <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>
                      </div>
                    )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IdeaGenerator;