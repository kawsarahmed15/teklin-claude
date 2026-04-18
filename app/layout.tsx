import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll, ScrollToTop } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Software Development Company India`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "software development company India",
    "custom software development India",
    "web development company India",
    "mobile app development India",
    "SaaS development company",
    "AI machine learning India",
    "React Next.js development",
    "cloud devops services India",
    "UI UX design company India",
    "enterprise software India",
    "software company Assam",
    "IT company Northeast India",
    "Teklin",
  ],
  authors: [{ name: "Teklin", url: SITE_URL }],
  creator: "Teklin",
  publisher: "Teklin",
  category: "Software Development",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Software Development Company India`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Teklin — Software Development Company India" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@teklin_in",
    title: `${SITE_NAME} — Software Development Company India`,
    description: SITE_DESCRIPTION,
    creator: "@teklin_in",
    images: ["/og-home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "teklin-google-verification",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Teklin",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        description: SITE_DESCRIPTION,
        foundingDate: "2020",
        areaServed: "IN",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kanishail, Sribhumi",
          addressLocality: "Karimganj",
          addressRegion: "Assam",
          postalCode: "788727",
          addressCountry: "IN",
        },
        contactPoint: [
          { "@type": "ContactPoint", telephone: "+91-9707276661", email: "contact@teklin.in", contactType: "customer service", availableLanguage: ["English", "Hindi", "Bengali", "Assamese"] },
          { "@type": "ContactPoint", telephone: "+91-9707276661", contactType: "sales", contactOption: "TollFree" },
        ],
        sameAs: [
          "https://facebook.com/profile.php?id=61571269328546",
          "https://instagram.com/teklin.in",
          "https://x.com/Teklin_in",
          "https://linkedin.com/company/teklin/",
        ],
        numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
        knowsAbout: ["Custom Software Development", "Web Development", "Mobile App Development", "AI ML", "SaaS", "Cloud DevOps", "UI UX Design"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Teklin",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/insights?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Teklin Software Development",
        url: SITE_URL,
        image: `${SITE_URL}/og-home.png`,
        priceRange: "₹₹₹",
        telephone: "+91-9707276661",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karimganj",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 24.8699, longitude: 92.3630 },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
        servesCuisine: "Software Development",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* JSON-LD is safe to inline in <head> as type="application/ld+json" */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* No inline style — theme background is handled purely via CSS */}
      <body className="noise-overlay overflow-x-hidden relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll>
            <ScrollToTop />
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <ScrollProgress />
            <CustomCursor />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>

        {/* Console easter egg — loaded after page is interactive */}
        <Script id="console-easter-egg" strategy="afterInteractive">{`
console.log(
  "%c TEKLIN ",
  "background: linear-gradient(135deg, #8B5CF6, #06B6D4); color: white; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px;"
);
console.log("%c We're hiring! Visit teklin.in/careers", "color: #10B981; font-size: 14px;");
        `}</Script>
      </body>
    </html>
  );
}
