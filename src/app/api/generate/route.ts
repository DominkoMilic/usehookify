import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateContent } from "@/lib/geminiApi";
import { checkRateLimit } from "@/lib/rateLimit";
import { validateTopic, sanitizeInput } from "@/utils/validation";
import { isSameDay, getTodayISO } from "@/utils/helpers";
import { FREE_TIER, PAID_TIER } from "@/lib/constants";

/** Allow up to 60s for image generation */
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    // 2. Rate limit check (10 requests per minute per user)
    const rateCheck = checkRateLimit(user.id, {
      maxRequests: 10,
      windowMs: 60_000,
    });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a moment and try again.",
        },
        { status: 429 },
      );
    }

    // 3. Parse and validate input
    const body = await request.json();
    const topic = sanitizeInput(body.topic || "");
    const validation = validateTopic(topic);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 },
      );
    }

    // 4. Get or create user profile
    let { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      // Create profile for new user
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
          subscription_status: "free",
          daily_generations_count: 0,
          last_generation_date: null,
        })
        .select()
        .single();

      if (createError) {
        console.error("Profile creation error:", createError);
        return NextResponse.json(
          { success: false, error: "Failed to create profile." },
          { status: 500 },
        );
      }
      profile = newProfile;
    }

    // 5. Check subscription status
    const isPaid = profile.subscription_status === "active";
    const tier = isPaid ? "paid" : "free";
    const maxGenerations = isPaid
      ? PAID_TIER.maxDailyGenerations
      : FREE_TIER.maxDailyGenerations;

    // 6. Check and reset daily usage
    const today = getTodayISO();
    let currentCount = profile.daily_generations_count || 0;

    if (
      !profile.last_generation_date ||
      !isSameDay(new Date(profile.last_generation_date), new Date())
    ) {
      // New day — reset counter
      currentCount = 0;
    }

    if (currentCount >= maxGenerations) {
      return NextResponse.json(
        {
          success: false,
          error: isPaid
            ? "Daily generation limit reached. Please try again tomorrow."
            : "Free daily limit reached. Upgrade to Pro for more generations!",
        },
        { status: 403 },
      );
    }

    // 7. Generate content via Gemini AI
    const results = await generateContent(topic, tier);

    // 8. Increment usage
    await supabase
      .from("profiles")
      .update({
        daily_generations_count: currentCount + 1,
        last_generation_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
