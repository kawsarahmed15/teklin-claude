import { PricingConfig } from "./types";

export const pricingConfig: PricingConfig = {
  version: "1.0.0",
  effectiveDate: "2025-01-01",
  blendedRateUSD: 50,
  rangeSpread: 0.2,
  roundingUSD: 50,
  roundingINR: 1000,

  baseCosts: {
    "website":    { low: 1500,  high: 3500,  hours: 50 },
    "web-app":    { low: 5000,  high: 9000,  hours: 120 },
    "mobile-app": { low: 8000,  high: 14000, hours: 200 },
    "saas":       { low: 12000, high: 20000, hours: 280 },
    "enterprise": { low: 20000, high: 40000, hours: 500 },
    "ai-ml":      { low: 10000, high: 18000, hours: 250 },
  },

  features: [
    // ── Authentication ──────────────────────────────────────────────────────────
    { id: "auth-basic",     label: "Email / Password Login",   description: "Secure user login and registration",               category: "Authentication", price: { low: 200,  high: 400  }, hours: 10, applicableTo: ["web-app","mobile-app","saas","enterprise"],           popular: true  },
    { id: "auth-social",    label: "Social Login (OAuth)",     description: "Google, Apple, Facebook sign-in",                  category: "Authentication", price: { low: 300,  high: 600  }, hours: 15, applicableTo: ["web-app","mobile-app","saas"],                         popular: true  },
    { id: "auth-2fa",       label: "Two-Factor Auth (2FA)",    description: "OTP via email / SMS / authenticator app",          category: "Authentication", price: { low: 300,  high: 600  }, hours: 15, applicableTo: ["web-app","mobile-app","saas","enterprise"]                       },
    { id: "auth-sso",       label: "SSO / SAML",               description: "Enterprise single sign-on (Okta, Azure AD)",       category: "Authentication", price: { low: 1000, high: 2000 }, hours: 40, applicableTo: ["enterprise","saas"]                                                },
    { id: "auth-roles",     label: "Role-Based Access Control",description: "Admin, manager, viewer permission tiers",          category: "Authentication", price: { low: 500,  high: 1000 }, hours: 25, applicableTo: ["web-app","saas","enterprise"],                         popular: true  },
    { id: "auth-magic",     label: "Magic Link / Passwordless",description: "One-click email authentication",                   category: "Authentication", price: { low: 200,  high: 400  }, hours: 10, applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── Payments ────────────────────────────────────────────────────────────────
    { id: "payments-stripe",         label: "Stripe / Razorpay Integration", description: "One-time payments, cards, UPI",             category: "Payments", price: { low: 500,  high: 900  }, hours: 25, applicableTo: ["website","web-app","mobile-app","saas","enterprise"], popular: true  },
    { id: "payments-subscriptions",  label: "Subscription Billing",          description: "Recurring billing, free trials, coupons",   category: "Payments", price: { low: 800,  high: 1500 }, hours: 40, applicableTo: ["saas","enterprise","web-app"],                         popular: true  },
    { id: "payments-invoicing",      label: "Invoicing & Receipts",          description: "PDF invoices, GST-compliant billing",        category: "Payments", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["saas","enterprise","web-app"]                                    },
    { id: "payments-wallet",         label: "In-App Wallet / Credits",       description: "User balance, top-ups, redemption",          category: "Payments", price: { low: 600,  high: 1200 }, hours: 30, applicableTo: ["mobile-app","web-app","saas"]                                    },
    { id: "payments-marketplace",    label: "Marketplace Payouts",           description: "Split payments to multiple sellers",         category: "Payments", price: { low: 1200, high: 2500 }, hours: 60, applicableTo: ["saas","enterprise","web-app"]                                    },

    // ── Core Functionality ──────────────────────────────────────────────────────
    { id: "search-basic",    label: "Search & Filtering",        description: "Full-text search with filters and sorting",       category: "Core Functionality", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["website","web-app","mobile-app","saas","enterprise"], popular: true  },
    { id: "search-advanced", label: "Advanced Search (Elasticsearch)", description: "Fuzzy search, facets, auto-complete",    category: "Core Functionality", price: { low: 1000, high: 2000 }, hours: 50, applicableTo: ["web-app","saas","enterprise"]                                    },
    { id: "upload-files",    label: "File Uploads",              description: "Images, docs, videos — S3/Cloudflare R2",        category: "Core Functionality", price: { low: 300,  high: 600  }, hours: 15, applicableTo: ["web-app","mobile-app","saas","enterprise"],            popular: true  },
    { id: "geo-maps",        label: "Maps & Geolocation",        description: "Google Maps, location tracking, radius search",  category: "Core Functionality", price: { low: 600,  high: 1200 }, hours: 30, applicableTo: ["website","web-app","mobile-app","enterprise"]                    },
    { id: "realtime",        label: "Real-Time Features",        description: "Live updates, chat, notifications via WebSocket", category: "Core Functionality", price: { low: 1000, high: 2000 }, hours: 50, applicableTo: ["web-app","mobile-app","saas","enterprise"]                       },
    { id: "offline-mode",    label: "Offline Mode",              description: "App works without internet connection",           category: "Core Functionality", price: { low: 1200, high: 2200 }, hours: 60, applicableTo: ["mobile-app","enterprise"]                                        },
    { id: "multi-language",  label: "Multi-Language (i18n)",     description: "Translate the app into multiple languages",       category: "Core Functionality", price: { low: 500,  high: 1000 }, hours: 25, applicableTo: ["website","web-app","mobile-app","saas","enterprise"]              },
    { id: "multi-currency",  label: "Multi-Currency",            description: "Dynamic currency switching and conversion",       category: "Core Functionality", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["web-app","saas","enterprise"]                                    },

    // ── Content & Media ─────────────────────────────────────────────────────────
    { id: "content-cms",    label: "CMS Integration",           description: "Sanity / Strapi / Contentful for content mgmt",   category: "Content & Media", price: { low: 600,  high: 1200 }, hours: 30, applicableTo: ["website","web-app","enterprise"],                      popular: true  },
    { id: "blog",           label: "Blog / Article System",     description: "Full blog with tags, categories, SEO",            category: "Content & Media", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["website","web-app"]                                                },
    { id: "media-gallery",  label: "Media Gallery / Portfolio", description: "Image/video gallery with lightbox",               category: "Content & Media", price: { low: 300,  high: 600  }, hours: 15, applicableTo: ["website","web-app","mobile-app"]                                  },
    { id: "video-streaming",label: "Video Streaming",           description: "HLS video hosting, custom player, CDN delivery",  category: "Content & Media", price: { low: 1500, high: 3000 }, hours: 70, applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── AI & ML ─────────────────────────────────────────────────────────────────
    { id: "ai-chatbot",        label: "AI Chatbot / Support",      description: "LLM-powered customer support or Q&A bot",      category: "AI & ML", price: { low: 1500, high: 3000 }, hours: 70, applicableTo: ["website","web-app","mobile-app","saas","ai-ml"],        popular: true  },
    { id: "ai-recommendations",label: "AI Recommendations",        description: "Personalized suggestions powered by ML",       category: "AI & ML", price: { low: 2000, high: 4000 }, hours: 90, applicableTo: ["web-app","mobile-app","saas","ai-ml"]                                   },
    { id: "ai-search",         label: "Semantic / AI Search",      description: "Vector embeddings for smart search results",   category: "AI & ML", price: { low: 1500, high: 3000 }, hours: 70, applicableTo: ["web-app","saas","ai-ml","enterprise"]                                  },
    { id: "ai-ocr",            label: "Document Processing / OCR", description: "Extract data from PDFs, images, forms",        category: "AI & ML", price: { low: 1200, high: 2500 }, hours: 60, applicableTo: ["enterprise","ai-ml","saas"]                                             },
    { id: "ai-analytics",      label: "Predictive Analytics",      description: "Forecasting, anomaly detection, ML models",    category: "AI & ML", price: { low: 2500, high: 5000 }, hours: 110,applicableTo: ["enterprise","ai-ml","saas"]                                             },

    // ── Admin & Management ──────────────────────────────────────────────────────
    { id: "admin-dashboard", label: "Admin Dashboard",          description: "Full backoffice: users, data, settings",          category: "Admin", price: { low: 1000, high: 2000 }, hours: 50, applicableTo: ["web-app","saas","enterprise","mobile-app"],              popular: true  },
    { id: "admin-audit",     label: "Audit Logs & Activity",    description: "Track all user actions with timestamps",          category: "Admin", price: { low: 500,  high: 1000 }, hours: 25, applicableTo: ["saas","enterprise"]                                                        },
    { id: "admin-reporting", label: "Custom Reports & Exports", description: "Generate CSV/Excel/PDF reports on demand",        category: "Admin", price: { low: 600,  high: 1200 }, hours: 30, applicableTo: ["web-app","saas","enterprise"]                                             },
    { id: "admin-crm",       label: "CRM / Lead Management",    description: "Contacts, pipelines, notes, tasks",               category: "Admin", price: { low: 1500, high: 3000 }, hours: 70, applicableTo: ["saas","enterprise","web-app"]                                             },

    // ── Analytics ──────────────────────────────────────────────────────────────
    { id: "analytics-basic",    label: "Google Analytics / PostHog", description: "Page views, events, funnels",               category: "Analytics", price: { low: 200,  high: 400  }, hours: 10, applicableTo: ["website","web-app","mobile-app","saas"],               popular: true  },
    { id: "analytics-advanced", label: "Custom Analytics Dashboard", description: "Charts, KPIs, user cohorts, retention",    category: "Analytics", price: { low: 800,  high: 1500 }, hours: 40, applicableTo: ["web-app","saas","enterprise"]                                            },

    // ── Notifications & Engagement ─────────────────────────────────────────────
    { id: "push-notifications",label: "Push Notifications",     description: "Mobile/web push alerts (Firebase)",               category: "Notifications", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["mobile-app","web-app"],                                popular: true  },
    { id: "email-automation",  label: "Email Automation",       description: "Transactional & drip emails via Resend/SendGrid", category: "Notifications", price: { low: 500,  high: 1000 }, hours: 25, applicableTo: ["web-app","mobile-app","saas","enterprise"]                        },
    { id: "sms-whatsapp",      label: "SMS / WhatsApp Alerts",  description: "OTPs, order updates, reminders",                  category: "Notifications", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["web-app","mobile-app","saas","enterprise"]                        },
    { id: "in-app-chat",       label: "In-App Chat / Messaging",description: "Real-time P2P or group messaging",                category: "Notifications", price: { low: 1200, high: 2500 }, hours: 60, applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── Integration ─────────────────────────────────────────────────────────────
    { id: "api-third-party",   label: "Third-Party API Integrations", description: "Connect external services (ERP, accounting)", category: "Integrations", price: { low: 600,  high: 1200 }, hours: 30, applicableTo: ["web-app","mobile-app","saas","enterprise"]                   },
    { id: "webhooks",          label: "Webhooks & Event Triggers",    description: "Real-time event delivery to external systems", category: "Integrations", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["saas","enterprise","web-app"]                                 },
    { id: "erp-integration",   label: "ERP / Tally / SAP Integration",description: "Sync with existing ERP systems",              category: "Integrations", price: { low: 2000, high: 4000 }, hours: 90, applicableTo: ["enterprise"]                                                   },
    { id: "public-api",        label: "Public REST API / GraphQL",    description: "Developer API with docs and versioning",       category: "Integrations", price: { low: 1000, high: 2000 }, hours: 50, applicableTo: ["saas","enterprise","web-app"]                                 },

    // ── DevOps & Performance ───────────────────────────────────────────────────
    { id: "devops-ci-cd",    label: "CI/CD Pipeline",           description: "Automated testing, builds, and deployments",       category: "DevOps", price: { low: 500,  high: 1000 }, hours: 25, applicableTo: ["web-app","mobile-app","saas","enterprise","ai-ml"]                   },
    { id: "devops-docker",   label: "Docker & Kubernetes",      description: "Containerized, scalable infrastructure",           category: "DevOps", price: { low: 800,  high: 1500 }, hours: 40, applicableTo: ["saas","enterprise","ai-ml"]                                           },
    { id: "devops-monitoring",label: "Monitoring & Alerting",   description: "Uptime, error tracking, performance alerts",       category: "DevOps", price: { low: 400,  high: 800  }, hours: 20, applicableTo: ["web-app","saas","enterprise","ai-ml"]                                },
    { id: "devops-caching",  label: "Redis Caching Layer",      description: "Speed up queries with in-memory cache",            category: "DevOps", price: { low: 300,  high: 600  }, hours: 15, applicableTo: ["web-app","saas","enterprise","ai-ml"]                                },
  ],

  multipliers: {
    design: {
      label: "Design Level",
      options: [
        { id: "template",  label: "Template-based",           factor: 1.0, description: "Fast & cost-effective, proven UI patterns" },
        { id: "custom",    label: "Custom Design",            factor: 1.3, description: "Branded, tailored to your identity" },
        { id: "premium",   label: "Premium / Award-winning",  factor: 1.8, description: "Micro-animations, top-tier UX, polished" },
      ],
    },
    complexity: {
      label: "Complexity",
      options: [
        { id: "simple",   label: "Simple",       factor: 1.0, description: "CRUD, basic flows, few integrations" },
        { id: "standard", label: "Standard",     factor: 1.25, description: "Multiple integrations, moderate logic" },
        { id: "complex",  label: "Very Complex", factor: 1.6, description: "Real-time, AI, complex business rules" },
      ],
    },
    timeline: {
      label: "Timeline",
      options: [
        { id: "relaxed",     label: "Relaxed (no rush)",   factor: 0.9,  description: "Flexible deadline, best value" },
        { id: "standard",    label: "Standard",            factor: 1.0,  description: "Typical project pacing" },
        { id: "accelerated", label: "Accelerated",         factor: 1.25, description: "Faster than usual, small premium" },
        { id: "rush",        label: "Rush (ASAP)",         factor: 1.6,  description: "Prioritised sprints, highest cost" },
      ],
    },
    platform: {
      label: "Platform",
      options: [
        { id: "cross-platform",  label: "Cross-platform (React Native / Flutter)", factor: 1.0,  description: "iOS + Android from one codebase" },
        { id: "single-native",   label: "Single Native (iOS or Android)",          factor: 1.2,  description: "Best performance for one platform" },
        { id: "both-native",     label: "Both Native (iOS and Android)",           factor: 1.85, description: "Separate codebases, maximum performance" },
      ],
    },
  },

  costBreakdown: {
    development:      0.50,
    design:           0.15,
    qa:               0.15,
    projectManagement:0.10,
    devOps:           0.05,
    contingency:      0.05,
  },

  annualMaintenancePercent: 0.15,
};
