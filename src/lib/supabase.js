import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Create Supabase client with Clerk session token support (EXACT FROM DOCS)
export const createClerkSupabaseClient = (session) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    accessToken: async () => {
      const token = await session?.getToken();

      if (token) {
        // Decode JWT to see what's inside
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("JWT Payload:", payload);
          console.log("Has role claim?", payload.role);
          console.log("Has aud claim?", payload.aud);
          console.log("Issuer:", payload.iss);
          console.log("Subject (user ID):", payload.sub);
        } catch (e) {
          console.error("Could not decode JWT:", e);
        }
      } else {
        console.log("NO TOKEN FROM CLERK");
      }

      return token ?? null;
    },
  });
};

// Default client for non-authenticated use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema reference for development
export const TABLES = {
  USER_PROFILES: "user_profiles",
  EXERCISE_COMPLETIONS: "exercise_completions",
  CONCEPT_UNDERSTANDING: "concept_understanding",
  MODULE_PROGRESS: "module_progress",
  UNIT_PROGRESS: "unit_progress",
  USER_SESSIONS: "user_sessions",
  EXAM_ATTEMPTS: "exam_attempts",
};
