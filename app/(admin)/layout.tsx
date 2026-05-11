"use client";

import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  Users2, 
  Store, 
  Layers, 
  Settings, 
  Bell,
  Search,
  LogOut,
  Globe,
  User,
  Menu,
  X as CloseIcon,
  ChevronRight,
  Activity,
  Terminal
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ADMIN_SIDEBAR_ITEMS = [
  { name: "Overview", href: "/admin", icon: ShieldCheck, description: "Platform Analytics" },
  { name: "Vendors", href: "/admin/vendors", icon: Store, description: "Merchant Management" },
  { name: "Categories", href: "/admin/categories", icon: Layers, description: "Taxonomy Tree" },
  { name: "Users", href: "/admin/users", icon: Users2, description: "Customer Base" },
  { name: "System Logs", href: "/admin/logs", icon: Terminal, description: "Audit Trails" },
  { name: "Settings", href: "/admin/settings", icon: Settings, description: "OS Configuration" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-bazar-white dark:bg-bazar-black border-r border-bazar-gray-200 dark:border-bazar-gray-800">
      <div className="p-6 border-b border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 backdrop-blur-sm">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-bazar-black dark:bg-bazar-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-white/5">
                <div className="w-3.5 h-3.5 bg-bazar-white dark:bg-bazar-black rounded-sm rotate-45 animate-pulse" />
              </div>
              <Typography variant="titleSm" as="span" className="font-mono tracking-tighter font-black text-lg">
                BAZAR <span className="text-fuchsia-600">OS</span>
              </Typography>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={() => setIsSidebarOpen(false)}>
              <CloseIcon className="w-4 h-4" />
            </Button>
         </div>
         <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-[0.25em] font-black">
              System Operational
            </Typography>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <Typography variant="bodySm" className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Core Engine</Typography>
        {ADMIN_SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black shadow-xl shadow-black/10 dark:shadow-white/5" 
                  : "hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900 text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5 transition-transform duration-500", isActive ? "scale-110 opacity-100" : "opacity-40 group-hover:opacity-100 group-hover:scale-110")} />
              <div className="flex flex-col gap-0">
                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                <span className={cn("text-[8px] font-bold uppercase tracking-widest opacity-40", isActive && "opacity-60")}>{item.description}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute right-3 w-1 h-4 bg-fuchsia-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center justify-between px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-bazar-gray-400 hover:text-bazar-black dark:hover:text-bazar-white transition-all group rounded-xl hover:bg-white dark:hover:bg-bazar-black border border-transparent hover:border-bazar-gray-200 dark:hover:border-bazar-gray-800 mb-2"
        >
          Live Site
          <Globe className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all border border-transparent hover:border-red-500/10"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-bazar-white dark:bg-bazar-black relative overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-72 z-[101] lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-bazar-gray-200 dark:border-bazar-gray-800 hidden lg:flex flex-col fixed h-full z-10">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col w-full min-w-0">
        {/* Admin Header */}
        <header className="h-14 md:h-18 border-b border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center justify-between px-4 md:px-10 sticky top-0 bg-white/80 dark:bg-bazar-black/80 backdrop-blur-xl z-[50]">
          <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-2xl hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative hidden md:block w-72 lg:w-[400px] group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
               <input 
                  type="text" 
                  placeholder="Query system modules..." 
                  className="w-full pl-12 pr-4 py-2.5 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-2xl text-xs md:text-sm outline-none focus:ring-4 focus:ring-fuchsia-500/5 focus:border-fuchsia-500/30 transition-all font-medium"
               />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4 border-r border-bazar-gray-200 dark:border-bazar-gray-800 pr-4 md:pr-8">
               <button className="relative p-2.5 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900 rounded-2xl transition-all group">
                  <Bell className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-fuchsia-500 rounded-full border-2 border-white dark:border-black shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
               </button>
               <button className="relative p-2.5 hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-900 rounded-2xl transition-all group hidden sm:block">
                  <Activity className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
               </button>
            </div>

            <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
               <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl shadow-2xl transition-transform group-hover:scale-105 active:scale-95 duration-500">
                  <div className="absolute inset-0 rounded-2xl border-2 border-fuchsia-500/20 group-hover:border-fuchsia-500/50 transition-colors" />
                  <div className="w-8.5 h-8.5 rounded-xl bg-bazar-black dark:bg-bazar-white flex items-center justify-center overflow-hidden shadow-inner">
                    <Typography variant="bodySm" className="text-[14px] font-black tracking-tighter text-bazar-white dark:text-bazar-black">
                       {getInitials(user?.name || 'Admin')}
                    </Typography>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-lg border-2 border-white dark:border-black shadow-lg" />
               </div>
               <div className="hidden sm:block">
                  <div className="flex items-center gap-2">
                    <Typography variant="titleSm" className="text-sm font-black uppercase tracking-tighter leading-none">{user?.name || 'Super Admin'}</Typography>
                    <ChevronRight className="w-3 h-3 opacity-20" />
                  </div>
                  <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-black tracking-[0.2em] mt-1">Kernel Root</Typography>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full overflow-x-hidden animate-in fade-in duration-1000">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
