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
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          label="Revenue (this month)" 
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
          label="Products Listed" 
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
            <Typography variant="titleSm" className="uppercase tracking-widest text-xs opacity-60">Recent Orders</Typography>
            <button className="text-[10px] font-mono uppercase tracking-widest hover:underline opacity-40 hover:opacity-100 transition-opacity">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                  <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Order</th>
                  <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Customer</th>
                  <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Date</th>
                  <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Amount</th>
                  <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
                {ordersLoading ? (
                   [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-6 py-4">
                         <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                   ))
                ) : (
                  orders?.map((order) => (
                    <tr key={order.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                      <td className="px-6 py-4">
                        <Typography variant="bodySm" className="text-bazar-black dark:text-bazar-white">{order.customer}</Typography>
                        <Typography variant="bodySm" className="text-[10px] opacity-40">{order.product}</Typography>
                      </td>
                      <td className="px-6 py-4 text-xs opacity-60">{order.date}</td>
                      <td className="px-6 py-4 text-right font-medium text-xs">NPR {order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
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
          <Card className="p-6">
            <Typography variant="titleSm" className="uppercase tracking-widest text-xs opacity-60 mb-6">Inventory Alerts</Typography>
            <div className="space-y-4">
              {inventoryLoading ? (
                <div className="space-y-4">
                   {[1, 2, 3].map(i => <Skeleton key={i} className="h-8 w-full" />)}
                </div>
              ) : (
                inventory?.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-2 border-b border-bazar-gray-100 dark:border-bazar-gray-900 last:border-none">
                    <Typography variant="bodySm" className="text-xs">{item.name}</Typography>
                    <div className={cn(
                      "font-mono text-[10px] px-2 py-0.5 rounded",
                      item.low ? "bg-red-100 text-red-600 dark:bg-red-950/30" : "bg-bazar-gray-100 dark:bg-bazar-gray-900"
                    )}>
                      {item.stock} LEFT {item.low && "(LOW)"}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="outline" className="w-full mt-6 text-[10px] h-8">Stock Report</Button>
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
