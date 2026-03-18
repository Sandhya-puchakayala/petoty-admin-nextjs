"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tag, PackagePlus, Search, ShoppingBag, Box, Smartphone, Glasses, Shirt } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto flex flex-col pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Products
          </h1>
        </div>

        {/* Card 1: Add your products */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-xl border border-border shadow-sm flex flex-col md:flex-row overflow-hidden relative"
        >
          {/* Content Left */}
          <div className="p-6 md:p-10 flex-1 flex flex-col justify-center z-10 bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-2">Add your products</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Start by stocking your store with products your customers will love
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                Add product
              </button>
              <button className="bg-card hover:bg-muted border border-border text-foreground font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                Import
              </button>
            </div>
          </div>

          {/* Graphic Right */}
          <div className="bg-secondary/30 flex-1 relative min-h-[250px] flex items-center justify-center p-6 md:p-10 overflow-hidden">
             {/* Abstract representation of the illustration in the screenshot */}
             <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background polaroids */}
                <motion.div 
                  initial={{ rotate: 10, x: 20 }}
                  animate={{ rotate: 15, x: 30 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute w-32 h-40 bg-petoty-maroon/20 rounded-lg shadow-sm transform rotate-12 right-0 translate-x-4 border border-border/50"
                ></motion.div>
                <motion.div 
                  initial={{ rotate: -10, x: -20 }}
                  animate={{ rotate: -15, x: -30 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute w-32 h-40 bg-primary/20 rounded-lg shadow-sm transform -rotate-12 left-0 -translate-x-4 border border-border/50"
                ></motion.div>
                
                {/* Main front card */}
                <div className="absolute z-10 w-36 h-36 bg-white rounded-xl shadow-lg border border-border/50 flex items-center justify-center p-2">
                    <div className="w-full h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-secondary/10">
                        <Tag className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Card 2: Find new products */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-xl border border-border shadow-sm flex flex-col md:flex-row overflow-hidden relative"
        >
          {/* Content Left */}
          <div className="p-6 md:p-10 flex-1 flex flex-col justify-center z-10 bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-2">Find new products</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Install a sourcing app to find products to sell without holding inventory
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-card hover:bg-muted border border-border text-foreground font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                Browse sourcing apps
              </button>
            </div>
          </div>

          {/* Graphic Right */}
          <div className="bg-secondary/20 flex-1 relative min-h-[250px] overflow-hidden hidden sm:block pt-8 pl-8">
            {/* Abstract grid of floating product boxes */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card z-10 w-24 left-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10 h-16 bottom-0"></div>
            
            <div className="grid grid-cols-4 gap-4 transform rotate-12 scale-110 origin-top-left opacity-80 translate-x-[10%] -translate-y-[10%]">
                {[
                  { icon: Box, delay: 0 }, { icon: Shirt, delay: 0.1 }, { icon: Glasses, delay: 0.2 }, { icon: Smartphone, delay: 0.3 },
                  { icon: ShoppingBag, delay: 0.4 }, { icon: PackagePlus, delay: 0.1 }, { icon: Box, delay: 0.5 }, { icon: Tag, delay: 0.2 },
                  { icon: Search, delay: 0.6 }, { icon: Box, delay: 0.3 }, { icon: ShoppingBag, delay: 0.7 }, { icon: Box, delay: 0.4 },
                  { icon: Box, delay: 0.8 }, { icon: Box, delay: 0.5 }, { icon: Box, delay: 0.9 }, { icon: Box, delay: 0.6 },
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
                        className="aspect-square bg-white rounded-xl shadow-sm border border-border/60 flex items-center justify-center p-3"
                    >
                         <item.icon className={`w-8 h-8 text-primary/40`} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
