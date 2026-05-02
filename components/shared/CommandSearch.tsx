"use client";

import { useState, useEffect, useCallback } from "react";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { PRODUCTS, VENDORS, CATEGORIES, SERVICES } from "@/data/mock";
import { Search, X, Package, Store, Layers, Calendar, ArrowRight, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  const toggleSearch = useCallback(() => setIsOpen(prev => !isOpen), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchStr = query.toLowerCase();
    
    const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchStr))
      .map(p => ({ ...p, type: 'product', icon: Package }));
      
    const filteredVendors = VENDORS.filter(v => v.name.toLowerCase().includes(searchStr))
      .map(v => ({ ...v, type: 'vendor', icon: Store }));
      
    const filteredCategories = CATEGORIES.filter(c => c.name.toLowerCase().includes(searchStr))
      .map(c => ({ ...c, type: 'category', icon: Layers }));
      
    const filteredServices = SERVICES.filter(s => s.name.toLowerCase().includes(searchStr))
      .map(s => ({ ...s, type: 'service', icon: Calendar }));

    setResults([...filteredCategories, ...filteredVendors, ...filteredProducts, ...filteredServices].slice(0, 8));
  }, [query]);

  const handleSelect = (item: any) => {
    setIsOpen(false);
    setQuery("");
    if (item.type === 'product') {
        const vendor = VENDORS.find(v => v.id === item.vendorId);
        router.push(`/${vendor?.slug}/p/${item.slug}`);
    } else if (item.type === 'vendor') {
        router.push(`/${item.slug}`);
    } else if (item.type === 'category') {
        router.push(`/${item.slug}`);
    } else if (item.type === 'service') {
        router.push(`/services/${item.slug}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-bazar-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Palette */}
      <Card className="relative w-full max-w-2xl bg-bazar-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white p-0 overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-300">
        <div className="flex items-center px-6 h-16 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
          <Search className="w-5 h-5 opacity-40 mr-4" />
          <input 
            autoFocus
            placeholder="Search for products, vendors, or services..."
            className="flex-1 bg-transparent border-none outline-none text-lg font-sans placeholder:opacity-30"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
             <kbd className="px-2 py-1 rounded bg-bazar-gray-100 dark:bg-bazar-gray-900 text-[10px] font-mono opacity-40">ESC</kbd>
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
             </Button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query === "" ? (
            <div className="p-12 text-center">
               <Typography variant="bodyMd" className="opacity-40 italic">Type something to begin searching across the ecosystem...</Typography>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2 space-y-1">
              {results.map((item, idx) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 text-left transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center group-hover:bg-bazar-black group-hover:text-white dark:group-hover:bg-bazar-white dark:group-hover:text-black transition-colors">
                    <item.icon className="w-5 h-5 opacity-60" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Typography variant="titleSm" className="font-bold">{item.name}</Typography>
                        <span className="text-[9px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded bg-bazar-gray-100 dark:bg-bazar-gray-900 opacity-40">
                           {item.type}
                        </span>
                    </div>
                    <Typography variant="bodySm" className="text-xs opacity-60 line-clamp-1">{item.description}</Typography>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-bazar-gray-400 transition-opacity">
                     <Typography variant="bodySm" className="text-[10px] font-mono">SELECT</Typography>
                     <CornerDownLeft className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
               <Typography variant="bodyMd" className="opacity-40 italic">No results found for "{query}"</Typography>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50 dark:bg-bazar-gray-950">
           <div className="flex gap-6">
              <div className="flex items-center gap-2">
                 <kbd className="px-1.5 py-0.5 rounded bg-bazar-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 text-[10px] font-mono">↑↓</kbd>
                 <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest">Navigate</Typography>
              </div>
              <div className="flex items-center gap-2">
                 <kbd className="px-1.5 py-0.5 rounded bg-bazar-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 text-[10px] font-mono">↵</kbd>
                 <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest">Select</Typography>
              </div>
           </div>
           <Typography variant="bodySm" className="text-[10px] opacity-40 font-mono">BAZAR ENGINE v1.0</Typography>
        </div>
      </Card>
    </div>
  );
}
