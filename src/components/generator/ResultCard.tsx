"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiClipboard, HiCheck } from "react-icons/hi2";
import { copyToClipboard } from "@/utils/helpers";
import toast from "react-hot-toast";

interface ResultCardProps {
  title: string;
  items: string[];
  type: "title" | "hook" | "thumbnail";
  emoji: string;
}

export default function ResultCard({
  title,
  items,
  type,
  emoji,
}: ResultCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIndex(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      toast.error("Failed to copy");
    }
  };

  const colorMap = {
    title:
      "bg-brand-100 text-brand-800 border-b border-brand-200 dark:bg-brand-900/40 dark:text-brand-200 dark:border-brand-700/50",
    hook: "bg-accent-100 text-accent-800 border-b border-accent-200 dark:bg-accent-900/30 dark:text-accent-200 dark:border-accent-700/50",
    thumbnail:
      "bg-indigo-100 text-indigo-800 border-b border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-700/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-black/40 transition-shadow"
    >
      {/* Card header */}
      <div className={`px-6 py-4 ${colorMap[type]}`}>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span>{emoji}</span>
          {title}
          <span className="text-sm font-normal opacity-70 ml-auto">
            {items.length} {items.length === 1 ? "result" : "results"}
          </span>
        </h3>
      </div>

      {/* Items */}
      <div className="divide-y divide-dark-100 dark:divide-dark-700">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-6 py-4 flex items-start gap-3 group hover:bg-dark-50 dark:hover:bg-dark-700/50 transition-colors"
          >
            <span className="text-dark-400 dark:text-dark-500 text-sm font-mono shrink-0 mt-0.5">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p
              className={`flex-1 text-dark-700 dark:text-dark-300 text-sm leading-relaxed ${
                type === "thumbnail" ? "whitespace-pre-line" : ""
              }`}
            >
              {item}
            </p>
            <button
              onClick={() => handleCopy(item, index)}
              className="shrink-0 p-1.5 rounded-lg text-dark-400 dark:text-dark-500 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Copy to clipboard"
            >
              {copiedIndex === index ? (
                <HiCheck className="w-4 h-4 text-green-500" />
              ) : (
                <HiClipboard className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
