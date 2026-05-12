"use client";

import {  use,useState, useEffect, useMemo } from "react";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useMembershipStore } from "@/store/useMembershipStore";
import { useCampaignStore } from "@/store/useCampaignStore";
import { VENDORS, PRODUCTS } from "@/data/mock";
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
  History,
  Gift,
  Tag,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  TrendingUp,
  X,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VendorNavbar } from "@/components/shared/VendorNavbar";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "@/components/shared/AuthModal";

interface MembershipPageProps {
  params: Promise<{ slug: string }>;
}

export default function VendorMembershipPage({ params }: MembershipPageProps) {
  const { slug } = use(params);
  const { user, isAuthenticated } = useAuthStore();
  const { getVendorPlans, enrollInPlan, userMemberships, recordPurchase, getVendorPin } = useMembershipStore();
  const { getVendorCampaigns } = useCampaignStore();
  
  const vendor = VENDORS.find((v) => v.slug === slug);
  const vendorPlans = vendor ? getVendorPlans(vendor.id) : [];
  const vendorCampaigns = vendor ? getVendorCampaigns(vendor.id).filter(c => c.status === 'ACTIVE') : [];
  const vendorPin = vendor ? getVendorPin(vendor.id) : '882299';
  
  const [activePlanId, setActivePlanId] = useState<string | null>(vendorPlans[0]?.id || null);
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (!vendor) return notFound();

  const activePlan = vendorPlans.find(p => p.id === activePlanId);
  const userMembership = userMemberships.find(m => m.userId === user?.id && m.planId === activePlanId);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (activePlanId) {
      enrollInPlan(user!.id, vendor.id, activePlanId);
    }
  };

  const handleValidatePurchase = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!userMembership || !activePlan) return;
    
    if (activePlan.isOnlineOnlyReward) {
      setMessage({ type: 'error', text: "Validation PIN is only for in-store visits. Online rewards are tracked automatically!" });
      return;
    }

    if (pin.length !== 6) {
      setMessage({ type: 'error', text: "Please enter a valid 6-digit PIN" });
      return;
    }

    if (pin !== vendorPin) {
      setMessage({ type: 'error', text: "Invalid Secret PIN. Please check with the vendor." });
      return;
    }

    setIsVerifying(true);
    // Note: recordPurchase also checks PIN internally, but we can check it here for immediate feedback
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
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bazar-black/5 dark:bg-bazar-white/5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <Typography variant="bodySm" className="text-[10px] uppercase font-black tracking-widest">Premium Rewards & Offers</Typography>
          </motion.div>
          <Typography variant="displaySm" className="text-4xl md:text-7xl tracking-tighter font-black mb-8 leading-[0.9]">
            Join the <span className="italic text-bazar-gray-300">Club</span> at <br/>
            <span className="text-bazar-black dark:text-bazar-white uppercase underline decoration-4 underline-offset-8 decoration-amber-500">{vendor.name}</span>
          </Typography>
          
          <Typography variant="bodySm" className="opacity-40 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed mb-12">
            Unlock exclusive member-only pricing, early access to new collections, and earn rewards for every visit.
          </Typography>

          {/* Plan Selector */}
          <div className="flex flex-wrap justify-center gap-3">
            {vendorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setActivePlanId(plan.id);
                  setMessage(null);
                }}
                className={cn(
                  "px-8 py-4 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] transition-all duration-500 border-2",
                  activePlanId === plan.id 
                    ? "bg-bazar-black border-bazar-black text-white dark:bg-bazar-white dark:border-bazar-white dark:text-bazar-black shadow-2xl scale-105"
                    : "bg-bazar-gray-50 border-transparent dark:bg-bazar-gray-950 opacity-40 hover:opacity-100"
                )}
              >
                {plan.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
            {/* Membership Section */}
            <section className="space-y-12">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
                  <Typography variant="titleMd" className="uppercase tracking-[0.3em] text-[10px] font-black opacity-30">Membership Plan</Typography>
                  <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
               </div>

               {!activePlan ? (
                 <div className="text-center py-20 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[3rem]">
                    <Typography variant="bodySm" className="opacity-30 italic">No active membership plans available.</Typography>
                 </div>
               ) : !userMembership ? (
                 <div className="space-y-12">
                    <Card className="p-8 md:p-16 border-2 border-bazar-black dark:border-bazar-white bg-white dark:bg-bazar-black overflow-hidden relative group rounded-[3rem]">
                       <div className="absolute top-0 right-0 w-96 h-96 bg-bazar-black/5 dark:bg-bazar-white/5 -mr-48 -mt-48 rounded-full group-hover:scale-110 transition-transform duration-1000" />
                       <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                          <div className="flex-1 space-y-6 text-center md:text-left">
                             <Typography variant="titleMd" className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none">{activePlan.title}</Typography>
                             <Typography variant="bodySm" className="opacity-60 text-sm md:text-base leading-relaxed max-w-md">
                               {activePlan.description}
                             </Typography>
                             <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                <BenefitBadge icon={Trophy} label={`${activePlan.targetVisits} Visits Target`} />
                                <BenefitBadge icon={Zap} label={activePlan.rewardType.replace('_', ' ')} />
                                {activePlan.isOnlineOnlyReward && <BenefitBadge icon={Globe} label="Online Only" />}
                             </div>
                             <div className="pt-8">
                                <Button 
                                  className="h-16 px-12 gap-3 bg-bazar-black text-white hover:opacity-90 dark:bg-bazar-white dark:text-bazar-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-2xl transition-all"
                                  onClick={handleEnroll}
                                >
                                  Enroll Now
                                  <ArrowRight className="w-5 h-5" />
                                </Button>
                             </div>
                          </div>
                          <div className="w-full md:w-64 aspect-square bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-[2.5rem] flex items-center justify-center border border-bazar-gray-100 dark:border-bazar-gray-900 rotate-3 group-hover:rotate-0 transition-transform duration-700">
                             <QrCode className="w-32 h-32 opacity-10" />
                          </div>
                       </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <BenefitCard 
                          icon={Star} 
                          title="Instant Recognition" 
                          description="Your loyalty is tracked across all our sales channels automatically."
                       />
                       <BenefitCard 
                          icon={ShieldCheck} 
                          title="Secure Validation" 
                          description="A simple 6-digit PIN system protects your rewards from unauthorized use."
                       />
                       <BenefitCard 
                          icon={TrendingUp} 
                          title="Higher Value" 
                          description="Member rewards are calculated based on your average order value."
                       />
                    </div>
                 </div>
               ) : (
                 <div className="space-y-10">
                    {/* Progress Tracker */}
                    <Card className="p-8 md:p-12 border-bazar-gray-200 dark:border-bazar-gray-800 rounded-[3rem] relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8">
                          <div className={cn(
                            "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2",
                            activePlan.isOnlineOnlyReward ? "bg-blue-100 border-blue-500/20 text-blue-600" : "bg-green-100 border-green-500/20 text-green-600"
                          )}>
                            {activePlan.isOnlineOnlyReward ? "Online Exclusive" : "Hybrid Plan"}
                          </div>
                       </div>

                       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12">
                         <div>
                            <Typography variant="titleMd" className="uppercase tracking-[0.2em] font-black text-[10px] mb-4 opacity-40">Your Progress To Reward</Typography>
                            <div className="flex items-end gap-4">
                               <Typography variant="displaySm" className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                 {userMembership.currentVisits}
                               </Typography>
                               <Typography variant="titleMd" className="text-2xl md:text-4xl font-black text-bazar-gray-300 mb-2 md:mb-4">
                                 / {activePlan.targetVisits}
                               </Typography>
                            </div>
                         </div>
                         <div className="md:text-right space-y-2">
                            <Typography variant="bodySm" className="opacity-40 uppercase font-black text-[10px] tracking-[0.2em]">Est. Reward Value</Typography>
                            <Typography variant="titleMd" className="text-3xl font-black tracking-tighter">
                               {activePlan.rewardType === 'FREE_DELIVERY' 
                                 ? 'FREE' 
                                 : `रु ${(userMembership.currentVisits > 0 ? userMembership.totalSpent / userMembership.currentVisits : 0).toLocaleString()}`
                               }
                            </Typography>
                            <div className="flex items-center gap-2 md:justify-end opacity-40">
                               <History className="w-3 h-3" />
                               <Typography variant="bodySm" className="text-[10px] font-mono uppercase font-bold">Last: {new Date(userMembership.lastVisitAt).toLocaleDateString()}</Typography>
                            </div>
                         </div>
                       </div>

                       <div className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 mb-12">
                          {Array.from({ length: activePlan.targetVisits }).map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "aspect-square rounded-2xl md:rounded-3xl border-2 flex items-center justify-center transition-all duration-700",
                                i < userMembership.currentVisits 
                                  ? activePlan.rewardType === 'FREE_DELIVERY'
                                    ? "bg-blue-600 border-blue-600 text-white scale-105 shadow-xl shadow-blue-500/20"
                                    : "bg-bazar-black border-bazar-black text-white dark:bg-bazar-white dark:border-bazar-white dark:text-bazar-black scale-105 shadow-xl shadow-black/20" 
                                  : "border-bazar-gray-100 dark:border-bazar-gray-900 bg-transparent opacity-20"
                              )}
                            >
                               {i < userMembership.currentVisits ? (
                                 <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8" />
                               ) : (
                                 <Typography variant="bodySm" className="text-xs font-black">{i + 1}</Typography>
                               )}
                            </div>
                          ))}
                       </div>

                       {userMembership.isRewardAvailable && (
                         <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-8 bg-amber-500 text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-amber-500/40"
                         >
                            <div className="flex items-center gap-6 text-center md:text-left">
                              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                                 <Trophy className="w-8 h-8" />
                              </div>
                              <div>
                                <Typography variant="titleMd" className="font-black uppercase tracking-[0.2em] text-sm mb-1">Reward Unlocked!</Typography>
                                <Typography variant="bodySm" className="opacity-80 text-xs font-bold uppercase tracking-widest leading-relaxed">Show this screen to the counter to redeem <br className="hidden md:block"/> your free visit reward today.</Typography>
                              </div>
                            </div>
                            <Button className="h-14 px-10 bg-white text-amber-500 hover:bg-bazar-gray-100 border-none uppercase font-black tracking-[0.2em] text-[10px] rounded-xl">Redeem Now</Button>
                         </motion.div>
                       )}
                    </Card>

                    {/* In-Store Validation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <Card className="p-8 md:p-10 border-bazar-gray-200 dark:border-bazar-gray-800 rounded-[2.5rem] bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-white dark:bg-bazar-black rounded-xl border border-bazar-gray-100 dark:border-bazar-gray-900 shadow-sm">
                               <QrCode className="w-4 h-4 opacity-40" />
                            </div>
                            <Typography variant="titleMd" className="uppercase tracking-[0.2em] font-black text-[10px]">In-Store Validation</Typography>
                          </div>
                          
                          <Typography variant="bodySm" className="opacity-40 text-xs mb-8 leading-relaxed font-medium">
                            Making a purchase in-store? Provide your validation details to earn progress. Ask the vendor for their 6-digit Secret PIN.
                          </Typography>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Purchase Amount (रु)</label>
                              <input 
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="e.g. 1500"
                                className="w-full h-14 bg-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl px-6 text-sm font-black outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all shadow-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">6-Digit Secret PIN</label>
                              <input 
                                type="password"
                                maxLength={6}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="••••••"
                                className="w-full h-16 bg-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl px-6 text-center text-3xl font-mono tracking-[0.5em] outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all shadow-sm"
                              />
                            </div>
                            <Button 
                              className="w-full h-16 uppercase font-black tracking-[0.3em] text-[10px] rounded-2xl mt-4 shadow-xl active:scale-[0.98] transition-all"
                              disabled={!pin || !amount || isVerifying}
                              onClick={handleValidatePurchase}
                            >
                              {isVerifying ? "Authenticating..." : "Validate Purchase"}
                            </Button>

                            <AnimatePresence>
                               {message && (
                                 <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className={cn(
                                    "p-5 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest border-2",
                                    message.type === 'success' ? "bg-green-50/50 text-green-700 border-green-500/20" : "bg-red-50/50 text-red-700 border-red-500/20"
                                  )}
                                 >
                                   {message.text}
                                 </motion.div>
                               )}
                            </AnimatePresence>
                          </div>
                       </Card>

                       <div className="space-y-8">
                          <Card className="p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 rounded-[2rem] flex flex-col justify-between">
                            <div className="space-y-6">
                               <div className="flex items-center gap-3">
                                 <History className="w-5 h-5 opacity-40" />
                                 <Typography variant="titleMd" className="uppercase tracking-[0.2em] font-black text-[10px]">Lifetime Spend</Typography>
                               </div>
                               <Typography variant="displaySm" className="text-4xl font-black tracking-tighter">
                                 रु {userMembership.totalSpent.toLocaleString()}
                               </Typography>
                               <Typography variant="bodySm" className="opacity-40 uppercase font-black text-[9px] tracking-widest">
                                 Across {userMembership.currentVisits} verified visits
                               </Typography>
                            </div>
                            <div className="pt-8 flex items-center justify-between border-t border-bazar-gray-100 dark:border-bazar-gray-900 mt-8">
                               <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-40">Status</Typography>
                               <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest">Elite Member</div>
                            </div>
                          </Card>

                          <Card className="p-8 border-dashed border-2 border-bazar-gray-200 dark:border-bazar-gray-800 rounded-[2rem]">
                            <div className="flex items-center gap-3 mb-4">
                              <Lock className="w-5 h-5 opacity-40" />
                              <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm">Privacy Vault</Typography>
                            </div>
                            <Typography variant="bodySm" className="opacity-40 text-[10px] leading-relaxed font-medium">
                              Your purchase history is only accessible by you and {vendor.name}. We use bank-grade encryption to ensure your data is never shared with third parties.
                            </Typography>
                          </Card>
                       </div>
                    </div>
                 </div>
               )}
            </section>

            {/* Marketing Campaigns Section */}
            <section className="space-y-12">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
                  <Typography variant="titleMd" className="uppercase tracking-[0.3em] text-[10px] font-black opacity-30">Active Offers</Typography>
                  <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
               </div>

               {vendorCampaigns.length === 0 ? (
                 <div className="text-center py-16 opacity-30 italic">
                    <Typography variant="bodySm">No additional offers available right now.</Typography>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vendorCampaigns.map((campaign) => (
                      <CampaignPromoCard key={campaign.id} campaign={campaign} />
                    ))}
                 </div>
               )}
            </section>
          </div>

          {/* Sidebar / QR Section */}
          <div className="lg:col-span-4 space-y-8">
             <div className="sticky top-24">
                <Card className="p-10 border-2 border-bazar-black dark:border-bazar-white rounded-[3rem] text-center bg-white dark:bg-bazar-black">
                   <div className="mb-8 p-6 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-[2rem] flex items-center justify-center">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bazar.com/vendor/${slug}/membership`} 
                        alt="Vendor QR"
                        className="w-full aspect-square opacity-80 mix-blend-multiply dark:mix-blend-screen"
                      />
                   </div>
                   <Typography variant="titleSm" className="uppercase tracking-[0.3em] text-[10px] font-black mb-4">Store Identity</Typography>
                   <Typography variant="titleMd" className="text-2xl font-black mb-6 uppercase tracking-tighter">{vendor.name}</Typography>
                   <div className="flex flex-col gap-3">
                      <Button variant="outline" className="w-full h-12 rounded-xl uppercase font-black text-[9px] tracking-widest">Share Profile</Button>
                      <Button variant="outline" className="w-full h-12 rounded-xl uppercase font-black text-[9px] tracking-widest">Contact Support</Button>
                   </div>
                </Card>

                {/* Recently Redeemed */}
                <div className="mt-12 space-y-6">
                   <Typography variant="titleMd" className="uppercase tracking-[0.2em] font-black text-[10px] opacity-40 ml-4">Recent Community Wins</Typography>
                   <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-100 dark:border-bazar-gray-900 animate-pulse">
                           <div className="w-10 h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center">
                              <UserIcon className="w-4 h-4 opacity-20" />
                           </div>
                           <div>
                              <Typography variant="bodySm" className="text-[10px] font-black">Anonymous User</Typography>
                              <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-bold tracking-widest">Redeemed Free Meal • 2h ago</Typography>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

function CampaignPromoCard({ campaign }: { campaign: any }) {
  const Icon = campaign.type === 'FREE_DELIVERY' ? Clock : Gift;
  
  return (
    <Card className="p-8 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[2.5rem] hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 group">
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center border border-bazar-gray-100 dark:border-bazar-gray-900 group-hover:scale-110 transition-transform">
             <Icon className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="px-3 py-1 rounded-full bg-amber-500 text-white text-[8px] font-black uppercase tracking-widest">
             {campaign.type.replace('_', ' ')}
          </div>
       </div>
       <Typography variant="titleSm" className="text-xl font-black mb-2 tracking-tighter group-hover:underline cursor-pointer">{campaign.title}</Typography>
       <Typography variant="bodySm" className="opacity-40 text-xs leading-relaxed mb-8 line-clamp-2">{campaign.description}</Typography>
       
       <div className="flex items-center justify-between pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
          <div className="flex flex-col">
             <Typography variant="bodySm" className="text-[9px] uppercase font-black opacity-30">Offer Value</Typography>
             <Typography variant="titleMd" className="text-xl font-black tracking-tighter">
                {campaign.valueType === 'PERCENT' ? `${campaign.value}% OFF` : `NPR ${campaign.value} OFF`}
             </Typography>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950">
             <ArrowRight className="w-4 h-4 opacity-40" />
          </Button>
       </div>
    </Card>
  );
}

function BenefitBadge({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900">
       <Icon className="w-3.5 h-3.5 opacity-40" />
       <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest opacity-60">{label}</Typography>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }: any) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-100 dark:border-bazar-gray-900 group hover:bg-white dark:hover:bg-bazar-black transition-all duration-500">
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-bazar-gray-900 border border-bazar-gray-100 dark:border-bazar-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
        <Icon className="w-7 h-7 opacity-20 group-hover:opacity-100 transition-opacity" />
      </div>
      <Typography variant="titleMd" className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-60">{title}</Typography>
      <Typography variant="bodySm" className="opacity-40 text-xs leading-relaxed font-medium">{description}</Typography>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

