import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Info Side */}
          <div className="p-10 md:w-2/5 bg-blue-600 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Kontaktieren Sie mich</h3>
              <p className="text-blue-100 mb-8">
                Bereit für Ihre neue Webseite? Schreiben Sie mir oder rufen Sie an. Wir finden die perfekte Lösung für Ihr Budget.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-200 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Maxim Klapf</h4>
                    <p className="text-blue-100 text-sm">Altomünster, Bayern</p>
                  </div>
                </div>
                
                <a href="mailto:kontakt@maximklapf.de" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <Mail className="w-6 h-6 text-blue-200 shrink-0" />
                  <span className="font-medium">kontakt@maximklapf.de</span>
                </a>

                <a href="tel:+49123456789" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <Phone className="w-6 h-6 text-blue-200 shrink-0" />
                  <span className="font-medium">+49 123 456 789</span>
                </a>
              </div>
            </div>

            {/* Decor */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          </div>

          {/* Form Side */}
          <div className="p-10 md:w-3/5 bg-slate-800">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                  <input type="text" id="c-name" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ihr Name" />
                </div>
                <div>
                  <label htmlFor="c-phone" className="block text-sm font-medium text-slate-400 mb-2">Telefon</label>
                  <input type="tel" id="c-phone" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Für Rückruf" />
                </div>
              </div>
              
              <div>
                <label htmlFor="c-email" className="block text-sm font-medium text-slate-400 mb-2">E-Mail</label>
                <input type="email" id="c-email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="ihre@email.de" />
              </div>

              <div>
                <label htmlFor="c-message" className="block text-sm font-medium text-slate-400 mb-2">Nachricht</label>
                <textarea id="c-message" rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Erzählen Sie mir kurz von Ihrem Projekt..."></textarea>
              </div>

              <button type="button" className="w-full bg-white text-slate-900 font-bold py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Nachricht senden
              </button>
              <p className="text-xs text-slate-500 text-center mt-4">
                Ihre Daten werden vertraulich behandelt.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
