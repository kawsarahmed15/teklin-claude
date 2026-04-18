"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { CASE_STUDIES } from "@/lib/constants";

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <FadeIn
        variant={isReversed ? "slideRight" : "slideLeft"}
        className="w-full lg:w-1/2"
      >
        <Link
          href={`/work/${study.slug}`}
          data-cursor="View"
          className="block rounded-2xl overflow-hidden aspect-video relative group"
        >
          {/* Product screenshot */}
          <Image
            src={study.image}
            alt={`${study.title} product screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
            unoptimized={study.image.endsWith(".svg")}
            priority={false}
          />

          {/* Subtle gradient overlay so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20">
              View Case Study <ArrowUpRight size={18} />
            </span>
          </div>

          {/* Metric badge */}
          <motion.div
            className="absolute bottom-4 right-4 badge-pill backdrop-blur-sm"
            style={{ y, backgroundColor: `${study.color}22`, borderColor: `${study.color}50`, color: study.color }}
          >
            {study.metric}
          </motion.div>
        </Link>
      </FadeIn>

      {/* Text */}
      <FadeIn
        variant={isReversed ? "slideLeft" : "slideRight"}
        className="w-full lg:w-1/2"
      >
        <div className="badge-pill mb-4 inline-flex">{study.industry}</div>
        <h3 className="text-h2 font-bold mb-3">{study.title}</h3>
        <p className="text-[#A1A1AA] leading-relaxed mb-5">{study.description}</p>

        {/* Metric callout */}
        <div
          className="text-lg font-bold mb-6"
          style={{ color: study.color }}
        >
          {study.metric}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {study.tags.map((tag) => (
            <span key={tag} className="badge-pill text-xs">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-2 text-[#FAFAFA] font-semibold hover:text-[#8B5CF6] transition-colors duration-200 group"
        >
          Read case study
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </FadeIn>
    </div>
  );
}

const REAL_WORK = CASE_STUDIES.filter((s) => (s as typeof s & { realWork?: boolean }).realWork);

export function WorkSection() {
  return (
    <section className="section-padding bg-[#09090B]" id="work">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <FadeIn>
            <p className="section-label mb-4">Proven work</p>
          </FadeIn>
          <TextReveal as="h2" className="text-display font-bold mb-5">
            Projects that speak louder than pitches
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg">
              Real clients, real products, live in the world — and the results that came with it.
            </p>
          </FadeIn>
        </div>

        {/* Real client work */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {REAL_WORK.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.2} className="mt-16 text-center">
          <Link href="/work" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#FAFAFA] font-medium transition-colors group">
            See all case studies
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
