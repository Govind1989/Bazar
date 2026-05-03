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
        <div className="relative h-64 overflow-hidden">
          <Image 
            src={item.image} 
            alt={item.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="px-3 py-1 bg-white/90 dark:bg-bazar-black/90 backdrop-blur-md rounded-full border border-bazar-gray-100 dark:border-bazar-gray-900">
              <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">
                {item.condition}
              </Typography>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-bazar-black"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Typography variant="titleSm" className="font-black uppercase tracking-tighter mb-1">
                {item.name}
              </Typography>
              <div className="flex items-center gap-2 opacity-40">
                <MapPin className="w-3 h-3" />
                <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest">
                  {item.location}
                </Typography>
              </div>
            </div>
            <Typography variant="titleMd" className="font-black text-bazar-black dark:text-bazar-white">
              रु {item.price.toLocaleString()}
            </Typography>
          </div>

          <Typography variant="bodySm" className="opacity-60 line-clamp-2 mb-6 text-xs">
            {item.description}
          </Typography>

          <div className="flex items-center justify-between pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
            <div className="flex items-center gap-2 opacity-40">
              <Clock className="w-3 h-3" />
              <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest">
                2h ago
              </Typography>
            </div>
            <Button variant="ghost" className="h-10 px-4 rounded-xl group/btn border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white text-xs font-bold uppercase tracking-widest">
              Make Offer
              <ArrowUpRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-bazar-white dark:bg-bazar-black">
      <div className="max-w-7xl mx-auto">
        {/* C2C Hero */}
        <header className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 mb-6">
              <Tag className="w-4 h-4 text-purple-500" />
              <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Peer-to-Peer Trading
              </Typography>
            </div>
            <Typography variant="displayLg" className="font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Turn your old goods into <span className="text-purple-500">New Opportunities.</span>
            </Typography>
            <Typography variant="titleMd" className="opacity-60 font-medium mb-10">
              The most trusted C2C marketplace in Nepal. Scan, chat, and trade with verified locals in your area.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 rounded-2xl bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black group">
                <Camera className="w-5 h-5 mr-3" />
                Post an Item
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2">
                Browse Locally
              </Button>
            </div>
          </div>

          <Card className="relative bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-black dark:border-bazar-white p-8 rounded-[2rem] overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="w-64 h-64" />
             </div>
             <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-4">
               Why trade here?
             </Typography>
             <div className="space-y-6">
                {[
                  { title: "Verified Users", desc: "Every trader is verified via SMS and local ID checks." },
                  { title: "Escrow Support", desc: "Optional secure holding for high-value transactions." },
                  { title: "Zero Commission", desc: "We don't take a cut. 100% of the deal goes to you." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bazar-black dark:bg-bazar-white flex items-center justify-center shrink-0">
                      <CheckCircle i={i} />
                    </div>
                    <div>
                      <Typography variant="titleSm" className="font-black uppercase tracking-tighter">{feature.title}</Typography>
                      <Typography variant="bodySm" className="opacity-40">{feature.desc}</Typography>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </header>

        {/* Filter Bar */}
        <section className="sticky top-20 z-40 bg-white/80 dark:bg-bazar-black/80 backdrop-blur-md py-6 mb-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input 
                type="text" 
                placeholder="Search for vintage cameras, phones, furniture..."
                className="w-full h-14 bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl pl-12 pr-4 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all font-medium"
              />
            </div>
            <Button variant="outline" className="h-14 px-6 rounded-2xl border-2 gap-3 uppercase font-bold text-xs tracking-widest">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </section>

        {/* Categories Pills */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
           {CATEGORIES.map(cat => (
             <Button 
               key={cat.id}
               variant="ghost" 
               className="shrink-0 h-10 px-6 rounded-full border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white text-[10px] font-black uppercase tracking-widest"
             >
               {cat.name}
             </Button>
           ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
