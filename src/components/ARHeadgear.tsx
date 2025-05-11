import React, { useState, useEffect, useRef } from 'react';

const ARHeadgear = () => {
  const [selectedFilter, setSelectedFilter] = useState('wizard');
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true); // New state for camera toggle
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => setVideoStream(stream))
        .catch(err => console.error('Error accessing webcam:', err));
    } else {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
      }
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]); // Depend on isCameraOn

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const filters = {
    wizard: '/assets/images/wizard_hat.png',
    hacker: '/assets/images/hacker_helmet.png',
    astronaut: '/assets/images/astronaut_helmet.png',
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex justify-center items-center">
        {videoStream && (
          <video
            autoPlay
            playsInline
            muted
            className="absolute w-full h-full object-cover"
            ref={videoRef}
          />
        )}
        <img
          src={filters[selectedFilter]}
          alt="AR Filter"
          className="absolute w-96 -top-0"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {Object.keys(filters).map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg ${selectedFilter === filter ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`px-4 py-2 rounded-lg ${isCameraOn ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
        >
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
      </div>
    </div>
  );
};

export default ARHeadgear;