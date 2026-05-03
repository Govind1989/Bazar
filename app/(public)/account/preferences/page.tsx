"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Sliders, Globe, Bell, Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function AccountPreferences() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();

  if (!user) return null;

  const languages = ["English", "Nepali", "Hindi", "Spanish"];

  return (
    <div className="space-y-12">
      <section>
        <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Preferences</Typography>
        <Typography variant="bodySm" className="opacity-60">Customize your browsing experience and notification settings.</Typography>
      </section>

      <div className="space-y-8 max-w-2xl">
        <section className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <Moon className="w-4 h-4 opacity-40" />
              <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Appearance</Typography>
           </div>
           
           <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Light", value: "light", icon: Sun },
                { name: "Dark", value: "dark", icon: Moon },
                { name: "System", value: "system", icon: Monitor },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    "p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all",
                    theme === t.value 
                      ? "border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" 
                      : "border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black/50"
                  )}
                >
                   <t.icon className="w-5 h-5" />
                   <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest">{t.name}</Typography>
                </button>
              ))}
           </div>
        </section>

        <section className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 opacity-40" />
              <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Regional</Typography>
           </div>
           
           <div className="space-y-4">
              <div className="space-y-2">
                 <Typography variant="bodySm" className="font-bold text-[10px] uppercase opacity-40">Display Language</Typography>
                 <select className="w-full h-12 rounded-xl border-2 bg-transparent px-4 font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white">
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                 </select>
              </div>
           </div>
        </section>

        <section className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 opacity-40" />
              <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Notifications</Typography>
           </div>
           
           <div className="space-y-4">
              {[
                { label: "Order Updates", desc: "Get notified about your order status changes." },
                { label: "Promotion & Deals", desc: "Receive alerts for flash sales and coupons." },
                { label: "Security Alerts", desc: "Important updates about your account security." },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950">
                   <div>
                      <Typography variant="bodySm" className="font-black text-xs">{item.label}</Typography>
                      <Typography variant="bodySm" className="text-[10px] opacity-40">{item.desc}</Typography>
                   </div>
                   <div className="w-10 h-5 bg-bazar-black dark:bg-bazar-white rounded-full p-1 cursor-pointer">
                      <div className="w-3 h-3 bg-white dark:bg-black rounded-full ml-auto" />
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}
