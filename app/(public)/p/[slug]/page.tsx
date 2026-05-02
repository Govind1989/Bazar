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
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <Link 
        href={`/${vendor.slug}`}
        className="inline-flex items-center gap-2 text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white mb-12 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <Typography variant="navLink" className="uppercase tracking-widest text-xs">Back to {vendor.name}</Typography>
      </Link>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Product Images */}
        <div className="space-y-6">
           <div className="relative aspect-square rounded-2xl overflow-hidden bg-bazar-gray-100 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
           </div>
           <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-bazar-gray-100 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800 opacity-50" />
              ))}
           </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-8">
            <Typography variant="displaySm" className="mb-2">{product.name}</Typography>
            <Link href={`/${vendor.slug}`} className="inline-block">
               <Typography variant="bodySm" className="text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white transition-colors">
                  by {vendor.name}
               </Typography>
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Typography variant="displaySm">NPR {product.price.toLocaleString()}</Typography>
            {product.compareAtPrice && (
              <Typography variant="titleMd" className="text-bazar-gray-400 line-through">
                NPR {product.compareAtPrice.toLocaleString()}
              </Typography>
            )}
          </div>

          <div className="space-y-6 mb-12 py-8 border-y border-bazar-gray-100 dark:border-bazar-gray-900">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center">
                   <Star className="w-5 h-5 text-bazar-black dark:text-bazar-white" />
                </div>
                <div>
                   <Typography variant="titleSm">Premium Quality</Typography>
                   <Typography variant="bodySm">Verified and inspected by Bazar Quality Control.</Typography>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bazar-gray-100 dark:bg-bazar-gray-900 flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 text-bazar-black dark:text-bazar-white" />
                </div>
                <div>
                   <Typography variant="titleSm">7-Day Guarantee</Typography>
                   <Typography variant="bodySm">Full refund if the product doesn't meet expectations.</Typography>
                </div>
             </div>
          </div>

          <div className="mb-12">
            <Typography variant="titleSm" className="mb-4 uppercase tracking-widest text-xs opacity-60">Description</Typography>
            <Typography variant="bodyMd" className="leading-relaxed">
              {product.description} Experience the best of {vendor.name} with our carefully curated {product.name}. 
              Built with attention to detail and high-quality materials, this product is designed for those 
              who appreciate excellence in the {product.category} category.
            </Typography>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} className="flex-1" />
            <Button variant="outline" size="lg" className="flex-1">Add to Wishlist</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
