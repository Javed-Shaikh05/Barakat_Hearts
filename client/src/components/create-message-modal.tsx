import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMessageModal({ isOpen, onClose }: CreateMessageModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "love",
    isSpecial: false,
  });

  const createMessageMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest('POST', '/api/messages', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Created! 💕",
        description: "Your beautiful love note has been saved and can appear in your collection.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/messages/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setFormData({ title: "", content: "", category: "love", isSpecial: false });
      onClose();
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: "Couldn't save your message right now. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both the title and message content.",
        variant: "destructive",
      });
      return;
    }
    createMessageMutation.mutate(formData);
  };

  const categories = [
    { value: "love", label: "💕 Love" },
    { value: "missing", label: "💭 Missing You" },
    { value: "appreciation", label: "🌟 Appreciation" },
    { value: "morning", label: "🌅 Good Morning" },
    { value: "goodnight", label: "🌙 Good Night" },
    { value: "thinking", label: "💫 Thinking of You" },
    { value: "gratitude", label: "🙏 Gratitude" },
    { value: "future", label: "🌈 Our Future" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-testid="create-message-modal"
        >
          <motion.div
            className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            onClick={(e) => e.stopPropagation()}
            data-testid="create-message-content"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-romantic-grey hover:text-romantic-rose transition-colors"
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="text-white text-2xl" />
              </motion.div>
              
              <h2 className="font-serif text-3xl font-semibold text-romantic-grey mb-2">
                Create Love Note
              </h2>
              <p className="text-romantic-grey opacity-75">
                Write a personalized message that will appear in your collection
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-romantic-grey font-medium">
                  Message Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Good Morning Beautiful, Missing You Tonight..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-romantic-blush focus:ring-romantic-pink focus:border-romantic-pink"
                  data-testid="input-message-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-romantic-grey font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="content"
                  placeholder="Pour your heart out... Write something beautiful and romantic that will make her smile every time she reads it."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-[120px] border-romantic-blush focus:ring-romantic-pink focus:border-romantic-pink resize-none"
                  data-testid="textarea-message-content"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-romantic-grey font-medium">
                    Category
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="border-romantic-blush focus:ring-romantic-pink focus:border-romantic-pink" data-testid="select-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-romantic-grey font-medium">
                    Message Type
                  </Label>
                  <div className="flex items-center space-x-4 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="messageType"
                        checked={!formData.isSpecial}
                        onChange={() => setFormData({ ...formData, isSpecial: false })}
                        className="text-romantic-pink focus:ring-romantic-pink"
                        data-testid="radio-regular"
                      />
                      <span className="text-sm text-romantic-grey">Regular</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="messageType"
                        checked={formData.isSpecial}
                        onChange={() => setFormData({ ...formData, isSpecial: true })}
                        className="text-romantic-pink focus:ring-romantic-pink"
                        data-testid="radio-special"
                      />
                      <span className="text-sm text-romantic-grey flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-romantic-heart" />
                        Special
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  type="submit"
                  className="flex-1 bg-romantic-pink text-white py-3 rounded-full font-medium transition-all hover:bg-romantic-rose hover:scale-105 shadow-lg"
                  disabled={createMessageMutation.isPending}
                  data-testid="button-save-message"
                >
                  <Save className="mr-2 w-5 h-5" />
                  {createMessageMutation.isPending ? "Saving..." : "Save Love Note"}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="px-8 py-3 text-romantic-grey rounded-full transition-all hover:bg-romantic-blush border-2 border-romantic-pink"
                  onClick={onClose}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}