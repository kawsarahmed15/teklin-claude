"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Search, Layout, Code2, ShieldCheck, Rocket, TrendingUp, ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { PROCESS_STEPS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search, Layout, Code2, ShieldCheck, Rocket, TrendingUp,
};

type Phase = {
  number: string;
  title: string;
  description: string;
  icon: string;
  detail: string;
  deliverables: string[];
  color: string;
  hasTerminal?: boolean;
};

const PHASES: Phase[] = [
  {
    ...PROCESS_STEPS[0],
    detail: "We listen before we build. This phase includes stakeholder interviews, user research, competitive analysis, and technical due diligence. The output is a clear, shared understanding of the problem we're solving and the success criteria we're optimising for.",
    deliverables: ["Project brief & scope document", "User personas & journey maps", "Technical architecture proposal", "Phased delivery roadmap"],
    color: "#8B5CF6",
  },
  {
    ...PROCESS_STEPS[1],
    detail: "Every line of code serves a purpose. We design the system architecture first — data models, API contracts, infrastructure topology — then create interactive prototypes and a design system before writing production code.",
    deliverables: ["System architecture diagram", "Interactive Figma prototype", "Design system & component library", "API documentation"],
    color: "#06B6D4",
  },
  {
    ...PROCESS_STEPS[2],
    detail: "Sprint-based development with continuous delivery. You see real progress every two weeks — not just a final demo after months of silence. We practice trunk-based development with feature flags and automated CI/CD from day one.",
    deliverables: ["Working software every sprint", "Automated test suite", "CI/CD pipeline", "Weekly progress updates"],
    color: "#10B981",
    hasTerminal: true,
  },
  {
    ...PROCESS_STEPS[3],
    detail: "Ship with confidence. Every pull request is code-reviewed, every feature has unit and integration tests, and we run performance audits before every release. We don't ship code we wouldn't run in production ourselves.",
    deliverables: ["Automated test coverage report", "Performance audit results", "Security scan report", "Accessibility audit"],
    color: "#F97316",
  },
  {
    ...PROCESS_STEPS[4],
    detail: "Zero-downtime deployment with full monitoring, alerting, and rollback capabilities. We set up observability infrastructure (logs, metrics, traces) before the first production deploy so you're never flying blind.",
    deliverables: ["Production deployment", "Monitoring dashboards", "Runbook & on-call guide", "Load testing results"],
    color: "#3B82F6",
  },
  {
    ...PROCESS_STEPS[5],
    detail: "Post-launch is where the real learning happens. We monitor user behaviour, performance data, and business metrics to identify the next highest-leverage improvements. Iteration is built into our partnership model.",
    deliverables: ["Monthly analytics report", "Feature iteration roadmap", "Performance optimisations", "Capacity planning"],
    color: "#F59E0B",
  },
];

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -30% 0px" });
  const Icon = iconMap[phase.icon] || Code2;

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start py-16 border-b border-[#18181B] last:border-0">
      {/* Left — number & title */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0.3, x: isInView ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${phase.color}20`, color: phase.color }}
          >
            <Icon size={22} />
          </div>
          <span className="font-mono text-sm text-[#52525B]">{phase.number}</span>
        </div>
        <h2 className="text-h2 font-bold mb-4">{phase.title}</h2>
        <p className="text-[#A1A1AA] leading-relaxed">{phase.detail}</p>

        {/* Terminal animation for development phase */}
        {phase.hasTerminal && (
          <div className="mt-6 code-block">
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-[#10B981]">$ git checkout -b feature/user-dashboard</p>
              <p className="text-[#A1A1AA]">Switched to a new branch &apos;feature/user-dashboard&apos;</p>
              <p className="text-[#10B981]">$ pnpm run dev</p>
              <p className="text-[#A1A1AA]">▲ Next.js 16.2.4</p>
              <p className="text-[#A1A1AA]">- Local: http://localhost:3000</p>
              <p className="text-[#10B981]">✓ Starting...</p>
              <p className="text-[#10B981]">✓ Ready in 1.2s</p>
              <span className="typing-cursor" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Right — deliverables */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0.2, x: isInView ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-sm font-semibold text-[#A1A1AA] tracking-widest uppercase mb-4">
          Deliverables
        </h3>
        <div className="space-y-3">
          {phase.deliverables.map((d, i) => (
            <motion.div
              key={d}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 10 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#18181B] border border-[#27272A]"
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: phase.color }}
              />
              <span className="text-sm text-[#A1A1AA]">{d}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10 max-w-4xl">
          <FadeIn>
            <p className="section-label mb-4">How we work</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6">
            How we turn ideas into impact
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              A rigorous, transparent process refined over 8 years and 150+ projects.
              Here&apos;s exactly what working with Teklin looks like.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process phases */}
      <section className="bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-5xl">
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.number} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* Methodology callout */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="card-dark gradient-border">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-4xl">⚙️</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our methodology</h3>
                  <p className="text-[#A1A1AA] leading-relaxed">
                    We practice <strong className="text-[#FAFAFA]">Agile/Scrum</strong> with{" "}
                    <strong className="text-[#FAFAFA]">2-week sprints</strong>, daily async standups, and continuous
                    delivery. Every sprint ends with a demo and retrospective. You always
                    have visibility into what&apos;s in progress, what&apos;s coming next, and any
                    risks on the horizon.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h1 font-bold mb-4">Ready to start your project?</h2>
            <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
              We&apos;ll walk you through how this process applies to your specific project in a 30-minute discovery call.
            </p>
            <Link href="/contact" className="btn-primary">
              Book a discovery call <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
