"use client";

import { useNotificationStore, Notification } from "@/store/useNotificationStore";
import { Button } from "@/components/ui/button";
import { Bell, X, Check, ShoppingBag, Gift, Cpu, Info } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Portal } from "./Portal";

export function NotificationToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
    switch (type) {
      case 'ORDER': return <ShoppingBag className="w-4 h-4 text-blue-500" />;
      case 'CAMPAIGN': return <Gift className="w-4 h-4 text-purple-500" />;
      case 'SYSTEM': return <Cpu className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black text-[10px] font-bold justify-centerfont-bold w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      <Portal>
        <div 
          className={cn(
            "fixed inset-0 bg-bazar-black/60 backdrop-blur-md z-[400] transition-opacity duration-500",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsOpen(false)}
        >
           <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-8 right-8 text-white hover:bg-white/10 rounded-full h-12 w-12 hidden sm:flex"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div 
          className={cn(
            "fixed top-0 right-0 h-full w-full sm:max-w-md bg-bazar-white dark:bg-bazar-black z-[401] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
              <div>
                <Typography variant="titleMd" className="font-black uppercase tracking-tighter">Notifications</Typography>
                <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{unreadCount} Unread Messages</Typography>
              </div>
              <div className="flex items-center gap-2">
                 {unreadCount > 0 && (
                   <Button variant="ghost" size="icon" onClick={markAllAsRead} className="rounded-full h-10 w-10 text-green-500">
                     <Check className="w-5 h-5" />
                   </Button>
                 )}
                 <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-10 w-10">
                   <X className="w-5 h-5" />
                 </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-20">
                  <Bell className="w-16 h-16 mb-4" />
                  <Typography variant="titleSm" className="font-black uppercase tracking-tighter">Clear for now</Typography>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={cn(
                      "p-5 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden",
                      notif.read 
                        ? "bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-bazar-gray-100 dark:border-bazar-gray-900 opacity-60" 
                        : "bg-white dark:bg-neutral-900 border-bazar-black/10 dark:border-bazar-white/10 shadow-lg shadow-bazar-black/5"
                    )}
                    onClick={() => markAsRead(notif.id)}
                  >
                     {!notif.read && (
                       <div className="absolute top-0 right-0 w-12 h-12 bg-bazar-black dark:bg-bazar-white rounded-bl-[2rem] flex items-start justify-end p-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                       </div>
                     )}

                     <div className="flex gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-bazar-gray-100 dark:border-bazar-gray-900 shadow-sm",
                          notif.read ? "bg-white dark:bg-black" : "bg-neutral-50 dark:bg-neutral-950"
                        )}>
                           <NotificationIcon type={notif.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start mb-1">
                              <Typography variant="titleSm" className="text-xs font-black uppercase tracking-widest truncate pr-4">
                                {notif.title}
                              </Typography>
                              <Typography variant="bodySm" className="text-[9px] font-bold opacity-40 uppercase whitespace-nowrap">
                                {notif.time}
                              </Typography>
                           </div>
                           <Typography variant="bodySm" className="text-[11px] leading-relaxed opacity-60 font-medium line-clamp-2">
                             {notif.message}
                           </Typography>
                        </div>
                     </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                <button 
                  className="w-full text-[10px] opacity-40 hover:opacity-100 hover:text-red-500 uppercase font-black tracking-[0.2em] py-4 border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 rounded-2xl transition-all" 
                  onClick={clearNotifications}
                >
                  Clear All History
                </button>
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
}
