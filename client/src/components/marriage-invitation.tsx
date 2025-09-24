import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import RosePetals from "./rose-petals";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface MarriageInvitationProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  onClose?: () => void;
}

export default function MarriageInvitation({
  brideName = "Sana",
  groomName = "Javed",
  weddingDate = "2025-10-07T10:00:00Z",
  onClose,
}: MarriageInvitationProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const targetDate = new Date(weddingDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const formatWeddingDate = () => {
    const date = new Date(weddingDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Rose petals background for this section */}
      <div className="relative">
        <RosePetals isVisible={true} count={15} />

        <motion.div
          className="bg-gradient-to-br from-white via-romantic-cream to-romantic-blush rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden border-2 border-romantic-pink border-opacity-20"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative border */}
          <div className="absolute inset-0 border-4 border-gradient-to-r from-romantic-rose to-romantic-pink rounded-3xl opacity-20"></div>

          {/* Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-2xl mb-2">🕌</div>
            <h1 className="font-serif text-2xl text-romantic-grey mb-2">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h1>
            <p className="text-sm text-romantic-grey opacity-75">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </motion.div>

          {/* Wedding Announcement */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="font-script text-xl text-romantic-rose mb-4">
              Wedding Invitation
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Heart className="text-romantic-heart fill-current w-6 h-6" />
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-romantic-grey">
                    {groomName}
                  </div>
                  <div className="font-script text-xl text-romantic-rose font-semibold my-2">
                    weds
                  </div>
                  <div className="font-serif text-3xl font-bold text-romantic-grey">
                    {brideName}
                  </div>
                </div>
                <Heart className="text-romantic-heart fill-current w-6 h-6" />
              </div>

              <p className="text-sm text-romantic-grey opacity-75 italic">
                "And among His signs is that He created for you mates from among
                yourselves, that you may dwell in tranquility with them, and He
                has put love and mercy between your hearts."
              </p>
              <p className="text-xs text-romantic-grey opacity-60">
                - Quran 30:21
              </p>
            </div>
          </motion.div>

          {/* Wedding Date */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Calendar className="text-romantic-rose w-5 h-5" />
              <span className="font-semibold text-romantic-grey">
                {formatWeddingDate()}
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-romantic-grey opacity-75">
              <Clock className="w-4 h-4" />
              <span>10:00 AM</span>
              <MapPin className="w-4 h-4 ml-2" />
              <span>InshaAllah</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <h3 className="font-semibold text-romantic-grey mb-4">
              Countdown to Our Special Day
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-romantic-blush rounded-lg p-3">
                <div className="text-xl font-bold text-romantic-rose">
                  {timeLeft.days}
                </div>
                <div className="text-xs text-romantic-grey opacity-75">
                  Days
                </div>
              </div>
              <div className="bg-romantic-blush rounded-lg p-3">
                <div className="text-xl font-bold text-romantic-rose">
                  {timeLeft.hours}
                </div>
                <div className="text-xs text-romantic-grey opacity-75">
                  Hours
                </div>
              </div>
              <div className="bg-romantic-blush rounded-lg p-3">
                <div className="text-xl font-bold text-romantic-rose">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs text-romantic-grey opacity-75">
                  Minutes
                </div>
              </div>
              <div className="bg-romantic-blush rounded-lg p-3">
                <div className="text-xl font-bold text-romantic-rose">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs text-romantic-grey opacity-75">
                  Seconds
                </div>
              </div>
            </div>
          </motion.div>

          {/* Islamic Prayer */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-romantic-blush to-romantic-cream rounded-xl p-4">
              <p className="text-sm text-romantic-grey italic mb-2">
                "Our Lord, grant us from among our wives and offspring comfort
                to our eyes and make us an example for the righteous."
              </p>
              <p className="text-xs text-romantic-grey opacity-60">
                - Quran 25:74
              </p>
            </div>
          </motion.div>

          {/* Wedding Blessing */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-romantic-rose to-romantic-pink py-4 px-8 rounded-xl font-bold text-lg shadow-xl border-2 border-romantic-pink border-opacity-50">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">💕</span>
                <span className="text-romantic-grey font-bold drop-shadow-lg">
                  May Allah Bless Our Union
                </span>
                <span className="text-2xl">💕</span>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-romantic-pink opacity-30">
            🌹
          </div>
          <div className="absolute top-4 right-4 text-romantic-pink opacity-30">
            🌹
          </div>
          <div className="absolute bottom-4 left-4 text-romantic-pink opacity-30">
            💕
          </div>
          <div className="absolute bottom-4 right-4 text-romantic-pink opacity-30">
            💕
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
