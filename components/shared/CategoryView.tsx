"use client";

import { useState, useMemo, useCallback } from "react";
import { useCategoryProducts } from "@/hooks/useCategoryData";
import { CATEGORIES, VENDORS, Product } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { ProductCard } from "@/components/shared/ProductCard";
import { ChevronRight, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Masonry } from "@/components/shared/Masonry";
import { motion, AnimatePresence } from "framer-motion";

import { useSystemStore } from "@/store/useSystemStore";
import CategoryViewSocio from "./CategoryViewSocio";
import { useEffect } from "react";

interface CategoryViewProps {
  categorySlug: string;
}

export default function CategoryView({ categorySlug }: CategoryViewProps) {
  const marketplaceView = useSystemStore((state) => state.marketplaceView);
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: categorySlug,
    sortBy: "popularity",
    vendors: [] as string[],
  });

  const { data: products, isLoading } = useCategoryProducts(filters);

  // Height prediction logic for ProductCard
  const predictProductHeight = useCallback((product: Product, columnWidth: number) => {
    const imageHeight = columnWidth;
    const margin = 12; // Reduced from 16
    const metadataHeight = 75; // Tightened from 85
    return imageHeight + margin + metadataHeight;
  }, []);

  const masonryItems = useMemo(() => products || [], [products]);

  if (!isHydrated) return null;
  if (!category) return null;

  if (marketplaceView === 'social') {
    return <CategoryViewSocio categorySlug={categorySlug} />;
  }

  const FiltersContent = () => (
    <div className="space-y-10">
       <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6">Sub Categories</Typography>
          <div className="space-y-3">
            {["Fresh Produce", "Dairy & Eggs", "Beverages", "Snacks & Sweets", "Grains & Pulses"].map(sub => (
              <label key={sub} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-4 h-4 border border-bazar-gray-300 dark:border-bazar-gray-700 rounded transition-colors group-hover:border-bazar-black dark:group-hover:border-bazar-white" />
                <Typography variant="bodySm" className="text-sm group-hover:text-bazar-black dark:group-hover:text-bazar-white transition-colors">{sub}</Typography>
              </label>
            ))}
          </div>
       </div>

       <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6">Vendors</Typography>
          <div className="space-y-3">
            {VENDORS.filter(v => v.categories.includes(categorySlug)).map(vendor => (
              <label key={vendor.id} className="flex items-center gap-3 group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="hidden"
                  onChange={(e) => {
                    const newVendors = e.target.checked 
                      ? [...filters.vendors, vendor.id]
                      : filters.vendors.filter(id => id !== vendor.id);
                    setFilters({ ...filters, vendors: newVendors });
                  }}
                />
                <div className={cn(
                  "w-4 h-4 border rounded transition-all",
                  filters.vendors.includes(vendor.id) 
                    ? "bg-bazar-black border-bazar-black dark:bg-bazar-white dark:border-bazar-white" 
                    : "border-bazar-gray-300 dark:border-bazar-gray-700 group-hover:border-bazar-black dark:group-hover:border-bazar-white"
                )} />
                <Typography variant="bodySm" className="text-sm group-hover:text-bazar-black dark:group-hover:text-bazar-white transition-colors">{vendor.name}</Typography>
              </label>
            ))}
          </div>
       </div>

       <div>
          <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6">Price Range (NPR)</Typography>
          <div className="grid grid-cols-2 gap-3">
             <input type="number" placeholder="Min" className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded p-2 text-xs outline-none" />
             <input type="number" placeholder="Max" className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded p-2 text-xs outline-none" />
          </div>
       </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen">
      {/* Category Header */}
      <section className="px-6 md:px-12 py-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-widest opacity-40">
             <span>Marketplace</span>
             <ChevronRight className="w-3 h-3" />
             <span className="text-bazar-black dark:text-bazar-white">{category.name}</span>
          </div>
          <Typography variant="displayLg" className="mb-4">{category.name}</Typography>
          <Typography variant="bodyMd" className="max-w-xl opacity-60">
            {category.description} Browse through {products?.length || 0} premium items from our verified local vendors.
          </Typography>
        </div>
      </section>

      {/* Search & Sort Bar */}
      <div className="sticky top-16 z-20 bg-bazar-white/80 dark:bg-bazar-black/80 backdrop-blur-md border-b border-bazar-gray-100 dark:border-bazar-gray-900 px-6 md:px-12 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-4 md:gap-8">
           <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input 
                type="text" 
                placeholder={`Search in ${category.name}...`}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-sm outline-none font-sans"
              />
           </div>

           {/* Mobile Filter Toggle */}
           <button 
             onClick={() => setShowMobileFilters(!showMobileFilters)}
             className="flex lg:hidden items-center gap-2 px-4 py-2 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black rounded-full text-[10px] font-bold uppercase tracking-widest"
           >
             <SlidersHorizontal className="w-3 h-3" />
             Filters
             <ChevronDown className={cn("w-3 h-3 transition-transform", showMobileFilters && "rotate-180")} />
           </button>

           <div className="flex items-center gap-4 ml-auto">
              <Typography variant="bodySm" className="text-xs opacity-40 hidden sm:block">Sort by:</Typography>
              <select 
                className="bg-transparent border-none text-xs font-bold uppercase tracking-widest outline-none cursor-pointer"
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
           </div>
        </div>
      </div>

      {/* Mobile Expandable Filters */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-bazar-gray-50 dark:bg-bazar-gray-950 border-b border-bazar-gray-100 dark:border-bazar-gray-900"
          >
            <div className="px-6 py-8">
              <FiltersContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid lg:grid-cols-4 gap-12">
        {/* Desktop Filters Sidebar */}
        <aside className="space-y-10 hidden lg:block">
           <FiltersContent />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
           {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className="space-y-4">
                      <Skeleton className="aspect-square rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                   </div>
                 ))}
              </div>
           ) : masonryItems.length > 0 ? (
              <Masonry<Product>
                items={masonryItems}
                columnWidth={240} // Slightly smaller target width for more columns
                gap={24} // Compact gaps (reduced from 48)
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
