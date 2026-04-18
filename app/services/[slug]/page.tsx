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
  const title = `${service.title} Company India | Teklin`;
  const description = `${service.description} Teklin delivers expert ${service.title.toLowerCase()} services across India. Get a free consultation.`;
  return {
    title,
    description,
    keywords: [
      `${service.title.toLowerCase()} India`,
      `${service.title.toLowerCase()} company India`,
      `${service.shortTitle.toLowerCase()} services India`,
      "software development company India",
      "Teklin",
    ],
    alternates: { canonical: `https://teklin.in/services/${slug}` },
    openGraph: { title, description, url: `https://teklin.in/services/${slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
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
  "mvp-development": [
    { q: "What is included in an MVP engagement?", a: "We cover product discovery, UX design, full-stack engineering, QA, and deployment. You receive a production-ready product — not a prototype — that is ready for real users." },
    { q: "How quickly can you ship an MVP?", a: "Most MVPs ship in 6–10 weeks depending on scope. We scope tightly in the discovery phase to keep timelines predictable." },
    { q: "How do you decide what goes into the MVP?", a: "We run a scoping workshop to identify the single core job-to-be-done, cut scope to the essentials, and prioritise ruthlessly so you can learn from real users fast." },
    { q: "Can the MVP be scaled after launch?", a: "Yes. We build MVPs with a production-grade architecture so the codebase can grow with you rather than needing a rewrite once you find product–market fit." },
    { q: "Do you help with investor demos?", a: "Absolutely. We have helped founders prepare polished demos for seed and Series A rounds, including demo-specific flows and pitch deck integration." },
  ],
  "fintech-software": [
    { q: "What FinTech products do you build?", a: "Payment platforms, lending systems, investment dashboards, expense management tools, open banking integrations, and fraud detection pipelines." },
    { q: "How do you handle security in FinTech products?", a: "We implement encryption at rest and in transit, role-based access control, audit trails, tokenisation for card data, and regular penetration testing." },
    { q: "Which payment gateways do you integrate?", a: "Razorpay, Stripe, PayU, Cashfree, PayPal, and custom bank integrations via APIs. We can also build direct NEFT/RTGS/IMPS integration for Indian banks." },
    { q: "Can you help with RBI compliance?", a: "We work with your compliance team to implement PCI-DSS controls, data localisation requirements, and audit logging appropriate for RBI-regulated products." },
    { q: "How do you handle high-volume transaction systems?", a: "We design for idempotency, distributed queues, optimistic locking, and horizontal scaling so transaction throughput can grow without compromising reliability." },
  ],
  "healthcare-software": [
    { q: "What types of healthcare software do you build?", a: "Patient portals, teleconsultation platforms, appointment scheduling, EMR/EHR integrations, remote monitoring apps, and clinic operations suites." },
    { q: "How do you approach HIPAA-conscious architecture?", a: "We implement access controls, audit logging, encrypted data storage, and role-based permissions. We work alongside your legal and compliance teams on the specific requirements for your jurisdiction." },
    { q: "Can you integrate with existing EMR systems?", a: "Yes. We have experience with HL7, FHIR APIs, and custom EMR vendor integrations. We handle the mapping and transformation layer so your product speaks the right language." },
    { q: "Do you build for both web and mobile?", a: "Yes. Most healthcare products we build have both a web console for clinicians and a mobile app for patients, sharing a common backend." },
    { q: "How do you handle sensitive patient data?", a: "Data minimisation, field-level encryption, strict access logging, and role-based visibility are standard in all our healthcare products." },
  ],
  "ecommerce-development": [
    { q: "What types of e-commerce solutions do you build?", a: "Headless storefronts, marketplace platforms, B2C and B2B commerce, subscription commerce, and custom checkout flows." },
    { q: "Do you work with existing platforms like Shopify or WooCommerce?", a: "Yes. We build custom themes, apps, and integrations on top of existing platforms, or build fully custom headless storefronts when more flexibility is required." },
    { q: "How do you optimise conversion rates?", a: "We focus on Core Web Vitals, streamlined checkout flows, mobile-first design, cart abandonment recovery, and A/B testing infrastructure from day one." },
    { q: "Which payment gateways do you integrate?", a: "Razorpay, Stripe, PayU, Cashfree, and regional payment methods. We also handle GST-compliant invoice generation for Indian businesses." },
    { q: "Can you handle high-traffic seasonal spikes?", a: "Yes. We design with auto-scaling, edge caching, and CDN delivery so performance stays consistent during peak sale periods." },
  ],
  "legacy-modernization": [
    { q: "How do you approach legacy modernisation without disruption?", a: "We use the strangler fig pattern — gradually replacing legacy components with modern equivalents while keeping the existing system running. No big-bang rewrites." },
    { q: "What legacy systems have you modernised?", a: "Monolithic Java and .NET applications, PHP legacy systems, desktop apps migrated to web, and data warehouses moved to modern cloud architectures." },
    { q: "How long does a modernisation project take?", a: "It depends on system complexity, but we typically deliver value in phases — the first phase usually ships within 8–12 weeks and demonstrates measurable improvement." },
    { q: "Will my data be safe during migration?", a: "We run parallel systems during transition, implement robust rollback plans, and do extensive data validation before cutting over." },
    { q: "Do you document the existing system first?", a: "Yes. We always audit and document the legacy system before touching it — understanding what exists is the foundation for a safe migration." },
  ],
  "dedicated-teams": [
    { q: "How does a dedicated team engagement work?", a: "You get a fully managed team of developers, designers, and QA engineers working exclusively on your product. We handle hiring, onboarding, HR, and team management." },
    { q: "What team sizes are available?", a: "From 2-person pods to 15+ person product teams. We scale up or down based on your roadmap and budget." },
    { q: "How is the team managed?", a: "Each team runs in 2-week Agile sprints with weekly demos, daily standups, and a shared project tracking board you have full visibility into." },
    { q: "Can I interview team members before they start?", a: "Yes. We always introduce you to the team before the engagement begins and you have veto rights on any member you don't feel is the right fit." },
    { q: "What happens if someone leaves the team?", a: "We handle backfilling with no disruption to you. Replacement engineers receive a full handover before your current engineer rolls off." },
  ],
  "software-testing": [
    { q: "What types of testing do you cover?", a: "Unit testing, integration testing, end-to-end testing, performance and load testing, security testing, and accessibility audits." },
    { q: "Do you write tests for existing codebases?", a: "Yes. We regularly come in to add test coverage to legacy or under-tested codebases, starting with the most critical and risky paths." },
    { q: "What testing frameworks do you use?", a: "Jest, Vitest, Playwright, Cypress, Pytest, k6 for load testing, and OWASP ZAP for security scanning — chosen based on your tech stack." },
    { q: "How do you integrate testing into CI/CD?", a: "We set up automated test suites that run on every pull request with clear pass/fail gates, coverage reports, and notification hooks." },
    { q: "Can you do a one-time testing audit?", a: "Yes. We offer a fixed-scope QA audit that produces a prioritised list of gaps and recommendations, which you can act on internally or with our help." },
  ],
  "product-discovery": [
    { q: "What happens in a Product Discovery Workshop?", a: "We spend 3–10 days with your team doing user interviews, assumption mapping, competitive analysis, solution ideation, and prioritised backlog creation. You leave with a validated roadmap." },
    { q: "Who should attend the workshop?", a: "Founders or product owners, key stakeholders, and ideally 2–3 representative users. We facilitate, you participate." },
    { q: "What do we get at the end?", a: "A prioritised feature backlog, architecture recommendation, UX wireframes for core flows, risk register, and an estimated timeline and budget for development." },
    { q: "Is discovery required before development?", a: "Not mandatory, but strongly recommended for products without clearly validated requirements. Discovery reduces risk and typically saves more in rework than it costs." },
    { q: "Can the discovery deliverables be used with another development team?", a: "Yes. Our discovery output is fully portable — specifications, wireframes, and architecture docs that any competent team can work from." },
  ],
  "edtech-software": [
    { q: "What kinds of EdTech products do you build?", a: "Learning management systems, cohort-based course platforms, assessment tools, live class and webinar platforms, and teacher analytics dashboards." },
    { q: "Do you support offline learning?", a: "Yes. We have built offline-first mobile apps that sync content when connectivity is restored — critical for learners in low-bandwidth regions." },
    { q: "How do you approach learner engagement?", a: "Gamification, progress streaks, cohort leaderboards, push notifications, and personalised content recommendations based on learning history." },
    { q: "Can you integrate with existing LMS platforms?", a: "Yes. We build integrations with Moodle, Canvas, Teachable, and custom LMS via LTI or REST APIs." },
    { q: "How do you handle video delivery at scale?", a: "We use CDN-backed video hosting with adaptive bitrate streaming so video loads fast on any connection speed." },
  ],
  "logistics-software": [
    { q: "What logistics software do you build?", a: "Fleet management systems, dispatch consoles, last-mile delivery apps, proof-of-delivery capture, route optimisation tools, and shipper portals." },
    { q: "Do you integrate with mapping providers?", a: "Yes. We integrate with Google Maps, Mapbox, HERE, and OpenStreetMap depending on cost and accuracy requirements." },
    { q: "How do you handle real-time tracking?", a: "We use WebSocket or SSE for real-time location updates, PostGIS for geospatial queries, and background location services in mobile apps." },
    { q: "Can you integrate with existing ERP or WMS systems?", a: "Yes. We have experience integrating with SAP, Oracle WMS, Zoho, and custom ERP systems via REST or message queues." },
    { q: "How do you handle scale across multiple depots or regions?", a: "We design multi-tenant or multi-region architectures from the start, with configurable rules per depot and centralised reporting." },
  ],
  "real-estate-software": [
    { q: "What real estate software do you build?", a: "Property search portals, agent CRM systems, listing syndication tools, virtual tour platforms, lead routing engines, and property management systems." },
    { q: "Do you integrate with listing portals?", a: "Yes. We integrate with MagicBricks, 99acres, Housing.com, Zillow, and custom MLS feeds depending on your market." },
    { q: "How do you build effective property search?", a: "Faceted filters, map-based search with clustering, saved searches with alerts, and relevance-ranked results based on user behaviour." },
    { q: "Can you build a CRM for real estate agents?", a: "Yes. We build CRMs with lead capture, pipeline stages, automated follow-ups, document management, and performance dashboards for agents." },
    { q: "How do you handle high-volume listing updates?", a: "We use async ingestion pipelines with deduplication, validation, and incremental indexing so listing updates appear in near real-time." },
  ],
  "graphic-design": [
    { q: "What graphic design services do you offer?", a: "Brand identity (logo, colour, typography), UI design assets, marketing collateral, social media templates, pitch deck design, and icon sets." },
    { q: "Do you work within an existing brand?", a: "Yes. We can extend and apply an existing brand system or create a new one from scratch — both are common requests." },
    { q: "What formats do you deliver?", a: "We deliver source files (Figma, Adobe Illustrator, Photoshop) plus export-ready assets in all required formats (SVG, PNG, PDF, WebP)." },
    { q: "Can you design UI components for our dev team?", a: "Yes. We deliver production-ready Figma components with precise specs, tokens, and hand-off notes that your developers can implement without guessing." },
    { q: "How long does a brand identity project take?", a: "A focused brand identity project typically takes 2–3 weeks from briefing to final delivery, including two rounds of revisions." },
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
