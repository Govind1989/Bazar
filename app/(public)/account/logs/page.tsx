"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Zap, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgenticLogs() {
  const { user } = useAuthStore();

  if (!user) return null;

  const logs = [
    { type: "AI", action: "Recommendation Engine", detail: "Optimized product feed based on recent search 'Mechanical Keyboards'.", time: "2 mins ago" },
    { type: "SYSTEM", action: "Inventory Sync", detail: "Followed vendor 'Apple Store NP' updated stock for 'iPhone 15 Pro'.", time: "1 hour ago" },
    { type: "SECURITY", action: "Login Audit", detail: "New session initiated from Kathmandu, Nepal (IP: 110.44.115.XX).", time: "3 hours ago" },
    { type: "AI", action: "Smart Cart", detail: "Automatically applied coupon 'WELCOME10' to pending items.", time: "Yesterday" },
    { type: "SYSTEM", action: "Loyalty Update", detail: "Credited 150 points for 'Completed Order #BZ-4401'.", time: "Yesterday" },
  ];

  return (
    <div className="space-y-12">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Agentic Logs</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs">Real-time background operations and autonomous agent activities.</Typography>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40" />
              <input type="text" placeholder="Search events..." className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-lg py-2 pl-9 pr-4 text-[10px] uppercase font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white w-full" />
           </div>
           <Button variant="ghost" size="icon" className="border-2 border-bazar-gray-100 dark:border-bazar-gray-900 h-9 w-9 rounded-lg">
              <Filter className="w-4 h-4" />
           </Button>
        </div>
      </section>

      <div className="space-y-4">
        {logs.map((log, i) => (
          <Card key={i} className="p-0 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden group hover:border-bazar-black dark:hover:border-bazar-white transition-all">
             <div className="flex">
                <div className={cn(
                  "w-12 flex flex-col items-center justify-center border-r border-bazar-gray-100 dark:border-bazar-gray-900",
                  log.type === "AI" ? "bg-purple-500/5 text-purple-500" :
                  log.type === "SYSTEM" ? "bg-blue-500/5 text-blue-500" : "bg-orange-500/5 text-orange-500"
                )}>
                   {log.type === "AI" ? <Cpu className="w-4 h-4" /> :
                    log.type === "SYSTEM" ? <Zap className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                </div>
                <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <Typography variant="titleSm" className="font-black text-[10px] uppercase tracking-widest">{log.action}</Typography>
                         <span className="w-1 h-1 rounded-full bg-bazar-gray-200 dark:bg-bazar-gray-800" />
                         <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase font-black">{log.type}</Typography>
                      </div>
                      <Typography variant="bodySm" className="text-xs leading-relaxed opacity-70 italic">"{log.detail}"</Typography>
                   </div>
                   <Typography variant="bodySm" className="text-[10px] font-bold opacity-40 whitespace-nowrap bg-bazar-gray-50 dark:bg-bazar-gray-950 px-3 py-1 rounded-full">{log.time}</Typography>
                </div>
             </div>
          </Card>
        ))}
      </div>

      <div className="p-8 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-3xl flex flex-col items-center justify-center text-center opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
         <Terminal className="w-8 h-8 mb-4 animate-pulse" />
         <Typography variant="titleSm" className="font-black uppercase tracking-[0.4em]">Live Stream Active</Typography>
         <Typography variant="bodySm" className="text-[10px] mt-2">Bazar Autonomous Core is monitoring your workspace.</Typography>
      </div>
    </div>
  );
}
