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
import { User, Globe, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { CalendarToggle } from "./CalendarToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { language, setLanguage } = useSystemStore();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_ITEMS = [
    { name: t('marketplace'), href: "/" },
    { name: t('categories'), href: "#categories" },
    { name: t('vendors'), href: "#vendors" },
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
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 bg-bazar-black dark:bg-bazar-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white dark:bg-bazar-black rounded-full" />
        </div>
        <Typography variant="titleMd" as="span" className="font-mono tracking-tighter">
          BAZAR
        </Typography>
      </div>

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
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-bazar-black dark:border-bazar-white"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <User className="w-4 h-4" />
            <span className="max-w-[100px] truncate">{user?.name}</span>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
            {t('signIn')}
          </Button>
        )}
        <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
          {t('joinBazar')}
        </Button>
      </div>
    </nav>
    
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
    />
    </>
  );
}
