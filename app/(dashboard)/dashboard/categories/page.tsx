"use client";

import { useEffect } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { CategoryManager } from "@/components/shared/CategoryManager";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Check, Tags } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DashboardCategoriesPage() {
  const { previewConfig, init, isDirty, save, reset } = useCMSStore();
  const { user } = useAuthStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const targetId = user?.vendorId || user?.id;
    if (targetId) {
      init(targetId);
    }
  }, [user?.id, user?.vendorId]);

  const handlePublish = async () => {
    const targetId = user?.vendorId || user?.id;
    if (!targetId) return;
    setIsPublishing(true);
    save(targetId);
    await new Promise(r => setTimeout(r, 600));
    setIsPublishing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const targetId = user?.vendorId || user?.id;

  if (!previewConfig) return null;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-600">
              <Tags className="w-5 h-5" />
            </div>
            <Typography variant="titleLg" className="text-xl md:text-2xl font-black uppercase tracking-tighter">Taxonomy Management</Typography>
          </div>
          <Typography variant="bodySm" className="text-xs md:text-sm opacity-60 font-medium max-w-xl leading-relaxed">
            Define and manage your store's categories and sub-categories to help customers find your products easily.
          </Typography>
        </div>

        <div className="flex gap-2 md:gap-3 w-full md:w-auto">
           <Button 
             variant="outline" 
             size="sm" 
             className="flex-1 md:flex-none h-10 gap-2 text-[10px] uppercase font-black tracking-widest border-bazar-gray-200 dark:border-bazar-gray-800" 
             onClick={() => targetId && reset(targetId)}
             disabled={!isDirty}
           >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
           </Button>
           <Button 
             size="sm" 
             className="flex-2 md:flex-none h-10 gap-2 text-[10px] md:text-[11px] uppercase font-black tracking-widest px-6 shadow-xl" 
             onClick={handlePublish} 
             disabled={!isDirty || isPublishing}
           >
              {showSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  Saved Changes
                </>
              ) : (
                <>
                  <Save className={cn("w-3.5 h-3.5", isPublishing && "animate-spin")} /> 
                  {isPublishing ? 'Saving...' : 'Save & Publish'}
                </>
              )}
           </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[2rem] p-4 md:p-10 shadow-2xl shadow-black/[0.02]">
        <CategoryManager />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-6 md:p-8 bg-fuchsia-50/30 dark:bg-fuchsia-950/10 border-fuchsia-500/10 rounded-[1.5rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 -mr-12 -mt-12 rounded-full group-hover:scale-125 transition-transform" />
           <Typography variant="titleSm" className="mb-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-fuchsia-700 dark:text-fuchsia-400">Visibility Tip</Typography>
           <Typography variant="bodySm" className="text-[11px] md:text-xs text-fuchsia-900/60 dark:text-fuchsia-200/60 leading-relaxed font-medium">
             Your public store navigation is automatically synchronized with this tree. Ensure categories are marked as <span className="text-fuchsia-700 dark:text-fuchsia-400 font-bold italic">"Active"</span> to show them to your customers.
           </Typography>
        </Card>
        <Card className="p-6 md:p-8 bg-blue-50/30 dark:bg-blue-950/10 border-blue-500/10 rounded-[1.5rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 -mr-12 -mt-12 rounded-full group-hover:scale-125 transition-transform" />
           <Typography variant="titleSm" className="mb-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">Product Linking</Typography>
           <Typography variant="bodySm" className="text-[11px] md:text-xs text-blue-900/60 dark:text-blue-200/60 leading-relaxed font-medium">
             After creating categories, go to <span className="text-blue-700 dark:text-blue-400 font-bold">Inventory</span> to assign your products to these specific classifications for maximum discoverability.
           </Typography>
        </Card>
      </div>
    </div>
  );
}
