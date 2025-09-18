import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, Star } from "lucide-react";

export default function IslamicCounter() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2024-01-21T00:00:00");
    
    const updateCounter = () => {
      const now = new Date();
      const timeDiff = now.getTime() - targetDate.getTime();
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const CounterCard = ({ value, label, icon: Icon }: { value: number, label: string, icon: any }) => (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-xl border border-emerald-100"
      data-testid={`counter-${label.toLowerCase()}`}
    >
      <div className="flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <div className="text-2xl md:text-4xl font-bold text-emerald-800 mb-2 min-h-[3rem] md:min-h-[4rem] flex items-center justify-center">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-emerald-600 font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8" data-testid="islamic-counter">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-emerald-800 mb-3">
          ✨ Our Beautiful Journey ✨
        </h1>
        <p className="text-emerald-700 text-sm md:text-lg mb-2">
          Counting Every Blessed Moment Since
        </p>
        <p className="text-emerald-600 font-medium text-lg md:text-xl">
          21st January 2024
        </p>
        <div className="flex items-center justify-center mt-3 text-emerald-600">
          <Heart className="w-4 h-4 mx-1 fill-current animate-pulse" />
          <span className="text-sm mx-2">بِسْمِ ٱللَّٰهِ</span>
          <Heart className="w-4 h-4 mx-1 fill-current animate-pulse" />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <CounterCard
          value={timeElapsed.days}
          label="Days"
          icon={Calendar}
        />
        <CounterCard
          value={timeElapsed.hours}
          label="Hours"
          icon={Star}
        />
        <CounterCard
          value={timeElapsed.minutes}
          label="Minutes"
          icon={Heart}
        />
        <CounterCard
          value={timeElapsed.seconds}
          label="Seconds"
          icon={Star}
        />
      </div>

      <motion.div
        className="text-center mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="text-emerald-800 font-medium mb-2">
          الحمد لله رب العالمين
        </div>
        <p className="text-emerald-700 text-sm md:text-base">
          "And among His signs is that He created for you mates from among yourselves, 
          that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
        </p>
        <div className="text-emerald-600 text-sm mt-2 font-medium">
          - Quran 30:21
        </div>
      </motion.div>
    </div>
  );
}