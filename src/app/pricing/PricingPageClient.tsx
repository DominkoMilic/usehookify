"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiCheck, HiArrowRight, HiSparkles } from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/shared/AuthModal";
import toast from "react-hot-toast";

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
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    description: "For serious content creators",
    features: [
      "100 generations per day",
      "10 video titles per generation",
      "10 hooks per generation",
      "5 thumbnail ideas per generation",
      "Priority AI generation",
      "Copy & download all results",
      "Email support",
      "Cancel anytime",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
];

export default function PricingPageClient() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      toast.error("Please sign in first.");
      setAuthOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create checkout.");
        return;
      }

      // Redirect to LemonSqueezy checkout
      window.location.href = data.data.url;
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-50 to-white dark:from-dark-900 dark:to-dark-900 py-12 sm:py-20 transition-colors duration-300">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-200 rounded-full text-sm font-medium mb-4 border border-brand-200 dark:border-brand-700/50">
              <HiSparkles className="w-4 h-4" />
              Simple Pricing
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-dark-100 mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-dark-600 dark:text-dark-300 text-lg max-w-xl mx-auto"
          >
            Start free. Upgrade when you need more. Cancel anytime. VAT handled
            automatically.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
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

              <h2 className="text-xl font-bold text-dark-900 dark:text-dark-100 mb-1">
                {plan.name}
              </h2>
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-extrabold text-dark-900 dark:text-dark-100">
                  {plan.price}
                </span>
                <span className="text-dark-500 dark:text-dark-400 text-lg">
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

              {plan.popular ? (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Creating checkout...
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              ) : (
                <a
                  href="/generate/"
                  className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 hover:bg-dark-200 dark:hover:bg-dark-600 transition-all"
                >
                  {plan.cta}
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ-like note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-dark-500 dark:text-dark-400 text-sm max-w-lg mx-auto"
        >
          <p>
            Payments are securely processed by LemonSqueezy. VAT is
            automatically calculated based on your location. You can cancel your
            subscription at any time from your dashboard.
          </p>
        </motion.div>

        {/* Auth Modal */}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </div>
  );
}
