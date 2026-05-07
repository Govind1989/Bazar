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
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tags className="w-5 h-5 text-fuchsia-600" />
            <Typography variant="titleLg">Taxonomy Management</Typography>
          </div>
          <Typography variant="bodySm" className="opacity-60">
            Define and manage your store's categories and sub-categories to help customers find your products easily.
          </Typography>
        </div>

        <div className="flex gap-3">
           <Button 
             variant="outline" 
             size="sm" 
             className="gap-2" 
             onClick={() => targetId && reset(targetId)}
             disabled={!isDirty}
           >
              <RotateCcw className="w-3 h-3" /> Reset
           </Button>
           <Button 
             size="sm" 
             className="gap-2" 
             onClick={handlePublish} 
             disabled={!isDirty || isPublishing}
           >
              {showSuccess ? (
                <>
                  <Check className="w-3 h-3 text-green-500" />
                  Saved Changes
                </>
              ) : (
                <>
                  <Save className={cn("w-3 h-3", isPublishing && "animate-spin")} /> 
                  {isPublishing ? 'Saving...' : 'Save & Publish'}
                </>
              )}
           </Button>
        </div>
      </div>

      <div className="bg-bazar-white dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl p-8 shadow-sm">
        <CategoryManager />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-fuchsia-50 dark:bg-fuchsia-950/20 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-900/50">
           <Typography variant="titleSm" className="mb-2 text-fuchsia-900 dark:text-fuchsia-100">Visibility Tip</Typography>
           <Typography variant="bodySm" className="text-fuchsia-800/60 dark:text-fuchsia-200/60">
             Your public store navigation is automatically synchronized with this tree. Ensure categories are marked as "Active" to show them to your customers.
           </Typography>
        </div>
        <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
           <Typography variant="titleSm" className="mb-2 text-blue-900 dark:text-blue-100">Product Linking</Typography>
           <Typography variant="bodySm" className="text-blue-800/60 dark:text-blue-200/60">
             After creating categories, go to Inventory to assign your products to these specific classifications.
           </Typography>
        </div>
      </div>
    </div>
  );
}
