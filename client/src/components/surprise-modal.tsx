import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurpriseModal({ isOpen, onClose }: SurpriseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-testid="surprise-modal"
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center relative"
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            onClick={(e) => e.stopPropagation()}
            data-testid="surprise-modal-content"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-romantic-grey hover:text-romantic-rose transition-colors"
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="text-white text-2xl" />
            </motion.div>
            
            <motion.h3 
              className="font-serif text-2xl font-semibold text-romantic-grey mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Surprise Unlocked!
            </motion.h3>
            
            <motion.p 
              className="text-romantic-grey opacity-75 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              You've unlocked a special collection of our favorite memories together! 💕
            </motion.p>
            
            <motion.div 
              className="flex space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Button 
                className="flex-1 bg-romantic-pink text-white py-3 rounded-full font-medium transition-all hover:bg-romantic-rose"
                onClick={onClose}
                data-testid="button-view-memories"
              >
                View Memories
              </Button>
              <Button 
                variant="ghost"
                className="px-4 py-3 text-romantic-grey rounded-full transition-all hover:bg-romantic-blush"
                onClick={onClose}
                data-testid="button-later"
              >
                Later
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
