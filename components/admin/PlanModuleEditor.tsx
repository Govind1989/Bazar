"use client";

import { SubscriptionPlan, ModulePermission } from "@/types/saas";
import { MODULE_REGISTRY } from "@/data/admin-deep";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, X, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface PlanModuleEditorProps {
  plan: SubscriptionPlan;
  onSave: (updatedModules: ModulePermission[]) => void;
  onCancel: () => void;
}

export function PlanModuleEditor({ plan, onSave, onCancel }: PlanModuleEditorProps) {
  const [selectedModules, setSelectedModules] = useState<ModulePermission[]>(plan.modules);

  const toggleModule = (id: ModulePermission) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 z-20 bg-white dark:bg-bazar-black p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
         <div>
            <Typography variant="titleSm" className="font-black uppercase tracking-tighter leading-none mb-1">Module Rights</Typography>
            <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase font-black tracking-widest">Editing {plan.name}</Typography>
         </div>
         <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500">
            <X className="w-4 h-4" />
         </Button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 mb-6">
         {MODULE_REGISTRY.map((module) => {
            const isSelected = selectedModules.includes(module.id);
            return (
               <button 
                  key={module.id}
                  onClick={() => toggleModule(module.id)}
                  className={cn(
                     "w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left group",
                     isSelected 
                        ? "bg-fuchsia-50 dark:bg-fuchsia-950/20 border-fuchsia-200 dark:border-fuchsia-800" 
                        : "bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-transparent hover:border-bazar-gray-200 dark:hover:border-bazar-gray-800"
                  )}
               >
                  <div className="flex items-center gap-3">
                     <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                        isSelected ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30" : "bg-bazar-gray-100 dark:bg-bazar-gray-900 opacity-40"
                     )}>
                        <ShieldCheck className="w-4 h-4" />
                     </div>
                     <div>
                        <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight leading-none mb-0.5">{module.name}</Typography>
                        <Typography variant="bodySm" className="text-[9px] opacity-40 leading-none">Min Tier: {module.minTier}</Typography>
                     </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-fuchsia-600" />}
               </button>
            );
         })}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
         <Button variant="outline" size="sm" onClick={onCancel} className="h-10 text-[10px] font-black uppercase tracking-widest rounded-xl">Discard</Button>
         <Button size="sm" onClick={() => onSave(selectedModules)} className="h-10 text-[10px] font-black uppercase tracking-widest rounded-xl gap-2">
            <Save className="w-3.5 h-3.5" /> Commit
         </Button>
      </div>
    </motion.div>
  );
}
