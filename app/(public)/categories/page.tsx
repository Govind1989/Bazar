"use client";

import { CATEGORIES, Category } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import { 
  Heart, 
  ChevronRight, 
  Utensils, 
  Shirt, 
  Zap, 
  TreePine, 
  Armchair, 
  Monitor, 
  Smartphone,
  Calendar,
  MapPin,
  Clock,
  Search,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import Link from "next/link";

const ICON_MAP: Record<string, any> = {
  Utensils,
  Shirt,
  Zap,
  TreePine,
  Armchair,
  Monitor,
  Smartphone,
  Calendar,
  MapPin,
  Clock
};

export default function CategoriesPage() {
  const { 
    favoriteCategories, 
    toggleFavoriteCategory,
    favoriteSubCategories,
    toggleFavoriteSubCategory 
  } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CATEGORIES;
    const query = searchQuery.toLowerCase();
    
    return CATEGORIES.filter(cat => {
      const matchName = cat.name.toLowerCase().includes(query);
      const matchDesc = cat.description.toLowerCase().includes(query);
      const matchSub = cat.subCategories?.some(sub => sub.name.toLowerCase().includes(query));
      return matchName || matchDesc || matchSub;
    });
  }, [searchQuery]);

  const favoritedSubCats = useMemo(() => {
    const subs: { catName: string, sub: { id: string, name: string, slug: string } }[] = [];
    CATEGORIES.forEach(cat => {
      cat.subCategories?.forEach(sub => {
        if (favoriteSubCategories.includes(sub.id)) {
          subs.push({ catName: cat.name, sub });
        }
      });
    });
    return subs;
  }, [favoriteSubCategories]);

  const CategoryCard = ({ category }: { category: Category }) => {
    const Icon = ICON_MAP[category.icon] || Utensils;
    const isFavorite = favoriteCategories.includes(category.id);

    return (
      <Card className="group relative bg-bazar-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 p-6 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center border border-bazar-gray-100 dark:border-bazar-gray-900 group-hover:bg-bazar-black dark:group-hover:bg-bazar-white transition-colors duration-300">
            <Icon className="w-5 h-5 group-hover:text-bazar-white dark:group-hover:text-bazar-black transition-colors" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavoriteCategory(category.id)}
            className={cn(
              "w-8 h-8 rounded-full border border-transparent transition-all",
              isFavorite ? "text-red-500 bg-red-50 dark:bg-red-950/20" : "opacity-20 hover:opacity-100 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
            )}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </Button>
        </div>

        <Typography variant="titleMd" className="font-black uppercase tracking-tighter mb-1">
          {category.name}
        </Typography>
        <Typography variant="bodySm" className="opacity-60 mb-6 line-clamp-1 text-[11px]">
          {category.description}
        </Typography>

        {category.subCategories && category.subCategories.length > 0 && (
          <div className="space-y-1 mb-6">
            <Typography variant="bodySm" className="font-bold uppercase tracking-widest text-[9px] opacity-40 mb-2">
              Sub-categories
            </Typography>
            <div className="grid grid-cols-1 gap-1.5">
              {category.subCategories.slice(0, 4).map((sub) => {
                const isSubFav = favoriteSubCategories.includes(sub.id);
                return (
                  <div 
                    key={sub.id}
                    className="group/sub flex items-center justify-between p-2 rounded-lg bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-bazar-black dark:bg-bazar-white opacity-20" />
                      <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-wider opacity-70 group-hover/sub:opacity-100">
                        {sub.name}
                      </Typography>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteSubCategory(sub.id, category.id);
                      }}
                      className={cn(
                        "opacity-0 group-hover/sub:opacity-100 transition-all p-1",
                        isSubFav ? "opacity-100 text-red-500" : "opacity-40 hover:text-red-500"
                      )}
                    >
                      <Heart className={cn("w-3 h-3", isSubFav && "fill-current")} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Link href={`/${category.slug}`}>
          <Button 
            variant="ghost" 
            className="w-full group/btn justify-between border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white h-10 rounded-xl text-[10px] uppercase font-bold tracking-widest"
          >
            Explore
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-bazar-white dark:bg-bazar-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center max-w-2xl mx-auto">
          <Typography variant="displayLg" className="font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            The Catalog
          </Typography>
          <Typography variant="titleMd" className="opacity-60 font-medium">
            Discover the heart of the marketplace through our curated collections. From artisanal crafts to modern tech.
          </Typography>
        </header>

        {/* Favorite Sub-Categories Section */}
        {favoritedSubCats.length > 0 && (
          <section className="mb-24">
             <div className="flex items-center gap-4 mb-10">
               <Heart className="w-6 h-6 text-red-500 fill-current" />
               <Typography variant="titleLg" className="font-black uppercase tracking-tighter">
                 Favorite Sub-Collections
               </Typography>
               <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
             </div>
             <div className="flex flex-wrap gap-4">
               {favoritedSubCats.map(({ catName, sub }) => (
                 <Link key={sub.id} href={`/categories/${sub.slug}`}>
                    <div className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-transparent hover:border-bazar-black dark:hover:border-bazar-white transition-all">
                      <div>
                        <Typography variant="bodySm" className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mb-0.5">
                          {catName}
                        </Typography>
                        <Typography variant="titleSm" className="font-black uppercase tracking-tighter">
                          {sub.name}
                        </Typography>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-bazar-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                 </Link>
               ))}
             </div>
          </section>
        )}

        {/* Search Bar */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <Typography variant="titleLg" className="font-black uppercase tracking-tighter">
              All Collections
            </Typography>
            <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
          </div>

          <div className="relative max-w-full mx-auto group">
            <div className="absolute inset-0 bg-bazar-black/[0.02] dark:bg-white/[0.02] rounded-[2rem] -m-4 blur-xl group-focus-within:bg-purple-500/[0.05] transition-all duration-500" />
            <div className="relative flex items-center bg-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white rounded-[2rem] overflow-hidden ">
              <div className="pl-8 pr-4">
                <Search className="w-6 h-6 opacity-20" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections, organic foods, luxury electronics..."
                className="flex-1 h-20 bg-transparent outline-none font-medium text-lg placeholder:opacity-20"
              />
              {/* <div className="pr-4">
                <Button className="h-12 px-8 rounded-2xl bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black font-black uppercase tracking-widest">
                  Find
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Main Categories Grid */}
        <section>
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <Typography variant="titleLg" className="font-black opacity-10 uppercase tracking-tighter mb-4">No collections found</Typography>
              <Button variant="ghost" onClick={() => setSearchQuery("")} className="uppercase tracking-widest text-[10px] font-bold">Clear Search</Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
