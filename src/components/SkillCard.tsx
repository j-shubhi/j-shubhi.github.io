import React, { useRef, useState } from 'react';
import { Skill } from '../data/skills';
import { useCardTransform } from '../hooks/useCardTransform';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { style, handleMouseMove, handleMouseLeave, handleMouseEnter, handleTouchStart, handleTouchMove, handleTouchEnd } = 
    useCardTransform(cardRef);

  const circumference = 2 * Math.PI * 40; // circle radius = 40
  const offset = circumference - (skill.expertise.years / 6) * circumference;

  return (
    <div
      ref={cardRef}
      className="group relative h-96 rounded-2xl bg-white shadow-lg overflow-hidden transform transition-all duration-500 ease-out cursor-pointer"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card background with subtle gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-20"
        style={{
          background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col p-6">
        
        <div className="flex items-center mb-6">
          <div className="relative">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${skill.color}15` }}
            >
              <skill.icon className="w-10 h-10" style={{ color: skill.color }} />
            </div>
            <svg className="absolute -top-2 -left-2 w-24 h-24 rotate-[-90deg]">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke={skill.color}
                strokeWidth="4"
                fill="none"
                className="opacity-10"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke={skill.color}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="transition-all duration-1000"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: offset
                }}
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-gray-900">{skill.name}</h3>
            <div className="flex items-center mt-1">
              <span 
                className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${skill.color}15`,
                  color: skill.color
                }}
              >
                {skill.expertise.category}
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {skill.expertise.years} years
              </span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">{skill.description}</p>
        
        {/* Projects Section */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm uppercase tracking-wider text-gray-500">Key Projects</h4>
            <span 
              className="text-sm font-medium"
              style={{ color: skill.color }}
            >
              {skill.expertise.totalProjects} Total Projects
            </span>
          </div>
          <ul className={`space-y-2 transition-all duration-300 ${isExpanded ? 'max-h-48' : 'max-h-16'} overflow-hidden`}>
            {skill.projects.map((project: string, index: number) => (
              <li 
                key={index} 
                className="text-gray-800 flex items-center"
              >
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: skill.color }}></div>
                {project}
              </li>
            ))}
          </ul>
          {skill.projects.length > 2 && (
            <button
              className="text-sm mt-2 font-medium transition-colors"
              style={{ color: skill.color }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>

      {/* Shine effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white to-transparent transform transition-opacity duration-700 ease-out shine-effect" />
    </div>
  );
};

export default SkillCard;