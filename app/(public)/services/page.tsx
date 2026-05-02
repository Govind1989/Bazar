"use client";

import { SERVICES, CATEGORIES } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react"; // Using for icon placeholder
import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Calendar, MapPin } from "lucide-react";

export default function ServicesHubPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Services Hero */}
      <section className="px-6 md:px-12 py-24 border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <Typography variant="displayLg" className="text-white mb-6">Expert services.<br/><span className="text-bazar-gray-500 italic">At your doorstep.</span></Typography>
            <Typography variant="bodyMd" className="text-xl text-bazar-gray-400">
              Book vetted professionals for consultations, adventures, and appointments. 
              The infrastructure for the service economy in Nepal.
            </Typography>
          </div>
          <div className="flex gap-4">
             <div className="text-right">
                <Typography variant="displaySm" className="text-white">920+</Typography>
                <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px]">Providers</Typography>
             </div>
             <div className="w-[1px] h-12 bg-bazar-gray-800 mx-4" />
             <div className="text-right">
                <Typography variant="displaySm" className="text-white">12k+</Typography>
                <Typography variant="bodySm" className="opacity-40 uppercase tracking-widest text-[10px]">Bookings</Typography>
             </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="px-6 md:px-12 py-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50 dark:bg-bazar-gray-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Consultations", desc: "Expert advice for business and lifestyle.", icon: Star },
             { name: "Adventures", desc: "Tours and treks across the Himalayas.", icon: MapPin },
             { name: "Home Services", desc: "Repairs, cleaning and maintenance.", icon: Calendar }
           ].map((type) => (
             <div key={type.name} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-bazar-white dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center justify-center flex-shrink-0">
                   <type.icon className="w-5 h-5 opacity-40" />
                </div>
                <div>
                   <Typography variant="titleSm" className="mb-1">{type.name}</Typography>
                   <Typography variant="bodySm" className="text-xs">{type.desc}</Typography>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Service Catalog */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <Typography variant="displayMd" className="mb-4">Top Rated Services</Typography>
            <Typography variant="bodyMd">Highly recommended by the Bazar community.</Typography>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm">Filter</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {SERVICES.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`} className="group">
              <Card className="p-0 overflow-hidden border-none bg-transparent h-full flex flex-col">
                <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-2xl bg-bazar-gray-100 dark:bg-bazar-gray-900">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-bazar-white/90 dark:bg-bazar-black/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {service.category}
                     </span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Typography variant="titleLg" className="group-hover:underline">{service.name}</Typography>
                    <div className="flex items-center gap-1">
                       <Star className="w-3 h-3 fill-bazar-black dark:fill-bazar-white" />
                       <Typography variant="titleSm" className="text-xs">{service.rating}</Typography>
                    </div>
                  </div>
                  
                  <Typography variant="bodySm" className="mb-6 line-clamp-2">{service.description}</Typography>
                  
                  <div className="mt-auto pt-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
                    <div className="flex items-center gap-2 opacity-60">
                       <Clock className="w-4 h-4" />
                       <Typography variant="bodySm" className="text-xs font-mono">
                          {service.duration > 1440 ? `${Math.floor(service.duration / 1440)} DAYS` : `${service.duration} MIN`}
                       </Typography>
                    </div>
                    <Typography variant="titleLg">NPR {service.price.toLocaleString()}</Typography>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Band */}
      <section className="bg-bazar-gray-100 dark:bg-bazar-gray-950 py-24 px-6 md:px-12 text-center">
         <div className="max-w-3xl mx-auto">
            <Typography variant="displaySm" className="mb-8 uppercase tracking-widest opacity-20">Safe & Secure Booking</Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {["ID Verified", "Secure Escrow", "24/7 Support", "Refund Policy"].map(item => (
                 <div key={item}>
                    <Typography variant="titleSm" className="text-[10px] uppercase tracking-[0.2em]">{item}</Typography>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
