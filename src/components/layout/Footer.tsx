"use client";

import Link from "next/link";
import Image from "next/image";
import { HiCog6Tooth } from "react-icons/hi2";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function Footer() {
  const { resetConsent } = useCookieConsent();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo_no_background.png"
                alt="UseHookify"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-dark-400 text-sm max-w-md">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-dark-400 mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-dark-400 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={resetConsent}
                  className="inline-flex items-center gap-1.5 text-dark-300 hover:text-white transition-colors text-sm"
                >
                  <HiCog6Tooth className="w-3.5 h-3.5" />
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
