"use client";

import { useState, Suspense } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Star, 
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RECENT_ORDERS } from "@/data/mock";
import { ReviewModal } from "@/components/shared/ReviewModal";

function OrdersContent() {
  const { reviews } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4 opacity-40" />;
    }
  };

  const handleReview = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const hasReview = (orderId: string) => {
    return reviews.some(r => r.itemId === orderId);
  };

  const getReview = (orderId: string) => {
    return reviews.find(r => r.itemId === orderId);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 p-8 md:p-12 rounded-[2.5rem] border border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bazar-black/[0.02] dark:bg-bazar-white/[0.02] rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-bazar-black/[0.05] dark:group-hover:bg-bazar-white/[0.05] transition-colors duration-1000" />
        <div className="relative z-10">
          <Typography variant="titleLg" className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Order<br />History</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs md:text-sm font-bold uppercase tracking-[0.3em] max-w-md leading-relaxed">
            Track your purchases and support your favorite vendors with meaningful feedback.
          </Typography>
        </div>
        <div className="relative z-10 flex items-center gap-4">
           <div className="p-4 bg-white dark:bg-bazar-black rounded-2xl border border-bazar-gray-100 dark:border-bazar-gray-900 shadow-xl">
              <Typography variant="titleSm" className="font-black text-2xl tracking-tighter">{RECENT_ORDERS.length}</Typography>
              <Typography variant="bodySm" className="text-[8px] uppercase tracking-widest opacity-40 font-black">Total Orders</Typography>
           </div>
        </div>
      </section>

      {/* Orders List */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
           <Typography variant="titleSm" className="font-black uppercase tracking-[0.2em] text-[10px] opacity-40">Recent Transactions</Typography>
           <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {RECENT_ORDERS.map((order) => {
            const review = getReview(order.id);
            return (
              <Card key={order.id} className="p-6 md:p-8 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden group hover:border-bazar-black dark:hover:border-bazar-white transition-all rounded-[2.5rem] bg-white dark:bg-bazar-black shadow-sm hover:shadow-2xl">
                <div className="flex flex-col md:flex-row gap-8 justify-between">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-40">{order.id}</Typography>
                           <div className={cn(
                             "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                             order.status === 'paid' ? "bg-green-500/10 text-green-500" :
                             order.status === 'shipped' ? "bg-blue-500/10 text-blue-500" :
                             order.status === 'pending' ? "bg-amber-500/10 text-amber-500" :
                             "bg-red-500/10 text-red-500"
                           )}>
                             {getStatusIcon(order.status)}
                             {order.status}
                           </div>
                        </div>
                        <Typography variant="titleSm" className="font-black text-xl md:text-2xl uppercase tracking-tighter leading-tight">{order.product}</Typography>
                        <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest font-black">{order.date} • Rs. {order.amount.toLocaleString()}</Typography>
                      </div>
                    </div>

                    {/* Integrated Review Section */}
                    <div className="pt-4 border-t border-bazar-gray-50 dark:border-bazar-gray-950">
                      {review ? (
                        <div className="space-y-3">
                           <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                 {[1, 2, 3, 4, 5].map((s) => (
                                   <Star key={s} className={cn("w-3 h-3", s <= review.rating ? "fill-amber-400 text-amber-400" : "text-bazar-gray-200 dark:text-bazar-gray-800")} />
                                 ))}
                              </div>
                              <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest opacity-40">Your Review</Typography>
                           </div>
                           <Typography variant="bodySm" className="text-xs italic opacity-60 line-clamp-2">"{review.comment}"</Typography>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4">
                           <Typography variant="bodySm" className="text-[10px] font-medium opacity-40 italic">Share your experience with this purchase...</Typography>
                           <Button 
                             onClick={() => handleReview({
                               id: order.id,
                               itemName: order.product,
                               itemType: order.type,
                               vendorId: order.vendorId
                             })}
                             variant="outline"
                             className="h-10 px-6 rounded-xl border-bazar-black dark:border-bazar-white font-black uppercase tracking-widest text-[10px] hover:bg-bazar-black dark:hover:bg-bazar-white hover:text-bazar-white dark:hover:text-bazar-black transition-all"
                           >
                             Leave A Review
                           </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 justify-end items-end">
                     <Button className="w-full md:w-48 h-12 bg-bazar-gray-50 dark:bg-bazar-gray-900 text-bazar-black dark:text-bazar-white rounded-xl font-black uppercase tracking-widest text-[10px] border border-bazar-gray-100 dark:border-bazar-gray-800 hover:bg-bazar-black dark:hover:bg-bazar-white hover:text-bazar-white dark:hover:text-bazar-black transition-all group">
                        Track Order
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                     </Button>
                     <Button 
                       variant="outline"
                       className="w-full md:w-48 h-12 rounded-xl border-bazar-gray-200 dark:border-bazar-gray-800 font-black uppercase tracking-widest text-[10px] hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-all flex items-center gap-2"
                     >
                        <MessageSquare className="w-3.5 h-3.5 opacity-40" />
                        Support
                     </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }} 
        initialItem={selectedOrder} 
      />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-bazar-gray-100 border-t-bazar-black dark:border-t-bazar-white rounded-full animate-spin" />
        <Typography variant="bodySm" className="font-black uppercase tracking-widest opacity-40">Loading Archives...</Typography>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
