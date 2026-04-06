"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-brand-600 to-brand-800 dark:from-dark-800 dark:to-dark-900 text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Ready to Create Viral Content?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-brand-100 text-lg mb-8 max-w-xl mx-auto"
        >
          Join thousands of creators who use UseHookify to generate
          attention-grabbing hooks and titles every day.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/generate/"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 dark:bg-dark-100 dark:text-dark-900 rounded-xl font-bold text-lg hover:bg-brand-50 dark:hover:bg-white transition-all shadow-lg"
          >
            Start Generating — It&apos;s Free
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
