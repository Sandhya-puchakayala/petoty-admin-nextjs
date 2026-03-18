"use client";

import { BookOpen, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const tutorials = [
  {
    icon: BookOpen,
    title: "Set Up Your First Product",
    description: "Learn how to add pet products with variants, images, and pricing.",
  },
  {
    icon: Rocket,
    title: "Launch Your Marketing",
    description: "Reach pet lovers with targeted campaigns and social media.",
  },
];

export function GettingStarted() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Learn & Grow Your Pet Store</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials.map((t) => (
          <motion.div
            key={t.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-petoty-maroon-lighter p-6 cursor-pointer group"
          >
            <div className="relative z-10">
              <t.icon className="w-8 h-8 text-primary-foreground/80 mb-3" />
              <h4 className="text-primary-foreground font-semibold text-sm sm:text-base mb-1">{t.title}</h4>
              <p className="text-primary-foreground/70 text-xs sm:text-sm">{t.description}</p>
            </div>
            {/* Decorative paw */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.06]">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5-2c-.83 0-1.5.67-1.5 1.5S6.67 11 7.5 11 9 10.33 9 9.5 8.33 8 7.5 8zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S17.33 8 16.5 8zM12 6c-.83 0-1.5.67-1.5 1.5S11.17 9 12 9s1.5-.67 1.5-1.5S12.83 6 12 6zm0 10c-2.21 0-4 1.12-4 2.5S9.79 21 12 21s4-1.12 4-2.5S14.21 16 12 16z"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
