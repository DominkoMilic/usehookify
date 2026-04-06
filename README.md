# UseHookify — AI Hook Generator for TikTok & Shorts

Generate viral hooks, attention-grabbing titles, and thumbnail ideas for TikTok, YouTube Shorts, and Reels — powered by AI.

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable                        | Description                |
| ------------------------------- | -------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key   |
| `GEMINI_API_KEY`                | Google Gemini API key      |
| `LEMONSQUEEZY_API_KEY`          | LemonSqueezy API key       |
| `LEMONSQUEEZY_WEBHOOK_SECRET`   | Webhook signing secret     |
| `LEMONSQUEEZY_STORE_ID`         | Your LemonSqueezy store ID |
| `LEMONSQUEEZY_VARIANT_ID`       | Product variant ID         |
| `NEXT_PUBLIC_APP_URL`           | Your production URL        |

### 3. Set up Supabase

1. Create a new Supabase project
2. Run the SQL from `supabase/schema.sql` in the Supabase SQL Editor
3. Enable Google OAuth in Supabase Auth settings
4. Add your redirect URL: `https://usehookify.com/auth/callback`

### 4. Set up LemonSqueezy

1. Create a store on LemonSqueezy
2. Create a subscription product ($9/month)
3. Set up a webhook pointing to `https://usehookify.com/api/webhooks/lemonsqueezy`
4. Copy the webhook secret, store ID, and variant ID to your env

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── checkout/       # LemonSqueezy checkout creation
│   │   ├── generate/       # AI content generation endpoint
│   │   ├── usage/          # Usage tracking endpoint
│   │   └── webhooks/       # LemonSqueezy webhook handler
│   ├── auth/callback/      # OAuth callback handler
│   ├── generate/           # Hook generator page
│   ├── pricing/            # Pricing page
│   ├── privacy/            # Privacy policy
│   ├── impressum/          # Impressum (legal)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── loading.tsx         # Loading UI
│   ├── error.tsx           # Error page (500)
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── generator/          # Generator-specific components
│   ├── landing/            # Landing page sections
│   ├── layout/             # Navbar, Footer
│   └── shared/             # Shared components (Loaders, CookieBanner)
├── hooks/                  # Custom React hooks
├── lib/                    # Core libraries & clients
│   ├── supabase/           # Supabase client/server/middleware
│   ├── constants.ts        # App-wide constants
│   ├── geminiApi.ts        # Gemini AI integration
│   ├── lemonsqueezy.ts     # LemonSqueezy integration
│   └── rateLimit.ts        # Rate limiting
├── styles/
│   └── globals.css         # Global Tailwind styles
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── helpers.ts          # Utility functions
│   ├── seo.ts              # SEO metadata config
│   └── validation.ts       # Input validation
└── middleware.ts            # Auth session middleware
```

## 🔑 Features

- **AI Hook Generation** — Gemini-powered titles, hooks, and thumbnail ideas
- **Free & Paid Tiers** — 3 free generations/day, upgrade for 100/day
- **Google OAuth** — Secure authentication via Supabase
- **Subscription Payments** — LemonSqueezy with automatic VAT handling
- **Server-side Limits** — Usage enforced on the backend
- **Rate Limiting** — In-memory rate limiter on AI endpoints
- **SEO Optimized** — Meta tags, OpenGraph, sitemap, robots.txt
- **Responsive Design** — Mobile-first with Tailwind CSS
- **Animations** — Smooth transitions with Framer Motion
- **Cookie Consent** — GDPR-compliant cookie banner
- **Error Handling** — Custom 404 and 500 pages

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth & DB:** Supabase
- **Payments:** LemonSqueezy
- **AI:** Google Gemini API
- **Animations:** Framer Motion
- **Notifications:** react-hot-toast

## 📄 License

All rights reserved. © UseHookify
