"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUp, HiSparkles } from "react-icons/hi2";

export default function UpgradeCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mt-6 p-6 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-dark-800 dark:to-dark-800 rounded-2xl border border-brand-200 dark:border-dark-700"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 flex items-center gap-2 justify-center sm:justify-start">
            <HiSparkles className="w-5 h-5 text-brand-500" />
            Want More Generations?
          </h3>
          <p className="text-dark-600 dark:text-dark-300 text-sm mt-1">
            Upgrade to Pro for 10x more titles, hooks, and thumbnails per
            generation.
          </p>
        </div>
        <Link
          href="/pricing/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 shrink-0"
        >
          <HiArrowUp className="w-4 h-4" />
          Upgrade to Pro
        </Link>
      </div>
    </motion.div>
  );
}
