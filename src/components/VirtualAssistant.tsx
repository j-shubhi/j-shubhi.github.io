import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight } from 'lucide-react';

interface Message {
  text: string;
  links?: { text: string; href: string }[];
}

const messages: Message[] = [
  {
    text: "Hi! I'm Luna, Shubhi's virtual assistant. How can I help you today?",
    links: [
      { text: "View Portfolio", href: "#portfolio" },
      { text: "Contact Shubhi", href: "#contact" },
      { text: "Learn More", href: "#about" }
    ]
  },
  {
    text: "Shubhi specializes in UI/UX design with 8+ years of experience. Would you like to see her work?",
    links: [
      { text: "View Projects", href: "#portfolio" },
      { text: "Check Skills", href: "#skills" }
    ]
  },
  {
    text: "Looking to collaborate? Shubhi is always excited to work on innovative projects!",
    links: [
      { text: "Get in Touch", href: "#contact" }
    ]
  }
];

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-white rounded-lg shadow-xl p-4 w-72"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-3">{messages[currentMessage].text}</p>
                <div className="space-y-2">
                  {messages[currentMessage].links?.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={nextMessage}
              className="mt-4 text-xs text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ChevronRight className="w-3 h-3 mr-1" />
              Next Tip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}