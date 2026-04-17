import { NextResponse } from "next/server";
import { pricingConfig } from "@/lib/pricing/config";
import { calculateEstimate } from "@/lib/pricing/calculator";
import type { ProjectType, DesignLevel, ComplexityLevel, TimelineLevel, PlatformLevel } from "@/lib/pricing/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
      return NextResponse.json({ error: "Please provide a more detailed description (at least 10 characters)." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });

    const projectTypes = Object.keys(pricingConfig.baseCosts);
    const features = pricingConfig.features.map(f => ({ id: f.id, label: f.label, applicableTo: f.applicableTo }));
    const complexities = pricingConfig.multipliers.complexity.options.map(o => o.id);
    const timelines = pricingConfig.multipliers.timeline.options.map(o => o.id);
    const designs = pricingConfig.multipliers.design.options.map(o => o.id);
    const platforms = pricingConfig.multipliers.platform.options.map(o => o.id);

    const systemInstruction = `You are an expert software project estimator for Teklin, a full-stack software development company based in Assam, India. Analyze the user's project description and map it to the available pricing configuration.

AVAILABLE DATA:
Project Types (pick ONE): ${JSON.stringify(projectTypes)}
Features (pick applicable IDs only): ${JSON.stringify(features)}
Complexities (pick ONE): ${JSON.stringify(complexities)}
Timelines (pick ONE): ${JSON.stringify(timelines)}
Design Levels (pick ONE): ${JSON.stringify(designs)}
Platforms (pick ONE, only if projectType is mobile-app, else null): ${JSON.stringify(platforms)}

INSTRUCTIONS:
1. Select the single best matching projectType.
2. Select ONLY feature IDs that are relevant AND applicable to the chosen projectType. Do not invent feature IDs.
3. Set complexity (simple=CRUD/basic app, standard=moderate integrations, complex=real-time/AI/complex logic).
4. Set timeline (standard is default unless client implied urgency).
5. Set designLevel (custom for most apps, premium for high-end products, template for simple sites).
6. Set platform only if projectType is "mobile-app", otherwise null.
7. Provide 3-4 concise aiInsights (actionable technical recommendations specific to this project).
8. Provide a one-sentence summary of the project.
9. Output MUST be valid JSON only — no markdown, no code blocks, raw JSON object:
{
  "projectType": "string",
  "selectedFeatures": ["string"],
  "complexity": "string",
  "timeline": "string",
  "designLevel": "string",
  "platform": null or "string",
  "aiInsights": ["string", "string", "string"],
  "summary": "string"
}`;

    // Use Gemini 2.0 Flash for fast JSON outputs
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const geminiBody = {
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: prompt.trim() }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 1024,
      }
    };

    const res = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody)
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini API error:", err);
      return NextResponse.json({ error: "AI service temporarily unavailable. Please try the manual steps." }, { status: 502 });
    }

    const data = await res.json();
    const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    let parsedParams: {
      projectType: ProjectType;
      selectedFeatures: string[];
      complexity: ComplexityLevel;
      timeline: TimelineLevel;
      designLevel: DesignLevel;
      platform: PlatformLevel | null;
      aiInsights: string[];
      summary: string;
    };

    try {
      const cleaned = resultText.replace(/```json?/g, "").replace(/```/g, "").trim();
      parsedParams = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Gemini response:", resultText);
      return NextResponse.json({ error: "AI returned unexpected format. Please try again." }, { status: 500 });
    }

    // Validate & sanitize
    const validTypes: ProjectType[] = ["website", "web-app", "mobile-app", "saas", "enterprise", "ai-ml"];
    if (!validTypes.includes(parsedParams.projectType)) parsedParams.projectType = "web-app";

    const validFeatureIds = new Set(pricingConfig.features.map(f => f.id));
    const validFeatures = (parsedParams.selectedFeatures ?? []).filter(id => validFeatureIds.has(id));

    const validComplexities: ComplexityLevel[] = ["simple", "standard", "complex"];
    if (!validComplexities.includes(parsedParams.complexity)) parsedParams.complexity = "standard";

    const validTimelines: TimelineLevel[] = ["relaxed", "standard", "accelerated", "rush"];
    if (!validTimelines.includes(parsedParams.timeline)) parsedParams.timeline = "standard";

    const validDesigns: DesignLevel[] = ["template", "custom", "premium"];
    if (!validDesigns.includes(parsedParams.designLevel)) parsedParams.designLevel = "custom";

    const estimateInput = {
      projectType: parsedParams.projectType,
      selectedFeatures: validFeatures,
      designLevel: parsedParams.designLevel,
      complexity: parsedParams.complexity,
      timeline: parsedParams.timeline,
      platform: parsedParams.projectType === "mobile-app" ? (parsedParams.platform ?? "cross-platform") : null,
    };

    const estimate = calculateEstimate(estimateInput);

    return NextResponse.json({
      input: estimateInput,
      estimate,
      aiInsights: parsedParams.aiInsights ?? [],
      summary: parsedParams.summary ?? "",
    });

  } catch (error: unknown) {
    console.error("AI Estimate route error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to generate estimate", details: message }, { status: 500 });
  }
}