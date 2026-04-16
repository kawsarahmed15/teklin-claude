"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE_EMAIL } from "@/lib/constants";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Culture", href: "/about#culture" },
  ],
  Services: [
    { label: "Custom Software", href: "/services/custom-software-development" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-app-development" },
    { label: "AI & ML", href: "/services/ai-machine-learning" },
    { label: "SaaS Products", href: "/services/saas-product-development" },
    { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Enterprise", href: "/services/enterprise-software" },
    { label: "Digital Transformation", href: "/services/digital-transformation" },
  ],
  Resources: [
    { label: "Blog", href: "/insights" },
    { label: "Case Studies", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: "https://twitter.com", label: "Twitter", title: "X / Twitter" },
  { icon: ExternalLink, href: "https://linkedin.com", label: "LinkedIn", title: "LinkedIn" },
  { icon: ExternalLink, href: "https://github.com", label: "GitHub", title: "GitHub" },
  { icon: Mail, href: `mailto:${SITE_EMAIL}`, label: "Email", title: "Email" },
];

export function Footer() {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showMatrixRain, setShowMatrixRain] = useState(false);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setLogoClickCount(0);
      triggerMatrixRain();
    }
  };

  const triggerMatrixRain = () => {
    setShowMatrixRain(true);
    setTimeout(() => setShowMatrixRain(false), 3500);
  };

  return (
    <footer className="relative border-t border-[#27272A] bg-[#09090B] dark:bg-[#09090B] light:bg-white overflow-hidden">
      {/* Matrix Rain Easter Egg */}
      {showMatrixRain && <MatrixRain />}

      {/* Gradient top border */}
      <div className="gradient-divider" />

      {/* CTA Section */}
      <div className="container-custom py-20 text-center border-b border-[#18181B]">
        <FadeIn>
          <p className="section-label mb-4">Ready to start?</p>
          <h2 className="text-display font-bold mb-6 max-w-3xl mx-auto">
            Let&apos;s build something{" "}
            <span className="gradient-text">extraordinary</span>.
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-10 max-w-xl mx-auto">
            Tell us about your project. We&apos;ll get back to you within 24 hours.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <MagneticButton>
            <Link href="/contact" className="btn-gradient text-base">
              Start a Project <ArrowRight size={18} />
            </Link>
          </MagneticButton>
        </FadeIn>
      </div>

      {/* Main footer grid */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div onClick={handleLogoClick} className="cursor-pointer inline-block mb-6">
              <Logo size="md" />
            </div>
            <p className="text-[#71717A] text-sm leading-relaxed max-w-xs mb-6">
              Full-spectrum software development company. We design, build, and scale digital
              products that users love and businesses depend on.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, title }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className="px-3 py-1.5 rounded-full border border-[#3F3F46] text-[#71717A] hover:text-[#FAFAFA] hover:border-[#8B5CF6] transition-colors duration-200 text-xs font-medium"
                >
                  {title === "Email" ? <Mail size={14} /> : title}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4 tracking-wide">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#18181B]">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#52525B]">
          <p>© {new Date().getFullYear()} Teklin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#A1A1AA] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#A1A1AA] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MatrixRain() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const columns = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-[#09090B]/90">
      {columns.map((col) => (
        <div
          key={col}
          className="absolute top-0 text-[#10B981] text-xs font-mono"
          style={{
            left: `${(col / 30) * 100}%`,
            animation: `matrix-fall ${1.5 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {Array.from({ length: 20 }, (_, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.05 }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </div>
      ))}
      <style>{`
        @keyframes matrix-fall {
          from { transform: translateY(-100%); }
          to { transform: translateY(100vh); }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[#10B981] text-2xl font-mono font-bold tracking-widest animate-pulse">
          TEKLIN
        </p>
      </div>
    </div>
  );
}
