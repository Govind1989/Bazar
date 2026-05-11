"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { USERS } from "@/data/users";
import {  motion } from "framer-motion";
import { VENDORS } from "@/data/mock";
import { Calendar, Mail, MapPin, Phone, Star, ShieldCheck, TrendingUp, Gift, ArrowRight } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { RECENT_ORDERS } from "@/data/mock";
import { ShieldAlert, Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReviewModal } from "@/components/shared/ReviewModal";
import { ComplaintModal } from "@/components/shared/ComplaintModal";

export default function AccountOverview() {
  const { user } = useAuthStore();
  const { campaigns } = useCampaignStore();
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (!user) return null;

  const followedVendors = VENDORS.filter(v => user.followedVendors.includes(v.id));
  const activeUserCampaigns = campaigns.filter(c => c.status === 'ACTIVE' && c.userCount > 0);

  return (
    <div className="space-y-10 md:space-y-16 animate-in fade-in duration-700">
      <section className="px-4 md:px-0">
        <Typography variant="titleLg" className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-3">Account Overview</Typography>
        <Typography variant="bodySm" className="text-xs md:text-base opacity-60 font-medium">Manage your profile and track your platform activity.</Typography>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Profile Card */}
        <Card className="p-6 md:p-10 border-2 border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black overflow-hidden relative group rounded-[2rem]">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 dark:bg-black/10 rounded-full -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-125" />
           
           <div className="relative z-10 space-y-8 md:space-y-10">
              <div className="space-y-2">
                 <Typography variant="bodySm" className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-60 font-black">Member Since</Typography>
                 <Typography variant="titleLg" className="font-black flex items-center gap-3 text-xl md:text-2xl tracking-tighter">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 opacity-40" />
                    {user.joinedDate}
                 </Typography>
              </div>

              <div className="grid grid-cols-1 gap-5 md:gap-6">
                 <div className="flex items-center gap-4 group/item">
                    <div className="p-2 rounded-lg bg-white/5 dark:bg-black/5 group-hover/item:bg-white/10 dark:group-hover/item:bg-black/10 transition-colors">
                      <Mail className="w-4 h-4 opacity-60" />
                    </div>
                    <Typography variant="bodySm" className="font-bold text-sm md:text-base">{user.email}</Typography>
                 </div>
                 {user.phone && (
                   <div className="flex items-center gap-4 group/item">
                      <div className="p-2 rounded-lg bg-white/5 dark:bg-black/5 group-hover/item:bg-white/10 dark:group-hover/item:bg-black/10 transition-colors">
                        <Phone className="w-4 h-4 opacity-60" />
                      </div>
                      <Typography variant="bodySm" className="font-bold text-sm md:text-base">{user.phone}</Typography>
                   </div>
                 )}
                 <div className="flex items-center gap-4 group/item">
                    <div className="p-2 rounded-lg bg-white/5 dark:bg-black/5 group-hover/item:bg-white/10 dark:group-hover/item:bg-black/10 transition-colors">
                      <MapPin className="w-4 h-4 opacity-60" />
                    </div>
                    <Typography variant="bodySm" className="font-bold text-sm md:text-base">{user.address || "Kathmandu, Nepal"}</Typography>
                 </div>
              </div>
           </div>
        </Card>

        {/* Loyalty Points Card */}
        <Card className="p-6 md:p-10 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col justify-between rounded-[2rem] hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500">
           <div className="flex justify-between items-start">
              <div>
                 <Typography variant="titleSm" className="font-black uppercase tracking-[0.2em] text-[9px] md:text-[11px] opacity-40 mb-2">Loyalty Points</Typography>
                 <Typography variant="displaySm" className="font-black text-5xl md:text-7xl tracking-tighter">{user.loyaltyPoints.toLocaleString()}</Typography>
              </div>
              <div className="p-4 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-2xl border border-bazar-gray-100 dark:border-bazar-gray-900 shadow-sm">
                 <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
           </div>
           
           <div className="pt-8 mt-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <Typography variant="bodySm" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-bazar-black dark:text-bazar-white">Current Tier</Typography>
                <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
                <Typography variant="bodySm" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-amber-500 italic">Gold</Typography>
              </div>
              <Typography variant="bodySm" className="text-[11px] md:text-xs opacity-60 leading-relaxed font-medium">
                 Earn <span className="text-bazar-black dark:text-bazar-white font-black underline decoration-2 decoration-green-500/30">750 more points</span> to unlock Platinum benefits and exclusive heritage deals.
              </Typography>
           </div>
        </Card>
      </div>

      {/* Campaign Tracking */}
      <section className="space-y-8 md:space-y-10">
        <div className="flex items-center justify-between px-4 md:px-0">
           <Typography variant="titleMd" className="font-black uppercase tracking-[0.2em] text-[10px] md:text-xs opacity-60">Active Campaigns Tracking</Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           {activeUserCampaigns.map((campaign) => {
             const vendor = VENDORS.find(v => v.id === campaign.vendorId);
             const progress = Math.floor(Math.random() * 80) + 10;
             
             return (
               <Card key={campaign.id} className="p-5 md:p-8 border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-purple-500/20 transition-all group overflow-hidden relative rounded-[1.5rem] bg-white dark:bg-bazar-black">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.03] dark:bg-purple-500/[0.05] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                  
                  <div className="relative z-10 space-y-6 md:space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 p-2 border border-bazar-gray-100 dark:border-bazar-gray-900 group-hover:rotate-6 transition-transform">
                             <img src={vendor?.logo} alt={vendor?.name} className="w-full h-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                          </div>
                          <Typography variant="bodySm" className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{vendor?.name}</Typography>
                       </div>
                       <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-purple-500/10">
                          {campaign.type}
                       </div>
                    </div>

                    <div className="space-y-1">
                       <Typography variant="titleSm" className="font-black text-lg md:text-xl line-clamp-1 group-hover:text-purple-600 transition-colors">{campaign.title}</Typography>
                       <Typography variant="bodySm" className="text-[11px] md:text-xs opacity-40 mt-1 line-clamp-2 leading-relaxed font-medium">{campaign.description}</Typography>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between items-end">
                          <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40">Quest Progress</Typography>
                          <Typography variant="bodySm" className="text-[10px] md:text-xs font-mono font-black">{progress}%</Typography>
                       </div>
                       <div className="h-1.5 w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-full overflow-hidden border border-bazar-gray-100/50 dark:border-bazar-gray-900/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)]" 
                          />
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                       <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                            <Gift className="w-4 h-4 text-purple-500" />
                          </div>
                          <Typography variant="bodySm" className="text-[11px] md:text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-tight">
                             {campaign.valueType === 'PERCENT' ? `${campaign.value}% OFF` : `रु ${campaign.value} OFF`}
                          </Typography>
                       </div>
                       <Button 
                         variant="outline" 
                         size="sm" 
                         className="h-9 md:h-10 px-5 md:px-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-purple-500/20 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all shadow-lg shadow-purple-500/5 group/btn"
                         disabled={progress < 100 && campaign.type === 'LOYALTY'}
                       >
                          {progress >= 100 || campaign.type !== 'LOYALTY' ? 'Claim Reward' : 'Locked'}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                       </Button>
                    </div>
                  </div>
               </Card>
             );
           })}
        </div>
      </section>

      {/* Followed Vendors */}
      <section className="space-y-8 px-4 md:px-0">
        <div className="flex items-center justify-between">
           <Typography variant="titleMd" className="font-black uppercase tracking-[0.2em] text-[10px] md:text-xs opacity-60">Followed Vendors ({followedVendors.length})</Typography>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
           {followedVendors.map((vendor) => (
             <Card key={vendor.id} className="p-4 md:p-5 border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white transition-all group cursor-pointer rounded-2xl bg-white dark:bg-bazar-black">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 overflow-hidden p-2.5 border border-bazar-gray-100 dark:border-bazar-gray-900 group-hover:scale-110 transition-transform">
                      <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <Typography variant="titleSm" className="font-bold text-sm md:text-base leading-tight truncate">{vendor.name}</Typography>
                      <div className="flex items-center gap-1.5 mt-1.5">
                         <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                         <Typography variant="bodySm" className="text-[10px] md:text-xs font-black opacity-40">{vendor.rating}</Typography>
                      </div>
                   </div>
                   <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-20 group-hover:translate-x-0 transition-all" />
                </div>
             </Card>
           ))}
        </div>
      </section>

      

      {/* Security Status */}
      <div className="px-4 md:px-0 pb-10">
        <Card className="p-6 md:p-8 bg-green-50/30 dark:bg-green-950/10 border border-green-200/30 dark:border-green-900/30 rounded-[2rem] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
           <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shadow-inner">
              <ShieldCheck className="w-8 h-8 md:w-9 md:h-9" />
           </div>
           <div>
              <Typography variant="titleSm" className="font-black text-lg md:text-xl text-green-800 dark:text-green-400 uppercase tracking-tighter">Account Secured</Typography>
              <Typography variant="bodySm" className="text-xs md:text-sm text-green-700/60 dark:text-green-400/50 font-medium">Two-factor authentication and biometric verification are active on your profile.</Typography>
           </div>
           <Button variant="outline" size="sm" className="sm:ml-auto h-9 px-6 text-[10px] font-black uppercase tracking-widest border-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all rounded-xl">
             Security Audit
           </Button>
        </Card>
      </div>
    </div>
  );
}
