
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from './types.ts';

interface DesktopNavItemProps {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onClick: (id: string) => void;
}

export function DesktopNavItem({ 
  item, 
  isActive, 
  isExpanded, 
  onClick 
}: DesktopNavItemProps) {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      className={`flex items-center relative group rounded-xl p-2 transition-colors ${
        isActive ? 'bg-purple-100' : 'hover:bg-purple-50'
      }`}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.id);
      }}
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

interface MobileNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: (id: string) => void;
}

export function MobileNavItem({ 
  item, 
  isActive, 
  onClick 
}: MobileNavItemProps) {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      className="flex flex-col relative items-center justify-center py-2"
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.id);
      }}
    >
      <div className={`p-1 rounded-lg ${isActive ? 'bg-purple-100' : ''}`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
        {item.label}
      </span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 w-6 sm:w-8 h-1 bg-purple-600 rounded-t-full"
          layoutId="mobileActiveIndicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
}