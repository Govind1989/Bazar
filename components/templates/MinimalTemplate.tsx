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

export function MinimalTemplate({ vendor, cms, products }: TemplateProps) {
  const { theme } = cms;

  return (
    <div className={cn(
      "min-h-screen bg-bazar-white dark:bg-bazar-black transition-colors duration-500",
      theme.fontFamily === 'mono' ? 'font-mono' : theme.fontFamily === 'serif' ? 'font-serif' : 'font-sans'
    )}>
      {/* Dynamic Header Style */}
      <header className={cn(
        "h-20 flex items-center justify-between px-6 md:px-12 border-b transition-all",
        theme.headerStyle === 'transparent' 
          ? "bg-transparent border-transparent" 
          : "bg-bazar-white dark:bg-bazar-black border-bazar-gray-100 dark:border-bazar-gray-900"
      )}>
        <Typography variant="titleMd" className="font-bold tracking-tighter">
          {vendor.name.toUpperCase()}
        </Typography>
        <div className="flex gap-6">
           <Typography variant="navLink" className="opacity-60 cursor-pointer hover:opacity-100">Shop</Typography>
           <Typography variant="navLink" className="opacity-60 cursor-pointer hover:opacity-100">About</Typography>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
           <Typography variant="displayLg" className="mb-6 leading-[1.05]">
              {cms.heroTitle}
           </Typography>
           <Typography variant="bodyMd" className="text-xl mb-10 max-w-md opacity-60">
              {cms.heroSubtitle}
           </Typography>
           <Button 
              size="lg" 
              style={{ 
                 backgroundColor: theme.primaryColor, 
                 color: '#fff',
                 borderRadius: theme.borderRadius === 'none' ? '0px' : theme.borderRadius === 'md' ? '8px' : theme.borderRadius === 'lg' ? '12px' : '9999px'
              }}
           >
              Shop Collection
           </Button>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-bazar-gray-100 dark:border-bazar-gray-900 shadow-2xl">
           <Image 
              src={cms.heroImage} 
              alt={vendor.name} 
              fill 
              className="object-cover"
           />
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-t border-bazar-gray-100 dark:border-bazar-gray-900">
        <Typography variant="displaySm" className="mb-16">Selected Items</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {products.map(p => (
             <ProductCard key={p.id} product={p} />
           ))}
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 md:px-12 py-24 bg-bazar-gray-50 dark:bg-bazar-gray-950">
         <div className="max-w-3xl mx-auto text-center">
            <Typography variant="displaySm" className="mb-6">{cms.aboutTitle}</Typography>
            <Typography variant="bodyMd" className="text-lg leading-relaxed opacity-80">
               {cms.aboutContent}
            </Typography>
         </div>
      </section>
    </div>
  );
}
