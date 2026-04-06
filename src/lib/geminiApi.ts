import { GoogleGenAI } from "@google/genai";
import type { GenerationResult, TierConfig, ThumbnailResult } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

/** Models */
const TEXT_MODEL = "gemini-2.5-flash";
const IMAGE_MODEL = "gemini-2.5-flash-image";

/** Tier configuration for free vs paid generation limits */
const TIER_CONFIG: Record<"free" | "paid", TierConfig> = {
  free: { titles: 3, hooks: 3, thumbnails: 1 },
  paid: { titles: 10, hooks: 10, thumbnails: 3 },
};

/** System instruction for understanding user intent and short-form content */
const SYSTEM_INSTRUCTION = `You are UseHookify AI — an expert viral content strategist specializing in short-form video platforms (TikTok, YouTube Shorts, Instagram Reels).

Your knowledge covers:
- Platform-specific algorithm triggers (watch time, shares, saves, comments)
- Psychological hooks: curiosity gaps, pattern interrupts, controversy, relatability, FOMO
- Trending content formats: storytimes, POVs, "did you know", hot takes, listicles, challenges
- Audience retention techniques: open loops, cliffhangers, emotional triggers

When the user provides a topic, you MUST:
1. Interpret their intent generously — even vague topics should produce specific, high-quality output
2. Adapt tone to match the topic (humorous for funny topics, authoritative for educational, emotional for personal topics)
3. Use current creator language and trends (not corporate/generic phrasing)
4. Optimize for the first 1-3 seconds of viewer attention`;

/**
 * Generate video titles using Gemini AI with improved prompts
 */
async function generateTitles(topic: string, count: number): Promise<string[]> {
  const prompt = `Generate exactly ${count} viral short-form video titles about: "${topic}"

REQUIREMENTS:
- Every title MUST create an irresistible urge to click/watch
- Use proven patterns: curiosity gaps ("I tried X for 30 days"), challenges, hot takes, reveals
- Mix emotional triggers: surprise, FOMO, controversy, humor, relatability
- Under 80 characters each — punchy and scannable
- Platform-native language (how real creators talk, not corporate speak)
- Include at least one title with a number/statistic if relevant
- NO hashtags, NO emojis, NO numbering, NO quotes
- One title per line, nothing else`;

  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 1.0,
      topP: 0.95,
    },
  });

  const text = response.text ?? "";
  return text
    .split("\n")
    .map((line) => line.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter((line) => line.length > 0 && line.length <= 120)
    .slice(0, count);
}

/**
 * Generate hooks/opening lines using Gemini AI with improved prompts
 */
async function generateHooks(topic: string, count: number): Promise<string[]> {
  const prompt = `Generate exactly ${count} powerful video hook lines for short-form content about: "${topic}"

REQUIREMENTS:
- Each hook is the FIRST thing said in a video — it must stop the scroll in under 3 seconds
- Mix these proven hook frameworks:
  • Bold claim: "This changed everything about X"
  • Direct challenge: "You've been doing X wrong your entire life"
  • Question hook: "What would happen if...?"
  • Shock/curiosity: "Nobody talks about this but..."
  • Relatability: "POV: you just found out that..."
  • Authority: "As someone who X for 10 years..."
  • Story opener: "So this happened to me yesterday..."
- Each hook should be 1-2 sentences MAX (under 150 characters)
- Write like a real person talking to camera — casual, conversational, energetic
- NO numbering, NO quotes around the hooks
- One hook per line, nothing else`;

  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 1.0,
      topP: 0.95,
    },
  });

  const text = response.text ?? "";
  return text
    .split("\n")
    .map((line) => line.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter((line) => line.length > 0 && line.length <= 200)
    .slice(0, count);
}

/**
 * Generate a single thumbnail image using Gemini image model
 */
async function generateSingleThumbnail(
  topic: string,
  index: number,
): Promise<ThumbnailResult | null> {
  const styleVariations = [
    "bold text overlay, high contrast, bright saturated colors, close-up face with exaggerated expression",
    "split composition, before/after layout, vibrant neon accents, clean modern typography",
    "minimalist design with one dominant visual element, striking color palette, large bold text",
    "dynamic action shot, motion blur effect, eye-catching gradients, dramatic lighting",
    "collage style with multiple small elements, comic-book energy, pop art colors",
  ];

  const style = styleVariations[index % styleVariations.length];

  const prompt = `Create a YouTube/TikTok thumbnail image for a video about: "${topic}"

Style: ${style}

The thumbnail should:
- Be eye-catching and click-worthy at small sizes
- Have a clear focal point that draws the eye
- Use bold, readable text overlay (max 3-5 words) related to the topic
- Feel professional but energetic — like a top creator's channel
- Use high contrast so it pops in a feed of other videos
- 16:9 aspect ratio suitable for YouTube thumbnails`;

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    let imageData = "";
    let description = "";

    for (const part of parts) {
      if (part.text && !part.thought) {
        description += part.text;
      } else if (part.inlineData) {
        const mimeType = part.inlineData.mimeType ?? "image/png";
        imageData = `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }

    if (imageData) {
      return {
        imageData,
        description: description.trim() || `Thumbnail concept for "${topic}"`,
      };
    }

    return null;
  } catch (error) {
    console.error(`Thumbnail generation ${index + 1} failed:`, error);
    return null;
  }
}

/**
 * Generate thumbnail images using Gemini image model
 */
async function generateThumbnails(
  topic: string,
  count: number,
): Promise<ThumbnailResult[]> {
  // Generate thumbnails in parallel (limited to count)
  const promises = Array.from({ length: count }, (_, i) =>
    generateSingleThumbnail(topic, i),
  );

  const results = await Promise.allSettled(promises);
  const thumbnails: ThumbnailResult[] = [];

  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
      thumbnails.push(result.value);
    }
  }

  return thumbnails;
}

/**
 * Main generation function — orchestrates titles, hooks, and thumbnails
 */
export async function generateContent(
  topic: string,
  tier: "free" | "paid",
): Promise<GenerationResult> {
  const config = TIER_CONFIG[tier];

  // Run text generation in parallel, then thumbnails
  // (thumbnails are heavier so we start them alongside text)
  const [titles, hooks, thumbnails] = await Promise.all([
    generateTitles(topic, config.titles),
    generateHooks(topic, config.hooks),
    generateThumbnails(topic, config.thumbnails),
  ]);

  return { titles, hooks, thumbnails };
}

export { TIER_CONFIG };
