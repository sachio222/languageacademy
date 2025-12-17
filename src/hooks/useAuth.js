import { useUser, useClerk, useSession } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";

export const useAuth = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { session } = useSession();
  const { signOut } = useClerk();
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [clientReady, setClientReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Use the shared Supabase client
  const supabaseClient = useSupabaseClient();

  // Set client ready state
  useEffect(() => {
    if (session) {
      setClientReady(true);
    } else {
      setClientReady(false);
    }
  }, [session]);

  // Sync Clerk user with Supabase user_profiles table
  useEffect(() => {
    const syncUserProfile = async () => {
      // Don't sync until Clerk is fully loaded
      if (!userLoaded) {
        setLoading(false);
        return;
      }

      // Only sync if user is signed in AND client is ready with token
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
            // Create new user profile with idempotency
            // Try insert first - if it fails due to race condition, fetch existing profile
            const profileData = {
              clerk_user_id: user.id,
              email: user.emailAddresses?.[0]?.emailAddress,
              first_name: user.firstName,
              last_name: user.lastName,
              preferred_name: user.firstName,
            };

            const { data: newProfile, error: insertError } =
              await supabaseClient
                .from("user_profiles")
                .insert(profileData)
                .select()
                .single();

            let isNewProfile = true;

            if (insertError) {
              // If it's a unique constraint violation, profile was created by another request (race condition)
              if (
                insertError.code === "23505" ||
                insertError.message?.includes("duplicate") ||
                insertError.message?.includes("unique")
              ) {
                logger.log(
                  "Profile already exists (race condition), fetching existing profile",
                  {
                    clerk_user_id: user.id,
                  }
                );

                const {
                  data: existingProfileAfterRace,
                  error: fetchAfterRaceError,
                } = await supabaseClient
                  .from("user_profiles")
                  .select("*")
                  .eq("clerk_user_id", user.id)
                  .single();

                if (fetchAfterRaceError) {
                  throw fetchAfterRaceError;
                }

                setSupabaseUser(existingProfileAfterRace);
                setProfile(existingProfileAfterRace);
                // Don't trigger webhooks for existing profiles
                isNewProfile = false;
              } else {
                // Some other error occurred
                throw insertError;
              }
            } else {
              // Insert succeeded - this is a new profile
              setSupabaseUser(newProfile);
              setProfile(newProfile);
            }

            // MailerLite sync disabled - not currently in use
            // Only trigger webhooks if this is actually a new profile
            if (isNewProfile && newProfile) {
              // If you want to re-enable MailerLite, uncomment the sync call below
              logger.log("New user profile created:", newProfile.id);
            }
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
  }, [user, isSignedIn, userLoaded, clientReady]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setSupabaseUser(null);
      setProfile(null);
    } catch (error) {
      logger.error("Error signing out:", error);
    }
  };

  return {
    user, // Clerk user
    supabaseUser, // Supabase user profile
    supabaseClient, // Supabase client with Clerk token
    isAuthenticated: isSignedIn,
    loading: loading || !userLoaded,
    signOut: handleSignOut,
    profile, // User profile data for all hooks to use
  };
};
