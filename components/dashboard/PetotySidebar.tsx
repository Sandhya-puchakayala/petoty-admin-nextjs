"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home, Package, ShoppingBag, Users, Megaphone, Tag,
  FileText, Globe, BarChart3, Store, Plug, Settings, PawPrint, X, Menu, ChevronDown, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  icon: any;
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { 
    icon: Package, label: "Orders", href: "/orders",
    subItems: [
      { label: "Drafts", href: "/orders/drafts" },
      { label: "Abandoned checkouts", href: "/orders/abandoned-checkouts" },
    ]
  },
  { icon: ShoppingBag, label: "Products", href: "/products" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Megaphone, label: "Marketing", href: "/marketing" },
  { icon: Tag, label: "Discounts", href: "/discounts" },
  { 
    icon: FileText, label: "Content", href: "/content",
    subItems: [
      { label: "Metaobjects", href: "/content/metaobjects" },
      { label: "Files", href: "/content/files" },
      { label: "Menus", href: "/content/menus" },
      { label: "Blog posts", href: "/content/blog-posts" },
    ]
  },
  { icon: Globe, label: "Markets", href: "/markets" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Store, label: "Online Store", href: "/store" },
  { icon: Plug, label: "Apps", href: "/apps" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface PetotySidebarProps {
  open: boolean;
  onToggle: () => void;
  activePath?: string;
}

const MotionLink = motion.create(Link);

export function PetotySidebar({ open, onToggle, activePath = "/" }: PetotySidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-screen bg-primary text-primary-foreground flex flex-col z-50 transition-transform duration-300 w-64
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 p-2 rounded-lg">
              <PawPrint className="w-6 h-6" />
            </div>
            <span className="font-bold tracking-tighter text-xl">PETOTY</span>
          </div>
          <button onClick={onToggle} className="lg:hidden p-1 hover:bg-primary-foreground/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activePath === item.href || (item.href !== "/" && activePath.startsWith(item.href));
            const isExpanded = expandedItems[item.label] !== undefined ? expandedItems[item.label] : isActive;

            return (
              <div key={item.label} className="w-full flex flex-col mb-1 overflow-hidden">
                <div className="relative flex items-center w-full group">
                  <MotionLink
                    href={item.href}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (window.innerWidth < 1024 && !item.subItems) onToggle();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
                      ${isActive && !item.subItems?.some(sub => activePath === sub.href)
                        ? "bg-petoty-maroon-lighter shadow-inner text-primary-foreground"
                        : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                      }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                  </MotionLink>
                  {item.subItems && (
                    <button 
                      onClick={(e) => toggleExpand(item.label, e)}
                      className={`absolute right-1 p-1.5 rounded-md transition-colors ${
                        isExpanded ? "text-primary-foreground" : "text-primary-foreground/50 hover:text-primary-foreground"
                      }`}
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {item.subItems && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col pl-9 pr-2 py-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = activePath === subItem.href || activePath.startsWith(subItem.href + "/");
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => {
                                if (window.innerWidth < 1024) onToggle();
                              }}
                              className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                                isSubActive 
                                  ? "bg-primary-foreground/10 text-primary-foreground font-medium" 
                                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          {/* Subscription Banner */}
          <div className="bg-foreground text-background p-4 rounded-xl shadow-lg relative overflow-hidden group">
            <h5 className="font-semibold text-sm mb-1">Trial ends in 3 days</h5>
            <p className="text-xs text-background/80 mb-3">Subscribe for ₹20</p>
            <button className="w-full bg-background hover:bg-background/90 text-foreground text-xs font-semibold py-2 rounded-lg transition-colors">
              Subscribe
            </button>
            <PawPrint className="w-20 h-20 absolute -bottom-6 -right-4 text-background/5 rotate-12 group-hover:rotate-6 transition-transform" />
          </div>
        </div>
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 lg:hidden bg-primary text-primary-foreground p-2 rounded-lg shadow-petoty"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
