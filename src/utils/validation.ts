/**
 * Validate and sanitize user input for content generation.
 * Prevents injection attacks and ensures reasonable input.
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>{}]/g, "") // Remove potential HTML/injection chars
    .slice(0, 500); // Cap length
}

/** Validate a generation topic */
export function validateTopic(topic: string): {
  valid: boolean;
  error?: string;
} {
  const sanitized = sanitizeInput(topic);

  if (!sanitized || sanitized.length < 3) {
    return { valid: false, error: "Topic must be at least 3 characters long." };
  }

  if (sanitized.length > 200) {
    return { valid: false, error: "Topic must be under 200 characters." };
  }

  return { valid: true };
}
