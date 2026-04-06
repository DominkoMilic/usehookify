"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUsage } from "@/hooks/useUsage";
import { useGenerate } from "@/hooks/useGenerate";
import GeneratorForm from "@/components/generator/GeneratorForm";
import ResultsSection from "@/components/generator/ResultsSection";
import UsageBadge from "@/components/generator/UsageBadge";
import UpgradeCTA from "@/components/generator/UpgradeCTA";
import { PageLoader } from "@/components/shared/Loaders";
import AuthModal from "@/components/shared/AuthModal";

export default function GeneratePageClient() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const { usage, loading: usageLoading, fetchUsage, canGenerate } = useUsage();
  const { results, loading: generating, error, generate } = useGenerate();

  // Fetch usage when user is loaded
  useEffect(() => {
    if (user) {
      fetchUsage();
    }
  }, [user, fetchUsage]);

  // Show upgrade toast if redirected after payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      toast.success("🎉 Welcome to Pro! Enjoy unlimited generations.");
      router.replace("/generate");
    }
  }, [router]);

  const handleGenerate = async (topic: string) => {
    if (!user) {
      toast.error("Please sign in to generate content.");
      return;
    }
    const result = await generate(topic);
    if (result) {
      toast.success("Content generated successfully!");
      fetchUsage(); // Refresh usage after generation
    }
    if (error) {
      toast.error(error);
    }
  };

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-50 to-white dark:from-dark-900 dark:to-dark-900 py-8 sm:py-12 transition-colors duration-300">
      <div className="container-main">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-dark-100 mb-3">
            AI Hook Generator
          </h1>
          <p className="text-dark-600 dark:text-dark-300 max-w-lg mx-auto">
            Enter your topic and let AI create viral hooks, titles, and
            thumbnail ideas for your short-form content.
          </p>
        </div>

        {/* Auth gate */}
        {!user ? (
          <div className="text-center py-12">
            <p className="text-dark-600 dark:text-dark-300 mb-4">
              Sign in to start generating content.
            </p>
            <button
              onClick={() => setAuthOpen(true)}
              className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25"
            >
              Sign In to Get Started
            </button>
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
          </div>
        ) : (
          <>
            {/* Usage indicator */}
            <div className="flex justify-center mb-6">
              <UsageBadge usage={usage} />
            </div>

            {/* Generator form */}
            <GeneratorForm
              onGenerate={handleGenerate}
              loading={generating}
              disabled={!canGenerate}
              usageLoaded={!usageLoading && usage !== null}
            />

            {/* Error display — only show for real generation errors, not while loading */}
            {error && !generating && (
              <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                {error}
              </div>
            )}

            {/* Upgrade CTA for free users */}
            {usage && !usage.isPaid && <UpgradeCTA />}

            {/* Results */}
            <ResultsSection results={results} loading={generating} />
          </>
        )}
      </div>
    </div>
  );
}
