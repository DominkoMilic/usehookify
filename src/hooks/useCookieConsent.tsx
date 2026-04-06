"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const COOKIE_KEY = "usehookify_cookie_consent";

type ConsentStatus = "pending" | "accepted" | "declined";

interface CookieConsentContextValue {
  consent: ConsentStatus;
  showBanner: boolean;
  accept: () => void;
  decline: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

/** Provider that shares cookie-consent state across the entire app */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>("pending");
  const [hydrated, setHydrated] = useState(false);

  // Read stored preference after hydration
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
    setHydrated(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setConsent("declined");
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_KEY);
    setConsent("pending");
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner: hydrated && consent === "pending",
        accept,
        decline,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

/** Hook to consume shared cookie-consent state */
export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within <CookieConsentProvider>",
    );
  }
  return ctx;
}
