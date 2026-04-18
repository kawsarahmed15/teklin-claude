import { z } from "zod";

export const MultiplierSchema = z.object({
  id: z.string(),
  label: z.string(),
  factor: z.number(),
  description: z.string().optional(),
});

export const FeatureSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.object({ low: z.number(), high: z.number() }),
  hours: z.number(),
  applicableTo: z.array(z.string()),
  popular: z.boolean().optional(),
});

export const PricingConfigSchema = z.object({
  version: z.string(),
  effectiveDate: z.string(),
  blendedRateUSD: z.number(),
  rangeSpread: z.number(),
  roundingUSD: z.number(),
  roundingINR: z.number(),
  baseCosts: z.record(
    z.string(),
    z.object({ low: z.number(), high: z.number(), hours: z.number() })
  ),
  features: z.array(FeatureSchema),
  multipliers: z.object({
    design: z.object({ label: z.string(), options: z.array(MultiplierSchema) }),
    complexity: z.object({ label: z.string(), options: z.array(MultiplierSchema) }),
    timeline: z.object({ label: z.string(), options: z.array(MultiplierSchema) }),
    platform: z.object({ label: z.string(), options: z.array(MultiplierSchema) }),
  }),
  costBreakdown: z.object({
    development: z.number(),
    qa: z.number(),
    design: z.number(),
    projectManagement: z.number(),
    devOps: z.number(),
    contingency: z.number(),
  }),
  annualMaintenancePercent: z.number(),
});

export type PricingConfig = z.infer<typeof PricingConfigSchema>;
export type Feature = z.infer<typeof FeatureSchema>;
export type ProjectType = "website" | "web-app" | "mobile-app" | "saas" | "enterprise" | "ai-ml";
export type DesignLevel = "template" | "custom" | "premium";
export type ComplexityLevel = "simple" | "standard" | "complex";
export type TimelineLevel = "relaxed" | "standard" | "accelerated" | "rush";
export type PlatformLevel = "cross-platform" | "single-native" | "both-native";

export interface EstimateInput {
  projectType: ProjectType;
  selectedFeatures: string[];
  designLevel: DesignLevel;
  complexity: ComplexityLevel;
  timeline: TimelineLevel;
  platform?: PlatformLevel | null;
}

export interface EstimateResult {
  pricingVersion: string;
  projectType: ProjectType;
  priceUSD: { low: number; high: number; midpoint: number };
  priceINR: { low: number; high: number; midpoint: number };
  timeline: { weeksLow: number; weeksHigh: number };
  teamSize: number;
  totalHours: number;
  selectedFeatures: string[];
  multipliers: {
    designLevel: DesignLevel;
    complexity: ComplexityLevel;
    timeline: TimelineLevel;
    platform?: PlatformLevel | null;
  };
  breakdown: Record<string, number>;
  maintenance: { low: number; high: number };
}
