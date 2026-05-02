import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users2, 
  Store, 
  Layers, 
  Settings, 
  Bell,
  Search,
  LogOut,
  Globe
} from "lucide-react";

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
  return (
    <div className="flex min-h-screen bg-bazar-white dark:bg-bazar-black">
      {/* Super Admin Sidebar */}
      <aside className="w-64 border-r border-bazar-gray-200 dark:border-bazar-gray-800 flex flex-col fixed h-full z-10 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 backdrop-blur-xl">
        <div className="p-6 border-b border-bazar-gray-200 dark:border-bazar-gray-800">
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

        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
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
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all">
            <LogOut className="w-4 h-4" />
            System Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Admin Header */}
        <header className="h-16 border-b border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center justify-between px-8 sticky top-0 bg-bazar-white dark:bg-bazar-black z-[5]">
          <div className="relative w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
             <input 
                type="text" 
                placeholder="Search vendors, users, or system logs..." 
                className="w-full pl-10 pr-4 py-1.5 bg-bazar-gray-50 dark:bg-bazar-gray-900 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-full text-xs outline-none focus:ring-1 focus:ring-bazar-black dark:focus:ring-bazar-white transition-all"
             />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-900 rounded-full transition-colors">
               <Bell className="w-5 h-5 opacity-40" />
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black" />
            </button>
            <div className="flex items-center gap-3 border-l border-bazar-gray-200 dark:border-bazar-gray-800 pl-6">
               <div className="w-8 h-8 rounded-full bg-bazar-black dark:bg-bazar-white flex items-center justify-center text-[10px] font-black text-white dark:text-black">
                  SA
               </div>
               <div>
                  <Typography variant="titleSm" className="text-xs leading-none">Super Admin</Typography>
                  <Typography variant="bodySm" className="text-[10px] opacity-40">System Root</Typography>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
