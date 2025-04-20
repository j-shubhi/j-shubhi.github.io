import { useState, useRef, useEffect, RefObject, CSSProperties } from 'react';

export const useCardTransform = (elementRef: RefObject<HTMLElement>) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const [isHovering, setIsHovering] = useState(false);
  
  // Store the touch start position
  const touchStartRef = useRef({ x: 0, y: 0 });
  
  // Apply initial perspective in useEffect to ensure server/client consistency
  useEffect(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!elementRef.current) return;
    
    const { left, top, width, height } = elementRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Calculate rotation based on mouse position (center is 0,0)
    const rotateY = 20 * (x - 0.5);
    const rotateX = -20 * (y - 0.5);

    // Update the style state
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: `
        ${-rotateY/2}px ${-rotateX/2}px 20px rgba(0, 0, 0, 0.1),
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1)
      `,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s ease-out, box-shadow 0.6s ease-out',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (!elementRef.current || e.touches.length < 1) return;
    
    // Save the initial touch position
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    
    // Start the 3D effect
    setIsHovering(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!elementRef.current || !isHovering || e.touches.length < 1) return;
    
    const { left, top, width, height } = elementRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    // Calculate movement relative to the start position
    const deltaX = touchX - touchStartRef.current.x;
    const deltaY = touchY - touchStartRef.current.y;
    
    // Convert to a relative position (0-1) within the card
    const x = (touchX - left) / width;
    const y = (touchY - top) / height;
    
    // Calculate rotation based on touch position (center is 0,0)
    // Using smaller values for touch to make it less extreme
    const rotateY = 10 * (x - 0.5);
    const rotateX = -10 * (y - 0.5);
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: `
        ${-rotateY/3}px ${-rotateX/3}px 15px rgba(0, 0, 0, 0.1),
        0 8px 12px -3px rgba(0, 0, 0, 0.1),
        0 3px 5px -3px rgba(0, 0, 0, 0.1)
      `,
    });
  };

  const handleTouchEnd = () => {
    // Reset the card to its original state
    handleMouseLeave();
  };

  return {
    style,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};