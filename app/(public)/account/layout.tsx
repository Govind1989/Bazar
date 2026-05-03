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
  Heart
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
    { name: "Explored Vendors", href: "/account/vendors", icon: Heart },
    { name: "Settings", href: "/account/settings", icon: Settings },
    { name: "Loyalty Rewards", href: "/account/rewards", icon: Gift },
    { name: "Preferences", href: "/account/preferences", icon: Sliders },
    { name: "Messages", href: "/account/messages", icon: MessageSquare },
    { name: "Agentic Logs", href: "/account/logs", icon: Terminal },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="flex items-center gap-4 p-2">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full">
              {/* Thin Ring */}
              <div className="absolute inset-0 rounded-full border border-bazar-black/10 dark:border-bazar-white/10" />
              
              {/* Initials Container */}
              <div className="w-10 h-10 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center overflow-hidden">
                <Typography variant="bodySm" className="text-xs font-black tracking-tighter text-bazar-white dark:text-bazar-black">
                   {getInitials(user.name)}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="titleSm" className="font-black leading-none">{user.name}</Typography>
              <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest mt-1">{activeRole}</Typography>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/account" && pathname.startsWith(item.href));
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl transition-all group",
                    active 
                      ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" 
                      : "hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-4 h-4", active ? "opacity-100" : "opacity-40")} />
                    <Typography variant="bodySm" className="font-bold text-xs uppercase tracking-wider">{item.name}</Typography>
                  </div>
                  <ChevronRight className={cn("w-3 h-3 transition-transform group-hover:translate-x-1", active ? "opacity-100" : "opacity-0")} />
                </Link>
              );
            })}
            
            <button 
              onClick={() => { logout(); router.push("/"); }}
              className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 mt-8"
            >
              <LogOut className="w-4 h-4 opacity-40" />
              <Typography variant="bodySm" className="font-bold text-xs uppercase tracking-wider">Logout</Typography>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
