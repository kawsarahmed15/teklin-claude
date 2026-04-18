/**
 * POST /api/ai-estimate
 * Accepts either:
 *   { prompt: string }                          — plain text description
 *   { fileData: string, mimeType: string }       — base64-encoded file (PDF/TXT)
 *   { prompt: string, fileData: string, ... }   — both together
 *
 * Calls Gemini 2.0 Flash → returns { input, estimate, aiInsights, summary }
 */
import { NextResponse } from "next/server";
import { pricingConfig } from "@/lib/pricing/config";
import { calculateEstimate } from "@/lib/pricing/calculator";
import type { ProjectType, DesignLevel, ComplexityLevel, TimelineLevel, PlatformLevel } from "@/lib/pricing/types";

export const runtime = "nodejs";

const GEMINI_URL = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

function buildSystemInstruction(): string {
  const projectTypes  = Object.keys(pricingConfig.baseCosts);
  const featureList   = pricingConfig.features.map(f => `${f.id} (${f.label}, applies to: ${f.applicableTo.join(",")})`);
  const complexities  = pricingConfig.multipliers.complexity.options.map(o => o.id);
  const timelines     = pricingConfig.multipliers.timeline.options.map(o => o.id);
  const designs       = pricingConfig.multipliers.design.options.map(o => o.id);
  const platforms     = pricingConfig.multipliers.platform.options.map(o => o.id);

  return `You are a software project estimation AI for Teklin, a budget-friendly software development studio in India.

PRICING CONTEXT (Indian market, low-budget clients):
- Simple website: Rs.8K–Rs.20K
- Single-vendor ecommerce (1 component): Rs.20K–Rs.50K
- Full cab app (all components): ~Rs.2L
- Mobile apps typically Rs.30K–Rs.1L per deliverable

AVAILABLE CONFIG:
Project Types (pick ONE): ${JSON.stringify(projectTypes)}
Feature IDs (pick ONLY applicable ones): ${JSON.stringify(featureList)}
Complexity (pick ONE): ${JSON.stringify(complexities)}
Delivery Speed (pick ONE): ${JSON.stringify(timelines)}
Design Level (pick ONE): ${JSON.stringify(designs)}
Platform (pick ONE, ONLY if mobile-app, else null): ${JSON.stringify(platforms)}

INSTRUCTIONS:
1. Pick the best-matching projectType.
2. Pick ONLY feature IDs that the description clearly mentions or strongly implies. Do NOT invent IDs.
3. Estimate complexity honestly — most Indian SMB projects are "simple" or "standard".
4. Provide 3 concise, actionable aiInsights specific to this project.
5. Write a one-sentence summary.
6. Return ONLY valid JSON — no markdown, no code blocks:
{
  "projectType": "string",
  "selectedFeatures": ["string"],
  "complexity": "string",
  "timeline": "string",
  "designLevel": "string",
  "platform": null | "string",
  "aiInsights": ["string","string","string"],
  "summary": "string"
}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      prompt?: string;
      fileData?: string;   // base64
      mimeType?: string;   // e.g. "application/pdf" | "text/plain"
    };

    const { prompt, fileData, mimeType } = body;

    if (!prompt && !fileData) {
      return NextResponse.json(
        { error: "Provide either a text description or an uploaded file." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "AI service not configured." }, { status: 503 });
    }

    // Build the content parts
    const parts: object[] = [];

    if (fileData && mimeType) {
      // Inline file — Gemini can natively read PDF / plain text
      parts.push({
        inlineData: { data: fileData, mimeType },
      });
      parts.push({
        text: "Analyse the uploaded requirements document above and extract a structured project specification.",
      });
    }

    if (prompt?.trim()) {
      parts.push({ text: prompt.trim() });
    }

    if (parts.length === 0) {
      return NextResponse.json({ error: "No content to process." }, { status: 400 });
    }

    const geminiBody = {
      systemInstruction: { parts: [{ text: buildSystemInstruction() }] },
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.15,
        maxOutputTokens: 1024,
      },
    };

    const res = await fetch(GEMINI_URL(apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Use manual steps." },
        { status: 502 }
      );
    }

    const geminiData = await res.json();
    const rawText    = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    let parsed: {
      projectType:      ProjectType;
      selectedFeatures: string[];
      complexity:       ComplexityLevel;
      timeline:         TimelineLevel;
      designLevel:      DesignLevel;
      platform:         PlatformLevel | null;
      aiInsights:       string[];
      summary:          string;
    };

    try {
      const cleaned = rawText.replace(/```json?/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Bad Gemini JSON:", rawText);
      return NextResponse.json(
        { error: "AI returned an unexpected format. Please try again." },
        { status: 500 }
      );
    }

    // ── Validate & sanitise ────────────────────────────────────────────────
    const validTypes: ProjectType[]     = ["website","web-app","mobile-app","saas","enterprise","ai-ml"];
    const validCmplx: ComplexityLevel[] = ["simple","standard","complex"];
    const validTL:    TimelineLevel[]   = ["relaxed","standard","accelerated","rush"];
    const validDsgn:  DesignLevel[]     = ["template","custom","premium"];
    const validPlatf: PlatformLevel[]   = ["cross-platform","single-native","both-native"];

    if (!validTypes.includes(parsed.projectType))   parsed.projectType  = "web-app";
    if (!validCmplx.includes(parsed.complexity))    parsed.complexity   = "standard";
    if (!validTL.includes(parsed.timeline))         parsed.timeline     = "standard";
    if (!validDsgn.includes(parsed.designLevel))    parsed.designLevel  = "template";
    if (parsed.platform && !validPlatf.includes(parsed.platform)) parsed.platform = null;

    const validIds = new Set(pricingConfig.features.map(f => f.id));
    parsed.selectedFeatures = (parsed.selectedFeatures ?? []).filter(id => validIds.has(id));

    // Also filter to only features applicable to the chosen project type
    parsed.selectedFeatures = parsed.selectedFeatures.filter(id => {
      const feat = pricingConfig.features.find(f => f.id === id);
      return feat?.applicableTo.includes(parsed.projectType) ?? false;
    });

    if (parsed.projectType !== "mobile-app") parsed.platform = null;

    // ── Calculate estimate ─────────────────────────────────────────────────
    const estimateInput = {
      projectType:      parsed.projectType,
      selectedFeatures: parsed.selectedFeatures,
      designLevel:      parsed.designLevel,
      complexity:       parsed.complexity,
      timeline:         parsed.timeline,
      platform:         parsed.platform,
    };

    const estimate = calculateEstimate(estimateInput);

    return NextResponse.json({
      input:      estimateInput,
      estimate,
      aiInsights: parsed.aiInsights ?? [],
      summary:    parsed.summary   ?? "",
    });
  } catch (err) {
    console.error("AI estimate error:", err);
    return NextResponse.json(
      { error: "Internal server error.", details: String(err) },
      { status: 500 }
    );
  }
}
