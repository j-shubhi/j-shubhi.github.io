import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Shubhi Jain
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-8">UI/UX Designer & Visual Artist</p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
          Crafting beautiful, intuitive digital experiences that bridge the gap between user needs and business goals.
        </p>
        <div className="space-x-4">
          <a href="#portfolio" className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
            View Portfolio
          </a>
          <a href="#contact" className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
            Contact Me
          </a>
        </div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-purple-600" />
      </a>
    </section>
  );
}