"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, CheckCircle2, XCircle, RefreshCcw,
  Users, CreditCard, TrendingUp, ShieldCheck,
  MapPin, HeartPulse, Brain, Search, Filter,
  ChevronDown, MoreVertical, Star, Check, X,
  Calendar, Clock, AlertCircle, Zap, Crown, Sparkles
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabKey = "active-plans" | "subscriptions" | "plan-management";
type PlanStatus = "active" | "inactive";
type SubStatus = "active" | "expired" | "trial";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  billingCycle: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  features: string[];
  subscriberCount: number;
  status: PlanStatus;
  isPopular?: boolean;
}

interface Subscriber {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: string;
  planColor: string;
  startDate: string;
  expiryDate: string;
  status: SubStatus;
  locationSafety: boolean;
  healthDiagnostics: boolean;
  aiIntelligence: boolean;
  petName: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id: "plan-1", name: "Basic", tagline: "Essential pet care tracking",
    price: 299, billingCycle: "month",
    icon: Zap, color: "#2563EB", gradient: "from-blue-400 to-blue-600",
    features: ["Location & Safety", "Basic Health Reports", "Email Support", "1 Pet Profile"],
    subscriberCount: 312, status: "active",
  },
  {
    id: "plan-2", name: "Premium", tagline: "Advanced health & AI insights",
    price: 699, billingCycle: "month",
    icon: Crown, color: "#702945", gradient: "from-rose-500 to-[#702945]",
    features: ["Location & Safety", "Health Diagnostics", "AI Intelligence", "3 Pet Profiles", "Priority Support", "Monthly Vet Consultation"],
    subscriberCount: 178, status: "active", isPopular: true,
  },
  {
    id: "plan-3", name: "Pro", tagline: "Complete care for multi-pet families",
    price: 1299, billingCycle: "month",
    icon: Sparkles, color: "#7C3AED", gradient: "from-violet-500 to-purple-700",
    features: ["Location & Safety", "Health Diagnostics", "AI Intelligence", "Unlimited Pets", "Dedicated Vet", "24/7 Emergency", "Grooming Credits", "Insurance Assist"],
    subscriberCount: 89, status: "active",
  },
  {
    id: "plan-4", name: "Enterprise", tagline: "For shelters & vet clinics",
    price: 4999, billingCycle: "month",
    icon: ShieldCheck, color: "#059669", gradient: "from-emerald-400 to-green-700",
    features: ["All Pro Features", "Unlimited Pets", "Custom Branding", "API Access", "Dedicated Account Manager", "SLA Guarantee"],
    subscriberCount: 14, status: "inactive",
  },
];

const SUBSCRIBERS: Subscriber[] = [
  { id: "s1",  name: "Priya Sharma",    email: "priya@gmail.com",   avatar: "PS", plan: "Premium", planColor: "#702945", startDate: "2025-10-01", expiryDate: "2026-10-01", status: "active",  locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Bruno" },
  { id: "s2",  name: "Rahul Verma",     email: "rahul@gmail.com",   avatar: "RV", plan: "Basic",   planColor: "#2563EB", startDate: "2025-12-15", expiryDate: "2026-12-15", status: "active",  locationSafety: true,  healthDiagnostics: false, aiIntelligence: false, petName: "Mochi" },
  { id: "s3",  name: "Ananya Singh",    email: "ananya@mail.com",   avatar: "AS", plan: "Pro",     planColor: "#7C3AED", startDate: "2025-08-20", expiryDate: "2026-08-20", status: "active",  locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Leo" },
  { id: "s4",  name: "Kiran Patel",     email: "kiran@mail.com",    avatar: "KP", plan: "Basic",   planColor: "#2563EB", startDate: "2024-11-01", expiryDate: "2025-11-01", status: "expired", locationSafety: true,  healthDiagnostics: false, aiIntelligence: false, petName: "Coco" },
  { id: "s5",  name: "Meera Nair",      email: "meera@mail.com",    avatar: "MN", plan: "Premium", planColor: "#702945", startDate: "2026-01-10", expiryDate: "2027-01-10", status: "trial",   locationSafety: true,  healthDiagnostics: true,  aiIntelligence: false, petName: "Daisie" },
  { id: "s6",  name: "Arjun Mehta",     email: "arjun@mail.com",    avatar: "AM", plan: "Pro",     planColor: "#7C3AED", startDate: "2025-09-05", expiryDate: "2026-09-05", status: "active",  locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Max" },
  { id: "s7",  name: "Divya Reddy",     email: "divya@mail.com",    avatar: "DR", plan: "Basic",   planColor: "#2563EB", startDate: "2025-07-22", expiryDate: "2026-07-22", status: "active",  locationSafety: true,  healthDiagnostics: false, aiIntelligence: false, petName: "Toffee" },
  { id: "s8",  name: "Sanjay Kumar",    email: "sanjay@mail.com",   avatar: "SK", plan: "Premium", planColor: "#702945", startDate: "2024-12-01", expiryDate: "2025-12-01", status: "expired", locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Rocky" },
  { id: "s9",  name: "Lakshmi Iyer",    email: "lakshmi@mail.com",  avatar: "LI", plan: "Pro",     planColor: "#7C3AED", startDate: "2026-02-14", expiryDate: "2027-02-14", status: "trial",   locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Simba" },
  { id: "s10", name: "Rohit Joshi",     email: "rohit@mail.com",    avatar: "RJ", plan: "Basic",   planColor: "#2563EB", startDate: "2025-11-30", expiryDate: "2026-11-30", status: "active",  locationSafety: true,  healthDiagnostics: false, aiIntelligence: false, petName: "Oreo" },
  { id: "s11", name: "Sneha Das",       email: "sneha@mail.com",    avatar: "SD", plan: "Premium", planColor: "#702945", startDate: "2025-05-18", expiryDate: "2026-05-18", status: "active",  locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Bella" },
  { id: "s12", name: "Vikram Rao",      email: "vikram@mail.com",   avatar: "VR", plan: "Pro",     planColor: "#7C3AED", startDate: "2025-03-10", expiryDate: "2026-03-10", status: "active",  locationSafety: true,  healthDiagnostics: true,  aiIntelligence: true,  petName: "Thor" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusBadge = (status: SubStatus) => {
  const cfg = {
    active:  { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2, label: "Active" },
    expired: { cls: "bg-red-50 text-red-600 border-red-200",             icon: XCircle,      label: "Expired" },
    trial:   { cls: "bg-amber-50 text-amber-700 border-amber-200",       icon: Clock,        label: "Trial" },
  };
  const { cls, icon: Icon, label } = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
};

const planStatusBadge = (status: PlanStatus) => status === "active"
  ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3 h-3"/>Active</span>
  : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200"><AlertCircle className="w-3 h-3"/>Inactive</span>;

const featureIcon = (enabled: boolean) => enabled
  ? <Check className="w-4 h-4 text-emerald-500" />
  : <X className="w-4 h-4 text-gray-300" />;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PawscriptionPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("active-plans");
  const [plans, setPlans]         = useState<Plan[]>(PLANS);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SubStatus>("all");
  const [planFilter, setPlanFilter]     = useState("all");
  const [showAddPlan, setShowAddPlan]   = useState(false);

  // Delete plan
  const deletePlan = (id: string) => setPlans((p) => p.filter((pl) => pl.id !== id));
  const togglePlanStatus = (id: string) =>
    setPlans((p) => p.map((pl) => pl.id === id ? { ...pl, status: pl.status === "active" ? "inactive" : "active" } : pl));

  // Filtered subscribers
  const filteredSubs = SUBSCRIBERS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.email.toLowerCase().includes(search.toLowerCase()) ||
                        s.petName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    const matchPlan   = planFilter === "all"   || s.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  // Stats
  const activeCount  = SUBSCRIBERS.filter((s) => s.status === "active").length;
  const expiredCount = SUBSCRIBERS.filter((s) => s.status === "expired").length;
  const trialCount   = SUBSCRIBERS.filter((s) => s.status === "trial").length;
  const revenue      = SUBSCRIBERS.filter((s) => s.status === "active").reduce((acc, s) => {
    const plan = PLANS.find((p) => p.name === s.plan);
    return acc + (plan?.price ?? 0);
  }, 0);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "active-plans",    label: "Active Plans" },
    { key: "subscriptions",   label: "Subscriptions" },
    { key: "plan-management", label: "Plan Management" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5 max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)] bg-background">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-primary" />
              Pawscription
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage subscription plans and active members</p>
          </div>
          <button
            onClick={() => { setActiveTab("active-plans"); setShowAddPlan(true); }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Plan
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Active Subscribers", value: activeCount,          icon: Users,       color: "#059669" },
            { label: "Monthly Revenue",    value: `₹${revenue.toLocaleString()}`, icon: CreditCard,  color: "#702945" },
            { label: "Trial Members",      value: trialCount,            icon: TrendingUp,  color: "#D97706" },
            { label: "Expired Plans",      value: expiredCount,          icon: AlertCircle, color: "#DC2626" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: s.color + "18" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════
            TAB 1 — Active Plans
        ════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {activeTab === "active-plans" && (
            <motion.div key="active-plans" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              {/* Add Plan inline form */}
              <AnimatePresence>
                {showAddPlan && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="bg-card border border-primary/30 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground text-sm">Create New Plan</h3>
                        <button onClick={() => setShowAddPlan(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Plan Name</label>
                          <input type="text" placeholder="e.g. Gold" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (₹/month)</label>
                          <input type="number" placeholder="499" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Tagline</label>
                          <input type="text" placeholder="Short description" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                          <select className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition">Save Plan</button>
                        <button onClick={() => setShowAddPlan(false)} className="border border-border text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition">Cancel</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Plan Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {plans.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`relative bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                      plan.isPopular ? "border-primary/50 ring-2 ring-primary/20" : "border-border"
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" /> Most Popular
                      </div>
                    )}

                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-br ${plan.gradient} p-5 flex items-center gap-3`}>
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <plan.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg leading-tight">{plan.name}</h3>
                        <p className="text-white/75 text-xs">{plan.tagline}</p>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Price */}
                      <div className="flex items-baseline gap-1 mb-3 pb-3 border-b border-border">
                        <span className="text-2xl font-extrabold text-foreground">₹{plan.price.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">/{plan.billingCycle}</span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-1.5 mb-4">
                        {plan.features.slice(0, 5).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: plan.color }} />
                            {f}
                          </li>
                        ))}
                        {plan.features.length > 5 && (
                          <li className="text-xs text-muted-foreground pl-5">+{plan.features.length - 5} more</li>
                        )}
                      </ul>

                      {/* Footer row */}
                      <div className="flex items-center justify-between border-t border-border pt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Subscribers</p>
                          <p className="text-sm font-bold text-foreground">{plan.subscriberCount}</p>
                        </div>
                        {planStatusBadge(plan.status)}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => togglePlanStatus(plan.id)}
                          className="flex-1 text-xs font-medium py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
                        >
                          {plan.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors text-muted-foreground"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add Plan card */}
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: plans.length * 0.07 }}
                  onClick={() => setShowAddPlan(true)}
                  className="border-2 border-dashed border-border rounded-2xl min-h-[20rem] flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Add New Plan</p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════
              TAB 2 — Subscriptions
          ════════════════════════════════════════ */}
          {activeTab === "subscriptions" && (
            <motion.div key="subscriptions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, email or pet..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>
                <div className="relative">
                  <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}
                    className="pl-3 pr-8 py-2 text-sm rounded-lg border border-border bg-card text-foreground focus:outline-none appearance-none"
                  >
                    <option value="all">All Plans</option>
                    {PLANS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-3 pr-8 py-2 text-sm rounded-lg border border-border bg-card text-foreground focus:outline-none appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="expired">Expired</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredSubs.length}</span> of {SUBSCRIBERS.length} subscribers
              </p>

              {/* Table */}
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">User</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan</th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          <div className="flex items-center gap-1 justify-center"><MapPin className="w-3.5 h-3.5" />Location</div>
                        </th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          <div className="flex items-center gap-1 justify-center"><HeartPulse className="w-3.5 h-3.5" />Health</div>
                        </th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          <div className="flex items-center gap-1 justify-center"><Brain className="w-3.5 h-3.5" />AI</div>
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Start Date</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Expiry Date</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredSubs.map((sub, i) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          {/* User */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                                style={{ backgroundColor: sub.planColor }}
                              >
                                {sub.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{sub.name}</p>
                                <p className="text-xs text-muted-foreground">{sub.email}</p>
                                <p className="text-xs text-muted-foreground/70">🐾 {sub.petName}</p>
                              </div>
                            </div>
                          </td>
                          {/* Plan */}
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: sub.planColor }}
                            >
                              {sub.plan}
                            </span>
                          </td>
                          {/* Location & Safety */}
                          <td className="px-3 py-3 text-center">{featureIcon(sub.locationSafety)}</td>
                          {/* Health Diagnostics */}
                          <td className="px-3 py-3 text-center">{featureIcon(sub.healthDiagnostics)}</td>
                          {/* AI Intelligence */}
                          <td className="px-3 py-3 text-center">{featureIcon(sub.aiIntelligence)}</td>
                          {/* Start Date */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-foreground/80">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              {new Date(sub.startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                            </div>
                          </td>
                          {/* Expiry Date */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-foreground/80">
                              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                              {new Date(sub.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                            </div>
                          </td>
                          {/* Status */}
                          <td className="px-4 py-3">{statusBadge(sub.status)}</td>
                          {/* Actions */}
                          <td className="px-4 py-3">
                            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredSubs.length === 0 && (
                    <div className="py-16 flex flex-col items-center text-center">
                      <Users className="w-10 h-10 text-muted-foreground mb-3" />
                      <p className="text-sm font-medium text-foreground">No subscribers found</p>
                      <p className="text-xs text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════
              TAB 3 — Plan Management
          ════════════════════════════════════════ */}
          {activeTab === "plan-management" && (
            <motion.div key="plan-management" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

              {/* Feature Matrix comparison table */}
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground text-sm">Feature Matrix — Plan Comparison</h2>
                  <button className="inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                    <Pencil className="w-3.5 h-3.5" /> Edit Matrix
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground w-56">Feature</th>
                        {PLANS.map((plan) => (
                          <th key={plan.id} className="px-4 py-3 text-center">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${plan.gradient}`}>
                              <plan.icon className="w-3 h-3" /> {plan.name}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { label: "Location & Safety",    key: "location" },
                        { label: "Health Diagnostics",   key: "health"   },
                        { label: "AI Intelligence",      key: "ai"       },
                        { label: "Vet Consultation",     key: "vet"      },
                        { label: "Multi-Pet Support",    key: "multi"    },
                        { label: "Emergency Alerts",     key: "emergency"},
                        { label: "Priority Support",     key: "support"  },
                        { label: "Insurance Assist",     key: "insurance"},
                      ].map((feature, fi) => {
                        // Which plans include this
                        const included: boolean[] = [
                          [true,  true,  true,  true ],  // location
                          [false, true,  true,  true ],  // health
                          [false, true,  true,  true ],  // ai
                          [false, true,  true,  true ],  // vet
                          [false, false, true,  true ],  // multi
                          [false, false, true,  true ],  // emergency
                          [false, true,  true,  true ],  // support
                          [false, false, true,  true ],  // insurance
                        ][fi];
                        return (
                          <tr key={feature.key} className="hover:bg-muted/30 transition-colors">
                            <td className="px-5 py-3 text-sm font-medium text-foreground">{feature.label}</td>
                            {included.map((has, ci) => (
                              <td key={ci} className="px-4 py-3 text-center">
                                {has
                                  ? <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                                  : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                      {/* Price row */}
                      <tr className="bg-muted/40 font-semibold">
                        <td className="px-5 py-3 text-sm text-foreground">Monthly Price</td>
                        {PLANS.map((plan) => (
                          <td key={plan.id} className="px-4 py-3 text-center text-sm" style={{ color: plan.color }}>
                            ₹{plan.price.toLocaleString()}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Plan quick-edit list */}
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="font-semibold text-foreground text-sm">Quick Edit Plans</h2>
                </div>
                <div className="divide-y divide-border">
                  {PLANS.map((plan) => (
                    <div key={plan.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                          <plan.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{plan.name}</p>
                          <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="text-sm font-bold text-foreground">₹{plan.price.toLocaleString()}/mo</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">Features</p>
                          <p className="text-sm font-bold text-foreground">{plan.features.length}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">Subscribers</p>
                          <p className="text-sm font-bold text-foreground">{plan.subscriberCount}</p>
                        </div>
                        {planStatusBadge(plan.status)}
                        <div className="flex gap-1.5">
                          <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg border border-border hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors text-muted-foreground">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
