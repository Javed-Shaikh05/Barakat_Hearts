import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PartyPoppersProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function PartyPoppers({ isVisible, onComplete }: PartyPoppersProps) {
  const [showPoppers, setShowPoppers] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowPoppers(true);
      // Hide poppers after animation completes
      const timer = setTimeout(() => {
        setShowPoppers(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!showPoppers) return null;

  const confettiColors = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", 
    "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43"
  ];

  const createConfetti = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: confettiColors[i % confettiColors.length],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{
          y: -100,
          x: 0,
          rotate: 0,
          scale: 0,
        }}
        animate={{
          y: window.innerHeight + 100,
          x: (Math.random() - 0.5) * 200,
          rotate: Math.random() * 720,
          scale: [0, 1, 0.8, 0],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 0.5,
          ease: "easeOut",
        }}
      />
    ));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {createConfetti()}
      
      {/* Sparkle effects */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            scale: 0,
            rotate: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 1,
            ease: "easeOut",
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
