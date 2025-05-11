import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, Mail, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavItem } from './types.ts';
import { DesktopNavItem, MobileNavItem } from './NavItem.tsx';

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', href: '#hero', id: 'hero' },
    { icon: User, label: 'About', href: '#about', id: 'about' },
    { icon: Briefcase, label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { icon: Code, label: 'Skills', href: '#skills', id: 'skills' },
    { icon: Mail, label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    
    // Scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });

      return () => observer.disconnect();
    };

    return observeElements();
  }, []);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40 md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <MobileNavItem 
              key={item.label}
              item={item}
              isActive={activeSection === item.id}
              onClick={handleNavClick}
            />
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <motion.nav
        className="fixed left-0 top-0 h-full bg-white shadow-lg z-40 !hidden md:!flex flex-col items-center justify-start py-8"
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
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </motion.div>
        </motion.button>

        <div className="space-y-5 w-full px-3">
          {navItems.map((item) => (
            <DesktopNavItem 
              key={item.label}
              item={item}
              isActive={activeSection === item.id}
              isExpanded={isExpanded}
              onClick={handleNavClick}
            />
          ))}
        </div>
      </motion.nav>
    </>
  );
}