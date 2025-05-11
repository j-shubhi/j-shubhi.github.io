import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Star } from 'lucide-react';
import Papa from 'papaparse';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseSpeed = 100; // ⏩ INCREASE THIS FOR FASTER SCROLL

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
            .filter((testimonial) => testimonial.name && testimonial.text)
            .map((testimonial) => {
              const imageUrl = '/assets/images/shubhi_watermark.png';
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

  // 💫 Animate x motion value to scroll infinitely
  useAnimationFrame((t, delta) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const contentWidth = (testimonials.length * 400) * 2; // Adjust based on card width and duplication

    if (x.get() <= -contentWidth / 2) {
      x.set(0);
    } else {
      x.set(x.get() - (baseSpeed * (delta / 1000)));
    }
  });

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Client Testimonials</h2>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-6 py-4"
            style={{ x }}
          >
            {/* Duplicate testimonials to create infinite loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[90%] sm:w-[400px] bg-purple-50 rounded-xl p-6 shadow-lg mx-auto"
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
