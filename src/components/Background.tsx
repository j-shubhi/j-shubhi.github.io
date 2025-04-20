import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = 50;
    const colors = ['#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('scroll', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50"
        animate={{
          background: [
            'linear-gradient(to bottom right, #F3E8FF, #FFFFFF, #EEF2FF)',
            'linear-gradient(to bottom right, #EEF2FF, #F3E8FF, #FFFFFF)',
            'linear-gradient(to bottom right, #FFFFFF, #EEF2FF, #F3E8FF)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.4 }}
      />
    </div>
  );
}