"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  Bot,
  Zap,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { AgenticSelectionModal } from "./AgenticSelectionModal";
import { MOCK_CONVERSATIONS } from "@/data/messages";

export function FloatingDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'messages' | 'ai' | null>(null);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selectionData, setSelectionData] = useState<{title: string, items: any[]}>({ title: "", items: [] });
  
  const { user, activeRole } = useAuthStore();
  const { 
    aiSettings, 
    isMessageModalOpen, 
    setMessageModalOpen, 
    agenticSessions,
    activeSessionId,
    createAgenticSession,
    addInteraction,
    setActiveSession,
    deleteInteraction
  } = useUserStore();
  
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Static human conversations for the messages tab
  const humanConversations = MOCK_CONVERSATIONS;
  const activeHumanConv = humanConversations[0]; 

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

  const currentSession = agenticSessions.find(s => s.id === activeSessionId);
  const interactions = currentSession?.interactions || [];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMsg = message;
    setMessage("");

    if (activeModal === 'ai') {
      setIsLoading(true);
      let sessionId = activeSessionId;
      const role = activeRole === 'Vendor' ? 'VENDOR' : activeRole === 'SuperAdmin' ? 'SUPERADMIN' : 'CUSTOMER';
      const aiRole = activeRole === 'Vendor' ? 'vendor' : 'user';
      const apiKey = aiSettings[aiRole]?.apiKey;

      if (!sessionId) {
        sessionId = createAgenticSession(role as any, userMsg.slice(0, 30) + "...");
      }

      addInteraction(sessionId, {
        type: 'USER',
        content: userMsg,
      });

      try {
        const response = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMsg,
            apiKey: apiKey,
            context: {
              userId: user?.id || 'anonymous',
              role: role,
              vendorId: user?.id,
              preferences: {}
            }
          })
        });

        if (!response.ok) throw new Error('Failed to connect to agent');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          const lines = decoder.decode(value).split('\n');
          for (const line of lines) {
            if (line.startsWith('DATA:')) {
              const logData = JSON.parse(line.substring(5));
              addInteraction(sessionId, logData);
              if (logData.type === 'ACTION' && logData.metadata?.selection) {
                setSelectionData(logData.metadata.selection);
                setIsSelectionModalOpen(true);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error in agent session:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // HUMAN MESSAGING (Ready for WebSocket)
      console.log("Human message routed to WebSocket:", userMsg);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelection = (item: any) => {
    setIsSelectionModalOpen(false);
    if (activeSessionId) {
      addInteraction(activeSessionId, {
        type: 'USER',
        content: `I select: ${item.name}`,
      });
    }
  };

  const handleDeleteInteraction = (interactionId: string) => {
    if (activeSessionId) {
      deleteInteraction(activeSessionId, interactionId);
    }
  };

  const isVendor = activeRole === 'Vendor' || activeRole === 'SuperAdmin';

  const dockItems = [
    { id: 'messages', icon: MessageSquare, label: 'Messages', color: 'bg-blue-500' },
    { id: 'ai', icon: Sparkles, label: isVendor ? 'Vendor AI' : 'User AI', color: 'bg-purple-500' }
  ];

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[300] flex flex-col items-end gap-4">
      <AgenticSelectionModal 
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        title={selectionData.title}
        items={selectionData.items}
        onSelect={handleSelection}
      />

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[450px] sm:h-[600px] bg-white/80 dark:bg-bazar-black/80 backdrop-blur-xl border-2 border-bazar-black dark:border-bazar-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
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
                      {activeModal === 'messages' ? "Human Support" : isVendor ? "Vendor Assistant" : "User Assistant"}
                    </Typography>
                    <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
                      {activeModal === 'messages' ? "Direct human contact" : "Powered by Bazar AI"}
                    </Typography>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                 {activeModal === 'ai' && activeSessionId && (
                   <Button variant="ghost" size="icon" onClick={() => setActiveSession(null)} className="rounded-full h-8 w-8" title="New Session">
                      <Plus className="w-4 h-4" />
                   </Button>
                 )}
                 <Button variant="ghost" size="icon" onClick={handleCloseModal} className="rounded-full">
                    <X className="w-4 h-4" />
                 </Button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar flex flex-col-reverse">
               <div className="flex flex-col gap-4">
                 {activeModal === 'ai' ? (
                   <>
                     {interactions.map((interaction) => (
                       <div key={interaction.id} className={cn("flex flex-col max-w-[90%] group relative", interaction.type === 'USER' ? "self-end items-end" : "self-start items-start")}>
                          {interaction.type === 'THOUGHT' || interaction.type === 'TOOL_CALL' ? (
                            <div className="flex items-center gap-2 opacity-40 px-3 py-1 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-lg border border-bazar-gray-100 dark:border-bazar-gray-900">
                              {interaction.type === 'THOUGHT' ? <Bot className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                              <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest italic">{interaction.content}</Typography>
                            </div>
                          ) : (
                            <div className={cn("p-3 rounded-2xl text-xs leading-relaxed shadow-sm transition-all", interaction.type === 'USER' ? "bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black rounded-tr-none" : "bg-bazar-gray-100 dark:bg-bazar-gray-900 text-bazar-black dark:text-bazar-white rounded-tl-none border border-bazar-gray-200 dark:border-bazar-gray-800")}>
                              {interaction.content}
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-1 px-1">
                            <Typography variant="bodySm" className="text-[8px] opacity-30 font-bold uppercase tracking-widest">{new Date(interaction.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                            <button onClick={() => handleDeleteInteraction(interaction.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:scale-110 transition-all p-1"><Trash2 className="w-2.5 h-2.5" /></button>
                          </div>
                       </div>
                     ))}
                     {interactions.length === 0 && (
                       <div className="h-full flex flex-col items-center justify-center text-center p-6 mt-20 opacity-50 grayscale">
                          <Bot className="w-12 h-12 mb-4 opacity-20" />
                          <Typography variant="titleSm" className="font-black uppercase tracking-widest text-xs">Awaiting Instructions</Typography>
                          <Typography variant="bodySm" className="text-[10px] mt-1 italic">"Find me Pashmina Shawl" or "Check iPhone Stock"</Typography>
                       </div>
                     )}
                   </>
                 ) : (
                   <>
                     {[...activeHumanConv.messages].reverse().map((m) => (
                       <div key={m.id} className={cn("flex flex-col max-w-[85%]", m.senderId === 'u3' ? "self-end items-end" : "self-start items-start")}>
                          <div className={cn("p-3 rounded-2xl text-xs leading-relaxed shadow-sm", m.senderId === 'u3' ? "bg-blue-500 text-white rounded-tr-none" : "bg-bazar-gray-100 dark:bg-bazar-gray-900 text-bazar-black dark:text-bazar-white rounded-tl-none border border-bazar-gray-200 dark:border-bazar-gray-800")}>
                            {m.text}
                          </div>
                          <Typography variant="bodySm" className="text-[8px] opacity-30 mt-1 font-bold uppercase tracking-widest">{m.timestamp}</Typography>
                       </div>
                     ))}
                   </>
                 )}
               </div>
            </div>

            <div className="p-4 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
               <div className="relative">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder={activeModal === 'ai' ? (isLoading ? "Intelligence processing..." : "Type a command...") : "Ask human support..."}
                    className="w-full bg-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl py-3 pl-4 pr-12 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all text-sm disabled:opacity-50"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim() || isLoading} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl">
                    {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col-reverse items-center gap-3">
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

        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col items-center gap-3 mb-2">
              {dockItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: index * 0.1 } }}
                  exit={{ opacity: 0, y: 20, scale: 0.8, transition: { delay: (dockItems.length - 1 - index) * 0.1 } }}
                  onClick={() => setActiveModal(item.id as any)}
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "group relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-bazar-black dark:border-bazar-white shadow-xl overflow-hidden bg-white/80 dark:bg-bazar-black/80 backdrop-blur-xl",
                    activeModal === item.id && "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="absolute right-full mr-4 px-3 py-1 bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">{item.label}</Typography>
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
