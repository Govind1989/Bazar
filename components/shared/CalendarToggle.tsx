"use client";

import { useCalendarStore, BookedService } from "@/store/useCalendarStore";
import { Button } from "@/components/ui/button";
import { Calendar, X, Trash2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CalendarToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { bookedServices, totalBookings, removeService, clearCalendar } = useCalendarStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Calendar Drawer Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-bazar-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Calendar Drawer Content */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-bazar-white dark:bg-bazar-black z-[101] shadow-2xl transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center">
            <Typography variant="titleMd" className="uppercase tracking-widest">Your Bookings ({totalBookings})</Typography>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {bookedServices.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <Calendar className="w-12 h-12 mb-4" />
                <Typography variant="bodyMd">No bookings found</Typography>
              </div>
            ) : (
              <div className="space-y-8">
                {bookedServices.map((service: BookedService) => (
                  <div key={`${service.id}-${service.bookingDate}`} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-bazar-gray-100 dark:bg-bazar-gray-900 flex-shrink-0">
                       <Image src={service.image} alt={service.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <Typography variant="titleSm" className="text-sm">{service.name}</Typography>
                        <Typography variant="titleSm" className="text-sm">NPR {service.price.toLocaleString()}</Typography>
                      </div>
                      <Typography variant="bodySm" className="text-xs mb-4 opacity-60 uppercase tracking-wider">
                         Date: {service.bookingDate}
                      </Typography>
                      <div className="flex justify-end items-center">
                        <button 
                          className="text-bazar-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeService(service.id, service.bookingDate)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {bookedServices.length > 0 && (
            <div className="p-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 space-y-4">
              <Button variant="ghost" className="w-full text-xs opacity-50" onClick={clearCalendar}>Clear Bookings</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
