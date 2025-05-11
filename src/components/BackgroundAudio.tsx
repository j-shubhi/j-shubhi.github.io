import { useEffect, useState } from 'react';
import { FaMusic } from 'react-icons/fa';

function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio('/assets/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 1.0; 
    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={toggleAudio} style={{ position: 'fixed', bottom: '16px', right: '90px', padding: '8px', backgroundColor: isPlaying ? '#FF69B4' : '#FF0000', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', fontSize: '28px' }}>
        <FaMusic />
      </button>
    </div>
  );
}

export default BackgroundAudio;