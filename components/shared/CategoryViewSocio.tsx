"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useCategoryProducts } from "@/hooks/useCategoryData";
import { CATEGORIES, VENDORS, Product } from "@/data/mock";
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
  MapPin
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
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState({
    category: categorySlug,
    sortBy: "popularity",
    vendors: [] as string[],
  });

  const { data: products, isLoading } = useCategoryProducts(filters);

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
      <div className="relative h-[60vh] w-full overflow-hidden">
         <img 
           src={products?.[0]?.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"} 
           className="w-full h-full object-cover opacity-60 dark:opacity-40"
           alt="" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-black via-transparent to-transparent" />
         <div className="absolute bottom-20 left-6 md:left-12 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-16 rounded-[2rem] bg-fuchsia-600 flex items-center justify-center text-white shadow-2xl shadow-fuchsia-600/40">
                  <CategoryIcon icon={category.icon} className="w-8 h-8" />
               </div>
               <div className="h-px w-12 bg-fuchsia-600/30" />
               <span className="text-xs font-black uppercase tracking-[0.4em] text-fuchsia-600">Premium Curation</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-neutral-900 dark:text-white leading-[0.9]">
               {category.name}.
            </h1>
            <p className="text-lg md:text-xl font-bold uppercase tracking-widest opacity-40 dark:text-white/60 leading-relaxed">
               {category.description}
            </p>
         </div>
      </div>

      {/* Categories / Vendor Rail */}
      <section className="px-6 md:px-12 -translate-y-10">
         <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
            <button className="flex flex-col items-center gap-3 shrink-0 group">
               <div className="w-20 h-20 rounded-[2.5rem] bg-black dark:bg-white flex items-center justify-center shadow-xl">
                  <Plus className="w-8 h-8 text-white dark:text-black group-hover:rotate-90 transition-transform" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Follow</span>
            </button>
            {VENDORS.filter(v => v.categories.includes(categorySlug)).map((vendor, idx) => (
              <div key={vendor.id} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div className={cn(
                  "w-20 h-20 rounded-[2.5rem] p-1 border-2 transition-all",
                  idx % 2 === 0 ? "border-fuchsia-600 shadow-lg shadow-fuchsia-600/20" : "border-blue-600 shadow-lg shadow-blue-600/20"
                )}>
                  <img src={vendor.logo} alt="" className="w-full h-full object-cover rounded-[2.2rem] group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter truncate w-20 text-center">{vendor.name.split(' ')[0]}</span>
              </div>
            ))}
         </div>
      </section>

      {/* Social Feed Masonry */}
      <main className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
         <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
               <div className="w-2 h-10 bg-fuchsia-600 rounded-full" />
               <h2 className="text-3xl font-black uppercase tracking-tighter">Live Collection</h2>
            </div>
            <div className="flex items-center gap-4">
               <Button variant="outline" className="rounded-full h-10 px-6 border-neutral-200 dark:border-neutral-800 text-[10px] font-black uppercase tracking-widest">
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-2" /> Filters
               </Button>
            </div>
         </div>

         {isLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
             {[1,2,3].map(i => <Skeleton key={i} className="aspect-[4/5] rounded-[3rem]" />)}
           </div>
         ) : masonryItems.length > 0 ? (
           <Masonry<Product>
             items={masonryItems}
             columnWidth={320}
             gap={48}
             predictHeight={(p) => 450}
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
