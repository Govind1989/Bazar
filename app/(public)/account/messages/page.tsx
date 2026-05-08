"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { MOCK_CONVERSATIONS, Conversation } from "@/data/messages";
import { Search, Send, User, MoreVertical, Paperclip, Smile, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AccountMessages() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Conversation>(MOCK_CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(true);

  if (!user) return null;

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col overflow-hidden">
      <section className="mb-8 flex justify-between items-end">
        <div>
          <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Messages</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs text-bazar-gray-500">Direct communication with vendors and platform support.</Typography>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setShowHistory(!showHistory)}
          className={cn(
            "rounded-full h-10 w-10 border-2 transition-all hover:bg-bazar-black hover:text-bazar-white dark:hover:bg-bazar-white dark:hover:text-bazar-black overflow-hidden",
            !showHistory && "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black"
          )}
        >
          <motion.div
            animate={{ rotate: showHistory ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </Button>
      </section>

      <div className="flex-1 flex gap-6 overflow-hidden relative">
        {/* Contact List */}
        <aside className={cn(
          "flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out",
          showHistory ? "w-80 opacity-100" : "w-0 opacity-0 -translate-x-12"
        )}>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 opacity-30" />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl py-3 pl-10 pr-4 text-[10px] uppercase font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all" 
              />
           </div>
           
           <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {MOCK_CONVERSATIONS.map((conv) => (
                <button 
                  key={conv.id}
                  onClick={() => setActiveTab(conv)}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-3 group relative",
                    activeTab.id === conv.id 
                      ? "border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" 
                      : "border-bazar-gray-50 dark:border-bazar-gray-950 hover:border-bazar-black/20"
                  )}
                >
                   <div className="w-10 h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {conv.participantAvatar ? (
                        <img src={conv.participantAvatar} alt={conv.participantName} className="w-full h-full object-cover" />
                      ) : (
                        <User className={cn("w-5 h-5", activeTab.id === conv.id ? "text-bazar-white dark:text-bazar-black" : "opacity-40")} />
                      )}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                         <Typography variant="titleSm" className="font-black text-[10px] uppercase tracking-wider truncate">{conv.participantName}</Typography>
                         <Typography variant="bodySm" className="text-[8px] opacity-40 font-mono">{conv.lastTimestamp}</Typography>
                      </div>
                      <Typography variant="bodySm" className={cn("text-[10px] truncate leading-tight", activeTab.id === conv.id ? "opacity-80" : "opacity-40")}>
                        {conv.lastMessage}
                      </Typography>
                   </div>
                   {conv.unreadCount > 0 && activeTab.id !== conv.id && (
                     <div className="absolute right-3 bottom-3 w-4 h-4 rounded-full bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black flex items-center justify-center text-[8px] font-black">
                        {conv.unreadCount}
                     </div>
                   )}
                </button>
              ))}
           </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[32px] flex flex-col bg-bazar-white dark:bg-bazar-black overflow-hidden shadow-sm relative transition-all duration-500">
            {/* Toggle Tab Overlay - Visible when sidebar is hidden */}
            {!showHistory && (
              <button 
                onClick={() => setShowHistory(true)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-20 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black rounded-r-2xl flex items-center justify-center z-20 hover:w-8 transition-all group/toggle"
              >
                <ChevronRight className="w-3 h-3 transition-transform group-hover/toggle:scale-125" />
              </button>
            )}

            {/* Header */}
            <div className="px-6 py-4 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-between bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bazar-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center justify-center overflow-hidden">
                        <User className="w-4 h-4 opacity-40" />
                    </div>
                    <div>
                        <Typography variant="titleSm" className="font-black text-[10px] uppercase tracking-[0.2em]">{activeTab.participantName}</Typography>
                        <Typography variant="bodySm" className="text-[8px] opacity-40 uppercase tracking-widest font-bold">Vendor Partner</Typography>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Search className="w-3 h-3 opacity-40" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><MoreVertical className="w-3 h-3 opacity-40" /></Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-bazar-gray-50/20 dark:bg-bazar-gray-950/20">
                {activeTab.messages.map((msg) => {
                    const isMe = msg.senderId === user.id;
                    return (
                        <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                            <div className={cn(
                                "max-w-[80%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                                isMe 
                                    ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black rounded-tr-none" 
                                    : "bg-bazar-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-tl-none"
                            )}>
                                {msg.text}
                            </div>
                            <Typography variant="bodySm" className="text-[7px] mt-1.5 opacity-30 font-mono uppercase">
                                {msg.timestamp}
                            </Typography>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                <div className="flex items-center gap-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 p-2 pl-4 rounded-2xl border-2 border-transparent focus-within:border-bazar-black dark:focus-within:border-bazar-white transition-all">
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..." 
                        className="flex-1 bg-transparent text-[13px] outline-none py-2"
                    />
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-30"><Paperclip className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-30"><Smile className="w-4 h-4" /></Button>
                        <Button 
                            size="sm" 
                            className="h-10 rounded-xl px-5 ml-2 group"
                            disabled={!message.trim()}
                        >
                            <Send className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
