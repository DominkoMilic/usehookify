import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-50 to-white dark:from-dark-900 dark:to-dark-900 transition-colors duration-300">
      <div className="text-center px-4">
        <div className="text-8xl mb-4">👀</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 dark:text-dark-100 mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-dark-700 dark:text-dark-300 mb-3">
          This is not the page you&apos;re looking for
        </h2>
        <p className="text-dark-500 dark:text-dark-400 mb-8 max-w-md mx-auto">
          The page you requested has either moved, been deleted, or never
          existed in the first place. Maybe it&apos;s hiding behind a viral
          hook? 🤔
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25"
          >
            Go Home
          </Link>
          <Link
            href="/generate"
            className="px-6 py-3 border-2 border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-200 rounded-xl font-semibold hover:border-brand-300 dark:hover:border-brand-500/60 hover:text-brand-600 dark:hover:text-brand-300 transition-all"
          >
            Generate Hooks Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
