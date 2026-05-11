"use client";

import { useState, useEffect, Suspense } from "react";
import { useUserStore, Complaint } from "@/store/useUserStore";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  Image as ImageIcon, 
  Video, 
  Plus, 
  X,
  MessageSquare,
  ShieldAlert,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RECENT_ORDERS } from "@/data/mock";
import { useSearchParams, useRouter } from "next/navigation";
import { ComplaintModal } from "@/components/shared/ComplaintModal";

function ComplainsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderIdParam = searchParams.get('orderId');
  
  const { complaints } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    if (orderIdParam) {
      const order = RECENT_ORDERS.find(o => o.id === orderIdParam);
      if (order) {
        setSelectedItem(order);
        setIsModalOpen(true);
      }
    }
  }, [orderIdParam]);

  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'RESOLVED': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'REJECTED': return <X className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 p-8 md:p-12 rounded-[2.5rem] border border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/[0.02] rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-red-500/[0.05] transition-colors duration-1000" />
        <div className="relative z-10">
          <Typography variant="titleLg" className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Complains<br />& Reports</Typography>
          <Typography variant="bodySm" className="opacity-60 text-xs md:text-sm font-bold uppercase tracking-[0.3em] max-w-md leading-relaxed">
            Your satisfaction is our mandate. Every report is audited by our quality assurance team to ensure local vendor excellence.
          </Typography>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Post New Complain
        </Button>
      </section>

      {/* Complaints List */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
           <Typography variant="titleSm" className="font-black uppercase tracking-[0.2em] text-[10px] opacity-40">Your History</Typography>
           <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900" />
        </div>

        {complaints.length === 0 ? (
          <Card className="p-24 border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 flex flex-col items-center justify-center text-center rounded-[3rem] bg-transparent">
             <div className="w-24 h-24 rounded-full bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center mb-8 border border-bazar-gray-100 dark:border-bazar-gray-900">
                <ShieldAlert className="w-10 h-10 opacity-20" />
             </div>
             <Typography variant="titleMd" className="font-black uppercase tracking-widest text-xl">System Clear</Typography>
             <Typography variant="bodySm" className="text-xs mt-3 max-w-[280px] opacity-40 font-medium leading-relaxed italic">
                No active disputes or reports found in your heritage logs.
             </Typography>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="p-0 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 overflow-hidden group hover:border-bazar-black dark:hover:border-bazar-white transition-all rounded-[2.5rem] bg-white dark:bg-bazar-black shadow-sm hover:shadow-2xl">
                 <div className="flex flex-col lg:flex-row">
                    {/* Status & Item Sidebar */}
                    <div className="lg:w-80 p-8 md:p-10 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 border-r border-bazar-gray-100 dark:border-bazar-gray-900">
                       <div className="flex items-center gap-3 mb-8">
                          <div className={cn(
                            "p-2 rounded-xl border flex items-center justify-center",
                            complaint.status === 'PENDING' ? "bg-orange-500/10 border-orange-500/20" : 
                            complaint.status === 'RESOLVED' ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                          )}>
                             {getStatusIcon(complaint.status)}
                          </div>
                          <Typography variant="bodySm" className={cn(
                            "text-[10px] font-black uppercase tracking-[0.3em]",
                            complaint.status === 'PENDING' ? "text-orange-600" : 
                            complaint.status === 'RESOLVED' ? "text-green-600" : "text-red-600"
                          )}>{complaint.status}</Typography>
                       </div>

                       <div className="space-y-1">
                          <Typography variant="titleMd" className="font-black text-xl uppercase tracking-tighter leading-tight group-hover:text-red-500 transition-colors">{complaint.itemName}</Typography>
                          <div className="flex items-center gap-2">
                             <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-black">Ref: {complaint.id}</Typography>
                             <div className="w-1 h-1 rounded-full bg-bazar-gray-200 dark:bg-bazar-gray-800" />
                             <Typography variant="bodySm" className="text-[9px] opacity-40 uppercase tracking-widest font-black">{complaint.itemType}</Typography>
                          </div>
                       </div>
                       
                       <div className="mt-10 pt-10 border-t border-bazar-gray-100 dark:border-bazar-gray-900 space-y-6">
                          <div>
                             <Typography variant="bodySm" className="text-[9px] opacity-30 uppercase tracking-[0.2em] font-black mb-2">Audit Timestamp</Typography>
                             <Typography variant="bodySm" className="text-xs font-black">{new Date(complaint.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
                          </div>
                          <Button variant="outline" size="sm" className="w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border-bazar-gray-100 dark:border-bazar-gray-900 hover:bg-bazar-black hover:text-white transition-all">
                             Track Audit
                          </Button>
                       </div>
                    </div>
                    
                    {/* Reason & Proof Content */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                       <div className="space-y-6">
                          <div className="flex items-center gap-2">
                             <MessageSquare className="w-4 h-4 opacity-20" />
                             <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Investigation Subject</Typography>
                          </div>
                          <Typography variant="bodySm" className="text-lg md:text-xl font-medium leading-relaxed italic opacity-80 decoration-red-500/10 underline underline-offset-8">
                             "{complaint.reason}"
                          </Typography>
                       </div>

                       {complaint.proofUrl && (
                         <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 rounded-3xl border border-bazar-gray-100 dark:border-bazar-gray-900">
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white dark:border-black shadow-xl group/proof">
                               <img src={complaint.proofUrl} alt="Audit Proof" className="w-full h-full object-cover grayscale group-hover/proof:grayscale-0 transition-all duration-700 cursor-zoom-in group-hover/proof:scale-110" />
                               <div className="absolute top-2 right-2 p-1.5 bg-bazar-black/80 dark:bg-bazar-white/80 rounded-lg backdrop-blur-md">
                                  {complaint.proofType === 'IMAGE' ? <ImageIcon className="w-3 h-3 text-white dark:text-black" /> : <Video className="w-3 h-3 text-white dark:text-black" />}
                               </div>
                            </div>
                            <div className="space-y-1">
                               <Typography variant="titleSm" className="font-black text-sm uppercase tracking-tighter">Evidence Attached</Typography>
                               <Typography variant="bodySm" className="text-[10px] opacity-40 leading-relaxed max-w-[200px] font-medium uppercase tracking-widest">
                                  {complaint.proofType === 'IMAGE' ? 'Photographic evidence' : 'Video footage'} submitted as proof of dissatisfaction.
                               </Typography>
                            </div>
                            <Button variant="ghost" size="sm" className="sm:ml-auto text-[9px] font-black uppercase tracking-widest gap-2">
                               Download Proof <Upload className="w-3 h-3 rotate-180" />
                            </Button>
                         </div>
                       )}
                    </div>
                 </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ComplaintModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
          router.replace('/account/complains');
        }} 
        initialItem={selectedItem} 
      />
    </div>
  );
}

export default function ComplainsPage() {
  return (
    <Suspense fallback={
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-bazar-gray-100 border-t-bazar-black dark:border-bazar-gray-900 dark:border-t-bazar-white rounded-full animate-spin" />
        <Typography variant="bodySm" className="font-black uppercase tracking-widest opacity-40">Loading Audit Terminal...</Typography>
      </div>
    }>
      <ComplainsContent />
    </Suspense>
  );
}
