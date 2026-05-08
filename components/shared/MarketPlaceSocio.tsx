"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PRODUCTS,
  VENDORS,
  CATEGORIES,
  SERVICE_CATEGORIES,
  SERVICES,
  EVENTS,
  BazarEvent,
} from "@/data/mock";
import {
  Calendar,
  Star,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Bookmark,
  Layers,
  MapPin,
  Flame,
  X,
  MoreHorizontal,
  ArrowRight,
  ShoppingCart,
  MessageSquare,
  BadgePercent,
  Video,
  ShoppingBag,
} from "lucide-react";
import { Masonry } from "./Masonry";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { CategorySelectionMenu } from "./CategorySelectionMenu";

/* ------------------------------------------------------------------ */
/*  Types & Interfaces                                               */
/* ------------------------------------------------------------------ */

type TabType = "products" | "services";

interface SocialPost {
  id: string;
  type: 'product' | 'service' | 'event' | 'flash_sale' | 'ugc' | 'live';
  authorId: string;
  media: {
    type: 'image' | 'video';
    url: string;
    aspectRatio: number;
    hotspots?: { x: number; y: number; productId: string }[];
  }[];
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  category: string;
  relatedId?: string;
  location?: string;
  isLive?: boolean;
  viewers?: number;
}

/* ------------------------------------------------------------------ */
/*  Utilities                                                        */
/* ------------------------------------------------------------------ */

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return String(num);
}

/* ------------------------------------------------------------------ */
/*  Feed Card Component                                               */
/* ------------------------------------------------------------------ */

function FeedCard({ 
  item, 
  index, 
  onLike, 
  onSave, 
  isLiked, 
  isSaved 
}: { 
  item: SocialPost; 
  index: number; 
  onLike: (id: string) => void; 
  onSave: (id: string) => void;
  isLiked: boolean;
  isSaved: boolean;
}) {
  const vendor = VENDORS.find(v => v.id === item.authorId);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 10) * 0.1 }}
      className="group bg-white dark:bg-neutral-950 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-neutral-100 dark:border-neutral-900 hover:shadow-[0_60px_100px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_60px_100px_rgba(0,0,0,0.4)] transition-all duration-700"
    >
      {/* Post Header */}
      <div className="px-4 py-3 sm:px-7 sm:py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-neutral-100 dark:border-neutral-900 group-hover:rotate-6 transition-transform">
            <img src={vendor?.logo} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-tighter block truncate max-w-[100px] sm:max-w-none">{vendor?.name}</span>
            <span className="text-[8px] sm:text-[9px] font-bold uppercase opacity-30 tracking-widest flex items-center gap-1">
               <MapPin className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> <span className="truncate max-w-[60px] sm:max-w-none">{item.location || 'Kathmandu'}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
           <button onClick={() => onSave(item.id)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              <Bookmark className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all", isSaved ? "fill-fuchsia-600 text-fuchsia-600" : "opacity-20")} />
           </button>
           <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-20" />
           </button>
        </div>
      </div>

      {/* Immersive Media Section */}
      <div 
        className="relative overflow-hidden cursor-none group/media"
        style={{ aspectRatio: item.media[0].aspectRatio }}
      >
        <Image 
          src={item.media[0].url} 
          alt={item.caption} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Post Badges */}
        <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex flex-col gap-1 sm:gap-2">
           {item.type === 'flash_sale' && (
             <div className="px-2 py-1 sm:px-4 sm:py-1.5 bg-red-600 text-white text-[7px] sm:text-[9px] font-black uppercase rounded-full shadow-2xl flex items-center gap-1 sm:gap-2">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Flash
             </div>
           )}
           {item.isLive && (
             <div className="px-2 py-1 sm:px-4 sm:py-1.5 bg-fuchsia-600 text-white text-[7px] sm:text-[9px] font-black uppercase rounded-full shadow-2xl flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Trending
             </div>
           )}
        </div>

        {/* Interactive Shop Tag - Hidden on mobile or made simpler */}
        {item.relatedId && (
           <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 translate-y-2 sm:translate-y-20 sm:group-hover:translate-y-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-700">
              <div className="p-2 sm:p-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl sm:rounded-[2rem] flex items-center justify-between text-white shadow-2xl">
                 <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl rotate-3">
                       <img src={item.media[0].url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">Shop</span>
                       <span className="text-[10px] sm:text-sm font-black tracking-tight truncate w-20 sm:w-32">Details</span>
                    </div>
                 </div>
                 <Button className="h-7 sm:h-10 px-3 sm:px-6 bg-white text-black hover:bg-fuchsia-600 hover:text-white rounded-full text-[8px] sm:text-[10px] font-black uppercase transition-colors">
                    Buy
                 </Button>
              </div>
           </div>
        )}
        
        {/* Custom Cursor Overlay - Hidden on mobile */}
        <div className="hidden sm:group-hover/media:flex absolute inset-0 items-center justify-center pointer-events-none">
           <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-sm">
              <Plus className="w-6 h-6 text-white" />
           </div>
        </div>
      </div>

      {/* Interaction & Engagement */}
      <div className="p-4 sm:p-8">
        <div className="flex items-center gap-4 sm:gap-8 mb-4 sm:mb-6">
           <button 
             onClick={() => onLike(item.id)}
             className="flex flex-col items-center gap-1 sm:gap-2 group/btn"
           >
             <div className={cn(
               "w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500",
               isLiked ? "bg-red-50 border-red-200" : "border-neutral-100 dark:border-neutral-900 group-hover/btn:border-red-500"
             )}>
                <Heart className={cn("w-4 h-4 sm:w-5 sm:h-5 transition-all", isLiked ? "fill-red-500 text-red-500 scale-125" : "text-neutral-300")} />
             </div>
             <span className="text-[8px] sm:text-[10px] font-black uppercase">{formatNumber(item.likes + (isLiked ? 1 : 0))}</span>
           </button>
           
           <button className="flex flex-col items-center gap-1 sm:gap-2 group/btn">
             <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-neutral-100 dark:border-neutral-900 flex items-center justify-center group-hover/btn:border-blue-500 transition-all">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 group-hover/btn:text-blue-500" />
             </div>
             <span className="text-[8px] sm:text-[10px] font-black uppercase">{formatNumber(item.comments)}</span>
           </button>
           
           <button className="flex flex-col items-center gap-1 sm:gap-2 group/btn">
             <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-neutral-100 dark:border-neutral-900 flex items-center justify-center group-hover/btn:border-fuchsia-500 transition-all">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 group-hover/btn:text-fuchsia-500" />
             </div>
             <span className="text-[8px] sm:text-[10px] font-black uppercase">Share</span>
           </button>
        </div>
        
        <p className="text-[10px] sm:text-xs font-medium leading-relaxed opacity-60 line-clamp-2 mb-4 sm:mb-6">
           <span className="font-black text-black dark:text-white mr-2 sm:mr-3 uppercase tracking-tighter">{vendor?.name.split(' ')[0]}</span>
           {item.caption}
        </p>
        
        <div className="flex flex-wrap gap-1 sm:gap-2">
           {['#bazar', '#nepal'].map(tag => (
             <span key={tag} className="text-[7px] sm:text-[9px] font-black text-fuchsia-600 bg-fuchsia-600/5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full uppercase tracking-widest cursor-pointer hover:bg-fuchsia-600 hover:text-white transition-colors">{tag}</span>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Socio-Ecommerce Main Component                                    */
/* ------------------------------------------------------------------ */

export default function MarketPlaceSocio() {
  const [activeTab, setActiveTab] = useState<TabType>("products");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const isAll = selectedCategories.length === 0;
  const currentCategories = activeTab === "products" ? CATEGORIES : SERVICE_CATEGORIES;

  /* ---- Discovery / Watch / Events Tabs (preserved) ---- */
  const [viewTab, setViewTab] = useState<"discovery" | "watch" | "events">("discovery");
  const [activeQuickFilter, setActiveQuickFilter] = useState<'flash_sale' | 'offers' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  // Unified Feed Generation
  const feedItems = useMemo<SocialPost[]>(() => {
    let items: SocialPost[] = [];

    // Flash Sale Promo
    items.push({
      id: 'promo-1',
      type: 'flash_sale',
      authorId: 'v2',
      media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop', aspectRatio: 1.8 }],
      caption: 'MIDNIGHT FEAST! Get 40% off on all Artisan Sourdoughs. 🔥🥖',
      likes: 4500, comments: 120, shares: 300, timestamp: 'Just Now', category: 'foods', location: 'Kathmandu', isLive: true
    });

    const productPosts: SocialPost[] = PRODUCTS.map((p) => ({
      id: `p-${p.id}`,
      type: p.compareAtPrice ? 'flash_sale' : 'product',
      authorId: p.vendorId,
      media: [{ type: 'image', url: p.image, aspectRatio: 0.8 + Math.random() * 0.4 }],
      caption: `${p.name}. ${p.description} #shop #bazar`,
      likes: 1200, comments: 45, shares: 12, timestamp: '2h ago', category: p.category, relatedId: p.id
    }));

    const servicePosts: SocialPost[] = SERVICES.map((s) => ({
      id: `s-${s.id}`,
      type: 'service',
      authorId: s.vendorId,
      media: [{ type: 'image', url: s.image, aspectRatio: 1.2 }],
      caption: `Book ${s.name} for an immersive experience. 🗓️✨`,
      likes: 800, comments: 12, shares: 5, timestamp: '5h ago', category: s.category, relatedId: s.id
    }));

    const eventPosts: SocialPost[] = EVENTS.map((e) => ({
      id: `e-${e.id}`,
      type: 'event',
      authorId: 'v1',
      media: [{ type: 'image', url: e.image, aspectRatio: 1.5 }],
      caption: `${e.name} at ${e.location}! Join the community. 🎟️🎉`,
      likes: 5000, comments: 200, shares: 80, timestamp: '1d ago', category: e.category, relatedId: e.id, location: e.location
    }));

    // Mix them
    items = [...items, ...productPosts];
    items.splice(3, 0, servicePosts[0]);
    items.splice(5, 0, eventPosts[0]);

    return items;
  }, []);

  /* ---- Filtered Feed based on Products/Services toggle + Categories + Quick Filters ---- */
  const filteredFeed = useMemo(() => {
    let filtered = feedItems;

    // 1. Filter by Products vs Services tab
    if (activeTab === 'products') {
        filtered = filtered.filter(item => item.type === 'product' || item.type === 'flash_sale' || item.type === 'event');
    } else {
        filtered = filtered.filter(item => item.type === 'service');
    }

    // 2. Filter by selected categories
    if (selectedCategories.length > 0) {
        const selectedSlugs = currentCategories
            .filter(c => selectedCategories.includes(c.id))
            .map(c => c.slug);
        filtered = filtered.filter(item => selectedSlugs.includes(item.category));
    }

    // 3. Filter by Quick Filters (Flash Sale / Offers)
    if (activeQuickFilter === 'flash_sale') {
        filtered = filtered.filter(item => item.type === 'flash_sale');
    } else if (activeQuickFilter === 'offers') {
        filtered = filtered.filter(item => {
            const product = PRODUCTS.find(p => p.id === item.relatedId);
            return product && product.compareAtPrice && product.compareAtPrice > product.price;
        });
    }

    return filtered;
  }, [activeTab, selectedCategories, activeQuickFilter, feedItems, currentCategories]);

  const filteredVendors = useMemo(() => {
    // 1. Filter vendors by tab (Product vs Services)
    const vendorsByTab = activeTab === 'products' 
      ? VENDORS 
      : VENDORS.filter(v => SERVICES.some(s => s.vendorId === v.id));

    // 2. Filter by selected categories
    if (isAll) return vendorsByTab;

    const selectedSlugs = currentCategories
      .filter(c => selectedCategories.includes(c.id))
      .map(c => c.slug);

    return vendorsByTab.filter(v => 
      v.categories.some(catSlug => selectedSlugs.includes(catSlug))
    );
  }, [activeTab, selectedCategories, isAll, currentCategories]);

  const activeCategoryNames = isAll
    ? (activeTab === 'products' ? "All Products" : "All Services")
    : currentCategories.filter(c => selectedCategories.includes(c.id)).map(c => c.name).join(", ");
  const activeCategoryDesc = isAll
    ? (activeTab === 'products' ? "Explore products from our marketplace" : "Explore services from our marketplace")
    : "Browsing: " + activeCategoryNames;

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black transition-colors duration-700 pb-32 pt-16">
      
      {/* ============================================================= */}
      {/*  SUB-NAV: Discovery / Watch / Booking (PRESERVED)             */}
      {/* ============================================================= */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-2xl px-6 h-16">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
           <nav className="flex items-center gap-10">
            {[
              { id: 'discovery', label: 'Discovery', icon: <Layers className="w-4 h-4" /> },
              { id: 'watch', label: 'Reels', icon: <Video className="w-4 h-4" /> },
              { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setViewTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative py-1",
                  viewTab === tab.id ? "text-fuchsia-600 opacity-100" : "opacity-30 hover:opacity-100"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                {viewTab === tab.id && (
                  <motion.div layoutId="tabUnderlineSocio" className="absolute -bottom-2 left-0 right-0 h-1 bg-fuchsia-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveQuickFilter(activeQuickFilter === 'offers' ? null : 'offers')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all group",
                activeQuickFilter === 'offers' 
                  ? "bg-fuchsia-600 border-fuchsia-600 text-white" 
                  : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-fuchsia-500"
              )}
            >
              <BadgePercent className={cn("w-4 h-4", activeQuickFilter === 'offers' ? "text-white" : "text-orange-400 group-hover:text-fuchsia-600")} />
              <span className={cn("text-[10px] uppercase tracking-widest hidden md:inline", activeQuickFilter === 'offers' ? "text-white" : "text-orange-500")}>Sales and Offers</span>
            </button>
            <button 
              onClick={() => setActiveQuickFilter(activeQuickFilter === 'flash_sale' ? null : 'flash_sale')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all group",
                activeQuickFilter === 'flash_sale' 
                  ? "bg-red-600 border-red-600 text-white" 
                  : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-fuchsia-500"
              )}
            >
                <span className="relative flex h-3 w-3">
                  <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", activeQuickFilter === 'flash_sale' ? "bg-white" : "bg-red-400")} />
                  <span className={cn("relative inline-flex rounded-full h-3 w-3", activeQuickFilter === 'flash_sale' ? "bg-white" : "bg-red-500")} />
                </span>
              <span className={cn("text-[10px] uppercase tracking-widest hidden md:inline", activeQuickFilter === 'flash_sale' ? "text-white" : "text-orange-500")}>Flash Sale</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/*  STICKY CATEGORY SELECTOR & SEARCH                            */}
      {/* ============================================================= */}
      <section className="sticky top-32 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <CategorySelectionMenu 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />
        </div>
      </section>

      {/* Stories Rail */}
      <section className="py-10 px-6 overflow-x-auto no-scrollbar bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
        <div className="flex gap-8 items-center max-w-7xl mx-auto">
          <button className="flex flex-col items-center gap-3 shrink-0 group">
             <div className="w-18 h-18 rounded-[2rem] border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center p-1">
                <div className="w-full h-full rounded-[1.8rem] bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
                   <Plus className="w-8 h-8 text-neutral-300 group-hover:text-fuchsia-600 transition-colors" />
                </div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Add Story</span>
          </button>
          {VENDORS.map((vendor, idx) => (
            <div key={vendor.id} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer" onClick={() => setActiveStory(vendor.id)}>
              <div className={cn("w-18 h-18 rounded-[2rem] p-[3px]", idx % 2 === 0 ? "bg-gradient-to-tr from-fuchsia-600 via-purple-500 to-indigo-500" : "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500")}>
                <div className="w-full h-full rounded-[1.8rem] border-4 border-white dark:border-black overflow-hidden bg-neutral-100">
                  <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter truncate w-18 text-center group-hover:text-fuchsia-600 transition-colors">
                {vendor.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {viewTab === 'discovery' && (
            <motion.div 
              key={`${activeTab}-${selectedCategories.join('-')}`}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -30 }} 
              className="space-y-16"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                      <h2
                          className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-neutral-900 dark:text-white tracking-tighter mb-2"
                      >
                          {activeCategoryNames}
                      </h2>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
                          {activeCategoryDesc}
                      </p>
                  </div>
                  {!isAll && selectedCategories.length === 1 && (
                      <Link
                          href={`/${currentCategories.find(c => c.id === selectedCategories[0])?.slug || '#'}`}
                          className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-fuchsia-600 hover:underline underline-offset-8"
                      >
                          Explore All <ArrowRight className="w-4 h-4" />
                      </Link>
                  )}
              </div>

              {/* Feed */}
              <div className="space-y-16">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-8 bg-fuchsia-600 rounded-full" />
                   <h3 className="text-2xl font-black uppercase tracking-tighter">Recommended For You</h3>
                </div>

                {filteredFeed.length > 0 ? (
                  <>
                    <Masonry
                      items={filteredFeed.slice(0, 4)}
                      gap={32}
                      columnWidth={360}
                      predictHeight={(item, width) => (width * item.media[0].aspectRatio) + 180}
                      renderItem={(item, index) => (
                        <FeedCard 
                          item={item} 
                          index={index} 
                          onLike={toggleLike} 
                          onSave={toggleSave} 
                          isLiked={likedPosts.has(item.id)} 
                          isSaved={savedPosts.has(item.id)} 
                        />
                      )}
                    />

                    {/* Suggested Vendors Strip */}
                    {filteredVendors.length > 0 && (
                      <section className="py-12 bg-white dark:bg-neutral-900 rounded-[3rem] px-10 border border-neutral-100 dark:border-neutral-800 shadow-[0_40px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-sm font-black uppercase tracking-widest">Trusted Vendors</h4>
                            <Link href="/vendors" className="text-[9px] font-black uppercase tracking-widest text-fuchsia-600">See all</Link>
                        </div>
                        <div className="flex gap-10 overflow-x-auto no-scrollbar">
                            {filteredVendors.map(vendor => (
                              <div key={vendor.id} className="flex flex-col items-center gap-4 shrink-0 group">
                                <Link href={`/${vendor.slug}`}>
                                 <div className="w-20 h-20 rounded-[2.5rem] overflow-hidden border-2 border-neutral-100 dark:border-neutral-800 p-1 group-hover:border-fuchsia-500 transition-all">
                                    <img src={vendor.logo} alt="" className="w-full h-full object-cover rounded-[2.2rem]" />
                                 </div>
                                </Link>
                                 <div className="text-center">
                                    <span className="text-[10px] font-black uppercase tracking-tighter block">{vendor.name}</span>
                                    <div className="flex items-center justify-center gap-1">
                                       <Star className="w-2 h-2 fill-orange-400 text-orange-400" />
                                       <span className="text-[8px] font-bold">{vendor.rating}</span>
                                    </div>
                                 </div>
                                 <Button size="sm" className="h-7 px-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-[8px] font-black uppercase">Follow</Button>
                              </div>
                            ))}
                        </div>
                      </section>
                    )}

                    <Masonry
                      items={filteredFeed.slice(4)}
                      gap={32}
                      columnWidth={360}
                      predictHeight={(item, width) => (width * item.media[0].aspectRatio) + 180}
                      renderItem={(item, index) => (
                        <FeedCard 
                          item={item} 
                          index={index + 4} 
                          onLike={toggleLike} 
                          onSave={toggleSave} 
                          isLiked={likedPosts.has(item.id)} 
                          isSaved={savedPosts.has(item.id)} 
                        />
                      )}
                    />
                  </>
                ) : (
                  <div className="space-y-16">
                    <div className="py-32 text-center bg-white dark:bg-neutral-950 rounded-[4rem] border-2 border-dashed border-neutral-100 dark:border-neutral-900">
                      <ShoppingBag className="w-16 h-16 text-neutral-200 dark:text-neutral-800 mx-auto mb-6" />
                      <p className="text-sm font-black uppercase tracking-[0.4em] opacity-30">
                          No items found in this category
                      </p>
                    </div>

                    {/* Show vendors even if feed is empty */}
                    {filteredVendors.length > 0 && (
                      <section className="py-12 bg-white dark:bg-neutral-900 rounded-[3rem] px-10 border border-neutral-100 dark:border-neutral-800 shadow-[0_40px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-sm font-black uppercase tracking-widest">Trusted Vendors</h4>
                            <Link href="/vendors" className="text-[9px] font-black uppercase tracking-widest text-fuchsia-600">See all</Link>
                        </div>
                        <div className="flex gap-10 overflow-x-auto no-scrollbar">
                            {filteredVendors.map(vendor => (
                              <div key={vendor.id} className="flex flex-col items-center gap-4 shrink-0 group">
                                <Link href={`/${vendor.slug}`}>
                                 <div className="w-20 h-20 rounded-[2.5rem] overflow-hidden border-2 border-neutral-100 dark:border-neutral-800 p-1 group-hover:border-fuchsia-500 transition-all">
                                    <img src={vendor.logo} alt="" className="w-full h-full object-cover rounded-[2.2rem]" />
                                 </div>
                                </Link>
                                 <div className="text-center">
                                    <span className="text-[10px] font-black uppercase tracking-tighter block">{vendor.name}</span>
                                    <div className="flex items-center justify-center gap-1">
                                       <Star className="w-2 h-2 fill-orange-400 text-orange-400" />
                                       <span className="text-[8px] font-bold">{vendor.rating}</span>
                                    </div>
                                 </div>
                                 <Button size="sm" className="h-7 px-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-[8px] font-black uppercase">Follow</Button>
                              </div>
                            ))}
                        </div>
                      </section>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {viewTab === 'watch' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col gap-24 py-12 max-w-lg mx-auto">
               <div className="text-center space-y-4 mb-8">
                  <h2 className="text-7xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-black to-neutral-400 dark:from-white dark:to-neutral-600">Reels.</h2>
                  <p className="text-[11px] font-black opacity-30 uppercase tracking-[0.6em]">Swipe for immersive commerce</p>
               </div>
               {feedItems.filter(f => f.type === 'product' || f.isLive).slice(0, 5).map((post) => (
                 <div key={post.id} className="relative aspect-[9/16] rounded-[4rem] overflow-hidden bg-black shadow-2xl group ring-1 ring-white/10">
                    <Image src={post.media[0].url} alt="" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[12s]" />
                    <div className="absolute right-8 bottom-48 flex flex-col gap-10 items-center">
                       <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center hover:scale-125 transition-transform group/btn">
                          <Heart className="w-8 h-8 text-white group-hover/btn:fill-red-500 transition-colors" />
                       </button>
                       <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center hover:scale-125 transition-transform"><MessageCircle className="w-8 h-8 text-white" /></button>
                       <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center hover:scale-125 transition-transform"><Share2 className="w-8 h-8 text-white" /></button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="flex items-center gap-5 mb-8">
                          <div className="w-16 h-16 rounded-3xl border-2 border-white overflow-hidden shadow-2xl">
                             <img src={VENDORS.find(v => v.id === post.authorId)?.logo} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <span className="text-lg font-black text-white uppercase tracking-widest block">{VENDORS.find(v => v.id === post.authorId)?.name}</span>
                             <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Premium Vendor</span>
                          </div>
                          <Button className="ml-auto h-10 px-8 bg-white text-black hover:bg-fuchsia-600 hover:text-white rounded-2xl text-[10px] font-black uppercase shadow-2xl">Follow</Button>
                       </div>
                       <p className="text-base text-white/90 font-medium leading-relaxed mb-10 line-clamp-3">{post.caption}</p>
                       <motion.div whileHover={{ y: -10 }} className="p-6 bg-white rounded-[3rem] flex items-center justify-between shadow-2xl cursor-pointer group/buy">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl -rotate-6 group-hover/buy:rotate-0 transition-transform"><img src={post.media[0].url} alt="" className="w-full h-full object-cover" /></div>
                             <div>
                                <span className="text-[10px] font-black uppercase opacity-30">Featured Item</span>
                                <div className="text-lg font-black tracking-tighter">Shop This Look</div>
                             </div>
                          </div>
                          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center group-hover/buy:bg-fuchsia-600 transition-colors"><ShoppingCart className="w-6 h-6 text-white" /></div>
                       </motion.div>
                    </div>
                 </div>
               ))}
            </motion.div>
          )}

          {viewTab === 'events' && (
             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-20">
                <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                   <div className="space-y-6">
                      <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-fuchsia-600">Events.</h2>
                      <p className="text-lg opacity-40 font-bold uppercase tracking-[0.5em] max-w-md">Community gatherings and exclusive launches.</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {(EVENTS as BazarEvent[]).map((evt, idx) => (
                     <div key={evt.id} className="group bg-white dark:bg-neutral-950 rounded-[4rem] overflow-hidden border border-neutral-100 dark:border-neutral-900 hover:shadow-2xl transition-all duration-700">
                        <div className="aspect-video relative overflow-hidden">
                           <Image src={evt.image} alt={evt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                           <div className="absolute top-10 left-10 flex flex-col gap-3">
                              <span className="px-6 py-2 bg-white/95 backdrop-blur rounded-2xl text-[10px] font-black uppercase text-black">{evt.category}</span>
                              <span className="px-6 py-2 bg-fuchsia-600 text-white rounded-2xl text-[10px] font-black uppercase">{evt.date}</span>
                           </div>
                        </div>
                        <div className="p-12">
                           <div className="flex justify-between items-start mb-10">
                              <div>
                                 <h3 className="text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-fuchsia-600 transition-colors">{evt.name}</h3>
                                 <p className="text-xs font-bold opacity-40 uppercase tracking-[0.2em]">{evt.location}</p>
                              </div>
                           </div>
                           <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10 line-clamp-3">
                              {evt.description || "Join us for an unforgettable experience featuring local artisans and exclusive community networking."}
                           </p>
                           <div className="flex items-center justify-between pt-10 border-t border-neutral-50 dark:border-neutral-900">
                              <Button className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] text-[11px] font-black uppercase hover:bg-fuchsia-600 hover:text-white transition-all">Get Tickets</Button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      {/* <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-black/95 dark:bg-white/95 backdrop-blur-3xl rounded-[3rem] px-10 py-5 flex items-center gap-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 dark:border-black/10">
           <button className="relative group p-2"><ShoppingCart className="w-7 h-7 text-white dark:text-black group-hover:scale-110 transition-transform" /><div className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-600 rounded-full border-2 border-black dark:border-white animate-bounce flex items-center justify-center"><span className="text-[8px] font-black text-white">3</span></div></button>
           <button className="w-18 h-18 bg-white dark:bg-black rounded-[2rem] flex items-center justify-center shadow-2xl transform -translate-y-12 hover:-translate-y-14 transition-all active:scale-90 group ring-8 ring-black/50 dark:ring-white/50"><Plus className="w-8 h-8 text-black dark:text-white group-hover:rotate-90 transition-transform" /></button>
           <button className="group p-2"><Bookmark className="w-7 h-7 text-white dark:text-black group-hover:scale-110 transition-transform" /></button>
        </motion.div>
      </div> */}

      {/* Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 sm:p-0" onClick={() => setActiveStory(null)}>
            <button className="absolute top-10 right-10 text-white/40 hover:text-white z-10"><X className="w-10 h-10" /></button>
            <div className="relative w-full max-w-lg aspect-[9/16] rounded-[4rem] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <Image src={VENDORS.find(v => v.id === activeStory)?.coverImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop'} alt="Story" fill className="object-cover" />
              <div className="absolute top-6 left-10 right-10 flex gap-2 h-1.5"><div className="flex-1 bg-white/20 rounded-full overflow-hidden"><motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} className="h-full bg-white" onAnimationComplete={() => setActiveStory(null)} /></div></div>
              <div className="absolute top-12 left-10 flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl border-2 border-white/50 overflow-hidden shadow-2xl rotate-3"><img src={VENDORS.find(v => v.id === activeStory)?.logo} alt="" /></div>
                 <div><h4 className="text-lg font-black text-white uppercase tracking-widest">{VENDORS.find(v => v.id === activeStory)?.name}</h4><span className="text-[10px] text-white/50 block font-bold uppercase">Verified Merchant</span></div>
              </div>
              <div className="absolute bottom-16 left-10 right-10 text-center"><h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">Fresh Inventory <br /> Just Landed. 📦✨</h3><Button className="w-full h-16 bg-white text-black hover:bg-fuchsia-600 hover:text-white rounded-3xl font-black uppercase text-[12px] tracking-[0.3em]">Shop Collection</Button></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
