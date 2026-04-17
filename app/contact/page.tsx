"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Clock, CheckCircle, Loader2, ArrowRight, Phone, Globe, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { SITE_EMAIL, SITE_PHONE, SITE_ADDRESS, SITE_HOURS, SOCIAL_LINKS } from "@/lib/constants";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "SaaS Product",
  "AI/ML Solution",
  "Enterprise Software",
  "Digital Transformation",
  "Other",
];

const BUDGET_RANGES = [
  "Under $25K",
  "$25K – $50K",
  "$50K – $100K",
  "$100K – $250K",
  "$250K+",
  "Not sure yet",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.description.trim()) e.description = "Please describe your project";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormState("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          <FadeIn>
            <p className="section-label mb-4">Get in touch</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6 max-w-3xl">
            Let&apos;s build something extraordinary
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
              Tell us about your project. We&apos;ll get back to you within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-dark flex flex-col items-center text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-6">
                      <CheckCircle className="text-[#10B981]" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Message received!</h2>
                    <p className="text-[#A1A1AA] max-w-sm">
                      Thanks for reaching out. We&apos;ll review your project details and
                      get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="card-dark space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-2">Tell us about your project</h2>

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#A1A1AA] mb-2">
                          Name <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="form-input"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1.5 text-xs text-[#EF4444]">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#A1A1AA] mb-2">
                          Email <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="form-input"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-[#EF4444]">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#A1A1AA] mb-2">
                        Company / Organisation
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="form-input"
                      />
                    </div>

                    {/* Project type + Budget */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-[#A1A1AA] mb-2">
                          Project type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={form.projectType}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Select type</option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-[#A1A1AA] mb-2">
                          Budget range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Select range</option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-[#A1A1AA] mb-2">
                        Project description <span className="text-[#EF4444]">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about what you're building, the problem you're solving, and any relevant timeline or technical context..."
                        className="form-input resize-none"
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? "desc-error" : undefined}
                      />
                      {errors.description && (
                        <p id="desc-error" className="mt-1.5 text-xs text-[#EF4444]">{errors.description}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Info sidebar — 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn variant="slideRight">
                <div className="card-dark space-y-5">
                  <h3 className="font-semibold text-lg">Contact details</h3>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Email</p>
                      <a href={`mailto:${SITE_EMAIL}`} className="text-sm hover:text-[#8B5CF6] transition-colors">
                        {SITE_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Phone</p>
                      <a href={`tel:${SITE_PHONE}`} className="text-sm hover:text-[#8B5CF6] transition-colors">
                        {SITE_PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-[#06B6D4]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Address</p>
                      <p className="text-sm">Kanishail, Sribhumi, Karimganj, Assam 788727, India</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-[#10B981]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Office hours</p>
                      <p className="text-sm">{SITE_HOURS}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center flex-shrink-0">
                      <Globe size={16} className="text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Languages</p>
                      <p className="text-sm">English, Hindi, Assamese</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#27272A]">
                    <p className="text-xs text-[#71717A] mb-3">Follow us</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Facebook", href: SOCIAL_LINKS.facebook },
                        { label: "Instagram", href: SOCIAL_LINKS.instagram },
                        { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
                        { label: "X", href: SOCIAL_LINKS.twitter },
                      ].map(({ label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#3F3F46] text-xs text-[#71717A] hover:text-[#FAFAFA] hover:border-[#8B5CF6] transition-colors"
                        >
                          {label} <ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Trust indicators */}
              <FadeIn variant="slideRight" delay={0.1}>
                <div className="card-dark space-y-3">
                  <h3 className="font-semibold text-lg mb-4">Why work with us</h3>
                  {[
                    "240+ businesses served",
                    "99.99% uptime achieved",
                    "98% on-time delivery rate",
                    "NDA available on request",
                    "No lock-in contracts",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                      <span className="text-[#10B981]">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
