import { useUser, useClerk, useSession } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { supabase, createClerkSupabaseClient } from "../lib/supabase";
import { logger } from "../utils/logger";

export const useAuth = () => {
  const isDevMode = import.meta.env.VITE_DEV_MODE === "true";
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { session } = useSession();
  const { signOut } = useClerk();
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [supabaseClient, setSupabaseClient] = useState(supabase);
  const [clientReady, setClientReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Create Supabase client with Clerk session token (OFFICIAL METHOD)
  useEffect(() => {
    if (session) {
      const client = createClerkSupabaseClient(session);
      setSupabaseClient(client);
      setClientReady(true);
    } else {
      setClientReady(false);
    }
  }, [session]);

  // Sync Clerk user with Supabase user_profiles table
  useEffect(() => {
    const syncUserProfile = async () => {
      // Don't sync until Clerk is fully loaded
      if (!isDevMode && !userLoaded) {
        setLoading(false);
        return;
      }

      // Dev mode: Sign in with dev account using Supabase Auth
      if (isDevMode) {
        try {
          const devEmail = "dev.user@example.com";
          const devPassword = "DevPassword123!";

          // Try to sign in
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: devEmail,
              password: devPassword,
            });

          if (signInError) {
            // If sign in fails, account might not exist yet
            logger.log(
              "Dev account doesn't exist yet. You need to create it first."
            );
            logger.log("Run this in your browser console:");
            logger.log(`
// Create dev account (run once):
const { data, error } = await supabase.auth.signUp({
  email: 'dev.user@example.com',
  password: 'DevPassword123!',
  options: {
    data: {
      first_name: 'Dev',
      last_name: 'User'
    }
  }
});
logger.log('Dev account created:', data);
            `);
            setLoading(false);
            return;
          }

          // Now create/update user profile
          const userId = signInData.user.id;

          const { data: existingProfile, error: fetchError } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("clerk_user_id", userId)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            throw fetchError;
          }

          if (!existingProfile) {
            const { data: newProfile, error: insertError } = await supabase
              .from("user_profiles")
              .insert({
                clerk_user_id: userId,
                email: devEmail,
                first_name: "Dev",
                last_name: "User",
                preferred_name: "Dev User",
              })
              .select()
              .single();

            if (insertError) throw insertError;
            setSupabaseUser(newProfile);
            setProfile(newProfile);
          } else {
            const { data: updatedProfile, error: updateError } = await supabase
              .from("user_profiles")
              .update({ last_active_at: new Date().toISOString() })
              .eq("clerk_user_id", userId)
              .select()
              .single();

            if (updateError) throw updateError;
            setSupabaseUser(updatedProfile);
            setProfile(updatedProfile);
          }
        } catch (error) {
          logger.error("Error with dev account:", error);
        }
        setLoading(false);
        return;
      }

      // Production: only sync if user is signed in AND client is ready with token
      if (isSignedIn && user && clientReady) {
        try {
          // Check if user profile exists in Supabase
          const { data: existingProfile, error: fetchError } =
            await supabaseClient
              .from("user_profiles")
              .select("*")
              .eq("clerk_user_id", user.id)
              .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            // Error other than "not found"
            throw fetchError;
          }

          if (!existingProfile) {
            // Create new user profile
            const { data: newProfile, error: insertError } =
              await supabaseClient
                .from("user_profiles")
                .insert({
                  clerk_user_id: user.id,
                  email: user.emailAddresses?.[0]?.emailAddress,
                  first_name: user.firstName,
                  last_name: user.lastName,
                  preferred_name: user.firstName,
                })
                .select()
                .single();

            if (insertError) throw insertError;
            setSupabaseUser(newProfile);
            setProfile(newProfile);
          } else {
            // Update existing profile with latest Clerk data
            const { data: updatedProfile, error: updateError } =
              await supabaseClient
                .from("user_profiles")
                .update({
                  email: user.emailAddresses?.[0]?.emailAddress,
                  first_name: user.firstName,
                  last_name: user.lastName,
                  last_active_at: new Date().toISOString(),
                })
                .eq("clerk_user_id", user.id)
                .select()
                .single();

            if (updateError) throw updateError;
            setSupabaseUser(updatedProfile);
            setProfile(updatedProfile);
          }
        } catch (error) {
          logger.error("Error syncing user profile:", error);
        }
      } else {
        setSupabaseUser(null);
      }

      setLoading(false);
    };

    syncUserProfile();
  }, [user, isSignedIn, userLoaded, isDevMode, supabaseClient, clientReady]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setSupabaseUser(null);
    } catch (error) {
      logger.error("Error signing out:", error);
    }
  };

  return {
    user: isDevMode
      ? { id: "dev-user", firstName: "Dev", lastName: "User" }
      : user, // Clerk user or dev user
    supabaseUser, // Supabase user profile
    supabaseClient, // Supabase client with Clerk token
    isAuthenticated: isDevMode ? true : isSignedIn,
    loading: loading || (!isDevMode && !userLoaded),
    signOut: handleSignOut,
    profile, // User profile data for all hooks to use
  };
};
