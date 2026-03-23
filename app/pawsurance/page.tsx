"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Plus, Search, ChevronDown, MoreVertical,
  CheckCircle2, XCircle, Clock, AlertCircle, Pencil, Trash2,
  FileText, CreditCard, Calendar, Check, X, Download, Eye,
  Zap, Crown, Sparkles, Star,
} from "lucide-react";

type Tab = "all-policies" | "claims" | "plan-management";
type PolicyStatus = "active" | "expired" | "pending";
type ClaimStatus = "approved" | "rejected" | "under-review" | "pending";

interface Policy {
  id: string; policyNo: string; owner: string; ownerInitials: string;
  petName: string; petType: string; plan: string; planColor: string;
  premium: number; sumInsured: number; startDate: string; endDate: string; status: PolicyStatus;
}
interface Claim {
  id: string; claimNo: string; owner: string; ownerInitials: string; planColor: string;
  petName: string; claimType: string; amount: number; date: string;
  status: ClaimStatus; description: string;
}
interface InsPlan {
  id: string; name: string; tagline: string; premium: number; sumInsured: number;
  icon: React.ElementType; gradient: string; color: string; features: string[];
  policyCount: number; status: "active" | "inactive"; isPopular?: boolean;
}

const POLICIES: Policy[] = [
  { id:"p1", policyNo:"PAW-2025-001", owner:"Priya Sharma",  ownerInitials:"PS", petName:"Bruno",  petType:"Dog",    plan:"Premium", planColor:"#702945", premium:999,  sumInsured:50000,  startDate:"2025-01-10", endDate:"2026-01-10", status:"active"  },
  { id:"p2", policyNo:"PAW-2025-002", owner:"Rahul Verma",   ownerInitials:"RV", petName:"Mochi",  petType:"Cat",    plan:"Basic",   planColor:"#2563EB", premium:499,  sumInsured:25000,  startDate:"2025-03-15", endDate:"2026-03-15", status:"active"  },
  { id:"p3", policyNo:"PAW-2025-003", owner:"Ananya Singh",  ownerInitials:"AS", petName:"Leo",    petType:"Dog",    plan:"Pro",     planColor:"#7C3AED", premium:1799, sumInsured:100000, startDate:"2024-11-20", endDate:"2025-11-20", status:"expired" },
  { id:"p4", policyNo:"PAW-2025-004", owner:"Kiran Patel",   ownerInitials:"KP", petName:"Coco",   petType:"Rabbit", plan:"Basic",   planColor:"#2563EB", premium:499,  sumInsured:25000,  startDate:"2025-07-01", endDate:"2026-07-01", status:"pending" },
  { id:"p5", policyNo:"PAW-2025-005", owner:"Meera Nair",    ownerInitials:"MN", petName:"Daisie", petType:"Dog",    plan:"Premium", planColor:"#702945", premium:999,  sumInsured:50000,  startDate:"2026-01-05", endDate:"2027-01-05", status:"active"  },
  { id:"p6", policyNo:"PAW-2025-006", owner:"Arjun Mehta",   ownerInitials:"AM", petName:"Max",    petType:"Dog",    plan:"Pro",     planColor:"#7C3AED", premium:1799, sumInsured:100000, startDate:"2025-05-10", endDate:"2026-05-10", status:"active"  },
  { id:"p7", policyNo:"PAW-2025-007", owner:"Divya Reddy",   ownerInitials:"DR", petName:"Toffee", petType:"Cat",    plan:"Basic",   planColor:"#2563EB", premium:499,  sumInsured:25000,  startDate:"2024-09-01", endDate:"2025-09-01", status:"expired" },
  { id:"p8", policyNo:"PAW-2025-008", owner:"Sanjay Kumar",  ownerInitials:"SK", petName:"Rocky",  petType:"Dog",    plan:"Premium", planColor:"#702945", premium:999,  sumInsured:50000,  startDate:"2026-02-20", endDate:"2027-02-20", status:"pending" },
];

const CLAIMS: Claim[] = [
  { id:"c1", claimNo:"CLM-001", owner:"Priya Sharma",  ownerInitials:"PS", planColor:"#702945", petName:"Bruno",  claimType:"Accident & Injury", amount:8500,  date:"2025-09-12", status:"approved",      description:"Dog injured leg during play, required surgery." },
  { id:"c2", claimNo:"CLM-002", owner:"Ananya Singh",  ownerInitials:"AS", planColor:"#7C3AED", petName:"Leo",    claimType:"Illness",            amount:5200,  date:"2025-08-03", status:"rejected",      description:"Pre-existing condition – not covered under policy." },
  { id:"c3", claimNo:"CLM-003", owner:"Arjun Mehta",   ownerInitials:"AM", planColor:"#7C3AED", petName:"Max",    claimType:"Hospitalisation",    amount:12000, date:"2025-11-22", status:"approved",      description:"Emergency hospitalisation due to parvovirus." },
  { id:"c4", claimNo:"CLM-004", owner:"Meera Nair",    ownerInitials:"MN", planColor:"#702945", petName:"Daisie", claimType:"Dental Treatment",   amount:3800,  date:"2026-01-08", status:"under-review",  description:"Dental cleaning and cavity treatment." },
  { id:"c5", claimNo:"CLM-005", owner:"Sanjay Kumar",  ownerInitials:"SK", planColor:"#702945", petName:"Rocky",  claimType:"Hospitalisation",    amount:15000, date:"2026-03-01", status:"under-review",  description:"Post-surgery recovery — inpatient 5 days." },
  { id:"c6", claimNo:"CLM-006", owner:"Rohit Joshi",   ownerInitials:"RJ", planColor:"#2563EB", petName:"Oreo",   claimType:"Illness",            amount:2100,  date:"2026-02-14", status:"pending",       description:"Suspected food poisoning, vet meds required." },
];

const INS_PLANS: InsPlan[] = [
  { id:"ip1", name:"Basic",   tagline:"Essential accident & illness cover", premium:499,  sumInsured:25000,  icon:Zap,      gradient:"from-blue-400 to-blue-600",     color:"#2563EB", features:["Accident & Injury","Illness Cover","Hospitalisation (up to ₹15k)","3rd Party Liability"], policyCount:4, status:"active" },
  { id:"ip2", name:"Premium", tagline:"Comprehensive care for your pet",    premium:999,  sumInsured:50000,  icon:Crown,    gradient:"from-rose-500 to-[#702945]",    color:"#702945", features:["All Basic Features","Dental Cover","Alternative Therapy","Annual Health Check","Emergency Boarding"], policyCount:3, status:"active", isPopular:true },
  { id:"ip3", name:"Pro",     tagline:"Complete coverage, zero worries",    premium:1799, sumInsured:100000, icon:Sparkles, gradient:"from-violet-500 to-purple-700", color:"#7C3AED", features:["All Premium Features","Specialist Referrals","Chronic Illness","Overseas Travel","Death Benefit"], policyCount:2, status:"active" },
];

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

const policyBadge = (s: PolicyStatus) => {
  const m = { active:{cls:"bg-emerald-50 text-emerald-700 border-emerald-200",icon:CheckCircle2,label:"Active"}, expired:{cls:"bg-red-50 text-red-600 border-red-200",icon:XCircle,label:"Expired"}, pending:{cls:"bg-amber-50 text-amber-700 border-amber-200",icon:Clock,label:"Pending"} }[s];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${m.cls}`}><m.icon className="w-3 h-3"/>{m.label}</span>;
};
const claimBadge = (s: ClaimStatus) => {
  const m = { approved:{cls:"bg-emerald-50 text-emerald-700 border-emerald-200",icon:CheckCircle2,label:"Approved"}, rejected:{cls:"bg-red-50 text-red-600 border-red-200",icon:XCircle,label:"Rejected"}, "under-review":{cls:"bg-blue-50 text-blue-700 border-blue-200",icon:Eye,label:"Under Review"}, pending:{cls:"bg-amber-50 text-amber-700 border-amber-200",icon:Clock,label:"Pending"} }[s];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${m.cls}`}><m.icon className="w-3 h-3"/>{m.label}</span>;
};

export default function PawsurancePage() {
  const [tab, setTab] = useState<Tab>("all-policies");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [plans, setPlans] = useState(INS_PLANS);

  const filteredPolicies = POLICIES.filter(p => {
    const q = search.toLowerCase();
    return (p.owner.toLowerCase().includes(q) || p.policyNo.toLowerCase().includes(q) || p.petName.toLowerCase().includes(q))
      && (statusFilter === "all" || p.status === statusFilter);
  });
  const filteredClaims = CLAIMS.filter(c => {
    const q = search.toLowerCase();
    return c.owner.toLowerCase().includes(q) || c.claimNo.toLowerCase().includes(q) || c.petName.toLowerCase().includes(q);
  });

  const activeCount  = POLICIES.filter(p => p.status==="active").length;
  const pendingCount = POLICIES.filter(p => p.status==="pending").length;
  const approvedAmt  = CLAIMS.filter(c => c.status==="approved").reduce((s,c)=>s+c.amount,0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5 max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)] bg-background">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary"/> Pawsurance
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage pet insurance policies, claims and plans</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 bg-card border border-border text-foreground/80 font-medium px-4 py-2 rounded-lg text-sm hover:bg-muted transition-colors shadow-sm">
              <Download className="w-4 h-4"/> Export
            </button>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-all shadow-sm">
              <Plus className="w-4 h-4"/> New Policy
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label:"Active Policies",  value:activeCount,                         icon:ShieldCheck, color:"#059669" },
            { label:"Pending Approval", value:pendingCount,                        icon:Clock,       color:"#D97706" },
            { label:"Total Claims",     value:CLAIMS.length,                       icon:FileText,    color:"#2563EB" },
            { label:"Claims Paid",      value:`₹${approvedAmt.toLocaleString()}`,  icon:CreditCard,  color:"#702945" },
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
          {(["all-policies","claims","plan-management"] as Tab[]).map(t => (
            <button key={t} onClick={() => { setTab(t); setSearch(""); setStatusFilter("all"); }}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize ${tab===t?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t==="all-policies"?"All Policies":t==="claims"?"Claims":"Plan Management"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── All Policies ── */}
          {tab === "all-policies" && (
            <motion.div key="policies" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="text" placeholder="Search by owner, policy no. or pet…" value={search} onChange={e=>setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition"/>
                </div>
                <div className="relative">
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
                    className="pl-3 pr-8 py-2 text-sm rounded-lg border border-border bg-card text-foreground focus:outline-none appearance-none">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"/>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Showing <span className="font-semibold text-foreground">{filteredPolicies.length}</span> of {POLICIES.length} policies</p>
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        {["Policy No.","Owner / Pet","Plan","Premium","Sum Insured","Start Date","End Date","Status",""].map(h=>(
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredPolicies.map((p,i)=>(
                        <motion.tr key={p.id} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-foreground/70">{p.policyNo}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{backgroundColor:p.planColor}}>{p.ownerInitials}</div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{p.owner}</p>
                                <p className="text-xs text-muted-foreground">🐾 {p.petName} · {p.petType}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3"><span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{backgroundColor:p.planColor}}>{p.plan}</span></td>
                          <td className="px-4 py-3 font-semibold text-foreground">₹{p.premium.toLocaleString()}/yr</td>
                          <td className="px-4 py-3 text-foreground/80">₹{p.sumInsured.toLocaleString()}</td>
                          <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs text-foreground/70"><Calendar className="w-3 h-3 text-muted-foreground"/>{fmt(p.startDate)}</div></td>
                          <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs text-foreground/70"><Clock className="w-3 h-3 text-muted-foreground"/>{fmt(p.endDate)}</div></td>
                          <td className="px-4 py-3">{policyBadge(p.status)}</td>
                          <td className="px-4 py-3"><button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><MoreVertical className="w-4 h-4"/></button></td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredPolicies.length===0&&<div className="py-16 flex flex-col items-center"><ShieldCheck className="w-10 h-10 text-muted-foreground mb-3"/><p className="text-sm font-medium text-foreground">No policies found</p></div>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Claims ── */}
          {tab === "claims" && (
            <motion.div key="claims" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {label:"Approved",     count:CLAIMS.filter(c=>c.status==="approved").length,     color:"#059669"},
                  {label:"Under Review", count:CLAIMS.filter(c=>c.status==="under-review").length, color:"#2563EB"},
                  {label:"Pending",      count:CLAIMS.filter(c=>c.status==="pending").length,      color:"#D97706"},
                  {label:"Rejected",     count:CLAIMS.filter(c=>c.status==="rejected").length,     color:"#DC2626"},
                ].map((s,i)=>(
                  <motion.div key={s.label} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                    className="bg-card border border-border rounded-xl p-3 text-center shadow-sm">
                    <p className="text-2xl font-bold" style={{color:s.color}}>{s.count}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <input type="text" placeholder="Search claims…" value={search} onChange={e=>setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClaims.map((c,i)=>(
                  <motion.div key={c.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                    className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{backgroundColor:c.planColor}}>{c.ownerInitials}</div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{c.owner}</p>
                          <p className="text-xs text-muted-foreground">🐾 {c.petName} · <span className="font-mono">{c.claimNo}</span></p>
                        </div>
                      </div>
                      {claimBadge(c.status)}
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{c.claimType}</p>
                      <p className="text-xs text-foreground/80 leading-relaxed">{c.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div><p className="text-xs text-muted-foreground">Amount</p><p className="text-base font-bold text-foreground">₹{c.amount.toLocaleString()}</p></div>
                      <div className="text-right"><p className="text-xs text-muted-foreground">Filed</p><p className="text-xs font-medium text-foreground">{fmt(c.date)}</p></div>
                      <div className="flex gap-1.5">
                        <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Eye className="w-3.5 h-3.5"/></button>
                        <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5"/></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Plan Management ── */}
          {tab === "plan-management" && (
            <motion.div key="plans" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {plans.map((plan,i)=>(
                  <motion.div key={plan.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
                    className={`relative bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${plan.isPopular?"border-primary/40 ring-2 ring-primary/15":"border-border"}`}>
                    {plan.isPopular&&<div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-current"/>Most Popular</div>}
                    <div className={`bg-gradient-to-br ${plan.gradient} p-5 flex items-center gap-3`}>
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><plan.icon className="w-5 h-5 text-white"/></div>
                      <div><h3 className="font-bold text-white text-lg">{plan.name}</h3><p className="text-white/75 text-xs">{plan.tagline}</p></div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline gap-1 mb-1 pb-3 border-b border-border">
                        <span className="text-2xl font-extrabold text-foreground">₹{plan.premium.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">/year</span>
                        <span className="ml-auto text-xs text-muted-foreground">Sum: <span className="font-semibold text-foreground">₹{plan.sumInsured.toLocaleString()}</span></span>
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {plan.features.map(f=>(
                          <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{color:plan.color}}/>{f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between border-t border-border pt-3 mb-3">
                        <div><p className="text-xs text-muted-foreground">Policies</p><p className="text-sm font-bold text-foreground">{plan.policyCount}</p></div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${plan.status==="active"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-gray-100 text-gray-500 border-gray-200"}`}>
                          {plan.status==="active"?<CheckCircle2 className="w-3 h-3"/>:<AlertCircle className="w-3 h-3"/>}{plan.status==="active"?"Active":"Inactive"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={()=>setPlans(ps=>ps.map(p=>p.id===plan.id?{...p,status:p.status==="active"?"inactive":"active"}:p))}
                          className="flex-1 text-xs font-medium py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground">
                          {plan.status==="active"?"Deactivate":"Activate"}
                        </button>
                        <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"><Pencil className="w-3.5 h-3.5"/></button>
                        <button className="p-1.5 rounded-lg border border-border hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors text-muted-foreground"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Coverage Matrix */}
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border"><h2 className="font-semibold text-foreground text-sm">Coverage Comparison Matrix</h2></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground w-56">Coverage</th>
                        {plans.map(p=>(
                          <th key={p.id} className="px-4 py-3 text-center">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${p.gradient}`}><p.icon className="w-3 h-3"/>{p.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {([["Accident & Injury",[true,true,true]],["Illness Cover",[true,true,true]],["Hospitalisation",[true,true,true]],["Dental Treatment",[false,true,true]],["Alternative Therapy",[false,true,true]],["Specialist Referrals",[false,false,true]],["Chronic Illness",[false,false,true]],["Death Benefit",[false,false,true]]] as [string,boolean[]][]).map(([label,cols])=>(
                        <tr key={label} className="hover:bg-muted/30 transition-colors">
                          <td className="px-5 py-3 text-sm font-medium text-foreground">{label}</td>
                          {cols.map((has,ci)=><td key={ci} className="px-4 py-3 text-center">{has?<Check className="w-4 h-4 text-emerald-500 mx-auto"/>:<X className="w-4 h-4 text-gray-300 mx-auto"/>}</td>)}
                        </tr>
                      ))}
                      <tr className="bg-muted/40 font-semibold">
                        <td className="px-5 py-3 text-sm text-foreground">Annual Premium</td>
                        {plans.map(p=><td key={p.id} className="px-4 py-3 text-center text-sm" style={{color:p.color}}>₹{p.premium.toLocaleString()}</td>)}
                      </tr>
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
