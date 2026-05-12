"use client";

import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useMembershipStore } from "@/store/useMembershipStore";
import { VENDORS } from "@/data/mock";
import { 
  Trophy, 
  ArrowRight, 
  Store, 
  Calendar, 
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserMembershipsPage() {
  const { user } = useAuthStore();
  const { getUserMemberships, plans } = useMembershipStore();
  const userMemberships = getUserMemberships(user?.id || 'u3');

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.3em] text-[10px] opacity-40 mb-2 font-black">
            Your Account
          </Typography>
          <Typography variant="displaySm" className="text-3xl md:text-5xl tracking-tighter font-black">
            My <span className="text-bazar-gray-300">Memberships</span>
          </Typography>
        </div>
      </div>

      {userMemberships.length === 0 ? (
        <Card className="p-12 md:p-20 border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 text-center bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
          <div className="w-16 h-16 rounded-3xl bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center mx-auto mb-8 shadow-xl">
             <Store className="w-8 h-8 opacity-20" />
          </div>
          <Typography variant="titleMd" className="uppercase tracking-widest font-black mb-4">No active memberships</Typography>
          <Typography variant="bodySm" className="opacity-40 max-w-sm mx-auto mb-10 text-sm leading-relaxed">
            You haven't joined any vendor membership clubs yet. Scan a store's QR code or visit a vendor's page to join!
          </Typography>
          <Link href="/marketplace">
            <Button className="h-12 px-8 uppercase font-black tracking-widest text-[10px] rounded-xl">
              Explore Vendors
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userMemberships.map((membership) => {
            const vendor = VENDORS.find(v => v.id === membership.vendorId);
            const plan = plans.find(p => p.id === membership.planId);
            const progress = (membership.currentVisits / (plan?.targetVisits || 10)) * 100;
            
            return (
              <Card key={membership.id} className="p-6 md:p-8 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-bazar-gray-50 dark:bg-bazar-gray-950 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-700 opacity-50" />
                
                {plan?.isOnlineOnlyReward && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[7px] font-black uppercase tracking-widest border border-blue-500/10">
                      Online Only
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900 bg-white shadow-sm">
                    <img src={vendor?.logo} alt={vendor?.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Typography variant="titleMd" className="font-black tracking-tight">{vendor?.name}</Typography>
                    <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase font-black tracking-widest">{plan?.title}</Typography>
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="flex justify-between items-end">
                      <div>
                        <Typography variant="displaySm" className="text-2xl font-black tracking-tighter">
                          {membership.currentVisits} <span className="text-bazar-gray-300">/ {plan?.targetVisits}</span>
                        </Typography>
                        <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-black tracking-widest mt-1">
                          {plan?.rewardType === 'FREE_DELIVERY' ? 'Orders completed' : 'Visits completed'}
                        </Typography>
                      </div>
                      <div className="text-right">
                        <Typography variant="bodySm" className={cn(
                          "font-black text-sm tracking-tighter",
                          plan?.rewardType === 'FREE_DELIVERY' ? "text-blue-600" : "text-green-600"
                        )}>
                          {plan?.rewardType === 'FREE_DELIVERY' 
                            ? 'FREE DELIVERY' 
                            : `NPR ${(membership.currentVisits > 0 ? membership.totalSpent / membership.currentVisits : 0).toLocaleString()}`
                          }
                        </Typography>
                        <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-black tracking-widest mt-1">
                          {plan?.rewardType === 'FREE_DELIVERY' ? 'Savings value' : 'Avg. Reward Value'}
                        </Typography>
                      </div>
                   </div>

                   <div className="h-2 w-full bg-bazar-gray-100 dark:bg-bazar-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          plan?.rewardType === 'FREE_DELIVERY' ? "bg-blue-600" : "bg-bazar-black dark:bg-bazar-white"
                        )}
                        style={{ width: `${progress}%` }} 
                      />
                   </div>

                   <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                         <Calendar className="w-3.5 h-3.5 opacity-20" />
                         <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold">
                           Joined {new Date(membership.enrolledAt).toLocaleDateString()}
                         </Typography>
                      </div>
                      <Link href={`/${vendor?.slug}/membership`}>
                        <Button variant="ghost" size="sm" className="h-9 px-4 gap-2 text-[9px] uppercase font-black tracking-widest hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-xl">
                          Track & Validate
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                   </div>
                </div>

                {membership.isRewardAvailable && (
                  <div className="absolute top-4 right-4 animate-bounce">
                    <div className="bg-green-500 text-white p-2 rounded-xl shadow-lg">
                      <Trophy className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Discovery Section */}
      <div className="pt-10">
        <Typography variant="titleMd" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-8 font-black">Recommended for you</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <DiscoverCard 
              vendor="Himalayan Kitchen" 
              offer="Free 11th Meal" 
              icon={Zap} 
              color="bg-amber-500"
           />
           <DiscoverCard 
              vendor="Urban Wear" 
              offer="50% OFF 5th Item" 
              icon={TrendingUp} 
              color="bg-blue-500"
           />
           <DiscoverCard 
              vendor="Organic Fresh" 
              offer="Free Veggie Box" 
              icon={ShieldCheck} 
              color="bg-green-500"
           />
        </div>
      </div>
    </div>
  );
}

function DiscoverCard({ vendor, offer, icon: Icon, color }: any) {
  return (
    <Card className="p-6 border-bazar-gray-200 dark:border-bazar-gray-800 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 group cursor-pointer">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-1">{vendor}</Typography>
      <Typography variant="titleMd" className="font-black text-sm mb-4">{offer}</Typography>
      <div className="flex items-center text-[9px] font-black uppercase tracking-widest group-hover:gap-2 transition-all">
        View Program <ArrowRight className="w-3 h-3" />
      </div>
    </Card>
  );
}
