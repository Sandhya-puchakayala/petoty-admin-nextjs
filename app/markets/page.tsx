"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Network, 
  Search, 
  Settings2, 
  ArrowUpDown, 
  Globe2, 
  Sparkles, 
  X, 
  ChevronUp, 
  ArrowRightToLine,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function MarketsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-4 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-2 bg-background">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-xl md:text-[22px] font-bold text-foreground">
            Markets
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm transition-colors">
              <Network className="w-4 h-4 text-muted-foreground stroke-[2px]" />
              Graph view
            </button>
            <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-4 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
              Create market
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2 mb-4">
          <button className="bg-card hover:bg-muted border border-border text-muted-foreground p-1.5 rounded-lg shadow-sm transition-colors shrink-0">
             <ArrowRightToLine className="w-[18px] h-[18px]" />
          </button>
          
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <input 
              type="text" 
              placeholder="Search in all markets" 
              className="w-full h-9 pl-9 pr-4 bg-card hover:bg-muted/50 focus:bg-card border border-border focus:border-ring rounded-lg text-sm shadow-sm outline-none transition-all placeholder:text-muted-foreground/80"
            />
          </div>

          <button className="bg-card hover:bg-muted border border-border text-muted-foreground p-1.5 rounded-lg shadow-sm transition-colors shrink-0">
             <Settings2 className="w-[18px] h-[18px]" />
          </button>
          <button className="bg-card hover:bg-muted border border-border text-muted-foreground p-1.5 rounded-lg shadow-sm transition-colors shrink-0">
             <ArrowUpDown className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Markets Table/List Container */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden text-sm"
        >
          {/* Table Header Wrapper (CSS Grid) */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/60 bg-card/50 text-muted-foreground font-medium text-[13px] items-center">
             <div className="col-span-5 sm:col-span-4 flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors group">
               Market 
               <ChevronUp className="w-3.5 h-3.5 group-hover:bg-muted rounded" />
             </div>
             <div className="col-span-3 sm:col-span-2 hidden sm:block">Status</div>
             <div className="col-span-4 sm:col-span-3">Includes</div>
             <div className="col-span-3 sm:col-span-3 hidden sm:block">Customizations</div>
          </div>

          {/* Regular Rows */}
          <div className="flex flex-col">
            
            {/* India Row */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 items-center hover:bg-muted/30 transition-colors group cursor-pointer">
              {/* Market Name */}
              <div className="col-span-6 sm:col-span-4 flex items-center gap-3">
                 <Globe2 className="w-[18px] h-[18px] text-muted-foreground shrink-0" />
                 <span className="font-medium text-foreground">India</span>
              </div>
              
              {/* Status */}
              <div className="col-span-3 sm:col-span-2 hidden sm:flex">
                 <span className="bg-[#A4E7BE] text-[#0C5132] px-2 py-0.5 rounded text-[12px] font-semibold tracking-wide">
                   Active
                 </span>
              </div>
              
              {/* Includes */}
              <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
                 <span className="text-base leading-none">🇮🇳</span>
                 <span className="text-foreground/90">India</span>
              </div>

              {/* Customizations */}
              <div className="col-span-3 sm:col-span-3 hidden sm:flex items-center text-muted-foreground">
                 <span className="font-mono text-xs opacity-70 border border-border px-1 rounded-sm">$⇄</span>
              </div>
            </div>

            {/* AI Suggested / Create Rows */}
            {/* Note: In shopify this often has a very faint purple background for AI generated/suggestions */}
            <div className="flex flex-col divide-y divide-[#EAE2FB]/50">
              
              {/* USA/Canada Row */}
              <div className="flex items-center justify-between p-4 bg-[#FBF9FF] hover:bg-[#F4F0FD] transition-colors border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8A5BE2] shrink-0" />
                  <span className="text-[#6D42C3] font-medium text-[14px]">Create United States and Canada Market</span>
                  <div className="w-5 h-5 rounded-full bg-[#EAE2FB] flex items-center justify-center cursor-pointer hover:bg-[#DED2F8] transition-colors ml-1">
                     <Plus className="w-3 h-3 text-[#6D42C3]" />
                  </div>
                </div>
                <button className="text-[#8A5BE2]/60 hover:text-[#8A5BE2] transition-colors p-1">
                   <X className="w-4 h-4" />
                </button>
              </div>

              {/* EU Row */}
              <div className="flex items-center justify-between p-4 bg-[#FBF9FF] hover:bg-[#F4F0FD] transition-colors">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8A5BE2] shrink-0" />
                  <span className="text-[#6D42C3] font-medium text-[14px]">Create European Union Market</span>
                  <div className="w-5 h-5 rounded-full bg-[#EAE2FB] flex items-center justify-center cursor-pointer hover:bg-[#DED2F8] transition-colors ml-1">
                     <Plus className="w-3 h-3 text-[#6D42C3]" />
                  </div>
                </div>
                <button className="text-[#8A5BE2]/60 hover:text-[#8A5BE2] transition-colors p-1">
                   <X className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="flex justify-center pt-2 pb-6">
          <a href="#" className="flex items-center gap-2 text-[13px] font-medium text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-border mt-2 bg-muted/30">
            Learn more about markets
          </a>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
