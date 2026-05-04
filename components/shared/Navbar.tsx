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
import { User, Globe, Sun, Moon, LayoutDashboard, LayoutGrid, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { CalendarToggle } from "./CalendarToggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
    { name: t('pricing'), href: "#pricing" },
  ];

  return (
    <>
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center px-6 md:px-12 border-b",
        isScrolled
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
    </>
  );
}
