"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  badge?: string;
  delay?: number;
}

export function StatCard({ title, value, badge, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card p-5 rounded-xl border-l-4 border-l-primary shadow-petoty hover:shadow-petoty-hover hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Info className="w-4 h-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-help" />
      </div>
      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground tabular-nums">{value}</h3>
        {badge && (
          <span className="text-[10px] font-bold bg-petoty-success/10 text-petoty-success px-1.5 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
}
