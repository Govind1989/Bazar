"use client";

import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Plus, 
  ExternalLink,
  LogOut,
  User
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Products", href: "/dashboard/inventory", icon: Package },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-bazar-white dark:bg-bazar-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-bazar-gray-200 dark:border-bazar-gray-800 flex flex-col fixed h-full z-10 bg-bazar-white dark:bg-bazar-black">
        <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900">
           <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-bazar-black dark:bg-bazar-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-bazar-white dark:bg-bazar-black rounded-full" />
            </div>
            <Typography variant="titleSm" as="span" className="font-mono tracking-tighter">
              BAZAR <span>VENDOR</span>
            </Typography>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full">
               <div className="absolute inset-0 rounded-full border border-bazar-black/10 dark:border-bazar-white/10" />
               <div className="w-5 h-5 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center overflow-hidden">
                 <Typography variant="bodySm" className="text-[14px] font-black tracking-tighter text-bazar-white dark:text-bazar-black">
                   {getInitials(user?.name || 'Vendor')}
                 </Typography>
               </div>
            </div>
            <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest truncate">
              {user?.name || 'Himalayan Kitchen'}
            </Typography>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-md transition-all group"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
          <Link 
            href="/apple" 
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-mono text-bazar-gray-400 hover:text-bazar-black dark:hover:text-bazar-white transition-colors group"
          >
            PUBLIC STORE
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Dashboard Header */}
        <header className="h-16 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-between px-8 sticky top-0 bg-bazar-white/80 dark:bg-bazar-black/80 backdrop-blur-md z-[5]">
          <Typography variant="titleSm" className="uppercase tracking-widest text-xs opacity-60">
            Overview
          </Typography>
          <div className="flex items-center gap-4">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
