"use client";

import { ChevronDown, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StoreStatus } from "@/components/dashboard/StoreStatus";
import { GettingStarted } from "@/components/dashboard/GettingStarted";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const stats = [
  { title: "Sessions", value: "351", badge: "+44%" },
  { title: "Total Sales", value: "₹0" },
  { title: "Orders", value: "0" },
  { title: "Conversion Rate", value: "0%" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-primary/30 rounded-lg text-foreground hover:bg-secondary transition">
              <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
              Last 30 days
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground ml-auto sm:ml-0" />
            </button>
            <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-primary/30 rounded-lg text-foreground hover:bg-secondary transition">
              All channels
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground ml-auto sm:ml-0" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} delay={i * 0.08} />
          ))}
        </div>

        {/* Chart */}
        <SalesChart />

        {/* Store Status */}
        <StoreStatus />

        {/* Getting Started */}
        <GettingStarted />
      </div>
    </DashboardLayout>
  );
}
