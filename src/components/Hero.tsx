import React from 'react';
import { ChevronDown } from 'lucide-react';
import PingPong from './PingPong';

export default function Hero() {
  // const currentHour = new Date().getHours();
  const currentHour = 7;
  let themeClass = '';

  if (currentHour >= 6 && currentHour < 12) {
    themeClass = 'bg-gradient-to-br from-yellow-50 to-orange-50'; // Morning 6-11
  } else if (currentHour >= 12 && currentHour < 18) {
    themeClass = 'bg-gradient-to-br from-blue-50 to-indigo-50'; // Afternoon 12-17
  } else {
    themeClass = 'bg-gradient-to-br from-gray-800 to-black text-white'; // Night 18-5
  }

  return (
    <section className={`min-h-screen flex items-center justify-center relative ${themeClass}`}>
      <PingPong />
      <div className="text-center px-4 relative z-10 pointer-events-none">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Shubhi Jain
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-8">UI/UX Designer & Visual Artist</p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
          Crafting beautiful, intuitive digital experiences that bridge the gap between user needs and business goals.
        </p>
        <div className="space-x-4">
          <a href="#portfolio" className="pointer-events-auto bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
            View My Work
          </a>
          <a href="#contact" className="pointer-events-auto border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
            Contact Me
          </a>
        </div>
      </div>
      <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 pointer-events-auto">
        <ChevronDown className="w-8 h-8 text-purple-600" />
      </a>
    </section>
  );
}