import { pricingConfig } from "./config";
import { USD_TO_INR_RATE } from "./constants";
import type { EstimateInput, EstimateResult, PricingConfig } from "./types";

function roundTo(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}

function calculateHours(
  base: { low: number; high: number; hours: number },
  selectedFeatures: string[],
  config: PricingConfig
) {
  const featureHours = selectedFeatures.reduce((sum, featureId) => {
    const feature = config.features.find((f) => f.id === featureId);
    return sum + (feature ? feature.hours : 0);
  }, 0);
  return base.hours + featureHours;
}

function deriveTeamSize(totalValue: number) {
  if (totalValue > 50000) return 6;
  if (totalValue > 20000) return 4;
  if (totalValue > 10000) return 3;
  return 2;
}

function calculateBreakdown(low: number, high: number, breakdown: Record<string, number>) {
  const midpoint = (low + high) / 2;
  const result: Record<string, number> = {};
  for (const [key, percent] of Object.entries(breakdown)) {
    result[key] = midpoint * percent;
  }
  return result;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const { projectType, selectedFeatures, designLevel, complexity, timeline, platform } = input;
  const config = pricingConfig;

  // 1. Base cost
  const base = config.baseCosts[projectType];
  const baseMidpoint = (base.low + base.high) / 2;

  // 2. Sum selected features
  const featureTotal = selectedFeatures.reduce((sum, featureId) => {
    const feature = config.features.find((f) => f.id === featureId);
    if (!feature) return sum;
    const featureMidpoint = (feature.price.low + feature.price.high) / 2;
    return sum + featureMidpoint;
  }, 0);

  // 3. Apply design multiplier
  const designFactor = config.multipliers.design.options.find((o) => o.id === designLevel)?.factor ?? 1.0;

  // 4. Subtotal before multipliers
  const subtotal = (baseMidpoint + featureTotal) * designFactor;

  // 5. Apply complexity multiplier
  const complexityFactor = config.multipliers.complexity.options.find((o) => o.id === complexity)?.factor ?? 1.0;

  // 6. Apply timeline multiplier
  const timelineFactor = config.multipliers.timeline.options.find((o) => o.id === timeline)?.factor ?? 1.0;

  // 7. Apply platform multiplier (mobile only)
  let platformFactor = 1.0;
  if (projectType === "mobile-app" && platform) {
    platformFactor = config.multipliers.platform.options.find((o) => o.id === platform)?.factor ?? 1.0;
  }

  // 8. Final total
  const total = subtotal * complexityFactor * timelineFactor * platformFactor;

  // 9. Apply range spread
  const spread = config.rangeSpread;
  const low = roundTo(total * (1 - spread), config.roundingUSD);
  const high = roundTo(total * (1 + spread), config.roundingUSD);

  // 10. Calculate hours
  const totalHours = calculateHours(base, selectedFeatures, config);

  // 11. Timeline in weeks
  const teamSize = deriveTeamSize(total);
  // 80% utilization assumes 32 hours per team member per week
  const weeksLow = Math.ceil((totalHours * 0.85) / (teamSize * 32));
  const weeksHigh = Math.ceil((totalHours * 1.15) / (teamSize * 32));

  // 12. INR conversion
  const usdToInr = USD_TO_INR_RATE;
  const lowINR = roundTo(low * usdToInr, config.roundingINR);
  const highINR = roundTo(high * usdToInr, config.roundingINR);

  // 13. Annual maintenance
  const maintenanceLow = roundTo(low * config.annualMaintenancePercent, config.roundingUSD);
  const maintenanceHigh = roundTo(high * config.annualMaintenancePercent, config.roundingUSD);

  return {
    pricingVersion: config.version,
    projectType,
    priceUSD: { low, high, midpoint: roundTo((low + high) / 2, config.roundingUSD) },
    priceINR: { low: lowINR, high: highINR, midpoint: roundTo((lowINR + highINR) / 2, config.roundingINR) },
    timeline: { weeksLow, weeksHigh },
    teamSize,
    totalHours,
    selectedFeatures,
    multipliers: { designLevel, complexity, timeline, platform },
    breakdown: calculateBreakdown(low, high, config.costBreakdown),
    maintenance: { low: maintenanceLow, high: maintenanceHigh },
  };
}
