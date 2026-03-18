"use client";

import { Search, Bell } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 pl-14 lg:px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="flex-1 min-w-0 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full bg-secondary rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-4 shrink-0">
        <button className="relative p-2 rounded-lg hover:bg-secondary transition">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-petoty-success rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            P
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block">Petoty</span>
        </div>
      </div>
    </header>
  );
}
