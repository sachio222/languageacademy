import { logger } from './logger';

/**
 * Save cookie consent to database for authenticated users
 * @param {Object} supabaseClient - Supabase client instance
 * @param {Object} supabaseUser - Current Supabase user profile
 * @param {string} consent - 'accepted' or 'rejected'
 * @returns {Promise<boolean>} - Success status
 */
export const saveCookieConsentToDB = async (supabaseClient, supabaseUser, consent) => {
  if (!supabaseClient || !supabaseUser || !supabaseUser.id) {
    // User not authenticated, skip DB save
    return false;
  }

  try {
    const { error } = await supabaseClient
      .from('user_profiles')
      .update({
        cookie_consent: consent,
        cookie_consent_updated_at: new Date().toISOString(),
      })
      .eq('id', supabaseUser.id);

    if (error) {
      logger.error('Error saving cookie consent to database:', error);
      return false;
    }

    logger.log(`Cookie consent saved to database: ${consent}`);
    return true;
  } catch (error) {
    logger.error('Error saving cookie consent to database:', error);
    return false;
  }
};

