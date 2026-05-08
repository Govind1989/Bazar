"use client";

import { useState, useMemo, useCallback } from "react";
import { useProducts } from "@/hooks/useCategoryData";
import { CATEGORIES, VENDORS, Product } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { ProductCard } from "@/components/shared/ProductCard";
import { ChevronRight, Search, SlidersHorizontal, ChevronDown, Tag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Masonry } from "@/components/shared/Masonry";
import { motion, AnimatePresence } from "framer-motion";

interface ProductListViewProps {
  title: string;
  description: string;
  type: "deals" | "flash-sales";
  icon?: React.ReactNode;
}

export default function ProductListView({ title, description, type, icon }: ProductListViewProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    sortBy: "popularity",
    vendors: [] as string[],
    category: undefined as string | undefined,
    isDeal: type === "deals",
    isFlashSale: type === "flash-sales",
  });

  const { data: products, isLoading } = useProducts(filters);

  const predictProductHeight = useCallback((product: Product, columnWidth: number) => {
    const imageHeight = columnWidth;
    const isMobile = columnWidth < 200; // rough check
    const margin = isMobile ? 8 : 12;
    const metadataHeight = isMobile ? 60 : 75;
    return imageHeight + margin + metadataHeight;
  }, []);

  const masonryItems = useMemo(() => products || [], [products]);

  const FiltersContent = () => (
    <div className="space-y-8 sm:space-y-10">
       <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[9px] sm:text-[10px] opacity-40 mb-4 sm:mb-6">Categories</Typography>
          <div className="space-y-2.5 sm:space-y-3">
            {CATEGORIES.map(cat => (
              <label key={cat.id} className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.category === cat.slug}
                  onChange={() => setFilters(f => ({ ...f, category: f.category === cat.slug ? undefined : cat.slug }))}
                />
                <div className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4 border rounded transition-all",
                  filters.category === cat.slug 
                    ? "bg-bazar-black border-bazar-black dark:bg-bazar-white dark:border-bazar-white" 
                    : "border-bazar-gray-300 dark:border-bazar-gray-700 group-hover:border-bazar-black dark:group-hover:border-bazar-white"
                )} />
                <Typography variant="bodySm" className={cn(
                  "text-[13px] sm:text-sm transition-colors",
                  filters.category === cat.slug ? "text-bazar-black dark:text-bazar-white font-bold" : "group-hover:text-bazar-black dark:group-hover:text-bazar-white"
                )}>{cat.name}</Typography>
              </label>
            ))}
          </div>
       </div>

       <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[9px] sm:text-[10px] opacity-40 mb-4 sm:mb-6">Vendors</Typography>
          <div className="space-y-2.5 sm:space-y-3">
            {VENDORS.map(vendor => (
              <label key={vendor.id} className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.vendors.includes(vendor.id)}
                  onChange={(e) => {
                    const newVendors = e.target.checked 
                      ? [...filters.vendors, vendor.id]
                      : filters.vendors.filter(id => id !== vendor.id);
                    setFilters({ ...filters, vendors: newVendors });
                  }}
                />
                <div className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4 border rounded transition-all",
                  filters.vendors.includes(vendor.id) 
                    ? "bg-bazar-black border-bazar-black dark:bg-bazar-white dark:border-bazar-white" 
                    : "border-bazar-gray-300 dark:border-bazar-gray-700 group-hover:border-bazar-black dark:group-hover:border-bazar-white"
                )} />
                <Typography variant="bodySm" className="text-[13px] sm:text-sm group-hover:text-bazar-black dark:group-hover:text-bazar-white transition-colors">{vendor.name}</Typography>
              </label>
            ))}
          </div>
       </div>

       <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[9px] sm:text-[10px] opacity-40 mb-4 sm:mb-6">Price Range (NPR)</Typography>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
             <input type="number" placeholder="Min" className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded p-1.5 sm:p-2 text-[10px] sm:text-xs outline-none" />
             <input type="number" placeholder="Max" className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded p-1.5 sm:p-2 text-[10px] sm:text-xs outline-none" />
          </div>
       </div>
    </div>
  );

  return (
    <div className="pt-16 sm:pt-24 min-h-screen">
      {/* Page Header */}
      <section className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 text-[9px] sm:text-xs font-mono uppercase tracking-widest opacity-40">
             <span>Marketplace</span>
             <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
             <span className="text-bazar-black dark:text-bazar-white truncate">{title}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
             {icon && <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black flex items-center justify-center shadow-lg shrink-0">{icon}</div>}
             <Typography variant="displayLg" className="text-3xl sm:text-6xl">{title}</Typography>
          </div>
          <Typography variant="bodyMd" className="max-w-xl opacity-60 text-sm sm:text-base">
            {description}
          </Typography>
        </div>
      </section>

      {/* Search & Sort Bar */}
      <div className="sticky top-16 z-20 bg-bazar-white/80 dark:bg-bazar-black/80 backdrop-blur-md border-b border-bazar-gray-100 dark:border-bazar-gray-900 px-4 sm:px-6 md:px-12 h-14 sm:h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-2 sm:gap-8">
           <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input 
                type="text" 
                placeholder={`Search in ${title}...`}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-sm outline-none font-sans"
              />
           </div>

           <button 
             onClick={() => setShowMobileFilters(!showMobileFilters)}
             className="flex lg:hidden items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
           >
             <SlidersHorizontal className="w-3 h-3" />
             Filters
             <ChevronDown className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform", showMobileFilters && "rotate-180")} />
           </button>

           <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              <Typography variant="bodySm" className="text-[10px] sm:text-xs opacity-40 hidden sm:block">Sort by:</Typography>
              <select 
                className="bg-transparent border-none text-[9px] sm:text-xs font-bold uppercase tracking-widest outline-none cursor-pointer"
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: L-H</option>
                <option value="price-high">Price: H-L</option>
              </select>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900"
          >
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <FiltersContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 grid lg:grid-cols-4 gap-8 sm:gap-12">
        <aside className="space-y-10 hidden lg:block">
           <FiltersContent />
        </aside>

        <div className="lg:col-span-3">
           {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className="space-y-3 sm:space-y-4">
                      <Skeleton className="aspect-square rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                   </div>
                 ))}
              </div>
           ) : masonryItems.length > 0 ? (
              <Masonry<Product>
                items={masonryItems}
                columnWidth={240}
                gap={16} // Reduced from 24 for more compact mobile view
                predictHeight={predictProductHeight}
                renderItem={(product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    vendorName={VENDORS.find(v => v.id === product.vendorId)?.name} 
                  />
                )}
              />
           ) : (
              <div className="py-24 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl">
                 <Typography variant="titleMd" className="opacity-40 mb-2">No products found</Typography>
                 <Typography variant="bodySm" className="opacity-40">Try adjusting your filters to find what you're looking for.</Typography>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
