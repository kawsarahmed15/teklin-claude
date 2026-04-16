"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Home } from "lucide-react";

// Konami code easter egg
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function NotFoundPage() {
  const [keys, setKeys] = useState<string[]>([]);
  const [konamiActivated, setKonamiActivated] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setKonamiActivated(true);
          setTimeout(() => setKonamiActivated(false), 4000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="mesh-gradient" aria-hidden />

      {/* Konami Easter Egg */}
      {konamiActivated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-6"
            >
              🎮
            </motion.div>
            <h2 className="text-4xl font-bold gradient-text mb-3">Konami Code!</h2>
            <p className="text-[#A1A1AA]">You found the easter egg. Nice work.</p>
          </div>
        </div>
      )}

      {/* Glitch number */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6"
      >
        <span
          className="text-[clamp(8rem,20vw,18rem)] font-black leading-none"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #8B5CF6 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.15,
          }}
        >
          404
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 -mt-10 mb-10"
      >
        <h1 className="text-h1 font-bold mb-4">
          You&apos;ve ventured into{" "}
          <span className="gradient-text">uncharted code</span>
        </h1>
        <p className="text-[#A1A1AA] text-lg max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={18} /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={16} /> Go back
          </button>
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 text-sm text-[#71717A]"
      >
        {[
          { label: "Services", href: "/services" },
          { label: "Our Work", href: "/work" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-[#FAFAFA] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </motion.div>

      {/* Easter egg hint */}
      <p className="absolute bottom-8 text-xs text-[#27272A] tracking-wider">
        Try the Konami code ↑↑↓↓←→←→BA
      </p>
    </div>
  );
}
