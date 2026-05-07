"use client";

import { Vendor } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMSStore } from "@/store/useCMSStore";

interface VendorNavbarProps {
  vendor: Vendor;
}

export function VendorNavbar({ vendor }: VendorNavbarProps) {
  const getVendorConfig = useCMSStore((state) => state.getVendorConfig);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = getVendorConfig(vendor.id);
  const categories = config?.categories?.filter(c => c.status === 'active') || [];

  return (
    <nav className="sticky top-16 z-40 w-full bg-white/90 dark:bg-bazar-black/90 backdrop-blur-md border-b border-bazar-gray-100 dark:border-bazar-gray-900">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Vendor Logo/Name */}
        <div className="flex items-center gap-4">
          <Link href={`/${vendor.slug}`} className="flex items-center gap-2 group">
             <div className="w-8 h-8 rounded-lg overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900">
                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
             </div>
             <Typography variant="titleSm" className="font-black uppercase tracking-tighter group-hover:text-bazar-gray-500 transition-colors">
               {vendor.name}
             </Typography>
          </Link>
        </div>

        {/* Desktop Vendor Categories */}
        <div className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="relative group"
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="flex items-center gap-1 py-4 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                {cat.name}
                {cat.subCategories.length > 0 && <ChevronDown className="w-3 h-3" />}
              </button>

              <AnimatePresence>
                {activeCategory === cat.id && cat.subCategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="w-48 bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl shadow-xl overflow-hidden p-2">
                      {cat.subCategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/${vendor.slug}/categories/${sub.slug}`}
                          className="block px-4 py-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 rounded-lg transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Vendor Search & Tools */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
            <input 
              type="text" 
              placeholder={`Search in ${vendor.name}...`}
              className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-full py-1.5 pl-10 pr-4 text-[10px] font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white w-48 transition-all"
            />
          </div>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden bg-white dark:bg-bazar-black"
          >
            <div className="p-6 space-y-6">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <Typography variant="bodySm" className="font-black uppercase tracking-widest text-bazar-gray-400">
                    {cat.name}
                  </Typography>
                  <div className="grid grid-cols-2 gap-2">
                    {cat.subCategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/${vendor.slug}/categories/${sub.slug}`}
                        className="p-2 rounded-lg bg-bazar-gray-50 dark:bg-bazar-gray-950 text-[10px] font-bold uppercase tracking-widest"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
