"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Globe, AppWindow, Smartphone, Layers, Building2, Brain,
  ChevronRight, ChevronLeft, Check, Loader2, RotateCcw,
  Phone, Mail, User, Briefcase, Calendar,
  Zap, Clock, Users, TrendingUp, Wrench, Shield,
  ArrowRight, Download, FileText, Upload, X,
  AlertCircle, Star, Info,
} from "lucide-react";
import Link from "next/link";
import { useEstimatorStore } from "@/lib/estimator-store";
import { calculateEstimate } from "@/lib/pricing/calculator";
import { pricingConfig } from "@/lib/pricing/config";
import type { ProjectType, ComplexityLevel, TimelineLevel, DesignLevel, PlatformLevel } from "@/lib/pricing/types";
import type { EstimateResult } from "@/lib/pricing/types";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtINR(n: number) {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1)}Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)}L`;
  if (n >= 1_000)       return `₹${(n / 1_000).toFixed(1)}K`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
function fmtUSD(n: number) {
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
}

const PROJECT_TYPES = [
  { id: "website"    as ProjectType, emoji: "🌐", label: "Website",       desc: "Marketing site, landing page, portfolio", example: "e.g. company site, blog" },
  { id: "web-app"    as ProjectType, emoji: "💻", label: "Web App",       desc: "Browser-based interactive application",   example: "e.g. ecommerce, portal"  },
  { id: "mobile-app" as ProjectType, emoji: "📱", label: "Mobile App",    desc: "iOS and/or Android application",          example: "e.g. delivery, cab app"  },
  { id: "saas"       as ProjectType, emoji: "☁️", label: "SaaS Product",  desc: "Multi-tenant cloud software",             example: "e.g. CRM, billing tool"  },
  { id: "enterprise" as ProjectType, emoji: "🏢", label: "Enterprise",    desc: "Large-scale internal business system",    example: "e.g. ERP, HRMS"         },
  { id: "ai-ml"      as ProjectType, emoji: "🤖", label: "AI / ML",       desc: "AI-powered product or ML pipeline",       example: "e.g. chatbot, OCR tool"  },
];

const BREAKDOWN_LABELS: Record<string, string> = {
  development: "Development", design: "UI/UX Design",
  qa: "QA & Testing", projectManagement: "Project Mgmt",
  devOps: "DevOps", contingency: "Contingency",
};
const BREAKDOWN_COLORS: Record<string, string> = {
  development: "#8B5CF6", design: "#06B6D4", qa: "#10B981",
  projectManagement: "#F59E0B", devOps: "#EF4444", contingency: "#71717A",
};

const slide = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
  const labels = ["Project", "Features", "Timeline", "Contact", "Estimate"];
  return (
    <div className="flex items-center mb-10 w-full max-w-xl mx-auto">
      {labels.map((label, i) => {
        const step = i + 1;
        const done   = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                done   ? "bg-[#8B5CF6] text-white" :
                active ? "bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] text-[#8B5CF6]" :
                         "bg-white/5 border border-white/20 text-[#52525B]"
              )}>
                {done ? <Check size={13} /> : step}
              </div>
              <span className={cn(
                "text-[10px] font-medium hidden sm:block",
                active ? "text-[#FAFAFA]" : done ? "text-[#71717A]" : "text-[#3F3F46]"
              )}>{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div className={cn("h-px flex-1 mx-1 transition-colors duration-500 mb-5",
                done ? "bg-[#8B5CF6]" : "bg-white/10"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Live Price Bar (fixed bottom) ───────────────────────────────────────────
function LivePriceBar() {
  const store = useEstimatorStore();
  if (!store.projectType) return null;
  const est = calculateEstimate({
    projectType: store.projectType,
    selectedFeatures: store.selectedFeatures,
    designLevel: store.designLevel,
    complexity: store.complexity,
    timeline: store.timeline,
    platform: store.platform,
  });
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#18181B]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-2.5 flex items-center gap-5 shadow-2xl"
    >
      <div className="text-center">
        <p className="text-[9px] text-[#52525B] uppercase tracking-widest">Estimate</p>
        <p className="text-sm font-bold text-[#FAFAFA]">{fmtINR(est.priceINR.low)} – {fmtINR(est.priceINR.high)}</p>
      </div>
      <div className="w-px h-7 bg-white/10" />
      <div className="text-center">
        <p className="text-[9px] text-[#52525B] uppercase tracking-widest">USD</p>
        <p className="text-sm text-[#71717A] font-medium">{fmtUSD(est.priceUSD.low)} – {fmtUSD(est.priceUSD.high)}</p>
      </div>
      <div className="w-px h-7 bg-white/10" />
      <div className="text-center">
        <p className="text-[9px] text-[#52525B] uppercase tracking-widest">Timeline</p>
        <p className="text-sm text-[#71717A] font-medium">{est.timeline.weeksLow}–{est.timeline.weeksHigh} wks</p>
      </div>
    </motion.div>
  );
}

// ─── Step 1: AI + File + Project Type ────────────────────────────────────────
function Step1({ onSelect }: { onSelect: (t: ProjectType) => void }) {
  const store = useEstimatorStore();
  const [aiText, setAiText]       = useState(store.requirementText);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError]     = useState("");
  const [aiDone, setAiDone]       = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── File handling ──
  const processFile = useCallback(async (file: File) => {
    const MAX_TXT = 200_000; // 200 KB text
    const MAX_PDF =   5_000_000; // 5 MB PDF

    if (file.type === "text/plain") {
      if (file.size > MAX_TXT) { setAiError("Text file too large (max 200 KB)."); return; }
      const text = await file.text();
      setAiText(text.slice(0, 4000));
      store.setRequirementText(text.slice(0, 4000));
      store.setRequirementFileName(file.name);
    } else if (file.type === "application/pdf") {
      if (file.size > MAX_PDF) { setAiError("PDF too large (max 5 MB)."); return; }
      const buf    = await file.arrayBuffer();
      const b64    = btoa(String.fromCharCode(...new Uint8Array(buf)));
      store.setRequirementFileName(file.name);
      // Trigger AI directly with the file
      setIsLoading(true);
      setAiError("");
      try {
        const res  = await fetch("/api/ai-estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileData: b64, mimeType: "application/pdf" }),
        });
        const data = await res.json();
        if (!res.ok) { setAiError(data.error ?? "AI failed. Try manual steps."); return; }
        applyAiResult(data);
      } catch { setAiError("Network error. Please try again."); }
      finally   { setIsLoading(false); }
    } else {
      setAiError("Please upload a .txt or .pdf file.");
    }
  }, [store]);

  const applyAiResult = (data: { input: { projectType: ProjectType; selectedFeatures: string[]; complexity: ComplexityLevel; timeline: TimelineLevel; designLevel: DesignLevel; platform: PlatformLevel | null }; estimate: EstimateResult; aiInsights: string[]; summary: string }) => {
    store.setProjectType(data.input.projectType);
    store.setFeatures(data.input.selectedFeatures);
    store.setMultiplier("complexity",   data.input.complexity);
    store.setMultiplier("timeline",     data.input.timeline);
    store.setMultiplier("designLevel",  data.input.designLevel);
    if (data.input.platform) store.setMultiplier("platform", data.input.platform);
    store.setEstimateResult(data.estimate);
    store.setAiInsights(data.aiInsights ?? [], data.summary ?? "");
    setAiDone(true);
    store.goToStep(5);
  };

  const handleAI = async () => {
    if (!aiText.trim() || aiText.trim().length < 15) {
      setAiError("Please describe your project in at least 15 characters.");
      return;
    }
    setAiError("");
    setIsLoading(true);
    try {
      const res  = await fetch("/api/ai-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiText }),
      });
      const data = await res.json();
      if (!res.ok) { setAiError(data.error ?? "AI failed. Try manual steps."); return; }
      store.setRequirementText(aiText);
      applyAiResult(data);
    } catch { setAiError("Network error. Please try again."); }
    finally   { setIsLoading(false); }
  };

  return (
    <div className="space-y-8">
      {/* ── AI / File Section ── */}
      <div className="rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/8 to-transparent p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-[#8B5CF6]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#FAFAFA]">AI-Powered Estimation</h2>
            <p className="text-xs text-[#71717A]">Describe your project or upload a requirements document</p>
          </div>
        </div>

        {/* Text area */}
        <div className="relative mb-4">
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-32 text-[#FAFAFA] placeholder-[#3F3F46] resize-none outline-none text-sm leading-relaxed focus:border-[#8B5CF6]/50 transition-colors min-h-[90px]"
            placeholder="e.g. I need a food delivery app like Swiggy with real-time tracking, Razorpay payments, restaurant admin panel, and delivery partner app…"
            value={aiText}
            onChange={(e) => { setAiText(e.target.value); store.setRequirementText(e.target.value); }}
            onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleAI(); }}
          />
          <button
            onClick={handleAI}
            disabled={isLoading || !aiText.trim()}
            className={cn(
              "absolute bottom-3 right-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all",
              isLoading || !aiText.trim()
                ? "bg-white/5 text-[#52525B] cursor-not-allowed"
                : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
            )}
          >
            {isLoading ? <><Loader2 size={12} className="animate-spin" />Analysing…</> : <><Sparkles size={12} />Estimate</>}
          </button>
        </div>

        {/* File upload area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault(); setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) processFile(file);
          }}
          onClick={() => fileRef.current?.click()}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-all",
            dragOver
              ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
              : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
          )}
        >
          <Upload size={16} className="text-[#71717A] shrink-0" />
          <div className="flex-1 min-w-0">
            {store.requirementFileName ? (
              <p className="text-xs text-[#FAFAFA] font-medium truncate flex items-center gap-2">
                <FileText size={12} className="text-[#8B5CF6]" />
                {store.requirementFileName}
                <span className="text-[#10B981] ml-1">✓ Uploaded</span>
              </p>
            ) : (
              <p className="text-xs text-[#71717A]">
                <span className="text-[#A1A1AA] font-medium">Upload requirements</span> — drag & drop or click
              </p>
            )}
            <p className="text-[10px] text-[#52525B] mt-0.5">Accepts .pdf or .txt · Max 5 MB</p>
          </div>
          {store.requirementFileName && (
            <button
              onClick={(e) => { e.stopPropagation(); store.setRequirementFileName(""); }}
              className="p-1 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </div>
        <input
          ref={fileRef} type="file" accept=".txt,.pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
        />

        {aiError && (
          <div className="mt-3 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle size={12} /> {aiError}
          </div>
        )}
        {aiDone && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2"
          >
            <Check size={12} /> AI analysis complete — jumping to your estimate…
          </motion.div>
        )}
        <p className="mt-3 text-[10px] text-[#3F3F46]">Powered by Google Gemini AI · ⌘+Enter to submit</p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-[#09090B] text-[#3F3F46] text-[10px] uppercase tracking-widest">
            Or build manually step by step
          </span>
        </div>
      </div>

      {/* Manual project type grid */}
      <div>
        <h2 className="text-lg font-bold text-[#FAFAFA] mb-1">What are you building?</h2>
        <p className="text-xs text-[#71717A] mb-5">Select your project type to begin</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PROJECT_TYPES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => { store.setProjectType(pt.id); onSelect(pt.id); }}
              className={cn(
                "group relative p-4 rounded-xl border text-left transition-all hover:scale-[1.02]",
                store.projectType === pt.id
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              )}
            >
              <div className="text-2xl mb-2">{pt.emoji}</div>
              <p className="text-sm font-bold text-[#FAFAFA]">{pt.label}</p>
              <p className="text-[11px] text-[#71717A] mt-0.5 leading-snug">{pt.desc}</p>
              <p className="text-[10px] text-[#3F3F46] mt-1.5 italic">{pt.example}</p>
              <ChevronRight size={13} className="absolute top-3 right-3 text-[#3F3F46] group-hover:text-[#71717A] transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Features ─────────────────────────────────────────────────────────
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useEstimatorStore();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const applicable = store.projectType
    ? pricingConfig.features.filter(f => f.applicableTo.includes(store.projectType!))
    : [];
  const categories = Array.from(new Set(applicable.map(f => f.category)));

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) setActiveCategory(categories[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.join(",")]);

  const displayed = activeCategory
    ? applicable.filter(f => f.category === activeCategory)
    : applicable;

  const catHasSelected = (cat: string) =>
    applicable.filter(f => f.category === cat).some(f => store.selectedFeatures.includes(f.id));

  const selObjs   = applicable.filter(f => store.selectedFeatures.includes(f.id));
  const addedINR  = selObjs.reduce((s, f) => s + ((f.price.low + f.price.high) / 2) * 83.5, 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#FAFAFA] mb-1">Select Features</h2>
        <p className="text-xs text-[#71717A]">
          Choose what you need for your{" "}
          <span className="text-[#FAFAFA] font-medium">{PROJECT_TYPES.find(p => p.id === store.projectType)?.label}</span>.
          Each feature adds to the estimate.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
              activeCategory === cat
                ? "bg-[#8B5CF6] text-white"
                : "bg-white/5 border border-white/10 text-[#A1A1AA] hover:border-white/20"
            )}>
            {catHasSelected(cat) && <Check size={10} />}
            {cat}
          </button>
        ))}
        <button onClick={() => setActiveCategory(null)}
          className={cn(
            "shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
            activeCategory === null
              ? "bg-[#8B5CF6] text-white"
              : "bg-white/5 border border-white/10 text-[#A1A1AA] hover:border-white/20"
          )}>
          All ({applicable.length})
        </button>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <AnimatePresence mode="popLayout">
          {displayed.map((feature) => {
            const sel = store.selectedFeatures.includes(feature.id);
            return (
              <motion.button
                key={feature.id} layout
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.12 }}
                onClick={() => store.toggleFeature(feature.id)}
                className={cn(
                  "flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all",
                  sel ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
                )}
              >
                <div className={cn(
                  "mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
                  sel ? "bg-[#8B5CF6] border-[#8B5CF6]" : "border-white/20"
                )}>
                  {sel && <Check size={9} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-[#FAFAFA]">{feature.label}</span>
                    {feature.popular && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 leading-none">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#71717A] mt-0.5 leading-snug">{feature.description}</p>
                  <p className="text-[10px] text-[#52525B] mt-1">
                    +{fmtINR(feature.price.low * 83.5)} – {fmtINR(feature.price.high * 83.5)}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Selection tally */}
      {selObjs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-4 py-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl text-sm"
        >
          <span className="text-[#A1A1AA]">
            <span className="text-[#FAFAFA] font-bold">{selObjs.length}</span> feature{selObjs.length !== 1 ? "s" : ""} selected
          </span>
          <span className="text-[#8B5CF6] font-semibold">+{fmtINR(addedINR)} added</span>
        </motion.div>
      )}

      <div className="flex gap-3 pt-1">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm">
          <ChevronLeft size={15} /> Back
        </button>
        <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors">
          Continue <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Timeline & Preferences ──────────────────────────────────────────
function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useEstimatorStore();

  const optionGrid = (
    label: string,
    options: { id: string; label: string; description?: string }[],
    value: string | null,
    onPick: (id: string) => void,
    cols = 3
  ) => (
    <div>
      <h3 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest mb-3">{label}</h3>
      <div className={cn("grid gap-2.5", `grid-cols-${cols}`)}>
        {options.map(opt => (
          <button key={opt.id} onClick={() => onPick(opt.id)}
            className={cn(
              "p-3.5 rounded-xl border text-left transition-all",
              value === opt.id
                ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            )}>
            <p className="text-sm font-semibold text-[#FAFAFA]">{opt.label}</p>
            {opt.description && <p className="text-[11px] text-[#71717A] mt-1 leading-snug">{opt.description}</p>}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-[#FAFAFA] mb-1">Timeline & Preferences</h2>
        <p className="text-xs text-[#71717A]">These multipliers are applied to your base estimate.</p>
      </div>

      {optionGrid("Complexity", pricingConfig.multipliers.complexity.options, store.complexity,
        id => store.setMultiplier("complexity", id), 3)}

      {optionGrid("Delivery Speed", pricingConfig.multipliers.timeline.options, store.timeline,
        id => store.setMultiplier("timeline", id), 2)}

      {optionGrid("Design Level", pricingConfig.multipliers.design.options, store.designLevel,
        id => store.setMultiplier("designLevel", id), 3)}

      {store.projectType === "mobile-app" &&
        optionGrid("Platform", pricingConfig.multipliers.platform.options,
          store.platform ?? "cross-platform",
          id => store.setMultiplier("platform", id), 3)}

      <div className="flex gap-3 pt-1">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm">
          <ChevronLeft size={15} /> Back
        </button>
        <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors">
          Continue <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Contact Info ─────────────────────────────────────────────────────
function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useEstimatorStore();
  const { contactInfo } = store;

  const field = (key: string, label: string, placeholder: string, icon: React.ReactNode, type = "text") => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-semibold text-[#71717A] uppercase tracking-widest flex items-center gap-1.5">
        {icon} {label}
      </label>
      <input
        type={type} placeholder={placeholder}
        value={(contactInfo as Record<string, string>)[key] ?? ""}
        onChange={e => store.setContactField(key, e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#3F3F46] outline-none focus:border-[#8B5CF6]/50 transition-colors"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#FAFAFA] mb-1">Your Details <span className="text-[#52525B] font-normal text-sm">(optional)</span></h2>
        <p className="text-xs text-[#71717A]">
          Provide your details to receive a personalised PDF quotation via email. You can also skip this step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field("name",    "Full Name",    "Rahul Sharma",       <User     size={11} />)}
        {field("email",   "Email",        "rahul@company.com",  <Mail     size={11} />, "email")}
        {field("phone",   "Phone",        "+91 98765 43210",    <Phone    size={11} />, "tel")}
        {field("company", "Company",      "Acme Technologies",  <Briefcase size={11} />)}
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-semibold text-[#71717A] uppercase tracking-widest flex items-center gap-1.5">
          <Calendar size={11} /> How did you find us?
        </label>
        <select
          value={contactInfo.source}
          onChange={e => store.setContactField("source", e.target.value)}
          className="w-full bg-[#18181B] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#FAFAFA] outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none"
        >
          {["Google Search","Social Media","Referral","LinkedIn","Direct / Type-in","Other"].map(s => (
            <option key={s} value={s} className="bg-[#18181B]">{s}</option>
          ))}
        </select>
      </div>

      {/* DPDP Consent */}
      <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
        <p className="text-[10px] font-semibold text-[#52525B] uppercase tracking-widest flex items-center gap-1.5">
          <Shield size={11} /> Privacy Consent (DPDP Act 2023)
        </p>
        {[
          { key: "functional" as const, label: "I agree that Teklin may store and use my details to respond to this estimate request." },
          { key: "marketing"  as const, label: "I'd like to receive occasional updates and project insights from Teklin (optional)." },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => store.setConsent(key, !store[key === "functional" ? "consentFunctional" : "consentMarketing"])}
              className={cn(
                "mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer",
                store[key === "functional" ? "consentFunctional" : "consentMarketing"]
                  ? "bg-[#8B5CF6] border-[#8B5CF6]"
                  : "border-white/20"
              )}
            >
              {store[key === "functional" ? "consentFunctional" : "consentMarketing"] && <Check size={9} className="text-white" />}
            </div>
            <span className="text-[11px] text-[#71717A] leading-relaxed">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm">
          <ChevronLeft size={15} /> Back
        </button>
        <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors">
          Get My Estimate <Sparkles size={14} />
        </button>
      </div>
      <p className="text-center text-[11px] text-[#3F3F46]">
        Or{" "}
        <button onClick={onNext} className="text-[#71717A] hover:text-[#A1A1AA] underline transition-colors">
          skip and view estimate
        </button>{" "}
        without contact details
      </p>
    </div>
  );
}

// ─── Step 5: Results + PDF Download ──────────────────────────────────────────
function Step5({ onReset }: { onReset: () => void }) {
  const store = useEstimatorStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadErr,   setDownloadErr]   = useState("");
  const [isRefining,    setIsRefining]    = useState(false);

  const estimate: EstimateResult | null = store.projectType
    ? calculateEstimate({
        projectType:      store.projectType,
        selectedFeatures: store.selectedFeatures,
        designLevel:      store.designLevel,
        complexity:       store.complexity,
        timeline:         store.timeline,
        platform:         store.platform,
      })
    : store.estimateResult;

  const selFeats = pricingConfig.features.filter(f => store.selectedFeatures.includes(f.id));
  const bkTotal  = estimate ? Object.values(estimate.breakdown).reduce((a, b) => a + b, 0) : 0;
  const ptInfo   = PROJECT_TYPES.find(p => p.id === estimate?.projectType);

  // ── PDF Download ──
  const handleDownload = async () => {
    if (!estimate) return;
    setDownloadErr("");
    setIsDownloading(true);
    try {
      const res = await fetch("/api/estimate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estimate,
          contactInfo:     store.contactInfo,
          requirementText: store.requirementText,
          aiInsights:      store.aiInsights,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        setDownloadErr(err.error ?? "Failed to generate PDF.");
        return;
      }
      const blob     = await res.blob();
      const url      = URL.createObjectURL(blob);
      const anchor   = document.createElement("a");
      const filename = res.headers.get("Content-Disposition")
        ?.split("filename=")[1]?.replace(/"/g, "")
        ?? "Teklin-Quotation.pdf";
      anchor.href     = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setDownloadErr("Network error — please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // ── Refine with AI ──
  const handleAIRefine = async () => {
    if (!store.projectType) return;
    setIsRefining(true);
    try {
      const ptLabel    = ptInfo?.label ?? store.projectType;
      const featLabels = selFeats.map(f => f.label).join(", ");
      const res  = await fetch("/api/ai-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${ptLabel} with features: ${featLabels || "basic"}. Complexity: ${store.complexity}. Timeline: ${store.timeline}.`,
        }),
      });
      const data = await res.json();
      if (res.ok) store.setAiInsights(data.aiInsights ?? [], data.summary ?? "");
    } catch { /* silent */ }
    finally { setIsRefining(false); }
  };

  if (!estimate) return (
    <div className="text-center py-20">
      <p className="text-[#71717A] mb-4 text-sm">No estimate found. Please complete the previous steps.</p>
      <button onClick={onReset} className="px-5 py-2.5 bg-[#8B5CF6] text-white text-sm rounded-xl hover:bg-[#7C3AED] transition-colors">
        Start Over
      </button>
    </div>
  );

  return (
    <div className="space-y-5 pb-20">
      {/* ── Header ── */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Check size={12} /> Estimate Ready
        </div>
        <h2 className="text-2xl font-bold text-[#FAFAFA]">{ptInfo?.emoji} {ptInfo?.label ?? "Project"} Quotation</h2>
        {store.aiSummary && (
          <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto">{store.aiSummary}</p>
        )}
      </div>

      {/* ── Primary Price Card ── */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 to-transparent p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="text-center">
            <p className="text-[10px] text-[#71717A] uppercase tracking-widest mb-2">Total Estimate (INR)</p>
            <p className="text-4xl font-extrabold font-mono bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {fmtINR(estimate.priceINR.low)}
            </p>
            <p className="text-xl font-semibold text-[#71717A] mt-1">– {fmtINR(estimate.priceINR.high)}</p>
            <p className="text-[11px] text-[#52525B] mt-1.5">Midpoint: {fmtINR(estimate.priceINR.midpoint)}</p>
          </div>
          <div className="text-center sm:border-l border-t sm:border-t-0 border-white/10 sm:pl-5 pt-4 sm:pt-0">
            <p className="text-[10px] text-[#71717A] uppercase tracking-widest mb-2">USD Equivalent</p>
            <p className="text-3xl font-bold font-mono text-[#FAFAFA]">{fmtUSD(estimate.priceUSD.low)}</p>
            <p className="text-xl font-semibold text-[#71717A] mt-1">– {fmtUSD(estimate.priceUSD.high)}</p>
            <p className="text-[11px] text-[#52525B] mt-1.5">At ₹83.5/USD</p>
          </div>
        </div>
      </div>

      {/* ── Meta Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <Clock size={14} />,    label: "Timeline",   value: `${estimate.timeline.weeksLow}–${estimate.timeline.weeksHigh} wks`, color: "#8B5CF6" },
          { icon: <Users size={14} />,    label: "Team Size",  value: `${estimate.teamSize} people`,                                       color: "#06B6D4" },
          { icon: <Zap size={14} />,      label: "Total Hours",value: `~${estimate.totalHours} hrs`,                                       color: "#10B981" },
          { icon: <Wrench size={14} />,   label: "Annual AMC", value: `${fmtINR(estimate.maintenance.low)}/yr`,                            color: "#F59E0B" },
        ].map(stat => (
          <div key={stat.label} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="flex justify-center mb-1.5" style={{ color: stat.color }}>{stat.icon}</div>
            <p className="text-sm font-bold text-[#FAFAFA]">{stat.value}</p>
            <p className="text-[11px] text-[#71717A] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Cost Breakdown ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h3 className="text-xs font-bold text-[#FAFAFA] mb-4 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={13} className="text-[#8B5CF6]" /> Cost Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(estimate.breakdown).map(([key, value]) => {
            const pct   = bkTotal > 0 ? (value / bkTotal) * 100 : 0;
            const color = BREAKDOWN_COLORS[key] ?? "#71717A";
            return (
              <div key={key}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#A1A1AA]">{BREAKDOWN_LABELS[key] ?? key}</span>
                  <span className="text-[#FAFAFA] font-medium">
                    {fmtINR(value)} <span className="text-[#52525B]">({pct.toFixed(0)}%)</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="h-full rounded-full" style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Selected Features ── */}
      {selFeats.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-xs font-bold text-[#FAFAFA] mb-3 uppercase tracking-widest flex items-center gap-2">
            <Star size={13} className="text-[#8B5CF6]" /> Included Features ({selFeats.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selFeats.map(f => (
              <span key={f.id} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#A1A1AA]">
                {f.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Config Summary ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h3 className="text-xs font-bold text-[#FAFAFA] mb-3 uppercase tracking-widest flex items-center gap-2">
          <Info size={13} className="text-[#8B5CF6]" /> Estimate Configuration
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Project Type",  value: ptInfo?.label ?? estimate.projectType },
            { label: "Complexity",    value: estimate.multipliers.complexity },
            { label: "Timeline",      value: estimate.multipliers.timeline },
            { label: "Design Level",  value: estimate.multipliers.designLevel },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[10px] text-[#52525B] uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-[#FAFAFA] capitalize mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#3F3F46] mt-3 flex items-center gap-1.5">
          <Info size={9} />
          Pricing v{estimate.pricingVersion} · Indicative only. Confirmed after scoping call.
        </p>
      </div>

      {/* ── AI Insights ── */}
      {store.aiInsights.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/5 p-5"
        >
          <h3 className="text-xs font-bold text-[#FAFAFA] mb-3 flex items-center gap-2">
            <Sparkles size={13} className="text-[#8B5CF6]" /> AI Recommendations
          </h3>
          <ul className="space-y-2">
            {store.aiInsights.map((ins, i) => (
              <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-0.5 shrink-0">→</span> {ins}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* ── Payment Terms ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h3 className="text-xs font-bold text-[#FAFAFA] mb-4 uppercase tracking-widest">Standard Payment Terms</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { pct: "40%", label: "Advance",   desc: "Before development starts" },
            { pct: "30%", label: "Milestone", desc: "After core features delivered" },
            { pct: "30%", label: "Delivery",  desc: "On final handover" },
          ].map(term => (
            <div key={term.pct} className="text-center p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              <p className="text-lg font-extrabold text-[#8B5CF6]">{term.pct}</p>
              <p className="text-xs font-semibold text-[#FAFAFA] mt-0.5">{term.label}</p>
              <p className="text-[10px] text-[#71717A] mt-1 leading-snug">{term.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {isDownloading
            ? <><Loader2 size={15} className="animate-spin" /> Generating PDF…</>
            : <><Download size={15} /> Download PDF Quotation</>
          }
        </button>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm transition-colors"
        >
          <Phone size={15} /> Book a Free Scoping Call <ArrowRight size={14} />
        </Link>
      </div>

      {downloadErr && (
        <p className="text-xs text-red-400 flex items-center gap-2 -mt-1">
          <AlertCircle size={12} /> {downloadErr}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleAIRefine} disabled={isRefining}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 text-xs font-medium transition-colors disabled:opacity-50"
        >
          {isRefining
            ? <><Loader2 size={12} className="animate-spin" />Getting insights…</>
            : <><Sparkles size={12} />Get AI Insights</>
          }
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] text-xs transition-colors"
        >
          <RotateCcw size={12} /> Start Over
        </button>
      </div>

      <p className="text-center text-[10px] text-[#3F3F46] pt-2">
        Estimates are indicative. Actual costs confirmed after scoping.
        Hosting, domain, and third-party API costs (Razorpay, SMS, etc.) are separate.
        <br />© {new Date().getFullYear()} Teklin ·{" "}
        <a href="/privacy" className="hover:text-[#71717A] transition-colors">Privacy Policy</a>
      </p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function EstimatePage() {
  const [mounted, setMounted] = useState(false);
  const store = useEstimatorStore();
  const { currentStep, direction } = store;

  useEffect(() => { setMounted(true); }, []);

  // Auto-calculate and persist when reaching step 5
  useEffect(() => {
    if (mounted && currentStep === 5 && store.projectType) {
      const result = calculateEstimate({
        projectType:      store.projectType,
        selectedFeatures: store.selectedFeatures,
        designLevel:      store.designLevel,
        complexity:       store.complexity,
        timeline:         store.timeline,
        platform:         store.platform,
      });
      store.setEstimateResult(result);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, mounted]);

  if (!mounted) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={30} className="animate-spin text-[#8B5CF6]" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-[10px] font-bold uppercase tracking-widest mb-5">
          <Sparkles size={11} /> Free Budget Estimator · AI-Powered
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FAFAFA] tracking-tight mb-3">
          How much will your project cost?
        </h1>
        <p className="text-[#A1A1AA] text-sm max-w-md mx-auto leading-relaxed">
          Transparent Indian-market pricing. Get a detailed estimate + downloadable PDF quotation in under 2 minutes.
        </p>
      </div>

      <StepBar current={currentStep} />

      {/* Step Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep} custom={direction}
            variants={slide} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentStep === 1 && (
              <Step1 onSelect={(t) => { store.setProjectType(t); store.nextStep(); }} />
            )}
            {currentStep === 2 && <Step2 onNext={store.nextStep} onBack={store.prevStep} />}
            {currentStep === 3 && <Step3 onNext={store.nextStep} onBack={store.prevStep} />}
            {currentStep === 4 && <Step4 onNext={store.nextStep} onBack={store.prevStep} />}
            {currentStep === 5 && <Step5 onReset={store.reset} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live price bar visible on steps 2–4 */}
      {currentStep >= 2 && currentStep <= 4 && <LivePriceBar />}
    </div>
  );
}
