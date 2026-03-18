"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Clock, Construction, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ 
  title, 
  description = "We're actively working on this feature to bring you the best experience. Check back soon for updates!" 
}: ComingSoonProps) {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-8 md:pt-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 15 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
           className="bg-card rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center p-12 md:p-24 text-center overflow-hidden relative group"
        >
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700"></div>

          {/* Icon Container with animations */}
          <div className="relative mb-8 z-10">
            <div className="w-24 h-24 bg-muted/80 rounded-full flex items-center justify-center relative shadow-sm border border-border/50 group-hover:scale-105 transition-transform duration-500">
               <Construction className="w-10 h-10 text-muted-foreground/80 absolute transform -rotate-12 translate-x-2 translate-y-2 opacity-50" />
               <Clock className="w-12 h-12 text-primary relative z-10 group-hover:rotate-12 transition-transform duration-500" />
            </div>
            
            {/* Sparkle animations */}
            <motion.div 
               animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 45, 90] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-2 -right-2 text-yellow-500"
            >
               <Sparkles className="w-5 h-5" />
            </motion.div>
            <motion.div 
               animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, -45, -90] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-10 -left-6 text-primary"
            >
               <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Text Content */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight relative z-10">
            {title} <span className="text-muted-foreground/60 font-medium">|</span> Coming Soon
          </h1>
          
          <p className="text-muted-foreground text-[15px] max-w-lg leading-relaxed mx-auto relative z-10">
            {description}
          </p>

          <div className="mt-10 relative z-10 w-full max-w-sm mx-auto">
             <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-primary/70 rounded-full"
                   initial={{ width: "0%" }}
                   animate={{ width: "65%" }}
                   transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
             </div>
             <p className="text-xs text-muted-foreground mt-3 font-medium uppercase tracking-wider">Work in progress</p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
