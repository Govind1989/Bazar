"use client";

import { PRE_OWNED_PRODUCTS, PreOwnedProduct, CATEGORIES } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  MapPin, 
  Tag, 
  ShieldCheck, 
  Clock,
  ArrowUpRight,
  Camera,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const PreOwnedCard = ({ item }: { item: PreOwnedProduct }) => {
    return (
      <Card className="group bg-bazar-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500">
        <div className="relative h-40 sm:h-64 overflow-hidden">
          <Image 
            src={item.image} 
            alt={item.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-2">
            <div className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/90 dark:bg-bazar-black/90 backdrop-blur-md rounded-full border border-bazar-gray-100 dark:border-bazar-gray-900">
              <Typography variant="bodySm" className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                {item.condition}
              </Typography>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-bazar-black"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </div>

        <div className="p-3 sm:p-6">
          <div className="flex justify-between items-start mb-2 sm:mb-4 gap-2">
            <div className="min-w-0 flex-1">
              <Typography variant="titleSm" className="font-black uppercase tracking-tighter mb-0.5 sm:mb-1 text-[13px] sm:text-base truncate">
                {item.name}
              </Typography>
              <div className="flex items-center gap-1.5 sm:gap-2 opacity-40">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <Typography variant="bodySm" className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest truncate">
                  {item.location}
                </Typography>
              </div>
            </div>
            <Typography variant="titleMd" className="font-black text-bazar-black dark:text-bazar-white text-xs sm:text-lg shrink-0">
              रु {item.price.toLocaleString()}
            </Typography>
          </div>

          <Typography variant="bodySm" className="opacity-60 line-clamp-2 mb-3 sm:mb-6 text-[10px] sm:text-xs hidden sm:block">
            {item.description}
          </Typography>

          <div className="flex items-center justify-between pt-3 sm:pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
            <div className="flex items-center gap-1.5 sm:gap-2 opacity-40">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <Typography variant="bodySm" className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                2h ago
              </Typography>
            </div>
            <Button variant="ghost" className="h-7 sm:h-10 px-2 sm:px-4 rounded-lg sm:rounded-xl group/btn border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white text-[9px] sm:text-xs font-bold uppercase tracking-widest">
              Offer
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 md:px-12 bg-bazar-white dark:bg-bazar-black">
      <div className="max-w-7xl mx-auto">
        {/* C2C Hero */}
        <header className="mb-12 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 mb-4 sm:mb-6">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
              <Typography variant="bodySm" className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">
                Peer-to-Peer Trading
              </Typography>
            </div>
            <Typography variant="displayLg" className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6 leading-[0.9]">
              Turn old goods into <span className="text-purple-500">New Opportunities.</span>
            </Typography>
            <Typography variant="titleMd" className="text-sm sm:text-xl opacity-60 font-medium mb-8 sm:mb-10">
              The most trusted C2C marketplace in Nepal. Scan, chat, and trade with verified locals in your area.
            </Typography>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black group text-xs sm:text-base">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Post an Item
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl border-2 text-xs sm:text-base">
                Browse Locally
              </Button>
            </div>
          </div>

          <Card className="relative bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-black dark:border-bazar-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="w-48 h-48 sm:w-64 sm:h-64" />
             </div>
             <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-4 text-xl sm:text-2xl">
               Why trade here?
             </Typography>
             <div className="space-y-4 sm:space-y-6">
                {[
                  { title: "Verified Users", desc: "Every trader is verified via SMS and local ID checks." },
                  { title: "Escrow Support", desc: "Optional secure holding for high-value transactions." },
                  { title: "Zero Commission", desc: "We don't take a cut. 100% of the deal goes to you." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-bazar-black dark:bg-bazar-white flex items-center justify-center shrink-0">
                      <CheckCircle i={i} />
                    </div>
                    <div>
                      <Typography variant="titleSm" className="font-black uppercase tracking-tighter text-sm sm:text-base">{feature.title}</Typography>
                      <Typography variant="bodySm" className="opacity-40 text-[10px] sm:text-xs">{feature.desc}</Typography>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </header>

        {/* Filter Bar */}
        <section className="sticky top-16 z-40 bg-white/80 dark:bg-bazar-black/80 backdrop-blur-md py-4 sm:py-6 mb-8 sm:mb-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full h-12 sm:h-14 bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl sm:rounded-2xl pl-12 pr-4 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all font-medium text-sm sm:text-base"
              />
            </div>
            <Button variant="outline" className="h-12 sm:h-14 px-6 rounded-xl sm:rounded-2xl border-2 gap-2 sm:gap-3 uppercase font-bold text-[10px] sm:text-xs tracking-widest">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Filters
            </Button>
          </div>
        </section>

        {/* Categories Pills */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-6 sm:pb-8 no-scrollbar">
           {CATEGORIES.map(cat => (
             <Button 
               key={cat.id}
               variant="ghost" 
               className="shrink-0 h-8 sm:h-10 px-4 sm:px-6 rounded-full border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest"
             >
               {cat.name}
             </Button>
           ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
          {PRE_OWNED_PRODUCTS.map((item) => (
            <PreOwnedCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckCircle({ i }: { i: number }) {
  return (
    <div className="w-2 h-2 rounded-full bg-white dark:bg-bazar-black" />
  );
}
