"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Scissors,
  GraduationCap,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wrench,
  ShieldCheck,
  RefreshCcw,
  HeadphonesIcon,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey =
  | "all"
  | "grooming"
  | "vet"
  | "training"
  | "addon"
  | "installation"
  | "subscription"
  | "support";

interface ServiceCard {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  rating: number;
  bookings: number;
  status: "active" | "inactive" | "pending";
  icon: React.ElementType;
  color: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const allServices: ServiceCard[] = [
  { id: "1", name: "Full Grooming Package", category: "Grooming", price: "₹799", duration: "2 hrs", rating: 4.8, bookings: 124, status: "active", icon: Scissors, color: "#7C3AED" },
  { id: "2", name: "Bath & Blow Dry", category: "Grooming", price: "₹399", duration: "1 hr", rating: 4.6, bookings: 89, status: "active", icon: Scissors, color: "#7C3AED" },
  { id: "3", name: "Nail Trimming", category: "Grooming", price: "₹149", duration: "30 min", rating: 4.5, bookings: 203, status: "active", icon: Scissors, color: "#7C3AED" },
  { id: "4", name: "General Vet Consultation", category: "Vet Consultation", price: "₹499", duration: "45 min", rating: 4.9, bookings: 311, status: "active", icon: Stethoscope, color: "#059669" },
  { id: "5", name: "Vaccination Drive", category: "Vet Consultation", price: "₹299", duration: "30 min", rating: 4.7, bookings: 178, status: "active", icon: Stethoscope, color: "#059669" },
  { id: "6", name: "Dental Cleaning", category: "Vet Consultation", price: "₹699", duration: "1 hr", rating: 4.4, bookings: 67, status: "pending", icon: Stethoscope, color: "#059669" },
  { id: "7", name: "Basic Obedience Training", category: "Training", price: "₹1,299", duration: "4 weeks", rating: 4.8, bookings: 55, status: "active", icon: GraduationCap, color: "#D97706" },
  { id: "8", name: "Puppy Socialisation", category: "Training", price: "₹999", duration: "2 weeks", rating: 4.7, bookings: 43, status: "active", icon: GraduationCap, color: "#D97706" },
  { id: "9", name: "Agility Training", category: "Training", price: "₹1,899", duration: "6 weeks", rating: 4.6, bookings: 29, status: "inactive", icon: GraduationCap, color: "#D97706" },
  { id: "10", name: "Pet GPS Tracker Setup", category: "Add-on", price: "₹249", duration: "20 min", rating: 4.3, bookings: 88, status: "active", icon: Wrench, color: "#2563EB" },
  { id: "11", name: "Smart Feeder Installation", category: "Installation", price: "₹349", duration: "45 min", rating: 4.5, bookings: 61, status: "active", icon: Wrench, color: "#DC2626" },
  { id: "12", name: "Monthly Wellness Plan", category: "Subscription", price: "₹899/mo", duration: "Ongoing", rating: 4.9, bookings: 210, status: "active", icon: RefreshCcw, color: "#702945" },
  { id: "13", name: "24/7 Vet Helpline", category: "Support", price: "Included", duration: "Anytime", rating: 4.8, bookings: 502, status: "active", icon: HeadphonesIcon, color: "#0891B2" },
];

const tabConfig: { key: TabKey; label: string; icon: React.ElementType; color: string }[] = [
  { key: "all", label: "All Services", icon: BadgeCheck, color: "#702945" },
  { key: "grooming", label: "Grooming", icon: Scissors, color: "#7C3AED" },
  { key: "vet", label: "Vet Consultation", icon: Stethoscope, color: "#059669" },
  { key: "training", label: "Training", icon: GraduationCap, color: "#D97706" },
  { key: "addon", label: "Add-on Services", icon: Plus, color: "#2563EB" },
  { key: "installation", label: "Installation / Warranty", icon: Wrench, color: "#DC2626" },
  { key: "subscription", label: "Subscription Plans", icon: RefreshCcw, color: "#702945" },
  { key: "support", label: "Support Services", icon: HeadphonesIcon, color: "#0891B2" },
];

const filterByTab = (tab: TabKey): ServiceCard[] => {
  const map: Record<TabKey, string[]> = {
    all: [],
    grooming: ["Grooming"],
    vet: ["Vet Consultation"],
    training: ["Training"],
    addon: ["Add-on"],
    installation: ["Installation"],
    subscription: ["Subscription"],
    support: ["Support"],
  };
  if (tab === "all") return allServices;
  return allServices.filter((s) => map[tab].includes(s.category));
};

const statusBadge = (status: ServiceCard["status"]) => {
  const config = {
    active: { label: "Active", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
    inactive: { label: "Inactive", cls: "bg-gray-100 text-gray-500 border-gray-200", icon: AlertCircle },
    pending: { label: "Pending", cls: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  };
  const { label, cls, icon: Icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// ─── Stats Banner ─────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Services", value: "13", icon: BadgeCheck, color: "#702945" },
  { label: "Active Bookings", value: "1,960", icon: Calendar, color: "#059669" },
  { label: "Avg. Rating", value: "4.7 ★", icon: Star, color: "#D97706" },
  { label: "Total Customers", value: "842", icon: Users, color: "#2563EB" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");

  const services = filterByTab(activeTab).filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col pt-2 bg-background">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Services</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage all pet care services offered on Petoty
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90 shadow-sm">
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: s.color + "18" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 flex-wrap">
          {tabConfig.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeTab === key
                  ? "border-transparent text-white shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              style={activeTab === key ? { backgroundColor: color } : {}}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <button className="inline-flex items-center gap-2 bg-card border border-border text-foreground/80 font-medium px-4 py-2 rounded-lg text-sm hover:bg-muted transition-colors shadow-sm">
            <Filter className="w-4 h-4 text-muted-foreground" />
            Filter
          </button>
        </div>

        {/* ── Service Cards Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <BadgeCheck className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium text-foreground mb-1">No services found</h3>
                <p className="text-sm text-muted-foreground">Try a different search or add a new service.</p>
              </div>
            ) : (
              services.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: svc.color + "18" }}
                      >
                        <svc.icon className="w-5 h-5" style={{ color: svc.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {svc.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{svc.category}</p>
                      </div>
                    </div>
                    <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-semibold text-foreground">{svc.price}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-semibold text-foreground">{svc.duration}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Bookings</p>
                      <p className="text-sm font-semibold text-foreground">{svc.bookings}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      {svc.rating}
                    </div>
                    <div className="flex items-center gap-2">
                      {statusBadge(svc.status)}
                      <button className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Section Blocks (always visible at bottom) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">

          {/* Add-on Services */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Add-on Services</h2>
                <p className="text-xs text-muted-foreground">Pet grooming, training, vet booking 🐶</p>
              </div>
            </div>
            <ul className="space-y-2">
              {["Pet Grooming Bundle", "Training Add-on Pack", "Vet Booking Assistance", "Tick & Flea Treatment"].map((item) => (
                <li key={item} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground">{item}</span>
                  <button className="text-xs text-primary hover:underline font-medium">Manage</button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Installation / Warranty */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Installation / Warranty</h2>
                <p className="text-xs text-muted-foreground">Device setup & product warranty coverage</p>
              </div>
            </div>
            <ul className="space-y-2">
              {["Smart Feeder Setup", "GPS Tracker Installation", "Auto Water Dispenser Setup", "1-Year Warranty Coverage"].map((item) => (
                <li key={item} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground">{item}</span>
                  <button className="text-xs text-primary hover:underline font-medium">Manage</button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Subscription Plans */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#70294518" }}>
                <RefreshCcw className="w-5 h-5" style={{ color: "#702945" }} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Subscription Plans</h2>
                <p className="text-xs text-muted-foreground">Recurring wellness & care packages</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                { name: "Monthly Wellness Plan", price: "₹899/mo" },
                { name: "Quarterly Grooming Bundle", price: "₹2,199/qtr" },
                { name: "Annual Care Package", price: "₹7,999/yr" },
                { name: "Pawscription Basic", price: "₹499/mo" },
              ].map((plan) => (
                <li key={plan.name} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground">{plan.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary">{plan.price}</span>
                    <button className="text-xs text-muted-foreground hover:text-primary font-medium">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Services */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                <HeadphonesIcon className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Support Services</h2>
                <p className="text-xs text-muted-foreground">Customer & pet care assistance</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                { name: "24/7 Vet Helpline", status: "active" },
                { name: "Live Chat Support", status: "active" },
                { name: "On-site Assistance", status: "pending" },
                { name: "Emergency Pet Care", status: "active" },
              ].map((item) => (
                <li key={item.name} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground">{item.name}</span>
                  {statusBadge(item.status as ServiceCard["status"])}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Trending Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="rounded-xl overflow-hidden border border-border shadow-sm"
          style={{ background: "linear-gradient(135deg, #702945 0%, #4a1932 100%)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Boost your service visibility</h3>
                <p className="text-white/70 text-sm mt-0.5">
                  Promote top-rated services with Petoty Ads to reach more pet parents.
                </p>
              </div>
            </div>
            <button className="shrink-0 bg-white text-[#702945] font-semibold px-5 py-2 rounded-lg text-sm hover:bg-white/90 transition-colors shadow-md">
              Explore Promotions
            </button>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
