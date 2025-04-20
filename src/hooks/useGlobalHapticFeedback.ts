import { useEffect } from 'react';

const useGlobalHapticFeedback = () => {
  useEffect(() => {
    const handleTouchStart = () => {
      if (navigator.vibrate) {
        navigator.vibrate(50); // Simulate haptic feedback on touch
      }
    };

    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
};

export default useGlobalHapticFeedback;