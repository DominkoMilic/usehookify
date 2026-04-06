"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 dark:from-brand-800/30 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-200 rounded-full text-sm font-medium mb-6 border border-brand-200 dark:border-brand-700/50">
            <HiSparkles className="w-4 h-4" />
            AI-Powered Hook Generator
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-900 dark:text-dark-100 leading-tight mb-6"
        >
          Stop Scrolling.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">
            Start Hooking.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-8"
        >
          Generate viral hooks, attention-grabbing titles, and thumbnail ideas
          for TikTok, YouTube Shorts, and Reels — in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/generate/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40"
          >
            Start Generating
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/pricing/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-200 rounded-xl font-semibold text-lg hover:border-brand-300 dark:hover:border-brand-500/60 hover:text-brand-600 dark:hover:text-brand-300 transition-all"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-sm text-dark-500 dark:text-dark-400"
        >
          ✨ Free to start · No credit card required · 3 generations/day
        </motion.p>
      </div>
    </section>
  );
}
