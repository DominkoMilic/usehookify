"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";
import type { UsageInfo } from "@/types";

interface UsageBadgeProps {
  usage: UsageInfo | null;
}

export default function UsageBadge({ usage }: UsageBadgeProps) {
  if (!usage) return null;

  const percentage = ((usage.used / usage.limit) * 100).toFixed(0);
  const isLow = usage.remaining <= 1 && !usage.isPaid;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-medium ${
        isLow
          ? "bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-200 border border-accent-200 dark:border-accent-700/50"
          : "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-200 border border-brand-200 dark:border-brand-700/50"
      }`}
    >
      <span>
        {usage.remaining}/{usage.limit} generations left today
      </span>

      {/* Progress bar */}
      <div className="w-16 h-1.5 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isLow ? "bg-accent-500" : "bg-brand-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isLow && !usage.isPaid && (
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-accent-600 dark:text-accent-300 hover:text-accent-700 dark:hover:text-accent-200 font-semibold"
        >
          <HiArrowUp className="w-3.5 h-3.5" />
          Upgrade
        </Link>
      )}
    </motion.div>
  );
}
