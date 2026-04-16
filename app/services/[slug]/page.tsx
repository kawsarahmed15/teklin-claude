import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { SERVICES, TESTIMONIALS, PROCESS_STEPS, CASE_STUDIES } from "@/lib/constants";
import { FaqAccordion } from "@/components/shared/FaqAccordion";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} Services`,
    description: service.description,
  };
}

// Per-service FAQ data
const SERVICE_FAQS: Record<string, Array<{ q: string; a: string }>> = {
  "custom-software-development": [
    { q: "What types of custom software do you build?", a: "We build everything from internal business tools and workflow automation to complex multi-tenant SaaS platforms, marketplace applications, and real-time data systems." },
    { q: "How long does a typical custom software project take?", a: "Scope varies widely, but most projects ship an MVP in 8–16 weeks. We use 2-week Agile sprints with continuous delivery so you see progress early and often." },
    { q: "Do you offer post-launch support?", a: "Yes. We offer structured maintenance retainers covering bug fixes, security patches, performance monitoring, and iterative improvements." },
    { q: "How do you handle IP and ownership?", a: "All IP created during the engagement is fully transferred to you at project completion. We sign an IP assignment agreement before any work begins." },
    { q: "Can you work with our existing codebase?", a: "Absolutely. We regularly take over from in-house teams or other agencies, and we'll audit the codebase first to surface any risks or technical debt." },
  ],
};

const DEFAULT_FAQS = [
  { q: "How do I get started?", a: "Contact us with a brief project description. We'll schedule a discovery call within 24 hours to understand your goals, timeline, and budget." },
  { q: "What does your engagement model look like?", a: "Most projects follow a fixed-scope, fixed-price model for well-defined requirements. For ongoing work we use time-and-materials with weekly reporting." },
  { q: "Do you work with startups?", a: "Yes, frequently. We understand startup constraints and can help you move from concept to a fundable MVP quickly without sacrificing engineering quality." },
  { q: "What technologies do you use?", a: "We choose technology based on what's best for your specific requirements. We're proficient across the full stack — React/Next.js, Node.js, Python, Go, AWS/GCP, and more." },
  { q: "How do you handle project communication?", a: "Each project has a dedicated Slack channel, weekly sprint reviews, and a live project dashboard so you always know exactly where things stand." },
];

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const faqs = SERVICE_FAQS[slug] ?? DEFAULT_FAQS;
  const testimonial = TESTIMONIALS[0];
  const relatedCaseStudies = CASE_STUDIES.slice(0, 2);

  const capabilities = [
    "Requirements analysis & technical scoping",
    "System architecture & database design",
    "Agile development with 2-week sprints",
    "Code reviews & automated testing",
    "CI/CD pipeline setup & deployment",
    "Performance monitoring & observability",
    "Documentation & knowledge transfer",
    "Post-launch support & iteration",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          <FadeIn>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] mb-8 transition-colors">
              <ArrowLeft size={14} /> All services
            </Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="section-label mb-4">{service.shortTitle}</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6 max-w-3xl">
            {service.title}
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-2xl leading-relaxed mb-8">
              {service.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/contact" className="btn-primary">
              Get a Quote <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <h2 className="text-h2 font-bold mb-4">What&apos;s included</h2>
              <p className="text-[#A1A1AA] leading-relaxed">
                Every engagement is scoped to your exact needs, but here&apos;s what you can
                expect from our {service.shortTitle.toLowerCase()} practice.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((cap, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-[#27272A] bg-[#18181B]">
                    <CheckCircle2 size={16} className="text-[#10B981] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#A1A1AA]">{cap}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case study previews */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-2">Related work</h2>
            <p className="text-[#A1A1AA] mb-10">Projects where we applied this expertise.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedCaseStudies.map((study, i) => (
              <FadeIn key={study.slug} delay={i * 0.1}>
                <Link href={`/work/${study.slug}`} className="card-dark block group" data-cursor="View">
                  <div
                    className="h-40 rounded-lg mb-4 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${study.color}20, #27272A)` }}
                  >
                    <span className="text-3xl font-bold opacity-30" style={{ color: study.color }}>
                      {study.title.charAt(0)}
                    </span>
                  </div>
                  <p className="badge-pill inline-flex mb-3">{study.industry}</p>
                  <h3 className="font-semibold text-lg mb-2">{study.title}</h3>
                  <p className="text-[#71717A] text-sm">{study.description}</p>
                  <p className="mt-3 text-sm font-semibold" style={{ color: study.color }}>{study.metric}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <blockquote className="card-dark text-center">
              <p className="text-xl italic text-[#FAFAFA] leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}
                >
                  {testimonial.avatar}
                </div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-[#71717A]">{testimonial.role}, {testimonial.company}</p>
              </div>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-10">Frequently asked questions</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FaqAccordion items={faqs} />
          </FadeIn>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h1 font-bold mb-4">
              Start your {service.shortTitle.toLowerCase()} project
            </h2>
            <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
              Share your requirements and we&apos;ll propose the right approach and timeline.
            </p>
            <Link href="/contact" className="btn-primary">
              Get a Quote <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
