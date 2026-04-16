"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { easeOutExpo } from "@/lib/animations";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

// Each word occupies its own dedicated 4th line — no wrapping ever
const WORDS = ["industries", "markets", "futures", "products", "people"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 250);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Lines 1-3 are static; line 4 is the animated rotating word.
  // This guarantees exactly 4 lines with zero layout shift.
  const staticLines = ["We engineer", "software that", "moves"];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#09090B] dark:bg-[#09090B]"
      aria-labelledby="hero-headline"
    >
      <div className="mesh-gradient" aria-hidden />

      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-70">
        <HeroScene />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,250,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="container-custom relative z-10 text-center lg:text-left pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="inline-flex items-center gap-2 badge-pill mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Available for new projects in 2026
          </motion.div>

          {/* Headline — always exactly 4 lines */}
          <h1
            id="hero-headline"
            className="text-hero font-bold leading-none mb-6"
            aria-label={`We engineer software that moves ${WORDS[wordIndex]}`}
          >
            {staticLines.map((line, li) => (
              <motion.div
                key={li}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 + li * 0.12 }}
                className="block"
              >
                {line}
              </motion.div>
            ))}

            {/* Line 4: animated word alone — never wraps regardless of length */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.46 }}
              className="block"
            >
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className="gradient-text"
              >
                {WORDS[wordIndex]}.
              </motion.span>
            </motion.div>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.6 }}
            className="text-[#A1A1AA] text-lg leading-relaxed mb-10 max-w-xl"
          >
            From startups to enterprises, we design, build, and scale digital
            products that users love and businesses depend on.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12"
          >
            <MagneticButton>
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Start Your Project <ArrowRight size={18} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/work" className="btn-secondary text-base px-8 py-4">
                Explore Our Work
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-3 text-sm text-[#71717A]"
          >
            <div className="flex -space-x-2">
              {["SC", "MW", "PN", "JO"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#09090B] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${i % 2 === 0 ? "#8B5CF6" : "#06B6D4"}, ${i % 2 === 0 ? "#06B6D4" : "#8B5CF6"})`,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>Trusted by 50+ companies worldwide</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#52525B] text-xs tracking-widest uppercase"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#3F3F46] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#8B5CF6]" />
        </motion.div>
        Scroll
      </motion.div>
    </section>
  );
}
