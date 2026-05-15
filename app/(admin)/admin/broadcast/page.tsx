"use client";

import { useBroadcastHistory, useSubscriptions } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Radio, 
  Plus, 
  Search, 
  Users, 
  Store, 
  Send, 
  Calendar, 
  CheckCircle2,
  BarChart,
  Target,
  ArrowRight,
  ShieldCheck,
  Megaphone
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminBroadcastPage() {
  const { data: broadcasts, isLoading } = useBroadcastHistory();
  const { data: plans } = useSubscriptions();
  const [target, setTarget] = useState<'ALL_USERS' | 'ALL_VENDORS' | 'SELECTED_TIERS'>('ALL_VENDORS');
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);

  const toggleTier = (tier: string) => {
    setSelectedTiers(prev => 
      prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
    );
  };

  return (
    <div className="p-4 md:p-10 space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-1">
        <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">Broadcast Engine</Typography>
        <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium uppercase tracking-[0.1em] text-[9px] md:text-[11px]">Platform-wide Mass Communication & Outreach</Typography>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
         {/* Composer Area */}
         <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <Card className="p-6 md:p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-[32px] md:rounded-[40px] shadow-2xl shadow-black/5">
               <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-fuchsia-600 flex items-center justify-center text-white shadow-xl shadow-fuchsia-500/30">
                     <Megaphone className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <Typography variant="titleMd" className="font-black uppercase tracking-tight text-base md:text-xl">New Broadcast</Typography>
               </div>

               <div className="space-y-5 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                     <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Transmission Target</Typography>
                     <div className="flex flex-wrap gap-2 md:gap-3">
                        <TargetButton 
                           active={target === 'ALL_VENDORS'} 
                           onClick={() => setTarget('ALL_VENDORS')}
                           icon={Store}
                           label="Vendors"
                        />
                        <TargetButton 
                           active={target === 'ALL_USERS'} 
                           onClick={() => setTarget('ALL_USERS')}
                           icon={Users}
                           label="Users"
                        />
                        <TargetButton 
                           active={target === 'SELECTED_TIERS'} 
                           onClick={() => setTarget('SELECTED_TIERS')}
                           icon={Target}
                           label="Tiers"
                        />
                     </div>
                  </div>

                  {target === 'SELECTED_TIERS' && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="flex flex-wrap gap-1.5 md:gap-2 pt-1"
                     >
                        {['FREE', 'SILVER', 'GOLD', 'PLATINUM'].map(tier => (
                           <button 
                              key={tier}
                              onClick={() => toggleTier(tier)}
                              className={cn(
                                 "px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all",
                                 selectedTiers.includes(tier) 
                                    ? "bg-fuchsia-50 dark:bg-fuchsia-950/20 border-fuchsia-200 dark:border-fuchsia-800 text-fuchsia-600" 
                                    : "bg-white dark:bg-black border-bazar-gray-100 dark:border-bazar-gray-900 opacity-40"
                              )}
                           >
                              {tier}
                           </button>
                        ))}
                     </motion.div>
                  )}

                  <div className="space-y-1.5 pt-2 md:pt-4">
                     <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Subject Header</Typography>
                     <input 
                        type="text" 
                        placeholder="e.g. Critical System Maintenance" 
                        className="w-full px-5 py-3 md:px-6 md:py-4 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl md:rounded-2xl text-xs md:text-sm outline-none focus:ring-4 focus:ring-fuchsia-500/5 transition-all font-bold"
                     />
                  </div>

                  <div className="space-y-1.5">
                     <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Notification Payload</Typography>
                     <textarea 
                        rows={4}
                        placeholder="Compose message..." 
                        className="w-full px-5 py-3 md:px-6 md:py-4 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-2xl md:rounded-[28px] text-xs md:text-sm outline-none focus:ring-4 focus:ring-fuchsia-500/5 transition-all font-medium leading-relaxed resize-none"
                     />
                  </div>

                  <div className="pt-4 md:pt-6 flex justify-between items-center border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                     <div className="flex items-center gap-2 opacity-40 shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <Typography variant="bodySm" className="text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-none">Verified</Typography>
                     </div>
                     <Button size="lg" className="h-11 md:h-14 px-6 md:px-12 rounded-xl md:rounded-[24px] gap-2 md:gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-fuchsia-500/20 group">
                        Deploy <span className="hidden sm:inline">Broadcast</span> <Send className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </Button>
                  </div>
               </div>
            </Card>
         </div>

         {/* History Area */}
         <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Transmission History</Typography>
               
               <div className="space-y-3 md:space-y-4">
                  {broadcasts?.map((bc) => (
                     <Card key={bc.id} className="p-4 md:p-6 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-2xl md:rounded-3xl hover:border-black dark:hover:border-white transition-all group">
                        <div className="flex justify-between items-start mb-3 md:mb-4">
                           <div className="flex items-center gap-2 md:gap-3 min-w-0">
                              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center shrink-0">
                                 <Radio className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-30 group-hover:text-fuchsia-600 transition-colors" />
                              </div>
                              <Typography variant="bodySm" className="text-[10px] md:text-[11px] font-black uppercase tracking-tight truncate">{bc.title}</Typography>
                           </div>
                           <Typography variant="bodySm" className="text-[8px] md:text-[9px] font-bold opacity-30 uppercase shrink-0">{new Date(bc.sentAt).toLocaleDateString()}</Typography>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-bazar-gray-50 dark:border-bazar-gray-900 pt-3 md:pt-4">
                           <HistoryStat label="Reached" value={bc.deliveredCount.toString()} />
                           <HistoryStat label="Open Rate" value={`${bc.openRate}%`} />
                           <HistoryStat label="Audience" value={bc.target === 'SELECTED_TIERS' ? 'Tiers' : bc.target.split('_')[1]} />
                        </div>
                     </Card>
                  ))}
               </div>
            </div>

            <Card variant="dark" className="bg-bazar-black text-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] relative overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[280px]">
               <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 -mr-24 md:-mr-32 -mt-24 md:-mt-32 rounded-full" />
               <div className="relative z-10">
                  <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-4 md:mb-6 text-white font-black">Outreach Analytics</Typography>
                  <Typography variant="titleMd" className="text-white text-base md:text-xl font-black uppercase tracking-tight mb-2 md:mb-4">Global Reach Index</Typography>
                  <Typography variant="bodySm" className="text-bazar-gray-400 text-[10px] md:text-xs leading-relaxed mb-6 md:mb-8">
                     Push, SMS, and In-app channels. Open Rate: <span className="text-fuchsia-400 font-bold">84.2%</span>.
                  </Typography>
               </div>
               <Button className="w-full bg-white text-black h-10 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl md:rounded-2xl group transition-all">
                  Drill Down Outreach <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-40 group-hover:opacity-100 transition-opacity" />
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}

function TargetButton({ active, onClick, icon: Icon, label }: any) {
   return (
      <button 
         onClick={onClick}
         className={cn(
            "flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border transition-all",
            active 
               ? "bg-bazar-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-xl" 
               : "bg-white dark:bg-black border-bazar-gray-200 dark:border-bazar-gray-800 hover:border-bazar-gray-400 dark:hover:border-bazar-gray-600"
         )}
      >
         <Icon className={cn("w-3.5 h-3.5 md:w-4 md:h-4", active ? "opacity-100" : "opacity-40")} />
         <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{label}</Typography>
      </button>
   );
}

function HistoryStat({ label, value }: { label: string, value: string }) {
   return (
      <div>
         <Typography variant="bodySm" className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{label}</Typography>
         <Typography variant="bodySm" className="text-[10px] font-black font-mono">{value}</Typography>
      </div>
   );
}
