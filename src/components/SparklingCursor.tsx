import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function SparklingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const colors = ['#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7', '#7C3AED'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setSparkles(prevSparkles => [...prevSparkles, newSparkle]);

      // Remove sparkles after they animate
      setTimeout(() => {
        setSparkles(prevSparkles => 
          prevSparkles.filter(sparkle => sparkle.id !== newSparkle.id)
        );
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        className="w-6 h-6 rounded-full mix-blend-screen"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: [1, 1.2, 1],
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        <div className="w-full h-full bg-purple-400 rounded-full blur-sm opacity-50" />
      </motion.div>

      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              x: sparkle.x,
              y: sparkle.y,
              scale: 0,
              opacity: 1
            }}
            animate={{ 
              scale: 1,
              opacity: 0
            }}
            exit={{ 
              scale: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              left: -sparkle.size / 2,
              top: -sparkle.size / 2,
              width: sparkle.size,
              height: sparkle.size,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: sparkle.color,
                boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}