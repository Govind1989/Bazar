"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Utensils, Shirt, Zap, TreePine, Armchair, Monitor, Smartphone, 
  Calendar, MapPin, Clock, ShoppingBag, ChevronLeft, ChevronRight, Search, Star, ArrowRight, X, Package, Store, 
  History, TrendingUp, CheckCircle2
} from "lucide-react";
import { 
  PRODUCTS, 
  VENDORS, 
  CATEGORIES, 
  SERVICE_CATEGORIES, 
  SERVICES,
  Product,
  Vendor
} from "@/data/mock";
import { ProductCard } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types & Interfaces                                               */
/* ------------------------------------------------------------------ */

type TabType = "products" | "services";

interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  description: string;
}

interface CategorySelectionMenuProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */
const PRODUCT_CATEGORIES: CategoryMeta[] = CATEGORIES.map((c) => ({
  ...c,
  icon:
    c.icon === "Utensils" ? (
      <Utensils className="w-4 h-4" />
    ) : c.icon === "Shirt" ? (
      <Shirt className="w-4 h-4" />
    ) : c.icon === "Zap" ? (
      <Zap className="w-4 h-4" />
    ) : c.icon === "TreePine" ? (
      <TreePine className="w-4 h-4" />
    ) : c.icon === "Armchair" ? (
      <Armchair className="w-4 h-4" />
    ) : c.icon === "Monitor" ? (
      <Monitor className="w-4 h-4" />
    ) : c.icon === "Smartphone" ? (
      <Smartphone className="w-4 h-4" />
    ) : (
      <ShoppingBag className="w-4 h-4" />
    ),
}));

const SERVICES_CATEGORIES: CategoryMeta[] = SERVICE_CATEGORIES.map((c) => ({
  ...c,
  icon:
    c.icon === "Calendar" ? (
      <Calendar className="w-4 h-4" />
    ) : c.icon === "MapPin" ? (
      <MapPin className="w-4 h-4" />
    ) : c.icon === "Clock" ? (
      <Clock className="w-4 h-4" />
    ) : (
      <Calendar className="w-4 h-4" />
    ),
}));

export function CategorySelectionMenu({
  activeTab,
  setActiveTab,
  selectedCategories,
  setSelectedCategories,
}: CategorySelectionMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAll = selectedCategories.length === 0;
  const currentCategories = activeTab === "products" ? PRODUCT_CATEGORIES : SERVICES_CATEGORIES;

  // Persistence for Recent Searches
  useEffect(() => {
    const saved = localStorage.getItem("bazar_recent_searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== trimmed);
      const next = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem("bazar_recent_searches", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeRecentSearch = (query: string) => {
    setRecentSearches(prev => {
      const next = prev.filter(s => s !== query);
      localStorage.setItem("bazar_recent_searches", JSON.stringify(next));
      return next;
    });
  };

  // Click Away Listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (id: string) => {
    if (id === 'all') {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedCategories([]);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery) return { type: null, data: [] };

    if (searchQuery.startsWith("@")) {
      const vendorQuery = searchQuery.slice(1).toLowerCase();
      const filteredVendors = VENDORS.filter(v => 
        v.name.toLowerCase().includes(vendorQuery) || 
        v.slug.toLowerCase().includes(vendorQuery)
      );
      return { type: "vendor" as const, data: filteredVendors };
    }

    if (searchQuery.startsWith("#")) {
      const productQuery = searchQuery.slice(1).toLowerCase();
      const filteredProducts = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(productQuery) || 
        p.category.toLowerCase().includes(productQuery)
      );
      const filteredServices = SERVICES.filter(s => 
        s.name.toLowerCase().includes(productQuery) || 
        s.category.toLowerCase().includes(productQuery)
      );
      return { type: "product" as const, data: [...filteredProducts, ...filteredServices] };
    }

    // Default mixed search
    const filteredVendors = VENDORS.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return { type: "mixed" as const, data: [...filteredVendors, ...filteredProducts] };
  }, [searchQuery]);

  const trendingVendors = useMemo(() => VENDORS.slice(0, 3), []);
  const trendingItems = useMemo(() => PRODUCTS.slice(0, 3), []);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Category Selection Bar */}
      <div className="flex items-center gap-3 sm:gap-6 py-3 sm:py-4">
        {/* Products / Services pill */}
        <div className="flex items-center gap-2 sm:gap-3 bg-neutral-100 dark:bg-neutral-900 rounded-full p-1 shrink-0">
          <button
            onClick={() => handleTabChange("products")}
            className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === "products"
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => handleTabChange("services")}
            className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === "services"
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Services
          </button>
        </div>

        <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

        {/* Scrollable category pills */}
        <div className="relative flex-1 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto py-1 touch-pan-x no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              onClick={() => toggleCategory("all")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                isAll
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white shadow-md"
                  : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white"
              }`}
            >
              <span>{activeTab === "products" ? "All Products" : "All Services"}</span>
            </button>
            {currentCategories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                    isSelected
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white shadow-lg"
                      : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white"
                  }`}
                >
                  {cat.icon}
                  <span className="hidden sm:inline">{cat.name}</span>
                  <span className="sm:hidden">{cat.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll arrows */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Search Input */}
      <div className="relative pb-4">
        <div className="relative group">
          <Search className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300",
            isFocused ? "text-bazar-gray-500 opacity-100" : "opacity-20"
          )} />
          <Input 
            className="w-full h-10 pl-12 pr-12 bg-neutral-50 dark:bg-neutral-950 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 focus-visible:ring-2 focus-visible:ring-bazar-gray-500 rounded-xl text-sm placeholder:text-neutral-400 transition-all"
            placeholder="Use @bazar_shop for vendor search or #bazar_products/services for product/service search"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveSearch(searchQuery);
                // If it's a single result, maybe navigate?
              }
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4 opacity-40" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown/Overlay */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute left-0 right-0 top-full mt-2 z-50 p-2 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden max-h-[70vh] overflow-y-auto no-scrollbar"
            >
              {!searchQuery ? (
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left Column: Tips & History */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                       <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2">
                          <History className="w-3 h-3" /> Recent Searches
                       </Typography>
                       {recentSearches.length > 0 ? (
                         <div className="flex flex-col gap-1">
                            {recentSearches.map(s => (
                              <div key={s} className="flex items-center justify-between group/item">
                                <button 
                                  onClick={() => setSearchQuery(s)}
                                  className="flex-1 text-left py-2 text-sm font-medium hover:text-fuchsia-600 transition-colors truncate"
                                >
                                  {s}
                                </button>
                                <button 
                                  onClick={() => removeRecentSearch(s)}
                                  className="opacity-0 group-hover/item:opacity-40 hover:opacity-100 transition-opacity p-1"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                         </div>
                       ) : (
                         <p className="text-xs opacity-40 italic">No recent searches yet.</p>
                       )}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                      <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Search Tips</Typography>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-xs font-black text-fuchsia-600">@</div>
                            <p className="text-[11px] font-medium opacity-60">Prefix with <span className="font-black">@</span> to find Trusted Vendors</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-xs font-black text-fuchsia-600">#</div>
                            <p className="text-[11px] font-medium opacity-60">Prefix with <span className="font-black">#</span> to find Products or Services</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Trending */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                       <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center gap-2">
                          <TrendingUp className="w-3 h-3" /> Trending Vendors
                       </Typography>
                       <div className="flex flex-col gap-4">
                          {trendingVendors.map(vendor => (
                            <Link key={vendor.id} href={`/${vendor.slug}`} className="flex items-center gap-4 group/v" onClick={() => setIsFocused(false)}>
                               <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 dark:border-neutral-900 transition-transform group-hover/v:scale-110">
                                  <img src={vendor.logo} alt="" className="w-full h-full object-cover" />
                               </div>
                               <div className="flex-1">
                                  <Typography variant="bodySm" className="font-bold uppercase tracking-tighter text-[11px] group-hover/v:text-fuchsia-600 transition-colors">{vendor.name}</Typography>
                                  <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest">{vendor.categories[0]}</Typography>
                               </div>
                               <ArrowRight className="w-3 h-3 opacity-0 group-hover/v:opacity-100 group-hover/v:translate-x-1 transition-all text-fuchsia-600" />
                            </Link>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                       <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Featured Collections</Typography>
                       <div className="flex flex-wrap gap-2">
                          {trendingItems.map(item => (
                            <button 
                              key={item.id}
                              onClick={() => setSearchQuery(`#${item.name}`)}
                              className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-[10px] font-black uppercase tracking-widest hover:bg-fuchsia-600 hover:text-white transition-all"
                            >
                              {item.name}
                            </button>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              ) : searchResults.data.length > 0 ? (
                <div className="p-4 space-y-8">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                       {searchResults.type === 'vendor' ? <Store className="w-4 h-4 text-fuchsia-600" /> : <Package className="w-4 h-4 text-fuchsia-600" />}
                       <Typography variant="titleSm" className="uppercase tracking-widest font-black text-xs">
                          {searchResults.type === 'vendor' ? 'Matched Vendors' : searchResults.type === 'product' ? 'Matched Products & Services' : 'General Results'}
                       </Typography>
                    </div>
                    <Typography variant="bodySm" className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                       {searchResults.data.length} Matches Found
                    </Typography>
                  </div>

                  {searchResults.type === 'vendor' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.data.map((vendor: Vendor) => (
                        <div key={vendor.id} className="relative group">
                          <Link href={`/${vendor.slug}`} onClick={() => { setSearchQuery(""); setIsFocused(false); saveSearch(searchQuery); }}>
                            <Card className="p-6 bg-neutral-50 dark:bg-neutral-900 border-none rounded-[2rem] hover:shadow-2xl transition-all group overflow-hidden relative">
                              <div className="flex items-center gap-6 relative z-10">
                                <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden border-2 border-white dark:border-black shadow-xl group-hover:rotate-6 transition-transform">
                                  <img src={vendor.logo} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Typography variant="titleSm" className="font-black uppercase tracking-tighter text-lg">{vendor.name}</Typography>
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                  </div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                                    <span className="text-[10px] font-bold">{vendor.rating}</span>
                                    <span className="text-[10px] opacity-40 tracking-widest font-black uppercase">· Trusted Merchant</span>
                                  </div>
                                  <Typography variant="bodySm" className="text-xs opacity-60 line-clamp-2 mb-3">{vendor.description}</Typography>
                                  <div className="flex flex-wrap gap-2">
                                    {vendor.categories.map((cat: string) => (
                                      <span key={cat} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white/50 dark:bg-black/50 rounded-full opacity-60">
                                        {cat}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-fuchsia-600" />
                              </div>
                              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                 <Store className="w-32 h-32 rotate-12" />
                              </div>
                            </Card>
                          </Link>
                          {/* Overlay Follow Button */}
                          <div className="absolute bottom-6 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                             <Button size="sm" className="h-8 px-6 bg-fuchsia-600 text-white rounded-full text-[9px] font-black uppercase shadow-xl hover:bg-black dark:hover:bg-white dark:hover:text-black">Follow</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {searchResults.data.map((item: any) => (
                        <div key={item.id} onClick={() => { setSearchQuery(""); setIsFocused(false); saveSearch(searchQuery); }}>
                           <ProductCard 
                             product={item} 
                             vendorName={VENDORS.find(v => v.id === item.vendorId)?.name} 
                           />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-20 text-center space-y-6">
                   <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mx-auto mb-6 relative">
                      <Search className="w-10 h-10 opacity-10" />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-full"
                      />
                   </div>
                   <div>
                      <Typography variant="bodyMd" className="opacity-40 italic block mb-2">No direct matches found for "{searchQuery}"</Typography>
                      <Typography variant="bodySm" className="text-[10px] uppercase font-black tracking-widest opacity-20">Try adjusting your filters or search prefix</Typography>
                   </div>
                   <Button variant="outline" onClick={() => setSearchQuery("")} className="uppercase tracking-widest text-[10px] font-black rounded-full h-10 px-8">Clear Search</Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
