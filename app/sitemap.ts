import type { MetadataRoute } from "next";
import { SITE_URL, SERVICES, CASE_STUDIES, BLOG_POSTS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: SITE_URL, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/process`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/insights`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${SITE_URL}/careers`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workRoutes = CASE_STUDIES.map((s) => ({
    url: `${SITE_URL}/work/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/insights/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes];
}
