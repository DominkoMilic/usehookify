"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi2";
import { NAV_LINKS } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import AuthModal from "@/components/shared/AuthModal";
import SignOutModal from "@/components/shared/SignOutModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const { theme, mounted, toggleTheme } = useTheme();
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-dark-200 dark:border-dark-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo_no_background.png"
              alt="UseHookify"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-lg text-dark-900 dark:text-dark-100 hidden sm:block">
              UseHookify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark-600 dark:text-dark-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle (Desktop) */}
          <button
            onClick={toggleTheme}
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-200 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
            aria-label="Toggle theme"
            title="Toggle light/dark mode"
          >
            {!mounted ? (
              <span className="w-4 h-4" />
            ) : theme === "dark" ? (
              <HiSun className="w-4 h-4" />
            ) : (
              <HiMoon className="w-4 h-4" />
            )}
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-9 bg-dark-100 dark:bg-dark-800 animate-pulse rounded-lg" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-dark-600 dark:text-dark-300 truncate max-w-[150px]">
                  {user.email}
                </span>
                <button
                  onClick={() => setSignOutOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-700 dark:text-dark-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-b border-dark-200 dark:border-dark-700"
          >
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-200 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              >
                {!mounted ? (
                  "Theme"
                ) : theme === "dark" ? (
                  <>
                    <HiSun className="w-4 h-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <HiMoon className="w-4 h-4" />
                    Dark Mode
                  </>
                )}
              </button>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-dark-700 dark:text-dark-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-dark-200 dark:border-dark-700" />
              {user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSignOutOpen(true);
                  }}
                  className="w-full text-left py-2 text-dark-600 dark:text-dark-300"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthOpen(true);
                  }}
                  className="w-full py-2 bg-brand-600 text-white rounded-lg font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Sign Out Modal */}
      <SignOutModal
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onConfirm={signOut}
      />
    </nav>
  );
}
