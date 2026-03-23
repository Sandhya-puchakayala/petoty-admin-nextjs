"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Sample Data ────────────────────────────────────────────────────────────
type Status = "Active" | "Inactive";

interface Breed {
  id: number;
  name: string;
  petType: "Dog" | "Cat" | "Bird";
  size: "Small" | "Medium" | "Large";
  lifespan: string;
  temperament: string;
  status: Status;
  image: string;
}

const SAMPLE_BREEDS: Breed[] = [
  {
    id: 1,
    name: "Golden Retriever",
    petType: "Dog",
    size: "Large",
    lifespan: "10-12 years",
    temperament: "Friendly, Intelligent, Devoted",
    status: "Active",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    name: "Persian Cat",
    petType: "Cat",
    size: "Medium",
    lifespan: "10-15 years",
    temperament: "Calm, Affectionate, Quiet",
    status: "Active",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    name: "Macaw",
    petType: "Bird",
    size: "Medium",
    lifespan: "30-50 years",
    temperament: "Playful, vocal, intelligent",
    status: "Active",
    image: "https://images.unsplash.com/photo-1552728089-571ecd14bc64?w=80&h=80&fit=crop",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function AllBreedsPage() {
  const [breeds, setBreeds] = useState<Breed[]>(SAMPLE_BREEDS);
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = breeds.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteBreed = (id: number) => {
    setBreeds((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">All Breeds</h1>
          <Link
            href="/breeds/add"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Breed
          </Link>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative ml-auto">
            <input
              type="text"
              placeholder="Search breeds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-3 pr-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-64"
            />
          </div>
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="p-4 text-left font-semibold text-foreground w-20">Image</th>
                  <th className="p-4 text-left font-semibold text-foreground">Breed Name</th>
                  <th className="p-4 text-left font-semibold text-foreground">Pet Type</th>
                  <th className="p-4 text-left font-semibold text-foreground">Size</th>
                  <th className="p-4 text-left font-semibold text-foreground">Lifespan</th>
                  <th className="p-4 text-left font-semibold text-foreground">Temperament</th>
                  <th className="p-4 text-center font-semibold text-foreground">Status</th>
                  <th className="p-4 text-center font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted-foreground">
                      No breeds found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((breed) => (
                    <tr
                      key={breed.id}
                      onMouseEnter={() => setHoveredId(breed.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`border-b border-border last:border-0 transition-colors ${
                        hoveredId === breed.id ? "bg-secondary/40" : ""
                      }`}
                    >
                      {/* Image */}
                      <td className="p-4">
                        <img
                          src={breed.image}
                          alt={breed.name}
                          className="w-12 h-12 rounded-lg object-cover border border-border shadow-sm"
                        />
                      </td>

                      {/* Name */}
                      <td className="p-4 font-medium text-foreground">
                        {breed.name}
                        <AnimatePresence>
                          {hoveredId === breed.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center gap-2 mt-1"
                            >
                              <Link
                                href={`/breeds/add`}
                                className="text-xs text-primary hover:underline font-medium"
                              >
                                Edit
                              </Link>
                              <span className="text-muted-foreground text-xs">|</span>
                              <button
                                className="text-xs text-destructive hover:underline font-medium"
                                onClick={() => deleteBreed(breed.id)}
                              >
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>

                      {/* Pet Type */}
                      <td className="p-4 text-foreground">{breed.petType}</td>

                      {/* Size */}
                      <td className="p-4 text-foreground">{breed.size}</td>

                      {/* Lifespan */}
                      <td className="p-4 text-muted-foreground">{breed.lifespan}</td>

                      {/* Temperament */}
                      <td className="p-4 text-muted-foreground truncate max-w-[150px]" title={breed.temperament}>
                        {breed.temperament}
                      </td>

                      {/* Status */}
                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                            breed.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {breed.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Link
                            href={`/breeds/add`}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteBreed(breed.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            Showing {filtered.length} breeds
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
