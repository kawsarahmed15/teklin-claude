import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights — Engineering, Design & Product",
  description:
    "Thoughts from the Teklin team on engineering, design, AI/ML, DevOps, and building great software products.",
};

const CATEGORIES = ["All", "Engineering", "Design", "AI/ML", "DevOps", "Product", "Culture"];

export default function InsightsPage() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#09090B] relative overflow-hidden">
        <div className="mesh-gradient" aria-hidden />
        <div className="container-custom relative z-10">
          <FadeIn>
            <p className="section-label mb-4">Insights</p>
          </FadeIn>
          <TextReveal as="h1" className="text-display font-bold mb-6 max-w-3xl">
            Thoughts on engineering, design, and building great software
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-[#A1A1AA] text-lg max-w-xl">
              Practical ideas from the team at Teklin, drawn from shipping over 150 products.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-12 bg-[#09090B] border-t border-[#18181B]">
          <div className="container-custom">
            <FadeIn>
              <Link href={`/insights/${featured.slug}`} className="block group" data-cursor="Read">
                <div className="card-dark grid md:grid-cols-2 gap-8 items-center">
                  {/* Image placeholder */}
                  <div className="h-56 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 flex items-center justify-center">
                    <span className="text-6xl font-bold gradient-text opacity-30">
                      {featured.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="badge-pill">{featured.category}</span>
                      <span className="badge-pill bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6]">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-h2 font-bold mb-3 group-hover:text-[#8B5CF6] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-[#A1A1AA] mb-4 leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-[#71717A]">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {formatDate(featured.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {featured.readTime}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[#8B5CF6] font-semibold text-sm group-hover:gap-3 transition-all">
                      Read article <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.07}>
                <Link href={`/insights/${post.slug}`} className="card-dark block group h-full" data-cursor="Read">
                  {/* Image placeholder */}
                  <div className="h-40 rounded-lg mb-4 bg-gradient-to-br from-[#18181B] to-[#27272A] flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#3F3F46]">
                      {post.title.charAt(0)}
                    </span>
                  </div>

                  <span className="badge-pill mb-3 inline-flex">{post.category}</span>
                  <h2 className="font-bold text-lg mb-2 group-hover:text-[#8B5CF6] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#71717A] mb-4 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between text-xs text-[#52525B]">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-h2 font-bold mb-3">Stay up to date</h2>
            <p className="text-[#A1A1AA] mb-8">
              New articles every two weeks. No spam, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
