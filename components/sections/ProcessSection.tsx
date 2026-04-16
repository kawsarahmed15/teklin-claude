"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Search, Layout, Code2, ShieldCheck, Rocket, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search, Layout, Code2, ShieldCheck, Rocket, TrendingUp,
};

function ProcessStep({
  step,
  index,
  total,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -40% 0px" });
  const Icon = iconMap[step.icon] || Code2;

  return (
    <div ref={ref} className="relative flex gap-6 lg:gap-10">
      {/* Left column — number + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          animate={{
            scale: isInView ? 1 : 0.85,
            backgroundColor: isInView ? "#8B5CF6" : "#27272A",
          }}
          transition={{ duration: 0.4 }}
          className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold text-white z-10 relative"
        >
          {isInView ? <Icon size={20} /> : step.number}
        </motion.div>

        {/* Vertical line (not on last item) */}
        {index < total - 1 && (
          <div className="w-px flex-1 my-2 bg-[#27272A] relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ background: "linear-gradient(to bottom, #8B5CF6, #06B6D4)" }}
              animate={{ height: isInView ? "100%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        )}
      </div>

      {/* Right column — content */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0.3,
          x: isInView ? 0 : 10,
        }}
        transition={{ duration: 0.4 }}
        className="pb-12 lg:pb-16 flex-1"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-[#52525B] tracking-widest">
            {step.number}
          </span>
          <h3 className="text-xl font-semibold text-[#FAFAFA]">{step.title}</h3>
        </div>
        <p className="text-[#71717A] leading-relaxed">{step.description}</p>
      </motion.div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section className="section-padding bg-[#09090B]" id="process">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32">
            <FadeIn>
              <p className="section-label mb-4">How we work</p>
            </FadeIn>
            <TextReveal as="h2" className="text-display font-bold mb-6">
              How we turn ideas into impact
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8">
                A rigorous, transparent process refined over 8 years and 150+ projects.
                Agile sprints, continuous delivery, and clear communication throughout.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="inline-flex items-center gap-2 badge-pill">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Agile / 2-week sprints / Daily standups
              </div>
            </FadeIn>
          </div>

          {/* Right — scrolling steps */}
          <div className="pt-2">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={i}
                total={PROCESS_STEPS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
