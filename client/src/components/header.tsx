import { motion } from "framer-motion";
import { Heart, Flame, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { data: userStats, isLoading } = useQuery({
    queryKey: ['/api/stats'],
  });

  if (isLoading) {
    return (
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-romantic-pink rounded-full flex items-center justify-center animate-heart-beat">
                <Mail className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-romantic-grey">Love Letters</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative z-10 p-4 md:p-6" data-testid="header">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-12 h-12 bg-romantic-pink rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              data-testid="logo"
            >
              <Mail className="text-white text-xl" />
            </motion.div>
            <h1 className="text-2xl font-serif font-bold text-romantic-grey" data-testid="app-title">
              Love Letters
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              data-testid="heart-count"
            >
              <Heart className="text-romantic-heart w-4 h-4 fill-current animate-heart-beat" />
              <span className="text-sm font-medium text-romantic-grey">
                {userStats?.totalHearts || 0}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              data-testid="streak-count"
            >
              <Flame className="text-orange-500 w-4 h-4" />
              <span className="text-sm font-medium text-romantic-grey">
                {userStats?.currentStreak || 0}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
