import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createCheckout } from "@/lib/lemonsqueezy";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const checkoutUrl = await createCheckout(user.email, user.id);

    return NextResponse.json({
      success: true,
      data: { url: checkoutUrl },
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
