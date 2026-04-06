import { getPageMeta } from "@/utils/seo";

export const metadata = getPageMeta("impressum");

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 py-12 sm:py-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-8">
          Impressum
        </h1>

        <div className="space-y-6 text-dark-700 dark:text-dark-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-3">
              Information according to § 5 TMG
            </h2>
            <p>
              UseHookify
              <br />
              Dominko Milić
              <br />
              Požeška 8
              <br />
              21000 Split
              <br />
              Croatia
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              Contact
            </h2>
            <p>
              Email: contact@usehookify.com
              <br />
              Website: https://usehookify.com
            </p>
          </section>

          {/* <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              VAT ID
            </h2>
            <p>
              VAT identification number according to § 27 a of the
              Umsatzsteuergesetz:
              <br />
              [Your VAT ID if applicable]
            </p>
          </section> */}

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              Responsible for content according to § 55 Abs. 2 RStV
            </h2>
            <p>
              Dominko Milić
              <br />
              Požeška 8
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              Dispute Resolution
            </h2>
            <p>
              The European Commission provides a platform for online dispute
              resolution (OS):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mt-2">
              We are not willing or obliged to participate in dispute resolution
              proceedings before a consumer arbitration board.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mt-8 mb-3">
              Liability for Content
            </h2>
            <p>
              As a service provider, we are responsible for our own content on
              these pages according to § 7 paragraph 1 TMG. According to §§ 8 to
              10 TMG, however, we are not obligated to monitor transmitted or
              stored third-party information or to investigate circumstances
              that indicate illegal activity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
