import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowRight, MapPin, CheckCircle2, Phone, Mail, Star, TrendingUp, Users, Clock, Shield } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
// Note: TextReveal only accepts plain string children; dynamic headings use plain <h*> elements
import { CtaSection } from "@/components/sections/CtaSection";
import { LOCATIONS, SERVICES, SITE_URL, SITE_EMAIL, SITE_PHONE } from "@/lib/constants";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = LOCATIONS.find((l) => l.slug === city);
  if (!location) return {};

  const title = `Software Development Company in ${location.name} | Teklin`;
  const description = `Teklin is a top-rated software development company serving businesses in ${location.name}, ${location.state}. Custom software, mobile apps, web development, AI/ML, SaaS & cloud solutions tailored to ${location.name} businesses.`;

  return {
    title,
    description,
    keywords: [
      `software development company in ${location.name}`,
      `software company in ${location.name}`,
      `web development company ${location.name}`,
      `mobile app development ${location.name}`,
      `IT company in ${location.name}`,
      `custom software ${location.name}`,
      `SaaS development ${location.name}`,
      `app development company ${location.name}`,
      `software company ${location.state}`,
      "Teklin",
    ],
    alternates: {
      canonical: `${SITE_URL}/locations/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/locations/${location.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const FEATURED_SERVICES = [
  { slug: "custom-software-development", title: "Custom Software Development", icon: "💻", desc: "Bespoke solutions engineered for your exact requirements." },
  { slug: "web-development", title: "Web Development", icon: "🌐", desc: "Fast, accessible Next.js and React web applications." },
  { slug: "mobile-app-development", title: "Mobile App Development", icon: "📱", desc: "Native and cross-platform iOS & Android apps." },
  { slug: "ai-machine-learning", title: "AI & Machine Learning", icon: "🤖", desc: "LLM integrations and ML pipelines for competitive edge." },
  { slug: "saas-product-development", title: "SaaS Development", icon: "☁️", desc: "End-to-end SaaS with multi-tenancy, billing, and onboarding." },
  { slug: "ui-ux-design", title: "UI/UX Design", icon: "🎨", desc: "Research-driven design systems that delight users." },
];

const WHY_TEKLIN = [
  { icon: <Star size={20} />, title: "Proven Track Record", desc: "240+ businesses served with 98% on-time delivery." },
  { icon: <TrendingUp size={20} />, title: "Results-Driven", desc: "We measure success by your business outcomes, not just deliverables." },
  { icon: <Users size={20} />, title: "Dedicated Teams", desc: "You get a consistent team, not rotating freelancers." },
  { icon: <Clock size={20} />, title: "Rapid Delivery", desc: "MVPs in 6–10 weeks. Production-ready, not prototype." },
  { icon: <Shield size={20} />, title: "IP Ownership", desc: "All code and IP is fully transferred to you at project completion." },
  { icon: <CheckCircle2 size={20} />, title: "Post-Launch Support", desc: "We stay on as your technology partner after go-live." },
];

const FAQ = [
  {
    q: "Do you work with businesses in [CITY] remotely?",
    a: "Yes. We work fully remotely with clients across India and globally. Our clients in [CITY] get the same dedicated team, sprint reviews, and communication as our in-person partnerships."
  },
  {
    q: "What software development services do you offer in [CITY]?",
    a: "We offer the full spectrum: custom software, web apps, mobile apps, AI/ML integration, SaaS product development, UI/UX design, cloud & DevOps, and enterprise software — serving [CITY] businesses across industries."
  },
  {
    q: "How much does software development cost for a [CITY] business?",
    a: "Costs vary by scope. A typical MVP ranges ₹8L–₹25L; a full SaaS platform from ₹25L–₹80L+. We provide a detailed estimate after a free discovery call — no obligation."
  },
  {
    q: "How long does a software project take?",
    a: "MVPs take 6–10 weeks; full platforms 12–24 weeks. We use 2-week Agile sprints so you see working software every fortnight, not just at the end."
  },
  {
    q: "Do you sign NDAs before discussing our project?",
    a: "Absolutely. We sign an NDA before any detailed discussion and an IP assignment agreement before development begins. Your idea is protected."
  },
];

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = LOCATIONS.find((l) => l.slug === city);
  if (!location) notFound();

  const { name, state, tagline, industries, type } = location;
  const locationLabel = type === "state" ? name : `${name}, ${state}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/locations/${location.slug}#business`,
        name: "Teklin",
        description: `Software development company serving businesses in ${locationLabel}.`,
        url: `${SITE_URL}/locations/${location.slug}`,
        telephone: SITE_PHONE,
        email: SITE_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: name,
          addressRegion: state,
          addressCountry: "IN",
        },
        areaServed: { "@type": "Place", name: locationLabel },
        priceRange: "₹₹₹",
        sameAs: [
          "https://facebook.com/profile.php?id=61571269328546",
          "https://instagram.com/teklin.in",
          "https://x.com/Teklin_in",
          "https://linkedin.com/company/teklin/",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
          { "@type": "ListItem", position: 3, name: `Software Company in ${name}`, item: `${SITE_URL}/locations/${location.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q.replace(/\[CITY\]/g, name),
          acceptedAnswer: { "@type": "Answer", text: a.replace(/\[CITY\]/g, name) },
        })),
      },
    ],
  };

  return (
    <>
      <Script id="location-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[#71717A]">
            <Link href="/" className="hover:text-[#FAFAFA] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-[#FAFAFA] transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-[#A1A1AA]">{name}</span>
          </nav>

          <FadeIn>
            <div className="inline-flex items-center gap-2 badge-pill mb-5">
              <MapPin size={14} />
              <span>{locationLabel} · {tagline}</span>
            </div>
          </FadeIn>

          <h1 className="text-display font-bold mb-6 max-w-4xl text-[#FAFAFA]">
            Software Development Company in {name}
          </h1>

          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-2xl leading-relaxed mb-8">
              Teklin delivers custom software, mobile apps, AI/ML, SaaS, and web development to businesses in {locationLabel}. From startups to enterprises — we engineer digital products that drive real growth.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link href="/work" className="btn-secondary">
              View Our Work
            </Link>
          </FadeIn>

          {/* Quick stats */}
          <FadeIn delay={0.4} className="mt-12 flex flex-wrap gap-8">
            {[
              { value: "240+", label: "Businesses Served" },
              { value: "98%", label: "On-Time Delivery" },
              { value: "6–10 wks", label: "MVP Timeline" },
              { value: "99.9%", label: "Uptime Achieved" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#FAFAFA]">{value}</div>
                <div className="text-sm text-[#71717A]">{label}</div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[#09090B]">
        <div className="container-custom">
          <FadeIn>
            <p className="section-label mb-4">What we build</p>
          </FadeIn>
          <h2 className="text-h1 font-bold mb-4 max-w-2xl text-[#FAFAFA]">
            Software Services for {name} Businesses
          </h2>
          <FadeIn delay={0.15}>
            <p className="text-[#A1A1AA] mb-12 max-w-xl">
              Whether you&apos;re a startup validating an idea or an enterprise modernising systems, we have the expertise.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_SERVICES.map((svc, i) => (
              <FadeIn key={svc.slug} delay={i * 0.08}>
                <Link href={`/services/${svc.slug}`} className="card-dark block group h-full">
                  <div className="text-3xl mb-4">{svc.icon}</div>
                  <h3 className="text-lg font-bold text-[#FAFAFA] mb-2 group-hover:text-[#8B5CF6] transition-colors">{svc.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed mb-4">{svc.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#8B5CF6] font-medium">
                    Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-8 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#FAFAFA] font-medium transition-colors">
              See all services <ArrowRight size={15} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="py-16 bg-[#111113] border-y border-[#18181B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold text-[#FAFAFA] mb-2">
              Industries We Serve in {name}
            </h2>
            <p className="text-[#71717A] mb-8">
              We build specialised software for the sectors that power {locationLabel}&apos;s economy.
            </p>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {[...industries, "FinTech", "HealthTech", "EdTech", "Logistics", "E-commerce", "SaaS"].map((ind) => (
              <span key={ind} className="badge-pill text-sm">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Teklin */}
      <section className="section-padding bg-[#09090B]">
        <div className="container-custom">
          <FadeIn>
            <p className="section-label mb-4">Why choose us</p>
          </FadeIn>
          <h2 className="text-h1 font-bold mb-4 max-w-2xl text-[#FAFAFA]">
            Why {name} Businesses Choose Teklin
          </h2>
          <FadeIn delay={0.15}>
            <p className="text-[#A1A1AA] mb-12 max-w-xl">
              We&apos;re not a body-shop. We&apos;re a product engineering partner that cares about your outcomes.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_TEKLIN.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF620] border border-[#8B5CF640] flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#FAFAFA] mb-1">{title}</h3>
                    <p className="text-sm text-[#71717A] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#111113] border-t border-[#18181B]">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <p className="section-label mb-4">FAQ</p>
            <h2 className="text-h1 font-bold text-[#FAFAFA] mb-12">
              Common questions from {name} businesses
            </h2>
          </FadeIn>
          <div className="space-y-0 divide-y divide-[#18181B]">
            {FAQ.map(({ q, a }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <details className="group py-5 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none font-semibold text-[#FAFAFA] text-base select-none">
                    <span>{q.replace(/\[CITY\]/g, name)}</span>
                    <span className="text-[#8B5CF6] shrink-0 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="mt-3 text-[#A1A1AA] leading-relaxed text-sm">
                    {a.replace(/\[CITY\]/g, name)}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <h2 className="text-h1 font-bold text-[#FAFAFA] mb-4">
                Ready to build something great in {name}?
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed mb-6">
                Tell us about your project. We&apos;ll get back within 24 hours with a tailored approach and honest scope estimate.
              </p>
              <div className="flex flex-col gap-3 text-sm text-[#A1A1AA]">
                <a href={`tel:${SITE_PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[#FAFAFA] transition-colors">
                  <Phone size={16} className="text-[#8B5CF6]" /> {SITE_PHONE}
                </a>
                <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2 hover:text-[#FAFAFA] transition-colors">
                  <Mail size={16} className="text-[#8B5CF6]" /> {SITE_EMAIL}
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="card-dark">
                <h3 className="font-semibold text-[#FAFAFA] mb-4">Get a Free Estimate</h3>
                <div className="space-y-3 mb-6">
                  {["Discovery call in 24 hours", "No-obligation project scope", "Fixed-price or time & materials", "NDA signed before we talk"].map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                      <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                      {pt}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Start the conversation <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="py-10 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <p className="text-sm text-[#52525B] mb-4">Also serving businesses in</p>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.filter((l) => l.slug !== location.slug).slice(0, 20).map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="text-xs text-[#71717A] hover:text-[#8B5CF6] transition-colors px-3 py-1 rounded-full border border-[#18181B] hover:border-[#8B5CF640]"
              >
                {l.name}
              </Link>
            ))}
            <Link href="/locations" className="text-xs text-[#8B5CF6] px-3 py-1">
              View all →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
