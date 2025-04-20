import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, Mail, Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { icon: Home, label: 'Home', href: '#', id: 'hero' },
    { icon: User, label: 'About', href: '#about', id: 'about' },
    { icon: Briefcase, label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { icon: Code, label: 'Skills', href: '#skills', id: 'skills' },
    { icon: Mail, label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="fixed left-0 top-0 h-full bg-white shadow-lg flex flex-col items-center py-8 z-50"
      animate={{
        width: isExpanded ? '200px' : '80px',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-purple-100 transition-colors mb-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-6 h-6 text-purple-600" />
        </motion.div>
      </motion.button>

      <div className="space-y-6 w-full px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              className={`flex items-center group rounded-xl p-2 transition-colors ${
                isActive ? 'bg-purple-100' : 'hover:bg-purple-50'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-2 rounded-xl ${isActive ? 'text-purple-600' : 'text-gray-600 group-hover:text-purple-600'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    className={`ml-2 ${isActive ? 'text-purple-600 font-medium' : 'text-gray-600 group-hover:text-purple-600'}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute left-0 w-1 h-8 bg-purple-600 rounded-r-full"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
}