"use client";

import { Vendor } from "@/data/mock";
import { SUBSCRIPTION_PLANS, MODULE_REGISTRY } from "@/data/admin-deep";
import { SubscriptionTier, ModulePermission } from "@/types/saas";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TierBadge } from "./TierBadge";
import { cn } from "@/lib/utils";
import { 
  X, 
  Check, 
  Zap, 
  ShieldAlert, 
  Save,
  ChevronRight,
  Info
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VendorSaaSModalProps {
  vendor: any;
  isOpen: boolean;
  onClose: () => void;
}

export function VendorSaaSModal({ vendor, isOpen, onClose }: VendorSaaSModalProps) {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(vendor.tier);
  const [overrides, setOverrides] = useState<ModulePermission[]>([]);

  const toggleOverride = (moduleId: ModulePermission) => {
    setOverrides(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white dark:bg-bazar-black rounded-[40px] shadow-2xl border border-bazar-gray-200 dark:border-bazar-gray-800 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
          <div className="flex items-center gap-6">
            <div className="w-16 h-14 rounded-2xl bg-bazar-black dark:bg-bazar-white flex items-center justify-center text-white dark:text-black font-black text-2xl shadow-xl">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <Typography variant="titleMd" className="font-black uppercase tracking-tighter leading-none mb-1">{vendor.name}</Typography>
              <div className="flex items-center gap-3">
                 <TierBadge tier={vendor.tier} size="md" />
                 <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase font-black tracking-widest">SaaS Protocol Override</Typography>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12">
          {/* Tier Selection */}
          <section className="space-y-6">
             <div className="flex items-center justify-between">
                <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Subscription Entitlement</Typography>
                <div className="flex items-center gap-2 text-[10px] text-amber-500 font-black uppercase tracking-widest bg-amber-500/5 px-3 py-1 rounded-full">
                   <ShieldAlert className="w-3.5 h-3.5" /> High Privilege Action
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['FREE', 'SILVER', 'GOLD', 'PLATINUM'].map((tier: any) => (
                   <button 
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={cn(
                        "p-6 rounded-3xl border-2 transition-all text-left flex flex-col justify-between min-h-[140px] group relative overflow-hidden",
                        selectedTier === tier 
                          ? "bg-bazar-black dark:bg-bazar-white border-bazar-black dark:border-bazar-white text-white dark:text-black shadow-2xl" 
                          : "bg-bazar-white dark:bg-bazar-black border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-gray-300 dark:hover:border-bazar-gray-700"
                      )}
                   >
                      <div className="relative z-10">
                        <Typography variant="bodySm" className={cn("text-[10px] font-black uppercase tracking-widest mb-2", selectedTier === tier ? "opacity-60" : "opacity-40")}>{tier}</Typography>
                        <Typography variant="titleMd" className="font-black tracking-tighter leading-tight">
                           {tier === 'FREE' ? 'Basic' : tier === 'SILVER' ? 'Growth' : tier === 'GOLD' ? 'Pro' : 'Enterprise'}
                        </Typography>
                      </div>
                      {selectedTier === tier && <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 dark:bg-black/5 rounded-full flex items-center justify-center"><Check className="w-6 h-6" /></div>}
                   </button>
                ))}
             </div>
          </section>

          {/* Module Overrides */}
          <section className="space-y-6">
             <div className="flex items-center gap-4">
                <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Module Permisions Registry</Typography>
                <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MODULE_REGISTRY.map((module) => {
                   const isIncludedInTier = ['FREE', 'SILVER', 'GOLD', 'PLATINUM'].indexOf(selectedTier) >= ['FREE', 'SILVER', 'GOLD', 'PLATINUM'].indexOf(module.minTier);
                   const hasOverride = overrides.includes(module.id);
                   
                   return (
                      <Card 
                        key={module.id} 
                        className={cn(
                           "p-5 rounded-2xl border transition-all relative overflow-hidden",
                           isIncludedInTier 
                              ? "bg-bazar-white dark:bg-bazar-gray-950 border-bazar-gray-100 dark:border-bazar-gray-900" 
                              : hasOverride 
                                 ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-500/20"
                                 : "bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-transparent opacity-60"
                        )}
                      >
                         <div className="flex justify-between items-start mb-4">
                            <div className={cn(
                               "p-2 rounded-lg",
                               isIncludedInTier ? "bg-bazar-gray-100 dark:bg-bazar-gray-900" : "bg-blue-100 dark:bg-blue-900/40 text-blue-600"
                            )}>
                               <Zap className="w-4 h-4" />
                            </div>
                            <button 
                               onClick={() => toggleOverride(module.id)}
                               className={cn(
                                  "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md transition-all border",
                                  hasOverride 
                                     ? "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/20" 
                                     : "bg-white dark:bg-black text-bazar-gray-400 border-bazar-gray-200 dark:border-bazar-gray-800 hover:text-black dark:hover:text-white"
                               )}
                            >
                               {hasOverride ? 'Override Active' : 'Force Enable'}
                            </button>
                         </div>
                         <Typography variant="bodySm" className="font-black uppercase tracking-tight text-[11px] mb-1">{module.name}</Typography>
                         <Typography variant="bodySm" className="text-[10px] opacity-40 leading-tight line-clamp-2">{module.description}</Typography>
                         
                         {!isIncludedInTier && !hasOverride && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-[1px]">
                               <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest opacity-60">Locked: Requires {module.minTier}+</Typography>
                            </div>
                         )}
                      </Card>
                   );
                })}
             </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-bazar-gray-200 dark:bg-bazar-gray-800" />)}
              </div>
              <Typography variant="bodySm" className="text-[11px] font-medium opacity-40">System changes will be logged in the <span className="text-black dark:text-white font-black underline decoration-fuchsia-500 underline-offset-4 cursor-pointer">Audit Trail</span>.</Typography>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" size="lg" className="flex-1 md:flex-none h-14 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest" onClick={onClose}>Discard</Button>
              <Button size="lg" className="flex-1 md:flex-none h-14 px-12 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-black/20 gap-3 group">
                 Commit Changes <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
