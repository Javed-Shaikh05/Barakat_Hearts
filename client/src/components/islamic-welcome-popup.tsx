import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import RosePetals from "@/components/rose-petals";

export default function IslamicWelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);

  const islamicGreetings = [
    {
      greeting: "Assalamu Alaikum, my beloved! ✨",
      message: "Subhan Allah, you look absolutely gorgeous today."
    },
    {
      greeting: "Mashallah, you're glowing! 🌟", 
      message: "Your beauty radiates from your pure heart."
    },
    {
      greeting: "Assalamu Alaikum, my queen! 💎",
      message: "Allah has blessed me with the most beautiful wife."
    },
    {
      greeting: "Barakallahu fiki, habibi! 🌸",
      message: "Your smile brightens my day like the morning sun."
    },
    {
      greeting: "Alhamdulillah for you! ✨",
      message: "You are truly a gift from Allah to my heart."
    }
  ];

  const [currentGreeting] = useState(() => 
    islamicGreetings[Math.floor(Math.random() * islamicGreetings.length)]
  );

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Rose petals falling effect */}
          <RosePetals isVisible={isVisible} count={15} />
          
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[55] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="islamic-welcome-popup"
          >
          <motion.div
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 md:p-8 max-w-sm md:max-w-md w-full text-center relative border-2 border-emerald-200 shadow-2xl"
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            data-testid="welcome-popup-content"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800 transition-colors"
              data-testid="button-close-welcome"
            >
              <X className="w-5 h-5" />
            </button>
            
            <motion.div 
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 3
              }}
            >
              <Sparkles className="text-white text-2xl" />
            </motion.div>
            
            <motion.h2 
              className="text-xl md:text-2xl font-bold text-emerald-800 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {currentGreeting.greeting}
            </motion.h2>
            
            <motion.p 
              className="text-emerald-700 text-base md:text-lg mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {currentGreeting.message}
            </motion.p>

            <motion.div 
              className="flex items-center justify-center mb-6 text-emerald-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Heart className="w-4 h-4 mx-2 fill-current animate-pulse" />
              <span className="text-lg font-arabic">وَبَارَكَ اللَّهُ لَكَ</span>
              <Heart className="w-4 h-4 mx-2 fill-current animate-pulse" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Button 
                onClick={handleClose}
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-emerald-700 hover:scale-105 shadow-lg"
                data-testid="button-continue"
              >
                <Heart className="mr-2 w-4 h-4" />
                JazakAllahu Khairan
              </Button>
            </motion.div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}