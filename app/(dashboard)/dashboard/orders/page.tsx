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
    <div className="p-4 md:p-8 space-y-6 md:space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black tracking-tighter uppercase">Orders</Typography>
          <Typography variant="bodySm" className="text-xs md:text-sm opacity-60">Manage and track your customer purchases.</Typography>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-2 flex-1 md:flex-none text-[10px] uppercase font-bold tracking-widest h-9 border-bazar-gray-200 dark:border-bazar-gray-800 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-bazar-gray-200 dark:border-bazar-gray-800">
        <div className="p-4 md:p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
          <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input 
              type="text" 
              placeholder="Search ID, customer or product..." 
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl text-xs md:text-sm outline-none focus:ring-2 focus:ring-bazar-black/5 dark:focus:ring-bazar-white/5 focus:border-bazar-black dark:focus:border-bazar-white transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
             <Button variant="outline" size="sm" className="gap-2 flex-1 lg:flex-none text-[10px] uppercase font-bold tracking-widest h-10 px-6 border-bazar-gray-200 dark:border-bazar-gray-800 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all">
                <Filter className="w-4 h-4" />
                Filter
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold">Order ID</th>
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold">Customer</th>
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold">Product</th>
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold">Date</th>
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold text-right">Amount</th>
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold text-right">Status</th>
                <th className="px-6 py-4 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-bazar-gray-500 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
              {isLoading ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr key={i} className="animate-pulse h-20 bg-bazar-white dark:bg-bazar-black">
                    <td colSpan={7} className="px-6">
                      <div className="h-8 bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-lg w-full" />
                    </td>
                  </tr>
                ))
              ) : (
                orders?.map((order) => (
                  <tr key={order.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all group">
                    <td className="px-6 py-5 font-mono text-[10px] md:text-xs font-black tracking-tighter">{order.id}</td>
                    <td className="px-6 py-5">
                      <Typography variant="titleSm" className="text-sm font-bold">{order.customer}</Typography>
                    </td>
                    <td className="px-6 py-5 text-[10px] md:text-xs opacity-60 max-w-[200px] truncate font-medium uppercase tracking-tighter">{order.product}</td>
                    <td className="px-6 py-5 text-[10px] md:text-xs opacity-60 font-mono">{order.date}</td>
                    <td className="px-6 py-5 text-right font-black text-xs md:text-sm">NPR {order.amount.toLocaleString()}</td>
                    <td className="px-6 py-5 text-right">
                       <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-5 text-right">
                       <Button variant="ghost" size="sm" className="text-[9px] md:text-[10px] uppercase font-black tracking-widest h-8 px-4 rounded-lg hover:bg-bazar-black dark:hover:bg-bazar-white hover:text-white dark:hover:text-black transition-all">Details</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 md:p-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
           <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              Showing 5 of 318 orders
           </Typography>
           <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none h-9 text-[10px] font-bold uppercase px-6 border-bazar-gray-200 dark:border-bazar-gray-800" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="flex-1 md:flex-none h-9 text-[10px] font-bold uppercase px-6 border-bazar-gray-200 dark:border-bazar-gray-800">Next</Button>
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
