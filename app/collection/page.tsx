"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, ChevronRight, Home, Star, Heart, ShoppingCart,
  Search, SlidersHorizontal, X, ArrowUpDown, ChevronLeft,
  ChevronDown, LayoutGrid, List, Image as ImageIcon,
  Layers, Tag, TrendingUp, Package,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  emoji: string;
  gradient: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  collectionId: string;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  emoji: string;
  bg: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const COLLECTIONS: Collection[] = [
  { id: "c1", name: "Dog Products", slug: "dogs", description: "Everything your furry best friend needs", productCount: 48, emoji: "🐶", gradient: "from-amber-400 to-orange-500", category: "Pets" },
  { id: "c2", name: "Cat Essentials", slug: "cats", description: "Premium picks for your feline companion", productCount: 36, emoji: "🐱", gradient: "from-purple-400 to-violet-600", category: "Pets" },
  { id: "c3", name: "Bird Corner", slug: "birds", description: "Cages, food & fun for your little flyer", productCount: 22, emoji: "🦜", gradient: "from-emerald-400 to-teal-600", category: "Pets" },
  { id: "c4", name: "Aquatic Life", slug: "fish", description: "Aquariums, accessories & fish care", productCount: 19, emoji: "🐠", gradient: "from-sky-400 to-blue-600", category: "Pets" },
  { id: "c5", name: "Small Pets", slug: "small-pets", description: "Hamsters, rabbits & more", productCount: 15, emoji: "🐹", gradient: "from-rose-400 to-pink-600", category: "Pets" },
  { id: "c6", name: "Pet Accessories", slug: "accessories", description: "Collars, leashes, beds & bowls", productCount: 62, emoji: "🎀", gradient: "from-yellow-400 to-amber-500", category: "Accessories" },
  { id: "c7", name: "Health & Wellness", slug: "health", description: "Vitamins, supplements & grooming", productCount: 31, emoji: "💊", gradient: "from-green-400 to-emerald-600", category: "Health" },
  { id: "c8", name: "Pet Food", slug: "food", description: "Premium kibble, treats & raw diets", productCount: 55, emoji: "🍖", gradient: "from-red-400 to-rose-600", category: "Food" },
];

const ALL_PRODUCTS: Product[] = [
  // Dogs
  { id: "p1",  name: "Premium Dog Collar",          price: 349,  originalPrice: 499,  rating: 4.8, reviews: 124, collectionId: "c1", category: "Accessories", inStock: true,  isBestSeller: true,  emoji: "🦮", bg: "#FEF3C7" },
  { id: "p2",  name: "Retractable Dog Leash",        price: 599,  rating: 4.5, reviews: 89,  collectionId: "c1", category: "Accessories", inStock: true,  emoji: "🐕", bg: "#FDE68A" },
  { id: "p3",  name: "Orthopedic Dog Bed",           price: 1899, originalPrice: 2499, rating: 4.9, reviews: 211, collectionId: "c1", category: "Beds",        inStock: true,  isBestSeller: true,  emoji: "🛏️", bg: "#FED7AA" },
  { id: "p4",  name: "Chew Toy Set (6-pack)",        price: 299,  rating: 4.6, reviews: 305, collectionId: "c1", category: "Toys",        inStock: true,  isNew: true, emoji: "🎾", bg: "#FFEDD5" },
  { id: "p5",  name: "Grain-Free Dry Dog Food 5kg",  price: 1299, originalPrice: 1599, rating: 4.7, reviews: 178, collectionId: "c1", category: "Food",        inStock: false, emoji: "🍖", bg: "#FEE2E2" },
  { id: "p6",  name: "Dog Grooming Brush",           price: 449,  rating: 4.4, reviews: 67,  collectionId: "c1", category: "Grooming",    inStock: true,  isNew: true, emoji: "✂️", bg: "#FEF9C3" },
  // Cats
  { id: "p7",  name: "Cat Scratch Tower",            price: 1499, originalPrice: 1999, rating: 4.8, reviews: 94,  collectionId: "c2", category: "Furniture",   inStock: true,  isBestSeller: true,  emoji: "🐈", bg: "#EDE9FE" },
  { id: "p8",  name: "Interactive Laser Toy",        price: 349,  rating: 4.7, reviews: 212, collectionId: "c2", category: "Toys",        inStock: true,  isNew: true, emoji: "🔴", bg: "#DDD6FE" },
  { id: "p9",  name: "Self-Cleaning Litter Box",     price: 2999, originalPrice: 3999, rating: 4.9, reviews: 43,  collectionId: "c2", category: "Hygiene",     inStock: true,  isBestSeller: true,  emoji: "🚽", bg: "#C4B5FD" },
  { id: "p10", name: "Cat Harness & Leash",          price: 499,  rating: 4.5, reviews: 88,  collectionId: "c2", category: "Accessories", inStock: false, emoji: "🎗️", bg: "#F3E8FF" },
  { id: "p11", name: "Royal Canin Cat Food 2kg",     price: 899,  originalPrice: 1099, rating: 4.8, reviews: 156, collectionId: "c2", category: "Food",        inStock: true,  emoji: "🐟", bg: "#FDF4FF" },
  { id: "p12", name: "Catnip Plush Mouse",           price: 199,  rating: 4.3, reviews: 321, collectionId: "c2", category: "Toys",        inStock: true,  isNew: true, emoji: "🐭", bg: "#FAE8FF" },
  // Birds
  { id: "p13", name: "Deluxe Bird Cage (Large)",     price: 2199, originalPrice: 2799, rating: 4.6, reviews: 52,  collectionId: "c3", category: "Housing",     inStock: true,  isBestSeller: true,  emoji: "🏠", bg: "#D1FAE5" },
  { id: "p14", name: "Colourful Wooden Perches",     price: 299,  rating: 4.4, reviews: 73,  collectionId: "c3", category: "Accessories", inStock: true,  emoji: "🪵", bg: "#A7F3D0" },
  { id: "p15", name: "Budgie Seed Mix 1kg",          price: 249,  rating: 4.7, reviews: 189, collectionId: "c3", category: "Food",        inStock: true,  emoji: "🌻", bg: "#6EE7B7" },
  // Fish
  { id: "p16", name: "Aquarium Starter Kit 60L",     price: 3499, originalPrice: 4499, rating: 4.8, reviews: 36,  collectionId: "c4", category: "Tanks",       inStock: true,  isBestSeller: true,  emoji: "🐠", bg: "#BAE6FD" },
  { id: "p17", name: "LED Aquarium Light",           price: 799,  rating: 4.6, reviews: 64,  collectionId: "c4", category: "Accessories", inStock: true,  isNew: true, emoji: "💡", bg: "#E0F2FE" },
  // Accessories
  { id: "p18", name: "Stainless Steel Food Bowl",    price: 199,  rating: 4.7, reviews: 431, collectionId: "c6", category: "Feeding",     inStock: true,  isBestSeller: true,  emoji: "🥣", bg: "#FEF08A" },
  { id: "p19", name: "Waterproof Pet Rain Coat",     price: 699,  originalPrice: 999,  rating: 4.5, reviews: 78,  collectionId: "c6", category: "Clothing",    inStock: true,  isNew: true, emoji: "🧥", bg: "#FDE68A" },
  // Health
  { id: "p20", name: "Multivitamin Chews (60 pcs)",  price: 549,  rating: 4.8, reviews: 97,  collectionId: "c7", category: "Supplements", inStock: true,  isBestSeller: true,  emoji: "💊", bg: "#BBF7D0" },
  // Food
  { id: "p21", name: "Pedigree Adult 10kg",          price: 1499, originalPrice: 1799, rating: 4.6, reviews: 243, collectionId: "c8", category: "Food",        inStock: true,  emoji: "🐾", bg: "#FCA5A5" },
  { id: "p22", name: "Whiskas Tuna Pouches 12-Pack", price: 599,  rating: 4.7, reviews: 188, collectionId: "c8", category: "Food",        inStock: true,  isBestSeller: true,  emoji: "🐟", bg: "#FEE2E2" },
  // Small Pets
  { id: "p23", name: "Hamster Cage Habitat",         price: 999,  originalPrice: 1299, rating: 4.5, reviews: 44,  collectionId: "c5", category: "Housing",     inStock: true,  emoji: "🐹", bg: "#FBCFE8" },
  { id: "p24", name: "Rabbit Pellet Food 2kg",       price: 349,  rating: 4.6, reviews: 61,  collectionId: "c5", category: "Food",        inStock: true,  isNew: true, emoji: "🥕", bg: "#FCE7F3" },
];

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "New Arrivals" },
];

const ITEMS_PER_PAGE = 6;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-100"}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, wishlist, toggleWishlist }: {
  product: Product;
  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
    >
      {/* Image area */}
      <div
        className="relative h-44 flex items-center justify-center text-6xl select-none"
        style={{ backgroundColor: product.bg }}
      >
        <span>{product.emoji}</span>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 flex-col">
          {product.isBestSeller && (
            <span className="text-[10px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">Best Seller</span>
          )}
          {product.isNew && (
            <span className="text-[10px] font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full">New</span>
          )}
          {discount && (
            <span className="text-[10px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">{discount}% off</span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 bg-white border border-border px-2 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border hover:scale-105"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${wishlist.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[11px] text-muted-foreground mb-0.5">{product.category}</p>
        <h3 className="text-sm font-semibold text-foreground leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={handleCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            product.inStock
              ? added
                ? "bg-emerald-500 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {added ? "Added ✓" : product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CollectionPage() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [tab, setTab] = useState<"all" | "create">("all");
  const [search, setSearch] = useState("");

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(true);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openCollection = (col: Collection) => {
    setActiveCollection(col);
    setView("detail");
    setPage(1);
    setSearch("");
    setSelectedCategories(new Set());
    setMinRating(0);
    setOnlyInStock(false);
    setSortBy("popularity");
    setPriceRange([0, 5000]);
  };

  // Derived: categories for current collection
  const collectionProducts = useMemo(
    () => ALL_PRODUCTS.filter((p) => p.collectionId === activeCollection?.id),
    [activeCollection]
  );
  const availableCategories = useMemo(
    () => Array.from(new Set(collectionProducts.map((p) => p.category))),
    [collectionProducts]
  );

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
    setPage(1);
  };

  // Filtered + sorted products
  const filteredProducts = useMemo(() => {
    let list = collectionProducts.filter((p) => {
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedCategories.size > 0 && !selectedCategories.has(p.category)) return false;
      if (p.rating < minRating) return false;
      if (onlyInStock && !p.inStock) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    switch (sortBy) {
      case "price_asc":  list = [...list].sort((a, b) => a.price - b.price); break;
      case "price_desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating":     list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest":     list = [...list].filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break;
      default:           list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [collectionProducts, priceRange, selectedCategories, minRating, onlyInStock, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginated = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ── Filtered search for list view ──────────────────────────────────────────
  const visibleCollections = COLLECTIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAIL VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (view === "detail" && activeCollection) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)] bg-background">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <button onClick={() => setView("list")} className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => setView("list")} className="hover:text-foreground transition-colors">
              Collections
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{activeCollection.name}</span>
          </nav>

          {/* Collection Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl overflow-hidden mb-6 h-36 bg-gradient-to-r ${activeCollection.gradient} flex items-center px-8 shadow-md`}
          >
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-30 select-none">
              {activeCollection.emoji}
            </div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold text-white">{activeCollection.name}</h1>
              <p className="text-white/80 text-sm mt-1">{activeCollection.description}</p>
              <p className="text-white/60 text-xs mt-1">{activeCollection.productCount} products</p>
            </div>
          </motion.div>

          {/* Body: Filters + Products */}
          <div className="flex gap-6">

            {/* ── Left Filter Panel ─────────────────────────── */}
            <AnimatePresence>
              {showFilters && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="hidden lg:flex flex-col gap-5 w-56 shrink-0"
                >
                  <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
                    </p>

                    {/* Price Range */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Price Range</p>
                      <div className="space-y-2">
                        <input
                          type="range" min={0} max={5000} step={50}
                          value={priceRange[1]}
                          onChange={(e) => { setPriceRange([priceRange[0], +e.target.value]); setPage(1); }}
                          className="w-full accent-primary"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    {availableCategories.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Category</p>
                        <div className="space-y-1.5">
                          {availableCategories.map((cat) => (
                            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedCategories.has(cat)}
                                onChange={() => toggleCategory(cat)}
                                className="accent-primary w-3.5 h-3.5"
                              />
                              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{cat}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Min Rating */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Min Rating</p>
                      <div className="flex gap-1">
                        {[0, 3, 4, 4.5].map((r) => (
                          <button
                            key={r}
                            onClick={() => { setMinRating(r); setPage(1); }}
                            className={`flex-1 py-1 text-xs rounded-lg border transition-all font-medium ${
                              minRating === r
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
                            }`}
                          >
                            {r === 0 ? "All" : `${r}★`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Availability</p>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => { setOnlyInStock(!onlyInStock); setPage(1); }}
                          className={`relative w-9 h-5 rounded-full transition-colors ${onlyInStock ? "bg-primary" : "bg-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${onlyInStock ? "left-4" : "left-0.5"}`} />
                        </div>
                        <span className="text-sm text-foreground/80">In Stock Only</span>
                      </label>
                    </div>

                    {/* Reset */}
                    <button
                      onClick={() => {
                        setPriceRange([0, 5000]);
                        setSelectedCategories(new Set());
                        setMinRating(0);
                        setOnlyInStock(false);
                        setPage(1);
                      }}
                      className="mt-5 w-full text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg py-1.5 transition-colors hover:bg-muted"
                    >
                      Reset Filters
                    </button>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* ── Product Grid ──────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`Search in ${activeCollection.name}...`}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                {/* Sort */}
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    className="pl-9 pr-8 py-2 text-sm rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Toggle filter panel */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden lg:flex items-center gap-2 bg-card border border-border text-foreground/80 font-medium px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {showFilters ? "Hide" : "Filters"}
                </button>
              </div>

              {/* Result count */}
              <p className="text-xs text-muted-foreground mb-3">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                {filteredProducts.length !== collectionProducts.length && (
                  <span> (filtered from {collectionProducts.length})</span>
                )}
              </p>

              {/* Grid */}
              <AnimatePresence mode="wait">
                {paginated.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium text-foreground mb-1">No products found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters or search.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${page}-${sortBy}-${search}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {paginated.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        wishlist={wishlist}
                        toggleWishlist={toggleWishlist}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center disabled:opacity-40 hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium border transition-all ${
                        page === n
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center disabled:opacity-40 hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LIST VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)] bg-background">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Collections</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Organize and manage your product collections</p>
          </div>
          <button
            onClick={() => setTab("create")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Collection
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Collections", value: COLLECTIONS.length, icon: Layers, color: "#702945" },
            { label: "Total Products", value: ALL_PRODUCTS.length, icon: Package, color: "#059669" },
            { label: "Wishlisted", value: wishlist.size, icon: Heart, color: "#DC2626" },
            { label: "Categories", value: 4, icon: Tag, color: "#D97706" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm"
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: s.color + "18" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-0">
          {(["all", "create"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? "All Collections" : "Create Collection"}
            </button>
          ))}
        </div>

        {/* Tab: All Collections */}
        {tab === "all" && (
          <>
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleCollections.map((col, i) => (
                <motion.button
                  key={col.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openCollection(col)}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
                >
                  {/* Gradient Banner */}
                  <div className={`h-24 bg-gradient-to-br ${col.gradient} flex items-center justify-center text-5xl relative overflow-hidden`}>
                    <span className="relative z-10 drop-shadow">{col.emoji}</span>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{col.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{col.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                        {col.productCount} products
                      </span>
                      <span className="text-primary flex items-center gap-0.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* Add new collection card */}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: visibleCollections.length * 0.05 }}
                onClick={() => setTab("create")}
                className="border-2 border-dashed border-border rounded-xl h-full min-h-[12rem] flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  New Collection
                </p>
              </motion.button>
            </div>
          </>
        )}

        {/* Tab: Create Collection */}
        {tab === "create" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm max-w-2xl"
          >
            <h2 className="text-lg font-semibold text-foreground mb-1">Create a New Collection</h2>
            <p className="text-sm text-muted-foreground mb-6">Group your products into curated collections for easier browsing.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Collection Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Dog Products, Summer Sale..." className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea rows={3} placeholder="Brief description of this collection..." className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none transition">
                  <option>Select a category</option>
                  <option>Pets</option>
                  <option>Accessories</option>
                  <option>Food</option>
                  <option>Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Banner Image</label>
                <div className="border-2 border-dashed border-border rounded-xl h-32 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground/70">PNG, JPG up to 5MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="bg-primary text-primary-foreground font-medium px-5 py-2 rounded-lg text-sm hover:opacity-90 transition shadow-sm">
                  Create Collection
                </button>
                <button onClick={() => setTab("all")} className="border border-border text-foreground font-medium px-5 py-2 rounded-lg text-sm hover:bg-muted transition">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}
