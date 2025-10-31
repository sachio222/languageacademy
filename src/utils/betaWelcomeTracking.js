import { logger } from './logger';

/**
 * Mark beta welcome as seen in database for authenticated users
 * @param {Object} supabaseClient - Supabase client instance
 * @param {Object} supabaseUser - Current Supabase user profile
 * @returns {Promise<boolean>} - Success status
 */
export const markBetaWelcomeAsSeen = async (supabaseClient, supabaseUser) => {
  if (!supabaseClient || !supabaseUser || !supabaseUser.id) {
    // User not authenticated, skip DB save
    return false;
  }

  try {
    const { error } = await supabaseClient
      .from('user_profiles')
      .update({
        has_seen_beta_welcome: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', supabaseUser.id);

    if (error) {
      logger.error('Error saving beta welcome status to database:', error);
      return false;
    }

    logger.log('Beta welcome marked as seen in database');
    return true;
  } catch (error) {
    logger.error('Error saving beta welcome status to database:', error);
    return false;
  }
};


