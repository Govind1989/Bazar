import { Typography } from "@/components/ui/typography";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { VendorCMS } from "@/types/cms";
import { Product, Vendor } from "@/data/mock";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TemplateProps {
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}

export function BoldTemplate({ vendor, cms, products }: TemplateProps) {
  const { theme } = cms;

  return (
    <div className={cn(
      "min-h-screen bg-bazar-black text-bazar-white transition-all duration-700",
      theme.fontFamily === 'mono' ? 'font-mono' : theme.fontFamily === 'serif' ? 'font-serif' : 'font-sans'
    )}>
      {/* Centered Header */}
      <header className="h-24 flex items-center justify-center border-b border-bazar-gray-900 bg-bazar-black/50 backdrop-blur-xl sticky top-0 z-30">
        <Typography variant="displaySm" className="text-white tracking-widest font-black uppercase">
          {vendor.name}
        </Typography>
      </header>

      {/* Massive Centered Hero */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
              src={cms.heroImage} 
              alt="Hero" 
              fill 
              className="object-cover opacity-40 grayscale"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-bazar-black via-transparent to-bazar-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl animate-in fade-in zoom-in-95 duration-1000">
           <Typography variant="displayXl" className="text-white mb-8 drop-shadow-2xl">
              {cms.heroTitle}
           </Typography>
           <Typography variant="bodyMd" className="text-2xl text-bazar-gray-300 mb-12 font-light">
              {cms.heroSubtitle}
           </Typography>
           <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-14 px-10 text-lg font-black tracking-widest"
                style={{ 
                   backgroundColor: theme.primaryColor, 
                   color: '#fff',
                   borderRadius: theme.borderRadius === 'full' ? '9999px' : '0px'
                }}
              >
                DISCOVER NOW
              </Button>
           </div>
        </div>
      </section>

      {/* High Contrast Product Grid */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24">
           <Typography variant="displayMd" className="text-white mb-4 italic">The Collection</Typography>
           <div className="w-24 h-1 bg-bazar-white" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
           {products.map(p => (
             <div key={p.id} className="group">
                <ProductCard product={p} />
                <Button variant="outline" className="w-full mt-6 border-bazar-gray-800 hover:border-bazar-white text-xs uppercase tracking-widest py-6">
                   View Details
                </Button>
             </div>
           ))}
        </div>
      </section>

      {/* Bold About Section */}
      <section className="py-32 bg-bazar-gray-950 border-y border-bazar-gray-900">
         <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <Typography variant="displayLg" className="text-white leading-tight">
               {cms.aboutTitle}
            </Typography>
            <Typography variant="bodyMd" className="text-xl leading-relaxed text-bazar-gray-400">
               {cms.aboutContent}
            </Typography>
         </div>
      </section>

      {/* Dark Footer */}
      <footer className="py-20 text-center border-t border-bazar-gray-900">
         <Typography variant="bodySm" className="opacity-20 uppercase tracking-[0.5em]">
            &copy; 2026 {vendor.name} — BAZAR ECOSYSTEM
         </Typography>
      </footer>
    </div>
  );
}
