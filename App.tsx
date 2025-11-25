import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import IdeaGenerator from './components/IdeaGenerator';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        {/* The AI feature highlights modern web capabilities */}
        <IdeaGenerator /> 
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
