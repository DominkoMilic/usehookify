"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiCheck, HiArrowRight } from "react-icons/hi2";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out UseHookify",
    features: [
      "3 generations per day",
      "3 video titles per generation",
      "3 hooks per generation",
      "1 thumbnail idea per generation",
      "Copy to clipboard",
    ],
    cta: "Start Free",
    href: "/generate/",
    popular: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    description: "For creators who want the full power",
    features: [
      "100 generations per day",
      "10 video titles per generation",
      "10 hooks per generation",
      "5 thumbnail ideas per generation",
      "Priority AI generation",
      "Copy & download all results",
      "Cancel anytime",
    ],
    cta: "Upgrade to Pro",
    href: "/pricing/",
    popular: true,
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-dark-50 dark:bg-dark-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-dark-600 dark:text-dark-300 text-lg max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready to go all-in on your
            content game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border-2 ${
                plan.popular
                  ? "border-brand-500 bg-white dark:bg-dark-800 shadow-xl shadow-brand-100/50 dark:shadow-black/40"
                  : "border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-dark-900 dark:text-dark-100 mb-1">
                {plan.name}
              </h3>
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-dark-900 dark:text-dark-100">
                  {plan.price}
                </span>
                <span className="text-dark-500 dark:text-dark-400">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <HiCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span className="text-dark-700 dark:text-dark-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25"
                    : "bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 hover:bg-dark-200 dark:hover:bg-dark-600"
                }`}
              >
                {plan.cta}
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
