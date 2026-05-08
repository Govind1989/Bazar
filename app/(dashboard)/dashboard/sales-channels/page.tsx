"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { MOCK_SALES_CHANNELS } from "@/data/sales-channels";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Music2, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  RefreshCcw,
  Settings2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ICON_MAP: Record<string, any> = {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Music2
};

export default function VendorSalesChannelsPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="p-8 space-y-12 max-w-7xl">
      <section>
        <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Sales Channels</Typography>
        <Typography variant="bodySm" className="opacity-60 text-xs">Manage your brand's presence across major social platforms.</Typography>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {MOCK_SALES_CHANNELS.map((channel) => {
          const Icon = ICON_MAP[channel.icon];
          const isConnected = channel.status === 'connected';

          return (
            <Card key={channel.id} className={cn(
                "p-8 rounded-[32px] border-2 transition-all flex flex-col gap-8 group",
                isConnected 
                    ? "border-bazar-black/5 dark:border-bazar-white/5 bg-bazar-white dark:bg-bazar-black shadow-xl shadow-bazar-black/5" 
                    : "border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 bg-transparent opacity-60"
            )}>
              {/* Channel Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110",
                    isConnected ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" : "bg-bazar-gray-100 dark:bg-bazar-gray-900"
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Typography variant="titleMd" className="font-black uppercase tracking-widest">{channel.name}</Typography>
                        {isConnected ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                <CheckCircle2 className="w-3 h-3" />
                                <span className="text-[9px] font-black uppercase tracking-wider">Connected</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 text-bazar-gray-400 border border-bazar-gray-200 dark:border-bazar-gray-800">
                                <XCircle className="w-3 h-3" />
                                <span className="text-[9px] font-black uppercase tracking-wider">Disconnected</span>
                            </div>
                        )}
                    </div>
                    {isConnected && (
                      <Typography variant="bodySm" className="text-xs font-medium opacity-60">{channel.accountName} • {channel.followers} Followers</Typography>
                    )}
                  </div>
                </div>
                {isConnected ? (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-bazar-gray-100 dark:border-bazar-gray-900"><RefreshCcw className="w-4 h-4 opacity-40" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-bazar-gray-100 dark:border-bazar-gray-900"><Settings2 className="w-4 h-4 opacity-40" /></Button>
                  </div>
                ) : (
                  <Button size="sm" className="rounded-full px-6 text-[10px] uppercase font-black tracking-widest">Connect</Button>
                )}
              </div>

              {/* Stats Grid */}
              {isConnected && channel.stats && (
                <div className="grid grid-cols-3 gap-4">
                  {channel.stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-100 dark:border-bazar-gray-900">
                        <Typography variant="bodySm" className="text-[9px] uppercase tracking-widest opacity-40 font-bold mb-2">{stat.label}</Typography>
                        <div className="flex items-end gap-2">
                            <Typography variant="titleMd" className="font-black leading-none">{stat.value}</Typography>
                            <div className={cn(
                                "flex items-center text-[9px] font-bold mb-0.5",
                                stat.change > 0 ? "text-green-500" : "text-red-500"
                            )}>
                                {stat.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {Math.abs(stat.change)}%
                            </div>
                        </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Actions */}
              {isConnected && (
                <div className="pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
                    <Typography variant="bodySm" className="text-[9px] uppercase font-mono tracking-tighter opacity-30">Last synced: {channel.lastSync}</Typography>
                    <Button variant="ghost" size="sm" className="gap-2 text-[10px] uppercase font-black tracking-widest group/btn">
                        Manage Content
                        <ExternalLink className="w-3 h-3 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
