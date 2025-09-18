import { motion } from "framer-motion";
import { Heart, Star, Gem } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function RecentMessages() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['/api/messages/recent'],
  });

  const getIcon = (category: string, isSpecial: boolean) => {
    if (isSpecial) return <Gem className="text-purple-400" />;
    switch (category) {
      case "appreciation":
        return <Star className="text-romantic-rose" />;
      default:
        return <Heart className="text-romantic-pink" />;
    }
  };

  if (isLoading) {
    return (
      <section className="relative z-10 px-4 md:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-romantic-grey mb-6 text-center">
            Recent Love Notes
          </h2>
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-effect rounded-xl p-4 flex items-start space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <section className="relative z-10 px-4 md:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-romantic-grey mb-6 text-center">
            Recent Love Notes
          </h2>
          <div className="text-center text-romantic-grey opacity-75">
            <Heart className="w-12 h-12 mx-auto mb-4 text-romantic-pink" />
            <p>No messages yet. Your love story is just beginning! 💕</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 px-4 md:px-6 pb-8" data-testid="recent-messages">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl font-semibold text-romantic-grey mb-6 text-center">
          Recent Love Notes
        </h2>
        
        <div className="grid gap-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="glass-effect rounded-xl p-4 flex items-start space-x-4 transition-all hover:bg-white hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              data-testid={`message-item-${message.id}`}
            >
              <div className="w-10 h-10 bg-romantic-blush rounded-full flex items-center justify-center flex-shrink-0">
                {getIcon(message.category, message.isSpecial || false)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-romantic-grey mb-1" data-testid={`message-title-${message.id}`}>
                  {message.title}
                </h4>
                <p className="text-sm text-romantic-grey opacity-75 line-clamp-2 mb-2" data-testid={`message-preview-${message.id}`}>
                  {message.content.slice(0, 80)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-romantic-grey opacity-60" data-testid={`message-date-${message.id}`}>
                    {new Date(message.createdAt!).toLocaleDateString('en-US', {
                      weekday: 'long',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-romantic-heart fill-current" />
                    <span className="text-xs text-romantic-grey" data-testid={`message-hearts-${message.id}`}>
                      +{message.hearts}
                    </span>
                    {message.isSpecial && <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
