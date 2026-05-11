"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  User, 
  Settings, 
  Gift, 
  Sliders, 
  MessageSquare, 
  Terminal, 
  LogOut,
  ChevronRight,
  Heart,
  ShieldAlert,
  Star,
  ShoppingBag
} from "lucide-react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout, activeRole } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  const menuItems = [
    { name: "Overview", href: "/account", icon: User },
    { name: "Order History", href: "/account/orders", icon: ShoppingBag },
    { name: "Messages", href: "/account/messages", icon: MessageSquare },
    { name: "Explored Vendors", href: "/account/vendors", icon: Heart },
    { name: "Settings", href: "/account/settings", icon: Settings },
    { name: "Loyalty Rewards", href: "/account/rewards", icon: Gift },
    { name: "Reviews & Ratings", href: "/account/reviews", icon: Star },
    { name: "Complains & Reports", href: "/account/complains", icon: ShieldAlert },
    { name: "Preferences", href: "/account/preferences", icon: Sliders },
    { name: "Agentic Logs", href: "/account/logs", icon: Terminal },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Sidebar / Top Nav for Mobile */}
        <aside className="w-full lg:w-72 space-y-6 md:space-y-10">
          <div className="flex items-center gap-4 p-2 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 rounded-3xl md:bg-transparent">
            <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full">
              {/* Thin Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-bazar-black/5 dark:border-bazar-white/5" />
              
              {/* Initials Container */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center overflow-hidden shadow-xl">
                <Typography variant="bodySm" className="text-xs md:text-sm font-black tracking-tighter text-bazar-white dark:text-bazar-black">
                   {getInitials(user.name)}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="titleSm" className="font-black leading-none md:text-lg uppercase tracking-tighter">{user.name}</Typography>
              <Typography variant="bodySm" className="text-[9px] md:text-[10px] opacity-40 uppercase tracking-[0.2em] mt-1 font-black">{activeRole}</Typography>
            </div>
          </div>

          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
            {menuItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/account" && pathname.startsWith(item.href));
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-3.5 md:p-4 rounded-2xl transition-all group shrink-0 lg:shrink",
                    active 
                      ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black shadow-lg shadow-bazar-black/10 dark:shadow-bazar-white/5 scale-[1.02]" 
                      : "bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-4 h-4 md:w-4.5 md:h-4.5", active ? "opacity-100" : "opacity-30 group-hover:opacity-100 transition-opacity")} />
                    <Typography variant="bodySm" className="font-black text-[10px] md:text-xs uppercase tracking-widest">{item.name}</Typography>
                  </div>
                  <ChevronRight className={cn("hidden lg:block w-3.5 h-3.5 transition-transform group-hover:translate-x-1", active ? "opacity-100" : "opacity-0")} />
                </Link>
              );
            })}
            
            <button 
              onClick={() => { logout(); router.push("/"); }}
              className="flex items-center gap-3 p-3.5 md:p-4 rounded-2xl transition-all hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 md:mt-8 shrink-0 lg:shrink bg-red-50/10 border border-red-500/10"
            >
              <LogOut className="w-4 h-4 opacity-60" />
              <Typography variant="bodySm" className="font-black text-[10px] md:text-xs uppercase tracking-widest">Logout</Typography>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
