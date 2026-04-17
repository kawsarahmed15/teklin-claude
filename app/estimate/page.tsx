"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Globe, AppWindow, Smartphone, Layers, Building2, Brain,
  ChevronRight, ChevronLeft, Check, Info, Loader2, RotateCcw,
  Phone, Mail, User, Briefcase, Calendar, Zap, Clock, Users,
  TrendingUp, Wrench, Shield, ArrowRight, Download, ExternalLink,
  Star, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useEstimatorStore } from "@/lib/estimator-store";
import { calculateEstimate } from "@/lib/pricing/calculator";
import { pricingConfig } from "@/lib/pricing/config";
import type { ProjectType, ComplexityLevel, TimelineLevel, DesignLevel, PlatformLevel } from "@/lib/pricing/types";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AiResult {
  input: {
    projectType: ProjectType;
    selectedFeatures: string[];
    complexity: ComplexityLevel;
    timeline: TimelineLevel;
    designLevel: DesignLevel;
    platform: PlatformLevel | null;
  };
  estimate: ReturnType<typeof calculateEstimate>;
  aiInsights: string[];
  summary: string;
}

// ─── Project type definitions ─────────────────────────────────────────────────

const PROJECT_TYPES: {
  id: ProjectType;
  label: string;
  emoji: string;
  description: string;
  example: string;
  color: string;
}[] = [
  {
    id: "website",
    label: "Website",
    emoji: "🌐",
    description: "Marketing sites, landing pages, portfolios",
    example: "Like: teklin.in, startup landing",
    color: "#3B82F6",
  },
  {
    id: "web-app",
    label: "Web App",
    emoji: "💻",
    description: "Interactive browser-based applications",
    example: "Like: dashboards, tools, portals",
    color: "#8B5CF6",
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    emoji: "📱",
    description: "iOS and/or Android applications",
    example: "Like: Swiggy, fitness tracker",
    color: "#06B6D4",
  },
  {
    id: "saas",
    label: "SaaS Product",
    emoji: "☁️",
    description: "Multi-tenant cloud software products",
    example: "Like: Notion, Slack, CRM tools",
    color: "#10B981",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    emoji: "🏢",
    description: "Large-scale internal business systems",
    example: "Like: ERP, HRMS, custom workflows",
    color: "#F59E0B",
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    emoji: "🤖",
    description: "AI-powered products and ML pipelines",
    example: "Like: LLM chatbot, recommendation engine",
    color: "#EF4444",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatINR(n: number) {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1)}Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatUSD(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

const BREAKDOWN_COLORS: Record<string, string> = {
  development: "#8B5CF6",
  design: "#06B6D4",
  qa: "#10B981",
  projectManagement: "#F59E0B",
  devOps: "#EF4444",
  contingency: "#71717A",
};

const BREAKDOWN_LABELS: Record<string, string> = {
  development: "Development",
  design: "UI/UX Design",
  qa: "QA & Testing",
  projectManagement: "Project Mgmt",
  devOps: "DevOps / Infra",
  contingency: "Contingency",
};

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ["Project Type", "Features", "Timeline", "Contact", "Your Estimate"];
  return (
    <div className="flex items-center gap-0 mb-10 w-full max-w-2xl mx-auto">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0",
                  done
                    ? "bg-[#8B5CF6] text-white"
                    : active
                    ? "bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] text-[#8B5CF6]"
                    : "bg-white/5 border border-white/20 text-[#71717A]"
                )}
              >
                {done ? <Check size={14} /> : step}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium hidden sm:block whitespace-nowrap",
                  active ? "text-[#FAFAFA]" : done ? "text-[#A1A1AA]" : "text-[#52525B]"
                )}
              >
                {labels[i]}
              </span>
            </div>
            {i < total - 1 && (
              <div
                className={cn(
                  "h-px flex-1 mx-1 transition-colors duration-300 mb-5",
                  done ? "bg-[#8B5CF6]" : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Price Summary Bar (floating) ─────────────────────────────────────────────

function PriceSummaryBar({ projectType, features }: { projectType: ProjectType | null; features: string[] }) {
  const store = useEstimatorStore();
  if (!projectType) return null;

  const estimate = calculateEstimate({
    projectType,
    selectedFeatures: features,
    designLevel: store.designLevel,
    complexity: store.complexity,
    timeline: store.timeline,
    platform: store.platform,
  });

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#18181B]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-6 shadow-2xl"
    >
      <div className="text-center">
        <p className="text-[10px] text-[#71717A] uppercase tracking-wide">Estimated Range</p>
        <p className="text-sm font-bold text-[#FAFAFA]">
          {formatINR(estimate.priceINR.low)} – {formatINR(estimate.priceINR.high)}
        </p>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <p className="text-[10px] text-[#71717A] uppercase tracking-wide">USD</p>
        <p className="text-sm font-bold text-[#A1A1AA]">
          {formatUSD(estimate.priceUSD.low)} – {formatUSD(estimate.priceUSD.high)}
        </p>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <p className="text-[10px] text-[#71717A] uppercase tracking-wide">Timeline</p>
        <p className="text-sm font-bold text-[#A1A1AA]">{estimate.timeline.weeksLow}–{estimate.timeline.weeksHigh} wks</p>
      </div>
    </motion.div>
  );
}

// ─── Step 1: Project Type + AI ────────────────────────────────────────────────

function Step1({
  onNext,
}: {
  onNext: (type: ProjectType) => void;
}) {
  const store = useEstimatorStore();
  const [aiText, setAiText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResult, setAiResult] = useState<AiResult | null>(null);

  const handleAI = async () => {
    if (!aiText.trim() || aiText.trim().length < 10) {
      setAiError("Please describe your project in at least 10 characters.");
      return;
    }
    setAiError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error ?? "AI failed. Please try the manual steps.");
        return;
      }
      // Apply to store
      store.setProjectType(data.input.projectType);
      store.setFeatures(data.input.selectedFeatures);
      store.setMultiplier("complexity", data.input.complexity);
      store.setMultiplier("timeline", data.input.timeline);
      store.setMultiplier("designLevel", data.input.designLevel);
      if (data.input.platform) store.setMultiplier("platform", data.input.platform);
      store.setEstimateResult(data.estimate);
      setAiResult(data);
      // Jump to results
      store.goToStep(5);
    } catch {
      setAiError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Section */}
      <div className="rounded-2xl border border-[#8B5CF6]/40 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
            <Sparkles size={20} className="text-[#8B5CF6]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#FAFAFA]">AI-Powered Estimation</h2>
            <p className="text-sm text-[#A1A1AA]">Describe what you want to build — our AI does the rest</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-28 text-[#FAFAFA] placeholder-[#52525B] resize-none outline-none text-sm leading-relaxed focus:border-[#8B5CF6]/50 transition-colors min-h-[90px]"
            placeholder="e.g. I want to build a cross-platform mobile app for food delivery with real-time GPS tracking, Stripe payments, and a restaurant admin panel..."
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) handleAI();
            }}
          />
          <button
            onClick={handleAI}
            disabled={isLoading || !aiText.trim()}
            className={cn(
              "absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              isLoading || !aiText.trim()
                ? "bg-white/5 text-[#52525B] cursor-not-allowed"
                : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Estimate
              </>
            )}
          </button>
        </div>

        {aiError && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={14} />
            {aiError}
          </div>
        )}

        {aiResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2">
              <Check size={14} />
              AI Analysis Complete
            </div>
            <p className="text-sm text-[#A1A1AA]">{aiResult.summary}</p>
            {aiResult.aiInsights?.length > 0 && (
              <ul className="mt-3 space-y-1">
                {aiResult.aiInsights.map((insight, i) => (
                  <li key={i} className="text-xs text-[#71717A] flex items-start gap-2">
                    <span className="text-[#8B5CF6] mt-0.5">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        <p className="mt-3 text-xs text-[#52525B]">
          Powered by Google Gemini AI · Press ⌘+Enter to submit
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-[#09090B] text-[#52525B] text-xs uppercase tracking-widest">
            Or select manually
          </span>
        </div>
      </div>

      {/* Manual project type selection */}
      <div>
        <h2 className="text-xl font-bold text-[#FAFAFA] mb-2">What are you building?</h2>
        <p className="text-sm text-[#A1A1AA] mb-6">Select the type of project that best describes your idea</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PROJECT_TYPES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => {
                store.setProjectType(pt.id);
                onNext(pt.id);
              }}
              className={cn(
                "group relative p-5 rounded-2xl border text-left transition-all duration-200 hover:scale-[1.02]",
                store.projectType === pt.id
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
              )}
            >
              <div className="text-3xl mb-3">{pt.emoji}</div>
              <h3 className="text-sm font-bold text-[#FAFAFA] mb-1">{pt.label}</h3>
              <p className="text-xs text-[#71717A] leading-snug">{pt.description}</p>
              <p className="text-[10px] text-[#52525B] mt-2 italic">{pt.example}</p>
              <ChevronRight
                size={14}
                className="absolute top-4 right-4 text-[#52525B] group-hover:text-[#A1A1AA] transition-colors"
              />
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

  const applicableFeatures = store.projectType
    ? pricingConfig.features.filter((f) => f.applicableTo.includes(store.projectType!))
    : [];

  const categories = Array.from(new Set(applicableFeatures.map((f) => f.category)));

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories.join(",")]);

  const displayedFeatures = activeCategory
    ? applicableFeatures.filter((f) => f.category === activeCategory)
    : applicableFeatures;

  const categoryDone = (cat: string) =>
    applicableFeatures
      .filter((f) => f.category === cat)
      .some((f) => store.selectedFeatures.includes(f.id));

  const selectedCount = store.selectedFeatures.length;
  const selectedFeaturesList = applicableFeatures.filter((f) => store.selectedFeatures.includes(f.id));
  const addedCost = selectedFeaturesList.reduce((sum, f) => sum + (f.price.low + f.price.high) / 2, 0);

  if (!store.projectType) {
    return (
      <div className="text-center py-20 text-[#71717A]">
        <p>Please go back and select a project type first.</p>
        <button onClick={onBack} className="mt-4 btn-outline text-sm">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#FAFAFA] mb-1">Select Features</h2>
        <p className="text-[#A1A1AA] text-sm">
          Choose the features you need for your{" "}
          <span className="text-[#FAFAFA] font-medium">
            {PROJECT_TYPES.find((p) => p.id === store.projectType)?.label}
          </span>
          . You can change these later.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5",
              activeCategory === cat
                ? "bg-[#8B5CF6] text-white"
                : "bg-white/5 border border-white/10 text-[#A1A1AA] hover:border-white/20"
            )}
          >
            {categoryDone(cat) && <Check size={10} />}
            {cat}
          </button>
        ))}
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all",
            activeCategory === null
              ? "bg-[#8B5CF6] text-white"
              : "bg-white/5 border border-white/10 text-[#A1A1AA] hover:border-white/20"
          )}
        >
          All ({applicableFeatures.length})
        </button>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {displayedFeatures.map((feature) => {
            const selected = store.selectedFeatures.includes(feature.id);
            return (
              <motion.label
                key={feature.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                  selected
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                    selected
                      ? "bg-[#8B5CF6] border-[#8B5CF6]"
                      : "border-white/20 bg-transparent"
                  )}
                  onClick={() => store.toggleFeature(feature.id)}
                >
                  {selected && <Check size={11} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[#FAFAFA]">{feature.label}</span>
                    {feature.popular && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#71717A] mt-0.5">{feature.description}</p>
                  <p className="text-xs text-[#52525B] mt-1">
                    +{formatINR(feature.price.low * 83.5)} – {formatINR(feature.price.high * 83.5)}
                  </p>
                </div>
              </motion.label>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Selection summary */}
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
            <Check size={14} className="text-[#8B5CF6]" />
            <span>
              <strong className="text-[#FAFAFA]">{selectedCount} feature{selectedCount !== 1 ? "s" : ""}</strong> selected
            </span>
          </div>
          <span className="text-sm font-semibold text-[#8B5CF6]">
            +{formatINR(addedCost * 83.5)} added
          </span>
        </motion.div>
      )}

      {/* Nav */}
      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm font-medium">
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors"
        >
          Continue
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Timeline & Preferences ──────────────────────────────────────────

function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useEstimatorStore();

  const section = (
    label: string,
    options: { id: string; label: string; description?: string }[],
    activeId: string | null,
    onSelect: (id: string) => void,
    cols = 3
  ) => (
    <div>
      <h3 className="text-sm font-semibold text-[#FAFAFA] mb-3 uppercase tracking-wide">{label}</h3>
      <div className={`grid grid-cols-${cols} gap-3`}>
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              "p-4 rounded-xl border text-left transition-all",
              activeId === opt.id
                ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
            )}
          >
            <p className="text-sm font-semibold text-[#FAFAFA]">{opt.label}</p>
            {opt.description && <p className="text-xs text-[#71717A] mt-1 leading-snug">{opt.description}</p>}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#FAFAFA] mb-1">Timeline & Preferences</h2>
        <p className="text-[#A1A1AA] text-sm">
          These settings affect the final price. Rush timelines and higher complexity cost more.
        </p>
      </div>

      {section(
        "Complexity",
        pricingConfig.multipliers.complexity.options,
        store.complexity,
        (id) => store.setMultiplier("complexity", id),
        3
      )}

      {section(
        "Timeline",
        pricingConfig.multipliers.timeline.options,
        store.timeline,
        (id) => store.setMultiplier("timeline", id),
        2
      )}

      {section(
        "Design Level",
        pricingConfig.multipliers.design.options,
        store.designLevel,
        (id) => store.setMultiplier("designLevel", id),
        3
      )}

      {store.projectType === "mobile-app" &&
        section(
          "Platform",
          pricingConfig.multipliers.platform.options,
          store.platform ?? "cross-platform",
          (id) => store.setMultiplier("platform", id),
          3
        )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm font-medium">
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors"
        >
          Continue
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Contact Info ─────────────────────────────────────────────────────

function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useEstimatorStore();
  const info = store.contactInfo;

  const field = (
    key: string,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    type = "text",
    required = false
  ) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wide flex items-center gap-1.5">
        {icon}
        {label}
        {required && <span className="text-[#8B5CF6]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={(info as Record<string, string>)[key] ?? ""}
        onChange={(e) => store.setContactField(key, e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] outline-none focus:border-[#8B5CF6]/50 transition-colors"
      />
    </div>
  );

  const canContinue = Boolean(info.name?.trim() && info.email?.trim());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#FAFAFA] mb-1">Your Details <span className="text-[#71717A] font-normal text-base">(Optional)</span></h2>
        <p className="text-[#A1A1AA] text-sm">
          Leave your contact info to receive a detailed PDF estimate. You can also skip this step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field("name", "Full Name", "Rahul Sharma", <User size={12} />, "text", true)}
        {field("email", "Email Address", "rahul@company.com", <Mail size={12} />, "email", true)}
        {field("phone", "Phone Number", "+91 98765 43210", <Phone size={12} />, "tel")}
        {field("company", "Company / Startup", "Acme Technologies", <Briefcase size={12} />)}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wide flex items-center gap-1.5">
          <Calendar size={12} />
          How did you find us?
        </label>
        <select
          value={info.source}
          onChange={(e) => store.setContactField("source", e.target.value)}
          className="w-full bg-[#18181B] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#FAFAFA] outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none"
        >
          {["Google Search", "Social Media", "Referral", "LinkedIn", "Direct / Type-in", "Other"].map((s) => (
            <option key={s} value={s} className="bg-[#18181B]">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* DPDP Consent */}
      <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-3">
        <p className="text-xs font-semibold text-[#71717A] uppercase tracking-wide flex items-center gap-2">
          <Shield size={12} />
          Privacy & Consent (DPDP Act 2023)
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            className={cn(
              "mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
              store.consentFunctional
                ? "bg-[#8B5CF6] border-[#8B5CF6]"
                : "border-white/20"
            )}
            onClick={() => store.setConsent("functional", !store.consentFunctional)}
          >
            {store.consentFunctional && <Check size={9} className="text-white" />}
          </div>
          <span className="text-xs text-[#71717A] leading-relaxed">
            I agree that Teklin may store and use my details to respond to this estimate request. View our{" "}
            <a href="/privacy" className="text-[#8B5CF6] hover:underline">Privacy Policy</a>.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            className={cn(
              "mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
              store.consentMarketing
                ? "bg-[#8B5CF6] border-[#8B5CF6]"
                : "border-white/20"
            )}
            onClick={() => store.setConsent("marketing", !store.consentMarketing)}
          >
            {store.consentMarketing && <Check size={9} className="text-white" />}
          </div>
          <span className="text-xs text-[#71717A] leading-relaxed">
            I&apos;d like to receive occasional updates and insights from Teklin (optional).
          </span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm font-medium">
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-colors"
        >
          Get My Estimate
          <Sparkles size={16} />
        </button>
      </div>
      <p className="text-center text-xs text-[#52525B]">
        You can also{" "}
        <button onClick={onNext} className="text-[#A1A1AA] hover:text-[#FAFAFA] underline">
          skip this step
        </button>{" "}
        and view your estimate without contact details.
      </p>
    </div>
  );
}

// ─── Step 5: Results ──────────────────────────────────────────────────────────

function Step5({ onReset }: { onReset: () => void }) {
  const store = useEstimatorStore();
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  // Calculate on mount or when store changes
  const estimate = store.projectType
    ? calculateEstimate({
        projectType: store.projectType,
        selectedFeatures: store.selectedFeatures,
        designLevel: store.designLevel,
        complexity: store.complexity,
        timeline: store.timeline,
        platform: store.platform,
      })
    : store.estimateResult;

  // If we have a stored AI result (from step 1), use those insights
  useEffect(() => {
    if (store.estimateResult) {
      // Insights may have been set by AI flow - we'll show generic ones otherwise
    }
  }, []);

  // Fetch AI insights for this estimate
  const refineWithAI = async () => {
    if (!store.projectType) return;
    setIsRefining(true);
    try {
      const projectLabel = PROJECT_TYPES.find((p) => p.id === store.projectType)?.label ?? store.projectType;
      const featureLabels = store.selectedFeatures
        .map((id) => pricingConfig.features.find((f) => f.id === id)?.label)
        .filter(Boolean)
        .join(", ");

      const res = await fetch("/api/ai-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${projectLabel} with features: ${featureLabels || "basic features"}. Complexity: ${store.complexity}. Timeline: ${store.timeline}.`,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAiInsights(data.aiInsights ?? []);
        setAiSummary(data.summary ?? "");
      }
    } catch {
      // silent fail
    } finally {
      setIsRefining(false);
    }
  };

  if (!estimate) {
    return (
      <div className="text-center py-20">
        <p className="text-[#71717A] mb-4">No estimate found. Please complete the previous steps.</p>
        <button onClick={onReset} className="btn-primary text-sm">Start Over</button>
      </div>
    );
  }

  const breakdownTotal = Object.values(estimate.breakdown).reduce((a, b) => a + b, 0);
  const projectInfo = PROJECT_TYPES.find((p) => p.id === estimate.projectType);
  const selectedFeaturesList = pricingConfig.features.filter((f) =>
    store.selectedFeatures.includes(f.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-4">
          <Check size={14} />
          Your Estimate is Ready
        </div>
        <h2 className="text-2xl font-bold text-[#FAFAFA]">
          {projectInfo?.emoji} {projectInfo?.label ?? "Project"} Estimate
        </h2>
        {aiSummary && <p className="text-sm text-[#A1A1AA] max-w-xl mx-auto">{aiSummary}</p>}
      </div>

      {/* Primary Price Card */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-xs text-[#71717A] uppercase tracking-widest mb-2">Total Estimate (INR)</p>
            <div className="text-4xl font-extrabold font-mono bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {formatINR(estimate.priceINR.low)}
            </div>
            <div className="text-xl font-semibold text-[#A1A1AA] mt-1">
              – {formatINR(estimate.priceINR.high)}
            </div>
            <p className="text-xs text-[#52525B] mt-2">
              Midpoint: {formatINR(estimate.priceINR.midpoint)}
            </p>
          </div>
          <div className="text-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            <p className="text-xs text-[#71717A] uppercase tracking-widest mb-2">Total Estimate (USD)</p>
            <div className="text-3xl font-bold font-mono text-[#FAFAFA]">
              {formatUSD(estimate.priceUSD.low)}
            </div>
            <div className="text-xl font-semibold text-[#A1A1AA] mt-1">
              – {formatUSD(estimate.priceUSD.high)}
            </div>
            <p className="text-xs text-[#52525B] mt-2">
              At ₹83.5/USD exchange rate
            </p>
          </div>
        </div>
      </div>

      {/* Meta Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Clock size={16} />, label: "Timeline", value: `${estimate.timeline.weeksLow}–${estimate.timeline.weeksHigh} weeks`, color: "#8B5CF6" },
          { icon: <Users size={16} />, label: "Team Size", value: `${estimate.teamSize} people`, color: "#06B6D4" },
          { icon: <Zap size={16} />, label: "Total Hours", value: `~${estimate.totalHours} hrs`, color: "#10B981" },
          { icon: <Wrench size={16} />, label: "Annual Maintenance", value: `${formatINR(estimate.maintenance.low * 83.5)}/yr`, color: "#F59E0B" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="flex justify-center mb-2" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <p className="text-base font-bold text-[#FAFAFA]">{stat.value}</p>
            <p className="text-xs text-[#71717A] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-bold text-[#FAFAFA] mb-4 uppercase tracking-wide flex items-center gap-2">
          <TrendingUp size={14} className="text-[#8B5CF6]" />
          Cost Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(estimate.breakdown).map(([key, value]) => {
            const pct = (value / breakdownTotal) * 100;
            const color = BREAKDOWN_COLORS[key] ?? "#71717A";
            return (
              <div key={key}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#A1A1AA]">{BREAKDOWN_LABELS[key] ?? key}</span>
                  <span className="text-[#FAFAFA] font-medium">
                    {formatINR(value * 83.5)} ({pct.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Features */}
      {selectedFeaturesList.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-bold text-[#FAFAFA] mb-3 uppercase tracking-wide flex items-center gap-2">
            <Star size={14} className="text-[#8B5CF6]" />
            Included Features ({selectedFeaturesList.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedFeaturesList.map((f) => (
              <span key={f.id} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#A1A1AA]">
                {f.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-bold text-[#FAFAFA] mb-3 uppercase tracking-wide flex items-center gap-2">
          <Info size={14} className="text-[#8B5CF6]" />
          Estimate Configuration
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Project Type", value: projectInfo?.label ?? estimate.projectType },
            { label: "Complexity", value: estimate.multipliers.complexity },
            { label: "Timeline", value: estimate.multipliers.timeline },
            { label: "Design Level", value: estimate.multipliers.designLevel },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-[#71717A] uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-[#FAFAFA] capitalize mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#52525B] mt-3 flex items-center gap-1.5">
          <Info size={10} />
          Pricing v{estimate.pricingVersion} · Estimates are indicative only. Final pricing confirmed after scoping call.
        </p>
      </div>

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 p-5"
        >
          <h3 className="text-sm font-bold text-[#FAFAFA] mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-[#8B5CF6]" />
            AI Recommendations
          </h3>
          <ul className="space-y-2">
            {aiInsights.map((insight, i) => (
              <li key={i} className="text-sm text-[#A1A1AA] flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-0.5 shrink-0">→</span>
                {insight}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm transition-colors"
        >
          <Phone size={16} />
          Book a Free Scoping Call
          <ArrowRight size={16} />
        </Link>
        <button
          onClick={refineWithAI}
          disabled={isRefining}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {isRefining ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Getting AI Insights...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Get AI Recommendations
            </>
          )}
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm"
        >
          <RotateCcw size={14} />
          Start Over
        </button>
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#FAFAFA] transition-colors text-sm"
        >
          <ExternalLink size={14} />
          Contact Us
        </Link>
      </div>

      <p className="text-center text-xs text-[#52525B] pb-20">
        This estimate is generated algorithmically and enhanced with AI. Actual project costs may vary.
        Contact us for a custom quote. © {new Date().getFullYear()} Teklin · <a href="/privacy" className="hover:text-[#A1A1AA]">Privacy Policy</a>
      </p>
    </div>
  );
}

// ─── Main Estimator Page ──────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function EstimatePage() {
  const [mounted, setMounted] = useState(false);
  const store = useEstimatorStore();
  const { currentStep, direction } = store;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-calculate estimate when reaching step 5
  useEffect(() => {
    if (mounted && currentStep === 5 && store.projectType) {
      const result = calculateEstimate({
        projectType: store.projectType,
        selectedFeatures: store.selectedFeatures,
        designLevel: store.designLevel,
        complexity: store.complexity,
        timeline: store.timeline,
        platform: store.platform,
      });
      store.setEstimateResult(result);
    }
  }, [currentStep, mounted]);

  const handleNext = () => store.nextStep();
  const handleBack = () => store.prevStep();
  const handleReset = () => store.reset();

  const goToNextFromStep1 = (type: ProjectType) => {
    store.setProjectType(type);
    store.nextStep();
  };

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#8B5CF6]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-semibold mb-5 uppercase tracking-widest">
          <Sparkles size={12} />
          Free Budget Estimator
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FAFAFA] tracking-tight mb-3">
          How much will your project cost?
        </h1>
        <p className="text-[#A1A1AA] text-base max-w-lg mx-auto leading-relaxed">
          Get a transparent, detailed estimate in under 2 minutes. No commitment, no emails required.
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator current={currentStep} total={5} />

      {/* Step Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentStep === 1 && <Step1 onNext={goToNextFromStep1} />}
            {currentStep === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && <Step3 onNext={handleNext} onBack={handleBack} />}
            {currentStep === 4 && <Step4 onNext={handleNext} onBack={handleBack} />}
            {currentStep === 5 && <Step5 onReset={handleReset} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating price bar — show on steps 2-4 */}
      {currentStep >= 2 && currentStep <= 4 && (
        <PriceSummaryBar projectType={store.projectType} features={store.selectedFeatures} />
      )}
    </div>
  );
}
