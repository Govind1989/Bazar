"use client";

import { useCalendarStore, BookedService } from "@/store/useCalendarStore";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Calendar, X, Trash2, Tag, Gift, CheckCircle2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Portal } from "./Portal";

export function CalendarToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { bookedServices, totalBookings, removeService, clearCalendar } = useCalendarStore();
  const { campaigns } = useCampaignStore();
  const { enrolledCampaignIds, toggleEnrollCampaign } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const serviceCampaigns = useMemo(() => {
    return bookedServices.flatMap(service => {
      const vendorCampaigns = campaigns.filter(campaign => 
        campaign.vendorId === service.vendorId && 
        (campaign.type !== 'LOYALTY' || enrolledCampaignIds.includes(campaign.id)) &&
        campaign.status === 'ACTIVE'
      );
      
      // Filter campaigns active on the booking date
      const bookingDate = new Date(service.bookingDate);
      return vendorCampaigns.filter(campaign => {
        const start = new Date(campaign.startDate);
        const end = new Date(campaign.endDate);
        return bookingDate >= start && bookingDate <= end;
      }).map(c => ({ ...c, serviceId: service.id, bookingDate: service.bookingDate }));
    });
  }, [bookedServices, campaigns, enrolledCampaignIds]);

  if (!mounted) return null;

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <Calendar className="w-5 h-5" />
        {totalBookings > 0 && (
          <span className="absolute -top-1 -right-1 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalBookings}
          </span>
        )}
      </Button>

      <Portal>
        {/* Calendar Drawer Overlay */}
        <div 
          className={cn(
            "fixed inset-0 bg-bazar-black/60 backdrop-blur-md z-[400] transition-opacity duration-500 flex items-center justify-center",
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

        {/* Calendar Drawer Content */}
        <div 
          className={cn(
            "fixed top-0 right-0 h-full w-full sm:max-w-md bg-bazar-white dark:bg-bazar-black z-[401] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-8 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
              <div>
                <Typography variant="titleMd" className="font-black uppercase tracking-tighter">Your Bookings</Typography>
                <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{totalBookings} Services Scheduled</Typography>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-10 w-10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-10 custom-scrollbar">
              {bookedServices.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 rounded-3xl bg-bazar-gray-50 dark:bg-bazar-gray-950 flex items-center justify-center mb-6 opacity-20">
                    <Calendar className="w-10 h-10" />
                  </div>
                  <Typography variant="titleSm" className="font-black uppercase tracking-tighter mb-2">No bookings yet</Typography>
                  <Typography variant="bodySm" className="opacity-40 max-w-[200px]">Your scheduled services and appointments will appear here.</Typography>
                </div>
              ) : (
                <>
                  {/* Campaign Section */}
                  {serviceCampaigns.length > 0 && (
                    <div className="space-y-4">
                       <Typography variant="titleSm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Booking Benefits</Typography>
                       <div className="space-y-3">
                          {serviceCampaigns.map((campaign, idx) => (
                            <div key={`${campaign.id}-${idx}`} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex gap-4 items-center group">
                               <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                  <Tag className="w-5 h-5" />
                               </div>
                               <div className="flex-1 min-w-0">
                                  <Typography variant="titleSm" className="text-[13px] font-black uppercase tracking-tighter line-clamp-1">{campaign.title}</Typography>
                                  <Typography variant="bodySm" className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                    Valid for {campaign.bookingDate}
                                  </Typography>
                               </div>
                               <Button size="sm" className="h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest bg-purple-500 hover:bg-purple-600 text-white">
                                  Redeem
                               </Button>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    <Typography variant="titleSm" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Scheduled Services</Typography>
                    {bookedServices.map((service: BookedService) => (
                      <div key={`${service.id}-${service.bookingDate}`} className="flex gap-4 group">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-bazar-gray-50 dark:bg-bazar-gray-950 flex-shrink-0 border border-bazar-gray-100 dark:border-bazar-gray-900">
                           <Image src={service.image} alt={service.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div className="flex justify-between gap-2">
                            <div>
                              <Typography variant="titleSm" className="text-sm font-black uppercase tracking-tighter truncate">{service.name}</Typography>
                              <Typography variant="bodySm" className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Date: {service.bookingDate}</Typography>
                            </div>
                            <Typography variant="titleSm" className="text-sm font-black">रु {service.price.toLocaleString()}</Typography>
                          </div>
                          
                          <div className="flex justify-end items-center mt-4">
                            <button 
                              className="w-8 h-8 flex items-center justify-center text-bazar-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                              onClick={() => removeService(service.id, service.bookingDate)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {bookedServices.length > 0 && (
              <div className="p-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <button 
                  className="w-full text-[10px] opacity-40 hover:opacity-100 hover:text-red-500 uppercase font-black tracking-[0.2em] py-4 border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 rounded-2xl transition-all" 
                  onClick={clearCalendar}
                >
                  Clear All Bookings
                </button>
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
}
