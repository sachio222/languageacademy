import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { 
  isPaidTier, 
  hasFeatureAccess, 
  canAccessUnit, 
  canAccessLesson,
  canAccessSection,
  canAccessSpecialModule,
  getRecommendedPlan 
} from '../config/stripe.config';
import { logger } from '../utils/logger';

/**
 * Custom hook for subscription and feature access management
 * 
 * Provides centralized access to:
 * - User's subscription tier
 * - Feature access checking
 * - Upgrade modal triggering
 * - Conversion tracking
 * 
 * @returns {object} Subscription state and methods
 */
export function useSubscription() {
  const { supabaseUser, profile } = useAuth();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [pricingModalContext, setPricingModalContext] = useState(null);

  // Get subscription tier from profile (defaults to 'free')
  const tier = profile?.subscription_tier || 'free';
  const subscriptionStatus = profile?.subscription_status || null;
  const stripeCustomerId = profile?.stripe_customer_id || null;
  const subscriptionId = profile?.stripe_subscription_id || null;

  // Derived states
  const isBeta = tier === 'beta';
  const isPaid = isPaidTier(tier);
  const isLifetime = tier === 'lifetime';
  const hasActiveSubscription = subscriptionStatus === 'active' || isLifetime || isBeta;
  const isSubscriptionPastDue = subscriptionStatus === 'past_due';
  const isSubscriptionCanceled = subscriptionStatus === 'canceled';

  /**
   * Check if user can access a specific feature
   * @param {string} feature - Feature identifier
   * @returns {boolean}
   */
  const canAccess = useCallback((feature) => {
    return hasFeatureAccess(feature, tier);
  }, [tier]);

  /**
   * Check if user can access a unit
   * @param {number} unitId - Unit number (1-10)
   * @returns {boolean}
   */
  const canAccessUnitById = useCallback((unitId) => {
    return canAccessUnit(unitId, tier);
  }, [tier]);

  /**
   * Check if user can access a lesson
   * @param {number} lessonId - Lesson ID
   * @returns {boolean}
   */
  const canAccessLessonById = useCallback((lessonId) => {
    return canAccessLesson(lessonId, tier);
  }, [tier]);

  /**
   * Check if user can access a section within a module
   * @param {string} sectionId - Section ID (e.g., 'vocabulary-intro', 'flash-cards')
   * @param {number} lessonId - Optional lesson ID for unit-based access
   * @returns {boolean}
   */
  const canAccessSectionById = useCallback((sectionId, lessonId = null) => {
    return canAccessSection(sectionId, tier, lessonId);
  }, [tier]);

  /**
   * Check if user can access a special module (fill-in-blank, unit exam, help module)
   * Special modules bypass section-level gating, so they need dedicated access logic
   * @param {number} lessonId - Lesson ID
   * @param {string} moduleType - Optional: 'fill-in-blank', 'unit-exam', 'help-module'
   * @returns {boolean}
   */
  const canAccessSpecialModuleById = useCallback((lessonId, moduleType = null) => {
    return canAccessSpecialModule(lessonId, tier, moduleType);
  }, [tier]);

  /**
   * Show pricing modal with context
   * @param {string} touchpoint - Touchpoint identifier (e.g., 'unit-lock', 'pronunciation-limit')
   * @param {object} metadata - Additional context data
   */
  const showUpgradeModal = useCallback((touchpoint, metadata = {}) => {
    const context = {
      touchpoint,
      timestamp: new Date().toISOString(),
      currentTier: tier,
      recommendedPlan: getRecommendedPlan({
        streakDays: profile?.streak_days || 0,
        hasCompletedUnit1: metadata.hasCompletedUnit1,
        weeksOnWeekly: metadata.weeksOnWeekly
      }),
      ...metadata
    };

    setPricingModalContext(context);
    setShowPricingModal(true);

    // Log conversion event impression
    logConversionEvent(touchpoint, 'impression', context);
  }, [tier, profile]);

  /**
   * Hide pricing modal
   * @param {boolean} converted - Whether user converted (clicked a plan)
   * @param {string} selectedPlan - Plan selected (if converted)
   */
  const hideUpgradeModal = useCallback((converted = false, selectedPlan = null) => {
    if (pricingModalContext && !converted) {
      // Log dismissal
      logConversionEvent(
        pricingModalContext.touchpoint, 
        'dismissed', 
        { ...pricingModalContext, dismissed: true }
      );
    }

    if (converted && selectedPlan && pricingModalContext) {
      // Log conversion
      logConversionEvent(
        pricingModalContext.touchpoint,
        'converted',
        { ...pricingModalContext, selectedPlan, converted: true }
      );
    }

    setShowPricingModal(false);
    setPricingModalContext(null);
  }, [pricingModalContext]);

  /**
   * Log conversion event to Supabase
   * @param {string} eventType - Event type
   * @param {string} action - 'impression', 'dismissed', 'converted'
   * @param {object} metadata - Event metadata
   */
  const logConversionEvent = async (eventType, action, metadata = {}) => {
    if (!supabaseUser) return;

    try {
      // Get Supabase client from window (assumes global client)
      const supabaseClient = window.supabase;
      if (!supabaseClient) {
        logger.warn('Supabase client not available for logging');
        return;
      }

      const eventData = {
        user_id: supabaseUser.id,
        event_type: eventType,
        metadata: metadata
      };

      if (action === 'impression') {
        eventData.shown_at = new Date().toISOString();
      } else if (action === 'dismissed') {
        eventData.dismissed = true;
        eventData.dismissed_at = new Date().toISOString();
      } else if (action === 'converted') {
        eventData.converted = true;
        eventData.converted_at = new Date().toISOString();
        eventData.selected_plan = metadata.selectedPlan || null;
      }

      const { error } = await supabaseClient
        .from('conversion_events')
        .insert(eventData);

      if (error) {
        logger.error('Error inserting conversion event:', error);
      } else {
        logger.info('Conversion event logged:', { eventType, action });
      }
    } catch (error) {
      logger.error('Error logging conversion event:', error);
    }
  };

  /**
   * Get user-friendly tier name
   * @returns {string}
   */
  const getTierDisplayName = useCallback(() => {
    const names = {
      free: 'Free',
      beta: 'Beta Tester',
      weekly: 'Weekly',
      monthly: 'Monthly',
      annual: 'Annual',
      lifetime: 'Lifetime'
    };
    return names[tier] || 'Free';
  }, [tier]);

  /**
   * Check if user should see upgrade prompts
   * (Don't show to beta testers, lifetime members, or active paid users unless specific touchpoint)
   * @returns {boolean}
   */
  const shouldShowUpgradePrompts = useCallback(() => {
    // Never show to beta testers (existing users with full access)
    if (isBeta) return false;
    
    // Always show to free users
    if (!isPaid) return true;

    // Never show to lifetime users
    if (isLifetime) return false;

    // Show to weekly users (want to upsell to annual)
    if (tier === 'weekly') return true;

    // Don't show to monthly/annual unless specific reason
    return false;
  }, [isBeta, isPaid, isLifetime, tier]);

  /**
   * Get upgrade CTA text based on current tier
   * @returns {string}
   */
  const getUpgradeCTA = useCallback(() => {
    if (!isPaid) return 'Upgrade Now';
    if (tier === 'weekly') return 'Switch to Annual & Save';
    if (tier === 'monthly') return 'Switch to Annual & Save';
    return 'Upgrade';
  }, [isPaid, tier]);

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && profile) {
      logger.info('Subscription state:', {
        tier,
        isPaid,
        isLifetime,
        subscriptionStatus,
        stripeCustomerId: stripeCustomerId ? '✓' : '✗'
      });
    }
  }, [tier, isPaid, isLifetime, subscriptionStatus, stripeCustomerId, profile]);

  return {
    // Subscription data
    tier,
    subscriptionStatus,
    stripeCustomerId,
    subscriptionId,

    // Computed states
    isBeta,
    isPaid,
    isLifetime,
    hasActiveSubscription,
    isSubscriptionPastDue,
    isSubscriptionCanceled,

    // Feature access methods
    canAccess,
    canAccessUnitById,
    canAccessLessonById,
    canAccessSectionById,
    canAccessSpecialModuleById,

    // Modal management
    showPricingModal,
    pricingModalContext,
    showUpgradeModal,
    hideUpgradeModal,

    // Utility methods
    getTierDisplayName,
    shouldShowUpgradePrompts,
    getUpgradeCTA,

    // Direct access to underlying data
    profile
  };
}

export default useSubscription;
