/**
 * EstimatePDF — Professional Project Quotation
 * Rendered server-side with @react-pdf/renderer
 */
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import type { EstimateResult } from "@/lib/pricing/types";
import { pricingConfig } from "@/lib/pricing/config";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface PDFData {
  estimate: EstimateResult;
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  requirementText?: string;
  aiInsights?: string[];
  quoteNumber: string;
  validUntil: string;
  generatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const INR = (n: number) => {
  if (n >= 1_00_00_000) return `Rs.${(n / 1_00_00_000).toFixed(1)}Cr`;
  if (n >= 1_00_000)    return `Rs.${(n / 1_00_000).toFixed(2)}L`;
  if (n >= 1_000)       return `Rs.${(n / 1_000).toFixed(1)}K`;
  return `Rs.${Math.round(n).toLocaleString("en-IN")}`;
};

const USD = (n: number) => {
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
};

const CAP = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const BREAKDOWN_LABELS: Record<string, string> = {
  development: "Development",
  design: "UI / UX Design",
  qa: "QA & Testing",
  projectManagement: "Project Management",
  devOps: "DevOps / Infrastructure",
  contingency: "Contingency Buffer",
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const C = {
  purple:    "#6D28D9",
  purpleL:   "#8B5CF6",
  purpleXL:  "#EDE9FE",
  dark:      "#111827",
  darkMid:   "#374151",
  mid:       "#6B7280",
  light:     "#F9FAFB",
  lightMid:  "#F3F4F6",
  border:    "#E5E7EB",
  white:     "#FFFFFF",
  green:     "#059669",
  greenL:    "#D1FAE5",
  orange:    "#D97706",
  orangeL:   "#FEF3C7",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.dark,
    backgroundColor: C.white,
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
  },

  // Header
  header: {
    backgroundColor: C.purple,
    paddingHorizontal: 40,
    paddingTop: 32,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1 },
  companyName: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.white, letterSpacing: 1 },
  companyTagline: { fontSize: 9, color: "#C4B5FD", marginTop: 3 },
  headerRight: { alignItems: "flex-end" },
  quotationTitle: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.white },
  quoteNumber: { fontSize: 9, color: "#C4B5FD", marginTop: 4 },
  quoteDate: { fontSize: 8, color: "#A78BFA", marginTop: 2 },

  // Body
  body: { paddingHorizontal: 40 },

  // Meta strip
  metaStrip: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  metaCard: {
    flex: 1,
    backgroundColor: C.lightMid,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.purple,
  },
  metaLabel: { fontSize: 7, color: C.mid, textTransform: "uppercase", letterSpacing: 0.5 },
  metaValue: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.dark, marginTop: 3 },
  metaSub:   { fontSize: 7, color: C.mid, marginTop: 2 },

  // Section
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.purple,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: C.purpleXL,
    paddingBottom: 4,
    marginBottom: 10,
  },

  // Parties row
  partiesRow: { flexDirection: "row", gap: 20, marginBottom: 18 },
  partyBox: {
    flex: 1,
    backgroundColor: C.light,
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  partyBoxPurple: {
    flex: 1,
    backgroundColor: C.purpleXL,
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  partyLabel: { fontSize: 7, color: C.mid, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 },
  partyName:  { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark },
  partyLine:  { fontSize: 8, color: C.darkMid, marginTop: 2 },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.purple,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: C.light,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  thText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white },
  tdText: { fontSize: 8, color: C.darkMid },
  colFeature:  { flex: 3 },
  colCat:      { flex: 1.5 },
  colHrs:      { flex: 0.8, textAlign: "right" },
  colPrice:    { flex: 1.2, textAlign: "right" },

  // Summary box
  summaryBox: {
    backgroundColor: C.purpleXL,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DDD6FE",
    marginBottom: 18,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  summaryLabel: { fontSize: 8, color: C.darkMid },
  summaryValue: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.dark },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1.5,
    borderTopColor: C.purple,
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.purple },
  totalValue: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.purple },

  // Breakdown bars
  breakdownRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  breakdownLabel: { width: 110, fontSize: 8, color: C.darkMid },
  breakdownBar:  { flex: 1, height: 6, backgroundColor: C.border, borderRadius: 3, marginHorizontal: 8 },
  breakdownFill: { height: 6, backgroundColor: C.purple, borderRadius: 3 },
  breakdownPct:  { width: 36, fontSize: 8, color: C.mid, textAlign: "right" },
  breakdownAmt:  { width: 60, fontSize: 8, fontFamily: "Helvetica-Bold", color: C.dark, textAlign: "right" },

  // Payment terms
  termRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  termBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  termBadgeText: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.white },
  termText: { flex: 1 },
  termTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.dark },
  termDesc: { fontSize: 8, color: C.mid, marginTop: 2 },

  // Requirements box
  requirementsBox: {
    backgroundColor: C.orangeL,
    borderRadius: 6,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: C.orange,
    marginBottom: 18,
  },
  requirementsText: { fontSize: 8, color: C.darkMid, lineHeight: 1.5 },

  // Insights
  insightRow: { flexDirection: "row", gap: 8, marginBottom: 5 },
  insightDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.purple, marginTop: 3 },
  insightText: { flex: 1, fontSize: 8, color: C.darkMid, lineHeight: 1.4 },

  // Validity
  validityBox: {
    backgroundColor: C.greenL,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
    marginBottom: 18,
  },
  validityText: { fontSize: 8, color: "#065F46" },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.dark,
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: { fontSize: 8, color: "#9CA3AF" },
  footerRight: { fontSize: 8, color: "#9CA3AF", textAlign: "right" },

  // Disclaimer
  disclaimer: {
    fontSize: 7,
    color: C.mid,
    lineHeight: 1.5,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
});

// ─── Component ────────────────────────────────────────────────────────────────
export function EstimatePDF({
  estimate,
  contactInfo,
  requirementText,
  aiInsights,
  quoteNumber,
  validUntil,
  generatedAt,
}: PDFData) {
  const selectedFeatureObjs = pricingConfig.features.filter((f) =>
    estimate.selectedFeatures.includes(f.id)
  );

  const totalBreakdown = Object.values(estimate.breakdown).reduce((a, b) => a + b, 0);

  const PAYMENT_TERMS = [
    { pct: "40%", title: "Advance Payment", desc: "Paid before development begins to confirm the project" },
    { pct: "30%", title: "Mid-Project Milestone", desc: "After core features are delivered and reviewed" },
    { pct: "30%", title: "Final Delivery", desc: "On handover of complete project, source code & deployment" },
  ];

  return (
    <Document
      title={`Teklin Project Quotation — ${quoteNumber}`}
      author="Teklin Software Development"
      subject="Project Quotation"
    >
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.companyName}>TEKLIN</Text>
            <Text style={s.companyTagline}>Full-Spectrum Software Development · teklin.in</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.quotationTitle}>PROJECT QUOTATION</Text>
            <Text style={s.quoteNumber}>Ref: {quoteNumber}</Text>
            <Text style={s.quoteDate}>Generated: {generatedAt}</Text>
            <Text style={s.quoteDate}>Valid Until: {validUntil}</Text>
          </View>
        </View>

        <View style={s.body}>
          {/* ── Key Metrics ── */}
          <View style={s.metaStrip}>
            <View style={s.metaCard}>
              <Text style={s.metaLabel}>Estimated Cost</Text>
              <Text style={s.metaValue}>{INR(estimate.priceINR.low)} – {INR(estimate.priceINR.high)}</Text>
              <Text style={s.metaSub}>{USD(estimate.priceUSD.low)} – {USD(estimate.priceUSD.high)}</Text>
            </View>
            <View style={s.metaCard}>
              <Text style={s.metaLabel}>Timeline</Text>
              <Text style={s.metaValue}>{estimate.timeline.weeksLow}–{estimate.timeline.weeksHigh} Weeks</Text>
              <Text style={s.metaSub}>≈ {Math.ceil((estimate.timeline.weeksLow + estimate.timeline.weeksHigh) / 2 / 4)} months</Text>
            </View>
            <View style={s.metaCard}>
              <Text style={s.metaLabel}>Team Size</Text>
              <Text style={s.metaValue}>{estimate.teamSize} People</Text>
              <Text style={s.metaSub}>~{estimate.totalHours} total hours</Text>
            </View>
            <View style={s.metaCard}>
              <Text style={s.metaLabel}>Annual Maintenance</Text>
              <Text style={s.metaValue}>{INR(estimate.maintenance.low)}/yr</Text>
              <Text style={s.metaSub}>Optional support contract</Text>
            </View>
          </View>

          {/* ── Parties ── */}
          <View style={s.partiesRow}>
            <View style={s.partyBoxPurple}>
              <Text style={s.partyLabel}>Service Provider</Text>
              <Text style={s.partyName}>Teklin</Text>
              <Text style={s.partyLine}>contact@teklin.in · +91 9707276661</Text>
              <Text style={s.partyLine}>Kanishail, Karimganj, Assam 788727</Text>
              <Text style={s.partyLine}>teklin.in</Text>
            </View>
            <View style={s.partyBox}>
              <Text style={s.partyLabel}>Prepared For</Text>
              <Text style={s.partyName}>{contactInfo?.name || "Prospective Client"}</Text>
              {contactInfo?.company ? <Text style={s.partyLine}>{contactInfo.company}</Text> : null}
              {contactInfo?.email   ? <Text style={s.partyLine}>{contactInfo.email}</Text>   : null}
              {contactInfo?.phone   ? <Text style={s.partyLine}>{contactInfo.phone}</Text>   : null}
            </View>
          </View>

          {/* ── Project Overview ── */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Project Overview</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {[
                ["Project Type",  CAP(estimate.projectType)],
                ["Complexity",    CAP(estimate.multipliers.complexity)],
                ["Delivery",      CAP(estimate.multipliers.timeline)],
                ["Design Level",  CAP(estimate.multipliers.designLevel)],
                ...(estimate.multipliers.platform ? [["Platform", CAP(estimate.multipliers.platform)]] : []),
                ["Pricing v",     estimate.pricingVersion],
              ].map(([lbl, val]) => (
                <View key={lbl} style={{ backgroundColor: C.lightMid, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: C.border }}>
                  <Text style={{ fontSize: 7, color: C.mid }}>{lbl}</Text>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.dark, marginTop: 2 }}>{val}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Requirements ── */}
          {requirementText ? (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Client Requirements</Text>
              <View style={s.requirementsBox}>
                <Text style={s.requirementsText}>{requirementText.slice(0, 600)}{requirementText.length > 600 ? "..." : ""}</Text>
              </View>
            </View>
          ) : null}

          {/* ── Features ── */}
          {selectedFeatureObjs.length > 0 ? (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Scope of Work — Feature Breakdown</Text>
              {/* Table Header */}
              <View style={s.tableHeader}>
                <Text style={[s.thText, s.colFeature]}>Feature</Text>
                <Text style={[s.thText, s.colCat]}>Category</Text>
                <Text style={[s.thText, s.colHrs]}>Hours</Text>
                <Text style={[s.thText, s.colPrice]}>Cost (INR)</Text>
              </View>
              {selectedFeatureObjs.map((f, i) => (
                <View key={f.id} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
                  <Text style={[s.tdText, s.colFeature]}>{f.label}</Text>
                  <Text style={[s.tdText, s.colCat]}>{f.category}</Text>
                  <Text style={[s.tdText, s.colHrs]}>{f.hours}</Text>
                  <Text style={[s.tdText, s.colPrice]}>{INR(((f.price.low + f.price.high) / 2) * 83.5)}</Text>
                </View>
              ))}
              {/* Totals row */}
              <View style={[s.tableRow, { backgroundColor: C.purpleXL }]}>
                <Text style={[s.thText, s.colFeature, { color: C.purple }]}>Base Project Cost</Text>
                <Text style={[s.tdText, s.colCat]} />
                <Text style={[s.thText, s.colHrs, { color: C.purple }]}>
                  {pricingConfig.baseCosts[estimate.projectType].hours}
                </Text>
                <Text style={[s.thText, s.colPrice, { color: C.purple }]}>
                  {INR(((pricingConfig.baseCosts[estimate.projectType].low + pricingConfig.baseCosts[estimate.projectType].high) / 2) * 83.5)}
                </Text>
              </View>
            </View>
          ) : null}

          {/* ── Investment Summary ── */}
          <View style={s.summaryBox}>
            <Text style={[s.sectionTitle, { borderBottomColor: "#DDD6FE", marginBottom: 10 }]}>Investment Summary</Text>
            {[
              ["Base Project Cost", INR(((pricingConfig.baseCosts[estimate.projectType].low + pricingConfig.baseCosts[estimate.projectType].high) / 2) * 83.5)],
              ["Feature Add-ons", `+${INR(selectedFeatureObjs.reduce((s, f) => s + ((f.price.low + f.price.high) / 2) * 83.5, 0))}`],
              ["Design Multiplier", `×${pricingConfig.multipliers.design.options.find(o => o.id === estimate.multipliers.designLevel)?.factor ?? 1}`],
              ["Complexity Multiplier", `×${pricingConfig.multipliers.complexity.options.find(o => o.id === estimate.multipliers.complexity)?.factor ?? 1}`],
              ["Timeline Multiplier", `×${pricingConfig.multipliers.timeline.options.find(o => o.id === estimate.multipliers.timeline)?.factor ?? 1}`],
            ].map(([lbl, val]) => (
              <View key={lbl} style={s.summaryRow}>
                <Text style={s.summaryLabel}>{lbl}</Text>
                <Text style={s.summaryValue}>{val}</Text>
              </View>
            ))}
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Total Estimated Investment</Text>
              <View>
                <Text style={s.totalValue}>{INR(estimate.priceINR.low)} – {INR(estimate.priceINR.high)}</Text>
                <Text style={[s.summaryValue, { textAlign: "right", color: C.mid, marginTop: 2 }]}>
                  {USD(estimate.priceUSD.low)} – {USD(estimate.priceUSD.high)}
                </Text>
              </View>
            </View>
          </View>

          {/* ── Cost Breakdown ── */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Cost Breakdown by Category</Text>
            {Object.entries(estimate.breakdown).map(([key, value]) => {
              const pct = totalBreakdown > 0 ? (value / totalBreakdown) * 100 : 0;
              return (
                <View key={key} style={s.breakdownRow}>
                  <Text style={s.breakdownLabel}>{BREAKDOWN_LABELS[key] ?? key}</Text>
                  <View style={s.breakdownBar}>
                    <View style={[s.breakdownFill, { width: `${pct}%` }]} />
                  </View>
                  <Text style={s.breakdownPct}>{pct.toFixed(0)}%</Text>
                  <Text style={s.breakdownAmt}>{INR(value)}</Text>
                </View>
              );
            })}
          </View>

          {/* ── AI Insights ── */}
          {aiInsights && aiInsights.length > 0 ? (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Technical Recommendations</Text>
              {aiInsights.map((insight, i) => (
                <View key={i} style={s.insightRow}>
                  <View style={s.insightDot} />
                  <Text style={s.insightText}>{insight}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* ── Payment Terms ── */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Payment Terms</Text>
            {PAYMENT_TERMS.map(({ pct, title, desc }) => (
              <View key={pct} style={s.termRow}>
                <View style={s.termBadge}>
                  <Text style={s.termBadgeText}>{pct}</Text>
                </View>
                <View style={s.termText}>
                  <Text style={s.termTitle}>{title}</Text>
                  <Text style={s.termDesc}>{desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── What's Included ── */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>What's Included</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {[
                "Full source code handover",
                "Deployment to production server",
                "3 months free bug fixes",
                "Technical documentation",
                "Admin credentials & guide",
                "Google Play / App Store submission",
                "1 revision round per major screen",
                "Post-launch support (optional)",
              ].map((item) => (
                <View key={item} style={{ flexDirection: "row", gap: 5, width: "47%", marginBottom: 4 }}>
                  <Text style={{ color: C.green, fontSize: 9 }}>✓</Text>
                  <Text style={{ fontSize: 8, color: C.darkMid }}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Validity ── */}
          <View style={s.validityBox}>
            <Text style={s.validityText}>
              This quotation is valid until {validUntil}. Prices are indicative and will be confirmed
              after a detailed scoping call. Variations in requirements may affect the final quote.
            </Text>
          </View>

          {/* ── Disclaimer ── */}
          <Text style={s.disclaimer}>
            This document is generated by Teklin's automated estimator and serves as an indicative quotation only. Final
            pricing will be confirmed via a signed Statement of Work (SoW) after project scoping. All prices are
            inclusive of development, design, and QA as per the breakdown above. Hosting, domain, third-party API
            costs (Razorpay, SMS, etc.) are billed separately. GST applicable as per prevailing rates.
            Contact: contact@teklin.in | teklin.in
          </Text>
        </View>

        {/* ── Footer ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerLeft}>Teklin · teklin.in · contact@teklin.in · +91 9707276661</Text>
          <Text style={s.footerRight}>Quotation {quoteNumber} · Confidential</Text>
        </View>
      </Page>
    </Document>
  );
}
