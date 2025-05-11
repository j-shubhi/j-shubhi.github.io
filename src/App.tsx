import { useState } from 'react';
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
// import ARHeadgear from './components/ARHeadgear';
import Testimonials from './components/Testimonials';
import BackgroundAudio from './components/BackgroundAudio';
import useGlobalHapticFeedback from './hooks/useGlobalHapticFeedback';
import MoodSelector from './components/MoodSelector';
import PandaAnimation from './components/PandaAnimation';
import './styles/panda.css';

function App() {
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');

  useGlobalHapticFeedback();

  return (
    <div className="min-h-screen bg-white">
      
      <SparklingCursor />
      <Navbar />
      <div className="transition-all duration-300">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg mb-16 flex flex-col items-center">
          <MoodSelector currentMood={mood} onMoodChange={setMood} />
          <div className="w-full flex justify-center items-center">
            <PandaAnimation mood={mood} />
          </div>
        </div>
        
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
        <VirtualAssistant mood="happy" />
        
        <MRPortfolioViewer />
        {/* <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
          <ARHeadgear />
        </div> */}
        <Footer />
        <BackgroundAudio />
      </div>
    </div>
  );
}

export default App;