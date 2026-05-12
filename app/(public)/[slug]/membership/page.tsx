"use client";

import { use, useState, useEffect } from "react";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useMembershipStore } from "@/store/useMembershipStore";
import { VENDORS } from "@/data/mock";
import { 
  Trophy, 
  Target, 
  QrCode, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Lock,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VendorNavbar } from "@/components/shared/VendorNavbar";
import { notFound } from "next/navigation";

interface MembershipPageProps {
  params: Promise<{ slug: string }>;
}

export default function VendorMembershipPage({ params }: MembershipPageProps) {
  const { slug } = use(params);
  const { user, isAuthenticated } = useAuthStore();
  const { getVendorPlans, enrollInPlan, userMemberships, recordPurchase } = useMembershipStore();
  
  const vendor = VENDORS.find((v) => v.slug === slug);
  const vendorPlans = vendor ? getVendorPlans(vendor.id) : [];
  
  const [activePlanId, setActivePlanId] = useState<string | null>(vendorPlans[0]?.id || null);
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!vendor) return notFound();

  const activePlan = vendorPlans.find(p => p.id === activePlanId);
  const userMembership = userMemberships.find(m => m.userId === user?.id && m.planId === activePlanId);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      alert("Please sign in to join the membership club.");
      return;
    }
    if (activePlanId) {
      enrollInPlan(user!.id, vendor.id, activePlanId);
    }
  };

  const handleValidatePurchase = () => {
    if (!userMembership || !activePlan) return;
    
    if (activePlan.isOnlineOnlyReward) {
      setMessage({ type: 'error', text: "Validation PIN is only for in-store visits. Online rewards are tracked automatically!" });
      return;
    }

    setIsVerifying(true);
    const result = recordPurchase({
      userId: user!.id,
      vendorId: vendor.id,
      membershipId: userMembership.id,
      amount: parseFloat(amount),
      type: 'IN_STORE',
      pin: pin
    });

    setTimeout(() => {
      setIsVerifying(false);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setPin("");
        setAmount("");
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-bazar-black pt-16">
      <VendorNavbar vendor={vendor} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bazar-black/5 dark:bg-bazar-white/5 mb-6">
            <Trophy className="w-4 h-4 text-amber-500" />
            <Typography variant="bodySm" className="text-[10px] uppercase font-black tracking-widest">Membership Club</Typography>
          </div>
          <Typography variant="displaySm" className="text-4xl md:text-6xl tracking-tighter font-black mb-6">
            Exclusive <span className="italic text-bazar-gray-300">Rewards</span>
          </Typography>
          
          {/* Plan Selector */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {vendorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setActivePlanId(plan.id);
                  setMessage(null);
                }}
                className={cn(
                  "px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all",
                  activePlanId === plan.id 
                    ? "bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black shadow-xl"
                    : "bg-bazar-gray-50 dark:bg-bazar-gray-950 opacity-40 hover:opacity-100"
                )}
              >
                {plan.title}
              </button>
            ))}
          </div>
        </div>

        {!activePlan ? (
          <div className="text-center py-20">
             <Typography variant="bodySm" className="opacity-40 italic">This vendor has no active membership plans.</Typography>
          </div>
        ) : !userMembership ? (
          <div className="space-y-12">
            <div className="text-center">
               <Typography variant="bodySm" className="opacity-40 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                 {activePlan.description}
               </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <BenefitCard 
                  icon={activePlan.rewardType === 'FREE_DELIVERY' ? Zap : Trophy} 
                  title={activePlan.rewardType === 'FREE_DELIVERY' ? "Fast Delivery" : "Instant Progress"} 
                  description={activePlan.rewardType === 'FREE_DELIVERY' ? "Unlock free delivery on your online orders automatically." : "Track your visits and spend in real-time after every purchase."}
               />
               <BenefitCard 
                  icon={Star} 
                  title="Average Value" 
                  description="Your rewards are calculated based on your actual spending habits."
               />
               <BenefitCard 
                  icon={activePlan.isOnlineOnlyReward ? Lock : ShieldCheck} 
                  title={activePlan.isOnlineOnlyReward ? "Online Only" : "Secure Validation"} 
                  description={activePlan.isOnlineOnlyReward ? "This specific reward is exclusively for our online store customers." : "Simple 4-digit PIN validation for all in-store purchases."}
               />
            </div>

            <Card className="p-8 md:p-12 border-2 border-bazar-black dark:border-bazar-white bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-black/5 -mr-32 -mt-32 rounded-full group-hover:scale-110 transition-transform duration-700" />
               <div className="relative z-10">
                 <Typography variant="titleMd" className="text-2xl font-black mb-4 uppercase tracking-widest">Join {activePlan.title}</Typography>
                 <Typography variant="bodySm" className="opacity-60 mb-8 max-w-md">
                   Get started today and start earning {activePlan.rewardType === 'FREE_DELIVERY' ? 'Free Delivery' : 'Rewards'} at {vendor.name}.
                 </Typography>
                 <Button 
                   className="h-14 px-10 gap-3 bg-white text-black hover:bg-bazar-gray-100 dark:bg-black dark:text-white dark:hover:bg-bazar-gray-900 font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all"
                   onClick={handleEnroll}
                 >
                   Enroll Now
                   <ArrowRight className="w-5 h-5" />
                 </Button>
               </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Progress Card */}
            <Card className="p-8 md:p-10 border-bazar-gray-200 dark:border-bazar-gray-800 relative overflow-hidden">
               {activePlan.isOnlineOnlyReward && (
                 <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">
                      Online Only
                    </div>
                 </div>
               )}
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                 <div>
                   <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm mb-2">
                     {activePlan.rewardType === 'FREE_DELIVERY' ? 'Order Progress' : 'Your Progress'}
                   </Typography>
                   <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">
                     {userMembership.currentVisits} <span className="text-bazar-gray-300">/ {activePlan.targetVisits}</span>
                   </Typography>
                   <Typography variant="bodySm" className="opacity-40 uppercase font-black text-[10px] mt-1 tracking-widest">
                     {activePlan.rewardType === 'FREE_DELIVERY' ? 'Orders completed' : 'Visits completed'}
                   </Typography>
                 </div>
                 
                 <div className="text-right">
                   <Typography variant="bodySm" className="opacity-40 uppercase font-black text-[10px] mb-2 tracking-widest">
                     {activePlan.rewardType === 'FREE_DELIVERY' ? 'Delivery Savings' : 'Current Reward Value'}
                   </Typography>
                   <Typography variant="titleMd" className={cn(
                     "text-2xl font-black tracking-tighter",
                     activePlan.rewardType === 'FREE_DELIVERY' ? "text-blue-600" : ""
                   )}>
                     {activePlan.rewardType === 'FREE_DELIVERY' 
                       ? `FREE` 
                       : `NPR ${(userMembership.currentVisits > 0 ? userMembership.totalSpent / userMembership.currentVisits : 0).toLocaleString()}`
                     }
                   </Typography>
                 </div>
               </div>

               <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-4 mb-8">
                  {Array.from({ length: activePlan.targetVisits }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square rounded-xl md:rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
                        i < userMembership.currentVisits 
                          ? activePlan.rewardType === 'FREE_DELIVERY'
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-bazar-black border-bazar-black text-white dark:bg-bazar-white dark:border-bazar-white dark:text-bazar-black" 
                          : "border-bazar-gray-100 dark:border-bazar-gray-900 bg-transparent"
                      )}
                    >
                       {i < userMembership.currentVisits ? (
                         <ShieldCheck className="w-4 h-4 md:w-6 md:h-6" />
                       ) : (
                         <Typography variant="bodySm" className="text-[10px] font-black opacity-20">{i + 1}</Typography>
                       )}
                    </div>
                  ))}
               </div>

               {userMembership.isRewardAvailable && (
                 <div className="p-6 bg-green-500 text-white rounded-2xl flex items-center justify-between animate-bounce">
                    <div className="flex items-center gap-4">
                      <Trophy className="w-6 h-6" />
                      <div>
                        <Typography variant="titleMd" className="font-black uppercase tracking-widest text-sm">Reward Unlocked!</Typography>
                        <Typography variant="bodySm" className="opacity-80 text-[10px] font-bold">Show this at the counter to redeem your free visit.</Typography>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-white text-green-600 border-none uppercase font-black text-[9px]">Redeem</Button>
                 </div>
               )}
            </Card>

            {/* Validation Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="p-8 border-bazar-gray-200 dark:border-bazar-gray-800">
                  <div className="flex items-center gap-3 mb-6">
                    <QrCode className="w-5 h-5 opacity-40" />
                    <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm">In-Store Validation</Typography>
                  </div>
                  
                  <Typography variant="bodySm" className="opacity-40 text-xs mb-8 leading-relaxed">
                    Making a purchase in-store? Ask the vendor for their 4-digit Secret PIN to validate your visit and track your spend.
                  </Typography>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Purchase Amount (NPR)</label>
                      <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 1500"
                        className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 ring-bazar-black/5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">4-Digit PIN</label>
                      <input 
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="****"
                        className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-center text-xl font-mono tracking-[1em] outline-none focus:ring-2 ring-bazar-black/5"
                      />
                    </div>
                    <Button 
                      className="w-full h-14 uppercase font-black tracking-widest text-[11px] rounded-xl mt-4"
                      disabled={!pin || !amount || isVerifying}
                      onClick={handleValidatePurchase}
                    >
                      {isVerifying ? "Verifying..." : "Validate Purchase"}
                    </Button>

                    {message && (
                      <div className={cn(
                        "p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest animate-in fade-in zoom-in duration-300",
                        message.type === 'success' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {message.text}
                      </div>
                    )}
                  </div>
               </Card>

               <div className="space-y-8">
                  <Card className="p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                    <div className="flex items-center gap-3 mb-4">
                      <History className="w-5 h-5 opacity-40" />
                      <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm">Last Visit</Typography>
                    </div>
                    <Typography variant="bodySm" className="font-bold text-sm">
                      {new Date(userMembership.lastVisitAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </Typography>
                    <Typography variant="bodySm" className="opacity-40 uppercase font-black text-[9px] mt-1 tracking-widest">
                      NPR {userMembership.totalSpent.toLocaleString()} total spent so far
                    </Typography>
                  </Card>

                  <Card className="p-8 border-dashed border-2 border-bazar-gray-200 dark:border-bazar-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-5 h-5 opacity-40" />
                      <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm">Privacy</Typography>
                    </div>
                    <Typography variant="bodySm" className="opacity-40 text-[10px] leading-relaxed">
                      Your spending habits are only shared with the vendor to calculate your rewards. Your personal data remains encrypted and private.
                    </Typography>
                  </Card>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }: any) {
  return (
    <div className="p-8 rounded-3xl bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-100 dark:border-bazar-gray-900 group hover:bg-white dark:hover:bg-bazar-black transition-all duration-500">
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-bazar-gray-900 border border-bazar-gray-100 dark:border-bazar-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>
      <Typography variant="titleMd" className="font-black uppercase tracking-widest text-xs mb-3">{title}</Typography>
      <Typography variant="bodySm" className="opacity-40 text-xs leading-relaxed">{description}</Typography>
    </div>
  );
}
