"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { MOCK_CONVERSATIONS, Conversation } from "@/data/messages";
import { MessageSquare, Search, Send, User, MoreVertical, Paperclip, Smile, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function VendorMessagesPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Conversation>(MOCK_CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(true);

  if (!user) return null;

  return (
    <div className="p-8 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Communication Hub</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs">Manage your customer relationships and platform support.</Typography>
        </div>
        <div className="flex gap-2 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "rounded-full h-10 w-10 border-2 transition-all hover:bg-bazar-black hover:text-bazar-white dark:hover:bg-bazar-white dark:hover:text-bazar-black",
                !showHistory && "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black"
              )}
            >
              {showHistory ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
            <div className="w-px h-8 bg-bazar-gray-100 dark:bg-bazar-gray-900 mx-2" />
            <Button variant="outline" size="sm" className="rounded-full text-[10px] uppercase font-bold tracking-widest px-6">Broadcast</Button>
            <Button size="sm" className="rounded-full text-[10px] uppercase font-bold tracking-widest px-6">New Chat</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden relative">
        {/* Left: Chat List */}
        <aside className={cn(
          "flex flex-col gap-6 overflow-hidden transition-all duration-500 ease-in-out",
          showHistory ? "w-96 opacity-100" : "w-0 opacity-0 -translate-x-12"
        )}>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl py-4 pl-12 pr-4 text-[11px] uppercase font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all" 
              />
           </div>

           <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {MOCK_CONVERSATIONS.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveTab(conv)}
                  className={cn(
                    "w-full p-5 rounded-3xl border-2 transition-all text-left flex items-start gap-4 group relative overflow-hidden",
                    activeTab.id === conv.id
                      ? "border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black"
                      : "border-bazar-gray-50 dark:border-bazar-gray-950 hover:border-bazar-black/20"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-800 flex items-center justify-center flex-shrink-0">
                    <User className={cn("w-6 h-6", activeTab.id === conv.id ? "text-bazar-white dark:text-bazar-black" : "opacity-40")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <Typography variant="titleSm" className="font-black text-xs uppercase tracking-wider truncate">
                        {conv.participantName}
                      </Typography>
                      <Typography variant="bodySm" className="text-[9px] opacity-40 font-mono italic">
                        {conv.lastTimestamp}
                      </Typography>
                    </div>
                    <Typography variant="bodySm" className={cn("text-xs truncate", activeTab.id === conv.id ? "opacity-80" : "opacity-40")}>
                      {conv.lastMessage}
                    </Typography>
                  </div>
                  {conv.unreadCount > 0 && activeTab.id !== conv.id && (
                    <div className="absolute right-4 bottom-4 w-5 h-5 rounded-full bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black flex items-center justify-center text-[10px] font-black">
                      {conv.unreadCount}
                    </div>
                  )}
                </button>
              ))}
           </div>
        </aside>

        {/* Right: Active Chat Area */}
        <main className="flex-1 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[40px] flex flex-col bg-bazar-white dark:bg-bazar-black overflow-hidden relative group/main shadow-2xl shadow-bazar-black/5 transition-all duration-500">
            {/* Toggle Tab Overlay - Visible when sidebar is hidden */}
            {!showHistory && (
              <button 
                onClick={() => setShowHistory(true)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-24 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black rounded-r-3xl flex items-center justify-center z-20 hover:w-10 transition-all group/toggle"
              >
                <ChevronRight className="w-4 h-4 transition-transform group-hover/toggle:scale-125" />
              </button>
            )}

            {/* Chat Header */}
            <div className="px-8 py-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center">
                        <User className="w-5 h-5 opacity-40" />
                    </div>
                    <div>
                        <Typography variant="titleSm" className="font-black text-xs uppercase tracking-widest">{activeTab.participantName}</Typography>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-bold">Online</Typography>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                        <Search className="w-4 h-4 opacity-40" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                        <MoreVertical className="w-4 h-4 opacity-40" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
                {activeTab.messages.map((msg, i) => {
                    const isMe = msg.senderId === user.vendorId || msg.senderId === 'v1' || msg.senderId === 'v2'; // Simplified logic for mock
                    return (
                        <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                            <div className={cn(
                                "max-w-[70%] p-5 rounded-3xl text-sm leading-relaxed",
                                isMe 
                                    ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black rounded-tr-none shadow-xl" 
                                    : "bg-bazar-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-tl-none shadow-sm"
                            )}>
                                {msg.text}
                            </div>
                            <Typography variant="bodySm" className="text-[8px] mt-2 opacity-30 font-mono uppercase tracking-tighter">
                                {msg.timestamp}
                            </Typography>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                <div className="flex items-end gap-4 bg-bazar-gray-50 dark:bg-bazar-gray-950 p-4 rounded-[32px] border-2 border-transparent focus-within:border-bazar-black dark:focus-within:border-bazar-white transition-all">
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 shrink-0">
                        <Paperclip className="w-5 h-5 opacity-30" />
                    </Button>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..." 
                        className="flex-1 bg-transparent py-3 text-sm outline-none resize-none min-h-[48px] max-h-32 font-medium"
                        rows={1}
                    />
                    <div className="flex items-center gap-2 mb-1">
                        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                            <Smile className="w-5 h-5 opacity-30" />
                        </Button>
                        <Button 
                            className="rounded-2xl h-12 px-8 flex items-center gap-2 group"
                            disabled={!message.trim()}
                        >
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <span className="text-[10px] uppercase font-black tracking-widest">Send</span>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
