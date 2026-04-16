import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Teklin — Software Development Company",
  description:
    "We engineer software that moves industries forward. From startups to enterprises — design, build, and scale digital products.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <TestimonialsSection />
      <TechStackSection />
      <CtaSection />
    </>
  );
}
