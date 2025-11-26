import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the email body
    const subject = `Neue Anfrage über Webseite von ${formData.name || 'Interessent'}`;
    const body = `Name: ${formData.name}
Telefon: ${formData.phone}
Email: ${formData.email}

Nachricht:
${formData.message}`;

    // Open default mail client
    window.location.href = `mailto:maxim.klapf@web.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-32 bg-slate-950 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Context */}
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {t.contact.headline} <span className="text-indigo-400">{t.contact.headlineHighlight}</span>
                </h2>
                <p className="text-slate-400 text-lg font-light mb-12">
                    {t.contact.subheadline}
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">{t.contact.labels.email}</h4>
                            <a href="mailto:maxim.klapf@web.de" className="text-slate-400 hover:text-white transition-colors">maxim.klapf@web.de</a>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-400">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">{t.contact.labels.phone}</h4>
                            <a 
                                href="https://wa.me/491736398022" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                +49 173 6398022
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">{t.contact.labels.office}</h4>
                            <p className="text-slate-400">Altomünster, Bayern</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.contact.labels.name}</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" 
                              placeholder={t.contact.placeholders.name} 
                              required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.contact.labels.phoneInput}</label>
                            <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" 
                              placeholder="+49..." 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.contact.labels.emailInput}</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" 
                          placeholder="name@firma.de" 
                          required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.contact.labels.message}</label>
                        <textarea 
                          rows={4} 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" 
                          placeholder={t.contact.placeholders.message}
                          required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                        {t.contact.labels.submit}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-xs text-slate-600 text-center pt-2">
                        {t.contact.labels.response}
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