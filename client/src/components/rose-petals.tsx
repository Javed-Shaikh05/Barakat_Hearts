import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface RosePetalsProps {
  isVisible?: boolean;
  count?: number;
}

export default function RosePetals({ isVisible = true, count = 12 }: RosePetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    const newPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100% across screen width
      delay: Math.random() * 2, // 0-2 seconds delay
      duration: 3 + Math.random() * 2, // 3-5 seconds duration
      size: 12 + Math.random() * 8, // 12-20px size
      rotation: Math.random() * 360, // Random rotation
    }));

    setPetals(newPetals);
  }, [isVisible, count]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -20,
            width: petal.size,
            height: petal.size,
          }}
          initial={{
            y: -20,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: petal.rotation + 180,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: petal.duration,
            },
          }}
        >
          {/* Rose petal emoji */}
          <div
            className="flex items-center justify-center text-pink-400"
            style={{ fontSize: petal.size * 0.8 }}
          >
            🌹
          </div>
        </motion.div>
      ))}
    </div>
  );
}