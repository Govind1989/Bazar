"use client";

import { useEffect } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { TEMPLATES } from "@/types/cms";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TemplateEngine } from "@/components/templates/TemplateEngine";
import { VENDORS, PRODUCTS } from "@/data/mock";
import { cn } from "@/lib/utils";
import { 
  Palette, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Save, 
  RotateCcw,
  Smartphone,
  Monitor
} from "lucide-react";

export default function CMSCustomizerPage() {
  const { previewConfig, init, updateConfig, updateTheme, isDirty, save } = useCMSStore();
  
  // Using Himalayan Bakery for this demo as it's a food vendor
  const vendor = VENDORS[1];
  const vendorProducts = PRODUCTS.filter(p => p.vendorId === vendor.id);

  useEffect(() => {
    init(vendor.id);
  }, []);

  if (!previewConfig) return null;

  const filteredTemplates = TEMPLATES.filter(t => 
    t.category === 'all' || t.category === previewConfig.category
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-bazar-gray-50 dark:bg-bazar-black">
      {/* Editor Sidebar */}
      <aside className="w-[400px] border-r border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-gray-950 overflow-y-auto p-8 space-y-12">
        <div>
          <Typography variant="titleLg" className="mb-2">Store Design</Typography>
          <Typography variant="bodySm" className="opacity-60">Customize your storefront's visual identity.</Typography>
        </div>

        {/* Template Selection */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Layout className="w-4 h-4 opacity-40" />
            <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] font-bold">Template</Typography>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {filteredTemplates.map(t => (
               <button 
                 key={t.id}
                 onClick={() => updateConfig({ templateId: t.id })}
                 className={cn(
                   "group relative aspect-video rounded-lg overflow-hidden border-2 transition-all",
                   previewConfig.templateId === t.id ? "border-bazar-black dark:border-bazar-white" : "border-transparent opacity-40 hover:opacity-100"
                 )}
               >
                  <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-bazar-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Typography variant="bodySm" className="text-white text-[10px] font-bold uppercase">{t.name}</Typography>
                  </div>
               </button>
             ))}
          </div>
        </section>

        {/* Branding */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 opacity-40" />
            <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] font-bold">Branding</Typography>
          </div>
          
          <div className="space-y-4">
             <div>
                <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block">Primary Color</label>
                <div className="flex items-center gap-3">
                   <input 
                      type="color" 
                      value={previewConfig.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-md border-none cursor-pointer bg-transparent"
                   />
                   <Typography variant="bodySm" className="font-mono text-xs uppercase">{previewConfig.theme.primaryColor}</Typography>
                </div>
             </div>

             <div>
                <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block">Typography</label>
                <div className="flex gap-2">
                   {['sans', 'mono', 'serif'].map((font: any) => (
                     <button 
                        key={font}
                        onClick={() => updateTheme({ fontFamily: font })}
                        className={cn(
                          "px-3 py-1.5 rounded-md border text-xs capitalize transition-all",
                          previewConfig.theme.fontFamily === font ? "bg-bazar-black text-white border-transparent" : "border-bazar-gray-200 dark:border-bazar-gray-800"
                        )}
                     >
                        {font}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* Content */}
        <section className="space-y-6">
           <div className="flex items-center gap-2">
            <Type className="w-4 h-4 opacity-40" />
            <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] font-bold">Hero Content</Typography>
          </div>
          <div className="space-y-4">
             <div>
                <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block">Main Title</label>
                <input 
                  type="text" 
                  value={previewConfig.heroTitle}
                  onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                  className="w-full bg-bazar-gray-50 dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-md p-3 text-sm outline-none focus:border-bazar-black"
                />
             </div>
             <div>
                <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block">Subtitle</label>
                <textarea 
                  value={previewConfig.heroSubtitle}
                  onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                  rows={3}
                  className="w-full bg-bazar-gray-50 dark:bg-bazar-black border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-md p-3 text-sm outline-none focus:border-bazar-black"
                />
             </div>
          </div>
        </section>

        {/* Floating Save Bar (Internal to Sidebar) */}
        <div className={cn(
          "sticky bottom-0 left-0 right-0 py-4 bg-white dark:bg-bazar-gray-950 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex gap-3 transition-all duration-500 transform",
          isDirty ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}>
           <Button variant="outline" className="flex-1 gap-2" size="sm">
              <RotateCcw className="w-3 h-3" /> Reset
           </Button>
           <Button className="flex-1 gap-2" size="sm" onClick={save}>
              <Save className="w-3 h-3" /> Publish
           </Button>
        </div>
      </aside>

      {/* Live Preview Container */}
      <main className="flex-1 relative flex flex-col items-center p-12 bg-bazar-gray-100 dark:bg-bazar-black overflow-y-auto">
         {/* Preview Toolbar */}
         <div className="bg-bazar-white dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-full px-6 py-2 mb-8 flex items-center gap-8 shadow-xl">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-widest">Live Preview</Typography>
            </div>
            <div className="flex items-center gap-4 border-l border-bazar-gray-200 dark:border-bazar-gray-800 pl-8">
               <Monitor className="w-4 h-4 opacity-100 cursor-pointer" />
               <Smartphone className="w-4 h-4 opacity-30 cursor-pointer" />
            </div>
         </div>

         {/* Actual Preview Canvas */}
         <Card className="w-full max-w-[1100px] border-none shadow-2xl overflow-hidden min-h-screen origin-top transition-all">
            <TemplateEngine 
              vendor={vendor} 
              cms={previewConfig} 
              products={vendorProducts} 
            />
         </Card>
      </main>
    </div>
  );
}
