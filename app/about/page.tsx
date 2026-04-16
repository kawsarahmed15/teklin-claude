import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { CountUp } from "@/components/animations/CountUp";

export const metadata: Metadata = {
  title: "About — A Team That Cares About Craft",
  description:
    "Teklin is a software development company founded on the belief that great engineering and thoughtful design are the most powerful competitive advantages.",
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
  { value: 2016, suffix: "", label: "Founded" },
  { value: 35, suffix: "+", label: "Team members" },
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 12, suffix: "", label: "Countries served" },
  { value: 97, suffix: "%", label: "Client retention" },
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
            A team that cares about craft
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
              We&apos;re a team of engineers, designers, and problem-solvers who believe
              that great software is one of the most powerful forces for change in
              business and society.
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
                  Teklin was founded in 2016 with a simple premise: the best software
                  companies in the world shouldn&apos;t have a monopoly on great engineering.
                </p>
                <p>
                  We started as a two-person consultancy — two engineers who were tired
                  of seeing promising startups and established businesses fail not because
                  their ideas were bad, but because their software was.
                </p>
                <p>
                  Eight years later, we&apos;re a 35-person team that has shipped over 150
                  products, built long-term partnerships with clients across 12 countries,
                  and maintained a 97% client retention rate.
                </p>
                <p>
                  Our mission hasn&apos;t changed: help organisations build software that
                  users love and businesses depend on.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} variant="slideRight">
              <div className="grid grid-cols-2 gap-4">
                {COMPANY_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`card-dark text-center ${i === 0 ? "col-span-2" : ""}`}
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
