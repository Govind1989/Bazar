"use client";

import { SALES_ANALYTICS, MONTHLY_PROJECTIONS } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Calendar, Download, MoreHorizontal } from "lucide-react";

export default function ReportsPage() {
  const maxSales = Math.max(...SALES_ANALYTICS.map(d => d.sales));
  const maxProjected = Math.max(...MONTHLY_PROJECTIONS.map(d => d.projected));

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">Performance Reports</Typography>
          <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px] font-bold">Deep dive into your store's growth and projections</Typography>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="text-[10px] h-9 px-4 uppercase tracking-widest font-bold flex items-center gap-2">
             <Calendar className="w-3 h-3 opacity-40" />
             Last 6 Months
           </Button>
           <Button className="text-[10px] h-9 px-4 uppercase tracking-widest font-bold bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black hover:opacity-90 transition-opacity flex items-center gap-2">
             <Download className="w-3 h-3" />
             Download PDF
           </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReportStatCard label="Total Revenue" value="NPR 4.2L" change={12.5} />
        <ReportStatCard label="Avg. Order Value" value="NPR 1,240" change={-2.1} />
        <ReportStatCard label="Conversion Rate" value="3.82%" change={4.4} />
        <ReportStatCard label="Active Customers" value="1,240" change={8.9} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sales Analytics Chart */}
        <Card className="lg:col-span-2 p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Sales Analytics</Typography>
              <Typography variant="bodySm" className="text-xs opacity-60">Revenue trends over the last 6 months</Typography>
            </div>
            <button className="p-2 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 opacity-20" />
            </button>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
            {SALES_ANALYTICS.map((data, i) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full relative flex items-end justify-center">
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                    NPR {(data.sales / 1000).toFixed(1)}k
                  </div>
                  
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.sales / maxSales) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className={cn(
                      "w-full max-w-[40px] rounded-t-lg transition-colors relative group-hover:brightness-110",
                      i === SALES_ANALYTICS.length - 1 ? "bg-bazar-black dark:bg-bazar-white" : "bg-bazar-gray-200 dark:bg-bazar-gray-800"
                    )}
                  />
                </div>
                <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  {data.month}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Projections */}
        <Card className="p-8 bg-bazar-black text-white dark:bg-white dark:text-bazar-black border-none">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-white/10 dark:bg-black/10">
              <TrendingUp className="w-4 h-4" />
            </div>
            <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-60">Growth Projections</Typography>
          </div>
          
          <div className="space-y-6">
            {MONTHLY_PROJECTIONS.map((data, i) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest opacity-60">{data.month}</Typography>
                  <Typography variant="bodySm" className="text-[10px] font-black">NPR {(data.projected / 1000).toFixed(1)}K</Typography>
                </div>
                <div className="h-1 w-full bg-white/10 dark:bg-black/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(data.projected / maxProjected) * 100}%` }}
                     transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                     className="h-full bg-white dark:bg-black"
                   />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10">
             <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Insight</Typography>
             <Typography variant="bodySm" className="text-xs italic leading-relaxed opacity-80">
               "October shows a 25% projected spike due to festive season demand. Consider increasing stock by early September."
             </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ReportStatCard({ label, value, change }: { label: string, value: string, change: number }) {
  return (
    <Card className="p-6 group hover:ring-1 hover:ring-bazar-black dark:hover:ring-bazar-white transition-all">
      <Typography variant="bodySm" className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2 font-bold">{label}</Typography>
      <div className="flex items-baseline justify-between">
        <Typography variant="displaySm" className="text-2xl font-black tracking-tighter">{value}</Typography>
        <div className={cn(
          "flex items-center text-[10px] font-black font-mono",
          change >= 0 ? "text-green-500" : "text-red-500"
        )}>
          {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowUpRight className="w-3 h-3 mr-0.5 rotate-90" />}
          {Math.abs(change)}%
        </div>
      </div>
    </Card>
  );
}
