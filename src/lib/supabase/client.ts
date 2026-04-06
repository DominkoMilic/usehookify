import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Supabase client for browser/client-side usage */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During CI/build (or misconfigured envs), avoid hard-crashing prerender.
  if (!url || !anonKey) {
    if (typeof window !== "undefined") {
      console.warn(
        "Supabase client is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      );
    }
    return null;
  }

  return createBrowserClient(url, anonKey);
}

export type BrowserSupabaseClient = SupabaseClient | null;
