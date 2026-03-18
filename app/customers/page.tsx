"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto h-[calc(100vh-4rem)] flex flex-col pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Customers
          </h1>
        </div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden relative mt-2"
        >
          {/* Main Top Section */}
          <div className="flex flex-col md:flex-row relative">
            <div className="p-6 md:p-12 lg:p-16 flex-1 flex flex-col justify-center z-10 bg-card">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Everything customers-related in one place
              </h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                Manage customer details, see customer order history, and group customers into segments.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                  Add customer
                </button>
                <button className="bg-card hover:bg-muted border border-border text-foreground font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                  Import customers
                </button>
              </div>
            </div>

            {/* Illustration Section Right */}
            <div className="bg-card flex-1 relative min-h-[250px] flex md:items-center justify-center p-6 md:pr-16 lg:pr-24 overflow-hidden border-t md:border-t-0 border-border/50">
              <div className="relative w-full h-full flex items-center justify-end">
                {/* 
                   We will use pure CSS + SVG composition to mimic the customer profile illustration 
                   (the blue square icon matching shopify)
                */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] mr-4 lg:mr-10 flex items-center justify-center"
                >
                  {/* Backdrop Oval/Circle */}
                  <div className="absolute inset-0 bg-secondary/80 rounded-full w-[90%] h-[90%] left-[5%] top-[5%] -z-10 blur-[1px]"></div>
                  
                  {/* Teal square with portrait */}
                  <div className="absolute left-0 bottom-[15%] w-[45%] h-[50%] bg-[#77ABB0] rounded shadow-md overflow-hidden z-20 border border-border/20">
                    <svg viewBox="0 0 100 100" className="absolute bottom-0 w-full h-[90%] left-0">
                      {/* Person Silhouette (White Hair, Brown face) */}
                      <path d="M 40 10 C 20 10 20 40 30 65 L 15 80 L 15 110 L 85 110 L 85 80 L 60 55 C 65 40 60 10 40 10 Z" fill="#EAE8E4"/>
                      <path d="M 50 35 C 65 30 75 40 75 60 C 75 70 65 75 55 80 L 45 70 C 40 60 45 40 50 35 Z" fill="#91583D"/>
                      <path d="M 15 85 L 35 75 L 55 80 L 85 100 L 85 110 L 15 110 Z" fill="#1C1E1D"/>
                    </svg>
                  </div>
                  
                  {/* Document Card */}
                  <div className="absolute right-[5%] top-[20%] w-[55%] h-[60%] bg-white rounded-lg shadow-lg border border-border/80 z-10 flex flex-col p-3 justify-center gap-3">
                    <div className="w-full h-2 bg-border/60 rounded-full mt-2"></div>
                    <div className="w-full h-2 bg-border/60 rounded-full"></div>
                    <div className="w-1/2 h-2 bg-border/60 rounded-full"></div>
                    
                    {/* Green Pill button */}
                    <div className="w-2/3 h-4 bg-petoty-success/90 rounded-full mt-auto mb-2 self-start"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom App Recommendation Section */}
          <div className="border-t border-border bg-card/60 p-6 md:p-12 lg:px-16 flex flex-col bg-[#FAF9F8]">
            <h3 className="text-lg font-semibold text-foreground mb-2">Get customers with apps</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-lg">
              Grow your customer list by adding a lead capture form to your store and marketing.
            </p>
            <div>
              <button className="bg-card hover:bg-muted border border-border text-foreground font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                See app recommendations
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="flex justify-center pb-8 pt-4">
          <a href="#" className="flex items-center gap-2 text-sm text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-border font-medium bg-muted/50">
            Learn more about customers
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
