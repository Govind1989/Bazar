"use client";

import { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useMembershipStore } from "@/store/useMembershipStore";
import { VENDORS } from "@/data/mock";
import { 
  Plus, 
  QrCode, 
  Users, 
  Trophy, 
  TrendingUp,
  ShieldCheck,
  Target,
  Edit2,
  Trash2,
  X as CloseIcon,
  Save,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MembershipPlan, MembershipType, RewardType } from "@/types/membership";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MembershipDashboard() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const { getVendorPlans, addPlan, updatePlan, deletePlan, setVendorPin, getVendorPin } = useMembershipStore();
  
  const vendor = VENDORS.find(v => v.id === user?.vendorId) || VENDORS[0];
  const vendorPlans = getVendorPlans(vendor.id);
  
  const [showQR, setShowQR] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [globalPin, setLocalGlobalPin] = useState(getVendorPin(vendor.id));
  const [isPinEditing, setIsPinEditing] = useState(false);

  // Check for auto-open action
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsFormOpen(true);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams]);

  const handleOpenForm = (plan?: MembershipPlan) => {
    setEditingPlan(plan || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPlan(null);
  };

  const handleSavePin = () => {
    if (globalPin.length === 6) {
      setVendorPin(vendor.id, globalPin);
      // Update all existing plans to use this pin for consistency
      vendorPlans.forEach(plan => {
        updatePlan(plan.id, { secretPin: globalPin });
      });
      setIsPinEditing(false);
    }
  };

  // Mock enrolled users for demonstration
  const enrolledUsers = [
    { name: "Suman Thapa", visits: 8, target: 10, totalSpent: 8500, avatar: "ST" },
    { name: "Adarsh Jha", visits: 10, target: 10, totalSpent: 12000, avatar: "AJ", rewardReady: true },
    { name: "Rina Sharma", visits: 3, target: 10, totalSpent: 2800, avatar: "RS" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 md:space-y-12 animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.3em] text-[10px] opacity-40 mb-2 font-black">
            Retention & Loyalty Engine
          </Typography>
          <Typography variant="displaySm" className="text-3xl md:text-5xl tracking-tighter font-black">
            Customer <span className="text-bazar-gray-300">Club</span>
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            className="h-12 px-6 gap-2 uppercase font-black tracking-widest text-[10px] rounded-xl border-2"
            onClick={() => setShowQR(!showQR)}
          >
            <QrCode className="w-4 h-4" />
            {showQR ? "Close Toolkit" : "Merchant Toolkit"}
          </Button>
          <Link href="/dashboard/campaigns">
            <Button 
              variant="outline"
              className="h-12 px-6 gap-2 uppercase font-black tracking-widest text-[10px] rounded-xl border-2"
            >
              <Gift className="w-4 h-4" />
              Marketing Hub
            </Button>
          </Link>
          <Button 
            className="h-12 px-6 gap-2 uppercase font-black tracking-widest text-[10px] rounded-xl bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black"
            onClick={() => handleOpenForm()}
          >
            <Plus className="w-4 h-4" />
            New Membership
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
               <Card className="p-8 md:p-12 border-2 border-bazar-black dark:border-bazar-white bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 flex flex-col items-center text-center rounded-[2.5rem]">
                  <div className="bg-white p-6 rounded-3xl shadow-2xl mb-8 group hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bazar.com/vendor/${vendor.slug}/membership`} 
                      alt="Store QR Code"
                      className="w-48 h-48 md:w-56 md:h-56"
                    />
                  </div>
                  <Typography variant="titleMd" className="mb-2 uppercase tracking-widest font-black text-sm">Storefront QR Gateway</Typography>
                  <Typography variant="bodySm" className="opacity-40 max-w-xs mb-8 text-[10px] leading-relaxed uppercase font-bold tracking-widest">
                    Place this at your POS. Customers scan to join, track progress, and validate purchases instantly.
                  </Typography>
                  <div className="flex gap-4">
                     <Button variant="outline" size="sm" className="h-10 px-4 uppercase font-black tracking-widest text-[8px] rounded-lg">Download Kit</Button>
                     <Button variant="outline" size="sm" className="h-10 px-4 uppercase font-black tracking-widest text-[8px] rounded-lg">Order Stickers</Button>
                  </div>
               </Card>

               <Card className="p-8 md:p-12 border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 bg-white dark:bg-bazar-black rounded-[2.5rem] flex flex-col justify-center">
                  <div className="space-y-8">
                     <div>
                        <Typography variant="titleMd" className="mb-2 uppercase tracking-[0.2em] font-black text-sm">Security Configuration</Typography>
                        <Typography variant="bodySm" className="opacity-40 text-xs leading-relaxed max-w-md">
                          Set a unique 6-digit PIN for your store. Your staff will use this to validate customer purchases on their phones during checkout.
                        </Typography>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Global Validation PIN</label>
                              <div className="relative group">
                                 <input 
                                    type="text"
                                    value={globalPin}
                                    onChange={(e) => setLocalGlobalPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    readOnly={!isPinEditing}
                                    className={cn(
                                       "w-full h-16 bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl px-6 text-2xl font-mono font-black tracking-[0.5em] outline-none transition-all",
                                       isPinEditing && "border-bazar-black dark:border-bazar-white bg-white dark:bg-bazar-black"
                                    )}
                                 />
                                 {!isPinEditing && (
                                    <Button 
                                       variant="ghost" 
                                       size="icon" 
                                       className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                       onClick={() => setIsPinEditing(true)}
                                    >
                                       <Edit2 className="w-4 h-4" />
                                    </Button>
                                 )}
                              </div>
                           </div>
                           <div className="pt-6">
                              <Button 
                                 className="h-16 w-16 rounded-2xl"
                                 disabled={!isPinEditing || globalPin.length !== 6}
                                 onClick={handleSavePin}
                              >
                                 <Save className="w-5 h-5" />
                              </Button>
                           </div>
                        </div>
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 flex items-start gap-4">
                           <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                           <Typography variant="bodySm" className="text-[10px] text-amber-700 dark:text-amber-400 leading-relaxed font-bold uppercase tracking-widest">
                             Warning: Changing your PIN will require all active staff to re-authenticate their validation sessions.
                           </Typography>
                        </div>
                     </div>
                  </div>
               </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Members" 
          value={vendorPlans.reduce((acc, p) => acc + p.enrolledUsers, 0).toString()} 
          icon={Users} 
          trend="+12%"
        />
        <StatsCard 
          label="Redemptions" 
          value={vendorPlans.reduce((acc, p) => acc + p.totalRedemptions, 0).toString()} 
          icon={Trophy} 
          trend="+5%"
        />
        <StatsCard 
          label="Delivery Savings" 
          value="NPR 8.4K" 
          icon={TrendingUp} 
          description="Total delivery fees saved by members"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Active Campaigns */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm">Active Campaigns</Typography>
            <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100">Manage All</Button>
          </div>
          
          <div className="space-y-4">
            {vendorPlans.map((plan) => (
              <Card key={plan.id} className="p-6 md:p-8 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg bg-white dark:bg-bazar-black"
                    onClick={() => handleOpenForm(plan)}
                   >
                     <Edit2 className="w-3.5 h-3.5" />
                   </Button>
                   <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg bg-white dark:bg-bazar-black text-red-500 border-red-500/20 hover:bg-red-50"
                    onClick={() => {
                      if(confirm("Are you sure you want to delete this campaign?")) {
                        deletePlan(plan.id);
                      }
                    }}
                   >
                     <Trash2 className="w-3.5 h-3.5" />
                   </Button>
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <Typography variant="titleMd" className="font-black tracking-tight">{plan.title}</Typography>
                    </div>
                    <Typography variant="bodySm" className="opacity-40 max-w-sm">{plan.description}</Typography>
                  </div>
                  <div className="flex flex-col items-end gap-2 pr-12">
                    <div className="bg-bazar-gray-100 dark:bg-bazar-gray-900 p-3 rounded-2xl">
                      <ShieldCheck className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {plan.isOnlineOnlyReward && (
                      <div className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-widest">
                        Online Only
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                  <div>
                    <Typography variant="bodySm" className="text-[9px] uppercase font-black opacity-30 mb-1">Target</Typography>
                    <Typography variant="bodySm" className="font-mono font-bold">{plan.targetVisits} {plan.rewardType === 'FREE_DELIVERY' ? 'Orders' : 'Visits'}</Typography>
                  </div>
                  <div>
                    <Typography variant="bodySm" className="text-[9px] uppercase font-black opacity-30 mb-1">Reward</Typography>
                    <Typography variant="bodySm" className={cn(
                      "font-mono font-bold",
                      plan.rewardType === 'FREE_DELIVERY' ? "text-blue-600" : "text-green-600"
                    )}>
                      {plan.rewardType === 'FREE_DELIVERY' ? 'FREE DELIVERY' : `${plan.rewardValue}% OFF`}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="bodySm" className="text-[9px] uppercase font-black opacity-30 mb-1">Members</Typography>
                    <Typography variant="bodySm" className="font-mono font-bold">{plan.enrolledUsers}</Typography>
                  </div>
                  <div>
                    <Typography variant="bodySm" className="text-[9px] uppercase font-black opacity-30 mb-1">Secret PIN</Typography>
                    <Typography variant="bodySm" className="font-mono font-bold tracking-[0.2em]">{plan.secretPin}</Typography>
                  </div>
                </div>
              </Card>
            ))}
            {vendorPlans.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-3xl">
                <Typography variant="bodySm" className="opacity-30 italic">No membership campaigns created yet.</Typography>
              </div>
            )}
          </div>
        </div>

        {/* Member List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="titleMd" className="uppercase tracking-widest font-black text-sm">Recent Activity</Typography>
            <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100">View History</Button>
          </div>

          <Card className="overflow-hidden border-bazar-gray-200 dark:border-bazar-gray-800">
             <div className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
               {enrolledUsers.map((member, i) => (
                 <div key={i} className="p-5 flex items-center justify-between hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group cursor-pointer">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center text-white dark:text-black font-black text-xs">
                       {member.avatar}
                     </div>
                     <div>
                       <Typography variant="bodySm" className="font-bold">{member.name}</Typography>
                       <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase font-bold tracking-tighter">
                         {member.visits}/{member.target} VISITS • NPR {member.totalSpent.toLocaleString()}
                       </Typography>
                     </div>
                   </div>
                   {member.rewardReady ? (
                     <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[8px] font-black uppercase tracking-widest animate-bounce">
                       Reward Ready
                     </div>
                   ) : (
                     <div className="w-12 h-1.5 bg-bazar-gray-100 dark:bg-bazar-gray-800 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-bazar-black dark:bg-bazar-white rounded-full" 
                         style={{ width: `${(member.visits / member.target) * 100}%` }} 
                       />
                     </div>
                   )}
                 </div>
               ))}
             </div>
             <Button variant="ghost" className="w-full h-12 rounded-none text-[10px] uppercase font-black tracking-widest border-t border-bazar-gray-100 dark:border-bazar-gray-900">
               Load More Members
             </Button>
          </Card>

          <Card className="p-6 bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 dark:bg-black/5 rounded-2xl">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <Typography variant="titleMd" className="font-black mb-1">Validation Tip</Typography>
                <Typography variant="bodySm" className="opacity-60 text-xs leading-relaxed">
                  Always ask for the customer's phone number or scan their personal QR code before entering the 6-digit PIN to validate their in-store purchase.
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <MembershipPlanForm 
            vendorId={user?.vendorId || 'v1'}
            plan={editingPlan}
            onClose={handleCloseForm}
            onSave={(data) => {
              if (editingPlan) {
                updatePlan(editingPlan.id, data);
              } else {
                addPlan(data);
              }
              handleCloseForm();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MembershipPlanForm({ vendorId, plan, onClose, onSave }: { 
  vendorId: string, 
  plan: MembershipPlan | null, 
  onClose: () => void, 
  onSave: (data: any) => void 
}) {
  const { getVendorPin } = useMembershipStore();
  const [formData, setFormData] = useState({
    vendorId,
    title: plan?.title || "",
    description: plan?.description || "",
    type: plan?.type || "VISIT_BASED" as MembershipType,
    rewardType: plan?.rewardType || "CASHBACK_PERCENT" as RewardType,
    targetVisits: plan?.targetVisits || 10,
    rewardValue: plan?.rewardValue || 100,
    rewardDescription: plan?.rewardDescription || "",
    isOnlineOnlyReward: plan?.isOnlineOnlyReward || false,
    secretPin: plan?.secretPin || getVendorPin(vendorId),
    status: plan?.status || "ACTIVE" as const,
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-bazar-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-bazar-black rounded-[2.5rem] border border-bazar-gray-100 dark:border-bazar-gray-900 shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12 space-y-8">
           <div className="flex justify-between items-center">
              <div>
                <Typography variant="titleSm" className="uppercase tracking-[0.3em] text-[10px] opacity-40 mb-1 font-black">
                  Campaign Management
                </Typography>
                <Typography variant="titleMd" className="text-2xl font-black uppercase tracking-widest">
                  {plan ? "Edit Campaign" : "New Membership"}
                </Typography>
              </div>
              <Button variant="ghost" size="icon" className="rounded-2xl" onClick={onClose}>
                <CloseIcon className="w-5 h-5" />
              </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Campaign Title</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Platinum Foodie Club"
                    className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 ring-bazar-black/5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Reward Type</label>
                  <select 
                    value={formData.rewardType}
                    onChange={e => setFormData({...formData, rewardType: e.target.value as RewardType, isOnlineOnlyReward: e.target.value === 'FREE_DELIVERY'})}
                    className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-sm font-bold outline-none appearance-none"
                  >
                    <option value="CASHBACK_PERCENT">Cashback / Discount %</option>
                    <option value="FREE_DELIVERY">Free Delivery (Online Only)</option>
                    <option value="FLAT_DISCOUNT">Flat Cash Discount</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Target {formData.rewardType === 'FREE_DELIVERY' ? 'Orders' : 'Visits'}</label>
                  <input 
                    type="number"
                    value={formData.targetVisits}
                    onChange={e => setFormData({...formData, targetVisits: parseInt(e.target.value)})}
                    className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 ring-bazar-black/5"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Reward Value {formData.rewardType === 'CASHBACK_PERCENT' ? '(%)' : formData.rewardType === 'FLAT_DISCOUNT' ? '(NPR)' : ''}</label>
                  <input 
                    type="number"
                    disabled={formData.rewardType === 'FREE_DELIVERY'}
                    value={formData.rewardValue}
                    onChange={e => setFormData({...formData, rewardValue: parseInt(e.target.value)})}
                    className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 ring-bazar-black/5 disabled:opacity-20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Validation PIN (6-Digits)</label>
                  <input 
                    type="text"
                    maxLength={6}
                    value={formData.secretPin}
                    onChange={e => setFormData({...formData, secretPin: e.target.value.replace(/\D/g, '')})}
                    className="w-full h-12 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 text-sm font-mono font-bold tracking-[0.5em] outline-none focus:ring-2 ring-bazar-black/5"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                   <div 
                    className={cn(
                      "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-500",
                      formData.isOnlineOnlyReward ? "bg-blue-500" : "bg-bazar-gray-200 dark:bg-bazar-gray-800"
                    )}
                    onClick={() => setFormData({...formData, isOnlineOnlyReward: !formData.isOnlineOnlyReward})}
                   >
                     <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-500", formData.isOnlineOnlyReward ? "translate-x-6" : "")} />
                   </div>
                   <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-60">Online Only Campaign</Typography>
                </div>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the value proposition to your customers..."
                className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 ring-bazar-black/5 resize-none"
              />
           </div>

           <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1 h-14 uppercase font-black tracking-widest text-xs rounded-2xl" onClick={onClose}>Cancel</Button>
              <Button 
                className="flex-1 h-14 gap-3 uppercase font-black tracking-widest text-xs rounded-2xl"
                onClick={() => onSave(formData)}
              >
                <Save className="w-4 h-4" />
                {plan ? "Update Campaign" : "Publish Campaign"}
              </Button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatsCard({ label, value, trend, icon: Icon, description }: any) {
  return (
    <Card className="p-6 border-bazar-gray-200 dark:border-bazar-gray-800 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 group">
      <div className="flex justify-between items-start mb-4">
        <Typography variant="bodySm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 font-black">
          {label}
        </Typography>
        <div className="p-2 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-xl group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">
          {value}
        </Typography>
        {trend && (
          <Typography variant="bodySm" className="text-green-600 font-black text-[10px] mb-1.5">
            {trend}
          </Typography>
        )}
      </div>
      {description && (
        <Typography variant="bodySm" className="text-[10px] opacity-40 mt-2 uppercase font-bold tracking-widest">
          {description}
        </Typography>
      )}
    </Card>
  );
}
