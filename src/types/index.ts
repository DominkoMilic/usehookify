/** User profile stored in Supabase */
export interface UserProfile {
  id: string;
  email: string;
  subscription_status: "free" | "active" | "cancelled" | "expired";
  subscription_id: string | null;
  daily_generations_count: number;
  last_generation_date: string | null;
  created_at: string;
  updated_at: string;
}

/** Tier configuration for AI generation */
export interface TierConfig {
  titles: number;
  hooks: number;
  thumbnails: number;
}

/** A single generated thumbnail with image data */
export interface ThumbnailResult {
  /** Base64 data URI (data:image/png;base64,...) */
  imageData: string;
  /** Short description of what was generated */
  description: string;
}

/** Result of AI generation */
export interface GenerationResult {
  titles: string[];
  hooks: string[];
  thumbnails: ThumbnailResult[];
}

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Usage info returned to the client */
export interface UsageInfo {
  used: number;
  limit: number;
  remaining: number;
  isPaid: boolean;
}

/** Generate request body */
export interface GenerateRequest {
  topic: string;
}

/** LemonSqueezy webhook event types */
export type WebhookEventType =
  | "subscription_created"
  | "subscription_updated"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_payment_success"
  | "subscription_payment_failed";

/** LemonSqueezy webhook payload */
export interface WebhookPayload {
  meta: {
    event_name: WebhookEventType;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    id: string;
    attributes: {
      status: string;
      user_email: string;
      renews_at: string | null;
      ends_at: string | null;
      [key: string]: unknown;
    };
  };
}
