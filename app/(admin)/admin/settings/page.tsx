"use client";

import { AISettings } from "@/components/shared/AISettings";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Shield, Bot, Database, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-8 space-y-12 max-w-5xl animate-in fade-in duration-700">
      <section>
        <Typography variant="displaySm" className="text-4xl font-black tracking-tighter">Platform Settings</Typography>
        <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px] font-bold">Global BAZAR OS Configuration</Typography>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
           <Card className="p-6 border-2 border-bazar-black dark:border-bazar-white bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black">
              <Shield className="w-8 h-8 mb-4 opacity-50" />
              <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px] mb-2">Security Level</Typography>
              <Typography variant="titleMd" className="font-black uppercase tracking-tighter mb-4">Enterprise Guard</Typography>
              <Typography variant="bodySm" className="text-xs opacity-60 leading-relaxed">
                 Encryption: AES-256-GCM<br/>
                 Key Sovereignty: Enabled<br/>
                 Audit Logs: Real-time
              </Typography>
           </Card>

           <div className="space-y-2 px-2">
              <div className="flex items-center gap-2 opacity-40">
                 <Database className="w-3 h-3" />
                 <Typography variant="bodySm" className="text-[10px] font-black uppercase">Infrastructure</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                 <Globe className="w-3 h-3" />
                 <Typography variant="bodySm" className="text-[10px] font-black uppercase">Edge Deployment</Typography>
              </div>
           </div>
        </div>

        <div className="md:col-span-2">
           <AISettings role="user" />
           <div className="mt-12 p-6 rounded-2xl border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center text-purple-600">
                 <Bot className="w-6 h-6" />
              </div>
              <div className="flex-1">
                 <Typography variant="titleSm" className="font-black uppercase tracking-tight">Super Admin AI Context</Typography>
                 <Typography variant="bodySm" className="text-[10px] opacity-40">As a Super Admin, your AI partner has visibility across the entire platform GMV and vendor performance data.</Typography>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
