import { motion } from "framer-motion";
import { Home, Mail, TrendingUp, Heart } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "messages", icon: Mail, label: "Messages" },
    { id: "stats", icon: TrendingUp, label: "Stats" },
    { id: "love", icon: Heart, label: "Duas" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-200 z-20" data-testid="bottom-navigation">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                className={`flex flex-col items-center space-y-1 transition-all ${
                  isActive 
                    ? "text-emerald-600" 
                    : "text-emerald-700 opacity-60 hover:text-emerald-600 hover:opacity-100"
                }`}
                onClick={() => onTabChange(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`nav-${item.id}`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="w-1 h-1 bg-emerald-600 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
