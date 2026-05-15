"use client";

import { useAdminConversations } from "@/hooks/useAdminData";
import { AdminConversation, PlatformMessage } from "@/data/admin-comm";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  CheckCheck,
  User,
  Shield,
  Clock,
  ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMessagesPage() {
  const { data: conversations, isLoading } = useAdminConversations();
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const selectedConv = conversations?.find(c => c.id === selectedConvId);

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)] flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-700">
      {/* Conversations Sidebar */}
      <aside className={cn(
        "w-full md:w-96 border-r border-bazar-gray-200 dark:border-bazar-gray-800 bg-white dark:bg-bazar-black flex flex-col",
        selectedConvId && "hidden md:flex"
      )}>
        <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
          <Typography variant="titleMd" className="font-black uppercase tracking-tighter mb-6 leading-none">Messages</Typography>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-11 pr-4 py-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
          {isLoading ? (
            [1,2,3].map(i => <div key={i} className="h-20 bg-bazar-gray-50 animate-pulse rounded-2xl" />)
          ) : conversations?.map((conv) => (
            <button 
              key={conv.id}
              onClick={() => setSelectedConvId(conv.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group text-left",
                selectedConvId === conv.id 
                  ? "bg-bazar-black dark:bg-white text-white dark:text-black shadow-2xl" 
                  : "hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
              )}
            >
              <div className="relative">
                 <div className="w-12 h-12 rounded-xl overflow-hidden border border-bazar-gray-200 dark:border-bazar-gray-800">
                    <img src={conv.participantAvatar} alt={conv.participantName} className="w-full h-full object-cover" />
                 </div>
                 {conv.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-600 rounded-full border-2 border-white dark:border-black flex items-center justify-center text-[8px] font-black text-white">
                       {conv.unreadCount}
                    </div>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                   <Typography variant="bodySm" className="font-black uppercase tracking-tight text-[11px] truncate">{conv.participantName}</Typography>
                   <Typography variant="bodySm" className={cn("text-[9px] font-bold opacity-40 uppercase", selectedConvId === conv.id && "opacity-60 text-white dark:text-black")}>{conv.timestamp}</Typography>
                </div>
                <Typography variant="bodySm" className={cn("text-[10px] truncate leading-tight opacity-40 font-medium", selectedConvId === conv.id && "opacity-70")}>{conv.lastMessage}</Typography>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Message View */}
      <main className={cn(
        "flex-1 flex flex-col bg-bazar-gray-50/50 dark:bg-bazar-gray-950/20 relative",
        !selectedConvId && "hidden md:flex items-center justify-center"
      )}>
        {selectedConv ? (
          <>
            {/* Thread Header */}
            <header className="p-6 md:px-10 border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-white dark:bg-bazar-black flex justify-between items-center z-10">
               <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedConvId(null)} className="md:hidden h-10 w-10">
                     <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xl">
                     <img src={selectedConv.participantAvatar} alt={selectedConv.participantName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <Typography variant="bodySm" className="font-black uppercase tracking-tight text-sm leading-none mb-1">{selectedConv.participantName}</Typography>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-black tracking-widest">{selectedConv.participantRole} · Active Now</Typography>
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900"><Phone className="w-4.5 h-4.5 opacity-40" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900"><Video className="w-4.5 h-4.5 opacity-40" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900"><MoreVertical className="w-4.5 h-4.5 opacity-40" /></Button>
               </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 space-y-8">
               <div className="flex flex-col items-center mb-12">
                  <div className="w-16 h-16 rounded-3xl bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center mb-4">
                     <Shield className="w-8 h-8 opacity-10" />
                  </div>
                  <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Secure Kernel Bridge</Typography>
                  <Typography variant="bodySm" className="text-[9px] opacity-20 mt-1 uppercase font-bold tracking-widest">Chat initialized on May 15, 2026</Typography>
               </div>

               {selectedConv.messages.map((msg) => {
                  const isMe = msg.senderId === 'admin';
                  return (
                     <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                        <div className={cn("max-w-[70%] group", isMe ? "items-end" : "items-start")}>
                           <div className={cn(
                              "p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm transition-all",
                              isMe 
                                 ? "bg-bazar-black text-white rounded-tr-sm" 
                                 : "bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-tl-sm"
                           )}>
                              {msg.text}
                           </div>
                           <div className={cn("flex items-center gap-2 mt-2 px-1", isMe ? "justify-end" : "justify-start")}>
                              <Typography variant="bodySm" className="text-[9px] font-bold opacity-30 uppercase">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                              {isMe && <CheckCheck className={cn("w-3 h-3", msg.status === 'read' ? "text-fuchsia-500" : "opacity-20")} />}
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>

            {/* Input Area */}
            <div className="p-6 md:p-10 bg-white dark:bg-bazar-black border-t border-bazar-gray-100 dark:border-bazar-gray-900">
               <div className="relative group max-w-5xl mx-auto">
                  <input 
                     type="text" 
                     placeholder="Secure admin response..." 
                     value={messageText}
                     onChange={(e) => setMessageText(e.target.value)}
                     className="w-full pl-6 pr-32 py-5 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-3xl text-sm outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all font-medium"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-bazar-gray-200 dark:hover:bg-bazar-gray-800">
                        <Paperclip className="w-5 h-5 opacity-40" />
                     </Button>
                     <Button 
                        size="icon" 
                        disabled={!messageText.trim()}
                        className="h-12 w-12 rounded-2xl shadow-xl shadow-black/10 bg-bazar-black dark:bg-white text-white dark:text-black group disabled:opacity-50"
                     >
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </Button>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center p-10 max-w-sm">
             <div className="w-20 h-20 rounded-[40px] bg-bazar-gray-50 dark:bg-bazar-gray-900 flex items-center justify-center mb-8 border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800">
                <MessageSquare className="w-10 h-10 opacity-10" />
             </div>
             <Typography variant="titleMd" className="font-black uppercase tracking-tighter mb-3">Communication Void</Typography>
             <Typography variant="bodySm" className="text-bazar-gray-500 leading-relaxed italic">
                Select a merchant or consumer conversation from the sidebar to establish a secure administrative bridge.
             </Typography>
          </div>
        )}
      </main>
    </div>
  );
}

function MessageSquare({ className }: any) {
   return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
}
