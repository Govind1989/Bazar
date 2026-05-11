"use client";

import { useCartStore } from "@/store/useCartStore";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Minus, Plus, Trash2, Tag, Gift, CheckCircle2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Portal } from "./Portal";

export function CartToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
  const { campaigns } = useCampaignStore();
  const { enrolledCampaignIds, toggleEnrollCampaign } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const vendorCampaigns = useMemo(() => {
    const vendorIds = Array.from(new Set(items.map(item => item.vendorId)));
    return campaigns.filter(campaign => 
      vendorIds.includes(campaign.vendorId) && 
      (campaign.type !== 'LOYALTY' || enrolledCampaignIds.includes(campaign.id)) &&
      campaign.status === 'ACTIVE'
    );
  }, [items, campaigns, enrolledCampaignIds]);

  const freeCampaigns = useMemo(() => {
    const vendorIds = Array.from(new Set(items.map(item => item.vendorId)));
    return campaigns.filter(campaign => 
      vendorIds.includes(campaign.vendorId) && 
      campaign.type === 'LOYALTY' && 
      !enrolledCampaignIds.includes(campaign.id) &&
      campaign.status === 'ACTIVE'
    );
  }, [items, campaigns, enrolledCampaignIds]);

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

      <Portal>
        {/* Cart Drawer Overlay */}
        <div 
          className={cn(
            "fixed inset-0 bg-bazar-black/60 backdrop-blur-md z-[400] transition-opacity duration-500 flex items-center justify-center",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsOpen(false)}
        >
          {/* Explicit Close for Overlay */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-8 right-8 text-white hover:bg-white/10 rounded-full h-12 w-12 hidden sm:flex"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Cart Drawer Content */}
        <div 
          className={cn(
            "fixed top-0 right-0 h-full w-full sm:max-w-md bg-bazar-white dark:bg-bazar-black z-[401] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
              <div>
                <Typography variant="titleMd" className="font-black uppercase tracking-tighter">Your Cart</Typography>
                <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{totalItems} Items Selected</Typography>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-10 w-10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 rounded-3xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center mb-6 opacity-20">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <Typography variant="titleSm" className="font-black uppercase tracking-tighter mb-2">Cart is empty</Typography>
                  <Typography variant="bodySm" className="opacity-40 max-w-[200px]">Looks like you haven't added anything to your cart yet.</Typography>
                </div>
              ) : (
                <>
                  {/* Active Campaigns Section */}
                  {(vendorCampaigns.length > 0 || freeCampaigns.length > 0) && (
                    <div className="space-y-4">
                       <Typography variant="titleSm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Available Offers</Typography>
                       <div className="space-y-3">
                          {vendorCampaigns.map(campaign => (
                            <div key={campaign.id} className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex gap-4 items-center group">
                               <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                  <Tag className="w-5 h-5" />
                               </div>
                               <div className="flex-1 min-w-0">
                                  <Typography variant="titleSm" className="text-[13px] font-black uppercase tracking-tighter line-clamp-1">{campaign.title}</Typography>
                                  <Typography variant="bodySm" className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                    {campaign.valueType === 'PERCENT' ? `${campaign.value}% OFF` : `रु ${campaign.value} OFF`}
                                  </Typography>
                               </div>
                               <Button size="sm" className="h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest bg-green-500 hover:bg-green-600 text-white">
                                  Redeem
                               </Button>
                            </div>
                          ))}
                          {freeCampaigns.map(campaign => (
                            <div key={campaign.id} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex gap-4 items-center">
                               <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                  <Gift className="w-5 h-5" />
                               </div>
                               <div className="flex-1 min-w-0">
                                  <Typography variant="titleSm" className="text-[13px] font-black uppercase tracking-tighter line-clamp-1">{campaign.title}</Typography>
                                  <Typography variant="bodySm" className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Enroll to unlock</Typography>
                               </div>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 className="h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest border-purple-500/20 text-purple-500 hover:bg-purple-500 hover:text-white"
                                 onClick={() => toggleEnrollCampaign(campaign.id)}
                               >
                                  Enroll
                               </Button>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    <Typography variant="titleSm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Cart Items</Typography>
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-bazar-gray-50 dark:bg-bazar-gray-950 flex-shrink-0 border border-bazar-gray-100 dark:border-bazar-gray-900">
                           <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div className="flex justify-between gap-2">
                            <div>
                              <Typography variant="titleSm" className="text-sm font-black uppercase tracking-tighter truncate">{item.name}</Typography>
                              <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Stock: {item.stock}</Typography>
                            </div>
                            <Typography variant="titleSm" className="text-sm font-black">रु {item.price.toLocaleString()}</Typography>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-xl p-1 border border-bazar-gray-100 dark:border-bazar-gray-900">
                              <button 
                                className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-bazar-black rounded-lg transition-all"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-[11px] font-black">{item.quantity}</span>
                              <button 
                                className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-bazar-black rounded-lg transition-all"
                                onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button 
                              className="w-8 h-8 flex items-center justify-center text-bazar-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900 space-y-6 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <div className="space-y-2">
                  <div className="flex justify-between items-center opacity-40">
                    <Typography variant="bodySm" className="uppercase tracking-widest text-[10px] font-bold">Subtotal</Typography>
                    <Typography variant="titleSm" className="text-sm">रु {totalPrice.toLocaleString()}</Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="bodySm" className="uppercase tracking-widest text-[10px] font-black">Total Amount</Typography>
                    <Typography variant="titleMd" className="text-2xl font-black">रु {totalPrice.toLocaleString()}</Typography>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link href="/checkout" onClick={() => setIsOpen(false)} className="w-full">
                    <Button className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-bazar-black/10" size="lg">
                      Checkout Now
                    </Button>
                  </Link>
                  <button 
                    className="w-full text-[10px] opacity-40 hover:opacity-100 hover:text-red-500 uppercase font-black tracking-[0.2em] py-2 transition-all" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
}
