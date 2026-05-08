"use client";

import { VENDORS, Vendor, CATEGORIES } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthModal } from "@/components/shared/AuthModal";
import { 
  Star, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Plus,
  Search,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VendorsPage() {
  const { followedVendors, toggleFollowVendor, setActiveConversation } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const vendorCategories = useMemo(() => {
    const cats = new Set<string>();
    VENDORS.forEach(v => v.categories.forEach(c => cats.add(c)));
    return Array.from(cats);
  }, []);

  const filteredVendors = useMemo(() => {
    return VENDORS.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || vendor.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleMessageVendor = (vendorId: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setActiveConversation(vendorId);
    }
  };

    return (
      <Card className="group overflow-hidden bg-bazar-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-500 flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-bazar-gray-100 dark:bg-bazar-gray-900">
          {vendor.coverImage ? (
            <Image 
              src={vendor.coverImage} 
              alt={vendor.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Typography variant="displaySm" className="opacity-10 text-xs sm:text-base">{vendor.name}</Typography>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bazar-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Follow Button Overlay */}
          <Button
            onClick={() => toggleFollowVendor(vendor.id)}
            className={cn(
              "absolute top-2 right-2 sm:top-4 sm:right-4 h-8 sm:h-10 px-3 sm:px-4 rounded-full border-2 transition-all duration-300",
              isFollowed 
                ? "bg-bazar-white text-bazar-black border-bazar-white" 
                : "bg-bazar-black/20 backdrop-blur-md text-bazar-white border-bazar-white/20 hover:bg-bazar-white hover:text-bazar-black hover:border-bazar-white"
            )}
          >
            {isFollowed ? (
              <span className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Following</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Follow</span>
              </span>
            )}
          </Button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-8 flex-1 flex flex-col">
          <div className="flex gap-2 sm:gap-4 items-start mb-3 sm:mb-6">
            <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-bazar-white dark:border-bazar-black shadow-xl -mt-8 sm:-mt-16 z-10 bg-bazar-white">
              <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <Typography variant="titleLg" className="font-black uppercase tracking-tighter leading-none mb-1 text-sm sm:text-2xl truncate">
                {vendor.name}
              </Typography>
              <div className="flex items-center gap-1 sm:gap-2 opacity-40">
                <Star className="w-2.5 h-2.5 sm:w-3 h-3 fill-yellow-400 text-yellow-400" />
                <Typography variant="bodySm" className="text-[9px] sm:text-[11px] font-bold">
                  {vendor.rating} <span className="hidden sm:inline">• {vendor.reviewsCount || 0} Reviews</span>
                </Typography>
              </div>
            </div>
          </div>

          <Typography variant="bodySm" className="opacity-60 mb-4 sm:mb-8 line-clamp-2 sm:line-clamp-3 flex-1 text-[11px] sm:text-sm hidden sm:block">
            {vendor.description}
          </Typography>

          {/* Categories Tags - hidden on mobile for extra compactness */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-8">
            {vendor.categories.map((cat) => (
              <div 
                key={cat} 
                className="px-3 py-1 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900"
              >
                <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  {cat}
                </Typography>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-auto">
            <Link href={`/${vendor.slug}`} className="w-full">
              <Button 
                variant="outline" 
                className="w-full h-9 sm:h-12 rounded-lg sm:rounded-xl group/link border-2 text-[10px] sm:text-sm font-bold uppercase tracking-wider"
              >
                Explore
              </Button>
            </Link>
            <Button 
              className="w-full h-9 sm:h-12 rounded-lg sm:rounded-xl group/cta gap-1 sm:gap-2 text-[10px] sm:text-sm font-bold uppercase tracking-wider"
              onClick={() => handleMessageVendor(vendor.id)}
            >
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              Message
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  // Priority to followed vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    const aFollowed = followedVendors.includes(a.id);
    const bFollowed = followedVendors.includes(b.id);
    if (aFollowed && !bFollowed) return -1;
    if (!aFollowed && bFollowed) return 1;
    return 0;
  });

  return (
    <>
    <div className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 md:px-12 bg-bazar-white dark:bg-bazar-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 sm:mb-20">
          <div className="max-w-2xl">
            <Typography variant="displayLg" className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6 leading-[0.9]">
              Certified Partners
            </Typography>
            <Typography variant="titleMd" className="text-sm sm:text-xl opacity-60 font-medium">
              Meet the creators, artisans, and retailers driving the Bazar economy. Follow your favorites to stay updated with their latest drops.
            </Typography>
          </div>
        </header>

        {/* Search and Filters */}
        <section className="mb-10 sm:mb-16 space-y-6 sm:space-y-10">
           <div className="relative max-w-full group">
              <div className="absolute inset-0 bg-bazar-black/[0.02] dark:bg-white/[0.02] rounded-3xl -m-2 blur-lg group-focus-within:bg-purple-500/[0.05] transition-all" />
              <div className="relative flex items-center bg-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                <div className="pl-4 sm:pl-6 pr-2 sm:pr-4">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 opacity-20" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vendors..."
                  className="flex-1 h-12 sm:h-16 bg-transparent outline-none font-medium text-sm sm:text-lg placeholder:opacity-20"
                />
              </div>
           </div>

           <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Typography variant="bodySm" className="font-bold uppercase tracking-widest text-[9px] sm:text-[10px] opacity-40 mr-2 sm:mr-4">Filter By Category:</Typography>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  value="all" 
                  checked={selectedCategory === "all"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="hidden"
                />
                <div className={cn(
                  "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border-2 transition-all uppercase text-[9px] sm:text-[10px] font-black tracking-widest",
                  selectedCategory === "all" 
                    ? "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black border-bazar-black dark:border-bazar-white shadow-lg scale-105" 
                    : "border-bazar-gray-100 dark:border-bazar-gray-900 opacity-40 hover:opacity-100 hover:border-bazar-black dark:hover:border-bazar-white"
                )}>
                  All
                </div>
              </label>

              {vendorCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat} 
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="hidden"
                  />
                  <div className={cn(
                    "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border-2 transition-all uppercase text-[9px] sm:text-[10px] font-black tracking-widest",
                    selectedCategory === cat 
                      ? "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black border-bazar-black dark:border-bazar-white shadow-lg scale-105" 
                      : "border-bazar-gray-100 dark:border-bazar-gray-900 opacity-40 hover:opacity-100 hover:border-bazar-black dark:hover:border-bazar-white"
                  )}>
                    {cat}
                  </div>
                </label>
              ))}
           </div>
        </section>

        {/* Vendors Grid */}
        {sortedVendors.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
            {sortedVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
             <Typography variant="titleLg" className="font-black opacity-10 uppercase tracking-tighter mb-4">No partners found</Typography>
             <Button variant="ghost" onClick={() => {setSearchQuery(""); setSelectedCategory("all");}} className="uppercase tracking-widest text-[10px] font-bold">Reset Filters</Button>
          </div>
        )}
      </div>
    </div>

    <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
