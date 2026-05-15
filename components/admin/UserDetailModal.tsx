"use client";

import { User } from "@/data/users";
import { USER_VISITS } from "@/data/admin-deep";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  X, 
  Mail, 
  MapPin, 
  Calendar, 
  Shield, 
  Clock, 
  ShoppingBag, 
  CreditCard,
  ChevronRight,
  ExternalLink,
  Ban,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

interface UserDetailModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  const userHistory = USER_VISITS.filter(v => v.userId === user.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white dark:bg-bazar-black rounded-[40px] shadow-2xl border border-bazar-gray-200 dark:border-bazar-gray-800 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
           <div className="flex justify-between items-start">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white dark:border-bazar-black shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <Typography variant="titleMd" className="font-black uppercase tracking-tighter leading-none">{user.name}</Typography>
                       <div className="px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-600 text-[9px] font-black uppercase tracking-widest border border-fuchsia-500/20">
                          ID: {user.id}
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-4 opacity-40">
                       <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3" />
                          <Typography variant="bodySm" className="text-[10px] font-bold">{user.email}</Typography>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <Typography variant="bodySm" className="text-[10px] font-bold">Joined {user.joinedDate}</Typography>
                       </div>
                    </div>
                 </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500">
                 <X className="w-5 h-5" />
              </Button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
           {/* Quick Stats */}
           <div className="grid grid-cols-3 gap-4">
              <StatItem label="Loyalty Points" value={user.loyaltyPoints.toString()} icon={CreditCard} />
              <StatItem label="Total Orders" value="12" icon={ShoppingBag} />
              <StatItem label="Account Status" value="Healthy" icon={CheckCircle2} />
           </div>

           {/* Behavioral History */}
           <section className="space-y-6">
              <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Behavioral History (Last 5 Events)</Typography>
              <div className="space-y-3">
                 {userHistory.length > 0 ? userHistory.map((visit) => (
                    <Card key={visit.id} className="p-4 border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-white dark:bg-bazar-gray-950 rounded-2xl flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-900 flex items-center justify-center border border-bazar-gray-100 dark:border-bazar-gray-800">
                             <Clock className="w-4 h-4 opacity-30" />
                          </div>
                          <div>
                             <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight">{visit.action.replace('_', ' ')}</Typography>
                             <Typography variant="bodySm" className="text-[9px] opacity-40 font-mono">{visit.path} · {visit.device}</Typography>
                          </div>
                       </div>
                       <Typography variant="bodySm" className="text-[10px] font-bold opacity-40">{new Date(visit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                    </Card>
                 )) : (
                    <div className="py-12 text-center border-2 border-dashed border-bazar-gray-50 dark:border-bazar-gray-900 rounded-3xl">
                       <Typography variant="bodySm" className="italic opacity-30">No behavioral data available for this user session.</Typography>
                    </div>
                 )}
              </div>
           </section>

           {/* Security & Access */}
           <section className="space-y-6">
              <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] font-black opacity-40">Security & Privileges</Typography>
              <div className="grid md:grid-cols-2 gap-4">
                 <Card className="p-5 border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-white dark:bg-bazar-gray-950 rounded-2xl">
                    <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Assigned Roles</Typography>
                    <div className="flex flex-wrap gap-2">
                       {user.roles.map(role => (
                          <div key={role} className="px-2.5 py-1 rounded-lg bg-black dark:bg-white text-white dark:text-black text-[9px] font-black uppercase tracking-widest">{role}</div>
                       ))}
                       <Button variant="ghost" size="sm" className="h-7 px-2 text-[9px] font-black uppercase tracking-widest text-fuchsia-600">+ Add Role</Button>
                    </div>
                 </Card>
                 <Card className="p-5 border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-white dark:bg-bazar-gray-950 rounded-2xl">
                    <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Account Integrity</Typography>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-tight">Verified Profile</Typography>
                       </div>
                       <Button variant="ghost" className="h-8 px-3 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50">Revoke Verification</Button>
                    </div>
                 </Card>
              </div>
           </section>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/30 dark:bg-bazar-gray-950/30 flex justify-between items-center">
           <Button variant="ghost" className="h-12 px-6 gap-2 text-[10px] font-black uppercase tracking-widest rounded-2xl text-red-500 hover:bg-red-50">
              <Ban className="w-4 h-4" /> Permanently Blacklist
           </Button>
           <div className="flex gap-3">
              <Button variant="outline" className="h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest">Download Data</Button>
              <Button className="h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/10">Audit Full Activity</Button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatItem({ label, value, icon: Icon }: any) {
   return (
      <Card className="p-5 border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-white dark:bg-bazar-gray-950 rounded-2xl">
         <div className="flex items-center gap-2 opacity-40 mb-2">
            <Icon className="w-3.5 h-3.5" />
            <Typography variant="bodySm" className="text-[9px] font-black uppercase tracking-[0.1em]">{label}</Typography>
         </div>
         <Typography variant="titleSm" className="text-lg font-black tracking-tight">{value}</Typography>
      </Card>
   );
}
