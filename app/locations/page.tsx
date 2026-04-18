import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { MapPin, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { LOCATIONS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Software Development Company Locations Across India | Teklin",
  description:
    "Teklin provides top-rated software development services across 60+ cities in India — from metro cities like Bengaluru, Mumbai & Delhi to every district of Assam. Find your city.",
  keywords: [
    "software development company India",
    "software company locations India",
    "IT company India cities",
    "software development Assam",
    "software company Northeast India",
    "web development company India",
    "Teklin locations",
  ],
  alternates: { canonical: `${SITE_URL}/locations` },
  openGraph: {
    title: "Software Development Company Locations Across India | Teklin",
    description: "Teklin delivers software development services across 60+ Indian cities. Custom software, mobile apps, AI/ML, SaaS & web development wherever you are.",
    url: `${SITE_URL}/locations`,
    type: "website",
  },
};

const metroSlugs = ["bengaluru", "mumbai", "delhi", "hyderabad", "chennai", "pune", "kolkata", "ahmedabad"];
const metros = LOCATIONS.filter((l) => metroSlugs.includes(l.slug));
const tier2 = LOCATIONS.filter((l) => l.type === "tier2");
const assamCities = LOCATIONS.filter((l) => l.type === "assam");
const statePages = LOCATIONS.filter((l) => l.type === "state");

export default function LocationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
        ],
      },
      {
        "@type": "WebPage",
        name: "Software Development Company Locations in India",
        url: `${SITE_URL}/locations`,
        description: "Teklin serves businesses across 60+ Indian cities with custom software, mobile app, web development, AI/ML and SaaS solutions.",
      },
    ],
  };

  return (
    <>
      <Script id="locations-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[#71717A]">
            <Link href="/" className="hover:text-[#FAFAFA] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#A1A1AA]">Locations</span>
          </nav>

          <FadeIn>
            <div className="inline-flex items-center gap-2 badge-pill mb-5">
              <MapPin size={14} />
              <span>Serving 60+ cities across India</span>
            </div>
          </FadeIn>

          <TextReveal as="h1" className="text-display font-bold mb-6 max-w-3xl">
            Software Development Company Across India
          </TextReveal>

          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
              Teklin delivers custom software, mobile apps, AI/ML, SaaS, and web development to businesses in every major city and every corner of Assam — fully remote, fully dedicated.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Metro Cities */}
      <section className="section-padding bg-[#09090B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold text-[#FAFAFA] mb-2">Metro & Major Cities</h2>
            <p className="text-[#71717A] mb-8">India&apos;s largest tech and business hubs.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metros.map((loc, i) => (
              <FadeIn key={loc.slug} delay={i * 0.06}>
                <Link href={`/locations/${loc.slug}`} className="card-dark block group">
                  <div className="flex items-start justify-between mb-2">
                    <MapPin size={16} className="text-[#8B5CF6] mt-0.5" />
                    <ArrowRight size={14} className="text-[#3F3F46] group-hover:text-[#8B5CF6] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#FAFAFA] group-hover:text-[#8B5CF6] transition-colors">{loc.name}</h3>
                  <p className="text-xs text-[#71717A] mt-0.5">{loc.state}</p>
                  <p className="text-xs text-[#52525B] mt-1 italic">{loc.tagline}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {loc.industries.slice(0, 2).map((ind) => (
                      <span key={ind} className="badge-pill text-xs py-0.5">{ind}</span>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tier-2 Cities */}
      <section className="py-14 bg-[#111113] border-y border-[#18181B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold text-[#FAFAFA] mb-2">Tier-2 Cities</h2>
            <p className="text-[#71717A] mb-8">Growing business hubs across India.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tier2.map((loc, i) => (
              <FadeIn key={loc.slug} delay={i * 0.04}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[#18181B] hover:border-[#8B5CF640] hover:bg-[#8B5CF608] transition-all duration-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#8B5CF6] transition-colors">{loc.name}</p>
                    <p className="text-xs text-[#52525B]">{loc.state}</p>
                  </div>
                  <ArrowRight size={13} className="text-[#3F3F46] group-hover:text-[#8B5CF6] shrink-0 transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* State pages */}
      <section className="py-14 bg-[#09090B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold text-[#FAFAFA] mb-2">State-Level Coverage</h2>
            <p className="text-[#71717A] mb-8">Serving entire states with dedicated software solutions.</p>
          </FadeIn>
          <div className="flex flex-wrap gap-4">
            {statePages.map((loc) => (
              <FadeIn key={loc.slug}>
                <Link href={`/locations/${loc.slug}`} className="card-dark flex items-center gap-3 group">
                  <MapPin size={16} className="text-[#8B5CF6]" />
                  <div>
                    <p className="font-semibold text-[#FAFAFA] group-hover:text-[#8B5CF6] transition-colors">{loc.name}</p>
                    <p className="text-xs text-[#71717A]">{loc.tagline}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Assam towns */}
      <section className="py-14 bg-[#111113] border-t border-[#18181B]">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h2 font-bold text-[#FAFAFA] mb-2">Assam — Deep Local Coverage</h2>
            <p className="text-[#71717A] mb-8">
              Based in Karimganj, Assam — we serve every district and town across the state with deep local knowledge.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {assamCities.map((loc, i) => (
              <FadeIn key={loc.slug} delay={i * 0.03}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[#18181B] hover:border-[#06B6D440] hover:bg-[#06B6D408] transition-all duration-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#06B6D4] transition-colors">{loc.name}</p>
                    <p className="text-xs text-[#52525B]">Assam</p>
                  </div>
                  <ArrowRight size={13} className="text-[#3F3F46] group-hover:text-[#06B6D4] shrink-0 transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h1 font-bold text-[#FAFAFA] mb-4">
              Don&apos;t see your city?
            </h2>
            <p className="text-[#A1A1AA] mb-8 max-w-md mx-auto">
              We serve businesses across all of India. Wherever you are, we&apos;re ready to build.
            </p>
            <Link href="/contact" className="btn-primary inline-flex">
              Contact us <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
