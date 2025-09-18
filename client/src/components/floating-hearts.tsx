import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const hearts = [
    { id: 1, top: "10%", left: "10%", size: "text-2xl", delay: 0 },
    { id: 2, top: "20%", right: "15%", size: "text-lg", delay: 1 },
    { id: 3, top: "60%", left: "5%", size: "text-xl", delay: 2 },
    { id: 4, top: "70%", right: "10%", size: "text-sm", delay: 3 },
    { id: 5, top: "40%", left: "80%", size: "text-lg", delay: 4 },
    { id: 6, top: "85%", left: "60%", size: "text-2xl", delay: 5 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute ${heart.size} text-romantic-heart opacity-20`}
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: heart.delay,
          }}
          data-testid={`floating-heart-${heart.id}`}
        >
          <Heart className="fill-current" />
        </motion.div>
      ))}
    </div>
  );
}
