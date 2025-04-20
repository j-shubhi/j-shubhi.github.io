import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function PingPong() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerBounds, setContainerBounds] = useState({ width: 0, height: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  
  const ballX = useMotionValue(0);
  const ballY = useMotionValue(0);
  const ballVelocityX = useRef(5);
  const ballVelocityY = useRef(5);
  
  const paddleX = useMotionValue(0);
  const paddleY = useMotionValue(0);
  
  const springPaddleX = useSpring(paddleX, { stiffness: 1000, damping: 50 });
  const springPaddleY = useSpring(paddleY, { stiffness: 1000, damping: 50 });
  
  const ballScale = useTransform(
    ballY,
    [0, containerBounds.height],
    [1, 0.8]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    
    const bounds = containerRef.current.getBoundingClientRect();
    setContainerBounds({ width: bounds.width, height: bounds.height });
    
    const handleResize = () => {
      const newBounds = containerRef.current?.getBoundingClientRect();
      if (newBounds) {
        setContainerBounds({ width: newBounds.width, height: newBounds.height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    
    let animationFrameId: number;
    
    const updateBall = () => {
      const currentX = ballX.get();
      const currentY = ballY.get();
      const paddlePosition = springPaddleX.get();
      
      // Ball collision with walls
      if (currentX <= 0 || currentX >= containerBounds.width - 20) {
        ballVelocityX.current *= -1;
      }
      
      // Ball collision with ceiling
      if (currentY <= 0) {
        ballVelocityY.current *= -1;
      }
      
      // Ball collision with paddle
      if (currentY >= containerBounds.height - 40) {
        if (currentX >= paddlePosition - 50 && currentX <= paddlePosition + 50) {
          ballVelocityY.current *= -1;
          setScore(prev => prev + 1);
        } else {
          setGameStarted(false);
          setScore(0);
          return;
        }
      }
      
      ballX.set(currentX + ballVelocityX.current);
      ballY.set(currentY + ballVelocityY.current);
      
      animationFrameId = requestAnimationFrame(updateBall);
    };
    
    animationFrameId = requestAnimationFrame(updateBall);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStarted, containerBounds]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    
    paddleX.set(Math.max(50, Math.min(x, containerBounds.width - 50)));
    paddleY.set(y);
  };

  const startGame = () => {
    if (gameStarted) return;
    
    ballX.set(containerBounds.width / 2);
    ballY.set(50);
    ballVelocityX.current = 7;
    ballVelocityY.current = 7;
    setGameStarted(true);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onClick={startGame}
    >
      {!gameStarted && (
        <div className="absolute top-12 right-0 text-right pr-4">
          <p className="text-xl text-purple-600 mb-2">Click anywhere to start</p>
          <p className="text-sm text-gray-500">Use your mouse to control the paddle</p>
        </div>
      )}
      
      <motion.div
        className="absolute w-5 h-5 bg-purple-600 rounded-full"
        style={{
          x: ballX,
          y: ballY,
          scale: ballScale,
        }}
      />
      
      <motion.div
        className="absolute h-2 w-24 bg-purple-600 rounded-full shadow-lg"
        style={{
          x: springPaddleX,
          y: containerBounds.height - 20,
        }}
      />
      
      <div className="absolute top-4 right-4 text-2xl font-bold text-purple-600">
        {score}
      </div>
    </div>
  );
}