import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Development Process — Agile Software Delivery | Teklin",
  description:
    "Learn how Teklin delivers software projects: Discovery & Strategy → Architecture → Agile Development → QA → Launch → Scale. Transparent, sprint-based delivery with results every 2 weeks.",
  keywords: [
    "software development process India",
    "agile software development India",
    "software delivery process",
    "sprint-based development",
    "Teklin development process",
  ],
  alternates: { canonical: "https://teklin.in/process" },
  openGraph: {
    title: "Our Software Development Process | Teklin",
    description: "Discovery → Architecture → Agile Dev → QA → Launch → Scale. See working software every 2 weeks.",
    url: "https://teklin.in/process",
    type: "website",
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
