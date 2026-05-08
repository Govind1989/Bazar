"use client";

import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Product } from "@/data/mock";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  vendorName?: string;
}

export function ProductCard({ product, vendorName }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const vendorSlug = vendorName?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group relative">
      <Link href={`/p/${product.slug}`}>
        <div className="relative aspect-square mb-2 sm:mb-4 overflow-hidden rounded-xl bg-bazar-gray-100 dark:bg-bazar-gray-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-bazar-black/0 group-hover:bg-bazar-black/5 transition-colors duration-300" />
        </div>
      </Link>
      
      {/* Add to Bag overlay */}
      <Button 
        variant="secondary" 
        size="icon" 
        className="absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 sm:h-9 sm:w-9 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm"
        onClick={(e) => {
          e.preventDefault();
          addItem(product);
        }}
      >
        <ShoppingBag className="w-4 h-4" />
      </Button>
      
      <div className="flex justify-between items-start gap-2 sm:gap-4 px-1 sm:px-0">
        <div className="flex-1 min-w-0">
          <Link href={`/p/${product.slug}`}>
            <Typography variant="titleSm" className="text-[13px] sm:text-[16px] mb-0.5 sm:mb-1 group-hover:underline truncate">
              {product.name}
            </Typography>
          </Link>
          {vendorName && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href={`/${vendorSlug}`}>
                <Typography variant="bodySm" className="uppercase font-mono tracking-wider opacity-60 text-[8px] sm:text-[10px] hover:underline truncate">
                  {vendorName}
                </Typography>
              </Link>
              {product.subCategory && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-bazar-gray-300 dark:bg-bazar-gray-700" />
                  <Typography variant="bodySm" className="uppercase font-mono tracking-wider opacity-40 text-[7px] sm:text-[9px] truncate">
                    {product.subCategory}
                  </Typography>
                </>
              )}
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <Typography variant="titleSm" className="text-[13px] sm:text-[16px]">NPR {product.price.toLocaleString()}</Typography>
        </div>
      </div>
    </div>
  );
}
