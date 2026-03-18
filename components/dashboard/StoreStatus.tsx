"use client";

import { PawPrint, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function StoreStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-xl shadow-petoty border border-border overflow-hidden"
    >
      {/* Banner */}
      <div className="bg-primary p-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-primary-foreground/10 rounded-xl flex items-center justify-center shrink-0">
          <PawPrint className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-primary-foreground font-semibold text-lg">Petoty</h4>
          <p className="text-primary-foreground/70 text-sm truncate">Your store is open for business · petoty.com</p>
        </div>
        <span className="bg-petoty-success/20 text-petoty-success text-xs font-bold px-3 py-1 rounded-full shrink-0">
          ● Live
        </span>
      </div>
      {/* Actions */}
      <div className="p-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">petoty.myshopify.com</span>
        <a href="#" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
          Visit store <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
