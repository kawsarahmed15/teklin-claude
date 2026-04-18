import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work — Software Development Portfolio & Case Studies | Teklin",
  description:
    "Explore Teklin's software development portfolio: real projects, real clients, real results. Case studies across FinTech, HealthTech, E-commerce, EdTech, Logistics, and more.",
  keywords: [
    "software development portfolio India",
    "software case studies India",
    "web development portfolio",
    "mobile app portfolio India",
    "SaaS case studies",
    "IT company work India",
    "Teklin portfolio",
    "Bazarkart", "Bibbox B2B", "Gym Tym",
  ],
  alternates: { canonical: "https://teklin.in/work" },
  openGraph: {
    title: "Our Work — Software Development Portfolio | Teklin",
    description: "Real projects, real clients, real results. Case studies across FinTech, HealthTech, E-commerce & more.",
    url: "https://teklin.in/work",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Teklin — Software Portfolio", description: "Real projects, real results. Case studies in FinTech, HealthTech, E-commerce & more." },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
