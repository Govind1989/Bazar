"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Vendor, Product } from "@/data/mock";
import { VendorCMS } from "@/types/cms";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Utensils, Play, ChevronDown } from "lucide-react";

interface TemplateProps {
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}

export function PlatinumFood({ vendor, cms, products }: TemplateProps) {
  const { theme } = cms;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className={cn(
      "min-h-screen bg-bazar-black text-white selection:bg-white selection:text-bazar-black",
      theme.fontFamily === 'serif' ? 'font-serif' : theme.fontFamily === 'mono' ? 'font-mono' : 'font-sans'
    )}>
      {/* Immersive Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden sticky top-0">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          {cms.heroVideo ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover brightness-[0.4]"
            >
              <source src={cms.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image 
              src={cms.heroImage} 
              alt={cms.heroTitle} 
              fill 
              className="object-cover brightness-[0.3]"
              priority
            />
          )}
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <Typography variant="titleSm" className="uppercase tracking-[1em] text-[10px] mb-8 text-white/40 block">
              Est. 2024
            </Typography>
            <Typography variant="displayLg" className="text-6xl md:text-9xl mb-8 font-extralight tracking-tighter">
              {cms.heroTitle.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? "italic font-serif" : ""}>{word} </span>
              ))}
            </Typography>
            <div className="flex flex-col items-center gap-12">
               <Typography variant="bodyMd" className="max-w-2xl text-xl text-white/50 font-light italic">
                 "{cms.heroSubtitle}"
               </Typography>
               <motion.div 
                 animate={{ y: [0, 10, 0] }} 
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="cursor-pointer"
               >
                 <ChevronDown className="w-6 h-6 text-white/20" />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Storytelling Section (Parallax) */}
      <section className="relative z-20 bg-bazar-black py-40 px-6 md:px-24">
         <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
               <Image 
                 src={products[0]?.image || cms.heroImage} 
                 alt="Our Philosophy" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-bazar-black/20" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
               <div className="space-y-4">
                  <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] text-white/30">The Philosophy</Typography>
                  <Typography variant="displaySm" className="text-4xl md:text-5xl leading-tight font-light">{cms.aboutTitle}</Typography>
               </div>
               <Typography variant="bodyMd" className="text-xl text-white/50 leading-relaxed font-light">
                 {cms.aboutContent}
               </Typography>
               <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                     <Play className="w-4 h-4 fill-white" />
                  </div>
                  <Typography variant="titleSm" className="uppercase tracking-widest text-[10px]">Watch the film</Typography>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Signature Menu Experience */}
      <section className="bg-neutral-900 py-40 px-6 md:px-24">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32 space-y-6">
               <Typography variant="displaySm" className="text-5xl font-extralight italic">Signature Menu</Typography>
               <Typography variant="bodySm" className="uppercase tracking-[0.5em] text-[10px] text-white/30">Art on a plate</Typography>
            </div>

            <div className="space-y-32">
               {products.slice(0, 4).map((product, idx) => (
                 <motion.div 
                   key={product.id}
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className={cn(
                     "flex flex-col md:flex-row gap-16 items-center",
                     idx % 2 === 1 && "md:flex-row-reverse"
                   )}
                 >
                    <div className="relative w-full md:w-1/2 aspect-square overflow-hidden rounded-full border border-white/5">
                       <Image src={product.image} alt={product.name} fill className="object-cover scale-110 hover:scale-100 transition-transform duration-1000" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                       <div className="space-y-2">
                          <Typography variant="titleSm" className="text-white/30 uppercase tracking-widest text-xs">Dish 0{idx + 1}</Typography>
                          <Typography variant="displaySm" className="text-4xl font-light">{product.name}</Typography>
                       </div>
                       <Typography variant="bodyMd" className="text-white/40 leading-relaxed max-w-md mx-auto md:mx-0">
                          {product.description}
                       </Typography>
                       <div className="flex items-center gap-4 justify-center md:justify-start">
                          <div className="h-[1px] w-8 bg-white/20" />
                          <Typography variant="titleMd" className="text-white/80 font-mono">NPR {product.price}</Typography>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Immersive Testimonial */}
      <section className="py-40 px-6 flex items-center justify-center bg-bazar-black text-center">
         <div className="max-w-3xl space-y-12">
            <Quote className="w-12 h-12 text-white/10 mx-auto" />
            <Typography variant="displaySm" className="text-4xl italic font-extralight leading-tight">
               "Dining here isn't just a meal; it's a sensory journey through the heart of Nepal's culinary heritage, reimagined for the modern epicurean."
            </Typography>
            <div className="space-y-1">
               <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] text-white/40">Suman Thapa</Typography>
               <Typography variant="bodySm" className="text-white/20">Culinary Critic</Typography>
            </div>
         </div>
      </section>

      {/* High-End Footer */}
      <footer className="py-32 bg-white text-bazar-black px-6 md:px-24">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-24">
            <div className="text-center md:text-left space-y-8">
               <Typography variant="displaySm" className="text-6xl tracking-tighter lowercase">{vendor.name}</Typography>
               <Typography variant="bodyMd" className="opacity-40 max-w-sm">Crafting moments of culinary perfection since our inception. We invite you to be part of our story.</Typography>
            </div>
            <div className="grid grid-cols-2 gap-16 text-center md:text-left">
               <div className="space-y-6">
                  <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] opacity-40">Visit</Typography>
                  <Typography variant="bodyMd">Durbar Marg<br />Kathmandu</Typography>
               </div>
               <div className="space-y-6">
                  <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] opacity-40">Reserve</Typography>
                  <Typography variant="bodyMd">res@artisan.com<br />+977 1 444 000</Typography>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
