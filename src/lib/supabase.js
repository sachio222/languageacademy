import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Capture the original fetch before any third-party scripts (like Clarity) can intercept it
// Microsoft Clarity's iframe can interfere with fetch requests, causing "Failed to fetch" errors
// By capturing the original fetch early, we ensure Supabase always uses the real fetch API
const originalFetch = (() => {
  if (typeof window !== 'undefined' && window.fetch) {
    return window.fetch.bind(window);
  }
  return globalThis.fetch?.bind(globalThis) || fetch;
})();

// Custom fetch wrapper that uses the original fetch
// This ensures Supabase requests bypass any Clarity interception
const customFetch = (url, options = {}) => {
  return originalFetch(url, options);
};

// Create Supabase client with Clerk session token support (EXACT FROM DOCS)
export const createClerkSupabaseClient = (session) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    accessToken: async () => {
      const token = await session?.getToken();
      return token ?? null;
    },
    global: {
      fetch: customFetch,
    },
  });
};

// Default client for non-authenticated use
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: customFetch,
  },
});

// Database schema reference for development
export const TABLES = {
  USER_PROFILES: "user_profiles",
  EXERCISE_COMPLETIONS: "exercise_completions",
  CONCEPT_UNDERSTANDING: "concept_understanding",
  MODULE_PROGRESS: "module_progress",
  UNIT_PROGRESS: "unit_progress",
  USER_SESSIONS: "user_sessions",
  EXAM_ATTEMPTS: "exam_attempts",
  SECTION_PROGRESS: "section_progress",
};
