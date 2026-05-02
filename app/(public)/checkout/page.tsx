"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "Kathmandu",
    phone: "",
    paymentMethod: "cod"
  });
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0 && step < 4) {
       // router.push('/');
    }
  }, [items, step, router]);

  if (!isMounted) return null;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleComplete = () => {
    nextStep();
    setTimeout(() => {
        clearCart();
    }, 1000);
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-12 gap-16">
        
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-8 space-y-12">
           <header className="mb-12">
              <Link href="/" className="inline-flex items-center gap-2 text-bazar-gray-500 hover:text-bazar-black dark:hover:text-bazar-white mb-8 transition-colors group">
                 <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                 <Typography variant="navLink" className="uppercase tracking-widest text-[10px]">Return to Market</Typography>
              </Link>
              <Typography variant="displayMd" className="tracking-tighter">Checkout</Typography>
           </header>

           {/* Step Indicator */}
           <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
              <StepIndicator num={1} label="Shipping" active={step >= 1} completed={step > 1} />
              <div className="w-12 h-[1px] bg-bazar-gray-200 dark:bg-bazar-gray-800" />
              <StepIndicator num={2} label="Payment" active={step >= 2} completed={step > 2} />
              <div className="w-12 h-[1px] bg-bazar-gray-200 dark:bg-bazar-gray-800" />
              <StepIndicator num={3} label="Review" active={step >= 3} completed={step > 3} />
           </div>

           <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <Typography variant="titleLg">Shipping Details</Typography>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Full Name</label>
                         <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-bazar-gray-200 dark:border-bazar-gray-800 py-3 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-colors"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Email Address</label>
                         <input 
                            type="email" 
                            className="w-full bg-transparent border-b border-bazar-gray-200 dark:border-bazar-gray-800 py-3 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-colors"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                         />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Delivery Address</label>
                         <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-bazar-gray-200 dark:border-bazar-gray-800 py-3 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-colors"
                            placeholder="Street Name, Area, Ward No."
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Phone Number</label>
                         <div className="flex items-center gap-2">
                            <span className="opacity-40 font-mono text-sm">+977</span>
                            <input 
                                type="tel" 
                                className="w-full bg-transparent border-b border-bazar-gray-200 dark:border-bazar-gray-800 py-3 outline-none focus:border-bazar-black dark:focus:border-bazar-white transition-colors"
                                placeholder="98XXXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>
                   <Button 
                      className="w-full h-16 text-lg font-black tracking-widest group" 
                      onClick={nextStep}
                      disabled={!formData.fullName || !formData.address || !formData.phone}
                   >
                      CONTINUE TO PAYMENT <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <Typography variant="titleLg">Payment Method</Typography>
                   <div className="grid md:grid-cols-2 gap-4">
                      <PaymentOption 
                         id="cod" 
                         label="Cash on Delivery" 
                         icon={Truck} 
                         selected={formData.paymentMethod === 'cod'} 
                         onSelect={() => setFormData({...formData, paymentMethod: 'cod'})}
                      />
                      <PaymentOption 
                         id="esewa" 
                         label="Digital Wallet (eSewa/Khalti)" 
                         icon={Smartphone} 
                         selected={formData.paymentMethod === 'esewa'} 
                         onSelect={() => setFormData({...formData, paymentMethod: 'esewa'})}
                      />
                      <PaymentOption 
                         id="card" 
                         label="Credit / Debit Card" 
                         icon={CreditCard} 
                         selected={formData.paymentMethod === 'card'} 
                         onSelect={() => setFormData({...formData, paymentMethod: 'card'})}
                      />
                   </div>
                   <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 h-14" onClick={prevStep}>BACK</Button>
                      <Button className="flex-[2] h-14 font-black tracking-widest" onClick={nextStep}>REVIEW ORDER</Button>
                   </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <Typography variant="titleLg">Review & Confirm</Typography>
                   
                   <Card variant="surface" className="p-8 border-none bg-bazar-gray-50 dark:bg-bazar-gray-950">
                      <div className="grid md:grid-cols-2 gap-12">
                         <div>
                            <Typography variant="caption" className="opacity-40 mb-4 block">Shipping To</Typography>
                            <Typography variant="titleSm" className="mb-1">{formData.fullName}</Typography>
                            <Typography variant="bodySm" className="text-xs leading-relaxed">{formData.address}, {formData.city}</Typography>
                            <Typography variant="bodySm" className="text-xs mt-1 font-mono">{formData.phone}</Typography>
                         </div>
                         <div>
                            <Typography variant="caption" className="opacity-40 mb-4 block">Payment Via</Typography>
                            <div className="flex items-center gap-3">
                               <CreditCard className="w-4 h-4" />
                               <Typography variant="titleSm" className="uppercase">{formData.paymentMethod}</Typography>
                            </div>
                         </div>
                      </div>
                   </Card>

                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs opacity-40 font-mono">
                         <ShieldCheck className="w-4 h-4" />
                         YOUR TRANSACTION IS PROTECTED BY BAZAR ESCROW
                      </div>
                      <Button className="w-full h-16 text-lg font-black tracking-widest" onClick={handleComplete}>
                         PLACE ORDER — NPR {totalPrice.toLocaleString()}
                      </Button>
                      <Button variant="ghost" className="w-full" onClick={prevStep}>Change Details</Button>
                   </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 space-y-8"
                >
                   <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12" />
                   </div>
                   <div>
                      <Typography variant="displayMd">Order Placed!</Typography>
                      <Typography variant="bodyMd" className="opacity-60 max-w-sm mx-auto mt-4">
                         Your order **#BZ-92841** has been successfully placed. 
                         The vendors have been notified and will begin fulfillment shortly.
                      </Typography>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                      <Button onClick={() => router.push('/')}>Return Home</Button>
                      <Button variant="outline" onClick={() => router.push('/dashboard/orders')}>Track in Dashboard</Button>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 relative">
           <div className="sticky top-32 space-y-6">
              <Card className="p-8 border-2 border-bazar-black dark:border-bazar-white overflow-hidden shadow-2xl">
                 <Typography variant="titleSm" className="uppercase tracking-[0.2em] text-[10px] opacity-40 mb-8 font-black">Order Summary</Typography>
                 
                 <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                         <div className="relative w-12 h-12 rounded bg-bazar-gray-50 dark:bg-bazar-gray-900 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover rounded grayscale" />
                         </div>
                         <div className="flex-1">
                            <Typography variant="titleSm" className="text-xs truncate max-w-[150px]">{item.name}</Typography>
                            <Typography variant="bodySm" className="text-[10px] opacity-40">{item.quantity} × NPR {item.price.toLocaleString()}</Typography>
                         </div>
                         <Typography variant="titleSm" className="text-xs">NPR {(item.price * item.quantity).toLocaleString()}</Typography>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <Typography variant="bodySm" className="opacity-40 italic py-4">No items in cart.</Typography>
                    )}
                 </div>

                 <div className="space-y-4 pt-8 border-t border-bazar-gray-100 dark:border-bazar-gray-900">
                    <div className="flex justify-between text-xs">
                       <span className="opacity-40 uppercase tracking-widest">Subtotal</span>
                       <span className="font-mono">NPR {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="opacity-40 uppercase tracking-widest">Shipping</span>
                       <span className="font-mono">NPR 150</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">Total</span>
                       <span className="text-2xl font-bold tracking-tighter">NPR {(totalPrice + 150).toLocaleString()}</span>
                    </div>
                 </div>
              </Card>

              <div className="px-4 py-6 rounded-xl border border-bazar-gray-100 dark:border-bazar-gray-800 flex items-center gap-4">
                 <Truck className="w-5 h-5 opacity-40" />
                 <div>
                    <Typography variant="titleSm" className="text-[10px] uppercase">Estimated Delivery</Typography>
                    <Typography variant="bodySm" className="text-xs opacity-60">24-48 Hours (Inside Valley)</Typography>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}

function StepIndicator({ num, label, active, completed }: { num: number; label: string; active: boolean; completed: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 transition-opacity duration-300",
      active ? "opacity-100" : "opacity-30"
    )}>
       <div className={cn(
         "w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all",
         completed ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black border-transparent" :
         active ? "border-bazar-black dark:border-bazar-white" : "border-bazar-gray-200 dark:border-bazar-gray-800"
       )}>
          {completed ? <CheckCircle2 className="w-4 h-4" /> : num}
       </div>
       <Typography variant="bodySm" className={cn(
         "text-[10px] uppercase tracking-widest font-black",
         active ? "text-bazar-black dark:text-bazar-white" : ""
       )}>{label}</Typography>
    </div>
  );
}

function PaymentOption({ id, label, icon: Icon, selected, onSelect }: any) {
  return (
    <button 
      onClick={onSelect}
      className={cn(
        "p-6 rounded-2xl border-2 text-left transition-all flex flex-col gap-4",
        selected 
          ? "border-bazar-black dark:border-bazar-white bg-bazar-black/5" 
          : "border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white"
      )}
    >
       <div className={cn(
         "w-10 h-10 rounded-full flex items-center justify-center",
         selected ? "bg-bazar-black text-bazar-white dark:bg-bazar-white dark:text-bazar-black" : "bg-bazar-gray-50 dark:bg-bazar-gray-950"
       )}>
          <Icon className="w-5 h-5" />
       </div>
       <div>
          <Typography variant="titleSm" className="text-xs uppercase tracking-widest">{label}</Typography>
       </div>
    </button>
  );
}
