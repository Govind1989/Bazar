"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { USERS } from "@/data/users";
import { VENDORS } from "@/data/mock";
import { Calendar, Mail, MapPin, Phone, Star, ShieldCheck, TrendingUp } from "lucide-react";

export default function AccountOverview() {
  const { user } = useAuthStore();
  
  if (!user) return null;

  const followedVendors = VENDORS.filter(v => user.followedVendors.includes(v.id));

  return (
    <div className="space-y-12">
      <section>
        <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Account Overview</Typography>
        <Typography variant="bodySm" className="opacity-60">Manage your profile and track your platform activity.</Typography>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="p-8 border-2 border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-black/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
           
           <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                 <Typography variant="bodySm" className="text-[10px] uppercase tracking-[0.3em] opacity-60">Platform Member since</Typography>
                 <Typography variant="titleMd" className="font-black flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-40" />
                    {user.joinedDate}
                 </Typography>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 opacity-40" />
                    <Typography variant="bodySm" className="font-bold">{user.email}</Typography>
                 </div>
                 {user.phone && (
                   <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 opacity-40" />
                      <Typography variant="bodySm" className="font-bold">{user.phone}</Typography>
                   </div>
                 )}
                 <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 opacity-40" />
                    <Typography variant="bodySm" className="font-bold">{user.address || "Kathmandu, Nepal"}</Typography>
                 </div>
              </div>
           </div>
        </Card>

        {/* Loyalty Points Card */}
        <Card className="p-8 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div>
                 <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px] opacity-40 mb-1">Loyalty Points</Typography>
                 <Typography variant="titleLg" className="font-black text-4xl tracking-tighter">{user.loyaltyPoints.toLocaleString()}</Typography>
              </div>
              <div className="p-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-xl">
                 <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
           </div>
           
           <div className="pt-6 mt-6 border-t border-bazar-gray-50 dark:border-bazar-gray-950">
              <Typography variant="bodySm" className="text-[10px] opacity-60 leading-relaxed">
                 You are in the <span className="text-bazar-black dark:text-bazar-white font-black italic">Gold Tier</span>. Earn 750 more points to unlock Platinum benefits.
              </Typography>
           </div>
        </Card>
      </div>

      {/* Followed Vendors */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <Typography variant="titleMd" className="font-black uppercase tracking-widest text-xs">Followed Vendors ({followedVendors.length})</Typography>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {followedVendors.map((vendor) => (
             <Card key={vendor.id} className="p-4 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 overflow-hidden p-2">
                      <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                   </div>
                   <div className="flex-1">
                      <Typography variant="titleSm" className="font-bold leading-tight line-clamp-1">{vendor.name}</Typography>
                      <div className="flex items-center gap-1 mt-1">
                         <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                         <Typography variant="bodySm" className="text-[10px] font-bold opacity-60">{vendor.rating}</Typography>
                      </div>
                   </div>
                </div>
             </Card>
           ))}
        </div>
      </section>

      {/* Security Status */}
      <Card className="p-6 bg-green-50/50 dark:bg-green-950/10 border border-green-200/50 dark:border-green-900/50 rounded-2xl flex items-center gap-6">
         <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
            <ShieldCheck className="w-6 h-6" />
         </div>
         <div>
            <Typography variant="titleSm" className="font-black text-green-700 dark:text-green-400">Account Verified</Typography>
            <Typography variant="bodySm" className="text-xs text-green-600/70 dark:text-green-400/50">Two-factor authentication is active on your profile.</Typography>
         </div>
      </Card>
    </div>
  );
}
