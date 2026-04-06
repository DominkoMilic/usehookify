"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GenerationResult } from "@/types";
import ResultCard from "./ResultCard";
import ThumbnailCard from "./ThumbnailCard";

interface ResultsSectionProps {
  results: GenerationResult | null;
  loading: boolean;
}

export default function ResultsSection({
  results,
  loading,
}: ResultsSectionProps) {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700 overflow-hidden animate-pulse"
          >
            <div className="h-14 bg-dark-200 dark:bg-dark-700" />
            <div className="p-6 space-y-4">
              {i === 3 ? (
                /* Thumbnail skeleton */
                <div className="aspect-video w-full max-w-lg mx-auto bg-dark-100 dark:bg-dark-700 rounded-xl" />
              ) : (
                [1, 2, 3].map((j) => (
                  <div key={j} className="flex gap-3">
                    <div className="w-6 h-4 bg-dark-100 dark:bg-dark-700 rounded" />
                    <div className="flex-1 h-4 bg-dark-100 dark:bg-dark-700 rounded" />
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!results) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl mx-auto mt-8 space-y-6"
      >
        <ResultCard
          title="Video Titles"
          items={results.titles}
          type="title"
          emoji="🎬"
        />
        <ResultCard
          title="Hooks"
          items={results.hooks}
          type="hook"
          emoji="🪝"
        />
        <ThumbnailCard thumbnails={results.thumbnails} />
      </motion.div>
    </AnimatePresence>
  );
}
