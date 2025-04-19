import React from 'react';
import { Award, Briefcase, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="src\assets\images\shubhi_edited (2).png"
              alt="Shubhi Jain"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 mb-6">
              With over 8 years of experience in digital design, I specialize in creating user-centered experiences that delight and inspire. My approach combines aesthetic excellence with functional design thinking.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Experience</h3>
                  <p className="text-gray-600">8+ years in UI/UX Design</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Recognition</h3>
                  <p className="text-gray-600">Awwwards Site of the Day</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Passion</h3>
                  <p className="text-gray-600">Creating meaningful experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}