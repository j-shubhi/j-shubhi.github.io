import { 
    Figma, Code, PenTool, Palette,
    Layout, Server, Database, Globe,
    Sparkles, Layers
  } from 'lucide-react';
  import React from 'react';
  
  export interface Skill {
    id: number;
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    expertise: {
      years: number;
      totalProjects: number;
      category: 'Expert' | 'Advanced' | 'Intermediate';
    };
    projects: string[];
  }
  
  export const Skills: Skill[] = [
    {
      id: 1,
      name: 'UI Design',
      description: 'Creating beautiful, intuitive interfaces with Figma, Adobe Illustrator, Adobe Photoshop.',
      icon: Figma,
      color: '#0070F3',
      expertise: {
        years: 1.5,
        totalProjects: 3,
        category: 'More than Intermediate'
      },
      projects: [
        'Website Designer for start-ups',
        'Personal Site of a Professor',
        'Club Website'
      ]
    },
    {
      id: 2,
      name: 'UX Research',
      description: 'Conducting user research and creating data-driven design solutions.',
      icon: Code,
      color: '#6D28D9',
      expertise: {
        years: 2,
        totalProjects: 2,
        category: 'Intermediate'
      },
      projects: [
        'Research for IIITD infrastructure',
        'Stuble Burning effects on Delhi\'s air',
      ]
    },
    {
      id: 3,
      name: 'Illustration',
      description: 'Creating custom illustrations and visual assets for digital products.',
      icon: PenTool,
      color: '#F59E0B',
      expertise: {
        years: 1,
        totalProjects: 2,
        category: 'Beginner'
      },
      projects: [
        'Tech Council Logo',
        'IIITD buildings vector',
        'Viksit Bharat',
        'Convocation Designs'
      ]
    },
    {
      id: 4,
      name: 'Branding',
      description: 'Developing cohesive brand identities and design languages.',
      icon: Palette,
      color: '#10B981',
      expertise: {
        years: 2,
        totalProjects: 3,
        category: 'Expert'
      },
      projects: [
        'Design Summer School',
        'AI Summer School',
        'E-Summit'
      ]
    },
    {
      id: 5,
      name: 'Frontend Development',
      description: 'Building responsive and accessible user interfaces with modern frameworks.',
      icon: Layout,
      color: '#EC4899',
      expertise: {
        years: 0.5,
        totalProjects: 3,
        category: 'Intermediate'
      },
      projects: [
        'Personal Portfolio',
        'Annapravah',
        'KalaHaat'
      ]
    },
    {
      id: 6,
      name: 'Social Media Designer',
      description: 'Branding of bodies and creating social media posts.',
      icon: Globe,
      color: '#14B8A6',
      expertise: {
        years: 2,
        totalProjects: 5,
        category: 'Advanced'
      },
      projects: [
        'CyFuse',
        'HCD',
        'Bio Department',
        'Student Senate',
        'Convocation'
      ]
    }
  ];