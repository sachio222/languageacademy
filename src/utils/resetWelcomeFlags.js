import { logger } from './logger';

/**
 * Reset welcome flags to simulate first-time user experience
 * This resets only the welcome flags, NOT progress
 * @param {Object} supabaseClient - Supabase client instance
 * @param {Object} supabaseUser - Current Supabase user profile
 * @returns {Promise<boolean>} - Success status
 */
export const resetWelcomeFlags = async (supabaseClient, supabaseUser) => {
  if (!supabaseClient || !supabaseUser || !supabaseUser.id) {
    logger.error('Cannot reset welcome flags: User not authenticated');
    return false;
  }

  try {
    const { error } = await supabaseClient
      .from('user_profiles')
      .update({
        has_seen_welcome: false,
        has_seen_beta_welcome: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', supabaseUser.id);

    if (error) {
      logger.error('Error resetting welcome flags:', error);
      return false;
    }

    logger.log('Welcome flags reset successfully - ready for first-time experience');
    return true;
  } catch (error) {
    logger.error('Error resetting welcome flags:', error);
    return false;
  }
};

