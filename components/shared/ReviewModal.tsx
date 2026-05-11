"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Image as ImageIcon, 
  Video, 
  X,
  ChevronRight,
  Upload,
  Package,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { RECENT_ORDERS } from "@/data/mock";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: any;
}

export function ReviewModal({ isOpen, onClose, initialItem }: ReviewModalProps) {
  const { addReview } = useUserStore();
  const [selectedItem, setSelectedItem] = useState<any>(initialItem || null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [proofType, setProofType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !comment) return;

    setIsSubmitting(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    addReview({
      itemId: selectedItem.id,
      itemName: selectedItem.product,
      itemType: selectedItem.type || 'PRODUCT',
      vendorId: selectedItem.vendorId || 'v1',
      rating,
      comment,
      proofType,
      proofUrl: proofType === 'IMAGE' 
        ? "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=200&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200&auto=format&fit=crop"
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setSelectedItem(null);
      setComment("");
      setRating(5);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()}
            className="absolute inset-0 bg-bazar-black/80 backdrop-blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl bg-white dark:bg-bazar-black rounded-[4rem] shadow-2xl overflow-hidden border-2 border-bazar-black dark:border-bazar-white max-h-[90vh] flex flex-col"
          >
            {showSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-8">
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="w-32 h-32 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-2xl shadow-amber-500/20"
                 >
                    <Award className="w-16 h-16" />
                 </motion.div>
                 <div className="space-y-2">
                    <Typography variant="titleMd" className="font-black uppercase tracking-tighter text-3xl">Review Published</Typography>
                    <Typography variant="bodySm" className="opacity-40 text-sm font-bold uppercase tracking-widest">You've earned +25 Heritage Points!</Typography>
                 </div>
              </div>
            ) : (
              <>
                <div className="p-8 md:p-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                         <Star className="w-8 h-8 fill-white" />
                      </div>
                      <div>
                         <Typography variant="titleMd" className="font-black uppercase tracking-tighter text-3xl">Product Review</Typography>
                         <Typography variant="bodySm" className="opacity-40 text-xs font-black uppercase tracking-[0.3em]">Share your heritage experience</Typography>
                      </div>
                   </div>
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     onClick={onClose} 
                     className="rounded-full w-12 h-12 hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                     disabled={isSubmitting}
                   >
                      <X className="w-6 h-6" />
                   </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                   <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                      <div className="space-y-10">
                         <div className="space-y-6">
                            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Item to Review</Typography>
                            
                            {!selectedItem ? (
                              <div className="grid grid-cols-1 gap-3 max-h-[300px] pr-4 custom-scrollbar">
                                 {RECENT_ORDERS.map((order) => (
                                   <button
                                     key={order.id}
                                     type="button"
                                     onClick={() => setSelectedItem(order)}
                                     className="flex items-center gap-5 p-5 rounded-[2rem] border-2 border-bazar-gray-100 dark:border-bazar-gray-900 transition-all text-left hover:border-bazar-black dark:hover:border-bazar-white hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 group"
                                   >
                                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-black border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center group-hover:rotate-12 transition-transform">
                                         <Package className="w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                         <Typography variant="titleSm" className="text-sm font-black uppercase tracking-tighter truncate leading-tight">{order.product}</Typography>
                                         <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-black">{order.date}</Typography>
                                      </div>
                                   </button>
                                 ))}
                              </div>
                            ) : (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 rounded-[2.5rem] bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-2 border-bazar-black dark:border-bazar-white relative overflow-hidden group"
                              >
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                 <div className="relative z-10 flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center border border-white/20 dark:border-black/20">
                                       <Package className="w-8 h-8 opacity-40" />
                                    </div>
                                    <div className="flex-1">
                                       <Typography variant="titleMd" className="text-xl font-black uppercase tracking-tighter leading-tight">{selectedItem.product}</Typography>
                                       <Typography variant="bodySm" className="text-[10px] opacity-60 uppercase tracking-widest font-black mt-1">Ready for feedback</Typography>
                                    </div>
                                    {!initialItem && (
                                      <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)} className="text-white dark:text-black opacity-40 hover:opacity-100">
                                         <X className="w-4 h-4" />
                                      </Button>
                                    )}
                                 </div>
                              </motion.div>
                            )}
                         </div>

                         <div className="space-y-6">
                            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Your Rating</Typography>
                            <div className="flex flex-col items-center gap-4 p-10 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 rounded-[3rem] border-2 border-bazar-gray-100 dark:border-bazar-gray-900 group">
                               <div className="flex gap-4">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <motion.button
                                      key={s}
                                      type="button"
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.8 }}
                                      onClick={() => setRating(s)}
                                      onMouseEnter={() => setHoverRating(s)}
                                      onMouseLeave={() => setHoverRating(0)}
                                      className="relative"
                                    >
                                       <Star 
                                         className={cn(
                                           "w-10 h-10 transition-all duration-300",
                                           s <= (hoverRating || rating)
                                             ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                                             : "text-bazar-gray-200 dark:text-bazar-gray-800"
                                         )}
                                       />
                                    </motion.button>
                                  ))}
                               </div>
                               <Typography variant="titleSm" className="font-black uppercase tracking-[0.3em] text-[10px] mt-2 text-amber-500">
                                  {rating === 5 ? "Exceptional" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                               </Typography>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-10 flex flex-col">
                         <div className="space-y-6">
                            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Your Experience</Typography>
                            <textarea 
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Tell the community about the quality, delivery, and overall experience..."
                              className="w-full bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[2rem] p-8 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all text-sm min-h-[160px] resize-none font-medium leading-relaxed"
                              required
                              disabled={isSubmitting}
                            />
                         </div>

                         <div className="space-y-6 flex-1">
                            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Visual Feedback (Optional)</Typography>
                            <div className="flex gap-4 mb-4">
                               <button 
                                 type="button"
                                 onClick={() => setProofType('IMAGE')}
                                 className={cn(
                                   "flex-1 h-12 rounded-xl border-2 flex items-center justify-center gap-2 transition-all",
                                   proofType === 'IMAGE' ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-bazar-black dark:border-bazar-white" : "border-bazar-gray-100 dark:border-bazar-gray-900 opacity-40"
                                 )}
                               >
                                  <ImageIcon className="w-4 h-4" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Photo</span>
                               </button>
                               <button 
                                 type="button"
                                 onClick={() => setProofType('VIDEO')}
                                 className={cn(
                                   "flex-1 h-12 rounded-xl border-2 flex items-center justify-center gap-2 transition-all",
                                   proofType === 'VIDEO' ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-bazar-black dark:border-bazar-white" : "border-bazar-gray-100 dark:border-bazar-gray-900 opacity-40"
                                 )}
                               >
                                  <Video className="w-4 h-4" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Video</span>
                               </button>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[2.5rem] bg-bazar-gray-50/20 dark:bg-bazar-gray-950/20 group hover:bg-bazar-gray-50 transition-colors">
                               <Upload className="w-10 h-10 mb-4 opacity-10 group-hover:opacity-40 transition-all" />
                               <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest opacity-40">Add Proof of Excellence</Typography>
                            </div>
                         </div>

                         <Button 
                           type="submit"
                           className="w-full h-20 rounded-[2rem] bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                           disabled={!selectedItem || !comment || isSubmitting}
                         >
                            {isSubmitting ? (
                              <>
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 Publishing...
                              </>
                            ) : (
                              <>
                                 Publish Heritage Review
                                 <ChevronRight className="w-5 h-5" />
                              </>
                            )}
                         </Button>
                      </div>
                   </form>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
