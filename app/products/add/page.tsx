"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
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
  X,
  Image as ImageOutline,
} from "lucide-react";

// ─── Tag Input ─────────────────────────────────────────────────────────────
function TagInput({
  tags,
  onChange,
  placeholder = "Choose category(s)",
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
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-muted-foreground hover:text-destructive transition-colors ml-0.5"
          >
            ×
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

// ─── Rich-Text Editor ──────────────────────────────────────────────────────
function RichTextEditor({
  value,
  onChange,
  minHeight = 160,
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
    <div className="border border-border rounded-none overflow-hidden bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-secondary/20 border-b border-border">
        {/* Paragraph dropdown */}
        <button className="flex items-center gap-1 text-xs text-foreground/70 px-2 py-1 rounded hover:bg-muted transition-colors">
          Paragraph <ChevronDown className="w-3 h-3" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        {TOOLBAR.slice(1).map((item, i) => {
          if (!("icon" in item) || !item.icon) return null;
          const Icon = item.icon;
          return (
            <button
              key={i}
              type="button"
              title={item.cmd}
              onClick={() => item.cmd && exec(item.cmd, item.val)}
              className="p-1.5 rounded hover:bg-muted transition-colors text-foreground/60 hover:text-foreground"
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
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

// ─── Main Add Product Page ──────────────────────────────────────────────────
export default function AddProductPage() {
  const router = useRouter();

  // Step state (step 1 = category/type wizard, step 2 = details form)
  const [step, setStep] = useState(1);

  // Form Fields
  const [categories, setCategories] = useState<string[]>([]);
  const [productType, setProductType] = useState("Simple product");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [sku, setSku] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const handleNext = () => {
    setStep(2);
  };

  const handleSave = () => {
    // Navigate back to the product list (a real app would submit data first)
    router.push("/products");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-foreground mb-8">Add Product</h1>

        {step === 1 && (
          <div className="space-y-6 max-w-xl border-t border-border pt-8">
            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
              <label className="text-sm font-medium text-foreground">
                Product categories
              </label>
              <TagInput
                tags={categories}
                onChange={setCategories}
                placeholder="Choose category(s)"
              />
            </div>
            
            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
              <label className="text-sm font-medium text-foreground">
                Product Type
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option>Simple product</option>
                <option>Variable product</option>
                <option>Grouped product</option>
                <option>External / Affiliate product</option>
              </select>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="bg-foreground text-background font-medium px-8 py-2.5 rounded hover:bg-foreground/90 transition-colors shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 border-t border-border pt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                Product Name<span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border rounded-none px-3 py-2.5 text-sm font-medium text-foreground bg-card focus:outline-none focus:ring-1 focus:ring-border"
              />
            </div>

            {/* About Product */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">
                About Product
              </label>
              <button
                type="button"
                className="mb-3 flex items-center gap-1.5 text-xs font-medium border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors text-foreground/80 bg-card shadow-sm"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Add Media
              </button>
              <RichTextEditor value={about} onChange={setAbout} minHeight={200} />
            </div>

            {/* Product Thumbnail */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-4">
                Product Thumbnail
              </label>
              
              <div className="flex flex-col items-start gap-4">
                <div className="w-10 h-10 border border-border bg-secondary/50 rounded flex items-center justify-center text-muted-foreground/50">
                   <ImageOutline className="w-5 h-5" />
                </div>
                <button className="text-sm font-medium text-[#0A96B6] hover:underline">
                  Upload Thumbnail
                </button>
              </div>
            </div>

            {/* Product SKU */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 mb-2 relative">
                <label className="text-sm font-bold text-foreground">Product SKU</label>
                <div className="w-4 h-4 bg-foreground/70 text-background rounded-full flex items-center justify-center text-[10px] font-bold cursor-help mx-1">?</div>
                <span className="text-xs text-muted-foreground">
                  (Prefix: JOHN_ will be added automatically as it is enabled by admin.)
                </span>
              </div>
              <div className="relative pt-6">
                <span className="absolute top-1 left-[45%] text-sm text-foreground/60 font-medium">JOHN_</span>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full border border-border rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-border"
                />
              </div>
            </div>

            {/* Product Short Description */}
            <div className="pt-4">
              <label className="block text-sm font-bold text-foreground mb-3">
                Product Short Description
              </label>
              <RichTextEditor value={shortDesc} onChange={setShortDesc} minHeight={150} />
            </div>

            {/* Save Button */}
            <div className="pt-8 border-t border-border/50">
              <button
                onClick={handleSave}
                className="w-full md:w-auto md:min-w-[400px] border border-border bg-card hover:bg-muted transition-colors text-foreground text-sm font-medium py-2.5 rounded shadow-sm mx-auto block"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
