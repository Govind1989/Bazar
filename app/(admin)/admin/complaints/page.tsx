"use client";

import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  AlertCircle, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Filter,
  Search,
  Scale
} from "lucide-react";
import { useState } from "react";

export default function AdminComplaintsPage() {
  const { complaints } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Typography variant="displaySm" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Dispute Hub</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 mt-2 font-medium">Arbitration center for customer-vendor conflicts.</Typography>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Search by ticket ID or user..." 
              className="w-full pl-12 pr-4 py-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all font-medium"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl">
            <Filter className="w-5 h-5 opacity-40" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           {complaints.length > 0 ? complaints.map((complaint) => (
              <Card key={complaint.id} className="p-6 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black hover:border-black dark:hover:border-white transition-all group rounded-3xl">
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border",
                          complaint.status === 'PENDING' ? "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/20 dark:border-amber-800" : "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:border-green-800"
                       )}>
                          {complaint.status === 'PENDING' ? <Clock className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                       </div>
                       <div>
                          <Typography variant="titleSm" className="font-black uppercase tracking-tight mb-1">Ticket #{complaint.id.slice(0, 8)}</Typography>
                          <Typography variant="bodySm" className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Type: {complaint.type} · Vendor ID: {complaint.vendorId}</Typography>
                       </div>
                    </div>
                    <div className={cn(
                       "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                       complaint.status === 'PENDING' ? "bg-amber-500/5 text-amber-500 border-amber-500/20" : "bg-green-500/5 text-green-500 border-green-500/20"
                    )}>
                       {complaint.status}
                    </div>
                 </div>

                 <Typography variant="bodyMd" className="text-sm font-medium leading-relaxed mb-6 italic opacity-80">
                    "{complaint.description}"
                 </Typography>

                 <div className="flex items-center justify-between pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2 opacity-40">
                          <MessageCircle className="w-4 h-4" />
                          <Typography variant="bodySm" className="text-[10px] font-bold">4 Responses</Typography>
                       </div>
                       <div className="flex items-center gap-2 opacity-40">
                          <AlertCircle className="w-4 h-4" />
                          <Typography variant="bodySm" className="text-[10px] font-bold">High Priority</Typography>
                       </div>
                    </div>
                    <Button variant="ghost" className="h-10 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                       Mediate Case <Scale className="w-3.5 h-3.5" />
                    </Button>
                 </div>
              </Card>
           )) : (
              <div className="py-20 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[40px]">
                 <Typography variant="bodyMd" className="italic opacity-30">No active disputes in the system.</Typography>
              </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <Card className="p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-3xl">
              <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-8 font-black">Resolution Stats</Typography>
              <div className="space-y-6">
                 <ResolutionMetric label="Avg. Resolution Time" value="4.2h" />
                 <ResolutionMetric label="Win Rate (User)" value="62%" />
                 <ResolutionMetric label="Win Rate (Vendor)" value="38%" />
                 <ResolutionMetric label="Appeal Rate" value="5.1%" />
              </div>
           </Card>

           <Card variant="dark" className="bg-bazar-black text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full" />
              <div className="relative z-10">
                 <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 text-white font-black">Platform Protocol</Typography>
                 <Typography variant="titleMd" className="text-white font-black uppercase tracking-tight mb-4">Arbitration Policy</Typography>
                 <Typography variant="bodySm" className="text-bazar-gray-400 text-xs leading-relaxed mb-8">
                    Admin decisions are final but subject to internal audit. Repeated vendor violations trigger automatic tier downgrades.
                 </Typography>
              </div>
              <Button className="w-full bg-white text-black h-12 text-[10px] font-black uppercase tracking-widest rounded-2xl group transition-all">
                 Review Policy <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}

function ResolutionMetric({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex justify-between items-end border-b border-bazar-gray-50 dark:border-bazar-gray-900 pb-4">
         <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight opacity-40">{label}</Typography>
         <Typography variant="bodySm" className="text-lg font-black font-mono tracking-tighter">{value}</Typography>
      </div>
   );
}
