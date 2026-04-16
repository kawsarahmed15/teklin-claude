"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/animations";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass py-3" : "py-5 bg-transparent"
        )}
      >
        <div className="container-custom flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#FAFAFA] bg-white/10"
                    : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5",
                  "dark:text-[#A1A1AA] dark:hover:text-[#FAFAFA]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA */}
            <MagneticButton className="hidden lg:block">
              <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
                Start a Project
                <ArrowRight size={15} />
              </Link>
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#09090B]/97 backdrop-blur-xl flex flex-col"
          >
            {/* Close button at top-right */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#A1A1AA] hover:text-[#FAFAFA]"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 pb-16 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: easeOutExpo }}
                >
                  <Link
                    href={link.href}
                    className="block text-4xl font-bold text-[#FAFAFA] py-2 hover:gradient-text transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: easeOutExpo }}
                className="mt-8"
              >
                <Link href="/contact" className="btn-primary w-full justify-center text-base py-4">
                  Start a Project <ArrowRight size={18} />
                </Link>
              </motion.div>
            </nav>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 pb-8 flex gap-6 text-sm text-[#71717A]"
            >
              <a href="https://twitter.com" className="hover:text-[#FAFAFA] transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" className="hover:text-[#FAFAFA] transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com" className="hover:text-[#FAFAFA] transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
