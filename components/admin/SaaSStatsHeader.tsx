"use client";

import { useSaaSStats } from "@/hooks/useAdminData";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { 
  CreditCard, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SaaSStatsHeader() {
  const { data: stats, isLoading } = useSaaSStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <StatCard 
        label="Monthly Revenue" 
        value={`NPR ${stats?.totalmrr.toLocaleString() || '0'}`} 
        change={12.4}
        icon={CreditCard}
        loading={isLoading}
      />
      <StatCard 
        label="Active Subscriptions" 
        value={stats?.activeSubscriptions.toString() || '0'} 
        change={5.2}
        icon={Users}
        loading={isLoading}
      />
      <StatCard 
        label="Conversion Rate" 
        value="4.8%" 
        change={-1.2}
        icon={TrendingUp}
        loading={isLoading}
      />
      <StatCard 
        label="Platform Health" 
        value="99.9%" 
        icon={Activity}
        loading={isLoading}
      />
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, loading }: any) {
  return (
    <Card className="p-5 md:p-6 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black hover:border-bazar-black dark:hover:border-bazar-white transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div className="p-2.5 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black transition-all">
          <Icon className="w-4.5 h-4.5 opacity-60 group-hover:opacity-100" />
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-black font-mono px-2 py-0.5 rounded-full",
            change > 0 ? "text-green-500 bg-green-50 dark:bg-green-950/30" : "text-red-500 bg-red-50 dark:bg-red-950/30"
          )}>
            {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="space-y-1.5">
        <Typography variant="bodySm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 font-black">{label}</Typography>
        {loading ? (
          <div className="h-8 w-3/4 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded-lg" />
        ) : (
          <Typography variant="displaySm" className="text-2xl md:text-3xl tracking-tighter font-black">{value}</Typography>
        )}
      </div>
      
      {/* Decorative pulse for healthy state */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500 opacity-20" />
    </Card>
  );
}
