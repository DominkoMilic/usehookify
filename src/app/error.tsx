"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-50 to-white">
      <div className="text-center px-4">
        <div className="text-8xl mb-4">🫠</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
          Oops!
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-dark-700 mb-3">
          Something went sideways
        </h2>
        <p className="text-dark-500 mb-8 max-w-md mx-auto">
          Don&apos;t worry, even the best hooks miss sometimes. Our team has
          been notified and we&apos;re working on it. In the meantime, maybe try
          again?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-dark-200 text-dark-700 rounded-xl font-semibold hover:border-brand-300 hover:text-brand-600 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
