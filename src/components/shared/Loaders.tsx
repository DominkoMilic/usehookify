"use client";

import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-dark-500 text-sm">Loading...</p>
      </motion.div>
    </div>
  );
}

export function GenerationLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-brand-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-brand-600 rounded-full animate-spin" />
          <div
            className="absolute inset-2 border-4 border-transparent border-t-accent-500 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.7s" }}
          />
        </div>
        <div className="text-center">
          <p className="text-dark-800 font-medium">
            Generating your content...
          </p>
          <p className="text-dark-500 text-sm mt-1">
            This usually takes 5-10 seconds
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-dark-200 overflow-hidden animate-pulse">
      <div className="h-14 bg-dark-200" />
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="w-6 h-4 bg-dark-100 rounded" />
            <div className="flex-1 h-4 bg-dark-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
