"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useMembershipStore } from "@/store/useMembershipStore";
import { 
  User, 
  Plus, 
  QrCode, 
  Settings, 
  Users, 
  Trophy, 
  History,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MembershipDashboard() {
  const { user } = useAuthStore();
  const { getVendorPlans, plans, userMemberships } = useMembershipStore();
  const vendorPlans = getVendorPlans(user?.vendorId || 'v1');
  
  const [showQR, setShowQR] = useState(false);

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
            Customer Retention
          </Typography>
          <Typography variant="displaySm" className="text-3xl md:text-5xl tracking-tighter font-black">
            Membership <span className="text-bazar-gray-300">Club</span>
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="h-12 px-6 gap-2 uppercase font-black tracking-widest text-[10px]"
            onClick={() => setShowQR(!showQR)}
          >
            <QrCode className="w-4 h-4" />
            {showQR ? "Hide QR" : "Store QR"}
          </Button>
          <Button className="h-12 px-6 gap-2 uppercase font-black tracking-widest text-[10px]">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {showQR && (
        <Card className="p-8 md:p-12 border-2 border-dashed border-bazar-black/10 dark:border-bazar-white/10 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 flex flex-col items-center text-center animate-in slide-in-from-top duration-500">
          <div className="bg-white p-6 rounded-3xl shadow-2xl mb-8 group hover:scale-105 transition-transform duration-500 cursor-pointer">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bazar.com/vendor/${user?.vendorId}/membership`} 
              alt="Store QR Code"
              className="w-48 h-48 md:w-64 md:h-64"
            />
          </div>
          <Typography variant="titleMd" className="mb-2 uppercase tracking-widest font-black">In-Store QR Code</Typography>
          <Typography variant="bodySm" className="opacity-40 max-w-md mb-8">
            Print this QR code and place it at your billing counter. Customers can scan to join your membership club and track their rewards.
          </Typography>
          <div className="flex gap-4">
             <Button variant="outline" size="sm" className="uppercase font-bold tracking-widest text-[9px]">Download PDF</Button>
             <Button variant="outline" size="sm" className="uppercase font-bold tracking-widest text-[9px]">Print Sticker</Button>
          </div>
        </Card>
      )}

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
              <Card key={plan.id} className="p-6 md:p-8 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <Typography variant="titleMd" className="font-black tracking-tight">{plan.title}</Typography>
                    </div>
                    <Typography variant="bodySm" className="opacity-40 max-w-sm">{plan.description}</Typography>
                  </div>
                  <div className="flex flex-col items-end gap-2">
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
                    <Typography variant="bodySm" className="font-mono font-bold tracking-[0.3em]">****</Typography>
                  </div>
                </div>
              </Card>
            ))}
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
                  Always ask for the customer's phone number or scan their personal QR code before entering the 4-digit PIN to validate their in-store purchase.
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </div>
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
