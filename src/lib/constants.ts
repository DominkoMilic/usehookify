/** Site-wide constants and configuration */

export const SITE_CONFIG = {
  name: "UseHookify",
  description:
    "AI-powered hook generator for TikTok, YouTube Shorts, and Reels. Create viral titles, hooks, and thumbnail ideas in seconds.",
  url: "https://usehookify.com",
  ogImage: "https://usehookify.com/images/open_Gl.png",
} as const;

/** Navigation links */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/generate/", label: "Generate" },
  { href: "/pricing/", label: "Pricing" },
] as const;

/** Footer links */
export const FOOTER_LINKS = {
  product: [
    { href: "/generate/", label: "Generator" },
    { href: "/pricing/", label: "Pricing" },
  ],
  legal: [
    { href: "/privacy/", label: "Privacy Policy" },
    { href: "/impressum/", label: "Impressum" },
  ],
} as const;

/** Free tier limits */
export const FREE_TIER = {
  maxDailyGenerations: 3,
  titles: 3,
  hooks: 3,
  thumbnails: 1,
} as const;

/** Paid tier limits */
export const PAID_TIER = {
  maxDailyGenerations: 100,
  titles: 10,
  hooks: 10,
  thumbnails: 5,
} as const;
