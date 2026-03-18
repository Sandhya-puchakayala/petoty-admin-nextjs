"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Calendar, 
  ChevronDown, 
  Info, 
  RefreshCw, 
  Maximize2, 
  Pencil, 
  ArrowRightLeft
} from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-2 bg-background">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-[22px] font-bold text-foreground">
              Analytics
            </h1>
            <span className="text-sm text-muted-foreground mt-1 font-medium">
              Last refreshed: 11:50 AM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-card hover:bg-muted border border-border text-muted-foreground p-1.5 rounded-lg shadow-sm transition-colors text-foreground/80 hover:text-foreground">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="bg-card hover:bg-muted border border-border text-muted-foreground p-1.5 rounded-lg shadow-sm transition-colors text-foreground/80 hover:text-foreground">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="bg-card hover:bg-muted border border-border text-muted-foreground p-1.5 rounded-lg shadow-sm transition-colors text-foreground/80 hover:text-foreground">
              <Pencil className="w-4 h-4" />
            </button>
            <button className="ml-1 bg-foreground hover:bg-foreground/90 text-background font-medium px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
              New exploration
            </button>
          </div>
        </div>

        {/* Filters Top Row */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-[13px] font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Today
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
          </button>
          <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-[13px] font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Mar 17, 2026
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
          </button>
          <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-[13px] font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors">
            <ArrowRightLeft className="w-3.5 h-3.5 text-muted-foreground" />
            INR ₹
          </button>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <div className="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:border-border/80 transition-all group">
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[13px] font-medium border-b border-border/70 border-dashed w-max text-foreground/80 group-hover:text-foreground transition-colors">
                Gross sales
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[20px] font-medium text-foreground">₹0.00</span>
                <span className="text-muted-foreground font-medium">—</span>
              </div>
            </div>
            <div className="w-16 h-0.5 bg-blue-400 rounded-full mt-auto"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:border-border/80 transition-all group">
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[13px] font-medium border-b border-border/70 border-dashed w-max text-foreground/80 group-hover:text-foreground transition-colors">
                Returning customer rate
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[20px] font-medium text-foreground">0%</span>
                <span className="text-muted-foreground font-medium">—</span>
              </div>
            </div>
            <div className="w-10 h-0.5 bg-blue-300 rounded-full mt-auto"></div>
          </div>

          {/* Card 3 */}
          <div className="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:border-border/80 transition-all group">
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[13px] font-medium border-b border-border/70 border-dashed w-max text-foreground/80 group-hover:text-foreground transition-colors">
                Orders fulfilled
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[20px] font-medium text-foreground">0</span>
                <span className="text-muted-foreground font-medium">—</span>
              </div>
            </div>
            <div className="w-12 h-0.5 bg-blue-200 rounded-full mt-auto opacity-70"></div>
          </div>

          {/* Card 4 */}
          <div className="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:border-border/80 transition-all relative group">
            <Info className="absolute right-4 top-4 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[13px] font-medium border-b border-border/70 border-dashed w-max text-foreground/80 group-hover:text-foreground transition-colors">
                Orders
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[20px] font-medium text-foreground">0</span>
                <span className="text-muted-foreground font-medium">—</span>
              </div>
            </div>
            <div className="w-8 h-0.5 bg-blue-200 rounded-full mt-auto opacity-70"></div>
          </div>

        </div>

        {/* Main Grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Card (Takes 2/3) */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 0.1 }}
             className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6 relative flex flex-col overflow-hidden"
          >
            <Info className="absolute right-6 top-6 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <h2 className="text-[14px] font-semibold text-foreground mb-1">
               Total sales over time
            </h2>
            <div className="flex items-baseline gap-2 mb-8">
               <span className="text-2xl font-semibold">₹0.00</span>
               <span className="text-muted-foreground">—</span>
            </div>

            {/* Fake Chart Illustration */}
            <div className="flex-1 w-full min-h-[220px] relative mt-4">
              {/* Y Axis Grid lines */}
              <div className="absolute inset-x-0 top-0 border-t border-border/50 text-muted-foreground/80 text-[11px] font-mono">
                <span className="-translate-y-2 absolute">₹10</span>
              </div>
              <div className="absolute inset-x-0 top-1/2 border-t border-border/50 text-muted-foreground/80 text-[11px] font-mono">
                <span className="-translate-y-2 absolute">₹5</span>
              </div>
              <div className="absolute inset-x-0 bottom-6 border-t border-border/50 text-muted-foreground/80 text-[11px] font-mono">
                <span className="-translate-y-2 absolute">₹0</span>
              </div>

              {/* Data Lines (Dashed blue & Solid cyan on the zero line) */}
              <div className="absolute inset-x-7 bottom-6 h-[2px] flex flex-col justify-end">
                  {/* Today Dashed line */}
                  <div className="absolute w-full h-[3px] border-b-2 border-dashed border-[#2B73EB]/80" style={{ bottom: "0px" }}></div>
                  {/* Comparison Solid line (half width hypothetically) */}
                  <div className="absolute w-1/2 h-[2px] bg-[#61BAED]/60" style={{ bottom: "2px" }}></div>
              </div>

              {/* X Axis labels */}
              <div className="absolute bottom-0 inset-x-0 flex justify-between ml-7 text-[11px] text-muted-foreground font-mono">
                <span>12 AM</span>
                <span>2 AM</span>
                <span>4 AM</span>
                <span>6 AM</span>
                <span>8 AM</span>
                <span>10 AM</span>
                <span>12 PM</span>
                <span>2 PM</span>
                <span>4 PM</span>
                <span>6 PM</span>
                <span>8 PM</span>
                <span>10 PM</span>
              </div>
            </div>

            {/* Legend bottom */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-2">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2B73EB]"></div>
                  <span className="text-xs text-muted-foreground font-medium">Mar 18, 2026</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#61BAED]"></div>
                  <span className="text-xs text-muted-foreground font-medium">Mar 17, 2026</span>
               </div>
            </div>
          </motion.div>

          {/* Table Breakdown Card (Takes 1/3) */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 0.2 }}
             className="bg-card rounded-xl border border-border shadow-sm p-6 relative flex flex-col"
          >
            <Info className="absolute right-6 top-6 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <h2 className="text-[14px] font-semibold text-foreground mb-4">
              Total sales breakdown
            </h2>

            {/* List */}
            <div className="flex flex-col flex-1 text-[13px]">
              
              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Gross sales</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Discounts</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Returns</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group mt-auto">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Net sales</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Shipping charges</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Return fees</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-border/40 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline">Taxes</span>
                 <div className="flex items-center gap-3">
                    <span className="font-medium">₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center">—</span>
                 </div>
              </div>

              <div className="flex justify-between items-center py-3 border-b-0 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors group font-semibold text-[14px]">
                 <span className="text-[#2B73EB] cursor-pointer group-hover:underline font-normal">Total sales</span>
                 <div className="flex items-center gap-3">
                    <span>₹0.00</span>
                    <span className="text-muted-foreground w-4 text-center font-normal">—</span>
                 </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Small Cards Row */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, delay: 0.3 }}
           className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6"
        >
          {/* Bottom Card 1 */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 h-44 flex flex-col justify-between hover:border-border/80 transition-colors">
            <h2 className="text-[14px] font-semibold text-foreground">Total sales by sales channel</h2>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[13px] text-muted-foreground">No data for this date range</span>
            </div>
          </div>

          {/* Bottom Card 2 (With Mini Chart) */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 h-44 flex flex-col relative hover:border-border/80 transition-colors overflow-hidden">
            <h2 className="text-[14px] font-semibold text-foreground mb-1">Average order value over time</h2>
            <div className="flex items-baseline gap-2 mb-2">
               <span className="text-[20px] font-semibold">₹0.00</span>
               <span className="text-muted-foreground font-medium text-sm">—</span>
            </div>
            
            <div className="flex-1 relative w-full mt-2">
              <div className="absolute inset-x-0 top-0 border-t border-border/50 text-muted-foreground/80 text-[10px] font-mono"><span className="-translate-y-2 absolute">₹10</span></div>
              <div className="absolute inset-x-0 top-1/2 border-t border-border/50 text-muted-foreground/80 text-[10px] font-mono"><span className="-translate-y-2 absolute">₹5</span></div>
              <div className="absolute inset-x-0 bottom-1 border-t border-border/50 text-muted-foreground/80 text-[10px] font-mono"><span className="-translate-y-2 absolute">₹0</span></div>

              <div className="absolute w-full h-[2px] bg-[#2B73EB]/80 bottom-1"></div>
            </div>
          </div>

          {/* Bottom Card 3 */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 h-44 flex flex-col justify-between hover:border-border/80 transition-colors">
            <h2 className="text-[14px] font-semibold text-foreground">Total sales by product</h2>
            <div className="flex-1 flex items-end justify-center pb-2">
              {/* Added a bit of gap to position the text accurately towards bottom */}
              <span className="text-[13px] text-muted-foreground">No data for this date range</span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </DashboardLayout>
  );
}
