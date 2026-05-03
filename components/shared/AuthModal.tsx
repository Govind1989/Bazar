"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X, ShieldAlert, CheckCircle2, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { USERS, User, UserRole } from "@/data/users";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { setAuth, setActiveRole, user: currentUser, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
      if (user.roles.length > 1) {
        setTempUser(user);
        setShowRoleSelection(true);
      } else {
        completeAuth(user, user.roles[0]);
      }
    } else {
      setError("Invalid email or password");
    }
  };

  const completeAuth = (user: User, role: UserRole) => {
    setAuth(user, role);
    onClose();
    
    // Role-based redirection
    if (role === 'SuperAdmin') router.push('/admin');
    else if (role === 'Vendor') router.push('/dashboard');
    else router.push('/account');
  };

  const handleRoleSelect = (role: UserRole) => {
    if (tempUser) {
      completeAuth(tempUser, role);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-bazar-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <Card className="relative w-full max-w-md bg-bazar-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50 dark:bg-bazar-gray-950">
           <div>
              <Typography variant="titleLg" className="font-black uppercase tracking-tighter">
                {showRoleSelection ? "Select Role" : "Secure Login"}
              </Typography>
              <Typography variant="bodySm" className="opacity-60 text-xs">
                {showRoleSelection ? "Choose your active session profile." : "Enter your credentials to continue."}
              </Typography>
           </div>
           <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
           </Button>
        </div>

        <div className="p-8">
          {!showRoleSelection ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <Typography variant="bodySm" className="font-medium">{error}</Typography>
                </div>
              )}
              
              <div className="space-y-2">
                <Typography variant="bodySm" className="font-bold uppercase tracking-wider text-[10px] opacity-60">Email Address</Typography>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Typography variant="bodySm" className="font-bold uppercase tracking-wider text-[10px] opacity-60">Security Key</Typography>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-all font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl group" size="lg">
                Authenticate
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="pt-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900 text-center">
                 <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest">
                   Hint: admin@bazar.com / admin
                 </Typography>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {tempUser?.roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className="w-full p-4 rounded-xl border-2 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white flex items-center justify-between group transition-all"
                >
                  <Typography variant="titleSm" className="font-bold">{role}</Typography>
                  <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              <Button 
                variant="ghost" 
                className="w-full text-xs opacity-50" 
                onClick={() => setShowRoleSelection(false)}
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>

        <div className="p-8 pt-0 flex flex-col gap-3">
           <Typography variant="bodySm" className="text-[10px] text-center opacity-40 uppercase tracking-[0.2em]">
              Bazar Multitenant Security
           </Typography>
        </div>
      </Card>
    </div>
  );
}
