"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

interface GeneratorFormProps {
  onGenerate: (topic: string) => Promise<unknown>;
  loading: boolean;
  disabled: boolean;
  /** Whether the usage data has finished loading (prevents false limit-reached message) */
  usageLoaded?: boolean;
}

export default function GeneratorForm({
  onGenerate,
  loading,
  disabled,
  usageLoaded = false,
}: GeneratorFormProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || loading || disabled) return;
    await onGenerate(topic.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Morning routines for productivity..."
          maxLength={200}
          disabled={loading || disabled}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-dark-800 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        />
        <button
          type="submit"
          disabled={!topic.trim() || loading || disabled}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <HiSparkles className="w-5 h-5" />
              Generate
            </>
          )}
        </button>
      </div>

      {disabled && usageLoaded && (
        <p className="mt-3 text-sm text-accent-600 text-center">
          Daily limit reached. Upgrade to Pro for more generations!
        </p>
      )}
    </motion.form>
  );
}
