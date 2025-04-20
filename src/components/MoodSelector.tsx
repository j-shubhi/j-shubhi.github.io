import React from 'react';
import { motion } from 'framer-motion';

interface MoodSelectorProps {
  currentMood: 'happy' | 'neutral' | 'sad';
  onMoodChange: (mood: 'happy' | 'neutral' | 'sad') => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodChange }) => {
  const moods = [
    { type: 'happy', emoji: '😊', label: 'Happy Panda' },
    { type: 'neutral', emoji: '😐', label: 'Neutral Panda' },
    { type: 'sad', emoji: '😢', label: 'Sad Panda' }
  ] as const;

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <h3 className="text-xl font-medium text-gray-700">How's the panda feeling?</h3>
      <div className="flex gap-4">
        {moods.map(({ type, emoji, label }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              currentMood === type 
                ? 'bg-blue-100 shadow-lg scale-110' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => onMoodChange(type)}
            aria-label={label}
          >
            <span className="text-4xl">{emoji}</span>
            <span className="text-sm font-medium text-gray-600">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;