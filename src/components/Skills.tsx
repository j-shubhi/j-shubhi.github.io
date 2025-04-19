import React from 'react';
import { Figma, Code, PenTool, Palette } from 'lucide-react';

const skills = [
  {
    name: 'UI Design',
    level: 95,
    icon: Figma,
  },
  {
    name: 'UX Research',
    level: 90,
    icon: Code,
  },
  {
    name: 'Illustration',
    level: 85,
    icon: PenTool,
  },
  {
    name: 'Branding',
    level: 88,
    icon: Palette,
  },
];

export default function Skills() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 mt-2 inline-block">{skill.level}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}