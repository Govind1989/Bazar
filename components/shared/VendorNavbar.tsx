"use client";

import { Vendor } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Search, Menu, X, ChevronRight, Tags, Heart, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMSStore } from "@/store/useCMSStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "../ui/button";

interface VendorNavbarProps {
  vendor: Vendor;
}

export function VendorNavbar({ vendor }: VendorNavbarProps) {
  const savedConfigs = useCMSStore((state) => state.savedConfigs);
  const { followedVendors, toggleFollowVendor, setActiveConversation } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = savedConfigs[vendor.id] || vendor.cmsConfig;
  const categories = config?.categories?.filter(c => c.status === 'active') || [];
  const isFollowed = followedVendors.includes(vendor.id);

  return (
    <nav className="sticky top-16 z-40 w-full bg-white/90 dark:bg-bazar-black/90 backdrop-blur-md border-b border-bazar-gray-100 dark:border-bazar-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href={`/${vendor.slug}`} className="flex items-center gap-2 sm:gap-3 group">
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900 transition-transform group-hover:scale-105">
                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
             </div>
             <Typography variant="titleSm" className="font-black uppercase tracking-tighter text-[11px] sm:text-sm group-hover:text-bazar-gray-500 transition-colors truncate max-w-[100px] sm:max-w-none">
               {vendor.name}
             </Typography>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "h-8 rounded-lg text-[9px] font-black uppercase tracking-widest gap-2 border-2",
                isFollowed && "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:text-white"
              )}
              onClick={() => toggleFollowVendor(vendor.id)}
            >
              <Heart className={cn("w-3 h-3", isFollowed && "fill-current")} />
              {isFollowed ? "Following" : "Follow"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 rounded-lg text-[9px] font-black uppercase tracking-widest gap-2 border-2"
              onClick={() => setActiveConversation(vendor.id)}
            >
              <MessageSquare className="w-3 h-3" />
              Message
            </Button>
          </div>
        </div>

        {/* Center: Search - hidden on extra small mobile, compact on small */}
        <div className="hidden lg:block flex-1 max-w-sm mx-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder={`Search store...`}
              className="w-full bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl py-2 pl-10 pr-4 text-[10px] sm:text-xs font-bold outline-none focus:ring-4 ring-bazar-black/5 dark:ring-bazar-white/5 focus:bg-white dark:focus:bg-bazar-black transition-all"
            />
          </div>
        </div>

        {/* Right: Actions & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex md:hidden items-center gap-1">
             <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => toggleFollowVendor(vendor.id)}>
                <Heart className={cn("w-4 h-4", isFollowed && "fill-red-500 text-red-500")} />
             </Button>
             <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => setActiveConversation(vendor.id)}>
                <MessageSquare className="w-4 h-4" />
             </Button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex items-center gap-1.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl transition-all group",
              isMenuOpen 
                ? "bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black" 
                : "hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
            )}
          >
            <Typography variant="titleSm" className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
              {isMenuOpen ? "Close" : "Store Menu"}
            </Typography>
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
              <span className={cn(
                "w-4 sm:w-5 h-0.5 rounded-full transition-all duration-300",
                isMenuOpen ? "rotate-45 translate-y-1 sm:translate-y-1.5 bg-white dark:bg-bazar-black" : "bg-bazar-black dark:bg-bazar-white group-hover:w-3"
              )} />
              <span className={cn(
                "w-2.5 sm:w-3 h-0.5 rounded-full transition-all duration-300",
                isMenuOpen ? "opacity-0" : "bg-bazar-black dark:bg-bazar-white group-hover:w-5"
              )} />
              <span className={cn(
                "w-4 sm:w-5 h-0.5 rounded-full transition-all duration-300",
                isMenuOpen ? "-rotate-45 -translate-y-1 sm:-translate-y-1.5 bg-white dark:bg-bazar-black" : "bg-bazar-black dark:bg-bazar-white group-hover:w-4"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-[120px] sm:top-[128px] bg-bazar-black/20 backdrop-blur-md z-[50]"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-bazar-black border-b border-bazar-gray-100 dark:border-bazar-gray-900 z-[60] shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              <div className="max-w-7xl mx-auto p-6 sm:p-12">
                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
                    {categories.map((cat) => {
                      const activeSubs = cat.subCategories.filter(s => s.status === 'active');
                      return (
                        <div key={cat.id} className="space-y-4 sm:space-y-6 group/cat">
                           <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center group-hover/cat:bg-bazar-black dark:group-hover/cat:bg-bazar-white transition-colors">
                                 <Tags className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-40 group-hover/cat:opacity-100 transition-opacity", isMenuOpen && "text-inherit")} />
                              </div>
                              <Typography variant="titleSm" className="font-black uppercase tracking-[0.2em] text-[9px] sm:text-[11px] group-hover/cat:translate-x-1 transition-transform truncate">
                                {cat.name}
                              </Typography>
                           </div>
                           
                           <div className="flex flex-col gap-1 pl-9 sm:pl-11">
                              {activeSubs.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/${vendor.slug}/categories/${sub.slug}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-bazar-black dark:hover:text-bazar-white py-0.5 sm:py-1 transition-all flex items-center gap-1.5 sm:gap-2 group/sub"
                                >
                                   <span className="w-0 h-[1px] bg-bazar-black dark:bg-bazar-white group-hover/sub:w-3 transition-all" />
                                   {sub.name}
                                </Link>
                              ))}
                              {activeSubs.length === 0 && (
                                <Typography variant="bodySm" className="italic opacity-20 text-[8px] sm:text-[10px]">
                                  No sub-categories
                                </Typography>
                              )}
                           </div>
                        </div>
                      );
                    })}
                 </div>

                 {categories.length === 0 && (
                   <div className="py-12 sm:py-20 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl sm:rounded-3xl">
                      <Typography variant="bodySm" className="italic opacity-30 text-xs sm:text-sm">This store hasn't published any categories yet.</Typography>
                   </div>
                 )}
              </div>

              {/* Mega Menu Footer */}
              <div className="bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                 <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    <Typography variant="bodySm" className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">
                      Explore more from {vendor.name}
                    </Typography>
                    <div className="flex items-center gap-4 sm:gap-6">
                       <Link href={`/${vendor.slug}`} className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Home</Link>
                       <Link href={`/${vendor.slug}/deals`} className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Deals</Link>
                       <Link href={`/${vendor.slug}/about`} className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">About</Link>
                    </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
