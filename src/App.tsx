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
import ARHeadgear from './components/ARHeadgear';
import Testimonials from './components/Testimonials';
import BackgroundAudio from './components/BackgroundAudio';
import useGlobalHapticFeedback from './hooks/useGlobalHapticFeedback';

function App() {
  useGlobalHapticFeedback();

  return (
    <div className="min-h-screen bg-white">
      <BackgroundAudio />
      <SparklingCursor />
      <Navbar />
      <div className="transition-all duration-300">
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
        <section id="contact">
          <Testimonials />
        </section>
        <VirtualAssistant />
        <MRPortfolioViewer />
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
          <ARHeadgear className="max-w-screen" />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;