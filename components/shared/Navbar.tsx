"use client";

import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { CartToggle } from "./CartToggle";
import { AuthModal } from "./AuthModal";
import { useAuthStore } from "@/store/useAuthStore";
import { useSystemStore } from "@/store/useSystemStore";
import { useTranslation } from "@/hooks/useTranslation";
import { User, Globe, Sun, Moon, LayoutDashboard, LayoutGrid, Sparkles, ChevronDown, Utensils, Shirt, Zap, TreePine, Armchair, Monitor, Smartphone, Calendar, MapPin, Clock, ShoppingBag, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { CalendarToggle } from "./CalendarToggle";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, SERVICE_CATEGORIES } from "@/data/mock";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { user, isAuthenticated, activeRole, logout } = useAuthStore();
  const { language, setLanguage, marketplaceView, setMarketplaceView } = useSystemStore();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      logout();
      window.location.reload();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_ITEMS = [
    { name: t('marketplace'), href: "/marketplace" },
    { name: t('categories'), href: "/categories" },
    { name: t('vendors'), href: "/vendors" },
    { name: 'Jobs', href: "/jobs" },
  ];

  const CategoryIcon = ({ icon, className }: { icon: string; className?: string }) => {
    switch (icon) {
      case "Utensils": return <Utensils className={className} />;
      case "Shirt": return <Shirt className={className} />;
      case "Zap": return <Zap className={className} />;
      case "TreePine": return <TreePine className={className} />;
      case "Armchair": return <Armchair className={className} />;
      case "Monitor": return <Monitor className={className} />;
      case "Smartphone": return <Smartphone className={className} />;
      case "Calendar": return <Calendar className={className} />;
      case "MapPin": return <MapPin className={className} />;
      case "Clock": return <Clock className={className} />;
      default: return <ShoppingBag className={className} />;
    }
  };

  return (
    <>
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center px-6 md:px-12 border-b",
        isScrolled || isMegaMenuOpen
          ? "bg-white/80 dark:bg-bazar-black/80 backdrop-blur-md border-bazar-gray-200 dark:border-bazar-gray-800"
          : "bg-transparent border-transparent"
      )}
    >
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-bazar-black dark:bg-bazar-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white dark:bg-bazar-black rounded-full" />
        </div>
        <Typography variant="titleMd" as="span" className="font-mono tracking-tighter">
          BAZAR
        </Typography>
      </Link>

      <div className="hidden md:flex items-center gap-8 ml-12">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white transition-colors text-sm font-medium"
          >
            {item.name}
          </Link>
        ))}
        
        {/* Aesthetic Mega Menu Toggle */}
        <button 
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          className={cn(
            "flex items-center gap-1 text-sm font-medium transition-all",
            isMegaMenuOpen ? "text-bazar-gray-800" : "text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white transition-colors text-sm font-medium"
          )}
        >
          <span>Explore</span>
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {mounted && (
          <div className="flex items-center gap-1 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMarketplaceView(marketplaceView === 'classic' ? 'social' : 'classic')}
              className={cn(
                "h-9 px-4 rounded-full transition-all gap-2 border-2",
                marketplaceView === 'social' 
                  ? "bg-fuchsia-50 dark:bg-fuchsia-950/30 border-fuchsia-200 dark:border-fuchsia-800 text-fuchsia-600 shadow-sm" 
                  : "bg-bazar-gray-50 dark:bg-bazar-gray-950 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white"
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={marketplaceView}
                  initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                  className="flex items-center gap-2"
                >
                  {marketplaceView === 'classic' ? (
                    <>
                      <LayoutGrid className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Classic</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Social</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-bazar-white" />
              ) : (
                <Moon className="w-4 h-4 text-bazar-black" />
              )}
            </Button>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
          className="gap-2 font-mono text-[10px] tracking-widest hidden md:flex"
        >
          <Globe className="w-3.5 h-3.5" />
          {language.toUpperCase()}
        </Button>
        <CartToggle />
        <CalendarToggle />
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link href={activeRole === 'SuperAdmin' ? '/admin' : activeRole === 'Vendor' ? '/dashboard' : '/account'}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8  border border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
              </Button>
            </Link>
            
            <button 
              onClick={handleUserClick}
              className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-transform active:scale-95"
            >
              {/* Thin Ring */}
              <div className="absolute inset-0 rounded-full border border-bazar-black/10 dark:border-bazar-white/10 group-hover:border-bazar-black dark:group-hover:border-bazar-white transition-colors" />
              
              {/* Initials Container */}
              <div className="w-7 h-7 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center overflow-hidden">
                <Typography variant="bodySm" className="text-[14px] font-black tracking-tighter">
                  {getInitials(user?.name || 'User')}
                </Typography>
              </div>
            </button>
          </div>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
              {t('signIn')}
            </Button>
            <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
              {t('joinBazar')}
            </Button>
          </>
        )}
      </div>
    </nav>
    
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
    />

    {/* Mega Menu Overlay */}
    <AnimatePresence>
      {isMegaMenuOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setIsMegaMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
            className="fixed top-16 left-0 right-0 z-50 bg-white/95 dark:bg-bazar-black/95 backdrop-blur-xl border-b border-bazar-gray-200 dark:border-bazar-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-12 gap-16">
              {/* Product Categories Column */}
              <div className="col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-bazar-gray-500 rounded-full" />
                  <Typography variant="titleSm" className="uppercase tracking-[0.3em] font-black opacity-40">Products</Typography>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {CATEGORIES.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/categories?id=${cat.id}`}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800"
                    >
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-neutral-800 transition-colors shadow-sm">
                        <CategoryIcon icon={cat.icon} className="w-5 h-5 text-bazar-gray-500" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-black uppercase tracking-tight group-hover:text-bazar-gray-800 transition-colors">{cat.name}</span>
                        <span className="text-[10px] font-medium opacity-40 leading-tight line-clamp-1">{cat.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Service Categories Column */}
              <div className="col-span-5 border-l border-neutral-100 dark:border-neutral-800 pl-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-bazar-gray-500 rounded-full" />
                  <Typography variant="titleSm" className="uppercase tracking-[0.3em] font-black opacity-40">Services</Typography>
                </div>
                <div className="space-y-4">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/categories?id=${cat.id}`}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800"
                    >
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-neutral-800 transition-colors shadow-sm">
                        <CategoryIcon icon={cat.icon} className="w-5 h-5 text-bazar-gray-500" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-black uppercase tracking-tight group-hover:text-bazar-gray-800 transition-colors">{cat.name}</span>
                        <span className="text-[10px] font-medium opacity-40 leading-tight">{cat.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Promotional Footer */}
                <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-600/5 to-blue-600/5 border border-fuchsia-600/10 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center shadow-xl shadow-fuchsia-600/10">
                         <Sparkles className="w-6 h-6 text-fuchsia-600" />
                      </div>
                      <div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-600 block">Featured Selection</span>
                         <span className="text-xs font-bold opacity-60">Handpicked for your lifestyle</span>
                      </div>
                   </div>
                   <ArrowRight className="w-4 h-4 text-fuchsia-600" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
