"use client";

import { useState, use } from "react";
import { SERVICES } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Star, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = use(params);
  const service = SERVICES.find(s => s.slug === slug);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!service) return notFound();

  const dates = ["May 12", "May 13", "May 14", "May 15", "May 16"];
  const times = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <Link 
        href="/services"
        className="inline-flex items-center gap-2 text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white mb-12 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <Typography variant="navLink" className="uppercase tracking-widest text-xs">Back to Services</Typography>
      </Link>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Left: Info */}
        <div className="lg:col-span-7 space-y-12">
           <div className="space-y-6">
              <div className="px-3 py-1 bg-bazar-gray-100 dark:bg-bazar-gray-900 rounded-full inline-block text-[10px] font-bold uppercase tracking-widest">
                 {service.category}
              </div>
              <Typography variant="displayLg">{service.name}</Typography>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    <Typography variant="titleSm">{service.rating} (124 reviews)</Typography>
                 </div>
                 <div className="flex items-center gap-2 opacity-60">
                    <Clock className="w-4 h-4" />
                    <Typography variant="bodySm">{service.duration} mins session</Typography>
                 </div>
              </div>
           </div>

           <div className="relative aspect-video rounded-3xl overflow-hidden bg-bazar-gray-100 border border-bazar-gray-200 dark:border-bazar-gray-800">
              <Image src={service.image} alt={service.name} fill className="object-cover" />
           </div>

           <div className="space-y-6">
              <Typography variant="titleLg">About this service</Typography>
              <Typography variant="bodyMd" className="leading-relaxed text-lg">
                {service.description} This professional service provided by <strong>{service.providerName}</strong> 
                follows strict quality guidelines. Whether you are looking for a quick fix or a long-term solution, 
                our vetted experts are ready to assist you with the highest standard of excellence.
              </Typography>
              <div className="grid grid-cols-2 gap-4 py-8 border-y border-bazar-gray-100 dark:border-bazar-gray-900">
                 {[
                   "Vetted Professional", "Verified Identity", "Escrow Protection", "Quality Guaranteed"
                 ].map(f => (
                   <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <Typography variant="bodySm" className="text-xs font-medium">{f}</Typography>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Booking Widget (Cal.com inspired) */}
        <div className="lg:col-span-5 relative">
           <div className="sticky top-32">
              <Card className="p-8 border-2 border-bazar-black dark:border-bazar-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-bazar-gray-50 dark:bg-bazar-gray-900 -mr-12 -mt-12 rounded-full opacity-50" />
                 
                 <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                       <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] opacity-40">Price</Typography>
                       <Typography variant="displaySm">NPR {service.price.toLocaleString()}</Typography>
                    </div>
                    <div className="text-right">
                       <Typography variant="titleSm" className="uppercase tracking-widest text-[10px] opacity-40">Duration</Typography>
                       <Typography variant="titleLg">{service.duration}m</Typography>
                    </div>
                 </div>

                 {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                       <div>
                          <Typography variant="titleSm" className="mb-4">1. Select a Date</Typography>
                          <div className="grid grid-cols-5 gap-2">
                             {dates.map(date => (
                               <button 
                                 key={date}
                                 onClick={() => setSelectedDate(date)}
                                 className={cn(
                                   "py-3 rounded-lg border text-[10px] font-bold uppercase transition-all",
                                   selectedDate === date 
                                     ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-transparent" 
                                     : "border-bazar-gray-100 dark:border-bazar-gray-800 hover:border-bazar-black dark:hover:border-bazar-white"
                                 )}
                               >
                                  {date.split(' ')[0]}<br/>{date.split(' ')[1]}
                               </button>
                             ))}
                          </div>
                       </div>

                       {selectedDate && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                             <Typography variant="titleSm" className="mb-4">2. Available Times</Typography>
                             <div className="grid grid-cols-2 gap-2">
                                {times.map(time => (
                                  <button 
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={cn(
                                      "py-3 rounded-lg border text-xs font-mono transition-all",
                                      selectedTime === time 
                                        ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-transparent" 
                                        : "border-bazar-gray-100 dark:border-bazar-gray-800 hover:border-bazar-black dark:hover:border-bazar-white"
                                    )}
                                  >
                                     {time}
                                  </button>
                                ))}
                             </div>
                          </div>
                       )}

                       <Button 
                         className="w-full h-14 group" 
                         disabled={!selectedTime}
                         onClick={() => setStep(2)}
                       >
                          NEXT STEP <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                       </Button>
                    </div>
                 )}

                 {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                       <Typography variant="titleSm">3. Confirmation Details</Typography>
                       <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900">
                             <Typography variant="caption" className="text-bazar-gray-500 mb-2">Selected Schedule</Typography>
                             <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 opacity-40" />
                                <Typography variant="titleSm">{selectedDate}, 2026 at {selectedTime}</Typography>
                             </div>
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Special Requirements</label>
                             <textarea 
                                className="w-full p-4 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl text-sm outline-none focus:border-bazar-black dark:focus:border-bazar-white" 
                                placeholder="Add any notes for the provider..."
                                rows={3}
                             />
                          </div>
                       </div>

                       <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                          <Button className="flex-1" onClick={() => setStep(3)}>Confirm Booking</Button>
                       </div>
                    </div>
                 )}

                 {step === 3 && (
                    <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                       <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-8 h-8" />
                       </div>
                       <Typography variant="displaySm" className="mb-4">Booking Confirmed!</Typography>
                       <Typography variant="bodyMd" className="opacity-60 mb-8 px-4">
                          Your request has been sent to <strong>{service.providerName}</strong>. 
                          You'll receive a confirmation email shortly.
                       </Typography>
                       <div className="space-y-2">
                          <Button className="w-full" variant="outline">View My Bookings</Button>
                          <Button className="w-full" variant="ghost" onClick={() => {setStep(1); setSelectedDate(null); setSelectedTime(null);}}>Book another session</Button>
                       </div>
                    </div>
                 )}

                 <div className="mt-8 pt-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center gap-3 opacity-40">
                    <ShieldCheck className="w-4 h-4" />
                    <Typography variant="bodySm" className="text-[10px] uppercase tracking-widest">Secure Escrow Protection</Typography>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </main>
  );
}
