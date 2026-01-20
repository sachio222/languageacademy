/**
 * Stripe Configuration for Language Academy
 * 
 * Manages subscription tiers, pricing, and feature gates
 * Uses real Stripe product and price IDs
 * 
 * NOTE: Paywall is currently DISABLED in App.jsx (all users have full access)
 * To enable: Uncomment the access check in App.jsx around line 522
 */

// Import unit structure for dynamic Unit 1 range (authoritative source)
import { unitStructure } from '../lessons/lessonData';

// ============================================================================
// STRIPE PRICE IDS (Production)
// ============================================================================

export const STRIPE_CONFIG = {
  // Product IDs
  products: {
    subscription: 'prod_Tp53UiP83NJwCp', // Weekly/Monthly/Annual
    lifetime: 'prod_Tp50E2jkfyW6ow'      // One-time purchase
  },

  // Price IDs
  prices: {
    weekly: 'price_1SrQtlEyhpMckjNRtFU3KUZ2',   // $9.95/week
    monthly: 'price_1SrQtlEyhpMckjNRyeDVHpPI',  // $19.95/month
    annual: 'price_1SrQtlEyhpMckjNRBfTUGJ2d',   // $150/year (was yearly in your data)
    lifetime: 'price_1SrQqxEyhpMckjNRGAeW1CTm'  // $225 one-time
  },

  // Feature access by tier
  features: {
    free: [
      'all-modules',               // Can enter any module
      'unit-1-full',               // Full access to all Unit 1 sections (lessons 1-11)
      'vocabulary-intro',          // Free vocabulary-intro in modules outside Unit 1
      'pronunciation-limited',     // 10 attempts per day
      'basic-streak-tracking',
      'reference-modules',         // Phonics, alphabet, etc.
    ],
    
    paid: [
      // All paid tiers unlock these features
      'all-modules',               // Can enter any module
      'all-sections',              // Full access to all sections within modules
      'flash-cards',               // Flash cards section
      'speed-match',               // Speed match section
      'comprehension',             // Comprehension exercises
      'pronunciation-unlimited',   // No daily limit
      'conversation',              // Conversation practice
      'vocabulary-dashboard',      // Track all words learned
      'offline-mode',              // Learn without internet
      'word-of-day-email',         // Daily WOTD emails
      'advanced-pronunciation',    // Detailed scoring
      'module-certificates',       // PDF certificates per unit
      'priority-support',          // 24hr response time
      'custom-vocabulary-lists',   // Import your own words
      'progress-export'            // Download your data
    ]
  },

  // Display metadata for UI
  display: {
    weekly: {
      name: 'Weekly',
      tagline: 'Try it out',
      price: '$9.95',
      priceValue: 9.95,
      interval: 'per week',
      intervalShort: '/week',
      badge: null,
      badgeColor: null,
      cta: 'Get started',
      description: 'Perfect for testing the waters',
      showAnnualWarning: false,
      order: 4 // Display order (4th position)
    },
    
    monthly: {
      name: 'Monthly',
      tagline: 'Cancel anytime',
      price: '$19.95',
      priceValue: 19.95,
      interval: 'per month',
      intervalShort: '/mo',
      weeklyCost: '$4.60',
      weeklyCostValue: 4.61,
      savings: '$278',
      savingsValue: 278.80,
      badge: null,
      badgeColor: '#3b82f6', // Blue
      cta: 'Get started',
      description: 'Cancel anytime, no commitment',
      order: 3
    },
    
    annual: {
      name: 'Annual',
      tagline: 'Most popular',
      price: '$150',
      priceValue: 150,
      interval: 'per year',
      intervalShort: '/year',
      weeklyCost: '$2.88',
      weeklyCostValue: 2.88,
      monthlyCost: '$12.50',
      monthlyCostValue: 12.50,
      savings: '$367',
      savingsValue: 367.40,
      savingsPercent: 71,
      badge: 'Most popular',
      badgeColor: '#6366f1', // Indigo
      cta: 'Get started',
      description: 'Lock in the best rate',
      highlight: true,
      order: 2
    },
    
    lifetime: {
      name: 'Lifetime',
      tagline: 'Pay once',
      price: '$225',
      priceValue: 225,
      interval: 'one-time',
      intervalShort: 'forever',
      savings: null,
      breakevenMonths: 13.5, // Breaks even vs monthly after 13.5 months
      breakevenAnnual: 1.5,  // 1.5x the annual price
      badge: null,
      badgeColor: '#f59e0b', // Amber/gold
      cta: 'Get started',
      description: 'Lock in everything, forever',
      highlight: false,
      mostPopular: false,
      order: 1
    }
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a subscription tier is a paid tier
 * @param {string} tier - 'free', 'weekly', 'monthly', 'annual', 'lifetime', 'beta'
 * @returns {boolean}
 */
export const isPaidTier = (tier) => {
  return ['weekly', 'monthly', 'annual', 'lifetime', 'beta'].includes(tier);
};

/**
 * Check if user has access to a specific feature
 * @param {string} feature - Feature identifier (e.g., 'all-units', 'pronunciation-unlimited')
 * @param {string} userTier - User's subscription tier
 * @returns {boolean}
 */
export const hasFeatureAccess = (feature, userTier) => {
  if (!userTier) userTier = 'free';
  
  // Beta users (existing testers) get full access to everything
  if (userTier === 'beta') return true;
  
  // Paid users get all paid features
  if (isPaidTier(userTier)) {
    return STRIPE_CONFIG.features.paid.includes(feature) || 
           STRIPE_CONFIG.features.free.includes(feature);
  }
  
  // Free users only get free features
  return STRIPE_CONFIG.features.free.includes(feature);
};

/**
 * Get price ID for a given plan
 * @param {string} plan - 'weekly', 'monthly', 'annual', 'lifetime'
 * @returns {string|null} Stripe price ID
 */
export const getPriceId = (plan) => {
  return STRIPE_CONFIG.prices[plan] || null;
};

/**
 * Get display metadata for a plan
 * @param {string} plan - 'weekly', 'monthly', 'annual', 'lifetime'
 * @returns {object|null}
 */
export const getPlanDisplay = (plan) => {
  return STRIPE_CONFIG.display[plan] || null;
};

/**
 * Get all plans sorted by display order
 * @returns {array} Array of plan objects with key and display data
 */
export const getAllPlans = () => {
  return Object.keys(STRIPE_CONFIG.display)
    .map(key => ({
      key,
      priceId: STRIPE_CONFIG.prices[key],
      ...STRIPE_CONFIG.display[key]
    }))
    .sort((a, b) => a.order - b.order);
};

/**
 * Check if a unit is accessible to a given tier
 * @param {number} unitId - Unit number (1-10)
 * @param {string} userTier - User's subscription tier
 * @returns {boolean}
 */
export const canAccessUnit = (unitId, userTier) => {
  if (!userTier) userTier = 'free';
  
  // Beta users (existing testers) get full access
  if (userTier === 'beta') return true;
  
  // All users can access all units (but sections are gated)
  return true;
};

/**
 * Check if a lesson/module is accessible
 * @param {number} lessonId - Lesson ID (1-138+)
 * @param {string} userTier - User's subscription tier
 * @returns {boolean}
 */
export const canAccessLesson = (lessonId, userTier) => {
  if (!userTier) userTier = 'free';
  
  // Beta users (existing testers) get full access
  if (userTier === 'beta') return true;
  
  // All users can enter any module (but sections are gated)
  return true;
};

/**
 * Check if a section within a module is accessible
 * @param {string} sectionId - Section ID (e.g., 'vocabulary-intro', 'flash-cards')
 * @param {string} userTier - User's subscription tier
 * @param {number} lessonId - Optional lesson ID to check unit-based access
 * @returns {boolean}
 */
export const canAccessSection = (sectionId, userTier, lessonId = null) => {
  if (!userTier) userTier = 'free';
  
  // Beta users get full access
  if (userTier === 'beta') return true;
  
  // Paid users get all sections
  if (isPaidTier(userTier)) return true;
  
  // Free users get all sections in Unit 1 (lessons 1-11)
  if (lessonId && isLessonInUnit1(lessonId)) return true;
  
  // Free users in other units only get vocabulary-intro
  return sectionId === 'vocabulary-intro';
};

// ============================================================================
// UNIT 1 ACCESS LOGIC (centralized, dynamically sourced)
// ============================================================================

/**
 * Get Unit 1 lesson range dynamically from unitStructure
 * This is the authoritative source - no hardcoded values!
 * @returns {object} { start: number, end: number }
 */
export const getUnit1Range = () => {
  // Find Unit 1 in the dynamic unit structure
  const unit1 = unitStructure.find(unit => unit.id === 1);
  
  if (!unit1 || !unit1.lessonRange) {
    console.warn('Unit 1 not found in unitStructure, falling back to default range');
    return { start: 1, end: 13 }; // Fallback (should never happen)
  }
  
  const [start, end] = unit1.lessonRange;
  return { start, end };
};

/**
 * Check if a lesson is in Unit 1 (free for all users)
 * Uses dynamic unit structure - no hardcoded ranges!
 * @param {number} lessonId - Lesson ID
 * @returns {boolean}
 */
export const isLessonInUnit1 = (lessonId) => {
  if (!lessonId || isNaN(lessonId)) return false;
  
  const range = getUnit1Range();
  return lessonId >= range.start && lessonId <= range.end;
};

/**
 * Check if a special module (fill-in-blank, unit exam, help module) is accessible
 * Special modules bypass section-level gating, so they need dedicated access logic
 * @param {number} lessonId - Lesson ID
 * @param {string} userTier - User's subscription tier
 * @param {string} moduleType - Optional: 'fill-in-blank', 'unit-exam', 'help-module'
 * @returns {boolean}
 */
export const canAccessSpecialModule = (lessonId, userTier, moduleType = null) => {
  if (!userTier) userTier = 'free';
  
  // Beta users get full access
  if (userTier === 'beta') return true;
  
  // Paid users get all special modules
  if (isPaidTier(userTier)) return true;
  
  // Free users only get Unit 1 special modules
  return isLessonInUnit1(lessonId);
};

/**
 * Get recommended plan based on user behavior
 * @param {object} context - User context (streakDays, weeksOnWeekly, etc.)
 * @returns {string} Recommended plan key
 */
export const getRecommendedPlan = (context = {}) => {
  const { streakDays = 0, weeksOnWeekly = 0, hasCompletedUnit1 = false } = context;
  
  // Strong commitment signals → Lifetime
  if (streakDays >= 7) return 'lifetime';
  if (hasCompletedUnit1 && streakDays >= 3) return 'lifetime';
  
  // On weekly for 2+ weeks → Annual (save money!)
  if (weeksOnWeekly >= 2) return 'annual';
  
  // Default to Annual (best value for most)
  return 'annual';
};

/**
 * Calculate savings for annual vs monthly
 * @returns {object} Savings data
 */
export const getAnnualSavings = () => {
  const monthly = STRIPE_CONFIG.display.monthly.priceValue;
  const annual = STRIPE_CONFIG.display.annual.priceValue;
  const monthlyCostAnnual = monthly * 12;
  const savings = monthlyCostAnnual - annual;
  const savingsPercent = Math.round((savings / monthlyCostAnnual) * 100);
  
  return {
    monthlyCost: monthlyCostAnnual,
    annualCost: annual,
    savings,
    savingsPercent,
    savingsFormatted: `$${savings.toFixed(0)}`
  };
};

/**
 * Calculate breakeven point for lifetime vs other plans
 * @returns {object} Breakeven data
 */
export const getLifetimeBreakeven = () => {
  const lifetime = STRIPE_CONFIG.display.lifetime.priceValue;
  const monthly = STRIPE_CONFIG.display.monthly.priceValue;
  const annual = STRIPE_CONFIG.display.annual.priceValue;
  
  return {
    monthsVsMonthly: Math.ceil(lifetime / monthly),
    yearsVsAnnual: (lifetime / annual).toFixed(1),
    message: `Lifetime pays for itself in ${Math.ceil(lifetime / monthly)} months vs monthly`
  };
};

/**
 * Get pricing comparison data for display
 * @returns {object} Comparison data
 */
export const getPricingComparison = () => {
  return {
    weekly: {
      perWeek: 9.95,
      perMonth: 9.95 * 4.33, // ~$43/month
      perYear: 9.95 * 52, // $517/year
      warning: 'Most expensive annually!'
    },
    monthly: {
      perWeek: 19.95 / 4.33, // ~$4.61/week
      perMonth: 19.95,
      perYear: 19.95 * 12, // $239/year
      info: 'Standard plan'
    },
    annual: {
      perWeek: 150 / 52, // ~$2.88/week
      perMonth: 150 / 12, // $12.50/month
      perYear: 150,
      savings: 'Save $89 vs monthly',
      highlight: true
    },
    lifetime: {
      perWeek: 'N/A',
      perMonth: 'N/A',
      perYear: 225,
      info: 'One payment, forever',
      highlight: true
    }
  };
};

// ============================================================================
// FEATURE DESCRIPTIONS (for UI)
// ============================================================================

export const FEATURE_DESCRIPTIONS = {
  'all-units': {
    title: 'Full Access',
    description: 'Complete French curriculum from beginner to intermediate',
    icon: '📚'
  },
  'unit-1-full': {
    title: 'Unit 1 Complete',
    description: 'Full access to all sections in Unit 1 (11 lessons)',
    icon: '✨'
  },
  'pronunciation-unlimited': {
    title: 'Unlimited Pronunciation',
    description: 'Practice speaking as much as you want with AI feedback',
    icon: '🎤'
  },
  'vocabulary-dashboard': {
    title: 'Vocabulary Dashboard',
    description: 'Track all words learned with flashcards and review',
    icon: '📊'
  },
  'speed-match-full': {
    title: 'Speed Match Game',
    description: 'Gamified practice for faster recall',
    icon: '⚡'
  },
  'word-of-day-email': {
    title: 'Word of the Day',
    description: 'Daily French word delivered to your inbox',
    icon: '📬'
  },
  'module-certificates': {
    title: 'Certificates',
    description: 'PDF certificates for each completed unit',
    icon: '🏆'
  },
  'priority-support': {
    title: 'Priority Support',
    description: '24-hour response time for questions',
    icon: '💬'
  }
};

// ============================================================================
// TOUCHPOINT CONFIGURATIONS
// ============================================================================

export const TOUCHPOINT_CONFIG = {
  'unit-lock': {
    title: 'Unlock All Units',
    description: 'Continue your French learning journey',
    recommendedPlan: 'annual',
    showComparison: true
  },
  'section-lock': {
    title: 'Unlock Full Module Access',
    description: 'Get complete access to flash cards, speed match, and all practice sections',
    recommendedPlan: 'monthly',
    showComparison: true
  },
  'fill-in-blank-lock': {
    title: 'Unlock Fill-in-the-Blank',
    description: 'Get full access to all fill-in-the-blank practice exercises',
    recommendedPlan: 'monthly',
    showComparison: true
  },
  'unit-exam-lock': {
    title: 'Unlock Unit Exams',
    description: 'Get full access to all unit exams and comprehensive assessments',
    recommendedPlan: 'monthly',
    showComparison: true
  },
  'help-module-lock': {
    title: 'Unlock Help Modules',
    description: 'Get full access to all help modules and learning resources',
    recommendedPlan: 'monthly',
    showComparison: true
  },
  'reading-comprehension-lock': {
    title: 'Unlock Reading Comprehension',
    description: 'Get full access to all reading comprehension modules and exercises',
    recommendedPlan: 'monthly',
    showComparison: true
  },
  'pronunciation-limit': {
    title: 'Unlimited Pronunciation Practice',
    description: "You've hit your daily limit. Upgrade for unlimited practice!",
    recommendedPlan: 'monthly',
    emphasizeFeature: 'pronunciation-unlimited'
  },
  'vocabulary-lock': {
    title: 'Track Your Vocabulary',
    description: 'See all words learned with flashcards and review tools',
    recommendedPlan: 'annual',
    emphasizeFeature: 'vocabulary-dashboard'
  },
  'unit-1-complete': {
    title: '🎉 Unit 1 Complete!',
    description: "You've learned 73 French words and can have basic conversations!",
    recommendedPlan: 'lifetime',
    showCelebration: true,
    testimonial: {
      text: "I've been using Language Academy for 3 weeks and already had my first conversation in Paris!",
      author: 'Sarah M., Lifetime Member'
    }
  },
  'streak-7d': {
    title: '🔥 7-Day Streak!',
    description: "You're in the top 15% of learners. Lock in your progress!",
    recommendedPlan: 'lifetime',
    emphasizePlan: 'lifetime',
    message: 'Commit to fluency with lifetime access'
  },
  'weekly-upgrade': {
    title: '💡 Save Money!',
    description: 'Switch to Annual and save $367/year',
    recommendedPlan: 'annual',
    showSavings: true
  }
};

export default STRIPE_CONFIG;
