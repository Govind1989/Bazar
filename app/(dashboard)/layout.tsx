"use client";

import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useSystemStore } from "@/store/useSystemStore";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
  X as CloseIcon,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const { language, setLanguage } = useSystemStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

  const SidebarContent = ({ isCollapsed = false, isMobile = false }: { isCollapsed?: boolean, isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-bazar-white dark:bg-bazar-black transition-all duration-300">
      <div className={cn(
        "p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center transition-all duration-300",
        isCollapsed && !isMobile ? "p-4 justify-center flex-col gap-4" : "p-6"
      )}>
         <div className={cn("flex flex-col transition-all duration-300", isCollapsed && !isMobile ? "items-center" : "")}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-bazar-black dark:bg-bazar-white rounded-full flex items-center justify-center shrink-0">
              <div className="w-3 h-3 bg-white dark:bg-bazar-black rounded-full" />
            </div>
            {(!isCollapsed || isMobile) && (
              <Typography variant="titleSm" as="span" className="font-mono tracking-tighter whitespace-nowrap overflow-hidden">
                BAZAR <span className="opacity-40">VENDOR</span>
              </Typography>
            )}
          </div>
          
          {(!isCollapsed || isMobile) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mt-2"
            >
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full shrink-0">
                 <div className="absolute inset-0 rounded-full border border-bazar-black/10 dark:border-bazar-white/10" />
                 <div className="w-5 h-5 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center overflow-hidden">
                   <Typography variant="bodySm" className="text-[12px] font-black tracking-tighter text-bazar-white dark:text-bazar-black">
                     {getInitials(user?.name || 'Vendor')}
                   </Typography>
                 </div>
              </div>
              <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest truncate max-w-[120px]">
                {user?.name || 'Himalayan Kitchen'}
              </Typography>
            </motion.div>
          )}
        </div>
        
        {isMobile ? (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
            <CloseIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={cn(
              "h-8 w-8 rounded-lg opacity-40 hover:opacity-100 transition-opacity",
              isCollapsed ? "mt-0" : ""
            )}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-visible custom-scrollbar transition-all duration-300">
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => isMobile && setIsMobileSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-xl transition-all group relative",
              isCollapsed && !isMobile ? "justify-center px-2" : ""
            )}
          >
            <item.icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isCollapsed && !isMobile ? "w-5 h-5" : "w-4 h-4")} />
            
            {(!isCollapsed || isMobile) ? (
              <span className="whitespace-nowrap overflow-hidden">{item.name}</span>
            ) : (
              <div className="fixed left-[72px] px-3 py-1.5 bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all z-[999] shadow-xl whitespace-nowrap border-2 border-bazar-black dark:border-bazar-white">
                {item.name}
              </div>
            )}
          </Link>
        ))}
      </nav>

      <div className={cn("p-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900 space-y-2 transition-all duration-300", isCollapsed && !isMobile ? "items-center" : "")}>
        <Link 
          href="/apple" 
          target="_blank"
          className={cn(
            "flex items-center justify-between px-3 py-2 text-[10px] font-mono text-bazar-gray-400 hover:text-bazar-black dark:hover:text-bazar-white transition-colors group",
            isCollapsed && !isMobile ? "justify-center" : ""
          )}
        >
          {(!isCollapsed || isMobile) ? "PUBLIC STORE" : <ExternalLink className="w-4 h-4" />}
          {(!isCollapsed || isMobile) && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </Link>
        
        <button 
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-black uppercase tracking-tight text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all",
            isCollapsed && !isMobile ? "justify-center px-2" : ""
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(!isCollapsed || isMobile) && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-bazar-white dark:bg-bazar-black relative overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-[50] lg:hidden"
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "border-r border-bazar-gray-200 dark:border-bazar-gray-800 hidden lg:flex flex-col fixed h-full z-30 bg-bazar-white dark:bg-bazar-black transition-all duration-300",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <SidebarContent isCollapsed={isSidebarCollapsed} />
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        {/* Dashboard Header */}
        <header className="h-14 md:h-16 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-bazar-white/80 dark:bg-bazar-black/80 backdrop-blur-md z-[20]">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setIsMobileSidebarOpen(true)}>
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
            {/* Functional Toggles */}
            {mounted && (
              <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-4 border-r border-bazar-gray-100 dark:border-bazar-gray-900 pr-2 md:pr-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-8 h-8 rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
                  className="h-8 px-2 gap-2 font-mono text-[10px] tracking-widest uppercase hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {language}
                </Button>
              </div>
            )}

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
