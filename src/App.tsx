import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VirtualAssistant from './components/VirtualAssistant';
import MRPortfolioViewer from './components/MRPortfolioViewer';
import Navbar from './components/Navbar';
import SparklingCursor from './components/SparklingCursor';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <SparklingCursor />
      <Navbar />
      <div className="ml-20 transition-all duration-300">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
        <VirtualAssistant />
        <MRPortfolioViewer />
      </div>
    </div>
  );
}

export default App;