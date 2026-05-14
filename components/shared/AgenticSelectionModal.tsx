"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShoppingCart, Store } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SelectionItem {
  id: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  type: 'PRODUCT' | 'VENDOR';
}

interface AgenticSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: SelectionItem[];
  onSelect: (item: SelectionItem) => void;
}

export function AgenticSelectionModal({ isOpen, onClose, title, items, onSelect }: AgenticSelectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bazar-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
               <div>
                  <Typography variant="titleLg" className="font-black uppercase tracking-tighter">{title}</Typography>
                  <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Select an option to continue the agentic task</Typography>
               </div>
               <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="w-4 h-4" />
               </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => (
                  <Card 
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="p-4 cursor-pointer border-2 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center text-bazar-black/40 dark:text-bazar-white/40 shrink-0">
                        {item.type === 'PRODUCT' ? <ShoppingCart className="w-6 h-6" /> : <Store className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <Typography variant="titleSm" className="font-black text-xs uppercase tracking-tight">{item.name}</Typography>
                        {item.price && (
                          <Typography variant="bodySm" className="text-xs font-bold text-green-600">Rs. {item.price}</Typography>
                        )}
                        <Typography variant="bodySm" className="text-[10px] opacity-40 leading-tight mt-1 line-clamp-2">{item.description || "No description available."}</Typography>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-t border-bazar-gray-100 dark:border-bazar-gray-900 text-center">
              <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-[0.2em]">Human-in-the-Loop Validation Required</Typography>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
