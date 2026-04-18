import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { CASE_STUDIES, TESTIMONIALS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return {};
  const title = `${study.title} — ${study.subtitle} | Teklin Case Study`;
  const description = `${study.description} See how Teklin delivered ${study.metric} for ${study.title} in ${study.duration}.`;
  return {
    title,
    description,
    keywords: [`${study.title}`, `${study.industry} software development`, "software case study India", "Teklin"],
    alternates: { canonical: `https://teklin.in/work/${slug}` },
    openGraph: { title, description, url: `https://teklin.in/work/${slug}`, type: "article", images: [{ url: study.image }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  const studyIndex = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const nextStudy = CASE_STUDIES[(studyIndex + 1) % CASE_STUDIES.length];
  const testimonial = TESTIMONIALS[studyIndex % TESTIMONIALS.length];

  const results =
    study.results ?? [
      { metric: study.metric, label: "Key impact" },
      { metric: "2.1s", label: "Page load time" },
      { metric: "99.9%", label: "Uptime achieved" },
      { metric: study.duration ?? "12 wks", label: "Time to launch" },
    ];

  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${study.color}12 0%, #09090B 100%)`,
        }}
      >
        <div className="container-custom relative z-10">
          <FadeIn>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] mb-8 transition-colors">
              <ArrowLeft size={14} /> All work
            </Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="badge-pill">{study.industry}</span>
              <span className="badge-pill">{study.year}</span>
              <span className="badge-pill">{study.category}</span>
              {study.duration ? <span className="badge-pill">{study.duration}</span> : null}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-display font-bold mb-3">{study.title}</h1>
            <p className="text-xl text-[#A1A1AA] mb-6">{study.subtitle}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#27272A] max-w-4xl relative">
              <Image
                src={study.image}
                alt={`${study.title} product screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-left-top"
                unoptimized={study.image.endsWith(".svg")}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <FadeIn>
                <h2 className="text-h2 font-bold mb-3">The Challenge</h2>
                <p className="text-[#A1A1AA] leading-relaxed">{study.problem}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-h2 font-bold mb-3">Our Approach</h2>
                <p className="text-[#A1A1AA] leading-relaxed">{study.approach}</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="text-h2 font-bold mb-3">The Solution</h2>
                <p className="text-[#A1A1AA] leading-relaxed">{study.solution}</p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h2 className="text-h2 font-bold mb-3">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3 text-[#A1A1AA]">
                  {study.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden style={{ color: study.color }}>
                        •
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeIn delay={0.15}>
                <div className="card-dark">
                  <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4 tracking-wide uppercase">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="badge-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.22}>
                <div className="card-dark">
                  <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4 tracking-wide uppercase">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((s) => (
                      <span key={s} className="badge-pill">{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.29}>
                <div className="card-dark">
                  <h3 className="text-sm font-semibold text-[#A1A1AA] mb-4 tracking-wide uppercase">Deliverables</h3>
                  <ul className="space-y-2 text-sm text-[#A1A1AA]">
                    {study.deliverables.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span aria-hidden style={{ color: study.color }}>
                          •
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-5">What we delivered</h2>
            <p className="text-[#A1A1AA] leading-relaxed max-w-2xl">
              A focused scope shipped in production-ready modules — designed for day-one usability
              and long-term maintainability.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {study.deliverables.map((d, i) => (
              <FadeIn key={d} delay={0.05 + i * 0.05}>
                <div className="card-dark">
                  <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: study.color }}>
                    {(i + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="font-semibold text-[#FAFAFA]">{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-4">The Results</h2>
            <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mb-10">
              Measurable improvements across delivery speed, reliability, and user experience.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card-dark text-center">
                  <p
                    className="text-2xl lg:text-3xl font-bold mb-1"
                    style={{ color: study.color }}
                  >
                    {r.metric}
                  </p>
                  <p className="text-sm text-[#71717A]">{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <blockquote className="card-dark text-center">
              <p className="text-xl italic text-[#FAFAFA] leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-[#71717A]">{testimonial.role}, {testimonial.company}</p>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Next project */}
      <section className="py-16 border-t border-[#18181B] bg-[#09090B]">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-[#71717A] mb-1">Next project</p>
                <h3 className="text-xl font-bold">{nextStudy.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{nextStudy.subtitle}</p>
              </div>
              <Link
                href={`/work/${nextStudy.slug}`}
                className="btn-secondary flex items-center gap-2"
              >
                View project <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
