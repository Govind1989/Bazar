"use client";

import { useDashboardStats, useRecentOrders, useInventoryAlerts } from "@/hooks/useDashboardData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Package, ShoppingBag, Users, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: orders, isLoading: ordersLoading } = useRecentOrders();
  const { data: inventory, isLoading: inventoryLoading } = useInventoryAlerts();

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard 
          label="Revenue" 
          value={`NPR ${((stats?.revenue || 0) / 100000).toFixed(1)}L`} 
          change={stats?.revenueChange} 
          icon={Wallet}
          loading={statsLoading}
        />
        <StatsCard 
          label="Total Orders" 
          value={stats?.totalOrders.toString() || "0"} 
          change={stats?.ordersChange} 
          icon={ShoppingBag}
          loading={statsLoading}
        />
        <StatsCard 
          label="Products" 
          value={stats?.productsListed.toString() || "0"} 
          description={`${stats?.outOfStock} out of stock`}
          icon={Package}
          loading={statsLoading}
        />
        <StatsCard 
          label="Store Visitors" 
          value={stats?.visitors.toLocaleString() || "0"} 
          change={stats?.visitorsChange} 
          icon={Users}
          loading={statsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Orders Table */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
            <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] sm:text-xs opacity-60">Recent Orders</Typography>
            <button className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest hover:underline opacity-40 hover:opacity-100 transition-opacity">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px] sm:min-w-0">
              <thead>
                <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Order</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Customer</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Amount</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
                {ordersLoading ? (
                   [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td colSpan={4} className="px-4 sm:px-6 py-3 sm:py-4">
                         <Skeleton className="h-6 sm:h-8 w-full" />
                      </td>
                    </tr>
                   ))
                ) : (
                  orders?.map((order) => (
                    <tr key={order.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-mono text-[10px] sm:text-xs">{order.id}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <Typography variant="bodySm" className="text-[11px] sm:text-sm text-bazar-black dark:text-bazar-white truncate max-w-[100px] sm:max-w-none">{order.customer}</Typography>
                        <Typography variant="bodySm" className="text-[8px] sm:text-[10px] opacity-40 truncate max-w-[100px] sm:max-w-none">{order.product}</Typography>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-medium text-[10px] sm:text-xs">NPR {order.amount.toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                         <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Sidebar Cards */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] sm:text-xs opacity-60 mb-4 sm:mb-6">Inventory Alerts</Typography>
            <div className="space-y-3 sm:space-y-4">
              {inventoryLoading ? (
                <div className="space-y-3 sm:space-y-4">
                   {[1, 2, 3].map(i => <Skeleton key={i} className="h-6 sm:h-8 w-full" />)}
                </div>
              ) : (
                inventory?.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-1.5 sm:py-2 border-b border-bazar-gray-100 dark:border-bazar-gray-900 last:border-none">
                    <Typography variant="bodySm" className="text-[10px] sm:text-xs truncate max-w-[120px]">{item.name}</Typography>
                    <div className={cn(
                      "font-mono text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded",
                      item.low ? "bg-red-100 text-red-600 dark:bg-red-950/30" : "bg-bazar-gray-100 dark:bg-bazar-gray-900"
                    )}>
                      {item.stock} {item.low && "(LOW)"}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="outline" className="w-full mt-4 sm:mt-6 text-[9px] sm:text-[10px] h-8">Stock Report</Button>
          </Card>

          <Card className="p-6 border-2 border-purple-500/20 bg-purple-500/[0.02]">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="titleSm" className="uppercase tracking-widest text-xs font-black text-purple-600 dark:text-purple-400">Marketplace Listings</Typography>
              <div className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[8px] font-black uppercase tracking-widest">Live</div>
            </div>
            <div className="space-y-4">
               <div className="p-3 rounded-xl bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-lg bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 opacity-20" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="bodySm" className="text-[10px] font-bold uppercase truncate">Vintage Nikon Camera</Typography>
                    <Typography variant="bodySm" className="text-[9px] opacity-40">रु 12,000 • 24 Views</Typography>
                  </div>
                  <ArrowUpRight className="w-3 h-3 opacity-20" />
               </div>
            </div>
            <Button variant="outline" className="w-full mt-6 text-[10px] h-8 border-purple-500/20 hover:bg-purple-500/10 hover:text-purple-600 transition-all font-black uppercase tracking-widest">
              Create New Listing
            </Button>
          </Card>

          <Card variant="surface" className="p-6 border-none">
            <Typography variant="titleSm" className="uppercase tracking-widest text-xs opacity-60 mb-2">Platform Tip</Typography>
            <Typography variant="bodySm" className="text-xs leading-relaxed italic opacity-80">
              "Vendors who use high-resolution product photography see a 40% higher conversion rate in the Himalayan category."
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value, change, description, icon: Icon, loading }: any) {
  return (
    <Card className="p-6 relative overflow-hidden group">
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <Typography variant="bodySm" className="uppercase tracking-[0.15em] text-[10px] opacity-40 font-mono">
            {label}
          </Typography>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <Typography variant="displaySm" className="text-2xl md:text-3xl tracking-tighter">
              {value}
            </Typography>
          )}
        </div>
        <div className="p-2 bg-bazar-gray-100 dark:bg-bazar-gray-900 rounded-lg group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4 opacity-40" />
        </div>
      </div>
      
      {!loading && (
        <div className="mt-4 flex items-center gap-2">
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-[10px] font-bold font-mono",
              change >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {Math.abs(change)}%
            </div>
          )}
          {description && (
            <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest font-mono">
              {description}
            </Typography>
          )}
        </div>
      )}
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    paid: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    shipped: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono",
      styles[status]
    )}>
      {status}
    </span>
  );
}
