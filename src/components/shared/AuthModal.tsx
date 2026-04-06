"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiXMark,
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthMode = "signin" | "signup";

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setSubmitting(false);
    onClose();
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || submitting) return;

    if (mode === "signup") {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        const data = await signUp(email.trim(), password);
        // Supabase returns a user even if email confirmation is enabled
        if (data.user && !data.session) {
          toast.success(
            "Account created! Check your email to confirm, then sign in.",
          );
          switchMode("signin");
        } else {
          toast.success("Account created! You're now signed in.");
          handleClose();
        }
      } else {
        await signIn(email.trim(), password);
        toast.success("Signed in successfully!");
        handleClose();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      // Map common Supabase auth errors to friendly messages
      if (message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (message.includes("User already registered")) {
        toast.error(
          "An account with this email already exists. Try signing in.",
        );
      } else if (message.includes("Email not confirmed")) {
        toast.error("Please confirm your email before signing in.");
      } else {
        toast.error(message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop — closes modal on click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Centering wrapper */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-6 border border-dark-200 dark:border-dark-700"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 text-dark-400 dark:text-dark-500 hover:text-dark-700 dark:hover:text-dark-200 transition-colors"
                aria-label="Close"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-dark-900 mb-2">
                  {mode === "signin" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-dark-500 dark:text-dark-400 text-sm">
                  {mode === "signin"
                    ? "Sign in to start generating viral hooks and titles."
                    : "Create an account to get started."}
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex rounded-xl bg-dark-100 dark:bg-dark-700 p-1 mb-6">
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    mode === "signin"
                      ? "bg-white dark:bg-dark-800 text-dark-900 dark:text-dark-100 shadow-sm"
                      : "text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    mode === "signup"
                      ? "bg-white dark:bg-dark-800 text-dark-900 dark:text-dark-100 shadow-sm"
                      : "text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email */}
                <div className="relative">
                  <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    disabled={submitting}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-dark-800 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 disabled:opacity-50 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      mode === "signup" ? "Password (min 6 chars)" : "Password"
                    }
                    required
                    minLength={mode === "signup" ? 6 : undefined}
                    disabled={submitting}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border-2 border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-dark-800 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 disabled:opacity-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500 hover:text-dark-600 dark:hover:text-dark-200 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <HiEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Confirm Password (sign up only) */}
                <AnimatePresence>
                  {mode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative overflow-hidden"
                    >
                      <div className="relative">
                        <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          required
                          disabled={submitting}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-dark-800 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 disabled:opacity-50 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!email.trim() || !password || submitting}
                  className="w-full py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-600/25"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {mode === "signin"
                        ? "Signing In..."
                        : "Creating Account..."}
                    </span>
                  ) : mode === "signin" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Footer hint */}
              <p className="mt-5 text-center text-xs text-dark-400 dark:text-dark-500">
                {mode === "signin" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("signup")}
                      className="text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("signin")}
                      className="text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
