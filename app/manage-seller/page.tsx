"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck, Plus, Search, ChevronDown, MoreVertical,
  CheckCircle2, XCircle, Clock, AlertCircle, Pencil, Trash2,
  Store, TrendingUp, CreditCard, Users, Star, Download,
  Eye, ShieldCheck, Ban, IndianRupee, Package, Calendar,
} from "lucide-react";

type Tab = "all-sellers" | "pending-approval" | "seller-payouts";
type SellerStatus = "active" | "suspended" | "pending" | "rejected";
type PayoutStatus = "paid" | "processing" | "on-hold";

interface Seller {
  id: string; name: string; initials: string; email: string; phone: string;
  storeName: string; category: string; joinDate: string; status: SellerStatus;
  products: number; totalSales: number; rating: number; color: string;
}
interface PendingSeller {
  id: string; name: string; initials: string; email: string; phone: string;
  storeName: string; category: string; appliedDate: string; documents: string;
  color: string;
}
interface Payout {
  id: string; seller: string; initials: string; color: string; storeName: string;
  period: string; grossSales: number; commission: number; netPayout: number;
  status: PayoutStatus; scheduledDate: string;
}

const SELLERS: Seller[] = [
  { id:"s1",  name:"Arun Kumar",    initials:"AK", email:"arun@petshop.com",   phone:"9812345678", storeName:"Paws & Claws",      category:"Dog Supplies",  joinDate:"2024-06-15", status:"active",    products:42, totalSales:128500, rating:4.8, color:"#702945" },
  { id:"s2",  name:"Sunita Rao",    initials:"SR", email:"sunita@petcare.in",   phone:"9823456789", storeName:"Meow World",        category:"Cat Products",  joinDate:"2024-08-20", status:"active",    products:28, totalSales:89200,  rating:4.6, color:"#7C3AED" },
  { id:"s3",  name:"Manoj Tiwari",  initials:"MT", email:"manoj@petfood.com",   phone:"9834567890", storeName:"PetNutrition Co",   category:"Pet Food",      joinDate:"2024-09-10", status:"active",    products:65, totalSales:215000, rating:4.9, color:"#059669" },
  { id:"s4",  name:"Ritu Gupta",    initials:"RG", email:"ritu@animalcare.in",  phone:"9845678901", storeName:"Animal Kingdom",    category:"Vet Supplies",  joinDate:"2024-11-05", status:"suspended", products:19, totalSales:34800,  rating:3.9, color:"#DC2626" },
  { id:"s5",  name:"Deepak Sharma", initials:"DS", email:"deepak@petplay.com",  phone:"9856789012", storeName:"Fun Pet Zone",      category:"Pet Toys",      joinDate:"2025-01-12", status:"active",    products:53, totalSales:178900, rating:4.7, color:"#D97706" },
  { id:"s6",  name:"Kavya Nair",    initials:"KN", email:"kavya@birdshop.in",   phone:"9867890123", storeName:"Bird Paradise",     category:"Bird Supplies", joinDate:"2025-02-28", status:"active",    products:31, totalSales:62400,  rating:4.5, color:"#0891B2" },
  { id:"s7",  name:"Farhan Khan",   initials:"FK", email:"farhan@fishworld.com",phone:"9878901234", storeName:"Aqua World",        category:"Aquatic",       joinDate:"2025-03-05", status:"active",    products:47, totalSales:93700,  rating:4.4, color:"#2563EB" },
  { id:"s8",  name:"Pooja Devi",    initials:"PD", email:"pooja@petgroom.in",   phone:"9889012345", storeName:"GlampetSalon",     category:"Grooming",      joinDate:"2024-12-18", status:"suspended", products:12, totalSales:21300,  rating:3.7, color:"#DC2626" },
];

const PENDING: PendingSeller[] = [
  { id:"p1", name:"Nikhil Sehgal",  initials:"NS", email:"nikhil@newpet.com",   phone:"9811223344", storeName:"PetCare Hub",       category:"Multi-Category",  appliedDate:"2026-03-10", documents:"Verified", color:"#7C3AED" },
  { id:"p2", name:"Lalitha Iyer",   initials:"LI", email:"lalitha@flutterwings.com",phone:"9822334455", storeName:"Flutter Wings",  category:"Bird Supplies",   appliedDate:"2026-03-15", documents:"Pending",  color:"#059669" },
  { id:"p3", name:"Sameer Patel",   initials:"SP", email:"sameer@dogduniya.com", phone:"9833445566", storeName:"Dog Duniya",       category:"Dog Supplies",    appliedDate:"2026-03-18", documents:"Verified", color:"#D97706" },
  { id:"p4", name:"Vandana Bhatt",  initials:"VB", email:"vandana@catcorner.in", phone:"9844556677", storeName:"Cat Corner Studio",category:"Cat Products",    appliedDate:"2026-03-20", documents:"Pending",  color:"#0891B2" },
];

const PAYOUTS: Payout[] = [
  { id:"py1", seller:"Arun Kumar",    initials:"AK", color:"#702945", storeName:"Paws & Claws",    period:"Feb 2026", grossSales:128500, commission:12850, netPayout:115650, status:"paid",       scheduledDate:"2026-03-05" },
  { id:"py2", seller:"Sunita Rao",    initials:"SR", color:"#7C3AED", storeName:"Meow World",      period:"Feb 2026", grossSales:89200,  commission:8920,  netPayout:80280,  status:"paid",       scheduledDate:"2026-03-05" },
  { id:"py3", seller:"Manoj Tiwari",  initials:"MT", color:"#059669", storeName:"PetNutrition Co", period:"Feb 2026", grossSales:215000, commission:21500, netPayout:193500, status:"processing", scheduledDate:"2026-03-08" },
  { id:"py4", seller:"Deepak Sharma", initials:"DS", color:"#D97706", storeName:"Fun Pet Zone",    period:"Feb 2026", grossSales:178900, commission:17890, netPayout:161010, status:"processing", scheduledDate:"2026-03-08" },
  { id:"py5", seller:"Kavya Nair",    initials:"KN", color:"#0891B2", storeName:"Bird Paradise",   period:"Feb 2026", grossSales:62400,  commission:6240,  netPayout:56160,  status:"on-hold",    scheduledDate:"2026-03-12" },
  { id:"py6", seller:"Farhan Khan",   initials:"FK", color:"#2563EB", storeName:"Aqua World",      period:"Feb 2026", grossSales:93700,  commission:9370,  netPayout:84330,  status:"paid",       scheduledDate:"2026-03-05" },
];

const sellerBadge = (s: SellerStatus) => {
  const m = {
    active:    { cls:"bg-emerald-50 text-emerald-700 border-emerald-200", icon:CheckCircle2, label:"Active"    },
    suspended: { cls:"bg-red-50 text-red-600 border-red-200",             icon:Ban,          label:"Suspended" },
    pending:   { cls:"bg-amber-50 text-amber-700 border-amber-200",       icon:Clock,        label:"Pending"   },
    rejected:  { cls:"bg-gray-100 text-gray-500 border-gray-200",         icon:XCircle,      label:"Rejected"  },
  }[s];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${m.cls}`}><m.icon className="w-3 h-3"/>{m.label}</span>;
};

const payoutBadge = (s: PayoutStatus) => {
  const m = {
    paid:       { cls:"bg-emerald-50 text-emerald-700 border-emerald-200", icon:CheckCircle2, label:"Paid"       },
    processing: { cls:"bg-blue-50 text-blue-700 border-blue-200",          icon:Clock,        label:"Processing" },
    "on-hold":  { cls:"bg-amber-50 text-amber-700 border-amber-200",       icon:AlertCircle,  label:"On Hold"    },
  }[s];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${m.cls}`}><m.icon className="w-3 h-3"/>{m.label}</span>;
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

export default function ManageSellerPage() {
  const [tab, setTab] = useState<Tab>("all-sellers");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSellers = SELLERS.filter(s => {
    const q = search.toLowerCase();
    return (s.name.toLowerCase().includes(q) || s.storeName.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
      && (statusFilter === "all" || s.status === statusFilter);
  });

  const totalSales    = SELLERS.reduce((a,s) => a + s.totalSales, 0);
  const activeCount   = SELLERS.filter(s => s.status==="active").length;
  const pendingCount  = PENDING.length;
  const pendingPayout = PAYOUTS.filter(p => p.status !== "paid").reduce((a,p) => a + p.netPayout, 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5 max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)] bg-background">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary"/> Manage Sellers
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage all marketplace sellers, approvals and payouts</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 bg-card border border-border text-foreground/80 font-medium px-4 py-2 rounded-lg text-sm hover:bg-muted transition-colors shadow-sm">
              <Download className="w-4 h-4"/> Export
            </button>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-all shadow-sm">
              <Plus className="w-4 h-4"/> Add Seller
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label:"Active Sellers",   value:activeCount,                          icon:Store,       color:"#059669" },
            { label:"Total Sales",      value:`₹${(totalSales/1000).toFixed(0)}k`,  icon:TrendingUp,  color:"#702945" },
            { label:"Pending Approval", value:pendingCount,                         icon:Clock,       color:"#D97706" },
            { label:"Pending Payouts",  value:`₹${(pendingPayout/1000).toFixed(0)}k`,icon:CreditCard, color:"#2563EB" },
          ].map((s,i) => (
            <motion.div key={s.label} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl" style={{backgroundColor:s.color+"18"}}>
                <s.icon className="w-5 h-5" style={{color:s.color}}/>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {([["all-sellers","All Sellers"],["pending-approval","Pending Approval"],["seller-payouts","Seller Payouts"]] as [Tab,string][]).map(([key,label]) => (
            <button key={key} onClick={() => { setTab(key); setSearch(""); setStatusFilter("all"); }}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab===key?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>
              {label}
              {key==="pending-approval" && pendingCount > 0 && (
                <span className="ml-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── All Sellers ── */}
          {tab === "all-sellers" && (
            <motion.div key="sellers" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="text" placeholder="Search by name, store or category…" value={search} onChange={e=>setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition"/>
                </div>
                <div className="relative">
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
                    className="pl-3 pr-8 py-2 text-sm rounded-lg border border-border bg-card text-foreground focus:outline-none appearance-none">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"/>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        {["Seller","Store","Category","Products","Total Sales","Rating","Joined","Status",""].map(h=>(
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredSellers.map((s,i)=>(
                        <motion.tr key={s.id} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{backgroundColor:s.color}}>{s.initials}</div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{s.name}</p>
                                <p className="text-xs text-muted-foreground">{s.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <Store className="w-3.5 h-3.5 text-muted-foreground"/>
                              <span className="text-sm font-medium text-foreground">{s.storeName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3"><span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full font-medium">{s.category}</span></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-sm font-medium text-foreground"><Package className="w-3.5 h-3.5 text-muted-foreground"/>{s.products}</div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-foreground">₹{s.totalSales.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400"/>{s.rating}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-foreground/70"><Calendar className="w-3 h-3 text-muted-foreground"/>{fmt(s.joinDate)}</div>
                          </td>
                          <td className="px-4 py-3">{sellerBadge(s.status)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-3.5 h-3.5"/></button>
                              <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                              <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><MoreVertical className="w-3.5 h-3.5"/></button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredSellers.length===0&&<div className="py-16 flex flex-col items-center"><Users className="w-10 h-10 text-muted-foreground mb-3"/><p className="text-sm font-medium text-foreground">No sellers found</p></div>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Pending Approval ── */}
          {tab === "pending-approval" && (
            <motion.div key="pending" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"/>
                <div>
                  <p className="text-sm font-semibold text-amber-800">{PENDING.length} seller application{PENDING.length!==1?"s":""} awaiting review</p>
                  <p className="text-xs text-amber-700 mt-0.5">Review documents and approve or reject each application</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PENDING.map((p,i)=>(
                  <motion.div key={p.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{backgroundColor:p.color}}>{p.initials}</div>
                        <div>
                          <p className="font-semibold text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.email}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${p.documents==="Verified"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-amber-50 text-amber-700 border-amber-200"}`}>
                        {p.documents==="Verified"?<ShieldCheck className="w-3 h-3"/>:<Clock className="w-3 h-3"/>}{p.documents}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Store Name</p>
                        <p className="text-sm font-semibold text-foreground">{p.storeName}</p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Category</p>
                        <p className="text-sm font-semibold text-foreground">{p.category}</p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                        <p className="text-sm font-semibold text-foreground">{p.phone}</p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Applied</p>
                        <p className="text-sm font-semibold text-foreground">{fmt(p.appliedDate)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5"/> Approve
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold py-2 rounded-lg transition-colors">
                        <XCircle className="w-3.5 h-3.5"/> Reject
                      </button>
                      <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Seller Payouts ── */}
          {tab === "seller-payouts" && (
            <motion.div key="payouts" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label:"Total Disbursed", value:`₹${PAYOUTS.filter(p=>p.status==="paid").reduce((a,p)=>a+p.netPayout,0).toLocaleString()}`, color:"#059669" },
                  { label:"Processing",      value:`₹${PAYOUTS.filter(p=>p.status==="processing").reduce((a,p)=>a+p.netPayout,0).toLocaleString()}`, color:"#2563EB" },
                  { label:"On Hold",         value:`₹${PAYOUTS.filter(p=>p.status==="on-hold").reduce((a,p)=>a+p.netPayout,0).toLocaleString()}`,  color:"#D97706" },
                ].map((s,i)=>(
                  <motion.div key={s.label} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
                    <div className="p-2 rounded-xl" style={{backgroundColor:s.color+"18"}}>
                      <IndianRupee className="w-5 h-5" style={{color:s.color}}/>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-lg font-bold text-foreground">{s.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground text-sm">Payout Schedule — February 2026</h2>
                  <button className="inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                    <Download className="w-3.5 h-3.5"/> Download Report
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        {["Seller","Store","Period","Gross Sales","Commission (10%)","Net Payout","Scheduled","Status",""].map(h=>(
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {PAYOUTS.map((p,i)=>(
                        <motion.tr key={p.id} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{backgroundColor:p.color}}>{p.initials}</div>
                              <p className="font-medium text-foreground text-sm">{p.seller}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground/80">{p.storeName}</td>
                          <td className="px-4 py-3 text-xs font-medium text-muted-foreground">{p.period}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">₹{p.grossSales.toLocaleString()}</td>
                          <td className="px-4 py-3 text-red-500 font-medium">-₹{p.commission.toLocaleString()}</td>
                          <td className="px-4 py-3 font-bold text-foreground">₹{p.netPayout.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-foreground/70"><Calendar className="w-3 h-3 text-muted-foreground"/>{fmt(p.scheduledDate)}</div>
                          </td>
                          <td className="px-4 py-3">{payoutBadge(p.status)}</td>
                          <td className="px-4 py-3">
                            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><MoreVertical className="w-4 h-4"/></button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
