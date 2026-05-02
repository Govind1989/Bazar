"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function CartToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {/* Cart Drawer Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-bazar-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Drawer Content */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-bazar-white dark:bg-bazar-black z-[101] shadow-2xl transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
            <Typography variant="titleMd" className="uppercase tracking-widest">Your Cart ({totalItems})</Typography>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <ShoppingBag className="w-12 h-12 mb-4" />
                <Typography variant="bodyMd">Your cart is empty</Typography>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-bazar-gray-100 dark:bg-bazar-gray-900 flex-shrink-0">
                       <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <Typography variant="titleSm" className="text-sm">{item.name}</Typography>
                        <Typography variant="titleSm" className="text-sm">NPR {item.price.toLocaleString()}</Typography>
                      </div>
                      <Typography variant="bodySm" className="text-xs mb-4 opacity-60 uppercase tracking-wider">
                         Stock: {item.stock}
                      </Typography>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-md">
                          <button 
                            className="p-1 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button 
                            className="p-1 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900"
                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          className="text-bazar-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 space-y-4">
              <div className="flex justify-between items-center">
                <Typography variant="bodyMd" className="uppercase tracking-widest text-xs opacity-60">Subtotal</Typography>
                <Typography variant="titleMd">NPR {totalPrice.toLocaleString()}</Typography>
              </div>
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="lg">Checkout Now</Button>
              </Link>
              <Button variant="ghost" className="w-full text-xs opacity-50" onClick={clearCart}>Clear Cart</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
