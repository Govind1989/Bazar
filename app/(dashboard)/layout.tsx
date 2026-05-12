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
  MessageSquare,
  Globe,
  Plus, 
  ExternalLink,
  LogOut,
  User,
  Tags,
  Gift,
  Menu,
  X as CloseIcon
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Sales Channels", href: "/dashboard/sales-channels", icon: Globe },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Taxonomy", href: "/dashboard/categories", icon: Tags },
  { name: "Products", href: "/dashboard/inventory", icon: Package },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Gift },
  { name: "Membership", href: "/dashboard/membership", icon: User },
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
    <div className="flex flex-col h-full bg-bazar-white dark:bg-bazar-black">
      <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
         <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-bazar-black dark:bg-bazar-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white dark:bg-bazar-black rounded-full" />
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
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <CloseIcon className="w-5 h-5" />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
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
      <aside className="w-64 border-r border-bazar-gray-200 dark:border-bazar-gray-800 hidden lg:flex flex-col fixed h-full z-10 bg-bazar-white dark:bg-bazar-black">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col w-full min-w-0">
        {/* Dashboard Header */}
        <header className="h-14 md:h-16 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-bazar-white/80 dark:bg-bazar-black/80 backdrop-blur-md z-[20]">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2">
              <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] md:text-xs opacity-60">
                Overview
              </Typography>
              <span className="hidden md:inline opacity-20">/</span>
              <Typography variant="bodySm" className="text-[9px] md:text-[10px] font-mono opacity-40 uppercase truncate max-w-[100px] md:max-w-none">
                {user?.name || 'Himalayan Kitchen'}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <AnimatePresence>
               <div className="relative group">
                  <Button size="sm" className="h-8 md:h-9 gap-2 px-3 md:px-4 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-xl bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black group">
                    <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-90 transition-transform duration-500" />
                    <span className="hidden sm:inline">Quick Create</span>
                  </Button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 overflow-hidden">
                     <div className="p-2 space-y-1">
                        <QuickActionItem 
                          icon={Package} 
                          label="New Product" 
                          description="Add to inventory" 
                          href="/dashboard/inventory?action=new" 
                        />
                        <QuickActionItem 
                          icon={Gift} 
                          label="Marketing Offer" 
                          description="Flash sales & deals" 
                          href="/dashboard/campaigns?action=new" 
                        />
                        <QuickActionItem 
                          icon={User} 
                          label="Membership Club" 
                          description="Loyalty programs" 
                          href="/dashboard/membership?action=new" 
                        />
                     </div>
                  </div>
               </div>
            </AnimatePresence>
          </div>
        </header>

        <div className="flex-1 w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

function QuickActionItem({ icon: Icon, label, description, href }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 transition-colors group/item">
       <div className="w-10 h-10 rounded-lg bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center border border-bazar-gray-100 dark:border-bazar-gray-900 group-hover/item:bg-white dark:group-hover/item:bg-bazar-black transition-colors">
          <Icon className="w-5 h-5 opacity-40 group-hover/item:opacity-100 transition-opacity" />
       </div>
       <div>
          <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">{label}</Typography>
          <Typography variant="bodySm" className="text-[8px] opacity-40 uppercase font-bold tracking-tighter">{description}</Typography>
       </div>
    </Link>
  );
}

