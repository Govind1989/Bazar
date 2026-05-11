"use client";

import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
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
  X as CloseIcon
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ADMIN_SIDEBAR_ITEMS = [
  { name: "Overview", href: "/admin", icon: ShieldCheck },
  { name: "Vendors", href: "/admin/vendors", icon: Store },
  { name: "Categories", href: "/admin/categories", icon: Layers },
  { name: "Users", href: "/admin/users", icon: Users2 },
  { name: "Platform Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex flex-col h-full bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 backdrop-blur-xl">
      <div className="p-6 border-b border-bazar-gray-200 dark:border-bazar-gray-800 flex justify-between items-center">
         <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-bazar-black dark:bg-bazar-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-bazar-white dark:bg-bazar-black rounded-sm rotate-45" />
            </div>
            <Typography variant="titleSm" as="span" className="font-mono tracking-tighter font-black">
              BAZAR <span>OS</span>
            </Typography>
          </div>
          <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-bold">
            Platform Infrastructure
          </Typography>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <CloseIcon className="w-5 h-5" />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {ADMIN_SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white hover:bg-bazar-white dark:hover:bg-bazar-black border border-transparent hover:border-bazar-gray-200 dark:hover:border-bazar-gray-800 rounded-md transition-all group"
          >
            <item.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-bazar-gray-200 dark:border-bazar-gray-800">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-mono text-bazar-gray-400 hover:text-bazar-black dark:hover:text-bazar-white transition-colors group"
        >
          LIVE MARKETPLACE
          <Globe className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all"
        >
          <LogOut className="w-4 h-4" />
          System Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-bazar-white dark:bg-bazar-black relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-[50] lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-bazar-gray-200 dark:border-bazar-gray-800 hidden lg:flex flex-col fixed h-full z-10 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col w-full min-w-0">
        {/* Admin Header */}
        <header className="h-14 md:h-16 border-b border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-bazar-white/80 dark:bg-bazar-black/80 backdrop-blur-md z-[20]">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative hidden md:block w-64 lg:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
               <input 
                  type="text" 
                  placeholder="System search..." 
                  className="w-full pl-10 pr-4 py-1.5 bg-bazar-gray-50 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-full text-xs outline-none focus:ring-1 focus:ring-bazar-black dark:focus:ring-bazar-white transition-all"
               />
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-full transition-colors">
               <Bell className="w-5 h-5 opacity-40" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black" />
            </button>
            <div className="flex items-center gap-2 md:gap-3 md:border-l md:border-bazar-gray-200 md:dark:border-bazar-gray-800 md:pl-6">
               <div className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-sm">
                  <div className="absolute inset-0 rounded-full border border-bazar-black/10 dark:border-bazar-white/10" />
                  <div className="w-7 h-7 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center overflow-hidden">
                    <Typography variant="bodySm" className="text-[12px] font-black tracking-tighter text-bazar-white dark:text-bazar-black">
                       {getInitials(user?.name || 'Admin')}
                    </Typography>
                  </div>
               </div>
               <div className="hidden sm:block">
                  <Typography variant="titleSm" className="text-xs leading-none font-black uppercase tracking-tighter">{user?.name || 'Super Admin'}</Typography>
                  <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase font-bold tracking-widest">Root</Typography>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
