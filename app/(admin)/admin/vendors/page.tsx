"use client";

import { useAllVendors } from "@/hooks/useAdminData";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/admin/TierBadge";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Building2,
  Package,
  Calendar,
  Settings2
} from "lucide-react";
import { useState } from "react";
import { VendorSaaSModal } from "@/components/admin/VendorSaaSModal";

export default function AdminVendorsPage() {
  const { data: vendors, isLoading } = useAllVendors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isSaaSModalOpen, setIsSaaSModalOpen] = useState(false);

  const filteredVendors = vendors?.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openSaaSModal = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsSaaSModalOpen(true);
  };

  return (
    <div className="p-4 md:p-10 space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Merchants Hub</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium text-xs md:text-sm">Manage and audit platform vendors.</Typography>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Search merchants..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl md:rounded-2xl text-xs md:text-sm outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all font-medium"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl shrink-0">
            <Filter className="w-4 h-4 md:w-5 md:h-5 opacity-40" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black shadow-2xl shadow-black/5 rounded-2xl md:rounded-[32px]">
        {/* Mobile Card View (Visible only on small screens) */}
        <div className="md:hidden divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
           {isLoading ? (
             [1,2,3].map(i => <div key={i} className="p-4 h-24 animate-pulse bg-bazar-gray-50/50" />)
           ) : filteredVendors?.map((vendor) => (
             <div key={vendor.id} className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center font-black opacity-40 border border-bazar-gray-200 dark:border-bazar-gray-800">
                         {vendor.name.charAt(0)}
                      </div>
                      <div>
                         <Typography variant="titleSm" className="font-black text-sm leading-none mb-1">{vendor.name}</Typography>
                         <TierBadge tier={vendor.tier} size="sm" />
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => openSaaSModal(vendor)}>
                         <Settings2 className="w-3.5 h-3.5 text-fuchsia-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                         <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                      </Button>
                   </div>
                </div>
                <div className="flex justify-between items-end pt-2">
                   <div className="space-y-1">
                      <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-black tracking-widest">MTD Revenue</Typography>
                      <Typography variant="bodyMd" className="text-xs font-black">NPR {vendor.revenue.toLocaleString()}</Typography>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                      <div className={cn(
                        "flex items-center gap-1 text-[9px] font-black",
                        vendor.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {vendor.growth >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                        {Math.abs(vendor.growth)}%
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                        vendor.status === 'active' ? "bg-green-500/10 text-green-600 border-green-500/20" :
                        vendor.status === 'pending' ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"
                      )}>
                        {vendor.status}
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Desktop Table View (Hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Merchant</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Tier</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Revenue (MTD)</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => <LoadingRow key={i} />)
              ) : filteredVendors?.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-bazar-gray-50/50 dark:hover:bg-bazar-gray-950/50 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center font-black text-lg opacity-40 border border-bazar-gray-200 dark:border-bazar-gray-800 group-hover:scale-110 transition-transform duration-500">
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <Typography variant="titleSm" className="font-black truncate max-w-[200px] leading-none mb-1">{vendor.name}</Typography>
                        <div className="flex items-center gap-2">
                           <Calendar className="w-3 h-3 opacity-30" />
                           <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest font-black">Joined {vendor.joinedDate}</Typography>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <TierBadge tier={vendor.tier} size="md" />
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        vendor.status === 'active' ? "bg-green-500" :
                        vendor.status === 'pending' ? "bg-amber-500 animate-pulse" : "bg-red-500"
                      )} />
                      <Typography variant="bodySm" className={cn(
                        "text-[10px] uppercase font-black tracking-widest",
                        vendor.status === 'active' ? "text-green-600" :
                        vendor.status === 'pending' ? "text-amber-600" : "text-red-600"
                      )}>
                        {vendor.status}
                      </Typography>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-mono">
                    <div className="flex flex-col">
                      <Typography variant="bodyMd" className="text-sm font-black tracking-tight">
                        NPR {vendor.revenue.toLocaleString()}
                      </Typography>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-black",
                        vendor.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {vendor.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(vendor.growth)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white dark:hover:bg-bazar-black border border-transparent hover:border-bazar-gray-200 dark:hover:border-bazar-gray-800" title="Go to storefront">
                        <ExternalLink className="w-4 h-4 opacity-40" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openSaaSModal(vendor)}
                        className="h-10 w-10 rounded-xl bg-fuchsia-500/5 hover:bg-fuchsia-500 dark:hover:bg-fuchsia-500 text-fuchsia-600 hover:text-white border border-fuchsia-500/10 transition-all" 
                        title="Manage SaaS Tier"
                      >
                        <Settings2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedVendor && (
        <VendorSaaSModal 
          vendor={selectedVendor}
          isOpen={isSaaSModalOpen}
          onClose={() => setIsSaaSModalOpen(false)}
        />
      )}
    </div>
  );
}

function LoadingRow() {
  return (
    <tr>
      <td className="px-6 py-6"><div className="h-12 w-48 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded-xl" /></td>
      <td className="px-6 py-6"><div className="h-6 w-24 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded-full" /></td>
      <td className="px-6 py-6"><div className="h-4 w-20 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded-lg" /></td>
      <td className="px-6 py-6"><div className="h-8 w-32 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded-lg" /></td>
      <td className="px-6 py-6"><div className="h-10 w-24 bg-bazar-gray-100 dark:bg-bazar-gray-900 animate-pulse rounded-xl ml-auto" /></td>
    </tr>
  );
}
