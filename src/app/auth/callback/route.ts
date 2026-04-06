import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/** Ensure a profile row exists for the authenticated user */
async function ensureProfile(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingProfile) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        subscription_status: "free",
        daily_generations_count: 0,
        last_generation_date: null,
      });
    }
  }
}

/** Auth callback handler — supports PKCE code flow (OAuth) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/generate";

  const supabase = await createServerSupabaseClient();

  // PKCE flow — OAuth provider redirect
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      await ensureProfile(supabase);
      return NextResponse.redirect(new URL(next, request.url));
    }
    console.warn("Auth callback — code exchange failed:", error.message);
  }

  // Something went wrong — redirect to home with error
  return NextResponse.redirect(new URL("/?error=auth", request.url));
}
