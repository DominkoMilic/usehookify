import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { validateWebhookSignature } from "@/lib/lemonsqueezy";
import type { WebhookPayload } from "@/types";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature") || "";
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

    // Validate webhook signature
    if (!validateWebhookSignature(rawBody, signature, secret)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload: WebhookPayload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const subscriptionId = payload.data.id;
    const userId = payload.meta.custom_data?.user_id;

    if (!userId) {
      console.error("No user_id in webhook custom data");
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Map LemonSqueezy event to subscription status
    let subscriptionStatus: string;

    switch (eventName) {
      case "subscription_created":
      case "subscription_resumed":
      case "subscription_payment_success":
        subscriptionStatus = "active";
        break;
      case "subscription_updated":
        subscriptionStatus =
          payload.data.attributes.status === "active"
            ? "active"
            : payload.data.attributes.status;
        break;
      case "subscription_cancelled":
        subscriptionStatus = "cancelled";
        break;
      case "subscription_expired":
        subscriptionStatus = "expired";
        break;
      case "subscription_payment_failed":
        subscriptionStatus = "expired";
        break;
      default:
        console.log(`Unhandled webhook event: ${eventName}`);
        return NextResponse.json({ received: true });
    }

    // Update user profile in Supabase
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        subscription_status: subscriptionStatus,
        subscription_id: subscriptionId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Failed to update profile:", updateError);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 },
      );
    }

    console.log(
      `Webhook processed: ${eventName} for user ${userId} → ${subscriptionStatus}`,
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
