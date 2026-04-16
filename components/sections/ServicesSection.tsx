"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2, Globe, Smartphone, Brain, Layers, Cloud,
  Pen, Building2, Zap, ArrowRight, ArrowUpRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, Globe, Smartphone, Brain, Layers, Cloud, Pen, Building2, Zap,
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-[#09090B]" id="services">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <FadeIn>
            <p className="section-label mb-4">What we do</p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="text-display font-bold mb-5"
          >
            Full-spectrum software development
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg leading-relaxed">
              End-to-end capabilities across design, engineering, and infrastructure.
              Whatever stage you&apos;re at, we have the expertise to take you further.
            </p>
          </FadeIn>
        </div>

        {/* Bento grid */}
        <div className="bento-grid">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const isFeatured = service.featured;

            return (
              <FadeIn
                key={service.slug}
                delay={i * 0.06}
                className={cn(isFeatured && "lg:col-span-2")}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="card-dark block h-full group"
                  data-cursor="View"
                >
                  <div className="flex flex-col h-full gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#27272A] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#8B5CF6]/20">
                      <Icon
                        size={22}
                        className="text-[#8B5CF6] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-[#FAFAFA]">
                        {service.title}
                      </h3>
                      <p className="text-[#71717A] text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-[#52525B] group-hover:text-[#8B5CF6] transition-colors duration-200 text-sm font-medium gap-1">
                      Learn more
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn delay={0.4} className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#FAFAFA] font-medium transition-colors duration-200 group"
          >
            View all services
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
