const LEMONSQUEEZY_API_URL = "https://api.lemonsqueezy.com/v1";

/** Headers for LemonSqueezy API requests */
function getHeaders(): HeadersInit {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
  };
}

/** Create a checkout URL for a user */
export async function createCheckout(
  email: string,
  userId: string,
): Promise<string> {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID!;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID!;

  const response = await fetch(`${LEMONSQUEEZY_API_URL}/checkouts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email,
            custom: { user_id: userId },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/generate?upgraded=true`,
          },
        },
        relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: variantId } },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LemonSqueezy checkout failed: ${error}`);
  }

  const data = await response.json();
  return data.data.attributes.url;
}

/** Verify a subscription is active for a given subscription ID */
export async function getSubscription(
  subscriptionId: string,
): Promise<{ status: string; renewsAt: string | null }> {
  const response = await fetch(
    `${LEMONSQUEEZY_API_URL}/subscriptions/${subscriptionId}`,
    { headers: getHeaders() },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subscription");
  }

  const data = await response.json();
  const attrs = data.data.attributes;

  return {
    status: attrs.status,
    renewsAt: attrs.renews_at,
  };
}

/** Validate LemonSqueezy webhook signature */
export function validateWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  // LemonSqueezy uses HMAC-SHA256
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
