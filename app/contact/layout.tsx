import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Teklin — Start Your Software Project | Free Discovery Call",
  description:
    "Get in touch with Teklin to start your software project. Free discovery call, no-obligation estimate, NDA before we talk. Build custom software, mobile apps, SaaS & AI solutions with us.",
  keywords: [
    "contact software development company India",
    "hire software developers India",
    "software development quote India",
    "custom software project India",
    "Teklin contact",
    "software development consultation India",
  ],
  alternates: { canonical: "https://teklin.in/contact" },
  openGraph: {
    title: "Contact Teklin — Start Your Software Project",
    description: "Free discovery call. No-obligation estimate. NDA before we talk. Let's build something great.",
    url: "https://teklin.in/contact",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Contact Teklin", description: "Start your software project. Free discovery call, no obligation." },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
