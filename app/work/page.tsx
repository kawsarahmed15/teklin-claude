"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { CASE_STUDIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "SaaS", "AI/ML", "Enterprise"];

export default function WorkPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          <FadeIn>
            <p className="section-label mb-4">Our work</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6 max-w-3xl">
            Case studies in code, design, and impact
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
              Real projects, real clients, real results. We let the outcomes speak.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-6 border-b border-[#18181B] bg-[#09090B] sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn("filter-btn whitespace-nowrap", active === f && "active")}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section className="section-padding bg-[#09090B]">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((study, i) => (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={`/work/${study.slug}`}
                    className="card-dark block group h-full"
                    data-cursor="View"
                  >
                    {/* Product screenshot */}
                    <div className="h-44 rounded-lg mb-3 relative overflow-hidden">
                      <Image
                        src={study.image}
                        alt={`${study.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                        unoptimized={study.image.endsWith(".svg")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                          View Case Study <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>

                    <p className="badge-pill inline-flex mb-2">{study.industry}</p>
                    <h2 className="text-lg font-bold mb-0.5 text-[#FAFAFA]">{study.title}</h2>
                    <p className="text-sm text-[#A1A1AA] mb-1">{study.subtitle}</p>
                    <p className="text-sm text-[#71717A] mb-3 leading-relaxed line-clamp-2">{study.description}</p>

                    <p className="text-sm font-bold" style={{ color: study.color }}>
                      {study.metric}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {study.tags.map((tag) => (
                        <span key={tag} className="badge-pill text-xs">{tag}</span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
