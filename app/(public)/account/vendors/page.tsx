"use client";

import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VENDORS, CATEGORIES } from "@/data/mock";
import { Search, Star, MessageSquare, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ExploredVendors() {
  const { followedVendors, toggleFollowVendor, setActiveConversation } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredVendors = VENDORS.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || v.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Explored Vendors</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs">Discover, follow and manage your favorite local businesses.</Typography>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40" />
              <input 
                type="text" 
                placeholder="Search vendors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-lg py-2 pl-9 pr-4 text-[10px] uppercase font-bold outline-none focus:border-bazar-black dark:focus:border-bazar-white w-full" 
              />
           </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
         <button 
           onClick={() => setSelectedCategory("all")}
           className={cn(
             "px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
             selectedCategory === "all" ? "bg-bazar-black text-bazar-white border-bazar-black dark:bg-bazar-white dark:text-bazar-black" : "border-bazar-gray-100 dark:border-bazar-gray-900"
           )}
         >
           All Categories
         </button>
         {CATEGORIES.map(cat => (
           <button 
             key={cat.id}
             onClick={() => setSelectedCategory(cat.slug)}
             className={cn(
               "px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
               selectedCategory === cat.slug ? "bg-bazar-black text-bazar-white border-bazar-black dark:bg-bazar-white dark:text-bazar-black" : "border-bazar-gray-100 dark:border-bazar-gray-900"
             )}
           >
             {cat.name}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => {
          const isFollowed = followedVendors.includes(vendor.id);
          
          return (
            <Card key={vendor.id} className="p-0 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 group hover:border-bazar-black dark:hover:border-bazar-white transition-all overflow-hidden flex flex-col h-full">
               <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-16 h-16 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 p-3 overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900">
                        <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-contain" />
                     </div>
                     <button 
                        onClick={() => toggleFollowVendor(vendor.id)}
                        className={cn(
                          "p-2 rounded-full border transition-all",
                          isFollowed ? "bg-red-500 text-white border-red-500" : "bg-transparent border-bazar-gray-100 dark:border-bazar-gray-900 hover:scale-110"
                        )}
                      >
                        <Heart className={cn("w-4 h-4", isFollowed ? "fill-current" : "")} />
                     </button>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                     <Typography variant="titleSm" className="font-black text-lg line-clamp-1 uppercase tracking-tighter">{vendor.name}</Typography>
                     <Typography variant="bodySm" className="text-xs opacity-60 line-clamp-2 leading-relaxed">{vendor.description}</Typography>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-bazar-gray-50 dark:border-bazar-gray-950 flex items-center justify-between mb-4">
                     <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Typography variant="bodySm" className="text-[10px] font-black">{vendor.rating}</Typography>
                        <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase ml-1">Rating</Typography>
                     </div>
                     <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-40">{vendor.categories[0]}</Typography>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                     <Button 
                       variant="outline" 
                       className="h-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-2"
                       onClick={() => window.location.href = `/${vendor.slug}`}
                     >
                        Visit
                     </Button>
                     <Button 
                       className="h-10 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2"
                       onClick={() => setActiveConversation(vendor.id)}
                     >
                        <MessageSquare className="w-3 h-3" />
                        Chat
                     </Button>
                  </div>
               </div>
            </Card>
          );
        })}
      </div>
      
      {filteredVendors.length === 0 && (
        <div className="py-20 text-center opacity-40">
           <Search className="w-12 h-12 mx-auto mb-4" />
           <Typography variant="titleSm" className="uppercase tracking-[0.4em]">No Vendors Found</Typography>
        </div>
      )}
    </div>
  );
}
