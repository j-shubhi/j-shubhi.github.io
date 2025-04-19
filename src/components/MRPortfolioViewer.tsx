import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr';
import { motion } from 'framer-motion';
import { Cuboid as Cube } from 'lucide-react';

function ProjectModel({ position, project, onClick }: any) {
  return (
    <Interactive onSelect={onClick}>
      <mesh position={position}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial>
          <canvasTexture attach="map" image={project.image} />
        </meshStandardMaterial>
      </mesh>
    </Interactive>
  );
}

export default function MRPortfolioViewer() {
  const [isSupported, setIsSupported] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then(supported => {
        setIsSupported(supported);
      });
    }
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-20 right-4 z-40"
      >
        <ARButton
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Cube className="w-6 h-6" />
          <span>View in AR</span>
        </ARButton>
      </motion.div>

      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowIntro(false)}
        >
          <div className="bg-white p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Experience Portfolio in AR</h3>
            <p className="text-gray-600 mb-4">
              Point your camera at a flat surface to place and interact with 3D versions of my projects in your space.
            </p>
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => setShowIntro(false)}
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}

      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Controllers />
          {/* Projects will be placed in AR space */}
        </XR>
      </Canvas>
    </>
  );
}