import { useMemo } from "react";
import { useSession } from "@clerk/clerk-react";
import { supabase, createClerkSupabaseClient } from "../lib/supabase";

export const useSupabaseClient = () => {
  const { session } = useSession();

  // Create client once and memoize it
  const supabaseClient = useMemo(() => {
    if (session) {
      return createClerkSupabaseClient(session);
    }
    return supabase;
  }, [session]);

  return supabaseClient;
};
