import clarity from '@microsoft/clarity';
import { logger } from './logger';

// Check if Clarity is available
const isClarityAvailable = () => {
  return typeof window !== 'undefined' && window.clarity;
};

// Stop Clarity tracking if it's running
const stopClarity = () => {
  // Use Clarity's Consent API to disable tracking
  if (isClarityAvailable()) {
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
    if (isClarityAvailable()) {
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

// Custom Tags API - Apply tags to filter sessions
export const setClarityTag = (key, value) => {
  if (!isClarityAvailable()) return;
  
  try {
    window.clarity('set', key, value);
  } catch (error) {
    logger.log(`Clarity tag set failed: ${key}=${value}`);
  }
};

// Custom Events API - Track user actions
export const trackClarityEvent = (eventName) => {
  if (!isClarityAvailable()) return;
  
  try {
    window.clarity('event', eventName);
  } catch (error) {
    logger.log(`Clarity event tracking failed: ${eventName}`);
  }
};

// Custom Identifiers API - Track users across sessions
export const identifyClarityUser = (userId, sessionId = null, pageId = null, friendlyName = null) => {
  if (!isClarityAvailable()) return;
  
  try {
    window.clarity('identify', userId, sessionId, pageId, friendlyName);
  } catch (error) {
    logger.log(`Clarity user identification failed: ${userId}`);
  }
};

// Upgrade API - Prioritize important sessions for recording
export const upgradeClaritySession = (reason) => {
  if (!isClarityAvailable()) return;
  
  try {
    window.clarity('upgrade', reason);
  } catch (error) {
    logger.log(`Clarity session upgrade failed: ${reason}`);
  }
};

// Track UTM parameters from URL for campaign tracking
export const trackUTMParameters = () => {
  if (!isClarityAvailable()) return;
  
  const params = new URLSearchParams(window.location.search);
  
  // Common UTM parameters
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');
  const utmTerm = params.get('utm_term');
  const utmContent = params.get('utm_content');
  
  // Also track referrer
  const referrer = document.referrer;
  
  // Set tags for any UTM parameters present
  if (utmSource) {
    setClarityTag('utmSource', utmSource);
    logger.log(`Clarity: Traffic source = ${utmSource}`);
  }
  if (utmMedium) setClarityTag('utmMedium', utmMedium);
  if (utmCampaign) setClarityTag('utmCampaign', utmCampaign);
  if (utmTerm) setClarityTag('utmTerm', utmTerm);
  if (utmContent) setClarityTag('utmContent', utmContent);
  
  // Track referrer domain if available
  if (referrer) {
    try {
      const referrerDomain = new URL(referrer).hostname;
      setClarityTag('referrer', referrerDomain);
    } catch (e) {
      // Invalid referrer URL, ignore
    }
  }
  
  // If no UTM source but has referrer, mark as organic/referral
  if (!utmSource && referrer) {
    setClarityTag('trafficType', 'referral');
  } else if (!utmSource && !referrer) {
    setClarityTag('trafficType', 'direct');
  } else if (utmSource) {
    setClarityTag('trafficType', 'campaign');
  }
};

