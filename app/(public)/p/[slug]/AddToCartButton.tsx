"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/data/mock";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button 
      size="lg" 
      className={cn("gap-2", className)}
      onClick={() => addItem(product)}
    >
      <ShoppingBag className="w-5 h-5" />
      Add to Cart
    </Button>
  );
}
