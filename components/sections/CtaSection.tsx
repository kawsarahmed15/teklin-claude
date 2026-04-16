import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function CtaSection() {
  return (
    <section className="section-padding bg-[#09090B] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom text-center relative z-10">
        <FadeIn>
          <p className="section-label mb-6">Get started</p>
          <h2 className="text-display font-bold mb-6 max-w-3xl mx-auto">
            Ready to build something{" "}
            <span className="gradient-text">extraordinary</span>?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-10 max-w-xl mx-auto">
            Tell us about your project. We&apos;ll get back to you within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <MagneticButton>
            <Link href="/contact" className="btn-gradient text-lg">
              Let&apos;s Talk <ArrowRight size={20} />
            </Link>
          </MagneticButton>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-[#52525B]">
            <span>✓ 24-hour response time</span>
            <span>✓ No commitment required</span>
            <span>✓ NDA available on request</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
