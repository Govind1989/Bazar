"use client";

import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { CategoryManager } from "@/components/shared/CategoryManager";
import { 
  Layers, 
  Info,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCategoriesPage() {
  return (
    <div className="p-4 md:p-10 space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Taxonomy Engine</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium text-xs md:text-sm">Manage the global platform category tree.</Typography>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="h-9 md:h-10 px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl">
             <Info className="w-3.5 h-3.5 opacity-40" /> <span className="hidden sm:inline">Taxonomy</span> Guide
           </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
         <div className="lg:col-span-8">
            <CategoryManager />
         </div>
         
         <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <Card className="p-6 md:p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-2xl md:rounded-3xl">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 font-black">Statistics</Typography>
               <div className="space-y-4 md:space-y-6">
                  <StatRow label="Global Categories" value="9" />
                  <StatRow label="Active Sub-cats" value="42" />
                  <StatRow label="Deepest Hierarchy" value="3 Levels" />
                  <StatRow label="Orphaned Products" value="0" />
               </div>
            </Card>

            <Card variant="dark" className="bg-bazar-black text-white p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-4 text-white font-black">AI Auto-Tagging</Typography>
               <Typography variant="bodySm" className="text-[10px] md:text-[11px] text-bazar-gray-400 mb-6 leading-relaxed">
                  The engine automatically categorizes products based on this tree.
               </Typography>
               <Button className="w-full bg-white text-black h-10 md:h-11 text-[10px] font-black uppercase tracking-widest rounded-xl">
                  Recalibrate Engine
               </Button>
            </Card>

            <div className="px-2">
               <Typography variant="bodySm" className="text-[10px] opacity-40 font-black uppercase tracking-widest mb-4">Quick Links</Typography>
               <div className="space-y-1.5 md:space-y-2">
                  <QuickLink label="Export Taxonomy (JSON)" />
                  <QuickLink label="Bulk Import CSV" />
                  <QuickLink label="Mapping Rules" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex justify-between items-center">
         <Typography variant="bodySm" className="text-xs font-bold uppercase tracking-tight">{label}</Typography>
         <Typography variant="bodySm" className="text-xs font-mono font-black">{value}</Typography>
      </div>
   );
}

function QuickLink({ label }: { label: string }) {
   return (
      <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900 transition-all group">
         <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{label}</Typography>
         <ChevronRight className="w-3 h-3 opacity-20 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </button>
   );
}
