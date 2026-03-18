"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { PetotySidebar } from "@/components/dashboard/PetotySidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex w-full max-w-[100vw]">
      {/* Sidebar */}
      <PetotySidebar 
        open={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        activePath={pathname}
      />

      {/* Main Content Area */}
      <div className="lg:ml-64 flex flex-col flex-1 min-w-0 min-h-screen">
        <TopNavbar />

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
