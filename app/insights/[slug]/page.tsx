import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const PLACEHOLDER_CONTENT = `
<p>This is a placeholder for the full article content. In production, this would be loaded from an MDX file stored in the <code>content/blog/</code> directory using next-mdx-remote.</p>

<h2>The problem</h2>
<p>Modern software development presents a unique set of challenges when it comes to building scalable, maintainable systems. Whether you're working on a greenfield project or modernising a legacy codebase, the decisions you make early on have an outsized impact on your team's velocity down the road.</p>

<h2>Our approach</h2>
<p>Over the past 8 years, we've developed a set of principles that guide how we approach technical decisions at Teklin. These aren't rigid rules — they're heuristics that help us make better choices under uncertainty.</p>

<h3>1. Optimise for change</h3>
<p>The only constant in software development is that requirements change. Systems that are easy to change are more valuable than systems that are theoretically optimal but rigid. We favour composition over inheritance, thin abstraction layers, and explicit over implicit behaviour.</p>

<h3>2. Ship it and learn</h3>
<p>The best way to validate an architectural decision is to put it in front of real users. Premature optimisation and over-engineering are as costly as technical debt. We bias toward shipping working software and iterating based on real feedback.</p>

<h2>The results</h2>
<p>Teams that adopt these principles consistently ship faster with fewer production incidents. We've measured a 40% reduction in time-to-feature across projects where we've applied this approach systematically.</p>
`;

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-12 bg-[#09090B]">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-[#FAFAFA] mb-8 transition-colors">
              <ArrowLeft size={14} /> All articles
            </Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <span className="badge-pill mb-4 inline-flex">{post.category}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-h1 font-bold mb-6 leading-tight">{post.title}</h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#71717A] mb-8">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}
                >
                  {post.authorAvatar}
                </div>
                <span>{post.author}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hero image */}
      <div className="container-custom max-w-4xl mb-12">
        <FadeIn>
          <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/15 flex items-center justify-center">
            <span className="text-6xl font-bold gradient-text opacity-25">{post.title.charAt(0)}</span>
          </div>
        </FadeIn>
      </div>

      {/* Article content */}
      <article className="container-custom max-w-3xl pb-20">
        <FadeIn>
          <div
            className="prose prose-invert max-w-none text-[#A1A1AA] leading-relaxed
              [&_h2]:text-[#FAFAFA] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-[#FAFAFA] [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-4
              [&_code]:bg-[#27272A] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[#8B5CF6] [&_code]:text-sm"
            dangerouslySetInnerHTML={{ __html: PLACEHOLDER_CONTENT }}
          />
        </FadeIn>

        {/* Author bio */}
        <FadeIn delay={0.1}>
          <div className="card-dark flex gap-4 items-start mt-12">
            <div
              className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}
            >
              {post.authorAvatar}
            </div>
            <div>
              <p className="font-semibold mb-1">{post.author}</p>
              <p className="text-sm text-[#71717A] leading-relaxed">
                Sharing engineering insights from building and scaling 150+ digital products.
              </p>
            </div>
          </div>
        </FadeIn>
      </article>

      {/* Related posts */}
      <section className="section-padding bg-[#09090B] border-t border-[#18181B]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-h3 font-bold mb-8">Related articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.1}>
                <Link href={`/insights/${p.slug}`} className="card-dark block group">
                  <span className="badge-pill mb-3 inline-flex">{p.category}</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[#8B5CF6] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#71717A] mb-3 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center gap-2 text-[#8B5CF6] text-sm font-medium">
                    Read <ArrowRight size={13} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
