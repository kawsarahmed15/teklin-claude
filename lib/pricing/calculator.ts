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

/** Uses INR midpoint for Indian market team sizing */
function deriveTeamSize(midpointINR: number) {
  if (midpointINR >= 500_000) return 6; // ₹5L+
  if (midpointINR >= 200_000) return 4; // ₹2L–₹5L
  if (midpointINR >= 80_000)  return 3; // ₹80K–₹2L
  return 2;                              // < ₹80K
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

  // 1. Base cost (USD)
  const base = config.baseCosts[projectType];
  const baseMidpoint = (base.low + base.high) / 2;

  // 2. Sum feature add-ons
  const featureTotal = selectedFeatures.reduce((sum, featureId) => {
    const feature = config.features.find((f) => f.id === featureId);
    if (!feature) return sum;
    return sum + (feature.price.low + feature.price.high) / 2;
  }, 0);

  // 3. Design multiplier
  const designFactor =
    config.multipliers.design.options.find((o) => o.id === designLevel)?.factor ?? 1.0;

  // 4. Subtotal
  const subtotal = (baseMidpoint + featureTotal) * designFactor;

  // 5. Complexity multiplier
  const complexityFactor =
    config.multipliers.complexity.options.find((o) => o.id === complexity)?.factor ?? 1.0;

  // 6. Timeline multiplier
  const timelineFactor =
    config.multipliers.timeline.options.find((o) => o.id === timeline)?.factor ?? 1.0;

  // 7. Platform multiplier (mobile-app only)
  let platformFactor = 1.0;
  if (projectType === "mobile-app" && platform) {
    platformFactor =
      config.multipliers.platform.options.find((o) => o.id === platform)?.factor ?? 1.0;
  }

  // 8. Final total (USD midpoint)
  const total = subtotal * complexityFactor * timelineFactor * platformFactor;

  // 9. Spread → low / high (USD)
  const spread = config.rangeSpread;
  const lowUSD  = roundTo(total * (1 - spread), config.roundingUSD);
  const highUSD = roundTo(total * (1 + spread), config.roundingUSD);

  // 10. INR conversion
  const usdToInr = USD_TO_INR_RATE;
  const lowINR  = roundTo(lowUSD  * usdToInr, config.roundingINR);
  const highINR = roundTo(highUSD * usdToInr, config.roundingINR);
  const midINR  = roundTo(((lowINR + highINR) / 2), config.roundingINR);

  // 11. Team size based on INR midpoint
  const teamSize = deriveTeamSize(midINR);

  // 12. Total hours
  const totalHours = calculateHours(base, selectedFeatures, config);

  // 13. Timeline in weeks (40 hrs/week/developer at 80 % utilisation)
  const effectiveHrsPerWeek = teamSize * 40 * 0.80;
  const weeksLow  = Math.max(1, Math.ceil((totalHours * 0.85) / effectiveHrsPerWeek));
  const weeksHigh = Math.max(1, Math.ceil((totalHours * 1.15) / effectiveHrsPerWeek));

  // 14. Annual maintenance (INR)
  const maintLowINR  = roundTo(lowINR  * config.annualMaintenancePercent, config.roundingINR);
  const maintHighINR = roundTo(highINR * config.annualMaintenancePercent, config.roundingINR);

  return {
    pricingVersion: config.version,
    projectType,
    priceUSD: { low: lowUSD,  high: highUSD,  midpoint: roundTo((lowUSD  + highUSD)  / 2, config.roundingUSD)  },
    priceINR: { low: lowINR,  high: highINR,  midpoint: midINR },
    timeline: { weeksLow, weeksHigh },
    teamSize,
    totalHours,
    selectedFeatures,
    multipliers: { designLevel, complexity, timeline, platform },
    breakdown: calculateBreakdown(lowINR, highINR, config.costBreakdown), // breakdown in INR
    maintenance: { low: maintLowINR, high: maintHighINR },
  };
}
