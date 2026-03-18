"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CopyPlus, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mt-2 pt-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Orders</h1>
          <button className="text-sm font-medium hover:bg-muted text-foreground px-4 py-2 border border-border rounded-lg transition-colors shadow-sm bg-card">
            More actions ▾
          </button>
        </div>

        {/* Empty State Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-card rounded-xl border border-border mt-4 shadow-sm flex flex-col items-center justify-center p-6 sm:p-12"
        >
          <div className="max-w-md w-full text-center flex flex-col items-center">
            {/* Illustration Avatar */}
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
              <div className="bg-background shadow-md border border-border p-4 rounded-lg transform -rotate-6">
                <CopyPlus className="w-10 h-10 text-primary opacity-80" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
              Your orders will show here
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              To get orders and accept payments from customers, you need to
              select a plan. You'll only be charged for your plan after your free trial ends.
            </p>

            {/* Action */}
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2.5 rounded-lg shadow-petoty hover:shadow-petoty-hover transition-all active:scale-95 text-sm">
              Select plan
            </button>
          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="flex justify-center pb-8 pt-4">
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Info className="w-4 h-4" />
            Learn more about orders
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
