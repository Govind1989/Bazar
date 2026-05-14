"use client";

import { useUserStore, AgenticSession } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  User, 
  Trash2, 
  MessageSquare, 
  ArrowRight,
  Zap,
  Terminal,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SessionChatHistoryProps {
  sessions: AgenticSession[];
  onSessionSelect: (sessionId: string) => void;
  onSessionDelete: (sessionId: string) => void;
}

export function SessionChatHistory({ sessions, onSessionSelect, onSessionDelete }: SessionChatHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-3xl border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 grayscale opacity-40">
        <Terminal className="w-12 h-12 mx-auto mb-4" />
        <Typography variant="titleSm" className="font-black uppercase tracking-[0.3em]">No intelligence sessions</Typography>
        <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest">Start a conversation in the agentic dock to begin auditing.</Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {sessions.map((session) => (
        <Card 
          key={session.id} 
          className="group relative overflow-hidden border-2 border-bazar-gray-100 dark:border-bazar-gray-900 bg-white dark:bg-black hover:border-bazar-black dark:hover:border-bazar-white transition-all cursor-pointer"
          onClick={() => onSessionSelect(session.id)}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center text-purple-600">
                     <Bot className="w-6 h-6" />
                  </div>
                  <div>
                     <Typography variant="titleSm" className="font-black uppercase tracking-tight text-lg">{session.title}</Typography>
                     <div className="flex items-center gap-2 mt-1">
                        <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest opacity-40">{session.role}</Typography>
                        <span className="w-1 h-1 rounded-full bg-bazar-gray-200 dark:bg-bazar-gray-800" />
                        <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest opacity-40">{session.interactions.length} interactions</Typography>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-3 relative z-20">
                  <Typography variant="bodySm" className="text-[10px] font-black opacity-40 bg-bazar-gray-50 dark:bg-bazar-gray-950 px-3 py-1 rounded-full uppercase tracking-tighter">
                    Last active {new Date(session.lastUpdateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSessionDelete(session.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
               </div>
            </div>

            {/* Chat Preview */}
            <div className="space-y-3 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 p-4 rounded-2xl border border-bazar-gray-100 dark:border-bazar-gray-900">
               {session.interactions.slice(-2).map((interaction) => (
                 <div key={interaction.id} className="flex gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                      interaction.type === 'USER' ? "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black" : "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                    )}>
                       {interaction.type === 'USER' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <Typography variant="bodySm" className="text-xs opacity-70 line-clamp-1 italic">
                       {interaction.content}
                    </Typography>
                 </div>
               ))}
               {session.interactions.length > 2 && (
                 <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest opacity-30 ml-9">
                   + {session.interactions.length - 2} more messages
                 </Typography>
               )}
            </div>
          </div>
          
          {/* Hover Overlay Action */}
          <div className="absolute inset-0 bg-bazar-black/5 dark:bg-bazar-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="bg-white dark:bg-bazar-black px-6 py-2 rounded-full border-2 border-bazar-black dark:border-bazar-white shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform">
                <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  Review & Continue <ArrowRight className="w-3 h-3" />
                </Typography>
             </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
