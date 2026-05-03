"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Sparkles, 
  X, 
  Plus, 
  User as UserIcon, 
  Store,
  Send,
  Settings as SettingsIcon,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

export function FloatingDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'messages' | 'ai' | null>(null);
  const { user, activeRole } = useAuthStore();
  const { aiSettings, setAiApiKey, isMessageModalOpen, setMessageModalOpen, activeConversationVendorId } = useUserStore();

  // Sync internal state with store
  useEffect(() => {
    if (isMessageModalOpen) {
      setActiveModal('messages');
      setIsOpen(true);
    } else if (activeModal === 'messages' && !isMessageModalOpen) {
      setActiveModal(null);
    }
  }, [isMessageModalOpen]);

  const handleCloseModal = () => {
    setActiveModal(null);
    setMessageModalOpen(false);
  };

  const isVendor = activeRole === 'Vendor' || activeRole === 'SuperAdmin';

  const dockItems = [
    {
      id: 'messages',
      icon: MessageSquare,
      label: 'Messages',
      color: 'bg-blue-500',
    },
    {
      id: 'ai',
      icon: Sparkles,
      label: isVendor ? 'Vendor AI' : 'User AI',
      color: 'bg-purple-500',
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex flex-col items-end gap-4">
      {/* Modals Container */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-[400px] h-[500px] bg-white/80 dark:bg-bazar-black/80 backdrop-blur-xl border-2 border-bazar-black dark:border-bazar-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
               <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    activeModal === 'messages' ? "bg-blue-500" : "bg-purple-500"
                  )}>
                    {activeModal === 'messages' ? <MessageSquare className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div>
                    <Typography variant="titleSm" className="font-black uppercase tracking-tighter">
                      {activeModal === 'messages' ? "Messaging" : isVendor ? "Vendor Assistant" : "User Assistant"}
                    </Typography>
                    <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
                      {activeModal === 'messages' ? "Direct human contact" : "Powered by Bazar AI"}
                    </Typography>
                  </div>
               </div>
               <Button variant="ghost" size="icon" onClick={handleCloseModal} className="rounded-full">
                  <X className="w-4 h-4" />
               </Button>
            </div>

            {/* Modal Content - Placeholder for now */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 rounded-3xl bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center mb-4 border border-bazar-gray-200 dark:border-bazar-gray-800">
                  <Bot className="w-8 h-8 opacity-20" />
               </div>
               <Typography variant="titleSm" className="font-black uppercase tracking-tighter mb-2">
                 Welcome to Bazar Intelligence
               </Typography>
               <Typography variant="bodySm" className="opacity-40 max-w-[250px]">
                 Setup your API keys in the dashboard to enable advanced {activeModal === 'ai' ? 'autonomous tasks' : 'message routing'}.
               </Typography>
            </div>

            {/* Modal Footer / Input */}
            <div className="p-4 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    className="w-full bg-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl py-3 pl-4 pr-12 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all text-sm"
                  />
                  <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl">
                    <Send className="w-4 h-4" />
                  </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Actions (Sliding Icons) */}
      <div className="flex flex-col-reverse items-center gap-3">
        {/* Main Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-2",
            isOpen 
              ? "bg-bazar-black dark:bg-bazar-white border-bazar-black dark:border-bazar-white text-white dark:text-bazar-black" 
              : "bg-white/80 dark:bg-bazar-black/80 backdrop-blur-xl border-bazar-black dark:border-bazar-white text-bazar-black dark:text-bazar-white"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </motion.button>

        {/* Action Buttons */}
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col items-center gap-3 mb-2">
              {dockItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { delay: index * 0.1 } 
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 20, 
                    scale: 0.8,
                    transition: { delay: (dockItems.length - 1 - index) * 0.1 }
                  }}
                  onClick={() => setActiveModal(item.id as any)}
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "group relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-bazar-black dark:border-bazar-white shadow-xl overflow-hidden bg-white/80 dark:bg-bazar-black/80 backdrop-blur-xl",
                    activeModal === item.id && "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  
                  {/* Label Tooltip */}
                  <div className="absolute right-full mr-4 px-3 py-1 bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">
                      {item.label}
                    </Typography>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
