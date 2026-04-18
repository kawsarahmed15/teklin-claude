import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Project Budget Estimator | ${SITE_NAME}`,
  description:
    "Get an instant, AI-powered estimate for your software project. Tell us what you're building — we'll calculate the cost and timeline transparently in under 2 minutes.",
  openGraph: {
    title: `Project Budget Estimator | ${SITE_NAME}`,
    description: "Get an instant, AI-powered estimate for your software project.",
    url: `${SITE_URL}/estimate`,
    type: "website",
  },
};

export default function EstimatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-32">
      {/* Subtle mesh background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="container-custom relative z-10">{children}</div>
    </div>
  );
}
