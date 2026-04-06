import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/shared/CookieBanner";
import { CookieConsentProvider } from "@/hooks/useCookieConsent";
import { ThemeProvider } from "@/hooks/useTheme";
import { SITE_CONFIG } from "@/lib/constants";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "UseHookify — AI Hook Generator for TikTok & Shorts",
    template: "%s | UseHookify",
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_CONFIG.ogImage],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>
          <CookieConsentProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <CookieBanner />
          </CookieConsentProvider>
        </ThemeProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#212529",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
