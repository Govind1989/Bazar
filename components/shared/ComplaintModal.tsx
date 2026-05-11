"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Image as ImageIcon, 
  Video, 
  X,
  ChevronRight,
  ShieldAlert,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { RECENT_ORDERS } from "@/data/mock";

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: any;
}

export function ComplaintModal({ isOpen, onClose, initialItem }: ComplaintModalProps) {
  const { addComplaint } = useUserStore();
  const [selectedItem, setSelectedItem] = useState<any>(initialItem || null);
  const [reason, setReason] = useState("");
  const [proofType, setProofType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !reason) return;

    setIsSubmitting(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    addComplaint({
      itemId: selectedItem.id,
      itemName: selectedItem.product,
      itemType: selectedItem.type || 'PRODUCT',
      vendorId: selectedItem.vendorId || 'v1',
      reason,
      proofType,
      proofUrl: proofType === 'IMAGE' 
        ? "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=200&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=200&auto=format&fit=crop"
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setSelectedItem(null);
      setReason("");
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
                   className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl shadow-green-500/20"
                 >
                    <CheckCircle2 className="w-16 h-16" />
                 </motion.div>
                 <div className="space-y-2">
                    <Typography variant="titleMd" className="font-black uppercase tracking-tighter text-3xl">Report Submitted</Typography>
                    <Typography variant="bodySm" className="opacity-40 text-sm font-bold uppercase tracking-widest">Your audit ticket has been initialized.</Typography>
                 </div>
              </div>
            ) : (
              <>
                <div className="p-8 md:p-12 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-xl shadow-red-500/20">
                         <ShieldAlert className="w-8 h-8" />
                      </div>
                      <div>
                         <Typography variant="titleMd" className="font-black uppercase tracking-tighter text-3xl">Dispute Audit</Typography>
                         <Typography variant="bodySm" className="opacity-40 text-xs font-black uppercase tracking-[0.3em]">Initialize official dissatisfaction report</Typography>
                      </div>
                   </div>
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     onClick={onClose} 
                     className="rounded-full w-12 h-12 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                     disabled={isSubmitting}
                   >
                      <X className="w-6 h-6" />
                   </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                   <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                      <div className="space-y-10">
                         <div className="space-y-6">
                            <div className="flex items-center justify-between">
                               <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Purchase History</Typography>
                               {!initialItem && selectedItem && (
                                 <Button 
                                   variant="ghost" 
                                   size="sm" 
                                   onClick={() => setSelectedItem(null)}
                                   className="h-6 text-[8px] font-black uppercase tracking-widest text-red-500 p-0 hover:bg-transparent"
                                 >
                                    Change Selection
                                 </Button>
                               )}
                            </div>

                            {!selectedItem ? (
                              <div className="grid grid-cols-1 gap-3 max-h-[400px] pr-4 custom-scrollbar">
                                 {RECENT_ORDERS.map((order) => (
                                   <button
                                     key={order.id}
                                     type="button"
                                     onClick={() => setSelectedItem(order)}
                                     className="flex items-center gap-5 p-5 rounded-[2rem] border-2 border-bazar-gray-100 dark:border-bazar-gray-900 transition-all text-left hover:border-bazar-black dark:hover:border-bazar-white hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 group"
                                   >
                                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                         <Typography variant="titleSm" className="text-sm font-black opacity-20 group-hover:opacity-100 transition-opacity">#{order.id.slice(4)}</Typography>
                                      </div>
                                      <div className="min-w-0 flex-1">
                                         <Typography variant="titleSm" className="text-sm font-black uppercase tracking-tighter truncate leading-tight">{order.product}</Typography>
                                         <div className="flex items-center gap-2 mt-1">
                                            <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-black">{order.date}</Typography>
                                            <div className="w-1 h-1 rounded-full bg-bazar-gray-200" />
                                            <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-black">{order.type}</Typography>
                                         </div>
                                      </div>
                                   </button>
                                 ))}
                              </div>
                            ) : (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 rounded-[2.5rem] bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-2 border-bazar-black dark:border-bazar-white shadow-2xl relative overflow-hidden group"
                              >
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-black/5 rounded-full -mr-16 -mt-16" />
                                 <div className="relative z-10 flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center border border-white/20 dark:border-black/20">
                                       <ShieldAlert className="w-8 h-8 opacity-40" />
                                    </div>
                                    <div className="flex-1">
                                       <Typography variant="titleMd" className="text-xl font-black uppercase tracking-tighter leading-tight">{selectedItem.product}</Typography>
                                       <Typography variant="bodySm" className="text-[10px] opacity-60 uppercase tracking-widest font-black mt-1">Order Ref: {selectedItem.id}</Typography>
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
                            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Detailed Statement</Typography>
                            <div className="relative">
                               <textarea 
                                 value={reason}
                                 onChange={(e) => setReason(e.target.value)}
                                 placeholder="Explain the nature of dissatisfaction in detail..."
                                 className="w-full bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[2rem] p-8 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all text-sm min-h-[200px] resize-none font-medium leading-relaxed"
                                 required
                                 disabled={isSubmitting}
                               />
                               <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-20">
                                  <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-widest">{reason.length} CHARS</Typography>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-10 flex flex-col">
                         <div className="space-y-8 flex-1">
                            <div className="space-y-6">
                               <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Proof of Dissatisfaction</Typography>
                               <div className="grid grid-cols-2 gap-4">
                                  <button 
                                    type="button"
                                    onClick={() => setProofType('IMAGE')}
                                    className={cn(
                                      "h-16 rounded-[1.5rem] border-2 flex items-center justify-center gap-3 transition-all group/btn",
                                      proofType === 'IMAGE' 
                                        ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-bazar-black dark:border-bazar-white shadow-xl" 
                                        : "bg-transparent border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white"
                                    )}
                                    disabled={isSubmitting}
                                  >
                                     <ImageIcon className={cn("w-5 h-5", proofType === 'IMAGE' ? "opacity-100" : "opacity-20 group-hover/btn:opacity-100")} />
                                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">High-Res Image</span>
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => setProofType('VIDEO')}
                                    className={cn(
                                      "h-16 rounded-[1.5rem] border-2 flex items-center justify-center gap-3 transition-all group/btn",
                                      proofType === 'VIDEO' 
                                        ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-bazar-black dark:border-bazar-white shadow-xl" 
                                        : "bg-transparent border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white"
                                    )}
                                    disabled={isSubmitting}
                                  >
                                     <Video className={cn("w-5 h-5", proofType === 'VIDEO' ? "opacity-100" : "opacity-20 group-hover/btn:opacity-100")} />
                                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Video Evidence</span>
                                  </button>
                               </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center p-10 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[3rem] bg-bazar-gray-50/20 dark:bg-bazar-gray-950/20 group hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors">
                               <Upload className="w-12 h-12 mb-6 opacity-10 group-hover:opacity-40 group-hover:-translate-y-2 transition-all duration-500" />
                               <Typography variant="titleSm" className="font-black uppercase tracking-widest text-center">Drag & Drop Proof</Typography>
                               <Typography variant="bodySm" className="text-[9px] opacity-40 mt-2 uppercase tracking-widest font-bold">Max file size: 25MB</Typography>
                               <Button variant="outline" size="sm" className="mt-8 h-10 px-8 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white dark:bg-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900" disabled={isSubmitting}>
                                  Browse Files
                                </Button>
                            </div>
                         </div>
                         
                         <div className="pt-10 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                            <Button 
                              type="submit"
                              className="w-full h-20 rounded-[2rem] bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-4"
                              disabled={!selectedItem || !reason || isSubmitting}
                            >
                               {isSubmitting ? (
                                 <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Auditing Report...
                                 </>
                               ) : (
                                 <>
                                    Submit Official Audit Request
                                    <ChevronRight className="w-5 h-5" />
                                 </>
                               )}
                            </Button>
                         </div>
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
