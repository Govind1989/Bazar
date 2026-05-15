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
  ChevronRight,
  X as XIcon
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
    <div className="p-4 md:p-10 space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">Financial Engine</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium uppercase tracking-[0.1em] text-[9px] md:text-[11px]">Subscription Revenue & Payout Operations</Typography>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
           <Button variant="outline" size="sm" className="flex-1 md:flex-none h-9 md:h-10 px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl">
             <Download className="w-3.5 h-3.5 opacity-40" /> <span className="hidden sm:inline">Tax Report</span>
           </Button>
           <Button size="sm" className="flex-1 md:flex-none h-9 md:h-10 px-4 md:px-6 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-black/10">
             <Receipt className="w-3.5 h-3.5 md:w-4 md:h-4" /> Reconciliation
           </Button>
        </div>
      </div>

      {/* Financial Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
         <FinancialCard label="Total Revenue (MTD)" value={`NPR ${(stats?.totalmrr || 0).toLocaleString()}`} change={18.4} icon={Wallet} color="bg-bazar-black" />
         <FinancialCard label="Pending Payouts" value="NPR 420.5K" icon={Banknote} />
         <FinancialCard label="Gateways" value="4 Active" icon={CreditCard} />
      </div>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
         {/* Transaction Ledger */}
         <Card className="lg:col-span-8 p-0 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black overflow-hidden shadow-2xl shadow-black/5 rounded-2xl md:rounded-[40px]">
            <div className="p-5 md:p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
               <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[9px] md:text-[10px] opacity-40">Revenue Ledger</Typography>
               <div className="relative w-40 md:w-64 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                  <input type="text" placeholder="Find..." className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-lg text-[9px] outline-none font-bold uppercase tracking-widest" />
               </div>
            </div>

            {/* Mobile Transaction List */}
            <div className="md:hidden divide-y divide-bazar-gray-50 dark:divide-bazar-gray-950">
               {RECENT_TRANSACTIONS.map(tx => (
                  <div key={tx.id} className="p-4 space-y-3">
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center border border-bazar-gray-200 dark:border-bazar-gray-800">
                              <Typography variant="bodySm" className="font-black opacity-40 text-[10px]">{tx.merchant.charAt(0)}</Typography>
                           </div>
                           <div>
                              <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-tight">{tx.merchant}</Typography>
                              <Typography variant="bodySm" className="text-[8px] opacity-40 font-bold uppercase tracking-widest">{tx.method}</Typography>
                           </div>
                        </div>
                        <div className={cn(
                           "px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border",
                           tx.status === 'COMPLETED' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                           tx.status === 'PENDING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                        )}>
                           {tx.status}
                        </div>
                     </div>
                     <div className="flex justify-between items-center pt-1">
                        <Typography variant="bodySm" className="text-[10px] font-mono font-black">NPR {tx.amount.toLocaleString()}</Typography>
                        <Typography variant="bodySm" className="text-[8px] font-bold opacity-40">{tx.date.split(',')[0]}</Typography>
                     </div>
                  </div>
               ))}
            </div>

            {/* Desktop Ledger Table */}
            <div className="hidden md:block overflow-x-auto">
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
                                 {tx.status === 'COMPLETED' ? <CheckCircle2 className="w-2.5 h-2.5" /> : tx.status === 'PENDING' ? <Clock className="w-2.5 h-2.5" /> : <XIcon className="w-2.5 h-2.5" />}
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
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Load History</Button>
            </div>
         </Card>

         {/* Gateway Integrity */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 md:p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-2xl md:rounded-3xl">
               <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40 mb-6 md:mb-8">Gateway Integrity</Typography>
               <div className="space-y-4 md:space-y-6">
                  <GatewayRow name="Stripe" status="operational" latency="142ms" />
                  <GatewayRow name="ConnectIPS" status="operational" latency="210ms" />
                  <GatewayRow name="Khalti" status="warning" latency="1.2s" message="Degraded" />
                  <GatewayRow name="Esewa" status="operational" latency="185ms" />
               </div>
            </Card>

            <Card variant="dark" className="bg-bazar-black text-white p-6 md:p-8 rounded-2xl md:rounded-[40px] relative overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[300px]">
               <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 -mr-24 md:-mr-32 -mt-24 md:-mt-32 rounded-full" />
               <div className="relative z-10">
                  <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-4 md:mb-6 text-white font-black">Financial Protocol</Typography>
                  <Typography variant="titleMd" className="text-white text-lg md:text-xl font-black uppercase tracking-tight mb-2 md:mb-4">Payout Cycle</Typography>
                  <Typography variant="bodySm" className="text-bazar-gray-400 text-[10px] md:text-xs leading-relaxed mb-6 md:mb-8">
                     Automated Monday at 00:00 UTC. Next in <span className="text-fuchsia-400 font-bold">2d 14h</span>.
                  </Typography>
               </div>
               <Button className="w-full bg-white text-black h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl md:rounded-2xl group transition-all">
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
      <Card className={cn("p-6 md:p-8 border-bazar-gray-200 dark:border-bazar-gray-800 rounded-[24px] md:rounded-[32px] hover:border-black dark:hover:border-white transition-all group overflow-hidden relative", color)}>
         <div className="flex justify-between items-start mb-6 md:mb-8">
            <div className={cn(
               "p-2.5 md:p-3 rounded-2xl transition-all",
               color === 'bg-bazar-black' ? "bg-white/10 text-white" : "bg-bazar-gray-50 dark:bg-bazar-gray-950 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black"
            )}>
               <Icon className="w-4.5 h-4.5 md:w-5 md:h-5 opacity-80 group-hover:opacity-100" />
            </div>
            {change && (
               <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black font-mono text-green-500 bg-green-500/10 px-2 md:px-2.5 py-1 rounded-full">
                  <ArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3" /> {change}%
               </div>
            )}
         </div>
         <Typography variant="bodySm" className={cn("uppercase tracking-[0.2em] text-[8px] md:text-[10px] font-black mb-1 md:mb-2", color === 'bg-bazar-black' ? "text-white/40" : "opacity-40")}>{label}</Typography>
         <Typography variant="displaySm" className={cn("text-2xl md:text-4xl font-black tracking-tighter leading-none", color === 'bg-bazar-black' ? "text-white" : "")}>{value}</Typography>
      </Card>
   );
}

function GatewayRow({ name, status, latency, message }: any) {
   return (
      <div className="flex justify-between items-center group">
         <div>
            <Typography variant="bodySm" className="text-[10px] md:text-[11px] font-black uppercase tracking-tight mb-0.5 leading-none">{name}</Typography>
            <Typography variant="bodySm" className="text-[8px] md:text-[9px] font-mono opacity-40 font-bold">{latency}</Typography>
         </div>
         <div className="flex items-center gap-2 md:gap-3">
            {message && <Typography variant="bodySm" className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-amber-500">{message}</Typography>}
            <div className={cn(
               "w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all group-hover:scale-125",
               status === 'operational' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-amber-500 animate-pulse"
            )} />
         </div>
      </div>
   );
}
