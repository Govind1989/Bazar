"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PRODUCTS,
  VENDORS,
  CATEGORIES,
  SERVICES,
  EVENTS,
  TESTIMONIALS,
} from "@/data/mock";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Calendar,
  Star,
  TrendingDown,
  Clock,
  MapPin,
  Utensils,
  Shirt,
  Zap,
  TreePine,
  BadgePercent,
  Sparkles,
  CheckCircle2,
  Armchair,
  Monitor,
  Smartphone,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Countdown Timer (client-only to avoid hydration mismatch)          */
/* ------------------------------------------------------------------ */
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ h: 0, m: 0, s: 0 });
        return;
      }
      setTime({
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;
  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1">
      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold">
        {fmt(time.h)}
      </div>
      <span className="text-neutral-900 dark:text-white font-bold">:</span>
      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold">
        {fmt(time.m)}
      </div>
      <span className="text-neutral-900 dark:text-white font-bold">:</span>
      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold">
        {fmt(time.s)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Type helpers                                                       */
/* ------------------------------------------------------------------ */
type TabType = "products" | "services";

interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */
const PRODUCT_CATEGORIES: CategoryMeta[] = CATEGORIES.map((c) => ({
  ...c,
  icon:
    c.icon === "Utensils" ? (
      <Utensils className="w-4 h-4" />
    ) : c.icon === "Shirt" ? (
      <Shirt className="w-4 h-4" />
    ) : c.icon === "Zap" ? (
      <Zap className="w-4 h-4" />
    ) : c.icon === "TreePine" ? (
      <TreePine className="w-4 h-4" />
    ) : c.icon === "Armchair" ? (
      <Armchair className="w-4 h-4" />
    ) : c.icon === "Monitor" ? (
      <Monitor className="w-4 h-4" />
    ) : c.icon === "Smartphone" ? (
      <Smartphone className="w-4 h-4" />
    ) : (
      <ShoppingBag className="w-4 h-4" />
    ),
}));

const SERVICE_CATEGORIES: CategoryMeta[] = [
  {
    id: "appointment",
    name: "Appointments",
    slug: "appointment",
    icon: <Calendar className="w-4 h-4" />,
    description: "Book expert consultations",
  },
  {
    id: "holiday",
    name: "Holidays",
    slug: "holiday",
    icon: <MapPin className="w-4 h-4" />,
    description: "Guided tours & treks",
  },
  {
    id: "booking",
    name: "Services",
    slug: "service",
    icon: <Clock className="w-4 h-4" />,
    description: "Home & professional services",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function MarketplaceHome() {
  const [activeTab, setActiveTab] = useState<TabType>("products");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAll = selectedCategories.length === 0;

  const flashSaleEnd = useMemo(
    () => new Date(Date.now() + 4 * 60 * 60 * 1000 + 45 * 60 * 1000),
    []
  );

  const currentCategories =
    activeTab === "products" ? PRODUCT_CATEGORIES : SERVICE_CATEGORIES;

  const featuredProducts = useMemo(
    () => {
      const selectedSlugs = currentCategories.filter(c => selectedCategories.includes(c.id)).map(c => c.slug);
      return isAll ? PRODUCTS.slice(0, 6) : PRODUCTS.filter((p) => selectedSlugs.includes(p.category)).slice(0, 6);
    },
    [selectedCategories, isAll, currentCategories]
  );

  const flashSaleProducts = useMemo(
    () => {
      const selectedSlugs = currentCategories.filter(c => selectedCategories.includes(c.id)).map(c => c.slug);
      const filtered = PRODUCTS.filter((p: any) => p.compareAtPrice && p.compareAtPrice > p.price);
      return isAll 
        ? filtered.slice(0, 4)
        : filtered.filter((p: any) => selectedSlugs.includes(p.category)).slice(0, 4);
    },
    [selectedCategories, isAll, currentCategories]
  );

  const featuredServices = useMemo(
    () => {
      // Map category ID to the category slug defined in the Service interface
      const selectedSlugs = currentCategories
        .filter(c => selectedCategories.includes(c.id))
        .map(c => c.slug);
        
      return isAll 
        ? SERVICES 
        : SERVICES.filter((s: any) => selectedSlugs.includes(s.category));
    },
    [selectedCategories, isAll, currentCategories]
  );

  const trustedVendors = useMemo(
    () => {
      const selectedSlugs = currentCategories
        .filter(c => selectedCategories.includes(c.id))
        .map(c => c.slug);
      
      // Filter logic: if tab is 'services', consider vendors that provide services.
      // Assuming a simplistic check; in a production app this would query by service provider.
      const vendorsByTab = activeTab === 'products' 
        ? VENDORS 
        : VENDORS.filter(v => SERVICES.some(s => s.vendorId === v.id));
        
      return isAll 
        ? vendorsByTab 
        : vendorsByTab.filter(v => v.categories.some(catSlug => selectedSlugs.includes(catSlug)));
    },
    [selectedCategories, isAll, currentCategories, activeTab]
  );

  const toggleCategory = (id: string) => {
    if (id === 'all') {
        setSelectedCategories([]);
        return;
    }
    setSelectedCategories(prev => 
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedCategories([]);
  };

  const discount = (price: number, compare?: number) =>
    compare ? Math.round(((compare - price) / compare) * 100) : 0;

  const activeCategoryNames = isAll ? "All Categories" : currentCategories.filter(c => selectedCategories.includes(c.id)).map(c => c.name).join(", ");
  const activeCategoryDesc = isAll ? "Explore our entire marketplace" : "Browsing: " + activeCategoryNames;

  return (
    <div className="pt-20">
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="px-6 md:px-12 pt-12 sm:pt-16 pb-16 sm:pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Nepal&apos;s Unified Marketplace
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-white tracking-tight leading-[1.05] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              The better way to{" "}
              <span className="text-neutral-500 dark:text-neutral-400">trade</span> in Nepal.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-xl mb-10 leading-relaxed"
            >
              A unified ecosystem for multi-category vendors. Launch your store
              in minutes with AI-scaffolding and reach customers across the
              country.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-12 px-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg font-semibold text-sm"
              >
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 rounded-lg font-semibold text-sm border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                Browse Marketplace
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-neutral-500 dark:text-neutral-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Free to list</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Nationwide delivery</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Card className="relative p-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                  alt="Marketplace Hero"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Card className="p-5 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl">
                    <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1 font-medium">
                      Featured Store
                    </p>
                    <p className="text-lg font-semibold tracking-tight">
                      Himalayan Artisan
                    </p>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  STICKY CATEGORY SELECTOR                                     */}
      
      <section className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center gap-3 sm:gap-6 py-3 sm:py-4">
            {/* Products / Services pill */}
            <div className="flex items-center gap-2 sm:gap-3 bg-neutral-100 dark:bg-neutral-900 rounded-full p-1 shrink-0">
              <button
                onClick={() => handleTabChange("products")}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "products"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
              >
                Products
              </button>
              <button
                onClick={() => handleTabChange("services")}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "services"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
              >
                Services
              </button>
            </div>

            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

            {/* Scrollable category pills */}
            <div className="relative flex-1 overflow-hidden">
              <div
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto py-1 touch-pan-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <button
                    onClick={() => toggleCategory("all")}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${isAll
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white"
                      }`}
                  >
                    <span>All</span>
                </button>
                {currentCategories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${isSelected
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white"
                        }`}
                    >
                      {cat.icon}
                      <span className="hidden sm:inline">{cat.name}</span>
                      <span className="sm:hidden">{cat.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scroll arrows (desktop only) */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
              <button
                onClick={() => scroll("left")}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  DYNAMIC SHOWCASE                                             */}
      
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedCategories.join('-')}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {activeCategoryNames}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                  {activeCategoryDesc}
                </p>
              </div>
              {!isAll && selectedCategories.length === 1 && (
                <Link
                  href={`/${currentCategories.find(c => c.id === selectedCategories[0])?.slug || '#'}`}
                  className="hidden md:flex items-center gap-1 text-sm font-semibold text-neutral-900 dark:text-white hover:underline underline-offset-4"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* PRODUCTS GRID */}
            {activeTab === "products" && (
              <>
                {featuredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {featuredProducts.map((product, idx) => {
                      const vendor = VENDORS.find(
                        (v) => v.id === product.vendorId
                      );
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.06 }}
                        >
                          <Card className="group cursor-pointer border-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-black">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              {product.compareAtPrice &&
                                product.compareAtPrice > product.price && (
                                  <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-bold uppercase tracking-wider">
                                      <TrendingDown className="w-3 h-3" />
                                      {discount(
                                        product.price,
                                        product.compareAtPrice
                                      )}
                                      % Off
                                    </span>
                                  </div>
                                )}
                            </div>
                            <div className="p-5">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-neutral-900 dark:text-white text-base leading-snug mb-1 truncate">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium truncate">
                                    {vendor?.name}
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="font-semibold text-neutral-900 dark:text-white">
                                    NPR {product.price.toLocaleString()}
                                  </p>
                                  {product.compareAtPrice && (
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-through">
                                      NPR {product.compareAtPrice.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-24 text-center bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    <ShoppingBag className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                      No featured products in this category yet.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* SERVICES GRID */}
            {activeTab === "services" && (
              <>
                {featuredServices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {featuredServices.map((service: any, idx: number) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                      >
                        <Card className="group cursor-pointer border-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                          <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-black">
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-neutral-900 text-[11px] font-bold uppercase tracking-wider border border-neutral-200">
                                <Calendar className="w-3 h-3" />
                                {Math.floor(service.duration / 60)} min
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-white text-base leading-snug mb-1 truncate">
                                  {service.name}
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium truncate">
                                  {service.providerName}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-semibold text-neutral-900 dark:text-white">
                                  NPR {service.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-3">
                              <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                                {service.rating}
                              </span>
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                · {service.category}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    <Calendar className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                      No featured services in this category yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ============================================================= */}
      {/*  FLASH SALE (Products Only)                                   */}
      
      {activeTab === 'products' && flashSaleProducts.length > 0 && (
        <section className="bg-neutral-50 dark:bg-neutral-950 py-16 sm:py-20 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Flash Sale
                </h2>
                <span className="hidden md:inline text-sm text-neutral-500 dark:text-neutral-400">
                  Limited quantities available
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Ends in
                </span>
                <CountdownTimer targetDate={flashSaleEnd} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {flashSaleProducts.map((product: any) => {
                const vendor = VENDORS.find((v) => v.id === product.vendorId);
                return (
                  <Card
                    key={product.id}
                    className="group cursor-pointer bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-900 dark:hover:border-white transition-colors duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider">
                          {discount(product.price, product.compareAtPrice)}% OFF
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium mb-1 truncate">
                        {vendor?.name}
                      </p>
                      <h3 className="font-semibold text-neutral-900 dark:text-white text-sm mb-3 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 dark:text-white">
                          NPR {product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-600 line-through">
                          NPR {product.compareAtPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  SALES & OFFERS (Products Only)                               */}
      
      {activeTab === 'products' && flashSaleProducts.length > 0 && (
        <section className="bg-white dark:bg-black py-16 sm:py-20 px-4 sm:px-6 md:px-12 border-y border-neutral-100 dark:border-neutral-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center">
                  <BadgePercent className="w-5 h-5 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h2
                    className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Sales & Offers
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Limited-time deals from our vendors
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="hidden md:flex rounded-lg border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                View all deals
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {flashSaleProducts.map((product: any) => {
                const vendor = VENDORS.find((v) => v.id === product.vendorId);
                return (
                  <Card
                    key={`offer-${product.id}`}
                    className="group cursor-pointer bg-neutral-100 dark:bg-neutral-900 border-0 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white dark:bg-black">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider">
                          {discount(product.price, product.compareAtPrice)}% OFF
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium mb-1 truncate">
                        {vendor?.name}
                      </p>
                      <h3 className="font-semibold text-neutral-900 dark:text-white text-sm mb-3 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 dark:text-white">
                          NPR {product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-600 line-through">
                          NPR {product.compareAtPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  SERVICES HUB                                                 */}
      
      {activeTab === 'services' && (
        <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                Expert services at your doorstep.
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg max-w-xl">
                From home repairs to professional consultations, find the right
                expert for your needs.
              </p>
            </div>
            <Link href="/services">
              <Button className="h-11 px-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg font-semibold text-sm w-full sm:w-auto">
                Explore Services Hub
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service: any, idx: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <Card className="group cursor-pointer border-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-black">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-neutral-900 text-[11px] font-bold uppercase tracking-wider border border-neutral-200">
                        <Calendar className="w-3 h-3" />
                        {Math.floor(service.duration / 60)} min
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-base leading-snug mb-1 truncate">
                          {service.name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium truncate">
                          {service.providerName}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          NPR {service.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                        {service.rating}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        · {service.category}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  EVENTS SHOWCASE (Products Only)                               */}
      
      {activeTab === 'products' && EVENTS.length > 0 && (
        <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-100 dark:border-neutral-900">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white dark:text-neutral-900" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
              Upcoming Events
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map((evt: any) => (
              <Card key={evt.id} className="overflow-hidden border-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl group cursor-pointer">
                <div className="aspect-video relative overflow-hidden">
                  <Image src={evt.image} alt={evt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">{evt.name}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{evt.date} · {evt.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  TOP VENDORS                                                  */}
      
      <section className="bg-neutral-50 dark:bg-neutral-950 py-16 sm:py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-10"
            style={{ letterSpacing: "-0.02em" }}
          >
            Trusted Vendors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trustedVendors.map((vendor) => (
              <Link key={vendor.id} href={`/${vendor.slug}`}>
                <Card className="p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-900 dark:hover:border-white transition-colors cursor-pointer group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative shrink-0">
                      <Image
                        src={vendor.logo}
                        alt={vendor.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors truncate">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {vendor.rating}
                        </span>
                        <span>· {vendor.categories.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {vendor.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TESTIMONIALS                                                 */}
      
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Loved by the community.
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
            See what buyers and sellers are saying about Bazar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.id}
              className="p-6 sm:p-8 bg-neutral-100 dark:bg-neutral-900 border-0 rounded-xl text-left"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {t.author}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FINAL CTA                                                    */}
      
      <section className="px-4 sm:px-6 md:px-12 pb-20 sm:pb-24 max-w-7xl mx-auto">
        <Card className="relative overflow-hidden rounded-2xl bg-neutral-900 dark:bg-black text-white p-10 sm:p-12 md:p-20 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Ready to grow your business?
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 dark:text-neutral-500 mb-10 leading-relaxed">
              Join hundreds of vendors who have already scaled their operations
              using our platform. Automated SEO, high-speed hosting, and
              AI-driven content included.
            </p>
            <Button className="h-12 px-8 bg-white text-neutral-900 hover:bg-neutral-200 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-lg font-semibold text-sm w-full sm:w-auto">
              Create your store now
            </Button>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </Card>
      </section>

    </div>
  );
}