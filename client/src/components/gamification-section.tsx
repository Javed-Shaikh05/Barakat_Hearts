import { motion } from "framer-motion";
import { Flame, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function GameificationSection() {
  const { data: userStats, isLoading } = useQuery({
    queryKey: ['/api/stats'],
  });

  if (isLoading) {
    return (
      <section className="relative z-10 px-4 md:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
              <div className="text-center">
                <div className="h-12 bg-gray-200 rounded mb-2 w-16 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-40 mx-auto"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
              <div className="text-center">
                <div className="h-12 bg-gray-200 rounded mb-2 w-16 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-40 mx-auto"></div>
                <div className="flex justify-center space-x-4">
                  <div className="w-12 h-16 bg-gray-200 rounded"></div>
                  <div className="w-12 h-16 bg-gray-200 rounded"></div>
                  <div className="w-12 h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const streakProgress = userStats ? ((userStats.currentStreak % 7) / 7) * 100 : 0;
  const daysUntilMilestone = userStats ? 7 - (userStats.currentStreak % 7) : 7;

  return (
    <section className="relative z-10 px-4 md:px-6 pb-8" data-testid="gamification-section">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Streak Card */}
          <motion.div 
            className="glass-effect rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            data-testid="streak-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-romantic-grey">Daily Streak</h3>
              <Flame className="text-2xl text-orange-500" />
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-romantic-rose mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                data-testid="streak-days"
              >
                {userStats?.currentStreak || 0}
              </motion.div>
              <p className="text-sm text-romantic-grey opacity-75 mb-4">Consecutive days of love</p>
              
              {/* Progress bar */}
              <div className="w-full bg-romantic-blush rounded-full h-2 mb-2">
                <motion.div 
                  className="bg-gradient-to-r from-romantic-pink to-romantic-rose h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${streakProgress}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  data-testid="streak-progress"
                />
              </div>
              <p className="text-xs text-romantic-grey opacity-60" data-testid="days-until-milestone">
                {daysUntilMilestone === 7 ? "Keep going!" : `${daysUntilMilestone} days until next milestone`}
              </p>
            </div>
          </motion.div>
          
          {/* Heart Collection */}
          <motion.div 
            className="glass-effect rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            data-testid="hearts-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-romantic-grey">Heart Collection</h3>
              <Heart className="text-2xl text-romantic-heart fill-current animate-heart-beat" />
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-romantic-heart mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                data-testid="total-hearts"
              >
                {userStats?.totalHearts || 0}
              </motion.div>
              <p className="text-sm text-romantic-grey opacity-75 mb-4">Hearts collected</p>
              
              {/* Heart types */}
              <div className="flex justify-center space-x-4 text-sm">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  data-testid="daily-hearts"
                >
                  <div className="text-romantic-pink font-semibold">+3</div>
                  <div className="text-xs text-romantic-grey opacity-60">Daily</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  data-testid="streak-hearts"
                >
                  <div className="text-romantic-rose font-semibold">+8</div>
                  <div className="text-xs text-romantic-grey opacity-60">Streak</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  data-testid="special-hearts"
                >
                  <div className="text-romantic-heart font-semibold">+2</div>
                  <div className="text-xs text-romantic-grey opacity-60">Special</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
