import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "John Anderson",
    role: "CEO at TechCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    text: "Sarah's design work transformed our product. Her attention to detail and user-centric approach resulted in a 40% increase in user engagement.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    text: "Working with Sarah was incredible. She has a unique ability to understand and translate complex requirements into beautiful, functional designs.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Roberts",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "Sarah's portfolio speaks for itself, but what truly sets her apart is her collaborative approach and strategic thinking.",
    rating: 5
  },
  {
    id: 4,
    name: "Lisa Thompson",
    role: "Art Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    text: "The level of creativity and professionalism Sarah brings to each project is outstanding. She's now our go-to designer for all major initiatives.",
    rating: 5
  }
];

export default function Testimonials() {
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -100;

  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const resetInteractionAfterDelay = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    setIsInteracting(true);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    resetInteractionAfterDelay();
  };

  const scroll = (direction: number) => {
    setIsInteracting(true);
    if (containerRef.current) {
      const newX = x.get() + direction * 400;
      animate(x, newX, {
        type: "spring",
        stiffness: 300,
        damping: 30
      });
    }
    resetInteractionAfterDelay();
  };

  const opacity = useTransform(
    x,
    [-1000, 0, 1000],
    [0.5, 1, 0.5]
  );

  const repeatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Client Testimonials</h2>
        
        <div className="relative" ref={constraintsRef}>
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          <button
            onClick={() => scroll(1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          
          <button
            onClick={() => scroll(-1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>

          <motion.div
            ref={containerRef}
            className="flex gap-6 py-4 cursor-grab"
            style={{ x, opacity }}
            drag="x"
            dragConstraints={constraintsRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onDragEnd={handleMouseUp}
            animate={isInteracting ? undefined : {
              x: [0, baseVelocity * testimonials.length],
            }}
            transition={isInteracting ? undefined : {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[400px] bg-purple-50 rounded-xl p-6 shadow-lg"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}