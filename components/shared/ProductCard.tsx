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

  return (
    <div className="group">
      <Link href={`/${vendorName?.toLowerCase().replace(/\s+/g, '-')}/p/${product.slug}`}>
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-bazar-gray-100 dark:bg-bazar-gray-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-bazar-black/0 group-hover:bg-bazar-black/5 transition-colors duration-300" />
        </div>
      </Link>
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <Link href={`/${vendorName?.toLowerCase().replace(/\s+/g, '-')}/p/${product.slug}`}>
            <Typography variant="titleSm" className="mb-1 group-hover:underline">
              {product.name}
            </Typography>
          </Link>
          {vendorName && (
            <Typography variant="bodySm" className="uppercase font-mono tracking-wider opacity-60 text-[10px]">
              {vendorName}
            </Typography>
          )}
        </div>
        <div className="text-right">
          <Typography variant="titleSm">NPR {product.price.toLocaleString()}</Typography>
          <Button 
            variant="ghost" 
            size="icon" 
            className="mt-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
