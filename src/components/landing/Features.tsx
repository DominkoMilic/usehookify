"use client";

import { motion } from "framer-motion";
import {
  HiSparkles,
  HiBolt,
  HiPhoto,
  HiClock,
  HiShieldCheck,
  HiCreditCard,
} from "react-icons/hi2";

const features = [
  {
    icon: HiSparkles,
    title: "AI-Powered Hooks",
    description:
      "Generate scroll-stopping hooks that capture attention in the first 3 seconds.",
  },
  {
    icon: HiBolt,
    title: "Viral Titles",
    description:
      "Create click-worthy video titles optimized for TikTok, Shorts, and Reels.",
  },
  {
    icon: HiPhoto,
    title: "Thumbnail Ideas",
    description:
      "Get detailed thumbnail concepts with text overlays and visual layouts.",
  },
  {
    icon: HiClock,
    title: "Instant Results",
    description:
      "Generate all your content ideas in seconds, not hours of brainstorming.",
  },
  {
    icon: HiShieldCheck,
    title: "Free to Start",
    description:
      "Get 3 free generations every day. No credit card required to begin.",
  },
  {
    icon: HiCreditCard,
    title: "Affordable Pro",
    description:
      "Upgrade for more titles, hooks, and thumbnails at an unbeatable price.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-4">
            Everything You Need to Go Viral
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-lg max-w-2xl mx-auto">
            UseHookify gives you the creative firepower to make every piece of
            short-form content stand out.
          </p>
        </div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800/50 hover:border-brand-300 dark:hover:border-brand-500/60 hover:shadow-lg hover:shadow-brand-100/50 dark:hover:shadow-black/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
