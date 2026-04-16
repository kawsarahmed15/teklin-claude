"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  // Show current + next testimonial side by side
  const pair = [
    TESTIMONIALS[current],
    TESTIMONIALS[(current + 1) % TESTIMONIALS.length],
  ];

  return (
    <section className="section-padding bg-[#09090B]">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <FadeIn>
            <p className="section-label mb-4">Testimonials</p>
          </FadeIn>
          <TextReveal as="h2" className="text-display font-bold">
            What our partners say
          </TextReveal>
        </div>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {pair.map((t, idx) => (
              <motion.div
                key={`${current}-${idx}`}
                initial={{ opacity: 0, x: idx === 0 ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: idx === 0 ? 24 : -24 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.08 }}
                className="card-dark flex flex-col text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-base lg:text-lg text-[#FAFAFA] leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#FAFAFA]">{t.author}</p>
                    <p className="text-sm text-[#71717A]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <FadeIn delay={0.2} className="flex justify-center items-center gap-4">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA] hover:border-[#8B5CF6] transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300 bg-[#3F3F46]"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  backgroundColor: i === current ? "#8B5CF6" : "#3F3F46",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA] hover:border-[#8B5CF6] transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
