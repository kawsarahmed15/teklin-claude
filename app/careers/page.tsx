"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MapPin, Clock, ArrowRight, Briefcase } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { OPEN_POSITIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Operations"];

const BENEFITS = [
  { emoji: "🌍", title: "Remote-first", description: "Work from anywhere in the world. We care about output, not location." },
  { emoji: "📚", title: "Learning budget", description: "$2,000/year for courses, books, conferences, and certifications." },
  { emoji: "💰", title: "Competitive pay", description: "Market-rate salaries benchmarked annually with transparent bands." },
  { emoji: "⚡", title: "Latest tech stack", description: "Work with modern tools. We invest in the right technology for each project." },
  { emoji: "🚀", title: "Meaningful projects", description: "Every project has real users and real business impact behind it." },
  { emoji: "📈", title: "Growth paths", description: "Clear career progression from IC to Staff Engineer or Engineering Manager." },
];

const TEAM_QUOTES = [
  {
    quote: "The technical bar here is the highest I've experienced, and the culture actually matches the values page. It's rare.",
    name: "Marcus Patel",
    role: "VP Engineering",
    initials: "MP",
  },
  {
    quote: "I've shipped code on six continents here. The projects are varied and the team genuinely challenges you.",
    name: "Leila Hassan",
    role: "Head of Design",
    initials: "LH",
  },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const filtered = activeDept === "All"
    ? OPEN_POSITIONS
    : OPEN_POSITIONS.filter((p) => p.department === activeDept);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10 max-w-4xl">
          <FadeIn>
            <p className="section-label mb-4">Join us</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6">
            Build the future with us
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              We&apos;re a remote-first team of engineers, designers, and problem-solvers who
              care deeply about craft. If you want to build exceptional software and grow
              with a team that takes quality seriously, we want to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="mb-12">
            <FadeIn>
              <p className="section-label mb-4">Why join Teklin</p>
            </FadeIn>
            <TextReveal as="h2" className="text-h1 font-bold">
              Built for people who care about their work
            </TextReveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 0.07}>
                <div className="card-dark h-full">
                  <div className="text-3xl mb-4">{benefit.emoji}</div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="mb-10">
            <FadeIn>
              <h2 className="text-h2 font-bold mb-6">Open positions</h2>
              {/* Filter */}
              <div className="flex flex-wrap gap-3">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={cn("filter-btn", activeDept === dept && "active")}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {filtered.length === 0 ? (
                <FadeIn>
                  <div className="card-dark text-center py-10 text-[#71717A]">
                    No open positions in this department right now.
                  </div>
                </FadeIn>
              ) : (
                filtered.map((position, i) => (
                  <motion.div
                    key={position.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="card-dark">
                      {/* Header row */}
                      <button
                        onClick={() =>
                          setExpandedRole(expandedRole === position.slug ? null : position.slug)
                        }
                        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
                        aria-expanded={expandedRole === position.slug}
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{position.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-[#71717A]">
                            <span className="flex items-center gap-1">
                              <Briefcase size={13} /> {position.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={13} /> {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={13} /> {position.type}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          size={20}
                          className={cn(
                            "text-[#71717A] transition-transform duration-200 flex-shrink-0",
                            expandedRole === position.slug && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {expandedRole === position.slug && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 border-t border-[#27272A] mt-6 space-y-4">
                              <p className="text-[#A1A1AA]">{position.description}</p>
                              <div>
                                <h4 className="text-sm font-semibold text-[#FAFAFA] mb-3">Requirements</h4>
                                <ul className="space-y-2">
                                  {position.requirements.map((req) => (
                                    <li key={req} className="flex gap-2 text-sm text-[#A1A1AA]">
                                      <span className="text-[#10B981] mt-0.5">•</span>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Link
                                href={`/contact?role=${position.slug}`}
                                className="btn-primary inline-flex mt-2"
                              >
                                Apply now <ArrowRight size={16} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Team quotes */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-10">From the team</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {TEAM_QUOTES.map((q, i) => (
              <FadeIn key={q.name} delay={i * 0.1}>
                <div className="card-dark">
                  <p className="text-lg italic text-[#FAFAFA] leading-relaxed mb-6">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}
                    >
                      {q.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{q.name}</p>
                      <p className="text-xs text-[#71717A]">{q.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* General application */}
      <section className="py-20 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-4">Don&apos;t see your role?</h2>
            <p className="text-[#A1A1AA] max-w-lg mx-auto mb-8">
              We&apos;re always looking for exceptional people. Send us your CV and tell us how you&apos;d
              contribute.
            </p>
            <Link href="/contact" className="btn-gradient">
              Get in touch <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
