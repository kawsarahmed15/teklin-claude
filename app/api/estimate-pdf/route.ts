/**
 * POST /api/estimate-pdf
 * Accepts EstimateResult + contact info → streams back a PDF quotation.
 */
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { EstimatePDF } from "@/components/estimate/EstimatePDF";
import type { PDFData } from "@/components/estimate/EstimatePDF";
import type { EstimateResult } from "@/lib/pricing/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateQuoteNumber(): string {
  const now = new Date();
  const yy  = String(now.getFullYear()).slice(-2);
  const mm  = String(now.getMonth() + 1).padStart(2, "0");
  const seq = Math.floor(Math.random() * 9000) + 1000;
  return `TKL-${yy}${mm}-${seq}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      estimate: EstimateResult;
      contactInfo?: PDFData["contactInfo"];
      requirementText?: string;
      aiInsights?: string[];
    };

    if (!body.estimate) {
      return NextResponse.json({ error: "estimate is required" }, { status: 400 });
    }

    const now      = new Date();
    const validity = new Date(now);
    validity.setDate(validity.getDate() + 30);

    const pdfData: PDFData = {
      estimate:        body.estimate,
      contactInfo:     body.contactInfo,
      requirementText: body.requirementText,
      aiInsights:      body.aiInsights,
      quoteNumber:     generateQuoteNumber(),
      generatedAt:     formatDate(now),
      validUntil:      formatDate(validity),
    };

    // Render PDF to buffer (server-side)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(createElement(EstimatePDF, pdfData) as any);

    const filename  = `Teklin-Quotation-${pdfData.quoteNumber}.pdf`;
    // Convert Node Buffer → Uint8Array so NextResponse accepts it
    const bodyBytes = new Uint8Array(buffer);

    return new NextResponse(bodyBytes, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length":      String(bodyBytes.byteLength),
        "Cache-Control":       "no-store",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: String(err) },
      { status: 500 }
    );
  }
}
