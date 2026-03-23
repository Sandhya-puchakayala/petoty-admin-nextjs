"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Image as ImageIcon, ImageOutline, UploadCloud } from "lucide-react";

export default function AddBreedPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [size, setSize] = useState("Medium");
  const [lifespan, setLifespan] = useState("");
  const [temperament, setTemperament] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSave = () => {
    // Navigate back to the breeds list (a real app would submit data first)
    router.push("/breeds/all");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h1 className="text-2xl font-bold text-foreground">Add Breed</h1>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Breed Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Breed Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Golden Retriever"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card text-foreground"
              />
            </div>

            {/* Pet Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Pet Type <span className="text-destructive">*</span>
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card text-foreground"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
              </select>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card text-foreground"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            {/* Lifespan */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Lifespan</label>
              <input
                type="text"
                placeholder="e.g., 10-15 years"
                value={lifespan}
                onChange={(e) => setLifespan(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card text-foreground"
              />
            </div>

            {/* Temperament */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-foreground">Temperament</label>
              <input
                type="text"
                placeholder="e.g., Friendly, Aggressive, Calm"
                value={temperament}
                onChange={(e) => setTemperament(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card text-foreground"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-foreground">Description</label>
              <textarea
                placeholder="Enter breed description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card text-foreground resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-foreground">Breed Image</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer text-center bg-card">
                <div className="p-3 bg-secondary rounded-full">
                  <UploadCloud className="w-6 h-6 text-foreground/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Status</label>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      isActive ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-foreground">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center gap-4 justify-end">
            <button
              onClick={() => router.push("/breeds/all")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 shadow-sm transition-colors"
            >
              Save Breed
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
