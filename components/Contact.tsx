import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-slate-950 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Context */}
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    Starten wir Ihr <br/>
                    <span className="text-indigo-400">nächstes Projekt.</span>
                </h2>
                <p className="text-slate-400 text-lg font-light mb-12">
                    Bereit für mehr Sichtbarkeit? Kontaktieren Sie mich für ein unverbindliches Erstgespräch. Ich analysiere Ihren Bedarf und erstelle ein passgenaues Angebot.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">E-Mail</h4>
                            <a href="mailto:kontakt@maximklapf.de" className="text-slate-400 hover:text-white transition-colors">kontakt@maximklapf.de</a>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-400">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">Telefon</h4>
                            <a href="tel:+49123456789" className="text-slate-400 hover:text-white transition-colors">+49 123 456 789</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">Büro</h4>
                            <p className="text-slate-400">Altomünster, Bayern</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800">
                <form className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Max Mustermann" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telefon</label>
                            <input type="tel" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="+49..." />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">E-Mail</label>
                        <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="name@firma.de" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nachricht</label>
                        <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Wie kann ich Ihnen helfen?"></textarea>
                    </div>

                    <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                        Nachricht senden
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-xs text-slate-600 text-center pt-2">
                        Ich melde mich in der Regel innerhalb von 24 Stunden.
                    </p>
                </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;