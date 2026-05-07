"use client";

import { Vendor } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Search, Menu, X, ChevronRight, Tags } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMSStore } from "@/store/useCMSStore";
import { Button } from "../ui/button";

interface VendorNavbarProps {
  vendor: Vendor;
}

export function VendorNavbar({ vendor }: VendorNavbarProps) {
  const savedConfigs = useCMSStore((state) => state.savedConfigs);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = savedConfigs[vendor.id] || vendor.cmsConfig;
  const categories = config?.categories?.filter(c => c.status === 'active') || [];

  return (
    <nav className="sticky top-16 z-40 w-full bg-white/90 dark:bg-bazar-black/90 backdrop-blur-md border-b border-bazar-gray-100 dark:border-bazar-gray-900">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <Link href={`/${vendor.slug}`} className="flex items-center gap-3 group">
             <div className="w-10 h-10 rounded-xl overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900 transition-transform group-hover:scale-105">
                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
             </div>
             <Typography variant="titleSm" className="font-black uppercase tracking-tighter text-sm group-hover:text-bazar-gray-500 transition-colors">
               {vendor.name}
             </Typography>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder={`Search ${vendor.name}...`}
              className="w-full bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl py-2.5 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 ring-bazar-black/5 dark:ring-bazar-white/5 focus:bg-white dark:focus:bg-bazar-black transition-all"
            />
          </div>
        </div>

        {/* Right: Hamburger Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-2xl transition-all group",
              isMenuOpen 
                ? "bg-bazar-black text-white dark:bg-bazar-white dark:text-bazar-black" 
                : "hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
            )}

          >
            <Typography variant="titleSm" className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
              {isMenuOpen ? "Close" : ""}
            </Typography>
            <div className="w-6 h-6 flex flex-col items-center justify-center gap-1">
              <span className={cn(
                "w-5 h-0.5 rounded-full transition-all duration-300",
                isMenuOpen ? "rotate-45 translate-y-1.5 bg-white dark:bg-bazar-black" : "bg-bazar-black dark:bg-bazar-white group-hover:w-3"
              )} />
              <span className={cn(
                "w-3 h-0.5 rounded-full transition-all duration-300",
                isMenuOpen ? "opacity-0" : "bg-bazar-black dark:bg-bazar-white group-hover:w-5"
              )} />
              <span className={cn(
                "w-5 h-0.5 rounded-full transition-all duration-300",
                isMenuOpen ? "-rotate-45 -translate-y-1.5 bg-white dark:bg-bazar-black" : "bg-bazar-black dark:bg-bazar-white group-hover:w-4"
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
              className="fixed inset-0 top-[128px] bg-bazar-black/20 backdrop-blur-md z-[50]"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-bazar-black border-b border-bazar-gray-100 dark:border-bazar-gray-900 z-[60] shadow-2xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto p-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {categories.map((cat) => {
                      const activeSubs = cat.subCategories.filter(s => s.status === 'active');
                      return (
                        <div key={cat.id} className="space-y-6 group/cat">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center group-hover/cat:bg-bazar-black dark:group-hover/cat:bg-bazar-white transition-colors">
                                 <Tags className={cn("w-4 h-4 opacity-40 group-hover/cat:opacity-100 transition-opacity", isMenuOpen && "text-inherit")} />
                              </div>
                              <Typography variant="titleSm" className="font-black uppercase tracking-[0.2em] text-[11px] group-hover/cat:translate-x-1 transition-transform">
                                {cat.name}
                              </Typography>
                           </div>
                           
                           <div className="flex flex-col gap-1 pl-11">
                              {activeSubs.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/${vendor.slug}/categories/${sub.slug}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-bazar-black dark:hover:text-bazar-white py-1 transition-all flex items-center gap-2 group/sub"
                                >
                                   <span className="w-0 h-[1px] bg-bazar-black dark:bg-bazar-white group-hover/sub:w-3 transition-all" />
                                   {sub.name}
                                </Link>
                              ))}
                              {activeSubs.length === 0 && (
                                <Typography variant="bodySm" className="italic opacity-20 text-[10px]">
                                  No sub-categories
                                </Typography>
                              )}
                           </div>
                        </div>
                      );
                    })}
                 </div>

                 {categories.length === 0 && (
                   <div className="py-20 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-3xl">
                      <Typography variant="bodySm" className="italic opacity-30 text-sm">This store hasn't published any categories yet.</Typography>
                   </div>
                 )}
              </div>

              {/* Mega Menu Footer */}
              <div className="bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                 <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
                    <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Explore more from {vendor.name}
                    </Typography>
                    <div className="flex items-center gap-6">
                       <Link href={`/${vendor.slug}`} className="text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Storefront Home</Link>
                       <Link href={`/${vendor.slug}/deals`} className="text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Special Deals</Link>
                       <Link href={`/${vendor.slug}/about`} className="text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">About Us</Link>
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
