import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface MainMessageCardProps {
  onSurpriseUnlock: () => void;
}

export default function MainMessageCard({ onSurpriseUnlock }: MainMessageCardProps) {
  const { toast } = useToast();
  const [messageNumber, setMessageNumber] = useState(142);

  const { data: message, isLoading, refetch } = useQuery({
    queryKey: ['/api/messages/random'],
  });

  const favoriteMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return await apiRequest('POST', '/api/favorites', { messageId });
    },
    onSuccess: () => {
      toast({
        title: "Added to Favorites! 💕",
        description: "This beautiful message has been saved to your collection.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      
      // Check for surprise unlock
      if (Math.random() < 0.3) { // 30% chance of surprise
        setTimeout(() => onSurpriseUnlock(), 1000);
      }
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: "Couldn't save to favorites right now. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleNewMessage = () => {
    refetch();
    setMessageNumber(prev => prev + 1);
  };

  const handleFavorite = () => {
    if (message?.id) {
      favoriteMutation.mutate(message.id);
    }
  };

  useEffect(() => {
    // Auto-refresh message every 24 hours
    const interval = setInterval(() => {
      refetch();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return (
      <main className="relative z-10 px-4 md:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12 mb-8 text-center animate-pulse">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-6 max-w-md mx-auto"></div>
            <div className="h-24 bg-gray-200 rounded mb-8 max-w-2xl mx-auto"></div>
            <div className="flex justify-center space-x-4">
              <div className="w-32 h-12 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!message) {
    return (
      <main className="relative z-10 px-4 md:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12 mb-8 text-center">
            <div className="text-romantic-grey">
              <Heart className="w-16 h-16 mx-auto mb-4 text-romantic-pink" />
              <p className="text-lg">No messages available right now. Please try again later.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 px-4 md:px-6 pb-8" data-testid="main-message-card">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="message-card glass-effect rounded-3xl p-8 md:p-12 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="w-24 h-24 mx-auto mb-6 bg-romantic-blush rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            data-testid="message-icon"
          >
            <Heart className="text-romantic-pink text-4xl fill-current" />
          </motion.div>
          
          <motion.h2 
            className="font-script text-3xl md:text-4xl text-romantic-rose mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="message-title"
          >
            {message.title}
          </motion.h2>
          
          <motion.blockquote 
            className="font-serif text-lg md:text-xl text-romantic-grey leading-relaxed mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            data-testid="message-content"
          >
            "{message.content}"
          </motion.blockquote>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-romantic-grey opacity-75 mb-8">
            <span data-testid="message-number">💕 Message #{messageNumber}</span>
            <span>•</span>
            <span data-testid="message-date">
              {new Date().toLocaleString('en-US', { 
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true 
              })}
            </span>
          </div>
          
          <motion.div 
            className="flex items-center justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button 
              onClick={handleNewMessage}
              className="bg-romantic-pink text-white px-6 py-3 rounded-full font-medium transition-all hover:bg-romantic-rose hover:scale-105 shadow-lg"
              disabled={isLoading}
              data-testid="button-new-message"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              New Message
            </Button>
            
            <Button 
              onClick={handleFavorite}
              variant="outline"
              className="bg-white text-romantic-pink px-6 py-3 rounded-full font-medium transition-all hover:bg-romantic-blush border-2 border-romantic-pink hover:scale-105"
              disabled={favoriteMutation.isPending}
              data-testid="button-favorite"
            >
              <Heart className="mr-2 w-4 h-4" />
              {favoriteMutation.isPending ? "Saving..." : "Save Favorite"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
