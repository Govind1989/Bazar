"use client";

import { PRODUCTS } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Package, MoreVertical, Plus, Search, Filter, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function InventoryPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
        <div>
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black tracking-tighter uppercase">Inventory</Typography>
          <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">Manage your product stock and availability</Typography>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
           <Button variant="outline" className="flex-1 lg:flex-none text-[9px] md:text-[10px] h-9 md:h-10 px-4 md:px-6 uppercase tracking-widest font-black border-bazar-gray-200 dark:border-bazar-gray-800 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all">Export CSV</Button>
           <Button className="flex-1 lg:flex-none text-[9px] md:text-[10px] h-9 md:h-10 px-4 md:px-6 uppercase tracking-widest font-black bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl shadow-bazar-black/10 dark:shadow-bazar-white/5">
             <Plus className="w-3.5 h-3.5" />
             Add Product
           </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="p-4 md:p-8 border-b-4 border-b-blue-500 rounded-2xl md:rounded-3xl hover:translate-y-[-4px] transition-transform shadow-sm">
          <Typography variant="bodySm" className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2 font-black">Total Items</Typography>
          <Typography variant="displaySm" className="text-xl md:text-4xl font-black tracking-tighter">{PRODUCTS.length}</Typography>
        </Card>
        <Card className="p-4 md:p-8 border-b-4 border-b-amber-500 rounded-2xl md:rounded-3xl hover:translate-y-[-4px] transition-transform shadow-sm">
          <Typography variant="bodySm" className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2 font-black">Low Stock</Typography>
          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
            <Typography variant="displaySm" className="text-xl md:text-4xl font-black tracking-tighter">4</Typography>
            <Typography variant="bodySm" className="text-[7px] md:text-[9px] text-amber-600 font-black uppercase tracking-[0.15em] animate-pulse">Action Required</Typography>
          </div>
        </Card>
        <Card className="p-4 md:p-8 border-b-4 border-b-red-500 rounded-2xl md:rounded-3xl hover:translate-y-[-4px] transition-transform shadow-sm col-span-2 md:col-span-1">
          <Typography variant="bodySm" className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2 font-black">Out of Stock</Typography>
          <Typography variant="displaySm" className="text-xl md:text-4xl font-black tracking-tighter">2</Typography>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
          <Input 
            placeholder="Search by name, SKU or category..." 
            className="pl-11 h-11 md:h-12 text-xs md:text-sm bg-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-bazar-black/5 dark:focus:ring-bazar-white/5 transition-all shadow-sm" 
          />
        </div>
        <Button variant="outline" className="h-11 md:h-12 px-6 text-[9px] md:text-[10px] uppercase tracking-widest font-black flex items-center justify-center gap-3 border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl md:rounded-2xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all">
          <Filter className="w-4 h-4 opacity-40" />
          Filters
        </Button>
      </div>

      {/* Inventory Table */}
      <Card className="p-0 overflow-hidden border-none ring-1 ring-bazar-gray-100 dark:ring-bazar-gray-900 shadow-2xl shadow-black/[0.02] rounded-2xl md:rounded-3xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                <th className="px-6 md:px-10 py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-bazar-gray-400">Product Details</th>
                <th className="px-6 py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-bazar-gray-400">Category</th>
                <th className="px-6 py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-bazar-gray-400">Stock Availability</th>
                <th className="px-6 py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-bazar-gray-400 text-right">Unit Price</th>
                <th className="px-6 md:px-10 py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-bazar-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-bazar-gray-50/50 dark:hover:bg-bazar-gray-950/50 transition-all group">
                  <td className="px-6 md:px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                         {product.image ? (
                           <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center opacity-20">
                             <Package className="w-6 h-6 md:w-8 md:h-8" />
                           </div>
                         )}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <Typography variant="bodySm" className="font-black text-sm md:text-base uppercase tracking-tight leading-tight">{product.name}</Typography>
                        <Typography variant="bodySm" className="text-[8px] md:text-[10px] opacity-40 font-mono font-bold tracking-widest">BZ-{product.id.padStart(4, '0')}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white group-hover:text-white dark:group-hover:text-black transition-all duration-500">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[120px] h-2 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 overflow-hidden border border-bazar-gray-100/50 dark:border-bazar-gray-900/50">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                               transition={{ duration: 1, ease: "easeOut" }}
                               className={cn(
                                 "h-full rounded-full transition-colors duration-500",
                                 product.stock > 20 ? "bg-green-500" : product.stock > 5 ? "bg-amber-500" : "bg-red-500"
                               )}
                             />
                          </div>
                          <span className={cn(
                            "text-[10px] md:text-xs font-black font-mono",
                            product.stock < 5 ? "text-red-500" : "opacity-40 group-hover:opacity-100 transition-opacity"
                          )}>
                            {product.stock}
                          </span>
                          {product.stock < 5 && <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-bounce" />}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right font-black font-mono text-xs md:text-sm tracking-tighter">
                    रु {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 md:px-10 py-6 text-right">
                    <button className="p-2.5 hover:bg-bazar-black dark:hover:bg-bazar-white text-bazar-black dark:text-bazar-white hover:text-white dark:hover:text-black rounded-xl transition-all duration-300 border border-transparent hover:border-bazar-black dark:hover:border-bazar-white">
                      <MoreVertical className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
