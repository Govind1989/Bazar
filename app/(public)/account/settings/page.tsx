"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Save, Lock, User as UserIcon } from "lucide-react";

export default function AccountSettings() {
  const { user } = useAuthStore();
  const [username, setUsername] = useState(user?.username || "");
  const [name, setName] = useState(user?.name || "");

  if (!user) return null;

  return (
    <div className="space-y-12">
      <section>
        <Typography variant="titleLg" className="font-black uppercase tracking-tighter mb-2">Account Settings</Typography>
        <Typography variant="bodySm" className="opacity-60">Update your profile information and security settings.</Typography>
      </section>

      <div className="space-y-8 max-w-2xl">
        <section className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <UserIcon className="w-4 h-4 opacity-40" />
              <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Public Profile</Typography>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <Typography variant="bodySm" className="font-bold text-[10px] uppercase opacity-40">Username</Typography>
                 <Input 
                   value={username} 
                   onChange={(e) => setUsername(e.target.value)}
                   className="h-12 rounded-xl border-2 focus:border-bazar-black dark:focus:border-bazar-white"
                 />
              </div>
              <div className="space-y-2">
                 <Typography variant="bodySm" className="font-bold text-[10px] uppercase opacity-40">Full Name</Typography>
                 <Input 
                   value={name} 
                   onChange={(e) => setName(e.target.value)}
                   className="h-12 rounded-xl border-2 focus:border-bazar-black dark:focus:border-bazar-white"
                 />
              </div>
           </div>
           
           <Button className="rounded-xl px-8 h-12">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
           </Button>
        </section>

        <hr className="border-bazar-gray-100 dark:border-bazar-gray-900" />

        <section className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 opacity-40" />
              <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Security</Typography>
           </div>
           
           <div className="space-y-4">
              <div className="space-y-2">
                 <Typography variant="bodySm" className="font-bold text-[10px] uppercase opacity-40">Current Password</Typography>
                 <Input type="password" placeholder="••••••••" className="h-12 rounded-xl border-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Typography variant="bodySm" className="font-bold text-[10px] uppercase opacity-40">New Password</Typography>
                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl border-2" />
                 </div>
                 <div className="space-y-2">
                    <Typography variant="bodySm" className="font-bold text-[10px] uppercase opacity-40">Confirm Password</Typography>
                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl border-2" />
                 </div>
              </div>
           </div>
           
           <Button variant="outline" className="rounded-xl px-8 h-12 border-2">
              Update Password
           </Button>
        </section>
      </div>
    </div>
  );
}
