import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-commerce Redesign',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
  },
  {
    id: 2,
    title: 'Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800',
    description: 'Brand identity design for a sustainable fashion company.',
  },
  {
    id: 3,
    title: 'Mobile App Design',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    description: 'Health and wellness app design focusing on user engagement and habit formation.',
  },
];

const categories = ['All', 'UI/UX', 'Branding', 'Illustration'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const { gamma, beta } = event;
      if (gamma !== null && beta !== null) {
        setDeviceTilt({ x: gamma / 90, y: beta / 90 });
      }
    };

    window.addEventListener('deviceorientation', handleDeviceMotion);
    return () => window.removeEventListener('deviceorientation', handleDeviceMotion);
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Work</h2>
        
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full ${
                activeCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-purple-100'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                className="group relative perspective-1000"
                initial={{ opacity: 0, rotateY: -15, translateZ: -100 }}
                animate={{ 
                  opacity: 1, 
                  rotateY: deviceTilt.x * 10, 
                  translateZ: deviceTilt.y * 50,
                  transition: { type: "spring", damping: 20 }
                }}
                exit={{ opacity: 0, rotateY: 15, translateZ: -100 }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <motion.div
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform-gpu"
                  animate={{
                    rotateY: hoveredId === project.id ? 5 : 0,
                    translateZ: hoveredId === project.id ? 50 : 0,
                    scale: hoveredId === project.id ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <motion.div
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-48 object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ 
                        scale: hoveredId === project.id ? 1.3 : 1.2,
                        rotate: hoveredId === project.id ? 3 : 0
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredId === project.id ? 0.2 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="p-6"
                    animate={{
                      y: hoveredId === project.id ? -5 : 0
                    }}
                  >
                    <motion.span 
                      className="text-sm text-purple-600 font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    <motion.h3 
                      className="text-xl font-bold mt-2 mb-3"
                      animate={{
                        x: hoveredId === project.id ? 10 : 0
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600"
                      animate={{
                        opacity: hoveredId === project.id ? 1 : 0.8
                      }}
                    >
                      {project.description}
                    </motion.p>
                    <motion.a 
                      href="#"
                      className="inline-flex items-center mt-4 text-purple-600 hover:text-purple-700 transform-gpu"
                      whileHover={{ x: 10, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      View Project 
                      <motion.span
                        animate={{
                          x: hoveredId === project.id ? 5 : 0
                        }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.div>
                </motion.div>

                {hoveredId === project.id && (
                  <motion.div
                    className="absolute -inset-4 bg-purple-100 rounded-xl -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}