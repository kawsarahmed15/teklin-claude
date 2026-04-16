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
    default: `${SITE_NAME} — Software Development Company`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "SaaS development",
    "AI machine learning",
    "React Next.js",
    "cloud devops",
    "UI UX design",
    "enterprise software",
    "Teklin",
  ],
  authors: [{ name: "Teklin", url: SITE_URL }],
  creator: "Teklin",
  icons: {
    // Cache-bust favicon updates in browsers/CDNs (bump the version if you change the file).
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Software Development Company`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Software Development Company`,
    description: SITE_DESCRIPTION,
    creator: "@teklin_in",
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
    "@type": "Organization",
    name: "Teklin",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@teklin.in",
      contactType: "customer service",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* JSON-LD is safe to inline in <head> as type="application/ld+json" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* No inline style — theme background is handled purely via CSS */}
      <body className="noise-overlay overflow-x-hidden">
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
