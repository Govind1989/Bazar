"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Gift, Star, Award, Zap, History } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoyaltyRewards() {
  const { user } = useAuthStore();

  if (!user) return null;

  const rewards = [
    { title: "Free Delivery", cost: 500, desc: "Unlock free shipping for 1 month.", icon: Zap },
    { title: "10% Discount", cost: 1000, desc: "Get 10% off on your next purchase.", icon: Star },
    { title: "Vendor Exclusive", cost: 1500, desc: "Early access to new product launches.", icon: Award },
  ];

  return (
    <div className="space-y-12">
      <section>
        <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Loyalty Rewards</Typography>
        <Typography variant="bodySm" className="opacity-60">Redeem your points for exclusive benefits and discounts.</Typography>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 border-2 border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black col-span-full">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                 <Typography variant="titleSm" className="uppercase tracking-[0.3em] opacity-60 mb-2">Available Balance</Typography>
                 <Typography variant="titleLg" className="text-6xl font-black tracking-tighter">{user.loyaltyPoints.toLocaleString()} <span className="text-lg uppercase tracking-widest opacity-40">Points</span></Typography>
              </div>
              <div className="flex gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center">
                    <Gift className="w-8 h-8" />
                 </div>
              </div>
           </div>
        </Card>

        {rewards.map((reward) => (
          <Card key={reward.title} className="p-6 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col justify-between group hover:border-bazar-black dark:hover:border-bazar-white transition-all">
             <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <reward.icon className="w-5 h-5 opacity-60" />
                </div>
                <div>
                   <Typography variant="titleSm" className="font-black">{reward.title}</Typography>
                   <Typography variant="bodySm" className="text-xs opacity-60 mt-1">{reward.desc}</Typography>
                </div>
             </div>
             <div className="mt-8 pt-4 border-t border-bazar-gray-50 dark:border-bazar-gray-950 flex justify-between items-center">
                <Typography variant="titleSm" className="font-black text-xs uppercase tracking-wider">{reward.cost} Pts</Typography>
                <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Redeem</button>
             </div>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-2">
           <History className="w-4 h-4 opacity-40" />
           <Typography variant="titleSm" className="font-black uppercase tracking-widest text-xs">Recent History</Typography>
        </div>
        <Card className="divide-y divide-bazar-gray-50 dark:divide-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden">
           {[
             { action: "Purchase from Apple Store", points: "+150", date: "Oct 24, 2024" },
             { action: "Reward Redeemed: 5% Off", points: "-500", date: "Oct 20, 2024" },
             { action: "Daily Check-in", points: "+10", date: "Oct 19, 2024" },
           ].map((log, i) => (
             <div key={i} className="p-4 flex items-center justify-between hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors">
                <div>
                   <Typography variant="bodySm" className="font-bold">{log.action}</Typography>
                   <Typography variant="bodySm" className="text-[10px] opacity-40">{log.date}</Typography>
                </div>
                <Typography variant="titleSm" className={cn(
                  "font-black tracking-tighter",
                  log.points.startsWith("+") ? "text-green-500" : "text-red-500"
                )}>{log.points}</Typography>
             </div>
           ))}
        </Card>
      </section>
    </div>
  );
}
