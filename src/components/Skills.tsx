import React, { useEffect } from 'react';
import { Skills } from '../data/skills';
import SkillCard from './SkillCard';

const SkillsSection: React.FC = () => {
  useEffect(() => {
    const handleTouchStart = () => {
      if (navigator.vibrate) {
        navigator.vibrate(50); // Simulate haptic feedback on touch
      }
    };

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card) => {
      card.addEventListener('touchstart', handleTouchStart);
    });

    return () => {
      skillCards.forEach((card) => {
        card.removeEventListener('touchstart', handleTouchStart);
      });
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my technical expertise and project experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} className="skill-card" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;