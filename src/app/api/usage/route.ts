import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSameDay } from "@/utils/helpers";
import { FREE_TIER, PAID_TIER } from "@/lib/constants";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Get or create profile
    let { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      const { data: newProfile } = await supabase
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

      profile = newProfile;
    }

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Failed to load profile" },
        { status: 500 },
      );
    }

    const isPaid = profile.subscription_status === "active";
    const maxGenerations = isPaid
      ? PAID_TIER.maxDailyGenerations
      : FREE_TIER.maxDailyGenerations;

    // Check if usage should be reset (new day)
    let used = profile.daily_generations_count || 0;
    if (
      !profile.last_generation_date ||
      !isSameDay(new Date(profile.last_generation_date), new Date())
    ) {
      used = 0;
    }

    return NextResponse.json({
      success: true,
      data: {
        used,
        limit: maxGenerations,
        remaining: Math.max(0, maxGenerations - used),
        isPaid,
      },
    });
  } catch (error) {
    console.error("Usage API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
