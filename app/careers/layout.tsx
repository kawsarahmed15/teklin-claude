import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Teklin — Join Our Software Engineering Team | Remote India",
  description:
    "Join Teklin's world-class engineering team. We're hiring Senior Full-Stack Engineers, UI/UX Designers, DevOps Engineers, and AI/ML Engineers. Remote-first, India-based software company.",
  keywords: [
    "software engineering jobs India",
    "remote software developer jobs India",
    "IT jobs Assam",
    "full stack developer jobs India",
    "UI UX designer jobs India",
    "Teklin careers",
    "software company jobs India",
  ],
  alternates: { canonical: "https://teklin.in/careers" },
  openGraph: {
    title: "Careers at Teklin — Join Our Engineering Team",
    description: "We're hiring engineers, designers, and AI specialists. Remote-first, India-based.",
    url: "https://teklin.in/careers",
    type: "website",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
