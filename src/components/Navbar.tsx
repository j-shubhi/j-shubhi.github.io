import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, Mail, Menu, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  id: string;
};

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
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

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <motion.nav
        className="fixed left-0 top-0 h-full bg-white shadow-lg flex-col items-center py-8 z-50 hidden md:flex"
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

        <div className="space-y-6 w-full px-4">
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

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white shadow-lg z-50 md:hidden">
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

      {/* Mobile Menu Toggle Button (only shown when needed) */}
      <button
        className="fixed top-4 right-4 p-2 rounded-full bg-white shadow-md z-50 md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-purple-600" />
        ) : (
          <Menu className="w-6 h-6 text-purple-600" />
        )}
      </button>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="space-y-8 w-full px-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-center text-xl p-4 rounded-xl ${
                      isActive ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNavClick}
                  >
                    <Icon className="w-7 h-7 mr-4" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type NavItemProps = {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
};

function DesktopNavItem({ item, isActive, isExpanded, onClick }: NavItemProps) {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      className={`flex items-center group rounded-xl p-2 transition-colors ${
        isActive ? 'bg-purple-100' : 'hover:bg-purple-50'
      }`}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
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
}

type MobileNavItemProps = {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
};

function MobileNavItem({ item, isActive, onClick }: MobileNavItemProps) {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      className="flex flex-col items-center justify-center py-2"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <div className={`p-1 rounded-lg ${isActive ? 'bg-purple-100' : ''}`}>
        <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
        {item.label}
      </span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 w-8 h-1 bg-purple-600 rounded-t-full"
          layoutId="mobileActiveIndicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
}