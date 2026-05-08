"use client";

import { useState } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { VendorCategory, VendorSubCategory } from "@/types/cms";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FileText,
  Edit2,
  Check,
  X,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CategoryManager() {
  const { previewConfig, addCategory, deleteCategory, updateCategory, addSubCategory, deleteSubCategory, updateSubCategory } = useCMSStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = previewConfig?.categories?.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCategory = previewConfig?.categories?.find(c => c.id === selectedCategoryId);

  const handleAddCategory = () => {
    const name = prompt("Enter category name:");
    if (name) {
      addCategory({ name, slug: name.toLowerCase().replace(/\s+/g, '-') });
    }
  };

  const handleAddSubCategory = () => {
    if (!selectedCategoryId) return;
    const name = prompt("Enter sub-category name:");
    if (name) {
      addSubCategory(selectedCategoryId, { name, slug: name.toLowerCase().replace(/\s+/g, '-') });
    }
  };

  const startEditing = (id: string, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const saveEdit = (categoryId: string, subCategoryId?: string) => {
    if (subCategoryId) {
      updateSubCategory(categoryId, subCategoryId, { name: editValue, slug: editValue.toLowerCase().replace(/\s+/g, '-') });
    } else {
      updateCategory(categoryId, { name: editValue, slug: editValue.toLowerCase().replace(/\s+/g, '-') });
    }
    setEditingId(null);
  };

  if (!previewConfig) return null;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-20" />
        <input 
          type="text" 
          placeholder="Search taxonomies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bazar-gray-100/50 dark:bg-bazar-gray-900/50 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-2.5 sm:py-3 text-[13px] sm:text-sm outline-none focus:ring-2 ring-fuchsia-600/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 min-h-[400px]">
        {/* Categories Column */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-2">
            <Typography variant="titleSm" className="uppercase tracking-widest text-[9px] sm:text-[10px] font-black opacity-40">Categories</Typography>
            <Button size="sm" variant="ghost" className="h-7 sm:h-8 px-2 sm:px-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/20 text-fuchsia-600" onClick={handleAddCategory}>
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add
            </Button>
          </div>

          <div className="space-y-2">
            {filteredCategories?.map((category) => (
              <div 
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={cn(
                  "group flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer",
                  selectedCategoryId === category.id 
                    ? "bg-fuchsia-50 dark:bg-fuchsia-950/30 border-fuchsia-200 dark:border-fuchsia-800 ring-1 ring-fuchsia-600/10" 
                    : "bg-bazar-white dark:bg-bazar-gray-950 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-gray-300 dark:hover:border-bazar-gray-700"
                )}
              >
                <div className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors shrink-0",
                  selectedCategoryId === category.id ? "bg-fuchsia-600 text-white" : "bg-bazar-gray-100 dark:bg-bazar-gray-900 text-bazar-gray-400 group-hover:text-fuchsia-600"
                )}>
                  <Folder className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                
                {editingId === category.id ? (
                  <div className="flex-1 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <input 
                      type="text" 
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 bg-transparent border-b border-fuchsia-600 outline-none text-[11px] sm:text-xs font-bold py-1"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(category.id)} className="p-1 hover:bg-green-50 rounded"><Check className="w-3.5 h-3.5 text-green-500" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 hover:bg-red-50 rounded"><X className="w-3.5 h-3.5 text-red-500" /></button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <Typography variant="bodySm" className="text-[11px] sm:text-xs font-black uppercase tracking-tight truncate">{category.name}</Typography>
                      <Typography variant="bodySm" className="text-[9px] sm:text-[10px] opacity-40">{category.subCategories.length} subs</Typography>
                    </div>
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                      <button onClick={() => startEditing(category.id, category.name)} className="p-1.5 sm:p-2 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/40 rounded-lg sm:rounded-xl"><Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-40" /></button>
                      <button onClick={() => deleteCategory(category.id)} className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg sm:rounded-xl text-red-500"><Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>
                    </div>
                    <ChevronRight className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform opacity-20 shrink-0", selectedCategoryId === category.id && "translate-x-1 opacity-100")} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subcategories Column */}
        <div className={cn(
          "space-y-3 sm:space-y-4 transition-all",
          !selectedCategoryId && "hidden lg:block opacity-20 pointer-events-none grayscale"
        )}>
          <div className="flex items-center justify-between px-2">
            <Typography variant="titleSm" className="uppercase tracking-widest text-[9px] sm:text-[10px] font-black opacity-40">
              {selectedCategory ? `${selectedCategory.name} Subs` : "Sub-categories"}
            </Typography>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 sm:h-8 px-2 sm:px-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-blue-950/20 text-blue-600"
              onClick={handleAddSubCategory}
              disabled={!selectedCategoryId}
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add
            </Button>
          </div>

          <div className="space-y-2">
            {selectedCategory?.subCategories.map((sub) => (
              <div 
                key={sub.id} 
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-bazar-white dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl sm:rounded-2xl hover:border-blue-200 dark:hover:border-blue-800 transition-all"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                
                {editingId === sub.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input 
                      type="text" 
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 bg-transparent border-b border-blue-600 outline-none text-[11px] sm:text-xs font-bold py-1"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(selectedCategoryId!, sub.id)} className="p-1 hover:bg-green-50 rounded"><Check className="w-3.5 h-3.5 text-green-500" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 hover:bg-red-50 rounded"><X className="w-3.5 h-3.5 text-red-500" /></button>
                  </div>
                ) : (
                  <>
                    <Typography variant="bodySm" className="flex-1 text-[11px] sm:text-xs font-bold opacity-70 truncate">{sub.name}</Typography>
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEditing(sub.id, sub.name)} className="p-1.5 sm:p-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg sm:rounded-xl"><Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-40" /></button>
                      <button onClick={() => deleteSubCategory(selectedCategoryId!, sub.id)} className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg sm:rounded-xl text-red-500"><Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {selectedCategory && selectedCategory.subCategories.length === 0 && (
              <div className="py-12 sm:py-20 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl sm:rounded-2xl">
                <Typography variant="bodySm" className="italic opacity-30 text-xs">No sub-categories yet.</Typography>
              </div>
            )}
            {!selectedCategoryId && (
              <div className="py-12 sm:py-20 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl sm:rounded-2xl">
                <Typography variant="bodySm" className="italic opacity-30 text-xs">Select a category to manage.</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
