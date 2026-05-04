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
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">Inventory</Typography>
          <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px] font-bold">Manage your product stock and availability</Typography>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="text-[10px] h-9 px-4 uppercase tracking-widest font-bold">Export CSV</Button>
           <Button className="text-[10px] h-9 px-4 uppercase tracking-widest font-bold bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black hover:opacity-90 transition-opacity flex items-center gap-2">
             <Plus className="w-3 h-3" />
             Add Product
           </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-b-4 border-b-blue-500">
          <Typography variant="bodySm" className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-bold">Total Items</Typography>
          <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">{PRODUCTS.length}</Typography>
        </Card>
        <Card className="p-6 border-b-4 border-b-amber-500">
          <Typography variant="bodySm" className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-bold">Low Stock</Typography>
          <div className="flex items-baseline gap-2">
            <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">4</Typography>
            <Typography variant="bodySm" className="text-[10px] text-amber-600 font-bold uppercase tracking-widest animate-pulse">Action Required</Typography>
          </div>
        </Card>
        <Card className="p-6 border-b-4 border-b-red-500">
          <Typography variant="bodySm" className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-bold">Out of Stock</Typography>
          <Typography variant="displaySm" className="text-3xl font-black tracking-tighter">2</Typography>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
          <Input placeholder="Search products by name, SKU or category..." className="pl-10 h-11 text-xs bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-none ring-1 ring-bazar-gray-200 dark:ring-bazar-gray-800" />
        </div>
        <Button variant="outline" className="h-11 px-4 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
          <Filter className="w-3 h-3 opacity-40" />
          Filters
        </Button>
      </div>

      {/* Inventory Table */}
      <Card className="p-0 overflow-hidden border-none ring-1 ring-bazar-gray-100 dark:ring-bazar-gray-900 shadow-xl shadow-black/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-bazar-gray-400">Product</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-bazar-gray-400">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-bazar-gray-400">Stock Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-bazar-gray-400 text-right">Price</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-bazar-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-gray-100 dark:divide-bazar-gray-900">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-bazar-gray-50/50 dark:hover:bg-bazar-gray-950/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bazar-gray-100 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                         {product.image ? (
                           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center">
                             <Package className="w-5 h-5 opacity-20" />
                           </div>
                         )}
                      </div>
                      <div>
                        <Typography variant="bodySm" className="font-black text-sm uppercase tracking-tight">{product.name}</Typography>
                        <Typography variant="bodySm" className="text-[9px] opacity-40 font-mono">SKU: BZ-{product.id.padStart(4, '0')}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 rounded-md bg-bazar-gray-100 dark:bg-bazar-gray-900 text-[9px] font-bold uppercase tracking-widest opacity-60">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="flex-1 max-w-[100px] h-1.5 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              product.stock > 20 ? "bg-green-500" : product.stock > 5 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                          />
                       </div>
                       <span className={cn(
                         "text-[10px] font-black font-mono",
                         product.stock < 5 ? "text-red-500" : "opacity-60"
                       )}>
                         {product.stock}
                       </span>
                       {product.stock < 5 && <AlertTriangle className="w-3 h-3 text-red-500 animate-bounce" />}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-xs font-bold">
                    NPR {product.price.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 opacity-20" />
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
