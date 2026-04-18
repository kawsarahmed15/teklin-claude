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
  title: "Teklin — Software Development Company India | Web, Mobile, AI & SaaS",
  description:
    "Teklin is India's full-spectrum software development company. We design, build, and scale custom software, mobile apps, SaaS, AI/ML, and web applications. 240+ businesses served. 98% on-time delivery.",
  keywords: [
    "software development company India",
    "custom software development India",
    "web development company India",
    "mobile app development India",
    "SaaS development company India",
    "AI ML development India",
    "software company Assam",
    "IT company India",
    "Teklin",
    "software development Bengaluru",
    "software development Mumbai",
  ],
  alternates: { canonical: "https://teklin.in" },
  openGraph: {
    title: "Teklin — Software Development Company India",
    description: "Full-spectrum software development: custom software, mobile apps, SaaS, AI/ML, and web apps. 240+ businesses served across India.",
    url: "https://teklin.in",
    type: "website",
    images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Teklin — Software Development Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teklin — Software Development Company India",
    description: "Custom software, mobile apps, SaaS, AI/ML & web development. 240+ clients. 98% on-time.",
    images: ["/og-home.png"],
  },
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
