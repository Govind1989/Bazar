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
    <div className="p-4 md:p-8 space-y-6 md:space-y-10 animate-in fade-in duration-700">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        {/* Recent Orders Table */}
        <Card className="lg:col-span-8 p-0 overflow-hidden border-bazar-gray-200 dark:border-bazar-gray-800">
          <div className="p-4 md:p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
            <div>
              <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[9px] md:text-[10px] opacity-40 mb-1">Recent Activity</Typography>
              <Typography variant="titleMd" className="text-sm md:text-base">Latest Orders</Typography>
            </div>
            <button className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest hover:underline opacity-40 hover:opacity-100 transition-opacity">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] lg:min-w-0">
              <thead>
                <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Order</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Customer</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Amount</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
                {ordersLoading ? (
                   [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td colSpan={4} className="px-4 md:px-6 py-4 md:py-5">
                         <Skeleton className="h-6 md:h-8 w-full" />
                      </td>
                    </tr>
                   ))
                ) : (
                  orders?.map((order) => (
                    <tr key={order.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group">
                      <td className="px-4 md:px-6 py-4 md:py-5 font-mono text-[10px] md:text-xs font-bold">{order.id}</td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <Typography variant="bodySm" className="text-[11px] md:text-sm font-bold text-bazar-black dark:text-bazar-white truncate max-w-[120px] md:max-w-none">{order.customer}</Typography>
                        <Typography variant="bodySm" className="text-[8px] md:text-[10px] opacity-40 truncate max-w-[120px] md:max-w-none">{order.product}</Typography>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5 text-right font-medium text-[10px] md:text-xs">NPR {order.amount.toLocaleString()}</td>
                      <td className="px-4 md:px-6 py-4 md:py-5 text-right">
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
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5 md:p-6 border-bazar-gray-200 dark:border-bazar-gray-800">
            <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[9px] md:text-[10px] opacity-40 mb-6">Inventory Alerts</Typography>
            <div className="space-y-4">
              {inventoryLoading ? (
                <div className="space-y-4">
                   {[1, 2, 3].map(i => <Skeleton key={i} className="h-8 md:h-10 w-full" />)}
                </div>
              ) : (
                inventory?.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-2 border-b border-bazar-gray-100 dark:border-bazar-gray-900 last:border-none">
                    <Typography variant="bodySm" className="text-[10px] md:text-xs font-medium truncate max-w-[140px]">{item.name}</Typography>
                    <div className={cn(
                      "font-mono text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest",
                      item.low ? "bg-red-100 text-red-600 dark:bg-red-950/30" : "bg-bazar-gray-100 dark:bg-bazar-gray-900"
                    )}>
                      {item.stock} {item.low && "LOW"}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="outline" className="w-full mt-6 text-[9px] md:text-[10px] h-9 uppercase font-black tracking-widest">Stock Report</Button>
          </Card>

          <Card className="p-6 border-2 border-purple-500/20 bg-purple-500/[0.02] dark:bg-purple-500/[0.05] overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-center mb-6 relative z-10">
              <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] font-black text-purple-600 dark:text-purple-400">Marketplace</Typography>
              <div className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[8px] font-black uppercase tracking-widest">Live</div>
            </div>
            <div className="space-y-4 relative z-10">
               <div className="p-3.5 rounded-2xl bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 flex gap-3 items-center hover:border-purple-500/30 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 opacity-20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography variant="bodySm" className="text-[10px] md:text-[11px] font-bold uppercase truncate">Vintage Nikon Camera</Typography>
                    <Typography variant="bodySm" className="text-[9px] md:text-[10px] opacity-40 font-mono tracking-tighter">रु 12,000 • 24 Views</Typography>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-20 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
            <Button variant="outline" className="w-full mt-6 text-[10px] h-9 border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all font-black uppercase tracking-widest relative z-10">
              Create New Listing
            </Button>
          </Card>

          <Card variant="surface" className="p-6 border-none bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
            <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] opacity-40 mb-3">Platform Insight</Typography>
            <Typography variant="bodySm" className="text-[11px] md:text-xs leading-relaxed italic opacity-80 border-l-2 border-bazar-black dark:border-bazar-white pl-4">
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
    <Card className="p-4 md:p-6 relative overflow-hidden group border-bazar-gray-200 dark:border-bazar-gray-800 hover:border-bazar-black dark:hover:border-bazar-white transition-all">
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1 md:space-y-2">
          <Typography variant="bodySm" className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] opacity-40 font-black">
            {label}
          </Typography>
          {loading ? (
            <Skeleton className="h-8 md:h-10 w-24 md:w-32" />
          ) : (
            <Typography variant="displaySm" className="text-xl md:text-3xl tracking-tighter font-black">
              {value}
            </Typography>
          )}
        </div>
        <div className="p-2 md:p-3 bg-bazar-gray-100 dark:bg-bazar-gray-900 rounded-xl group-hover:scale-110 transition-transform group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
          <Icon className="w-4 h-4 md:w-5 h-5 opacity-40 group-hover:opacity-100" />
        </div>
      </div>
      
      {!loading && (
        <div className="mt-4 md:mt-6 flex items-center gap-2">
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-[9px] md:text-[10px] font-black font-mono px-2 py-0.5 rounded-full",
              change >= 0 ? "text-green-600 bg-green-50 dark:bg-green-950/30" : "text-red-600 bg-red-50 dark:bg-red-950/30"
            )}>
              {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {Math.abs(change)}%
            </div>
          )}
          {description && (
            <Typography variant="bodySm" className="text-[9px] md:text-[10px] opacity-40 uppercase tracking-widest font-bold truncate">
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
