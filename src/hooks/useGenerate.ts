"use client";

import { useState, useCallback, useEffect } from "react";
import type { GenerationResult } from "@/types";

const STORAGE_KEY = "usehookify_last_results";

/** Safely read last results from localStorage */
function loadCachedResults(): GenerationResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GenerationResult;
  } catch {
    return null;
  }
}

/** Safely write results to localStorage */
function saveCachedResults(data: GenerationResult) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

/** Hook for the AI content generation flow */
export function useGenerate() {
  const [results, setResults] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore last results from localStorage on mount
  useEffect(() => {
    const cached = loadCachedResults();
    if (cached) {
      setResults(cached);
    }
  }, []);

  const generate = useCallback(async (topic: string) => {
    setLoading(true);
    setError(null);
    // Keep previous results visible while generating

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed. Please try again.");
        return null;
      }

      const result = data.data as GenerationResult;
      setResults(result);
      saveCachedResults(result);
      return result;
    } catch {
      setError("Something went wrong. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { results, loading, error, generate, reset };
}
