import type { Metadata } from "next";
import { getPageMeta } from "@/utils/seo";
import GeneratePageClient from "./GeneratePageClient";

export const metadata: Metadata = getPageMeta("generate") as Metadata;

// Force dynamic rendering — depends on auth state
export const dynamic = "force-dynamic";

export default function GeneratePage() {
  return <GeneratePageClient />;
}
