import type { Metadata } from "next";
import { getPageMeta } from "@/utils/seo";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = getPageMeta("pricing") as Metadata;

export default function PricingPage() {
  return <PricingPageClient />;
}
