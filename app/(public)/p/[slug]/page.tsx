import { notFound } from "next/navigation";
import { PRODUCTS, VENDORS } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronLeft, Star, ShieldCheck } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: productSlug } = await params;
  
  const product = PRODUCTS.find((p) => p.slug === productSlug);
  const vendor = product ? VENDORS.find((v) => v.id === product.vendorId) : null;

  if (!product || !vendor) {
    notFound();
  }

  return (
    <main className="pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <Link 
        href={`/${vendor.slug}`}
        className="inline-flex items-center gap-2 text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white mb-6 sm:mb-12 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <Typography variant="navLink" className="uppercase tracking-widest text-[10px] sm:text-xs">Back to {vendor.name}</Typography>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24">
        {/* Product Images */}
        <div className="space-y-4 sm:space-y-6">
           <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-bazar-gray-100 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
           </div>
           <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800 opacity-50" />
              ))}
           </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6 sm:mb-8">
            <Typography variant="displaySm" className="mb-1 sm:mb-2 text-2xl sm:text-4xl">{product.name}</Typography>
            <Link href={`/${vendor.slug}`} className="inline-block">
               <Typography variant="bodySm" className="text-[11px] sm:text-sm text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white transition-colors">
                  by {vendor.name}
               </Typography>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Typography variant="displaySm" className="text-xl sm:text-3xl">NPR {product.price.toLocaleString()}</Typography>
            {product.compareAtPrice && (
              <Typography variant="titleMd" className="text-sm sm:text-xl text-bazar-gray-400 line-through">
                NPR {product.compareAtPrice.toLocaleString()}
              </Typography>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 py-6 sm:py-8 border-y border-bazar-gray-100 dark:border-bazar-gray-900">
             <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center">
                   <Star className="w-4 h-4 sm:w-5  text-bazar-black dark:text-bazar-white" />
                </div>
                <div>
                   <Typography variant="titleSm" className="text-xs sm:text-base">Premium Quality</Typography>
                   <Typography variant="bodySm" className="text-[10px] sm:text-sm opacity-60">Verified and inspected by Bazar QC.</Typography>
                </div>
             </div>
             <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center">
                   <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-bazar-black dark:text-bazar-white" />
                </div>
                <div>
                   <Typography variant="titleSm" className="text-xs sm:text-base">7-Day Guarantee</Typography>
                   <Typography variant="bodySm" className="text-[10px] sm:text-sm opacity-60">Full refund if not met expectations.</Typography>
                </div>
             </div>
          </div>

          <div className="mb-8 sm:mb-12">
            <Typography variant="titleSm" className="mb-3 sm:mb-4 uppercase tracking-widest text-[9px] sm:text-xs opacity-60">Description</Typography>
            <Typography variant="bodyMd" className="text-sm sm:text-base leading-relaxed opacity-80">
              {product.description} Experience the best of {vendor.name} with our carefully curated {product.name}. 
              Built with attention to detail and high-quality materials.
            </Typography>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <AddToCartButton product={product} className="flex-1 h-12 sm:h-14 rounded-xl" />
            <Button variant="outline" size="lg" className="flex-1 h-12 sm:h-14 rounded-xl text-xs sm:text-base">Add to Wishlist</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
