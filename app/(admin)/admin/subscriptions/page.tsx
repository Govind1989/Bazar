"use client";

import { useSubscriptions, useSaaSStats } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaaSStatsHeader } from "@/components/admin/SaaSStatsHeader";
import { TierBadge } from "@/components/admin/TierBadge";
import { PlanModuleEditor } from "@/components/admin/PlanModuleEditor";
import { 
  Plus, 
  Settings2, 
  Check, 
  Shield, 
  Zap, 
  Cpu, 
  Globe,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function AdminSubscriptionsPage() {
  const { data: plans, isLoading } = useSubscriptions();
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-10 space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-1">
        <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">SaaS Console</Typography>
        <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium uppercase tracking-[0.1em] text-[9px] md:text-[11px]">Subscription Engine & Plan Management</Typography>
      </div>

      <SaaSStatsHeader />

      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <Typography variant="titleMd" className="text-lg md:text-xl font-black uppercase tracking-tight">Product Tiers</Typography>
            <Typography variant="bodySm" className="text-[10px] md:text-xs text-bazar-gray-500 opacity-60">Global configuration for vendor subscriptions.</Typography>
          </div>
          <Button variant="outline" size="sm" className="h-9 md:h-10 px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl w-full sm:w-auto">
            <Plus className="w-3.5 h-3.5" /> Define New Plan
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="h-[400px] bg-bazar-gray-50 dark:bg-bazar-gray-950 animate-pulse rounded-3xl" />)
          ) : plans?.map((plan) => (
            <Card key={plan.id} className="p-6 md:p-8 rounded-[28px] md:rounded-[32px] border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black relative overflow-hidden group hover:border-black dark:hover:border-white transition-all duration-500">
              <AnimatePresence>
                 {editingPlanId === plan.id && (
                    <PlanModuleEditor 
                       plan={plan} 
                       onSave={(modules) => {
                          console.log('Saving modules for', plan.id, modules);
                          setEditingPlanId(null);
                       }}
                       onCancel={() => setEditingPlanId(null)}
                    />
                 )}
              </AnimatePresence>

              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setEditingPlanId(plan.id)}
                    className="h-8 w-8 rounded-lg hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/20 text-fuchsia-600"
                 >
                    <Settings2 className="w-4 h-4" />
                 </Button>
              </div>

              <TierBadge tier={plan.tier} size="md" className="mb-4 md:mb-6" />
              
              <div className="mb-6 md:mb-8">
                <Typography variant="displaySm" className="text-2xl md:text-3xl font-black tracking-tighter mb-1">{plan.name}</Typography>
                <div className="flex items-baseline gap-1">
                  <Typography variant="displaySm" className="text-lg md:text-xl font-black">NPR {plan.price.toLocaleString()}</Typography>
                  <Typography variant="bodySm" className="opacity-40 font-black text-[9px] uppercase">/month</Typography>
                </div>
              </div>

              <Typography variant="bodySm" className="text-[10px] md:text-[11px] leading-relaxed opacity-60 mb-6 md:mb-8 font-medium italic min-h-[40px]">
                "{plan.description}"
              </Typography>

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="mt-1 w-3 h-3 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                       <Check className="w-2 h-2 text-green-500" />
                    </div>
                    <Typography variant="bodySm" className="text-[10px] md:text-[11px] font-black uppercase tracking-tight leading-tight">{feature}</Typography>
                  </div>
                ))}
              </div>

              <div className="pt-5 md:pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <Typography variant="bodySm" className="text-[8px] opacity-40 uppercase font-black tracking-[0.2em] mb-1">Catalog Limit</Typography>
                       <Typography variant="bodySm" className="text-[10px] font-black font-mono">{plan.maxProducts === 'unlimited' ? '∞' : plan.maxProducts}</Typography>
                    </div>
                    <div>
                       <Typography variant="bodySm" className="text-[8px] opacity-40 uppercase font-black tracking-[0.2em] mb-1">Staff Slots</Typography>
                       <Typography variant="bodySm" className="text-[10px] font-black font-mono">{plan.maxUsers === 'unlimited' ? '∞' : plan.maxUsers}</Typography>
                    </div>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
         <Card className="lg:col-span-2 p-6 md:p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-[28px] md:rounded-3xl">
            <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 md:mb-8 font-black">Module Distribution</Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
               <ModuleItem icon={Cpu} name="AI Assistant" usage="85%" description="Generative descriptions & chat" />
               <ModuleItem icon={Zap} name="Inventory Pro" usage="100%" description="Real-time multi-channel sync" />
               <ModuleItem icon={Globe} name="Custom Domains" usage="42%" description="White-labeled vendor stores" />
               <ModuleItem icon={Shield} name="SLA & Security" usage="12%" description="Priority uptime guarantees" />
            </div>
         </Card>

         <Card variant="dark" className="bg-bazar-black text-white p-6 md:p-8 rounded-[28px] md:rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 -mr-24 md:-mr-32 -mt-24 md:-mt-32 rounded-full" />
            <div className="relative z-10">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-4 md:mb-6 text-white font-black">Admin Protocol</Typography>
               <Typography variant="titleMd" className="text-white text-lg md:text-xl font-black uppercase tracking-tight mb-3 md:mb-4">Module Registry</Typography>
               <Typography variant="bodySm" className="text-bazar-gray-400 text-xs leading-relaxed mb-6 md:mb-8">
                 Platform features can be globally toggled or overridden per-vendor to handle custom enterprise agreements.
               </Typography>
            </div>
            <Button className="w-full bg-white text-black h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl md:rounded-2xl group transition-all">
               Global Config <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
         </Card>
      </div>
    </div>
  );
}

function ModuleItem({ icon: Icon, name, usage, description }: any) {
  return (
    <div className="flex gap-4 group">
      <div className="w-12 h-12 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center border border-bazar-gray-100 dark:border-bazar-gray-900 group-hover:scale-110 transition-transform">
         <Icon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>
      <div>
         <div className="flex items-center gap-2 mb-1">
            <Typography variant="bodySm" className="font-black uppercase tracking-tight text-[11px]">{name}</Typography>
            <Typography variant="bodySm" className="text-[10px] font-mono text-fuchsia-500 font-bold bg-fuchsia-500/5 px-1.5 rounded">{usage}</Typography>
         </div>
         <Typography variant="bodySm" className="text-[10px] opacity-40 font-medium leading-tight">{description}</Typography>
      </div>
    </div>
  );
}
