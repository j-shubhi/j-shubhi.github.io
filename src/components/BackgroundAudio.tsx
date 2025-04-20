import React, { useEffect } from 'react';

function BackgroundAudio() {
  useEffect(() => {
    const audio = new Audio('/src/assets/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 1.0; 
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}

export default BackgroundAudio;