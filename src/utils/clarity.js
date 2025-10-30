import clarity from '@microsoft/clarity';
import { logger } from './logger';

// Stop Clarity tracking if it's running
const stopClarity = () => {
  // Use Clarity's Consent API to disable tracking
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      window.clarity('consent', false);
      logger.log('Clarity tracking disabled via Consent API');
    } catch (error) {
      logger.log('Clarity Consent API not available, but tracking prevented');
    }
  }
};

export const initializeClarity = () => {
  const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;
  const isProduction = import.meta.env.PROD;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const consent = localStorage.getItem('clarity-consent');

  // Only initialize if user has consented, we have a project ID, and we're not in development mode
  if (consent === 'accepted' && CLARITY_PROJECT_ID && (isProduction || !isLocalhost)) {
    logger.log('Initializing Microsoft Clarity for:', window.location.hostname);
    clarity.init(CLARITY_PROJECT_ID);
    // Enable tracking via Consent API after initialization
    if (typeof window !== 'undefined' && window.clarity) {
      try {
        window.clarity('consent');
        logger.log('Clarity tracking enabled via Consent API');
      } catch (error) {
        // Consent API may not be immediately available, which is fine
      }
    }
  } else if (CLARITY_PROJECT_ID && consent !== 'rejected') {
    logger.log('Clarity not initialized - waiting for consent or development mode');
  } else if (consent === 'rejected') {
    logger.log('Clarity not initialized - user rejected cookies');
    stopClarity();
  } else {
    logger.log('Clarity not initialized - no project ID found');
  }
};

export const revokeClarityConsent = () => {
  // Disable Clarity tracking immediately
  stopClarity();
  localStorage.setItem('clarity-consent', 'rejected');
  logger.log('Clarity consent revoked - tracking disabled');
};

