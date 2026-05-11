"use client";

import { useState, useEffect, Suspense } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Image as ImageIcon, 
  Video, 
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RECENT_ORDERS } from "@/data/mock";
import { useSearchParams, useRouter } from "next/navigation";
import { ReviewModal } from "@/components/shared/ReviewModal";

function ReviewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderIdParam = searchParams.get('orderId');
  
  const { reviews } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    if (orderIdParam) {
      const order = RECENT_ORDERS.find(o => o.id === orderIdParam);
      if (order) {
        setSelectedItem(order);
        setIsModalOpen(true);
      }
    }
  }, [orderIdParam]);

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            className={cn(
              "w-4 h-4 transition-all duration-300",
              s <= count
                ? "fill-amber-400 text-amber-400 scale-110" 
                : "text-bazar-gray-200 dark:text-bazar-gray-800"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 p-8 md:p-12 rounded-[2.5rem] border border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.02] rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-amber-500/[0.05] transition-colors duration-1000" />
        <div className="relative z-10">
          <Typography variant="titleLg" className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Reviews<br />& Ratings</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs md:text-sm font-bold uppercase tracking-[0.3em] max-w-md leading-relaxed">
            Your voice fuels the heritage economy. Shared experiences help local artisans thrive and guide the community.
          </Typography>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Write A Review
        </Button>
      </section>

      {/* Reviews List */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
           <Typography variant="titleSm" className="font-black uppercase tracking-[0.2em] text-[10px] opacity-40">Your Contributions</Typography>
           <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
        </div>

        {reviews.length === 0 ? (
          <Card className="p-24 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col items-center justify-center text-center rounded-[3rem] bg-transparent">
             <div className="w-24 h-24 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center mb-8 border border-bazar-gray-100 dark:border-bazar-gray-900">
                <Star className="w-10 h-10 opacity-20" />
             </div>
             <Typography variant="titleMd" className="font-black uppercase tracking-widest text-xl">Feedback Loop Empty</Typography>
             <Typography variant="bodySm" className="text-xs mt-3 max-w-[280px] opacity-40 font-medium leading-relaxed italic">
                You haven't shared your thoughts yet. Help others by reviewing your recent purchases.
             </Typography>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-8 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden group hover:border-bazar-black dark:hover:border-bazar-white transition-all rounded-[2.5rem] bg-white dark:bg-bazar-black shadow-sm hover:shadow-2xl">
                 <div className="space-y-6">
                    <div className="flex justify-between items-start">
                       <div className="space-y-1">
                          <Typography variant="titleSm" className="font-black text-lg uppercase tracking-tighter leading-tight group-hover:text-amber-500 transition-colors">{review.itemName}</Typography>
                          <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-black">{review.itemType} • {new Date(review.createdAt).toLocaleDateString()}</Typography>
                       </div>
                       {renderStars(review.rating)}
                    </div>

                    <Typography variant="bodySm" className="text-sm leading-relaxed italic opacity-80 decoration-amber-500/10 underline underline-offset-8">
                       "{review.comment}"
                    </Typography>

                    {review.proofUrl && (
                      <div className="pt-4 flex items-center gap-4">
                         <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900 group/proof">
                            <img src={review.proofUrl} alt="Review Proof" className="w-full h-full object-cover grayscale group-hover/proof:grayscale-0 transition-all duration-700" />
                            <div className="absolute bottom-1 right-1 p-1 bg-bazar-black/80 dark:bg-bazar-white/80 rounded-md">
                               {review.proofType === 'IMAGE' ? <ImageIcon className="w-2.5 h-2.5 text-white dark:text-black" /> : <Video className="w-2.5 h-2.5 text-white dark:text-black" />}
                            </div>
                         </div>
                         <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest opacity-40">Proof of Purchase Attached</Typography>
                      </div>
                    )}
                 </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
          router.replace('/account/reviews');
        }} 
        initialItem={selectedItem} 
      />
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-bazar-gray-100 border-t-amber-500 rounded-full animate-spin" />
        <Typography variant="bodySm" className="font-black uppercase tracking-widest opacity-40">Loading Review Terminal...</Typography>
      </div>
    }>
      <ReviewsContent />
    </Suspense>
  );
}
