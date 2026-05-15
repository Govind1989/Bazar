"use client";

import { USERS } from "@/data/users";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Shield, 
  Smartphone,
  Calendar,
  Lock,
  Unlock,
  Eye
} from "lucide-react";
import { useState } from "react";
import { UserDetailModal } from "@/components/admin/UserDetailModal";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredUsers = USERS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openUserDetail = (user: any) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="p-4 md:p-10 space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Typography variant="displaySm" className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">User Registry</Typography>
          <Typography variant="bodyMd" className="text-bazar-gray-500 font-medium uppercase tracking-[0.1em] text-[9px] md:text-[11px]">Platform-wide Consumer & Staff Directory</Typography>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Search user..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-200 dark:border-bazar-gray-800 rounded-xl md:rounded-2xl text-xs md:text-sm outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all font-medium"
            />
          </div>
          <Button className="h-10 md:h-12 px-4 md:px-6 rounded-xl md:rounded-2xl gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/10 shrink-0">
            <UserPlus className="w-3.5 h-3.5 md:w-4 md:h-4" /> Provision
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 space-y-3 md:space-y-4">
           {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4 md:p-6 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black hover:border-black dark:hover:border-white transition-all group rounded-2xl md:rounded-3xl">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4">
                       <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-bazar-gray-100 dark:bg-bazar-gray-900 overflow-hidden border border-bazar-gray-200 dark:border-bazar-gray-800 group-hover:scale-105 transition-transform duration-500 shrink-0">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                             <Typography variant="titleSm" className="font-black uppercase tracking-tight text-xs md:text-sm truncate">{user.name}</Typography>
                             <div className="hidden sm:flex gap-1">
                                {user.roles.map(role => (
                                   <div key={role} className="px-1.5 py-0.5 rounded-md bg-fuchsia-500/10 text-fuchsia-600 text-[8px] font-black uppercase tracking-widest border border-fuchsia-500/20">
                                      {role}
                                   </div>
                                ))}
                             </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                             <div className="flex items-center gap-1 opacity-40">
                                <Mail className="w-2.5 h-2.5" />
                                <Typography variant="bodySm" className="text-[9px] font-bold tracking-tight truncate max-w-[120px]">{user.email}</Typography>
                             </div>
                             <div className="flex items-center gap-1 opacity-40">
                                <Calendar className="w-2.5 h-2.5" />
                                <Typography variant="bodySm" className="text-[9px] font-bold tracking-tight">Joined {user.joinedDate}</Typography>
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-bazar-gray-100 dark:border-bazar-gray-900">
                       <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openUserDetail(user)}
                          className="flex-1 md:flex-none h-9 md:h-10 px-3 md:px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg md:rounded-xl bg-fuchsia-500/5 hover:bg-fuchsia-500 text-fuchsia-600 hover:text-white border-fuchsia-500/10 transition-all"
                       >
                          <Eye className="w-3.5 h-3.5" /> <span className="sm:inline">Drill Down</span>
                       </Button>
                       <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-lg md:rounded-xl hover:bg-bazar-gray-50 dark:hover:bg-bazar-gray-950 shrink-0">
                          <MoreVertical className="w-4 h-4 opacity-40" />
                       </Button>
                    </div>
                 </div>
              </Card>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <Card className="p-6 md:p-8 border-bazar-gray-200 dark:border-bazar-gray-800 bg-bazar-white dark:bg-bazar-black rounded-2xl md:rounded-3xl">
              <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-6 md:mb-8 font-black">Role Distribution</Typography>
              <div className="space-y-5 md:space-y-6">
                 <RoleRow label="Super Admins" count={2} color="bg-fuchsia-500" />
                 <RoleRow label="Vendors" count={1240} color="bg-blue-500" />
                 <RoleRow label="Consumers" count={92400} color="bg-green-500" />
                 <RoleRow label="Support Staff" count={12} color="bg-amber-500" />
              </div>
           </Card>

           <Card variant="dark" className="bg-bazar-black text-white p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[260px] md:min-h-[300px]">
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 -mr-24 md:-mr-32 -mt-24 md:-mt-32 rounded-full" />
              <div className="relative z-10">
                 <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-4 md:mb-6 text-white font-black">Security Protocol</Typography>
                 <Typography variant="titleMd" className="text-white text-lg md:text-xl font-black uppercase tracking-tight mb-3 md:mb-4">RBAC Engine</Typography>
                 <Typography variant="bodySm" className="text-bazar-gray-400 text-[10px] md:text-xs leading-relaxed mb-6 md:mb-8">
                    Role-Based Access Control is enforced platform-wide.
                 </Typography>
              </div>
              <Button className="w-full bg-white text-black h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl md:rounded-2xl group transition-all">
                 Audit Permissions <Unlock className="w-3.5 h-3.5 ml-2 opacity-40 group-hover:opacity-100 transition-opacity" />
              </Button>
           </Card>
        </div>
      </div>

      {selectedUser && (
        <UserDetailModal 
          user={selectedUser}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
}

function RoleRow({ label, count, color }: { label: string, count: number, color: string }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between items-center">
            <Typography variant="bodySm" className="text-[11px] font-black uppercase tracking-tight">{label}</Typography>
            <Typography variant="bodySm" className="text-[11px] font-mono font-black">{count.toLocaleString()}</Typography>
         </div>
         <div className="h-1.5 w-full bg-bazar-gray-100 dark:bg-bazar-gray-900 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full opacity-60", color)} style={{ width: `${Math.min(100, (count / 100000) * 100 + 5)}%` }} />
         </div>
      </div>
   );
}
