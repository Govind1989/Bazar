"use client";

import { useUserVisits, usePlatformStats } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Users, 
  MousePointer2, 
  ShoppingCart, 
  CreditCard, 
  Globe, 
  Smartphone, 
  Laptop,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Download,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminReportsPage() {
  const { data: visits, isLoading: visitsLoading } = useUserVisits();
  const { data: stats } = usePlatformStats();

  return (
    <div className="p-6 md:p-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Typography variant="displaySm" className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">Deep Intelligence</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium uppercase tracking-[0.1em] text-[11px]">Platform Growth & User Behavioral Analytics</Typography>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="h-10 px-4 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl">
             <Calendar className="w-3.5 h-3.5 opacity-40" /> Last 30 Days
           </Button>
           <Button size="sm" className="h-10 px-4 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-black/10">
             <Download className="w-3.5 h-3.5" /> Export PDF
           </Button>
        </div>
      </div>

      {/* Funnel Analytics */}
      <div className="grid md:grid-cols-4 gap-6">
         <FunnelStep label="Total Visits" value="12.4K" icon={Users} percentage={100} color="bg-bazar-gray-200" />
         <FunnelStep label="Interactions" value="8.2K" icon={MousePointer2} percentage={66} color="bg-bazar-gray-300" />
         <FunnelStep label="Add to Cart" value="1.5K" icon={ShoppingCart} percentage={18} color="bg-bazar-gray-400" />
         <FunnelStep label="Purchased" value="420" icon={CreditCard} percentage={5.1} color="bg-bazar-black" />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Live Traffic Feed */}
         <Card className="lg:col-span-8 p-0 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black overflow-hidden shadow-2xl shadow-black/5">
            <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
               <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px] opacity-40">Live Behavioral Feed</Typography>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest">Real-time Stream</Typography>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">User/IP</th>
                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Location</th>
                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Path</th>
                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Device</th>
                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest opacity-30 text-right">Event</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-bazar-gray-50 dark:divide-bazar-gray-950">
                     {visitsLoading ? (
                        [1,2,3,4,5].map(i => <tr key={i} className="h-16 animate-pulse bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50" />)
                     ) : visits?.map(visit => (
                        <tr key={visit.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group">
                           <td className="px-6 py-4">
                              <Typography variant="bodySm" className="text-[11px] font-bold font-mono">{visit.userId || visit.ip}</Typography>
                           </td>
                           <td className="px-6 py-4 flex items-center gap-2">
                              <Globe className="w-3 h-3 opacity-30" />
                              <Typography variant="bodySm" className="text-[10px] font-medium">{visit.location}</Typography>
                           </td>
                           <td className="px-6 py-4">
                              <Typography variant="bodySm" className="text-[10px] font-mono opacity-60 truncate max-w-[120px]">{visit.path}</Typography>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 {visit.device.includes('iPhone') ? <Smartphone className="w-3 h-3 opacity-30" /> : <Laptop className="w-3 h-3 opacity-30" />}
                                 <Typography variant="bodySm" className="text-[10px] font-medium">{visit.device}</Typography>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className={cn(
                                 "inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                                 visit.action === 'PURCHASE' ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : 
                                 visit.action === 'CART_ADD' ? "bg-fuchsia-500 text-white" : "bg-bazar-gray-100 dark:bg-bazar-gray-900 opacity-40"
                              )}>
                                 {visit.action.replace('_', ' ')}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* Device & OS Distribution */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-3xl">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40 mb-8">Traffic Acquisition</Typography>
               <div className="space-y-6">
                  <AcquisitionRow label="Direct" percentage={45} count="5.5K" />
                  <AcquisitionRow label="Social Hub" percentage={32} count="3.9K" />
                  <AcquisitionRow label="Search Engine" percentage={18} count="2.2K" />
                  <AcquisitionRow label="Referral" percentage={5} count="0.8K" />
               </div>
            </Card>

            <Card variant="dark" className="bg-bazar-black text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full" />
               <div className="relative z-10">
                  <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 text-white font-black">AI Prediction</Typography>
                  <Typography variant="titleMd" className="text-white font-black uppercase tracking-tight mb-4">Churn Forecast</Typography>
                  <Typography variant="bodySm" className="text-bazar-gray-400 text-xs leading-relaxed mb-8">
                     Based on behavioral patterns, platform churn is expected to drop by <span className="text-green-400 font-bold">2.4%</span> next month due to increased module adoption.
                  </Typography>
               </div>
               <Button className="w-full bg-white text-black h-12 text-[10px] font-black uppercase tracking-widest rounded-2xl group transition-all">
                  Drill Down Prediction <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, icon: Icon, percentage, color }: any) {
   return (
      <Card className="p-6 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-[32px] hover:border-black dark:hover:border-white transition-all group overflow-hidden relative">
         <div className="flex justify-between items-start mb-6">
            <div className="p-3 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black transition-all">
               <Icon className="w-5 h-5 opacity-40 group-hover:opacity-100" />
            </div>
            <Typography variant="bodySm" className="text-[10px] font-black font-mono opacity-40">{percentage}%</Typography>
         </div>
         <Typography variant="bodySm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 font-black mb-1">{label}</Typography>
         <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">{value}</Typography>
         <div className="absolute bottom-0 left-0 h-1 transition-all group-hover:h-2" style={{ width: `${percentage}%`, backgroundColor: 'black' }} />
      </Card>
   );
}

function AcquisitionRow({ label, percentage, count }: any) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between items-center">
            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight">{label}</Typography>
            <Typography variant="bodySm" className="text-[11px] font-mono font-black">{count}</Typography>
         </div>
         <div className="h-1.5 w-full bg-bazar-gray-50 dark:bg-bazar-gray-900 rounded-full overflow-hidden">
            <div className="h-full bg-bazar-black dark:bg-bazar-white rounded-full opacity-60" style={{ width: `${percentage}%` }} />
         </div>
      </div>
   );
}
