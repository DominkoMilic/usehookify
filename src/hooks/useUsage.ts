"use client";

import { useState, useCallback } from "react";
import type { UsageInfo } from "@/types";

/** Hook for tracking and managing generation usage */
export function useUsage() {
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsage = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/usage");
      if (!res.ok) throw new Error("Failed to fetch usage");
      const data = await res.json();
      setUsage(data.data);
    } catch (err) {
      console.error("Usage fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const canGenerate = usage ? usage.remaining > 0 : false;

  return { usage, loading, fetchUsage, canGenerate };
}
