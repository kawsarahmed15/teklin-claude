"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";

import {
  SiReact, SiNextdotjs, SiTypescript, SiVuedotjs, SiAngular, SiSvelte,
  SiNodedotjs, SiPython, SiGo, SiRust, SiDotnet,
  SiFlutter, SiSwift, SiKotlin,
  SiGooglecloud, SiVercel, SiDocker, SiKubernetes,
  SiPostgresql, SiMongodb, SiRedis, SiSupabase,
  SiTensorflow, SiPytorch, SiOpenai, SiHuggingface,
  SiGraphql, SiPrisma, SiStripe, SiFirebase,
  SiGithubactions, SiTerraform, SiElasticsearch,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* ── AWS / Azure / Java / LangChain inline SVGs ───────────────────────────── */

function AwsLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 50" fill="none">
      <path d="M22.5 20.9c0 .9.1 1.6.3 2.1.2.5.5 1.1.9 1.7.1.2.2.4.2.6 0 .2-.1.5-.5.7l-1.5 1c-.2.1-.4.2-.6.2-.2 0-.5-.1-.7-.3-.3-.4-.6-.8-.8-1.2-.2-.4-.5-.9-.7-1.5-1.8 2.1-4.1 3.2-6.9 3.2-2 0-3.6-.6-4.7-1.7C6 24.3 5.3 22.7 5.3 20.8c0-2 .7-3.6 2.1-4.8 1.4-1.2 3.3-1.8 5.7-1.8.8 0 1.6.1 2.5.2.9.1 1.8.3 2.7.5v-1.7c0-1.8-.4-3.1-1.1-3.8-.7-.7-2-1.1-3.8-1.1-.8 0-1.7.1-2.5.3-.9.2-1.7.5-2.5.8-.4.2-.6.3-.8.3-.2 0-.5-.2-.5-.7V7.9c0-.4.1-.7.2-.8.1-.2.4-.4.7-.5.8-.4 1.8-.7 3-.9C11.7 5.5 13 5.3 14.3 5.3c2.8 0 4.8.6 6.1 1.9 1.3 1.3 2 3.2 2 5.8v7.9zm-9.4 3.5c.8 0 1.6-.1 2.4-.4.8-.3 1.6-.8 2.2-1.5.4-.4.6-.9.8-1.5.1-.6.2-1.2.2-2v-1c-.7-.1-1.4-.2-2.1-.3-.7 0-1.4-.1-2.1-.1-1.4 0-2.4.3-3.1 1-.7.6-1 1.5-1 2.6 0 1.1.3 1.9.8 2.4.5.5 1.1.8 1.9.8zm16.6 2.3c-.4 0-.7-.1-.9-.2-.2-.1-.4-.5-.5-1l-5.1-16.8c-.1-.4-.2-.7-.2-1 0-.4.2-.6.6-.6h2.3c.4 0 .7.1.9.2.2.1.3.5.5.9l3.5 13.8 3.3-13.8c.1-.5.3-.8.5-.9.2-.1.5-.2.9-.2h1.9c.4 0 .7.1.9.2.2.1.4.5.5.9l3.3 14 3.6-14c.1-.5.3-.8.5-.9.2-.1.5-.2.9-.2h2.2c.4 0 .6.2.6.6 0 .1 0 .3-.1.4l-.2.6-5.1 16.8c-.1.5-.3.8-.5 1-.2.1-.5.2-.9.2h-2c-.4 0-.7-.1-.9-.2-.2-.2-.4-.5-.5-.9l-3.2-13.5-3.2 13.5c-.1.5-.3.8-.5.9-.2.1-.5.2-.9.2h-2zm27.1.5c-1.2 0-2.4-.1-3.6-.4-1.2-.3-2.1-.6-2.7-.9-.4-.2-.6-.5-.7-.7-.1-.2-.1-.4-.1-.7v-1.2c0-.5.2-.7.5-.7.1 0 .3 0 .4.1l.6.2c.8.4 1.7.6 2.6.8 1 .2 1.9.3 2.9.3 1.5 0 2.7-.3 3.5-.8.8-.5 1.3-1.3 1.3-2.3 0-.7-.2-1.2-.6-1.7-.4-.4-1.2-.8-2.4-1.2l-3.4-1.1c-1.7-.5-3-1.3-3.8-2.4-.8-1-1.2-2.2-1.2-3.5 0-1 .2-1.9.6-2.7.4-.8 1-1.5 1.7-2 .7-.5 1.6-.9 2.5-1.2.9-.3 2-.4 3-.4.5 0 1.1 0 1.6.1.6.1 1.1.2 1.6.3.5.1.9.3 1.3.4.4.1.7.3 1 .4.3.2.5.4.7.6.1.2.2.5.2.8v1.1c0 .5-.2.7-.5.7-.2 0-.4-.1-.9-.3-1.3-.6-2.8-.9-4.5-.9-1.4 0-2.5.2-3.2.7-.7.4-1.1 1.1-1.1 2.1 0 .7.2 1.2.7 1.7.5.4 1.3.9 2.6 1.3l3.3 1.1c1.7.5 2.9 1.3 3.7 2.3.7 1 1.1 2.1 1.1 3.3 0 1-.2 2-.6 2.8-.4.8-1 1.5-1.7 2.1-.7.6-1.6 1-2.7 1.3-1.1.4-2.3.5-3.5.5z" fill="#FF9900"/>
    </svg>
  );
}

function AzureLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <path d="M33.338 6.544h26.038L33.01 89.456H6.972L33.338 6.544z" fill="url(#az-a)"/>
      <path d="M60.113 6.544l-24.544 23.1-16.74 46.535L6.972 89.456h26.038l27.103-82.912z" fill="url(#az-b)"/>
      <path d="M60.275 6.544H36.387L60.46 75.8l28.568 13.656H89L60.275 6.544z" fill="url(#az-c)"/>
      <defs>
        <linearGradient id="az-a" x1="49.041" y1="10.895" x2="16.261" y2="95.312" gradientUnits="userSpaceOnUse">
          <stop stopColor="#114A8B"/>
          <stop offset="1" stopColor="#0669BC"/>
        </linearGradient>
        <linearGradient id="az-b" x1="51.862" y1="52.688" x2="44.928" y2="55.071" gradientUnits="userSpaceOnUse">
          <stop stopOpacity=".3"/>
          <stop offset=".071" stopOpacity=".2"/>
          <stop offset=".321" stopOpacity=".1"/>
          <stop offset=".623" stopOpacity=".05"/>
          <stop offset="1" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="az-c" x1="55.302" y1="9.963" x2="83.163" y2="90.455" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3CCBF4"/>
          <stop offset="1" stopColor="#2892DF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function JavaLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128">
      <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.187z"/>
      <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.981 94.019c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.724 0 .001.364-.325.468-.616z"/>
      <path fill="#EA2D2E" d="M76.491 1s12.963 12.963-12.299 32.923c-20.251 15.993-4.619 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815 8.548-12.834 32.229-19.059 26.994-39.667z"/>
      <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
    </svg>
  );
}

function LangChainLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" rx="20" fill="#1C3C3C"/>
      <path d="M50 100 C50 72 72 50 100 50 C128 50 150 72 150 100" stroke="#4FC" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M50 100 C50 128 72 150 100 150 C128 150 150 128 150 100" stroke="#4FC" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="8 6"/>
      <circle cx="100" cy="100" r="16" fill="#4FC"/>
      <circle cx="50" cy="100" r="10" fill="#4FC"/>
      <circle cx="150" cy="100" r="10" fill="#4FC"/>
    </svg>
  );
}

/* ── Types ────────────────────────────────────────────────────────────────── */

type Category = "Frontend" | "Backend" | "Mobile" | "Cloud & DevOps" | "Database" | "AI / ML";

interface Tech {
  name: string;
  icon: IconType | (({ size }: { size?: number }) => React.ReactElement);
  color: string;
  category: Exclude<Category, "All">;
  bg?: string; // optional card bg tint
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const TECH: Tech[] = [
  // Frontend
  { name: "React",        icon: SiReact,        color: "#61DAFB", category: "Frontend" },
  { name: "Next.js",      icon: SiNextdotjs,    color: "#FFFFFF", category: "Frontend" },
  { name: "TypeScript",   icon: SiTypescript,   color: "#3178C6", category: "Frontend" },
  { name: "Vue",          icon: SiVuedotjs,     color: "#4FC08D", category: "Frontend" },
  { name: "Angular",      icon: SiAngular,      color: "#DD0031", category: "Frontend" },
  { name: "Svelte",       icon: SiSvelte,       color: "#FF3E00", category: "Frontend" },
  { name: "GraphQL",      icon: SiGraphql,      color: "#E10098", category: "Frontend" },
  // Backend
  { name: "Node.js",      icon: SiNodedotjs,    color: "#339933", category: "Backend" },
  { name: "Python",       icon: SiPython,       color: "#3776AB", category: "Backend" },
  { name: "Go",           icon: SiGo,           color: "#00ADD8", category: "Backend" },
  { name: "Rust",         icon: SiRust,         color: "#CE422B", category: "Backend" },
  { name: "Java",         icon: JavaLogo,       color: "#F89820", category: "Backend" },
  { name: ".NET",         icon: SiDotnet,       color: "#512BD4", category: "Backend" },
  { name: "Prisma",       icon: SiPrisma,       color: "#2D3748", category: "Backend" },
  // Mobile
  { name: "React Native", icon: SiReact,        color: "#61DAFB", category: "Mobile" },
  { name: "Flutter",      icon: SiFlutter,      color: "#02569B", category: "Mobile" },
  { name: "Swift",        icon: SiSwift,        color: "#F05138", category: "Mobile" },
  { name: "Kotlin",       icon: SiKotlin,       color: "#7F52FF", category: "Mobile" },
  // Cloud & DevOps
  { name: "AWS",          icon: AwsLogo,        color: "#FF9900", category: "Cloud & DevOps" },
  { name: "Azure",        icon: AzureLogo,      color: "#0078D4", category: "Cloud & DevOps" },
  { name: "GCP",          icon: SiGooglecloud,  color: "#4285F4", category: "Cloud & DevOps" },
  { name: "Vercel",       icon: SiVercel,       color: "#FFFFFF", category: "Cloud & DevOps" },
  { name: "Docker",       icon: SiDocker,       color: "#2496ED", category: "Cloud & DevOps" },
  { name: "Kubernetes",   icon: SiKubernetes,   color: "#326CE5", category: "Cloud & DevOps" },
  { name: "Terraform",    icon: SiTerraform,    color: "#7B42BC", category: "Cloud & DevOps" },
  { name: "GH Actions",   icon: SiGithubactions,color: "#2088FF", category: "Cloud & DevOps" },
  // Database
  { name: "PostgreSQL",   icon: SiPostgresql,   color: "#4169E1", category: "Database" },
  { name: "MongoDB",      icon: SiMongodb,      color: "#47A248", category: "Database" },
  { name: "Redis",        icon: SiRedis,        color: "#FF4438", category: "Database" },
  { name: "Supabase",     icon: SiSupabase,     color: "#3ECF8E", category: "Database" },
  { name: "Elasticsearch",icon: SiElasticsearch,color: "#FEC514", category: "Database" },
  { name: "Firebase",     icon: SiFirebase,     color: "#FFCA28", category: "Database" },
  { name: "Stripe",       icon: SiStripe,       color: "#635BFF", category: "Database" },
  // AI / ML
  { name: "TensorFlow",   icon: SiTensorflow,   color: "#FF6F00", category: "AI / ML" },
  { name: "PyTorch",      icon: SiPytorch,      color: "#EE4C2C", category: "AI / ML" },
  { name: "OpenAI",       icon: SiOpenai,       color: "#FFFFFF", category: "AI / ML" },
  { name: "LangChain",    icon: LangChainLogo,  color: "#4FC",    category: "AI / ML" },
  { name: "Hugging Face", icon: SiHuggingface,  color: "#FFD21E", category: "AI / ML" },
];

const CATEGORIES: Category[] = ["Frontend", "Backend", "Mobile", "Cloud & DevOps", "Database", "AI / ML"];

/* ── Sub-components ───────────────────────────────────────────────────────── */

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const Icon = tech.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.25, delay: index * 0.025 }}
      className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#27272A] bg-[#18181B] hover:border-[#8B5CF6]/50 hover:bg-[#1C1C1F] transition-all duration-200 cursor-default"
    >
      {/* Logo container with colored glow on hover */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ filter: `drop-shadow(0 0 0px ${tech.color})` }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.filter = `drop-shadow(0 0 8px ${tech.color}88)`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.filter = `drop-shadow(0 0 0px ${tech.color})`;
        }}
      >
        <Icon size={40} style={{ color: tech.color }} />
      </div>
      <span className="text-xs font-medium text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors text-center leading-tight">
        {tech.name}
      </span>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */

export function TechStackSection() {
  const [active, setActive] = useState<Category>("Frontend");

  const visible = TECH.filter(t => t.category === active);

  return (
    <section className="section-padding bg-[#09090B]">
      <div className="container-custom">
        {/* Header */}
        <FadeIn>
          <p className="section-label mb-4">Technologies</p>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <TextReveal as="h2" className="text-display font-bold">
            Technologies we master
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#71717A] max-w-sm text-sm leading-relaxed">
              A curated stack built for scale — from rapid MVPs to enterprise-grade systems.
            </p>
          </FadeIn>
        </div>

        {/* Category tabs */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-btn${active === cat ? " active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid — re-mounts on category change for staggered entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
          >
            {visible.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Live count */}
        <motion.p
          key={`count-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-xs text-[#52525B]"
        >
          {visible.length} {active} technologies · and growing
        </motion.p>
      </div>
    </section>
  );
}
