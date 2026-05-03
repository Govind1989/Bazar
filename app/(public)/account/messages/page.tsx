"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { MessageSquare, Search, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountMessages() {
  const { user } = useAuthStore();

  if (!user) return null;

  const contacts = [
    { name: "Apple Store Support", lastMsg: "Your refund has been processed.", time: "10:30 AM", unread: true },
    { name: "Himalayan Bakery", lastMsg: "Fresh sourdough is ready for pickup!", time: "Yesterday", unread: false },
    { name: "Bazar Concierge", lastMsg: "How can I help you today?", time: "Oct 22", unread: false },
  ];

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <section className="mb-8">
        <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Messages</Typography>
        <Typography variant="bodySm" className="opacity-60 text-xs">Direct communication with vendors and platform support.</Typography>
      </section>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Contact List */}
        <aside className="w-80 flex flex-col gap-4 overflow-y-auto pr-2">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40" />
              <input type="text" placeholder="Search chats..." className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-lg py-2 pl-9 pr-4 text-[10px] uppercase font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white w-full" />
           </div>
           
           <div className="space-y-2">
              {contacts.map((contact, i) => (
                <button 
                  key={i}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-left flex items-start gap-3 group",
                    contact.unread 
                      ? "border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" 
                      : "border-bazar-gray-50 dark:border-bazar-gray-950 hover:border-bazar-black/20"
                  )}
                >
                   <div className="w-10 h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-800 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 opacity-40" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                         <Typography variant="titleSm" className="font-black text-[10px] uppercase tracking-wider truncate">{contact.name}</Typography>
                         <Typography variant="bodySm" className="text-[8px] opacity-40">{contact.time}</Typography>
                      </div>
                      <Typography variant="bodySm" className={cn("text-[10px] truncate", contact.unread ? "opacity-80" : "opacity-40")}>{contact.lastMsg}</Typography>
                   </div>
                </button>
              ))}
           </div>
        </aside>

        {/* Chat Window Placeholder */}
        <main className="flex-1 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
           <div className="w-20 h-20 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center text-bazar-white dark:text-bazar-black mb-6">
              <MessageSquare className="w-8 h-8" />
           </div>
           <Typography variant="titleMd" className="font-black uppercase tracking-[0.4em]">Secure Channel</Typography>
           <Typography variant="bodySm" className="text-[10px] mt-2 max-w-xs opacity-40">Select a conversation to begin end-to-end encrypted messaging with your vendors.</Typography>
        </main>
      </div>
    </div>
  );
}
