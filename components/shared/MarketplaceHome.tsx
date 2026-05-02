"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PRODUCTS,
  VENDORS,
  CATEGORIES,
  SERVICES,
  TESTIMONIALS,
} from "@/data/mock";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
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
    slug: "appointments",
    icon: <Calendar className="w-4 h-4" />,
    description: "Book expert consultations",
  },
  {
    id: "holiday",
    name: "Holidays",
    slug: "holidays",
    icon: <MapPin className="w-4 h-4" />,
    description: "Guided tours & treks",
  },
  {
    id: "booking",
    name: "Services",
    slug: "services",
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
  const [activeCategory, setActiveCategory] = useState<string>("foods");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategories =
    activeTab === "products" ? PRODUCT_CATEGORIES : SERVICE_CATEGORIES;

  const featuredProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === activeCategory).slice(0, 6),
    [activeCategory]
  );

  const featuredServices = useMemo(
    () => SERVICES.filter((s) => s.category === activeCategory).slice(0, 6),
    [activeCategory]
  );

  const saleProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => p.compareAtPrice && p.compareAtPrice > p.price
      ).slice(0, 4),
    []
  );

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setActiveCategory(
      tab === "products" ? PRODUCT_CATEGORIES[0].id : SERVICE_CATEGORIES[0].id
    );
  };

  const discount = (price: number, compare?: number) =>
    compare ? Math.round(((compare - price) / compare) * 100) : 0;

  const activeCategoryName =
    currentCategories.find((c) => c.id === activeCategory)?.name ?? "";
  const activeCategoryDesc =
    currentCategories.find((c) => c.id === activeCategory)?.description ?? "";

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="px-6 md:px-12 pt-16 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f5] text-[#111111] text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Nepal&apos;s Unified Marketplace
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#111111] tracking-tight leading-[1.05] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              The better way to{" "}
              <span className="text-[#6b7280]">trade</span> in Nepal.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[#374151] max-w-xl mb-10 leading-relaxed"
            >
              A unified ecosystem for multi-category vendors. Launch your store
              in minutes with AI-scaffolding and reach customers across the
              country.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-12 px-6 bg-[#111111] text-white hover:bg-[#242424] rounded-lg font-semibold text-sm"
              >
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 rounded-lg font-semibold text-sm border-[#e5e7eb] text-[#111111] hover:bg-[#f5f5f5]"
              >
                Browse Marketplace
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 pt-8 border-t border-[#f3f4f6] flex items-center gap-8 text-sm text-[#6b7280]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>Free to list</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
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
            <Card className="relative p-2 bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                  alt="Marketplace Hero"
                  fill
                  className="object-cover"
                  priority
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

      {/* STICKY CATEGORY SELECTOR */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-6 py-4">
            <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-full p-1">
              <button
                onClick={() => handleTabChange("products")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "products"
                    ? "bg-white text-[#111111] shadow-sm"
                    : "text-[#6b7280] hover:text-[#111111]"
                  }`}
              >
                Products
              </button>
              <button
                onClick={() => handleTabChange("services")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "services"
                    ? "bg-white text-[#111111] shadow-sm"
                    : "text-[#6b7280] hover:text-[#111111]"
                  }`}
              >
                Services
              </button>
            </div>

            <div className="h-6 w-px bg-[#e5e7eb] hidden md:block" />

            {/* <div className="flex items-center gap-2 text-[#111111] font-semibold text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              
            </div> */}

            <div className="relative flex-1 overflow-hidden">
              <div
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto py-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {currentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${activeCategory === cat.id
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#111111] hover:text-[#111111]"
                      }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => scroll("left")}
                className="p-1.5 rounded-md hover:bg-[#f5f5f5] text-[#6b7280] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-1.5 rounded-md hover:bg-[#f5f5f5] text-[#6b7280] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SHOWCASE */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${activeCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {activeCategoryName}
                </h2>
                <p className="text-[#6b7280] text-base">{activeCategoryDesc}</p>
              </div>
              <Link
                href={`/${activeCategory}`}
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#111111] hover:underline underline-offset-4"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PRODUCTS GRID */}
            {activeTab === "products" && (
              <>
                {featuredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          <Card className="group cursor-pointer border-0 bg-[#f5f5f5] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="relative aspect-[4/5] overflow-hidden bg-white">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              {product.compareAtPrice &&
                                product.compareAtPrice > product.price && (
                                  <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider">
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
                                <div>
                                  <h3 className="font-semibold text-[#111111] text-base leading-snug mb-1">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs text-[#6b7280] uppercase tracking-wider font-medium">
                                    {vendor?.name}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-[#111111]">
                                    NPR {product.price.toLocaleString()}
                                  </p>
                                  {product.compareAtPrice && (
                                    <p className="text-xs text-[#6b7280] line-through">
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
                  <div className="py-24 text-center bg-[#f8f9fa] rounded-2xl border border-dashed border-[#e5e7eb]">
                    <ShoppingBag className="w-10 h-10 text-[#d1d5db] mx-auto mb-4" />
                    <p className="text-[#6b7280] font-medium">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredServices.map((service, idx) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                      >
                        <Card className="group cursor-pointer border-0 bg-[#f5f5f5] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                          <div className="relative aspect-[4/5] overflow-hidden bg-white">
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[#111111] text-[11px] font-bold uppercase tracking-wider border border-[#e5e7eb]">
                                <Calendar className="w-3 h-3" />
                                {Math.floor(service.duration / 60)} min
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="font-semibold text-[#111111] text-base leading-snug mb-1">
                                  {service.name}
                                </h3>
                                <p className="text-xs text-[#6b7280] uppercase tracking-wider font-medium">
                                  {service.providerName}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-[#111111]">
                                  NPR {service.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-3">
                              <Star className="w-3.5 h-3.5 fill-[#fb923c] text-[#fb923c]" />
                              <span className="text-xs font-semibold text-[#111111]">
                                {service.rating}
                              </span>
                              <span className="text-xs text-[#6b7280]">
                                · {service.category}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center bg-[#f8f9fa] rounded-2xl border border-dashed border-[#e5e7eb]">
                    <Calendar className="w-10 h-10 text-[#d1d5db] mx-auto mb-4" />
                    <p className="text-[#6b7280] font-medium">
                      No featured services in this category yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SALES & OFFERS */}
      {saleProducts.length > 0 && (
        <section className="bg-[#f8f9fa] py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center">
                  <BadgePercent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-semibold text-[#111111] tracking-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Sales & Offers
                  </h2>
                  <p className="text-sm text-[#6b7280] mt-0.5">
                    Limited-time deals from our vendors
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="hidden md:flex rounded-lg border-[#e5e7eb] text-[#111111] font-semibold text-sm hover:bg-white"
              >
                View all deals
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.map((product) => {
                const vendor = VENDORS.find((v) => v.id === product.vendorId);
                return (
                  <Card
                    key={product.id}
                    className="group cursor-pointer bg-white border border-[#e5e7eb] rounded-xl overflow-hidden hover:border-[#111111] transition-colors duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#ef4444] text-white text-[11px] font-bold uppercase tracking-wider">
                          {discount(product.price, product.compareAtPrice)}% OFF
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#6b7280] uppercase tracking-wider font-medium mb-1">
                        {vendor?.name}
                      </p>
                      <h3 className="font-semibold text-[#111111] text-sm mb-3 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#111111]">
                          NPR {product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#9ca3af] line-through">
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

      {/* SERVICES HUB */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              Expert services at your doorstep.
            </h2>
            <p className="text-[#6b7280] text-lg max-w-xl">
              From home repairs to professional consultations, find the right
              expert for your needs.
            </p>
          </div>
          <Link href="/services">
            <Button className="h-11 px-6 bg-[#111111] text-white hover:bg-[#242424] rounded-lg font-semibold text-sm">
              Explore Services Hub
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden rounded-xl border-0 bg-[#f5f5f5] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1 font-medium">
                    {service.category}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm opacity-80 line-clamp-1">
                    {service.providerName}
                  </p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {Math.floor(service.duration / 60)} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#fb923c] text-[#fb923c]" />
                    {service.rating}
                  </span>
                </div>
                <span className="font-semibold text-[#111111]">
                  NPR {service.price.toLocaleString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* TOP VENDORS */}
      <section className="bg-[#f8f9fa] py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold text-[#111111] tracking-tight mb-10"
            style={{ letterSpacing: "-0.02em" }}
          >
            Trusted Vendors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VENDORS.slice(0, 3).map((vendor) => (
              <Link key={vendor.id} href={`/${vendor.slug}`}>
                <Card className="p-6 bg-white border border-[#e5e7eb] rounded-xl hover:border-[#111111] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#f5f5f5] overflow-hidden relative">
                      <Image
                        src={vendor.logo}
                        alt={vendor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111] group-hover:text-[#3b82f6] transition-colors">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <Star className="w-3 h-3 fill-[#fb923c] text-[#fb923c]" />
                        <span className="font-medium text-[#111111]">
                          {vendor.rating}
                        </span>
                        <span>· {vendor.category}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#6b7280] line-clamp-2 leading-relaxed">
                    {vendor.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Loved by the community.
          </h2>
          <p className="text-[#6b7280] text-lg">
            See what buyers and sellers are saying about Bazar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.id}
              className="p-8 bg-[#f5f5f5] border-0 rounded-xl text-left"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#fb923c] text-[#fb923c]"
                  />
                ))}
              </div>
              <p className="text-[#374151] text-lg leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e5e7eb] flex items-center justify-center text-xs font-bold text-[#6b7280]">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#6b7280]">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <Card className="relative overflow-hidden rounded-2xl bg-[#101010] text-white p-12 md:p-20 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Ready to grow your business?
            </h2>
            <p className="text-lg text-[#a1a1aa] mb-10 leading-relaxed">
              Join hundreds of vendors who have already scaled their operations
              using our platform. Automated SEO, high-speed hosting, and
              AI-driven content included.
            </p>
            <Button className="h-12 px-8 bg-white text-[#111111] hover:bg-[#e5e7eb] rounded-lg font-semibold text-sm">
              Create your store now
            </Button>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </Card>
      </section>

     
    </div>
  );
}