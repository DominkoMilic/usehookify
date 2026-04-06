"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiArrowRightOnRectangle } from "react-icons/hi2";

interface SignOutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SignOutModal({
  open,
  onClose,
  onConfirm,
}: SignOutModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-dark-400 dark:text-dark-500 hover:text-dark-700 dark:hover:text-dark-200 transition-colors"
                aria-label="Close"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-accent-50 rounded-full flex items-center justify-center">
                  <HiArrowRightOnRectangle className="w-7 h-7 text-accent-600" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100 text-center mb-2">
                Sign Out?
              </h3>
              <p className="text-sm text-dark-500 dark:text-dark-400 text-center mb-6">
                Are you sure you want to sign out of your account? You&apos;ll
                need to sign in again to generate content.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-200 rounded-xl text-sm font-medium hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 px-4 py-2.5 bg-accent-600 text-white rounded-xl text-sm font-medium hover:bg-accent-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
