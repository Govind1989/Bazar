"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useCategoryProducts } from "@/hooks/useCategoryData";
import { CATEGORIES, SERVICE_CATEGORIES, VENDORS, Product } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { 
  ChevronRight, 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  ShoppingBag,
  Star,
  Bookmark,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  ArrowRight,
  Sparkles,
  Utensils,
  Shirt,
  Zap,
  TreePine,
  Armchair,
  Monitor,
  Smartphone,
  Calendar,
  Clock,
  MapPin,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Masonry } from "@/components/shared/Masonry";
import { motion, AnimatePresence } from "framer-motion";
import { useSystemStore } from "@/store/useSystemStore";
import { Button } from "@/components/ui/button";

interface CategoryViewSocioProps {
  categorySlug: string;
}

export default function CategoryViewSocio({ categorySlug }: CategoryViewSocioProps) {
  const category = [...CATEGORIES, ...SERVICE_CATEGORIES].find((c) => c.slug === categorySlug);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [filters, setFilters] = useState({
    category: categorySlug,
    sortBy: "popularity",
    vendors: [] as string[],
    subCategories: [] as string[],
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  });

  const { data: products, isLoading } = useCategoryProducts({
      ...filters,
      search: searchQuery,
      priceRange: (filters.minPrice || filters.maxPrice) ? [filters.minPrice || 0, filters.maxPrice || 9999999] : undefined
  });

  const masonryItems = useMemo(() => products || [], [products]);

  const toggleLike = (id: string) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!category) return null;

  const CategoryIcon = ({ icon, className }: { icon: string; className?: string }) => {
    switch (icon) {
      case "Utensils": return <Utensils className={className} />;
      case "Shirt": return <Shirt className={className} />;
      case "Zap": return <Zap className={className} />;
      case "TreePine": return <TreePine className={className} />;
      case "Armchair": return <Armchair className={className} />;
      case "Monitor": return <Monitor className={className} />;
      case "Smartphone": return <Smartphone className={className} />;
      case "Calendar": return <Calendar className={className} />;
      case "MapPin": return <MapPin className={className} />;
      case "Clock": return <Clock className={className} />;
      default: return <ShoppingBag className={className} />;
    }
  };

  const FiltersPanel = () => (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Sub Categories */}
        <div className="space-y-2">
           <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Sub Categories</Typography>
           <div className="flex flex-wrap gap-2">
             {category.subCategories?.map(sub => (
               <button 
                 key={sub.id}
                 onClick={() => {
                   const next = filters.subCategories.includes(sub.slug)
                     ? filters.subCategories.filter(s => s !== sub.slug)
                     : [...filters.subCategories, sub.slug];
                   setFilters({...filters, subCategories: next});
                 }}
                 className={cn(
                   "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                   filters.subCategories.includes(sub.slug)
                     ? "bg-fuchsia-600 border-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/20"
                     : "bg-neutral-50 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-700 hover:border-fuchsia-600"
                 )}
               >
                 {sub.name}
               </button>
             ))}
             {!category.subCategories && <span className="text-[10px] font-bold opacity-30 italic">Generic Collection</span>}
           </div>
        </div>

        {/* Vendors */}
        <div className="space-y-6">
           <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Trusted Vendors</Typography>
           <div className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
             {VENDORS.filter(v => v.categories.includes(categorySlug)).map(vendor => (
               <label key={vendor.id} className="flex items-center gap-3 group cursor-pointer">
                 <input 
                   type="checkbox" 
                   className="hidden"
                   checked={filters.vendors.includes(vendor.id)}
                   onChange={(e) => {
                     const next = e.target.checked 
                       ? [...filters.vendors, vendor.id]
                       : filters.vendors.filter(id => id !== vendor.id);
                     setFilters({ ...filters, vendors: next });
                   }}
                 />
                 <div className={cn(
                   "w-4 h-4 rounded-full border-2 transition-all",
                   filters.vendors.includes(vendor.id) 
                     ? "bg-fuchsia-600 border-fuchsia-600 shadow-lg shadow-fuchsia-600/30" 
                     : "border-neutral-200 dark:border-neutral-700 group-hover:border-fuchsia-600"
                 )} />
                 <Typography variant="bodySm" className="text-xs font-bold uppercase tracking-tight group-hover:text-fuchsia-600 transition-colors">{vendor.name}</Typography>
               </label>
             ))}
           </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex  justify-between items-end ">
           <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Price Spectrum (NPR)</Typography>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters({
                category: categorySlug,
                sortBy: "popularity",
                vendors: [],
                subCategories: [],
                minPrice: undefined,
                maxPrice: undefined,
              })}
              className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 p-0 h-auto"
            >
              Reset All Filters
            </Button>
          </div>
           <div className="flex items-center gap-4">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full h-12 bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl px-4 text-xs font-bold outline-none focus:border-fuchsia-600 transition-all"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value ? Number(e.target.value) : undefined})}
              />
              <div className="w-4 h-0.5 bg-neutral-200" />
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full h-12 bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl px-4 text-xs font-bold outline-none focus:border-fuchsia-600 transition-all"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined})}
              />
           </div>
           
        </div>
      </div>
    </motion.div>
  );

  const SocialProductCard = ({ product, vendor }: { product: Product, vendor?: any }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-neutral-100 dark:border-neutral-800 hover:shadow-2xl transition-all duration-500"
    >
      <div className="p-5 flex items-center justify-between border-b border-neutral-50 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-100">
            <img src={vendor?.logo} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tight">{vendor?.name}</span>
        </div>
        <Bookmark className="w-4 h-4 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
      </div>
      
      <div className="relative aspect-square overflow-hidden bg-neutral-50 dark:bg-neutral-950">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-[8px] font-black uppercase rounded-full shadow-lg">
             Flash Sale
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-6 mb-4">
          <button onClick={() => toggleLike(product.id)} className="flex items-center gap-1.5 group/btn">
             <Heart className={cn("w-5 h-5 transition-colors", likedProducts.has(product.id) ? "fill-red-500 text-red-500" : "text-neutral-300 group-hover/btn:text-red-500")} />
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Like</span>
          </button>
          <button className="flex items-center gap-1.5 group/btn">
             <MessageSquare className="w-5 h-5 text-neutral-300 group-hover/btn:text-blue-500" />
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">45</span>
          </button>
          <button className="flex items-center gap-1.5 group/btn">
             <Share2 className="w-5 h-5 text-neutral-300 group-hover/btn:text-fuchsia-500" />
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Share</span>
          </button>
        </div>
        <h4 className="text-sm font-black uppercase tracking-tighter mb-1 line-clamp-1">{product.name}</h4>
        <div className="flex items-center justify-between">
           <span className="text-xs font-black italic">रु {product.price.toLocaleString()}</span>
           <Button size="sm" className="h-8 rounded-full bg-black dark:bg-white text-white dark:text-black text-[9px] font-black uppercase">Buy Now</Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-16 pb-32">
      {/* Immersive Social Header */}
      <div className="relative h-[40vh] sm:h-[60vh] w-full overflow-hidden">
         <img 
           src={products?.[0]?.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"} 
           className="w-full h-full object-cover opacity-60 dark:opacity-40"
           alt="" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-black via-transparent to-transparent" />
         <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-12 max-w-3xl">
            <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
               <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[2rem] bg-fuchsia-600 flex items-center justify-center text-white shadow-2xl shadow-fuchsia-600/40">
                  <CategoryIcon icon={category.icon} className="w-5 h-5 sm:w-8 sm:h-8" />
               </div>
               <div className="h-px w-8 sm:w-12 bg-fuchsia-600/30" />
               <span className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-fuchsia-600">Premium Curation</span>
              </div>
              <h1 className="text-4xl sm:text-8xl font-black uppercase tracking-tighter mb-3 sm:mb-6 text-neutral-900 dark:text-white leading-[0.9]">
                 {category.name}.
              </h1>
              <p className="text-xs sm:text-xl font-bold uppercase tracking-widest opacity-40 dark:text-white/60 leading-relaxed max-w-sm sm:max-w-none">
                 {category.description}
              </p>
           </div>
        </div>

      {/* Categories / Vendor Rail */}
      <section className="px-4 sm:px-12 -translate-y-8 sm:-translate-y-10">
         <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4">
            <button className="flex flex-col items-center gap-2 sm:gap-3 shrink-0 group">
               <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2.5rem] bg-black dark:bg-white flex items-center justify-center shadow-xl">
                  <Plus className="w-5 h-5 sm:w-8 sm:h-8 text-white dark:text-black group-hover:rotate-90 transition-transform" />
               </div>
               <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">Follow</span>
            </button>
            {VENDORS.filter(v => v.categories.includes(categorySlug)).map((vendor, idx) => (
              <div key={vendor.id} className="flex flex-col items-center gap-2 sm:gap-3 shrink-0 cursor-pointer group">
                <div className={cn(
                  "w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2.5rem] p-0.5 sm:p-1 border-2 transition-all",
                  idx % 2 === 0 ? "border-fuchsia-600 shadow-lg shadow-fuchsia-600/20" : "border-blue-600 shadow-lg shadow-blue-600/20"
                )}>
                  <img src={vendor.logo} alt="" className="w-full h-full object-cover rounded-2xl sm:rounded-[2.2rem] group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tighter truncate w-14 sm:w-20 text-center">{vendor.name.split(' ')[0]}</span>
              </div>
            ))}
         </div>
      </section>

      {/* Utility Bar (Search & Sort) */}
      <div className="sticky top-16 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-neutral-100 dark:border-neutral-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-12 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
            <div className="flex-1 max-w-full relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-20 group-focus-within:text-fuchsia-600 group-focus-within:opacity-100 transition-all" />
               <input 
                 type="text" 
                 placeholder={`Search...`}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-9 sm:h-10 pl-10 pr-4 bg-neutral-50 dark:bg-neutral-900 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-tight outline-none border border-transparent focus:border-fuchsia-600 transition-all"
               />
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={cn(
                   "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all",
                   showFilters ? "bg-fuchsia-600 text-white shadow-xl shadow-fuchsia-600/30" : "bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                 )}
               >
                 <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                 <span className="hidden xs:inline">Filters</span>
                 <ChevronDown className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform duration-300", showFilters && "rotate-180")} />
               </button>

               <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

               <div className="flex items-center gap-2 sm:gap-3">
                  <select 
                    className="bg-transparent border-none text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-fuchsia-600"
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  >
                    <option value="popularity">Popular</option>
                    <option value="price-low">Price L-H</option>
                    <option value="price-high">Price H-L</option>
                  </select>
               </div>
            </div>
         </div>
         
         <AnimatePresence>
           {showFilters && <FiltersPanel />}
         </AnimatePresence>
      </div>

      {/* Social Feed Masonry */}
      <main className="px-4 sm:px-12 py-10 sm:py-20 max-w-7xl mx-auto">
         <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-16">
            <div className="w-1.5 h-8 sm:w-2 sm:h-10 bg-fuchsia-600 rounded-full" />
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter">Live Collection</h2>
            <span className="text-[9px] sm:text-xs font-bold opacity-30 uppercase tracking-[0.2em] sm:tracking-[0.3em] ml-2 sm:ml-4">
              {masonryItems.length} posts
            </span>
         </div>

         {isLoading ? (
           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12">
             {[1,2,3,4].map(i => <Skeleton key={i} className="aspect-[4/5] rounded-3xl sm:rounded-[3rem]" />)}
           </div>
         ) : masonryItems.length > 0 ? (
           <Masonry<Product>
             items={masonryItems}
             columnWidth={240}
             gap={16} // Compact for mobile
             predictHeight={(p, width) => (width * 1.2) + 120} // Adjust height prediction for social card
             renderItem={(product) => (
               <SocialProductCard 
                 key={product.id} 
                 product={product} 
                 vendor={VENDORS.find(v => v.id === product.vendorId)}
               />
             )}
           />
         ) : (
          <div className="py-24 text-center border-2 border-dashed border-neutral-100 dark:border-neutral-800 rounded-[3rem]">
             <ShoppingBag className="w-12 h-12 text-neutral-200 dark:text-neutral-800 mx-auto mb-6" />
             <Typography variant="titleMd" className="opacity-40 mb-2 font-black uppercase tracking-widest">No items found</Typography>
             <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px] font-bold">Try different filters for this category.</Typography>
          </div>
         )}
      </main>
    </div>
  );
}
