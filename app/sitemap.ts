import type { MetadataRoute } from "next";
import { SITE_URL, SERVICES, CASE_STUDIES, BLOG_POSTS, LOCATIONS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Core pages ─────────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                              changeFrequency: "weekly",  priority: 1.0,  lastModified: now },
    { url: `${SITE_URL}/services`,                changeFrequency: "weekly",  priority: 0.95, lastModified: now },
    { url: `${SITE_URL}/work`,                    changeFrequency: "weekly",  priority: 0.9,  lastModified: now },
    { url: `${SITE_URL}/about`,                   changeFrequency: "monthly", priority: 0.8,  lastModified: now },
    { url: `${SITE_URL}/process`,                 changeFrequency: "monthly", priority: 0.7,  lastModified: now },
    { url: `${SITE_URL}/insights`,                changeFrequency: "daily",   priority: 0.85, lastModified: now },
    { url: `${SITE_URL}/careers`,                 changeFrequency: "weekly",  priority: 0.75, lastModified: now },
    { url: `${SITE_URL}/contact`,                 changeFrequency: "monthly", priority: 0.95, lastModified: now },
    { url: `${SITE_URL}/estimate`,                changeFrequency: "monthly", priority: 0.8,  lastModified: now },
    { url: `${SITE_URL}/locations`,               changeFrequency: "weekly",  priority: 0.9,  lastModified: now },
  ];

  // ── Service pages ───────────────────────────────────────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: now,
  }));

  // ── Work / Case studies ─────────────────────────────────────────────────────
  const workRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((s) => ({
    url: `${SITE_URL}/work/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    lastModified: now,
  }));

  // ── Blog / Insights ─────────────────────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/insights/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    lastModified: new Date(p.date),
  }));

  // ── Location pages (85 cities) ───────────────────────────────────────────────
  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${SITE_URL}/locations/${l.slug}`,
    changeFrequency: "monthly" as const,
    priority: l.type === "metro" ? 0.85 : l.type === "state" ? 0.8 : l.type === "tier2" ? 0.75 : 0.65,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...workRoutes,
    ...blogRoutes,
    ...locationRoutes,
  ];
}
