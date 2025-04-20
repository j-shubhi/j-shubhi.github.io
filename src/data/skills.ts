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
      description: 'Creating beautiful, intuitive interfaces with Figma and modern design tools.',
      icon: Figma,
      color: '#0070F3',
      expertise: {
        years: 5,
        totalProjects: 45,
        category: 'Expert'
      },
      projects: [
        'E-commerce Design System',
        'Mobile Banking App',
        'Healthcare Dashboard'
      ]
    },
    {
      id: 2,
      name: 'UX Research',
      description: 'Conducting user research and creating data-driven design solutions.',
      icon: Code,
      color: '#6D28D9',
      expertise: {
        years: 4,
        totalProjects: 38,
        category: 'Advanced'
      },
      projects: [
        'User Testing Framework',
        'Accessibility Audit',
        'User Journey Mapping'
      ]
    },
    {
      id: 3,
      name: 'Illustration',
      description: 'Creating custom illustrations and visual assets for digital products.',
      icon: PenTool,
      color: '#F59E0B',
      expertise: {
        years: 3,
        totalProjects: 25,
        category: 'Advanced'
      },
      projects: [
        'Brand Illustration System',
        'Product Icons',
        'Marketing Visuals'
      ]
    },
    {
      id: 4,
      name: 'Branding',
      description: 'Developing cohesive brand identities and design languages.',
      icon: Palette,
      color: '#10B981',
      expertise: {
        years: 4,
        totalProjects: 30,
        category: 'Expert'
      },
      projects: [
        'Brand Guidelines',
        'Visual Identity System',
        'Marketing Materials'
      ]
    },
    {
      id: 5,
      name: 'Frontend Development',
      description: 'Building responsive and accessible user interfaces with modern frameworks.',
      icon: Layout,
      color: '#EC4899',
      expertise: {
        years: 5,
        totalProjects: 50,
        category: 'Expert'
      },
      projects: [
        'React Component Library',
        'Design System Implementation',
        'Performance Optimization'
      ]
    },
    {
      id: 6,
      name: 'Web Performance',
      description: 'Optimizing web applications for speed and user experience.',
      icon: Globe,
      color: '#14B8A6',
      expertise: {
        years: 3,
        totalProjects: 28,
        category: 'Advanced'
      },
      projects: [
        'Core Web Vitals',
        'Performance Monitoring',
        'Load Time Optimization'
      ]
    }
  ];