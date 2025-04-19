import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VirtualAssistant from './components/VirtualAssistant';
import MRPortfolioViewer from './components/MRPortfolioViewer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
      <VirtualAssistant />
      <MRPortfolioViewer />
    </div>
  );
}

export default App;