import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Globe, Smartphone, Brain, Layers, Cloud, Pen, Building2, Zap } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Software Development Services India — Web, Mobile, AI, SaaS | Teklin",
  description:
    "Teklin offers full-spectrum software development services in India: custom software, web apps, mobile apps, AI/ML, SaaS, cloud & DevOps, UI/UX design, and enterprise software. Get a free quote.",
  keywords: [
    "software development services India",
    "custom software development services",
    "web development services India",
    "mobile app development services India",
    "AI ML services India",
    "SaaS development services",
    "cloud devops services India",
    "UI UX design services India",
    "enterprise software development",
    "IT services India",
  ],
  alternates: { canonical: "https://teklin.in/services" },
  openGraph: {
    title: "Software Development Services India | Teklin",
    description: "Custom software, web apps, mobile apps, AI/ML, SaaS, cloud & DevOps, UI/UX — full-spectrum software services across India.",
    url: "https://teklin.in/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Services India | Teklin",
    description: "Full-spectrum software services: custom software, web, mobile, AI/ML, SaaS, cloud & DevOps.",
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, Globe, Smartphone, Brain, Layers, Cloud, Pen, Building2, Zap,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          <FadeIn>
            <p className="section-label mb-4">What we do</p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="text-display font-bold mb-6 max-w-3xl"
          >
            Full-spectrum software development
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-2xl leading-relaxed">
              End-to-end capabilities across design, engineering, and infrastructure.
              Whatever stage you&apos;re at, we have the expertise to take you further.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-[#09090B]">
        <div className="container-custom">
          <div className="bento-grid">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <FadeIn
                  key={service.slug}
                  delay={i * 0.06}
                  className={cn(service.featured && "lg:col-span-2")}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-dark block h-full group"
                    data-cursor="View"
                  >
                    <div className="flex flex-col h-full gap-5 min-h-48">
                      <div className="w-12 h-12 rounded-xl bg-[#27272A] flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                        <Icon size={22} className="text-[#8B5CF6] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2 text-[#FAFAFA]">{service.title}</h2>
                        <p className="text-[#71717A] text-sm leading-relaxed">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-[#52525B] group-hover:text-[#8B5CF6] transition-colors">
                        Learn more <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#09090B]">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h1 font-bold mb-4">Not sure which service you need?</h2>
            <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
              Tell us about your project and we&apos;ll recommend the right approach.
            </p>
            <Link href="/contact" className="btn-primary">
              Talk to us
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
