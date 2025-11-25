import React from 'react';
import { Hammer, Utensils, Briefcase, Smartphone, MessageCircle, Search } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Für Handwerker",
      description: "Zeigen Sie Ihre besten Projekte. Eine klare Galerie, Vertrauens-Elemente und einfache Kontaktmöglichkeiten sorgen für neue Aufträge.",
      icon: Hammer,
      features: ["Projekt-Galerie", "Anfrage-Formular", "Google Maps Integration"]
    },
    {
      title: "Für Restaurants",
      description: "Mehr Bestellungen ohne hohe Gebühren. Digitale Speisekarte und direkte Bestellung per WhatsApp – einfach und effizient.",
      icon: Utensils,
      features: ["Digitale Speisekarte", "WhatsApp Bestell-Button", "Tischreservierung"],
      highlight: true
    },
    {
      title: "Für Dienstleister",
      description: "Werden Sie in Altomünster und Umgebung gefunden. Eine professionelle Darstellung Ihrer Leistungen schafft Vertrauen.",
      icon: Briefcase,
      features: ["Leistungsübersicht", "SEO Optimierung", "Terminbuchung (optional)"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Maßgeschneiderte Lösungen</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Egal ob Sie einen Dachdeckerbetrieb führen, eine Pizzeria betreiben oder als Freelancer arbeiten – ich habe das passende Paket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                service.highlight 
                  ? 'bg-slate-900 text-white border-slate-800 ring-4 ring-blue-500/20 shadow-2xl scale-105 md:scale-110 z-10' 
                  : 'bg-white text-slate-900 border-slate-200 hover:border-blue-200'
              }`}
            >
              {service.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Beliebt
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                service.highlight ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
                <service.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className={`mb-6 leading-relaxed ${service.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {service.title === "Für Restaurants" && i === 1 ? (
                       <MessageCircle className="w-4 h-4 text-green-400" />
                    ) : (
                       <div className={`w-1.5 h-1.5 rounded-full ${service.highlight ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                    )}
                    <span className={service.highlight ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Features Strip */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-12">
            <div className="flex flex-col items-center text-center p-4">
                <Smartphone className="w-10 h-10 text-slate-400 mb-3" />
                <h4 className="font-semibold text-slate-900">100% Responsive</h4>
                <p className="text-sm text-slate-500 mt-1">Perfekt auf Handy, Tablet & PC.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
                <Search className="w-10 h-10 text-slate-400 mb-3" />
                <h4 className="font-semibold text-slate-900">Lokales SEO</h4>
                <p className="text-sm text-slate-500 mt-1">Gefunden werden in Altomünster.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center font-bold text-slate-400 mb-3">€</div>
                <h4 className="font-semibold text-slate-900">Fairer Preis</h4>
                <p className="text-sm text-slate-500 mt-1">Festpreis ohne versteckte Kosten.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
