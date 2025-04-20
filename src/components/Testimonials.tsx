import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Star } from 'lucide-react';
import Papa from 'papaparse';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -500; // Increased speed of scroll

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

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRx_U4JNm2ESNN8xgo9IZDszUH2gMf7kvkW6Zbu6I7ZHtX95C1ZFHgQMm3ucOTjYZTmWq6231HfGf1_/pub?output=csv');
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          const dataWithPlaceholders = result.data
            .filter((testimonial) => testimonial.name && testimonial.text) // Filter out empty boxes
            .map((testimonial) => {
              const imageUrl = '/src/assets/images/shubhi_watermark.png';

              return {
                ...testimonial,
                image: imageUrl,
              };
            });
          setTestimonials(dataWithPlaceholders);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Client Testimonials</h2>
        
        <div className="relative" ref={constraintsRef}>
          
          <motion.div
            ref={containerRef}
            className="flex gap-6 py-4"
            style={{ x }}
            animate={{
              x: [0, baseVelocity * testimonials.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
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
                  {Array.from({ length: Number(testimonial.rating) }).map((_, i) => (
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
        <div className="text-center mt-8">
          <a
            href="https://forms.gle/j7NDYeQmDhup7v4e8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Submit Your Testimonial
          </a>
        </div>
      </div>
    </section>
  );
}