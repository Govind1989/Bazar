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
          "fixed top-0 right-0 h-full w-full sm:max-w-md bg-bazar-white dark:bg-bazar-black z-[101] shadow-2xl transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
            <Typography variant="titleMd" className="uppercase tracking-widest text-sm sm:text-base">Cart ({totalItems})</Typography>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 sm:h-10 sm:w-10">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 mb-4" />
                <Typography variant="bodyMd" className="text-sm sm:text-base">Your cart is empty</Typography>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-bazar-gray-100 dark:bg-bazar-gray-900 flex-shrink-0">
                       <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1 gap-2">
                        <Typography variant="titleSm" className="text-[13px] sm:text-sm truncate">{item.name}</Typography>
                        <Typography variant="titleSm" className="text-[13px] sm:text-sm shrink-0">रु {item.price.toLocaleString()}</Typography>
                      </div>
                      <Typography variant="bodySm" className="text-[10px] sm:text-xs mb-3 sm:mb-4 opacity-60 uppercase tracking-wider">
                         Stock: {item.stock}
                      </Typography>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-md overflow-hidden">
                          <button 
                            className="p-1 sm:p-1.5 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 transition-colors"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </button>
                          <span className="px-2 sm:px-3 text-[10px] sm:text-xs font-mono">{item.quantity}</span>
                          <button 
                            className="p-1 sm:p-1.5 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 transition-colors"
                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                          >
                            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </button>
                        </div>
                        <button 
                          className="text-bazar-gray-400 hover:text-red-500 transition-colors p-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 space-y-3 sm:space-y-4 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
              <div className="flex justify-between items-center">
                <Typography variant="bodyMd" className="uppercase tracking-widest text-[10px] sm:text-xs opacity-60">Subtotal</Typography>
                <Typography variant="titleMd" className="text-base sm:text-xl">रु {totalPrice.toLocaleString()}</Typography>
              </div>
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-11 sm:h-14 rounded-xl text-xs sm:text-base font-bold uppercase tracking-widest" size="lg">Checkout Now</Button>
              </Link>
              <button 
                className="w-full text-[10px] sm:text-xs opacity-40 hover:opacity-100 uppercase font-black tracking-[0.2em] py-2 transition-opacity" 
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
