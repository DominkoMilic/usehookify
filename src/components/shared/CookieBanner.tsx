"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { HiXMark } from "react-icons/hi2";

export default function CookieBanner() {
  const { showBanner, accept, decline } = useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-dark-900 text-white rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                🍪 We use cookies to improve your experience and analyze site
                traffic. By clicking &quot;Accept&quot;, you consent to
                analytics cookies.{" "}
                <a
                  href="/privacy/"
                  className="underline text-brand-300 hover:text-brand-200"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-sm text-dark-400 hover:text-white transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={decline}
                className="p-1 text-dark-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
