"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  ChevronLeft,
  ExternalLink,
  X,
  Upload,
  Plus,
  HelpCircle,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Minus,
  Maximize2,
  Table,
  Image as ImageIcon,
  ChevronDown,
  Save,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────────
// Sample data (mirrors products/page.tsx)
// ──────────────────────────────────────────────────────────────────────────────
const PRODUCTS_MAP: Record<
  string,
  {
    name: string;
    image: string;
    regularPrice: number;
    salePrice?: number;
    status: string;
    stock: string;
    sku: string;
    category: string;
    description: string;
    shortDescription: string;
    productType: string;
  }
> = {
  "1": {
    name: "Jecket",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&h=80&fit=crop",
    regularPrice: 2000,
    salePrice: 1599,
    status: "Draft",
    stock: "In stock (100)",
    sku: "jecket",
    category: "Clothing",
    description:
      "Stay warm without compromising on style with this premium jacket, designed for everyday comfort and durability. Crafted from high-quality fabric, it offers excellent insulation while remaining lightweight and breathable.",
    shortDescription:
      "A stylish and comfortable jacket made from premium fabric, offering warmth, durability, and a modern fit—perfect for everyday wear.",
    productType: "Simple product",
  },
  "2": {
    name: "Midnight Minimal Strap Women Handbag",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop",
    regularPrice: 3499,
    status: "Published",
    stock: "In stock",
    sku: "handbag_midnight",
    category: "Bags",
    description:
      "Elegant minimalist handbag designed for the modern woman. Features a sleek strap and spacious interior with multiple pockets.",
    shortDescription:
      "Elegant minimalist strap handbag for modern women.",
    productType: "Simple product",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Tab definitions
// ──────────────────────────────────────────────────────────────────────────────
const TABS = [
  "Edit",
  "Inventory",
  "Shipping",
  "Linked Products",
  "Attributes",
  "Tags & Brand",
  "Status",
] as const;
type Tab = (typeof TABS)[number];

// ──────────────────────────────────────────────────────────────────────────────
// Tiny Rich-Text Toolbar (visual only, contentEditable underneath)
// ──────────────────────────────────────────────────────────────────────────────
function RichTextEditor({
  value,
  onChange,
  minHeight = 140,
}: {
  value: string;
  onChange: (v: string) => void;
  minHeight?: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const TOOLBAR = [
    { label: "Paragraph", isDropdown: true },
    { icon: Bold, cmd: "bold" },
    { icon: Italic, cmd: "italic" },
    { icon: ListOrdered, cmd: "insertOrderedList" },
    { icon: List, cmd: "insertUnorderedList" },
    { icon: Quote, cmd: "formatBlock", val: "blockquote" },
    { icon: AlignLeft, cmd: "justifyLeft" },
    { icon: AlignCenter, cmd: "justifyCenter" },
    { icon: AlignRight, cmd: "justifyRight" },
    { icon: AlignJustify, cmd: "justifyFull" },
    { icon: Link2, cmd: "createLink", val: "#" },
    { icon: Minus, cmd: "insertHorizontalRule" },
    { icon: Maximize2, cmd: "" },
    { icon: Table, cmd: "" },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-secondary/40 border-b border-border">
        {/* Paragraph dropdown */}
        <button className="flex items-center gap-1 text-xs text-foreground/70 px-2 py-1 rounded hover:bg-muted transition-colors">
          Paragraph <ChevronDown className="w-3 h-3" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        {TOOLBAR.slice(1).map((item, i) =>
          "icon" in item ? (
            <button
              key={i}
              type="button"
              title={item.cmd}
              onClick={() => item.cmd && exec(item.cmd, item.val)}
              className="p-1.5 rounded hover:bg-muted transition-colors text-foreground/60 hover:text-foreground"
            >
              <item.icon className="w-3.5 h-3.5" />
            </button>
          ) : null
        )}
      </div>
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML ?? "")}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-3 text-sm text-foreground/85 leading-relaxed focus:outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Tag Input
// ──────────────────────────────────────────────────────────────────────────────
function TagInput({
  tags,
  onChange,
  placeholder = "Add tag...",
}: {
  tags: string[];
  onChange: (t: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
    setInput("");
  };

  return (
    <div className="min-h-[42px] border border-border rounded-lg bg-card px-3 py-2 flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-primary/30">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 text-xs bg-secondary border border-border rounded px-2 py-0.5 text-foreground"
        >
          × {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-muted-foreground hover:text-destructive transition-colors ml-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          }
        }}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] text-sm bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Thumbnail Uploader
// ──────────────────────────────────────────────────────────────────────────────
function ThumbnailUploader({
  image,
  onRemove,
  onUpload,
}: {
  image: string | null;
  onRemove: () => void;
  onUpload: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {image && (
        <div className="relative inline-block">
          <img
            src={image}
            alt="Thumbnail"
            className="w-20 h-20 rounded-lg object-cover border border-border shadow-sm"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-card border border-destructive flex items-center justify-center text-destructive hover:bg-destructive hover:text-white transition-colors shadow"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium w-fit"
      >
        <Upload className="w-3.5 h-3.5" />
        Upload
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Inventory Tab
// ──────────────────────────────────────────────────────────────────────────────
function InventoryTab({
  data,
  onChange,
}: {
  data: { manageStock: boolean; stockQty: number; stockStatus: string; soldIndividually: boolean };
  onChange: (d: typeof data) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Stock Status</label>
        <select
          value={data.stockStatus}
          onChange={(e) => onChange({ ...data, stockStatus: e.target.value })}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option>In stock</option>
          <option>Out of stock</option>
          <option>On backorder</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="manageStock"
          checked={data.manageStock}
          onChange={(e) => onChange({ ...data, manageStock: e.target.checked })}
          className="rounded"
        />
        <label htmlFor="manageStock" className="text-sm font-medium text-foreground">
          Enable stock management at product level
        </label>
      </div>
      {data.manageStock && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">Stock Quantity</label>
          <input
            type="number"
            value={data.stockQty}
            onChange={(e) => onChange({ ...data, stockQty: Number(e.target.value) })}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="soldInd"
          checked={data.soldIndividually}
          onChange={(e) => onChange({ ...data, soldIndividually: e.target.checked })}
          className="rounded"
        />
        <label htmlFor="soldInd" className="text-sm font-medium text-foreground">
          Sold individually (limit purchases to 1 per order)
        </label>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Shipping Tab
// ──────────────────────────────────────────────────────────────────────────────
function ShippingTab({
  data,
  onChange,
}: {
  data: { weight: string; length: string; width: string; height: string; shippingClass: string };
  onChange: (d: typeof data) => void;
}) {
  const Field = ({
    label,
    field,
    unit,
  }: {
    label: string;
    field: keyof typeof data;
    unit?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-1">
        {label} {unit && <span className="text-muted-foreground font-normal">({unit})</span>}
      </label>
      <input
        type="text"
        value={data[field]}
        onChange={(e) => onChange({ ...data, [field]: e.target.value })}
        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
  return (
    <div className="space-y-5">
      <Field label="Weight" field="weight" unit="kg" />
      <div className="grid grid-cols-3 gap-4">
        <Field label="Length" field="length" unit="cm" />
        <Field label="Width" field="width" unit="cm" />
        <Field label="Height" field="height" unit="cm" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Shipping Class</label>
        <select
          value={data.shippingClass}
          onChange={(e) => onChange({ ...data, shippingClass: e.target.value })}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option>No shipping class</option>
          <option>Standard</option>
          <option>Express</option>
          <option>Overnight</option>
        </select>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Status Tab
// ──────────────────────────────────────────────────────────────────────────────
function StatusTab({
  status,
  onChange,
}: {
  status: string;
  onChange: (s: string) => void;
}) {
  const OPTIONS = ["Published", "Draft", "Pending Review", "Private"];
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-foreground">Product Status</p>
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
              status === opt
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:bg-muted"
            }`}
          >
            <input
              type="radio"
              name="status"
              value={opt}
              checked={status === opt}
              onChange={() => onChange(opt)}
              className="accent-primary"
            />
            <span className="text-sm font-medium text-foreground">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Attributes Tab
// ──────────────────────────────────────────────────────────────────────────────
function AttributesTab({
  attrs,
  onChange,
}: {
  attrs: { name: string; values: string }[];
  onChange: (a: { name: string; values: string }[]) => void;
}) {
  const add = () => onChange([...attrs, { name: "", values: "" }]);
  const remove = (i: number) => onChange(attrs.filter((_, idx) => idx !== i));
  const update = (i: number, field: "name" | "values", val: string) => {
    const next = [...attrs];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {attrs.map((attr, i) => (
        <div key={i} className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4">
          <div className="flex-1 space-y-3">
            <input
              placeholder="Attribute name (e.g. Color)"
              value={attr.name}
              onChange={(e) => update(i, "name", e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              placeholder="Values separated by | (e.g. Red | Blue)"
              value={attr.values}
              onChange={(e) => update(i, "values", e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors mt-0.5"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <Plus className="w-4 h-4" />
        Add Attribute
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Tags & Brand Tab
// ──────────────────────────────────────────────────────────────────────────────
function TagsBrandTab({
  tags,
  brand,
  onTagsChange,
  onBrandChange,
}: {
  tags: string[];
  brand: string;
  onTagsChange: (t: string[]) => void;
  onBrandChange: (b: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Product Tags</label>
        <TagInput tags={tags} onChange={onTagsChange} placeholder="Type a tag and press Enter..." />
        <p className="text-xs text-muted-foreground mt-1">Press Enter or comma to add a tag.</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
          placeholder="Enter brand name..."
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Linked Products Tab
// ──────────────────────────────────────────────────────────────────────────────
function LinkedProductsTab({
  upsells,
  crossSells,
  onUpsellsChange,
  onCrossSellsChange,
}: {
  upsells: string[];
  crossSells: string[];
  onUpsellsChange: (t: string[]) => void;
  onCrossSellsChange: (t: string[]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Upsells</label>
        <p className="text-xs text-muted-foreground mb-2">
          Products to recommend instead of (or alongside) the current product.
        </p>
        <TagInput tags={upsells} onChange={onUpsellsChange} placeholder="Search products..." />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Cross-sells</label>
        <p className="text-xs text-muted-foreground mb-2">
          Products to promote in the cart based on the current product.
        </p>
        <TagInput tags={crossSells} onChange={onCrossSellsChange} placeholder="Search products..." />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Edit Page
// ──────────────────────────────────────────────────────────────────────────────
export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? "1";

  const base = PRODUCTS_MAP[id] ?? PRODUCTS_MAP["1"];

  // ── Form state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("Edit");
  const [productType, setProductType] = useState(base.productType);
  const [name, setName] = useState(base.name);
  const [description, setDescription] = useState(base.description);
  const [categories, setCategories] = useState([base.category]);
  const [thumbnail, setThumbnail] = useState<string | null>(base.image);
  const [sku, setSku] = useState(base.sku);
  const [regularPrice, setRegularPrice] = useState(String(base.regularPrice));
  const [salePrice, setSalePrice] = useState(String(base.salePrice ?? ""));
  const [shortDescription, setShortDescription] = useState(base.shortDescription);

  // Inventory
  const [inventory, setInventory] = useState({
    manageStock: true,
    stockQty: 100,
    stockStatus: "In stock",
    soldIndividually: false,
  });
  // Shipping
  const [shipping, setShipping] = useState({
    weight: "0.8",
    length: "30",
    width: "20",
    height: "5",
    shippingClass: "No shipping class",
  });
  // Status
  const [status, setStatus] = useState(base.status);
  // Attributes
  const [attrs, setAttrs] = useState([{ name: "Color", values: "Black | White | Navy" }]);
  // Tags & Brand
  const [tags, setTags] = useState<string[]>(["jacket", "premium"]);
  const [brand, setBrand] = useState("Petoty");
  // Linked
  const [upsells, setUpsells] = useState<string[]>([]);
  const [crossSells, setCrossSells] = useState<string[]>([]);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-5">
        {/* Page heading */}
        <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>

        {/* Back + Preview */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Preview <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto scrollbar-none gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {/* ── EDIT TAB ── */}
            {activeTab === "Edit" && (
              <div className="space-y-7">
                {/* Product Type */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Product Type:
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-72 border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option>Simple product</option>
                    <option>Variable product</option>
                    <option>Grouped product</option>
                    <option>External / Affiliate product</option>
                  </select>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Product Name <span className="text-destructive">*</span> :
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {/* About Product */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    About Product
                  </label>
                  {/* Add Media button */}
                  <button
                    type="button"
                    className="mb-2 flex items-center gap-1.5 text-xs font-medium border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors text-foreground/70"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Add Media
                  </button>
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    minHeight={140}
                  />
                </div>

                {/* Product Category */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Product Category
                  </label>
                  <TagInput
                    tags={categories}
                    onChange={setCategories}
                    placeholder="Add category..."
                  />
                </div>

                {/* Product Thumbnail */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Product Thumbnail
                  </label>
                  <ThumbnailUploader
                    image={thumbnail}
                    onRemove={() => setThumbnail(null)}
                    onUpload={(url) => setThumbnail(url)}
                  />
                </div>

                {/* Product SKU */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <label className="text-sm font-semibold text-foreground">Product SKU</label>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground ml-1">
                      (Prefix: JOHN_ will be added automatically as it is enabled by admin.)
                    </span>
                  </div>
                  <div className="flex items-stretch">
                    <span className="flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-secondary text-sm text-muted-foreground font-mono">
                      JOHN_
                    </span>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="flex-1 border border-border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Regular Price */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Regular Price ($)
                  </label>
                  <input
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {/* Sale Price */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Sale Price ($)
                  </label>
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Product Short Description
                  </label>
                  <RichTextEditor
                    value={shortDescription}
                    onChange={setShortDescription}
                    minHeight={100}
                  />
                </div>
              </div>
            )}

            {activeTab === "Inventory" && (
              <InventoryTab data={inventory} onChange={setInventory} />
            )}

            {activeTab === "Shipping" && (
              <ShippingTab data={shipping} onChange={setShipping} />
            )}

            {activeTab === "Linked Products" && (
              <LinkedProductsTab
                upsells={upsells}
                crossSells={crossSells}
                onUpsellsChange={setUpsells}
                onCrossSellsChange={setCrossSells}
              />
            )}

            {activeTab === "Attributes" && (
              <AttributesTab attrs={attrs} onChange={setAttrs} />
            )}

            {activeTab === "Tags & Brand" && (
              <TagsBrandTab
                tags={tags}
                brand={brand}
                onTagsChange={setTags}
                onBrandChange={setBrand}
              />
            )}

            {activeTab === "Status" && (
              <StatusTab status={status} onChange={setStatus} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Save bar */}
        <div className="sticky bottom-6 flex items-center justify-between bg-card border border-border rounded-xl px-5 py-3 shadow-lg">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Discard changes
          </button>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-sm text-green-600 font-medium"
                >
                  ✓ Saved!
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow"
            >
              <Save className="w-4 h-4" />
              Save Product
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
