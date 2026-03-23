"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Calendar,
  ChevronDown,
  Info,
  X,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

export default function MarketsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-2 bg-background">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-[22px] font-bold text-foreground">
            Marketing
          </h1>
        </div>

        {/* Filters Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              Last 30 days
            </button>
            <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors">
              No comparison
            </button>
          </div>
          <div>
            <button className="flex items-center gap-2 bg-card hover:bg-muted border border-border text-foreground text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              Last non-direct click
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-border">
          {/* Stat Item 1 */}
          <div className="p-4 md:p-5 flex flex-col justify-between group cursor-pointer hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium border-b border-border border-dashed w-max mb-1 text-foreground/80 group-hover:text-primary transition-colors">
                Sessions
              </p>
              <div className="text-xl font-medium mt-2">0</div>
            </div>
            <div className="h-[2px] w-12 bg-[#702945] rounded mt-4"></div>
          </div>
          {/* Stat Item 2 */}
          <div className="p-4 md:p-5 flex flex-col justify-between group cursor-pointer hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium border-b border-border border-dashed w-max mb-1 text-foreground/80 group-hover:text-primary transition-colors">
                Sales attributed to marketing
              </p>
              <div className="text-xl font-medium mt-2">₹0</div>
            </div>
            <div className="h-[2px] w-20 bg-[#702945] rounded mt-4"></div>
          </div>
          {/* Stat Item 3 */}
          <div className="p-4 md:p-5 flex flex-col justify-between group cursor-pointer hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium border-b border-border border-dashed w-max mb-1 text-foreground/80 group-hover:text-primary transition-colors">
                Orders attributed to marketing
              </p>
              <div className="text-xl font-medium mt-2">0</div>
            </div>
            <div className="h-[2px] w-16 bg-[#702945] rounded mt-4"></div>
          </div>
          {/* Stat Item 4 */}
          <div className="p-4 md:p-5 flex flex-col justify-between group cursor-pointer hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium border-b border-border border-dashed w-max mb-1 text-foreground/80 group-hover:text-primary transition-colors">
                Conversion rate
              </p>
              <div className="text-xl font-medium mt-2">0%</div>
            </div>
            <div className="h-[2px] w-14 bg-[#702945] rounded mt-4"></div>
          </div>
        </div>

        {/* Top marketing channels */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-border/50">
            <h2 className="text-[15px] font-semibold text-foreground">Top marketing channels</h2>
            <button className="text-[#702945] hover:text-[#702945] text-sm font-medium transition-colors">
              View report
            </button>
          </div>

          <div className="p-4 md:p-5 flex flex-col gap-4">
            {/* Alert Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3 relative pr-8">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-blue-900/90 leading-relaxed">
                Cost, click, and impression metrics are now available for supported marketing apps.
                <a href="#" className="underline font-medium text-blue-800 ml-1 hover:text-blue-900">Learn more</a>
              </p>
              <button className="absolute right-3 top-3 text-blue-600/60 hover:text-blue-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Empty State */}
            <div className="py-16 md:py-20 flex flex-col items-center justify-center text-center">
              <h3 className="text-[15px] font-medium text-foreground mb-1">
                No data found for the date range selected
              </h3>
              <p className="text-sm text-muted-foreground">
                Please select a different period
              </p>
            </div>
          </div>
        </motion.div>

        {/* Centralize your campaign tracking */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden w-full"
        >
          <div className="flex flex-col-reverse md:flex-row relative z-10">
            {/* Left Content */}
            <div className="p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-center max-w-xl self-center">
              <h2 className="text-base md:text-lg font-semibold text-foreground mb-2">
                Centralize your campaign tracking
              </h2>
              <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed mb-6">
                Create campaigns to evaluate how marketing initiatives drive business goals. Capture online
                and offline touchpoints, add campaign activities from multiple marketing channels, and
                monitor results.
              </p>
              <div>
                <button className="bg-card hover:bg-muted border border-border text-foreground font-medium px-4 py-1.5 rounded-lg text-[13px] shadow-sm transition-colors">
                  Create campaign
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="h-48 md:h-auto flex-1 relative flex items-center justify-end md:justify-center p-6 bg-card/50 overflow-hidden">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 right-0 md:right-auto md:mr-10 translate-y-4 md:translate-y-0 flex items-center justify-center">
                {/* Blue Folder Composition */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Folder Back */}
                  <div className="absolute w-[60%] h-[45%] bg-[#3679E9] rounded-lg -bottom-2 -left-2 shadow-sm" style={{ transform: "rotate(-3deg)" }}></div>

                  {/* White Paper Inside */}
                  <div className="absolute w-[50%] h-[55%] bg-white rounded-md shadow-sm border border-border/40 z-10 bottom-[15%] right-[20%] flex flex-col p-2 pt-3">
                    <div className="w-5 h-5 border border-border rounded mb-2">
                      <div className="w-full h-2 bg-border/40 mb-0.5"></div>
                      <div className="w-2/3 h-1.5 bg-border/40"></div>
                    </div>
                    <div className="w-3/4 h-1.5 bg-border/30 rounded mt-1"></div>
                    <div className="w-1/2 h-1.5 bg-border/30 rounded mt-1.5"></div>
                  </div>

                  {/* Folder Front */}
                  <div className="absolute w-[65%] h-[40%] bg-[#4285F4] rounded-lg bottom-[10%] left-[8%] z-20 shadow-md border-t border-blue-400">
                    <div className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <div className="absolute right-6 top-3 w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <div className="absolute right-9 top-3 w-1.5 h-1.5 rounded-full bg-white/40"></div>

                    {/* Left Icon (Pie Chart) on front */}
                    <div className="absolute left-[15%] bottom-[20%] w-[35%] aspect-square bg-transparent">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Circle base */}
                        <circle cx="50" cy="50" r="40" fill="#2451B5" />
                        {/* Yellow slice */}
                        <path d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z" fill="#F8BC1C" />
                        {/* Light blue slice */}
                        <path d="M 50 50 L 90 50 A 40 40 0 0 1 30 85 Z" fill="#88B1F8" />
                        {/* Inner circle for donut look */}
                        <circle cx="50" cy="50" r="15" fill="#4285F4" />
                      </svg>
                    </div>

                    {/* Tiny line charts on the folder front */}
                    <div className="absolute right-[15%] top-[40%] flex gap-1 items-end h-[30%] w-[20%]">
                      <div className="w-1/3 bg-white/60 h-full rounded-sm"></div>
                      <div className="w-1/3 bg-white/60 h-[70%] rounded-sm"></div>
                      <div className="w-1/3 bg-white/60 h-[40%] rounded-sm"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support offline Marketing (Partial section to match screenshot bottom edge) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden w-full h-32 flex flex-col-reverse md:flex-row relative opacity-60"
        >
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-start max-w-xl relative z-10">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-2 mt-4">
              Support offline marketing...
            </h2>
          </div>

          <div className="h-full flex-1 relative flex items-end justify-center px-6 overflow-hidden">
            {/* Fake graphic to match screenshot bottom right */}
            <div className="w-48 h-20 bg-background rounded-t-xl border border-border border-b-0 self-end shadow-sm flex items-center justify-center relative">
              <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-[#E3E8FF] flex items-center justify-center ring-2 ring-white">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
              <div className="w-24 h-2 bg-border/40 rounded mt-2"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
