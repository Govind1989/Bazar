"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X, User, Store, ShieldAlert, CheckCircle2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { setAuth, user: currentUser, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const roles = [
    { 
      id: 'customer', 
      name: 'Customer', 
      desc: 'Browse and shop from vendors.', 
      icon: User,
      data: { id: 'u1', name: 'Suman Thapa', email: 'suman@example.com', role: 'customer' }
    },
    { 
      id: 'vendor', 
      name: 'Vendor', 
      desc: 'Manage your products and orders.', 
      icon: Store,
      data: { id: 'v1', name: 'Himalayan Kitchen', email: 'vendor@himalaya.com', role: 'vendor' }
    },
    { 
      id: 'admin', 
      name: 'Super Admin', 
      desc: 'Platform-wide infrastructure control.', 
      icon: ShieldAlert,
      data: { id: 'sa1', name: 'Super Admin', email: 'admin@bazar.com', role: 'admin' }
    }
  ];

  const handleRoleSelect = (roleData: any) => {
    setAuth(roleData);
    onClose();
    
    // Redirect based on role
    if (roleData.role === 'admin') router.push('/admin');
    else if (roleData.role === 'vendor') router.push('/dashboard');
    else router.push('/');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-bazar-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative w-full max-w-lg bg-bazar-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50 dark:bg-bazar-gray-950">
           <div>
              <Typography variant="titleLg" className="font-black uppercase tracking-tighter">System Access</Typography>
              <Typography variant="bodySm" className="opacity-60 text-xs">Switch roles to experience different platform views.</Typography>
           </div>
           <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
           </Button>
        </div>

        <div className="p-8 space-y-4">
           {roles.map((role) => (
             <button
               key={role.id}
               onClick={() => handleRoleSelect(role.data)}
               className={cn(
                 "w-full p-6 rounded-2xl border-2 text-left transition-all group flex items-center gap-6",
                 currentUser?.role === role.id 
                  ? "border-bazar-black dark:border-bazar-white bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" 
                  : "border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white bg-transparent"
               )}
             >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  currentUser?.role === role.id 
                    ? "bg-white/10 dark:bg-black/10" 
                    : "bg-bazar-gray-50 dark:bg-bazar-gray-900 group-hover:bg-bazar-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black"
                )}>
                   <role.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                   <Typography variant="titleMd" className="font-bold">{role.name}</Typography>
                   <Typography variant="bodySm" className={cn(
                     "text-xs opacity-60",
                     currentUser?.role === role.id ? "text-white dark:text-black" : ""
                   )}>
                      {role.desc}
                   </Typography>
                </div>
                {currentUser?.role === role.id && (
                  <CheckCircle2 className="w-5 h-5 animate-in zoom-in" />
                )}
             </button>
           ))}
        </div>

        <div className="p-8 pt-0 flex flex-col gap-3">
           {currentUser && (
             <Button 
               variant="outline" 
               className="w-full border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 h-12"
               onClick={() => { logout(); onClose(); router.push('/'); }}
             >
                Logout Session
             </Button>
           )}
           <Typography variant="bodySm" className="text-[10px] text-center opacity-40 uppercase tracking-[0.2em]">
              Bazar Prototype v1.0 — Localhost Environment
           </Typography>
        </div>
      </Card>
    </div>
  );
}
