"use client";

import Image from "next/image";
import { Vendor, Product } from "@/data/mock";
import { VendorCMS } from "@/types/cms";
import { Typography } from "@/components/ui/typography";
import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";

interface TemplateProps {
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}

export function SilverFood({ vendor, cms, products }: TemplateProps) {
  const { theme } = cms;

  return (
    <div className={cn(
      "min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500",
      theme.fontFamily === 'serif' ? 'font-serif' : theme.fontFamily === 'mono' ? 'font-mono' : 'font-sans'
    )}>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
          src={cms.heroImage} 
          alt={cms.heroTitle} 
          fill 
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <Typography variant="displayLg" className="text-white mb-4 drop-shadow-lg">
            {cms.heroTitle}
          </Typography>
          <Typography variant="bodyMd" className="text-white/80">
            {cms.heroSubtitle}
          </Typography>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <Typography variant="titleLg" className="mb-6 uppercase tracking-widest opacity-40 text-xs">
          Our Story
        </Typography>
        <Typography variant="displaySm" className="mb-8">
          {cms.aboutTitle}
        </Typography>
        <Typography variant="bodyMd" className="opacity-60 leading-relaxed">
          {cms.aboutContent}
        </Typography>
      </section>

      {/* Menu Section - Clean List Layout */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <Typography variant="titleLg" className="mb-4">Explore Menu</Typography>
            <div className="w-20 h-1 bg-neutral-900 dark:bg-white rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:shadow-sm transition-all">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <Typography variant="titleSm" className="mb-1">{product.name}</Typography>
                  <Typography variant="bodySm" className="opacity-60 line-clamp-2 mb-2 text-xs">
                    {product.description}
                  </Typography>
                  <Typography variant="titleSm" className="text-neutral-900 dark:text-white">
                    NPR {product.price}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basic Footer */}
      <footer className="py-12 border-t border-neutral-100 dark:border-neutral-900 text-center">
        <Typography variant="bodySm" className="opacity-40">
          © {new Date().getFullYear()} {vendor.name}. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}
