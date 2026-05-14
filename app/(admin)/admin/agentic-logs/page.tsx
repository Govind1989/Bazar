"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { SessionChatHistory } from "@/components/shared/SessionChatHistory";
import { Terminal, Search } from "lucide-react";

export default function AdminAgenticLogs() {
  const { user } = useAuthStore();
  const { agenticSessions, setActiveSession, setMessageModalOpen, deleteAgenticSession } = useUserStore();

  if (!user) return null;

  // Filter for superadmin role sessions
  const adminSessions = agenticSessions.filter(s => s.role === 'SUPERADMIN');

  const handleSessionSelect = (id: string) => {
    setActiveSession(id);
    setMessageModalOpen(true);
  };

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2 text-3xl">BAZAR OS Command Center</Typography>
          <Typography variant="bodySm" className="opacity-40 font-bold uppercase tracking-widest text-[10px]">Platform-wide intelligence audit & system-level orchestration</Typography>
        </div>
        
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
           <input 
             type="text" 
             placeholder="Query kernels..." 
             className="w-full pl-10 pr-4 py-2 bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl text-[10px] uppercase font-black outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all"
           />
        </div>
      </section>

      {/* History Grid */}
      <SessionChatHistory 
        sessions={adminSessions} 
        onSessionSelect={handleSessionSelect}
        onSessionDelete={deleteAgenticSession}
      />
    </div>
  );
}
