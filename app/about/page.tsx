import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { CountUp } from "@/components/animations/CountUp";

export const metadata: Metadata = {
  title: "About Teklin — Software Development Company India | Our Story & Team",
  description:
    "Learn about Teklin — India's trusted software development company. Our team of engineers, designers, and strategists has served 240+ businesses with custom software, mobile apps, SaaS, and AI/ML solutions.",
  keywords: [
    "about Teklin",
    "software development company India team",
    "IT company Assam",
    "software engineers India",
    "custom software company about",
    "Teklin about us",
  ],
  alternates: { canonical: "https://teklin.in/about" },
  openGraph: {
    title: "About Teklin — India's Software Development Partner",
    description: "240+ businesses served. Our team engineers digital products that move industries forward.",
    url: "https://teklin.in/about",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "About Teklin", description: "India's trusted software development company. 240+ businesses served." },
};

const VALUES = [
  {
    title: "Engineering Excellence",
    description: "We hold ourselves to an uncompromising standard. Clean code, thorough tests, thoughtful architecture — every time.",
    emoji: "⚡",
  },
  {
    title: "User-Centered Design",
    description: "We build for the humans who will actually use the software. User research and usability testing are non-negotiable.",
    emoji: "👥",
  },
  {
    title: "Radical Transparency",
    description: "No surprises. We share progress, problems, and opinions openly. You'll always know exactly where your project stands.",
    emoji: "🔍",
  },
  {
    title: "Continuous Innovation",
    description: "We keep learning, experimenting, and improving — both in what we build and how we build it.",
    emoji: "🚀",
  },
  {
    title: "Impact-Driven",
    description: "Code is a means, not an end. We measure success by the business outcomes and user experiences we create.",
    emoji: "🎯",
  },
];

const TEAM = [
  { name: "Arjun Mehta", role: "CEO & Co-founder", initials: "AM", color: "#8B5CF6" },
  { name: "Sarah Chen", role: "CTO & Co-founder", initials: "SC", color: "#06B6D4" },
  { name: "Marcus Patel", role: "VP Engineering", initials: "MP", color: "#10B981" },
  { name: "Leila Hassan", role: "Head of Design", initials: "LH", color: "#F97316" },
  { name: "David Kim", role: "Lead AI Engineer", initials: "DK", color: "#3B82F6" },
  { name: "Priya Singh", role: "Engineering Manager", initials: "PS", color: "#8B5CF6" },
  { name: "James Wu", role: "Senior DevOps", initials: "JW", color: "#06B6D4" },
  { name: "Nadia Torres", role: "Product Designer", initials: "NT", color: "#F59E0B" },
];

const COMPANY_STATS = [
  { value: 240, suffix: "+", label: "Businesses Served" },
  { value: 99.99, suffix: "%", label: "Uptime Achieved" },
  { value: 60, suffix: "%", label: "Avg Latency Reduction" },
  { value: 98, suffix: "%", label: "On-Time Delivery" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10 max-w-4xl">
          <FadeIn>
            <p className="section-label mb-4">About us</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6">
            Your trusted partner in innovation and rapid growth
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              We foster startup growth by applying the best technologies and sharing our expertise,
              creating impactful solutions to improve lives. Based in Karimganj, Assam, India —
              serving clients worldwide in English, Hindi, and Assamese.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Origin story */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="text-h2 font-bold mb-4">Our story</h2>
              <div className="space-y-4 text-[#A1A1AA] leading-relaxed">
                <p>
                  Teklin was born from a simple belief: every startup and growing business
                  deserves access to world-class software engineering — regardless of size or location.
                </p>
                <p>
                  Founded in Karimganj, Assam, India, we set out to bridge the gap between
                  ambitious founders and the technology expertise they need to turn ideas into
                  impactful, scalable products.
                </p>
                <p>
                  Today, we have served 240+ businesses, achieved 99.99% uptime across
                  client infrastructure, and consistently delivered on time — partnering with
                  startups and enterprises across India and globally.
                </p>
                <p>
                  Our mission: foster startup growth by applying the best technologies and
                  sharing our expertise, creating impactful solutions to improve lives.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} variant="slideRight">
              <div className="grid grid-cols-2 gap-4">
                {COMPANY_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="card-dark text-center"
                  >
                    <p className="text-3xl font-bold gradient-text mb-1">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm text-[#71717A]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="mb-12">
            <FadeIn>
              <p className="section-label mb-4">What we believe</p>
            </FadeIn>
            <TextReveal as="h2" className="text-h1 font-bold max-w-xl">
              The principles we build by
            </TextReveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="card-dark h-full">
                  <div className="text-3xl mb-4">{value.emoji}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-[#71717A] text-sm leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]" id="team">
        <div className="container-custom">
          <div className="mb-12">
            <FadeIn>
              <p className="section-label mb-4">The people</p>
            </FadeIn>
            <TextReveal as="h2" className="text-h1 font-bold">
              Meet the team
            </TextReveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.06}>
                <div className="group card-dark text-center cursor-default">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}88)` }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-[#FAFAFA] mb-1">{member.name}</h3>
                  <p className="text-sm text-[#71717A]">{member.role}</p>

                  {/* Social links on hover */}
                  <div className="flex justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a href="#" className="p-1.5 rounded-full border border-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA]" aria-label="LinkedIn">
                      <ExternalLink size={12} />
                    </a>
                    <a href="#" className="p-1.5 rounded-full border border-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA]" aria-label="GitHub">
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]" id="culture">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-4">Life at Teklin</h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-8">
              We&apos;re a remote-first company with a strong culture of learning, ownership,
              and craft. We work across time zones, communicate async-first, and meet in
              person twice a year for planning and team building.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Remote-first", desc: "Work from anywhere" },
              { label: "Learning budget", desc: "$2,000/year per person" },
              { label: "Latest tech", desc: "Work with cutting-edge tools" },
              { label: "Flexible hours", desc: "Async-first culture" },
              { label: "Annual retreat", desc: "Team meets twice a year" },
              { label: "Growth paths", desc: "Clear career progression" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.06}>
                <div className="card-dark">
                  <p className="font-semibold mb-1">{item.label}</p>
                  <p className="text-sm text-[#71717A]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <Link href="/careers" className="btn-primary">
              View open positions <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
