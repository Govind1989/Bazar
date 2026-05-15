"use client";

import { useAuditLogs } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  History, 
  Search, 
  Filter, 
  ShieldAlert, 
  Terminal, 
  Clock,
  Download,
  AlertTriangle,
  Info,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

export default function AdminAuditPage() {
  const { data: logs, isLoading } = useAuditLogs();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-4 md:p-10 space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Audit Trail</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium text-xs md:text-sm">Immutable record of system actions.</Typography>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Filter logs..." 
              className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl md:rounded-2xl text-xs md:text-sm outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all font-medium"
            />
          </div>
          <Button size="icon" variant="outline" className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl shrink-0">
            <Download className="w-4 h-4 md:w-5 md:h-5 opacity-40" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black shadow-2xl shadow-black/5 rounded-2xl md:rounded-[32px]">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
           {isLoading ? (
              [1,2,3].map(i => <div key={i} className="p-4 h-20 animate-pulse bg-bazar-gray-50/50" />)
           ) : logs?.map(log => (
              <div key={log.id} className="p-4 space-y-3">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                       <Terminal className="w-3 h-3 opacity-30" />
                       <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">{log.module}</Typography>
                    </div>
                    <div className={cn(
                       "px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border",
                       log.severity === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                       log.severity === 'WARNING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}>
                       {log.severity}
                    </div>
                 </div>
                 <Typography variant="bodySm" className="text-[11px] font-bold leading-tight">{log.action}</Typography>
                 <Typography variant="bodySm" className="text-[10px] opacity-60 line-clamp-2">{log.details}</Typography>
                 <div className="flex justify-between items-center pt-1 border-t border-bazar-gray-50 dark:border-bazar-gray-950">
                    <Typography variant="bodySm" className="text-[9px] font-mono opacity-30">#{log.id.toUpperCase()}</Typography>
                    <Typography variant="bodySm" className="text-[9px] font-bold opacity-30">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                 </div>
              </div>
           ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Event ID</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Module</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Action</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Details</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Severity</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
              {logs?.map((log) => (
                <tr key={log.id} className="hover:bg-bazar-gray-50/50 dark:hover:bg-bazar-gray-950/50 transition-colors group">
                  <td className="px-6 py-6">
                    <Typography variant="bodySm" className="text-[10px] font-mono font-black opacity-40">#{log.id.toUpperCase()}</Typography>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <Terminal className="w-3.5 h-3.5 opacity-20" />
                       <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">{log.module}</Typography>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <Typography variant="bodySm" className="text-[11px] font-bold tracking-tight">{log.action}</Typography>
                  </td>
                  <td className="px-6 py-6">
                    <Typography variant="bodySm" className="text-[11px] opacity-60 leading-tight max-w-xs">{log.details}</Typography>
                  </td>
                  <td className="px-6 py-6">
                    <div className={cn(
                       "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                       log.severity === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                       log.severity === 'WARNING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}>
                       {log.severity === 'CRITICAL' ? <AlertTriangle className="w-2.5 h-2.5" /> : log.severity === 'WARNING' ? <Info className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                       {log.severity}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex flex-col items-end">
                       <Typography variant="bodySm" className="text-[10px] font-bold">{new Date(log.timestamp).toLocaleDateString()}</Typography>
                       <Typography variant="bodySm" className="text-[10px] opacity-40 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</Typography>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="p-8 md:p-10 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[32px] md:rounded-[40px] flex flex-col items-center text-center max-w-2xl mx-auto">
         <ShieldAlert className="w-10 h-10 md:w-12 md:h-12 opacity-10 mb-4 md:mb-6" />
         <Typography variant="titleMd" className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">Immutable Integrity</Typography>
         <Typography variant="bodySm" className="text-bazar-gray-500 leading-relaxed text-xs md:text-sm px-4">
            Audit logs are cryptographically hashed and mirrored across secondary platform nodes to prevent unauthorized tampering.
         </Typography>
      </div>
    </div>
  );
}
