import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

type PageMetaKey = "home" | "generate" | "pricing" | "privacy" | "impressum";

/** SEO metadata per page */
const PAGE_META: Record<PageMetaKey, Metadata> = {
  home: {
    title: "UseHookify — AI Hook Generator for TikTok & Shorts",
    description:
      "Generate viral hooks, titles, and thumbnail ideas for TikTok, YouTube Shorts, and Reels. Powered by AI. Free to start.",
    openGraph: {
      title: "UseHookify — AI Hook Generator for TikTok & Shorts",
      description:
        "Generate viral hooks, titles, and thumbnail ideas for TikTok, YouTube Shorts, and Reels. Powered by AI.",
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "UseHookify — AI Hook Generator for TikTok & Shorts",
      description:
        "Generate viral hooks, titles, and thumbnail ideas. Powered by AI.",
      images: [SITE_CONFIG.ogImage],
    },
    alternates: { canonical: SITE_CONFIG.url },
  },
  generate: {
    title: "Generate Hooks — UseHookify",
    description:
      "Create attention-grabbing hooks, video titles, and thumbnail concepts for your short-form content. AI-powered generation.",
    openGraph: {
      title: "Generate Hooks — UseHookify",
      description:
        "Create attention-grabbing hooks and titles for short-form videos.",
      url: `${SITE_CONFIG.url}/generate`,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
    },
    alternates: { canonical: `${SITE_CONFIG.url}/generate` },
  },
  pricing: {
    title: "Pricing — UseHookify",
    description:
      "Upgrade to UseHookify Pro for unlimited hooks, more titles, and premium thumbnail ideas. Start free, upgrade anytime.",
    openGraph: {
      title: "Pricing — UseHookify",
      description: "Start free or go Pro for unlimited AI hook generation.",
      url: `${SITE_CONFIG.url}/pricing`,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
    },
    alternates: { canonical: `${SITE_CONFIG.url}/pricing` },
  },
  privacy: {
    title: "Privacy Policy — UseHookify",
    description:
      "Read our privacy policy to understand how UseHookify handles your data.",
    alternates: { canonical: `${SITE_CONFIG.url}/privacy` },
  },
  impressum: {
    title: "Impressum — UseHookify",
    description: "Legal information and impressum for UseHookify.",
    alternates: { canonical: `${SITE_CONFIG.url}/impressum` },
  },
};

export function getPageMeta(page: PageMetaKey): Metadata {
  return PAGE_META[page];
}
