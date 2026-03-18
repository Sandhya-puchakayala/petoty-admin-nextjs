"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function DiscountsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1000px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-2 bg-background">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Discounts
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground/80 font-medium px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
              <Upload className="w-4 h-4 text-muted-foreground" />
              Export
            </button>
            <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
              Create discount
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden relative"
        >
          <div className="py-16 md:py-24 px-6 flex flex-col items-center justify-center text-center">
            
            {/* Custom Illustration */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="relative w-48 h-48 mb-8"
            >
               {/* Light Gray Backdrop Circle */}
               <div className="absolute inset-0 bg-muted/60 rounded-full w-[85%] h-[85%] mx-auto my-auto top-0 bottom-0 left-0 right-0 z-0"></div>

               {/* Composition Wrapper */}
               <div className="absolute inset-0 z-10 flex items-center justify-center -translate-y-2">
                 
                 {/* Discount Ticket */}
                 <div className="relative z-10 w-24 h-14 bg-[#F2B040] rounded shadow-sm flex items-center -translate-x-2 -translate-y-2 transform rotate-[-8deg]">
                   {/* Left % Side */}
                   <div className="flex-1 h-full flex items-center justify-center border-r-[1.5px] border-dashed border-white/60">
                     <span className="text-white text-2xl font-bold leading-none select-none">%</span>
                   </div>
                   {/* Right Side */}
                   <div className="w-1/3 h-full flex items-center justify-center">
                     <div className="w-1 h-1 rounded-full bg-white/60"></div>
                   </div>
                   {/* Ticket cutouts */}
                   <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-card rounded-full"></div>
                   <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-card rounded-full"></div>
                 </div>

                 {/* Scissors (Green matching Shopify branding #008060) */}
                 <div className="absolute z-20 w-16 h-28 transform translate-x-4 translate-y-6 rotate-[15deg]">
                    <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-md">
                      {/* Left Blade (Background) */}
                      <path d="M 45 40 L 30 15 L 45 3 Z" fill="#EAE8E4" />
                      {/* Right Blade (Foreground) */}
                      <path d="M 55 40 L 70 10 L 55 0 Z" fill="#D1CDCB" />
                      
                      {/* Pivot Screw */}
                      <circle cx="50" cy="45" r="3" fill="#A19E9D" />

                      {/* Left Handle */}
                      <path d="M 45 50 Q 30 70 15 90 Q 5 105 15 115 Q 25 125 35 110 L 50 65" fill="#008060" />
                      {/* Left Handle Hole */}
                      <ellipse cx="22" cy="105" rx="8" ry="10" fill="#FFFFFF" transform="rotate(-30 22 105)" />
                      
                      {/* Right Handle */}
                      <path d="M 55 50 Q 70 70 85 90 Q 95 105 85 115 Q 75 125 65 110 L 50 65" fill="#008060" />
                      {/* Right Handle Hole */}
                      <ellipse cx="78" cy="105" rx="8" ry="10" fill="#FFFFFF" transform="rotate(30 78 105)" />
                    </svg>
                 </div>
               </div>
            </motion.div>

            {/* Text Content */}
            <h2 className="text-xl md:text-[22px] font-semibold text-foreground mb-3">
              Manage discounts and promotions
            </h2>
            <p className="text-[#5c5f62] text-[15px] max-w-lg leading-relaxed mb-6">
              Add discount codes and automatic discounts that apply at checkout. You can also use discounts with <a href="#" className="underline text-foreground hover:text-foreground/80 transition-colors">compare at prices</a>.
            </p>
            
            <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-5 py-2 rounded-lg text-sm transition-colors shadow-sm">
              Create discount
            </button>
          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="flex justify-center pt-2 pb-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors">
            Learn more about discounts
          </a>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
