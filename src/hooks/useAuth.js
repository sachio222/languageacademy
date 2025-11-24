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

            // Sync new user to MailerLite
            try {
              await supabaseClient.functions.invoke('sync-to-mailerlite', {
                body: {
                  event: 'signup',
                  user_id: newProfile.id,
                  email: user.emailAddresses?.[0]?.emailAddress,
                  name: user.firstName,
                  metadata: {
                    group: 'All Users'
                  }
                }
              });
            } catch (syncError) {
              logger.error('Error syncing to MailerLite:', syncError);
              // Don't fail signup if MailerLite sync fails
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
