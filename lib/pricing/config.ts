/**
 * Teklin Pricing Configuration — Indian Market Edition
 *
 * All `price` values are in USD. Converted to INR at runtime
 * using USD_TO_INR_RATE (default ₹83.5).
 *
 * Calibrated to Teklin's real-world quotes:
 *   Single-vendor ecommerce (web + app + admin)  → ₹50K–₹1L
 *   Multi-vendor ecommerce                       → ₹1.5L–₹2L
 *   Cab / ride-hailing (user + driver + admin)   → ≈ ₹2L
 */
import { PricingConfig } from "./types";

export const pricingConfig: PricingConfig = {
  version: "2.0.0",
  effectiveDate: "2025-01-01",
  /** Blended hourly rate (USD) — display only */
  blendedRateUSD: 12,
  /** ±20% range spread around midpoint */
  rangeSpread: 0.20,
  roundingUSD: 10,
  roundingINR: 500,

  // ─── Base skeleton costs (USD) ─────────────────────────────────────────────
  baseCosts: {
    "website":    { low:  70, high:  160, hours: 25 },  // ₹5.8K–₹13.4K
    "web-app":    { low: 120, high:  280, hours: 55 },  // ₹10K–₹23.4K
    "mobile-app": { low: 180, high:  400, hours: 70 },  // ₹15K–₹33.4K
    "saas":       { low: 480, high: 1100, hours: 140 }, // ₹40K–₹91.9K
    "enterprise": { low: 960, high: 2400, hours: 280 }, // ₹80K–₹2L
    "ai-ml":      { low: 720, high: 1800, hours: 200 }, // ₹60K–₹1.5L
  },

  features: [
    // ── Authentication ──────────────────────────────────────────────────────
    { id: "auth-basic",   label: "Email / Password Login",      description: "Register, login, forgot password",                 category: "Authentication", price: { low: 12, high: 25  }, hours: 8,  applicableTo: ["web-app","mobile-app","saas","enterprise"],           popular: true  },
    { id: "auth-social",  label: "Social Login (Google/Apple)", description: "OAuth via Google, Apple, Facebook",                category: "Authentication", price: { low: 18, high: 38  }, hours: 12, applicableTo: ["web-app","mobile-app","saas"],                         popular: true  },
    { id: "auth-2fa",     label: "OTP / 2-Factor Auth",         description: "SMS or email OTP for extra security",              category: "Authentication", price: { low: 18, high: 38  }, hours: 12, applicableTo: ["web-app","mobile-app","saas","enterprise"]                       },
    { id: "auth-roles",   label: "Role-Based Access (RBAC)",    description: "Admin, manager, viewer permission tiers",          category: "Authentication", price: { low: 25, high: 55  }, hours: 18, applicableTo: ["web-app","saas","enterprise"],                         popular: true  },
    { id: "auth-sso",     label: "SSO / SAML Login",            description: "Enterprise single sign-on (Okta, Azure AD)",       category: "Authentication", price: { low: 80, high: 160 }, hours: 36, applicableTo: ["enterprise","saas"]                                                },
    { id: "auth-magic",   label: "Magic Link / Passwordless",   description: "One-click email authentication",                   category: "Authentication", price: { low: 12, high: 25  }, hours: 8,  applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── Payments ────────────────────────────────────────────────────────────
    { id: "payments-gateway",      label: "Razorpay / Stripe / UPI",       description: "Online payments — UPI, cards, net banking",   category: "Payments", price: { low: 30, high:  60  }, hours: 16, applicableTo: ["website","web-app","mobile-app","saas","enterprise"], popular: true  },
    { id: "payments-subscriptions",label: "Subscription / Recurring Plans",description: "Auto-renew, free trials, promo codes",         category: "Payments", price: { low: 45, high:  90  }, hours: 24, applicableTo: ["saas","enterprise","web-app"],                         popular: true  },
    { id: "payments-invoicing",    label: "GST Invoices & Receipts",        description: "Auto-generate GST-compliant PDF invoices",     category: "Payments", price: { low: 25, high:  50  }, hours: 14, applicableTo: ["saas","enterprise","web-app"]                                    },
    { id: "payments-wallet",       label: "In-App Wallet / Credits",        description: "User balance, top-up, redeem",                 category: "Payments", price: { low: 40, high:  80  }, hours: 20, applicableTo: ["mobile-app","web-app","saas"]                                    },
    { id: "payments-split",        label: "Split / Marketplace Payouts",    description: "Automated payouts to multiple vendors",        category: "Payments", price: { low: 80, high: 160  }, hours: 36, applicableTo: ["saas","enterprise","web-app"]                                    },

    // ── Core Features ───────────────────────────────────────────────────────
    { id: "search-filter",  label: "Search & Filters",           description: "Keyword search + category / price filters",       category: "Core Features", price: { low: 18, high: 36 }, hours: 12, applicableTo: ["website","web-app","mobile-app","saas","enterprise"], popular: true  },
    { id: "upload-files",   label: "File / Image Uploads",        description: "Upload photos, docs to cloud storage",            category: "Core Features", price: { low: 15, high: 30 }, hours: 10, applicableTo: ["web-app","mobile-app","saas","enterprise"],            popular: true  },
    { id: "geo-maps",       label: "Maps & GPS Tracking",         description: "Google Maps, live location, radius search",       category: "Core Features", price: { low: 35, high: 70 }, hours: 20, applicableTo: ["website","web-app","mobile-app","enterprise"]                    },
    { id: "realtime",       label: "Real-Time Updates / Live",    description: "Live data, WebSocket — tracking, feeds, chat",    category: "Core Features", price: { low: 60, high: 120}, hours: 30, applicableTo: ["web-app","mobile-app","saas","enterprise"]                       },
    { id: "offline-mode",   label: "Offline Mode",                description: "App works without internet connection",           category: "Core Features", price: { low: 60, high: 120}, hours: 28, applicableTo: ["mobile-app","enterprise"]                                        },
    { id: "multi-language", label: "Multi-Language (Hindi + EN)", description: "Translate UI to Hindi and other languages",       category: "Core Features", price: { low: 25, high: 50 }, hours: 16, applicableTo: ["website","web-app","mobile-app","saas","enterprise"]              },
    { id: "review-rating",  label: "Reviews & Ratings",           description: "Star ratings, written reviews, moderation",      category: "Core Features", price: { low: 20, high: 40 }, hours: 14, applicableTo: ["website","web-app","mobile-app","saas"]                          },
    { id: "referral",       label: "Referral & Coupon System",    description: "Shareable referral codes, reward tracking",      category: "Core Features", price: { low: 25, high: 55 }, hours: 16, applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── Content ─────────────────────────────────────────────────────────────
    { id: "cms",           label: "CMS / Content Manager",        description: "Edit pages, banners, products from admin",        category: "Content", price: { low: 35, high: 70  }, hours: 20, applicableTo: ["website","web-app","enterprise"],                      popular: true  },
    { id: "blog",          label: "Blog / News / Articles",       description: "Full blog with tags, SEO, categories",            category: "Content", price: { low: 20, high: 40  }, hours: 14, applicableTo: ["website","web-app"]                                                },
    { id: "media-gallery", label: "Photo / Video Gallery",        description: "Image/video gallery with lightbox",               category: "Content", price: { low: 15, high: 30  }, hours: 10, applicableTo: ["website","web-app","mobile-app"]                                  },
    { id: "video-stream",  label: "Video Streaming / OTT",        description: "HLS video, custom player, CDN delivery",          category: "Content", price: { low: 100, high: 200}, hours: 48, applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── Admin & Management ─────────────────────────────────────────────────
    { id: "admin-dashboard",label: "Admin Dashboard",             description: "Backoffice: users, orders, settings, data",       category: "Admin", price: { low: 60, high: 120 }, hours: 32, applicableTo: ["web-app","saas","enterprise","mobile-app"],              popular: true  },
    { id: "admin-reports",  label: "Reports & Analytics Export",  description: "Charts, KPIs, CSV / Excel / PDF reports",         category: "Admin", price: { low: 35, high: 70  }, hours: 20, applicableTo: ["web-app","saas","enterprise"]                                        },
    { id: "admin-crm",      label: "CRM / Customer Management",   description: "Leads, contacts, follow-ups, notes",              category: "Admin", price: { low: 90, high: 180 }, hours: 44, applicableTo: ["saas","enterprise","web-app"]                                        },
    { id: "vendor-portal",  label: "Vendor / Seller Portal",      description: "Vendors manage products, orders, payouts",        category: "Admin", price: { low: 80, high: 160 }, hours: 40, applicableTo: ["web-app","saas","enterprise"],                         popular: true  },
    { id: "delivery-mgmt",  label: "Delivery / Driver Management",description: "Assign orders, track drivers, ETA updates",       category: "Admin", price: { low: 70, high: 140 }, hours: 36, applicableTo: ["web-app","mobile-app","enterprise"]                                  },

    // ── Notifications ──────────────────────────────────────────────────────
    { id: "push-notif",   label: "Push Notifications",            description: "Mobile & web push alerts via Firebase",           category: "Notifications", price: { low: 15, high: 30  }, hours: 10, applicableTo: ["mobile-app","web-app"],                                popular: true  },
    { id: "email-auto",   label: "Email Automation",              description: "Welcome, OTP, order emails via Resend/SES",       category: "Notifications", price: { low: 20, high: 40  }, hours: 12, applicableTo: ["web-app","mobile-app","saas","enterprise"]                        },
    { id: "sms-whatsapp", label: "SMS / WhatsApp Notifications",  description: "OTPs, order updates, reminders via Twilio",       category: "Notifications", price: { low: 20, high: 40  }, hours: 12, applicableTo: ["web-app","mobile-app","saas","enterprise"]                        },
    { id: "in-app-chat",  label: "In-App Chat / Messaging",       description: "Real-time customer or peer-to-peer chat",         category: "Notifications", price: { low: 70, high: 140 }, hours: 36, applicableTo: ["web-app","mobile-app","saas"]                                    },

    // ── AI & ML ────────────────────────────────────────────────────────────
    { id: "ai-chatbot",   label: "AI Chatbot / Support Bot",      description: "LLM-powered FAQ or customer support assistant",   category: "AI & ML", price: { low: 120, high: 240 }, hours: 50, applicableTo: ["website","web-app","mobile-app","saas","ai-ml"],        popular: true  },
    { id: "ai-recommend", label: "AI Recommendations",            description: "Personalised product/content suggestions by ML",  category: "AI & ML", price: { low: 150, high: 300 }, hours: 60, applicableTo: ["web-app","mobile-app","saas","ai-ml"]                                   },
    { id: "ai-search",    label: "Smart / Semantic Search",       description: "Vector-based intelligent search results",         category: "AI & ML", price: { low: 100, high: 200 }, hours: 48, applicableTo: ["web-app","saas","ai-ml","enterprise"]                                  },
    { id: "ai-ocr",       label: "Document OCR / Extraction",     description: "Read text from PDFs, images, ID cards, forms",   category: "AI & ML", price: { low: 80,  high: 160 }, hours: 40, applicableTo: ["enterprise","ai-ml","saas"]                                             },
    { id: "ai-analytics", label: "Predictive Analytics",          description: "Forecasting, anomaly detection, ML pipelines",   category: "AI & ML", price: { low: 160, high: 320 }, hours: 70, applicableTo: ["enterprise","ai-ml","saas"]                                             },

    // ── Integrations ───────────────────────────────────────────────────────
    { id: "api-integ",    label: "Third-Party API Integration",   description: "Connect external services (logistics, payments)", category: "Integrations", price: { low: 35, high:  70  }, hours: 18, applicableTo: ["web-app","mobile-app","saas","enterprise"]                   },
    { id: "public-api",   label: "Public REST API / GraphQL",     description: "Developer API with docs and versioning",          category: "Integrations", price: { low: 60, high: 120  }, hours: 28, applicableTo: ["saas","enterprise","web-app"]                                 },
    { id: "erp-integ",    label: "ERP / Tally / SAP Sync",        description: "Sync with existing business ERP systems",        category: "Integrations", price: { low: 150, high: 300 }, hours: 60, applicableTo: ["enterprise"]                                                   },
    { id: "shipping-api", label: "Shiprocket / Delhivery",        description: "Auto-assign couriers, track shipments",          category: "Integrations", price: { low: 30, high:  60  }, hours: 16, applicableTo: ["web-app","mobile-app","enterprise"]                          },
    { id: "analytics-ga", label: "Analytics (GA4 / PostHog)",     description: "Page views, events, funnels, user journeys",     category: "Integrations", price: { low: 8,  high:  18  }, hours: 6,  applicableTo: ["website","web-app","mobile-app","saas"]                       },

    // ── DevOps ─────────────────────────────────────────────────────────────
    { id: "devops-deploy", label: "CI/CD Auto Deployment",        description: "Automated test-build-deploy pipeline",            category: "DevOps", price: { low: 30, high: 60  }, hours: 16, applicableTo: ["web-app","mobile-app","saas","enterprise","ai-ml"]                   },
    { id: "devops-docker", label: "Docker / Kubernetes",          description: "Containerised, scalable infrastructure",         category: "DevOps", price: { low: 50, high: 100 }, hours: 24, applicableTo: ["saas","enterprise","ai-ml"]                                           },
    { id: "devops-monitor",label: "Monitoring & Uptime Alerts",   description: "Error tracking, performance alerts, logs",       category: "DevOps", price: { low: 25, high: 50  }, hours: 12, applicableTo: ["web-app","saas","enterprise","ai-ml"]                                },
  ],

  multipliers: {
    design: {
      label: "Design Level",
      options: [
        { id: "template", label: "Standard UI",       factor: 1.00, description: "Clean, functional — Bootstrap/Material style" },
        { id: "custom",   label: "Custom Design",     factor: 1.25, description: "Branded UI/UX tailored to your identity" },
        { id: "premium",  label: "Premium / Animated",factor: 1.70, description: "Award-quality, micro-animations, polished" },
      ],
    },
    complexity: {
      label: "Complexity",
      options: [
        { id: "simple",   label: "Simple",   factor: 1.00, description: "Basic CRUD, few integrations" },
        { id: "standard", label: "Standard", factor: 1.25, description: "Multiple integrations, moderate logic" },
        { id: "complex",  label: "Complex",  factor: 1.55, description: "Real-time, AI, complex business rules" },
      ],
    },
    timeline: {
      label: "Delivery Speed",
      options: [
        { id: "relaxed",     label: "Relaxed",     factor: 0.90, description: "No rush, flexible — best value" },
        { id: "standard",    label: "Standard",    factor: 1.00, description: "Typical delivery pace" },
        { id: "accelerated", label: "Fast-Track",  factor: 1.25, description: "Prioritised sprints, small premium" },
        { id: "rush",        label: "ASAP / Rush", factor: 1.55, description: "Dedicated team, highest priority" },
      ],
    },
    platform: {
      label: "Mobile Platform",
      options: [
        { id: "cross-platform", label: "Cross-Platform (Flutter / RN)", factor: 1.00, description: "iOS + Android from one codebase — best value" },
        { id: "single-native",  label: "Single Native (iOS or Android)", factor: 1.20, description: "Optimised for one platform" },
        { id: "both-native",    label: "Both Native (iOS + Android)",    factor: 1.80, description: "Separate codebases — max performance" },
      ],
    },
  },

  costBreakdown: {
    development:       0.50,
    design:            0.15,
    qa:                0.15,
    projectManagement: 0.10,
    devOps:            0.05,
    contingency:       0.05,
  },

  annualMaintenancePercent: 0.20,
};
