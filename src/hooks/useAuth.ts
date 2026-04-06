"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

/** Hook for managing Supabase authentication state */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  /** Sign up with email & password */
  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        throw new Error("Authentication is not configured.");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    [supabase],
  );

  /** Sign in with email & password */
  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        throw new Error("Authentication is not configured.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    [supabase],
  );

  /**
   * Sign in with Google OAuth.
   * Requires: Google provider enabled in Supabase Dashboard → Auth → Providers.
   */
  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      throw new Error("Authentication is not configured.");
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  }, [supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) {
      setUser(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, [supabase]);

  return { user, loading, signUp, signIn, signInWithGoogle, signOut };
}
