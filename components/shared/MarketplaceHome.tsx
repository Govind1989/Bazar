import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { PRODUCTS, VENDORS, CATEGORIES } from "@/data/mock";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function MarketplaceHome() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <Typography variant="displayXl" as="h1" className="mb-8">
            The better way to <span className="text-bazar-gray-400">trade</span> in Nepal.
          </Typography>
          <Typography variant="bodyMd" className="text-xl mb-12 max-w-xl">
            A unified ecosystem for multi-category vendors. 
            Launch your store in minutes with AI-scaffolding 
            and reach customers across the country.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Get Started for Free</Button>
            <Button variant="outline" size="lg">Browse Marketplace</Button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <Card variant="surface" className="p-8 aspect-[4/5] overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bazar-black/20 z-10" />
             <Image 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                alt="Marketplace Hero"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute bottom-8 left-8 right-8 z-20">
                <Card className="p-6 backdrop-blur-md bg-white/10 border-white/20 text-white">
                    <Typography variant="titleSm" className="uppercase tracking-widest mb-2 opacity-80">Featured Store</Typography>
                    <Typography variant="titleLg">Himalayan Artisan</Typography>
                </Card>
             </div>
          </Card>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="bg-bazar-gray-100 dark:bg-bazar-gray-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <Typography variant="displayMd" className="mb-4">Explore by category</Typography>
              <Typography variant="bodyMd">Find exactly what you need from specialized hubs.</Typography>
            </div>
            <Button variant="link" className="hidden md:flex">View all categories</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/${cat.slug}`}>
                <Card className="p-8 hover:border-bazar-black dark:hover:border-bazar-white cursor-pointer group h-full">
                  <div className="w-12 h-12 bg-bazar-gray-100 dark:bg-bazar-gray-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-bazar-black group-hover:text-bazar-white dark:group-hover:bg-bazar-white dark:group-hover:text-bazar-black transition-colors">
                    {/* Placeholder for Lucide Icon */}
                    <div className="w-6 h-6 border-2 border-current rounded-sm" />
                  </div>
                  <Typography variant="titleLg" className="mb-2">{cat.name}</Typography>
                  <Typography variant="bodySm">{cat.description}</Typography>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <Typography variant="displayMd">Featured products</Typography>
          <Button variant="outline">Browse Shop</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
               <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-bazar-gray-100">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
               </div>
               <div className="flex justify-between items-start">
                  <div>
                    <Typography variant="titleSm" className="mb-1">{product.name}</Typography>
                    <Typography variant="bodySm" className="uppercase font-mono tracking-wider opacity-60">
                      {VENDORS.find(v => v.id === product.vendorId)?.name}
                    </Typography>
                  </div>
                  <Typography variant="titleSm">NPR {product.price.toLocaleString()}</Typography>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book a Service */}
      <section className="bg-bazar-black text-white py-24 px-6 md:px-12 border-y border-bazar-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-xl text-center md:text-left">
              <Typography variant="displayMd" className="text-white mb-6">Expert services at your doorstep.</Typography>
              <Typography variant="bodyMd" className="text-bazar-gray-400 mb-8">From home repairs to professional consultations, find the right expert for your needs on the Bazar infrastructure.</Typography>
              <Link href="/services">
                <Button variant="primary" size="lg" className="bg-white text-black hover:bg-gray-200">Explore Services Hub</Button>
              </Link>
           </div>
           <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {["Consultations", "Guided Tours", "Home Services", "Event Planning"].map(s => (
                <div key={s} className="p-6 border border-bazar-gray-800 rounded-xl bg-bazar-gray-900/50 backdrop-blur text-center group hover:border-white transition-colors cursor-pointer">
                   <Typography variant="titleSm" className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Category</Typography>
                   <Typography variant="titleSm">{s}</Typography>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Card variant="dark" className="p-12 md:p-24 text-center">
          <Typography variant="displayLg" className="mb-8 text-white">Ready to grow your business?</Typography>
          <Typography variant="bodyMd" className="text-xl text-bazar-gray-400 mb-12 max-w-2xl mx-auto">
            Join hundreds of vendors who have already scaled their operations using our platform. 
            Automated SEO, high-speed hosting, and AI-driven content included.
          </Typography>
          <Button variant="primary" size="lg">Create your store now</Button>
        </Card>
      </section>
    </div>
  );
}
