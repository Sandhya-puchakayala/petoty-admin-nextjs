"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

export default function MetaobjectsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1000px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-2 bg-background">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-xl md:text-[22px] font-bold text-foreground">
            Metaobjects
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground/80 font-medium px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
              Manage
            </button>
            <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
              Add definition
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="bg-card rounded-xl border border-border flex flex-col overflow-hidden relative"
        >
          <div className="py-20 md:py-28 px-6 flex flex-col items-center justify-center text-center">
            
            {/* Custom SVG Illustration */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="relative w-[280px] h-[180px] mb-8"
            >
               {/* Browser UI Background */}
               <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                 <div className="w-[85%] h-[85%] bg-muted/60 rounded-xl shadow-sm border border-border/40 flex flex-col overflow-hidden -rotate-1 origin-bottom-right">
                   {/* Browser Bar */}
                   <div className="h-6 bg-border/40 w-full flex items-center px-3 gap-1">
                     <div className="w-2 h-2 rounded-full bg-border/80"></div>
                     <div className="w-2 h-2 rounded-full bg-border/80"></div>
                     <div className="w-2 h-2 rounded-full bg-border/80"></div>
                   </div>
                   {/* Browser Content placeholder lines */}
                   <div className="p-4 flex flex-col gap-3">
                      <div className="w-1/2 h-2.5 bg-border/40 rounded-full"></div>
                      <div className="w-3/4 h-2.5 bg-border/40 rounded-full"></div>
                      <div className="w-2/3 h-2.5 bg-border/40 rounded-full"></div>
                   </div>
                 </div>
               </div>

               {/* Metaobjects specific Illustration overlay */}
               <div className="absolute inset-0 z-10 flex items-center justify-center">
                 {/* Connection Lines (SVGs) */}
                 <div className="absolute w-full h-full">
                    <svg viewBox="0 0 280 180" className="w-full h-full">
                      {/* Line from yellow pill to right */}
                      <path d="M 120 100 L 150 100" stroke="#1C1E1D" strokeWidth="2.5" fill="none" />
                      {/* Line from green pill to right */}
                      <path d="M 130 130 L 150 130 L 150 100" stroke="#1C1E1D" strokeWidth="2.5" fill="none" className="rounded" />
                      {/* Connection node point */}
                      <circle cx="150" cy="100" r="4" fill="#1C1E1D" />
                      {/* Line connecting to card */}
                      <path d="M 154 100 L 185 100 L 185 68" stroke="#1C1E1D" strokeWidth="2.5" fill="none" />
                    </svg>
                 </div>

                 {/* Pills & Cards Elements */}
                 <div className="absolute left-[8%] bottom-[35%] w-12 h-5 bg-[#E2B75B] rounded-full border-[2.5px] border-[#1C1E1D] z-20"></div>
                 <div className="absolute left-[12%] bottom-[15%] w-16 h-5 bg-[#45A39B] rounded-full border-[2.5px] border-[#1C1E1D] z-20"></div>
                 
                 {/* Floating Content Card (Right side) */}
                 <div className="absolute right-[12%] top-[12%] w-[32%] h-[40%] bg-card rounded-lg shadow-md border-[2.5px] border-[#1C1E1D] z-20 flex flex-col p-2.5 rotate-2">
                    {/* Header lines */}
                    <div className="w-full h-2 bg-border rounded-full mb-1.5"></div>
                    <div className="w-2/3 h-2 bg-border rounded-full mb-3"></div>
                    
                    {/* Image Placeholder */}
                    <div className="w-full h-10 bg-[#72A6B2] rounded mt-auto flex items-center justify-center relative overflow-hidden">
                       <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/70">
                         <path fill="currentColor" d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
                       </svg>
                    </div>
                 </div>
               </div>
            </motion.div>

            {/* Text Content */}
            <h2 className="text-xl md:text-[22px] font-semibold text-foreground mb-3 font-sans">
              Streamline content creation with metaobjects
            </h2>
            <p className="text-[#5c5f62] text-[15px] max-w-[500px] leading-relaxed mb-6 font-sans mx-auto">
              Metaobjects allow you to group fields and connect them to
              different parts of your store. Use them to create custom content
              or data structures.
            </p>
            
            <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
              Add definition
            </button>
          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="flex justify-center pt-2 pb-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors">
            Learn more about <span className="underline underline-offset-2">metaobjects</span>
          </a>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
