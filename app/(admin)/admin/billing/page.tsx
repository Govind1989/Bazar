"use client";

import { useSaaSStats } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Search,
  CreditCard,
  Banknote,
  Receipt,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";

const RECENT_TRANSACTIONS = [
  { id: 'tx_1', merchant: 'Apple Store NP', amount: 45000, date: 'Today, 09:12 AM', method: 'Stripe', status: 'COMPLETED', type: 'SUBSCRIPTION' },
  { id: 'tx_2', merchant: 'Himalayan Bakery', amount: 15000, date: 'Today, 08:30 AM', method: 'ConnectIPS', status: 'COMPLETED', type: 'SUBSCRIPTION' },
  { id: 'tx_3', merchant: 'Local Artisan', amount: 5000, date: 'Yesterday', method: 'Khalti', status: 'PENDING', type: 'SUBSCRIPTION' },
  { id: 'tx_4', merchant: 'Kathmandu Textiles', amount: 5000, date: 'May 12', method: 'Stripe', status: 'FAILED', type: 'SUBSCRIPTION' },
  { id: 'tx_5', merchant: 'Elite Decors', amount: 15000, date: 'May 11', method: 'Stripe', status: 'COMPLETED', type: 'SUBSCRIPTION' }
];

export default function AdminBillingPage() {
  const { data: stats } = useSaaSStats();

  return (
    <div className="p-6 md:p-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Typography variant="displaySm" className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">Financial Engine</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium uppercase tracking-[0.1em] text-[11px]">Subscription Revenue & Payout Operations</Typography>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="h-10 px-4 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl">
             <Download className="w-3.5 h-3.5 opacity-40" /> Tax Report
           </Button>
           <Button size="sm" className="h-10 px-6 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-black/10">
             <Receipt className="w-4 h-4" /> Reconciliation
           </Button>
        </div>
      </div>

      {/* Financial Hero Stats */}
      <div className="grid md:grid-cols-3 gap-6">
         <FinancialCard label="Total Revenue (MTD)" value={`NPR ${(stats?.totalmrr || 0).toLocaleString()}`} change={18.4} icon={Wallet} color="bg-bazar-black" />
         <FinancialCard label="Pending Payouts" value="NPR 420.5K" icon={Banknote} />
         <FinancialCard label="Active Payment Gateways" value="4" icon={CreditCard} />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Transaction Ledger */}
         <Card className="lg:col-span-8 p-0 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black overflow-hidden shadow-2xl shadow-black/5">
            <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
               <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px] opacity-40">Revenue Ledger</Typography>
               <div className="relative w-64 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                  <input type="text" placeholder="Find transaction..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl text-[10px] outline-none font-bold uppercase tracking-widest" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <tbody className="divide-y divide-bazar-gray-50 dark:divide-bazar-gray-950">
                     {RECENT_TRANSACTIONS.map(tx => (
                        <tr key={tx.id} className="hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group">
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center border border-bazar-gray-200 dark:border-bazar-gray-800 group-hover:scale-110 transition-transform">
                                    <Typography variant="bodySm" className="font-black opacity-40 text-xs">{tx.merchant.charAt(0)}</Typography>
                                 </div>
                                 <div>
                                    <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight">{tx.merchant}</Typography>
                                    <Typography variant="bodySm" className="text-[9px] opacity-40 font-bold uppercase tracking-widest">{tx.type} · {tx.method}</Typography>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <Typography variant="bodySm" className="text-[11px] font-mono font-black">NPR {tx.amount.toLocaleString()}</Typography>
                           </td>
                           <td className="px-6 py-5">
                              <div className={cn(
                                 "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                                 tx.status === 'COMPLETED' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                 tx.status === 'PENDING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                              )}>
                                 {tx.status === 'COMPLETED' ? <CheckCircle2 className="w-2.5 h-2.5" /> : tx.status === 'PENDING' ? <Clock className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                                 {tx.status}
                              </div>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <Typography variant="bodySm" className="text-[10px] font-bold opacity-40">{tx.date}</Typography>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-bazar-black border border-transparent hover:border-bazar-gray-200 dark:hover:border-bazar-gray-800">
                                 <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900 text-center">
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Load Historical Ledger</Button>
            </div>
         </Card>

         {/* Gateway Integrity */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-3xl">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40 mb-8">Gateway Integrity</Typography>
               <div className="space-y-6">
                  <GatewayRow name="Stripe (Global)" status="operational" latency="142ms" />
                  <GatewayRow name="ConnectIPS (Local)" status="operational" latency="210ms" />
                  <GatewayRow name="Khalti (Local)" status="warning" latency="1200ms" message="Degraded" />
                  <GatewayRow name="Esewa (Local)" status="operational" latency="185ms" />
               </div>
            </Card>

            <Card variant="dark" className="bg-bazar-black text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full" />
               <div className="relative z-10">
                  <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 text-white font-black">Financial Protocol</Typography>
                  <Typography variant="titleMd" className="text-white font-black uppercase tracking-tight mb-4">Payout Cycle</Typography>
                  <Typography variant="bodySm" className="text-bazar-gray-400 text-xs leading-relaxed mb-8">
                     Platform-wide merchant payouts are automated every Monday at 00:00 UTC. Next reconciliation in <span className="text-fuchsia-400 font-bold">2 days, 14 hours</span>.
                  </Typography>
               </div>
               <Button className="w-full bg-white text-black h-12 text-[10px] font-black uppercase tracking-widest rounded-2xl group transition-all">
                  Manage Payouts <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}

function FinancialCard({ label, value, change, icon: Icon, color = "bg-bazar-white dark:bg-bazar-black" }: any) {
   return (
      <Card className={cn("p-8 border-bazar-gray-200 dark:border-bazar-gray-800 rounded-[32px] hover:border-black dark:hover:border-white transition-all group overflow-hidden relative", color)}>
         <div className="flex justify-between items-start mb-8">
            <div className={cn(
               "p-3 rounded-2xl transition-all",
               color === 'bg-bazar-black' ? "bg-white/10 text-white" : "bg-bazar-gray-50 dark:bg-bazar-gray-950 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black"
            )}>
               <Icon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
            </div>
            {change && (
               <div className="flex items-center gap-1 text-[10px] font-black font-mono text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" /> {change}%
               </div>
            )}
         </div>
         <Typography variant="bodySm" className={cn("uppercase tracking-[0.2em] text-[10px] font-black mb-2", color === 'bg-bazar-black' ? "text-white/40" : "opacity-40")}>{label}</Typography>
         <Typography variant="displaySm" className={cn("text-3xl md:text-4xl font-black tracking-tighter leading-none", color === 'bg-bazar-black' ? "text-white" : "")}>{value}</Typography>
      </Card>
   );
}

function GatewayRow({ name, status, latency, message }: any) {
   return (
      <div className="flex justify-between items-center group">
         <div>
            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight mb-0.5 leading-none">{name}</Typography>
            <Typography variant="bodySm" className="text-[9px] font-mono opacity-40 font-bold">{latency}</Typography>
         </div>
         <div className="flex items-center gap-3">
            {message && <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest text-amber-500">{message}</Typography>}
            <div className={cn(
               "w-1.5 h-1.5 rounded-full transition-all group-hover:scale-125",
               status === 'operational' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-amber-500 animate-pulse"
            )} />
         </div>
      </div>
   );
}

function X({ className }: any) {
   return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
}
