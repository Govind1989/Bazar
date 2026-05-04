"use client";

import Image from "next/image";
import { Vendor, Product } from "@/data/mock";
import { VendorCMS } from "@/types/cms";
import { Typography } from "@/components/ui/typography";
import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star, Clock, UtensilsCrossed } from "lucide-react";

interface TemplateProps {
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}

export function GoldFood({ vendor, cms, products }: TemplateProps) {
  const { theme } = cms;
  const specials = products.slice(0, 3);

  return (
    <div className={cn(
      "min-h-screen bg-bazar-white dark:bg-bazar-black transition-colors duration-700",
      theme.fontFamily === 'serif' ? 'font-serif' : theme.fontFamily === 'mono' ? 'font-mono' : 'font-sans'
    )}>
      {/* Dynamic Hero with Floating Elements */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={cms.heroImage} 
            alt={cms.heroTitle} 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bazar-black/80 via-bazar-black/40 to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-24 max-w-4xl text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-white" />
              <Typography variant="titleSm" className="uppercase tracking-[0.3em] text-[10px] text-white/70">
                Premium Dining Experience
              </Typography>
            </div>
            <Typography variant="displayLg" className="text-5xl md:text-7xl mb-8 leading-tight">
              {cms.heroTitle}
            </Typography>
            <Typography variant="bodyMd" className="text-xl text-white/60 mb-10 max-w-lg font-light leading-relaxed">
              {cms.heroSubtitle}
            </Typography>
            <button className="px-8 py-4 bg-white text-bazar-black text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
              Book a Table
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Specials Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="max-w-xl">
              <Typography variant="titleLg" className="mb-4 text-bazar-black dark:text-bazar-white">Chef's Specials</Typography>
              <Typography variant="bodyMd" className="opacity-50">Handpicked delicacies that define our culinary philosophy. Prepared with passion, served with elegance.</Typography>
           </div>
           <div className="flex items-center gap-8">
              <div className="text-center">
                 <Typography variant="displaySm" className="mb-1">4.9</Typography>
                 <Typography variant="bodySm" className="uppercase tracking-widest text-[10px] opacity-40">Rating</Typography>
              </div>
              <div className="text-center">
                 <Typography variant="displaySm" className="mb-1">15+</Typography>
                 <Typography variant="bodySm" className="uppercase tracking-widest text-[10px] opacity-40">Awards</Typography>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
           {specials.map((product, idx) => (
             <motion.div 
               key={product.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.2 }}
               viewport={{ once: true }}
               className="group"
             >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl">
                   <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-bazar-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                      <Typography variant="titleMd" className="text-white mb-2">{product.name}</Typography>
                      <Typography variant="bodySm" className="text-white/70 line-clamp-2">{product.description}</Typography>
                   </div>
                </div>
                <div className="flex justify-between items-center">
                   <Typography variant="titleSm" className="uppercase tracking-widest text-xs opacity-40">NPR {product.price}</Typography>
                   <div className="flex gap-1 text-orange-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Elegant Menu Grid */}
      <section className="py-32 bg-neutral-50 dark:bg-neutral-950/50">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-24">
               <Typography variant="displaySm" className="mb-4 tracking-tight">Full Menu</Typography>
               <Typography variant="bodySm" className="uppercase tracking-[0.4em] text-[10px] opacity-40">Authentic Flavors</Typography>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
               {products.map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
            </div>
         </div>
      </section>

      {/* Immersive Footer */}
      <footer className="py-24 bg-bazar-black text-white px-6 md:px-12">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
               <Typography variant="displaySm" className="mb-6">{vendor.name}</Typography>
               <Typography variant="bodyMd" className="text-white/40 max-w-sm">Join our newsletter for exclusive tasting events and seasonal menu updates.</Typography>
            </div>
            <div>
               <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] text-white/40 mb-6">Location</Typography>
               <Typography variant="bodyMd">Kathmandu, Nepal<br />Durbar Marg, 44600</Typography>
            </div>
            <div>
               <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] text-white/40 mb-6">Contact</Typography>
               <Typography variant="bodyMd">hello@{vendor.slug}.com<br />+977 1 4220000</Typography>
            </div>
         </div>
      </footer>
    </div>
  );
}
