"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Trash2,
  PlusCircle,
  Search,
  Eye,
  Pencil,
  X,
  ChevronLeft,
  ExternalLink,
  Package,
  AlertTriangle,
  XCircle,
  FileText,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Sample Data ────────────────────────────────────────────────────────────
type ProductStatus = "Published" | "Draft" | "On Sale";

interface Product {
  id: number;
  name: string;
  image: string;
  regularPrice: number;
  salePrice?: number;
  status: ProductStatus;
  stock: string;
  sku: string;
  category: string;
  description: string;
  shortDescription: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Jecket",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&h=80&fit=crop",
    regularPrice: 2000,
    salePrice: 1599,
    status: "Draft",
    stock: "In stock (100)",
    sku: "JOHN_jecket",
    category: "Clothing",
    description: "Stay warm without compromising on style with this premium jacket, designed for everyday comfort and durability. Crafted from high-quality fabric, it offers excellent insulation while remaining lightweight and breathable.",
    shortDescription: "Premium everyday jacket, lightweight and breathable.",
  },
  {
    id: 2,
    name: "Midnight Minimal Strap Women Handbag",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop",
    regularPrice: 3499,
    status: "Published",
    stock: "In stock",
    sku: "JOHN_handbag_midnight",
    category: "Bags",
    description: "Elegant minimalist handbag designed for the modern woman. Features a sleek strap and spacious interior with multiple pockets.",
    shortDescription: "Elegant minimalist strap handbag for modern women.",
  },
  {
    id: 3,
    name: "Classic Leather Look Casual Men Belt",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=80&h=80&fit=crop",
    regularPrice: 1299,
    salePrice: 999,
    status: "Published",
    stock: "In stock",
    sku: "JOHN_belt_classic",
    category: "Accessories",
    description: "A classic leather-look belt that pairs perfectly with casual and semi-formal outfits. Durable buckle and premium faux-leather strap.",
    shortDescription: "Classic faux-leather casual belt for men.",
  },
  {
    id: 4,
    name: "Vintage Denim Jacket",
    image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=80&h=80&fit=crop",
    regularPrice: 1800,
    salePrice: 1400,
    status: "On Sale",
    stock: "Low stock (5)",
    sku: "JOHN_denim_vintage",
    category: "Clothing",
    description: "Retro-inspired denim jacket with a washed finish. Perfect for layering over tees and shirts. Offers a relaxed fit with front button closure.",
    shortDescription: "Retro washed denim jacket for a vintage look.",
  },
  {
    id: 5,
    name: "Sporty Canvas Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    regularPrice: 2500,
    salePrice: 1999,
    status: "On Sale",
    stock: "In stock",
    sku: "JOHN_sneaker_canvas",
    category: "Footwear",
    description: "Lightweight canvas sneakers with a rubber sole and breathable upper. Perfect for casual outings and light sports.",
    shortDescription: "Lightweight breathable canvas sneakers.",
  },
  {
    id: 6,
    name: "Structured Formal Blazer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    regularPrice: 4500,
    status: "Published",
    stock: "In stock",
    sku: "JOHN_blazer_formal",
    category: "Clothing",
    description: "A well-structured formal blazer for professional settings. Tailored fit, premium fabric, and a clean silhouette that works well for all occasions.",
    shortDescription: "Structured formal blazer for professional settings.",
  },
  {
    id: 7,
    name: "Floral Summer Dress",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=80&h=80&fit=crop",
    regularPrice: 1200,
    status: "Published",
    stock: "In stock",
    sku: "JOHN_dress_floral",
    category: "Clothing",
    description: "Breezy floral summer dress with a midi length and adjustable straps. Made from soft fabric perfect for warm weather.",
    shortDescription: "Breezy floral midi dress for warm weather.",
  },
  {
    id: 8,
    name: "Slim Fit Chinos",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=80&h=80&fit=crop",
    regularPrice: 1600,
    salePrice: 1299,
    status: "On Sale",
    stock: "In stock",
    sku: "JOHN_chinos_slim",
    category: "Bottoms",
    description: "Slim fit chino pants in a neutral palette. Versatile enough for both casual and smart-casual occasions. Features a stretch fabric for comfort.",
    shortDescription: "Slim fit stretch chinos in neutral shades.",
  },
  {
    id: 9,
    name: "Minimalist Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
    regularPrice: 5000,
    status: "Published",
    stock: "In stock",
    sku: "JOHN_watch_minimal",
    category: "Accessories",
    description: "A clean, minimalist watch with a stainless steel case and genuine leather strap. Water-resistant and equipped with a quartz movement.",
    shortDescription: "Clean minimalist watch with leather strap.",
  },
  {
    id: 10,
    name: "Knit Beanie Hat",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=80&h=80&fit=crop",
    regularPrice: 600,
    status: "Draft",
    stock: "In stock (50)",
    sku: "JOHN_beanie_knit",
    category: "Accessories",
    description: "Soft knit beanie hat ideal for cold weather. Stretchable fabric fits most head sizes. Available in multiple colors.",
    shortDescription: "Soft stretchable knit beanie for cold weather.",
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────
function computeStats(products: Product[]) {
  return {
    published: products.filter((p) => p.status === "Published").length,
    lowStock: products.filter((p) => p.stock.toLowerCase().includes("low")).length,
    outOfStock: products.filter((p) => p.stock.toLowerCase().includes("out")).length,
    draft: products.filter((p) => p.status === "Draft").length,
    onSale: products.filter((p) => p.status === "On Sale").length,
  };
}

// ─── Preview Modal ───────────────────────────────────────────────────────────
function PreviewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-foreground">Product Preview</h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/products/${product.id}/edit`}
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Edit <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Product image + name */}
            <div className="flex items-start gap-5">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover border border-border shadow-sm flex-shrink-0"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                      product.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : product.status === "On Sale"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.status}
                  </span>
                  <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                    {product.stock}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pricing</p>
              <div className="flex items-baseline gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-primary">${product.salePrice.toLocaleString()}</span>
                    <span className="text-base line-through text-muted-foreground">
                      ${product.regularPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)}% off
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-foreground">
                    ${product.regularPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Category</p>
                <p className="text-sm font-medium text-foreground">{product.category}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Regular Price</p>
                <p className="text-sm font-medium text-foreground">${product.regularPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">About Product</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Short description */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Short Description</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{product.shortDescription}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20 rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Close
            </button>
            <Link
              href={`/products/${product.id}/edit`}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Product
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const stats = computeStats(products);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  };

  const deleteSelected = () => {
    setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const STAT_CARDS = [
    { label: "Published", value: stats.published, icon: Package },
    { label: "Low Stock", value: stats.lowStock, icon: AlertTriangle },
    { label: "Out of Stock", value: stats.outOfStock, icon: XCircle },
    { label: "Draft", value: stats.draft, icon: FileText },
    { label: "On Sale", value: stats.onSale, icon: Tag },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-foreground">Product List</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-foreground text-background rounded-xl px-4 py-4 flex flex-col gap-1 shadow-sm"
            >
              <span className="text-2xl font-bold">{card.value}</span>
              <span className="text-xs font-medium text-background/70">{card.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={deleteSelected}
            disabled={selectedIds.size === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive/50 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <Link
            href="/products/add"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Link>
          <button className="text-sm font-medium text-primary hover:underline px-2">
            Miscellaneous Settings
          </button>

          {/* Search */}
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-3 pr-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-56"
              />
            </div>
            <button className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* Hint */}
        <p className="text-xs text-muted-foreground">
          Click on the Name to edit a product. Hover on rows to see actions.{" "}
          <span className="text-primary font-medium cursor-pointer hover:underline">
            Items Per Page (10)
          </span>
        </p>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="p-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="p-3 text-left font-semibold text-foreground w-20">Image</th>
                  <th className="p-3 text-center font-semibold text-foreground">Name</th>
                  <th className="p-3 text-center font-semibold text-foreground">Price</th>
                  <th className="p-3 text-center font-semibold text-foreground">Status</th>
                  <th className="p-3 text-center font-semibold text-foreground">Stock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product.id}
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`border-b border-border last:border-0 transition-colors ${
                        hoveredId === product.id ? "bg-secondary/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="rounded"
                        />
                      </td>

                      {/* Image */}
                      <td className="p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-border shadow-sm"
                        />
                      </td>

                      {/* Name + hover actions */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setPreviewProduct(product)}
                          className="font-medium text-primary hover:underline block mx-auto"
                        >
                          {product.name}
                        </button>

                        {/* Inline action links on hover */}
                        <AnimatePresence>
                          {hoveredId === product.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center justify-center gap-2 mt-1"
                            >
                              <Link
                                href={`/products/${product.id}/edit`}
                                className="text-xs text-primary hover:underline font-medium"
                              >
                                Edit
                              </Link>
                              <span className="text-muted-foreground text-xs">|</span>
                              <button
                                className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
                                onClick={() => setPreviewProduct(product)}
                              >
                                <Eye className="w-3 h-3" />
                                Preview
                              </button>
                              <span className="text-muted-foreground text-xs">|</span>
                              <button
                                className="text-xs text-destructive hover:underline font-medium"
                                onClick={() => deleteProduct(product.id)}
                              >
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>

                      {/* Price */}
                      <td className="p-3 text-center whitespace-nowrap">
                        {product.salePrice ? (
                          <div className="flex flex-col items-center">
                            <span className="line-through text-muted-foreground text-xs">
                              ${product.regularPrice.toLocaleString()}
                            </span>
                            <span className="font-semibold text-foreground">
                              ${product.salePrice.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium text-foreground">
                            ${product.regularPrice.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                            product.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : product.status === "On Sale"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="p-3 text-center text-muted-foreground">
                        {product.stock}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewProduct && (
        <PreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
      )}
    </DashboardLayout>
  );
}
