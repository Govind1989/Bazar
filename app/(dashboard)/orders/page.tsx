"use client";

import { useRecentOrders } from "@/hooks/useDashboardData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Filter, Download } from "lucide-react";

export default function OrdersPage() {
  const { data: orders, isLoading } = useRecentOrders();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="displaySm">Orders</Typography>
          <Typography variant="bodySm">Manage and track your customer purchases.</Typography>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col md:flex-row gap-4 items-center justify-between bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input 
              type="text" 
              placeholder="Search by ID, customer or product..." 
              className="w-full pl-10 pr-4 py-2 bg-bazar-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-md text-sm outline-none focus:ring-1 focus:ring-bazar-black dark:focus:ring-bazar-white transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-none">
                <Filter className="w-4 h-4" />
                Filter
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Order ID</th>
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Customer</th>
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Product</th>
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500">Date</th>
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Amount</th>
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Status</th>
                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-bazar-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
              {isLoading ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr key={i} className="animate-pulse h-16 bg-bazar-white dark:bg-bazar-black">
                    <td colSpan={7} className="px-6" />
                  </tr>
                ))
              ) : (
                orders?.map((order) => (
                  <tr key={order.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs font-bold">{order.id}</td>
                    <td className="px-6 py-4">
                      <Typography variant="titleSm" className="text-sm">{order.customer}</Typography>
                    </td>
                    <td className="px-6 py-4 text-xs opacity-60 max-w-[200px] truncate">{order.product}</td>
                    <td className="px-6 py-4 text-xs opacity-60">{order.date}</td>
                    <td className="px-6 py-4 text-right font-medium text-xs">NPR {order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                       <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest h-8">Details</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
           <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest">
              Showing 5 of 318 orders
           </Typography>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
           </div>
        </div>
      </Card>
    </div>
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
