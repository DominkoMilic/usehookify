import { getPageMeta } from "@/utils/seo";

export const metadata = getPageMeta("privacy");

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 py-12 sm:py-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-dark dark:prose-invert max-w-none space-y-6 text-dark-700 dark:text-dark-300 text-sm leading-relaxed">
          <p>
            <strong>Last updated:</strong> April 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to UseHookify (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). We are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website at
              https://usehookify.com and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              2. Information We Collect
            </h2>
            <h3 className="font-semibold text-dark-800 dark:text-dark-200 mt-4 mb-2">
              Personal Information
            </h3>
            <p>
              When you create an account, we collect your email address and name
              through Google OAuth. We do not store your Google password.
            </p>
            <h3 className="font-semibold text-dark-800 dark:text-dark-200 mt-4 mb-2">
              Usage Data
            </h3>
            <p>
              We collect information about how you use our service, including
              the number of generations you make, your subscription status, and
              the dates of your usage. We do not store the content you generate.
            </p>
            <h3 className="font-semibold text-dark-800 dark:text-dark-200 mt-4 mb-2">
              Cookies
            </h3>
            <p>
              We use essential cookies necessary for the functioning of our
              service (authentication, session management). With your consent,
              we may also use analytics cookies to understand how visitors
              interact with our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and maintain our service</li>
              <li>To manage your account and subscription</li>
              <li>To enforce usage limits (free/paid tiers)</li>
              <li>To process payments through LemonSqueezy</li>
              <li>To improve our service and user experience</li>
              <li>To communicate with you about your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              4. Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Supabase</strong> — Authentication and data storage
              </li>
              <li>
                <strong>Google Gemini API</strong> — AI content generation
              </li>
              <li>
                <strong>LemonSqueezy</strong> — Payment processing and
                subscription management
              </li>
            </ul>
            <p className="mt-2">
              Each of these services has their own privacy policies. We
              encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              5. Data Security
            </h2>
            <p>
              We use industry-standard security measures to protect your data,
              including HTTPS encryption, secure authentication tokens, and
              access controls. However, no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              6. Your Rights
            </h2>
            <p>Under GDPR and similar regulations, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at
              privacy@usehookify.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@usehookify.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
