"use client";

import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Palette, Shield, Bell, CreditCard, ChevronRight, Globe, Zap } from "lucide-react";
import Link from "next/link";

export default function SettingsLandingPage() {
  const sections = [
    {
      title: "Store Profile",
      description: "Manage your public store information, logo, and contact details.",
      icon: User,
      href: "/dashboard/settings/profile",
      color: "blue"
    },
    {
      title: "CMS & Appearance",
      description: "Customize your store theme, banners, and product display templates.",
      icon: Palette,
      href: "/dashboard/settings/cms",
      color: "purple",
      badge: "Popular"
    },
    {
      title: "Account Security",
      description: "Update your password, enable 2FA, and manage login sessions.",
      icon: Shield,
      href: "/dashboard/settings/security",
      color: "green"
    },
    {
      title: "Notifications",
      description: "Configure how you receive order alerts and platform updates.",
      icon: Bell,
      href: "/dashboard/settings/notifications",
      color: "amber"
    },
    {
      title: "Billing & Payouts",
      description: "Manage your bank details, view payout history, and billing info.",
      icon: CreditCard,
      href: "/dashboard/settings/billing",
      color: "red"
    },
    {
      title: "Domain & SEO",
      description: "Setup custom domains and optimize your store for search engines.",
      icon: Globe,
      href: "/dashboard/settings/seo",
      color: "cyan"
    }
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">Settings</Typography>
        <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px] font-bold">Configure your store and account preferences</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="p-6 h-full hover:shadow-2xl hover:shadow-black/[0.05] hover:-translate-y-1 transition-all group relative overflow-hidden">
               <div className="flex flex-col h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3",
                    section.color === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-950/30" :
                    section.color === "purple" ? "bg-purple-100 text-purple-600 dark:bg-purple-950/30" :
                    section.color === "green" ? "bg-green-100 text-green-600 dark:bg-green-950/30" :
                    section.color === "amber" ? "bg-amber-100 text-amber-600 dark:bg-amber-950/30" :
                    section.color === "red" ? "bg-red-100 text-red-600 dark:bg-red-950/30" :
                    "bg-cyan-100 text-cyan-600 dark:bg-cyan-950/30"
                  )}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Typography variant="titleSm" className="font-black uppercase tracking-tight text-sm">{section.title}</Typography>
                      {section.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black text-[7px] font-black uppercase tracking-widest">
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <Typography variant="bodySm" className="text-xs opacity-60 leading-relaxed">
                      {section.description}
                    </Typography>
                  </div>

                  <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Configure <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
               </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pro Plan Upsell */}
      <Card className="p-8 bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-none relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
               <div className="flex items-center gap-2">
                 <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                 <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black text-white/60">Pro Feature</Typography>
               </div>
               <Typography variant="displaySm" className="text-2xl md:text-3xl font-black tracking-tighter text-white">Unlock Advanced Analytics & Custom Domains</Typography>
               <Typography variant="bodySm" className="text-sm text-white/70 leading-relaxed">
                 Scale your business with professional tools. Get detailed visitor heatmaps, automated email marketing, and your own .np domain.
               </Typography>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-white/90 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-xl shadow-xl shadow-black/10 transition-transform active:scale-95 shrink-0">
              Upgrade to Pro
            </Button>
         </div>

         {/* Decorative Elements */}
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
         <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
      </Card>
    </div>
  );
}
