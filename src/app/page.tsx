import { getPageMeta } from "@/utils/seo";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";

export const metadata = getPageMeta("home");

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <PricingSection />
      <CTASection />
    </>
  );
}
