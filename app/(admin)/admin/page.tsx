"use client";

import { usePlatformStats, useAllVendors } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Store, 
  Package, 
  Users, 
  Activity, 
  ArrowUpRight,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: vendors, isLoading: vendorsLoading } = useAllVendors();

  const pendingVendors = vendors?.filter(v => v.status === 'pending') || [];

  return (
    <div className="p-4 md:p-8 space-y-8 md:space-y-12 animate-in fade-in duration-700">
      {/* Platform Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
         <PlatformStatCard 
            label="Total GMV (All Time)" 
            value={`NPR ${(stats ? stats.totalGmv / 10000000 : 0).toFixed(2)} Cr`} 
            change={stats?.gmvGrowth}
            icon={TrendingUp}
            loading={statsLoading}
         />
         <PlatformStatCard 
            label="Onboarded Vendors" 
            value={stats?.totalVendors.toLocaleString() || "0"} 
            change={stats?.vendorGrowth}
            icon={Store}
            loading={statsLoading}
         />
         <PlatformStatCard 
            label="Products Ecosystem" 
            value={stats?.totalProducts.toLocaleString() || "0"} 
            description="Across 9 categories"
            icon={Package}
            loading={statsLoading}
         />
         <PlatformStatCard 
            label="Active Consumer Base" 
            value={stats?.activeUsers.toLocaleString() || "0"} 
            icon={Users}
            loading={statsLoading}
         />
      </div>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-10">
         {/* Vendor Approval Queue */}
         <Card className="lg:col-span-8 p-0 overflow-hidden border-bazar-gray-200 dark:border-bazar-gray-800">
            <div className="p-5 md:p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
               <div>
                  <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[9px] md:text-[10px] opacity-40 mb-1 font-black">Approval Queue</Typography>
                  <Typography variant="titleMd" className="text-sm md:text-base font-black uppercase tracking-tighter">Vendor Onboarding</Typography>
               </div>
               <Link href="/admin/vendors">
                  <Button variant="ghost" size="sm" className="text-[9px] md:text-[10px] uppercase tracking-widest gap-2 font-bold px-4 h-9">
                     View All <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
               </Link>
            </div>
            
            <div className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
               {vendorsLoading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-24 md:h-28 animate-pulse bg-bazar-white dark:bg-bazar-black" />)
               ) : pendingVendors.length > 0 ? (
                  pendingVendors.map((vendor) => (
                     <div key={vendor.id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center text-lg font-black opacity-40 border border-bazar-gray-200 dark:border-bazar-gray-800 group-hover:scale-105 transition-transform">
                              {vendor.name.charAt(0)}
                           </div>
                           <div className="flex-1 min-w-0">
                              <Typography variant="titleSm" className="font-bold truncate">{vendor.name}</Typography>
                              <Typography variant="bodySm" className="text-[10px] md:text-xs opacity-60 uppercase tracking-wider font-mono truncate">
                                 {vendor.categories.join(', ')} · Applied {vendor.joinedDate}
                              </Typography>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                           <Button variant="outline" size="sm" className="flex-1 md:flex-none h-9 md:h-10 px-4 text-[9px] md:text-[10px] uppercase tracking-widest border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold transition-all">Reject</Button>
                           <Button size="sm" className="flex-1 md:flex-none h-9 md:h-10 px-6 text-[9px] md:text-[10px] uppercase tracking-widest font-bold shadow-xl">Approve</Button>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="p-16 text-center opacity-40">
                     <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />
                     <Typography variant="bodyMd" className="uppercase tracking-widest font-black text-xs">Queue clear. No pending approvals.</Typography>
                  </div>
               )}
            </div>
         </Card>

         {/* System Health / Logs */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-8 font-black">Infrastructure Status</Typography>
               <div className="space-y-6">
                  <StatusRow label="API Gateway" status="operational" />
                  <StatusRow label="Elasticsearch" status="operational" />
                  <StatusRow label="MinIO Storage" status="operational" />
                  <StatusRow label="Redis Cache" status="warning" message="High Latency" />
               </div>
            </Card>

            <Card variant="dark" className="p-6 bg-bazar-black text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform" />
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 text-white font-black">System Alert</Typography>
               <div className="flex gap-4 items-start relative z-10">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  </div>
                  <div>
                     <Typography variant="titleSm" className="text-white mb-2 font-black uppercase tracking-tight">New Category Request</Typography>
                     <Typography variant="bodySm" className="text-[11px] text-bazar-gray-400 mb-6 leading-relaxed">
                        12 vendors have requested a new <span className="text-white italic">Handicrafts</span> category in the last 24 hours.
                     </Typography>
                     <Button size="sm" className="bg-white text-black h-9 text-[10px] uppercase tracking-widest font-bold w-full hover:bg-bazar-gray-100 transition-all">Review Demand</Button>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

function PlatformStatCard({ label, value, change, description, icon: Icon, loading }: any) {
  return (
    <Card className="p-6 border-bazar-gray-200 dark:border-bazar-gray-800 hover:border-bazar-black dark:hover:border-bazar-white transition-all group">
      <div className="flex justify-between items-start mb-4">
         <div className="p-2 rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black transition-colors">
            <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
         </div>
         {change && (
            <div className="flex items-center text-[10px] font-black font-mono text-green-500 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
               +{change}%
            </div>
         )}
      </div>
      <div className="space-y-1">
         <Typography variant="bodySm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 font-bold">{label}</Typography>
         {loading ? (
            <div className="h-8 w-3/4 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded" />
         ) : (
            <Typography variant="displaySm" className="text-3xl tracking-tighter">{value}</Typography>
         )}
         {description && <Typography variant="bodySm" className="text-[10px] opacity-40">{description}</Typography>}
      </div>
    </Card>
  );
}

function StatusRow({ label, status, message }: { label: string, status: 'operational' | 'warning' | 'down', message?: string }) {
   return (
      <div className="flex justify-between items-center">
         <Typography variant="bodySm" className="text-xs font-medium">{label}</Typography>
         <div className="flex items-center gap-2">
            {message && <Typography variant="bodySm" className="text-[10px] opacity-40 font-mono italic">{message}</Typography>}
            <div className={cn(
               "w-2 h-2 rounded-full",
               status === 'operational' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" :
               status === 'warning' ? "bg-amber-500 animate-pulse" : "bg-red-500"
            )} />
         </div>
      </div>
   );
}
