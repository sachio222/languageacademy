import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from '@clerk/clerk-react';
import PlanCard from './PlanCard';
import { useSubscription } from '../hooks/useSubscription';
import { getAllPlans, getPriceId, TOUCHPOINT_CONFIG } from '../config/stripe.config';
import { unitStructure, lessons } from '../lessons/lessonData';
import { logger } from '../utils/logger';
import '../styles/Pricing.css';

/**
 * PricingModal Component
 * 
 * Main conversion UI showing all 4 pricing tiers
 * Handles plan selection and redirects to Stripe Checkout
 * 
 * Props:
 * - isOpen: boolean - Whether modal is visible
 * - onClose: function - Close handler
 * - context: object - Touchpoint context (from useSubscription)
 */
function PricingModal({ isOpen, onClose, context = {} }) {
  const { tier: currentTier, hideUpgradeModal } = useSubscription();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Track which plan is currently selected (for visual indicator)
  // Defaults to monthly, or the plan from context if provided
  const [selectedPlanKey, setSelectedPlanKey] = useState(() => {
    return context?.selectedPlanKey || 'monthly';
  });
  
  // Update selected plan when context changes (e.g., when modal reopens)
  useEffect(() => {
    if (context?.selectedPlanKey) {
      setSelectedPlanKey(context.selectedPlanKey);
    }
  }, [context?.selectedPlanKey]);

  if (!isOpen) return null;

  // Get all plans sorted by display order
  const plans = getAllPlans();

  // Calculate dynamic stats
  const learningUnits = unitStructure.filter(u => !u.isReference).length;
  const totalLessons = lessons.length;

  // Get touchpoint configuration with safe defaults
  const safeContext = context || { touchpoint: 'direct' };
  const touchpoint = safeContext.touchpoint || 'direct';
  const touchpointConfig = TOUCHPOINT_CONFIG[touchpoint] || {};

  // Determine recommended plan
  const recommendedPlan = context?.recommendedPlan || touchpointConfig.recommendedPlan || 'monthly';

  // Get modal content based on touchpoint
  const title = touchpointConfig.title || 'Choose Your Plan';
  const subtitle = touchpointConfig.description || 'Continue your French learning journey';
  const showCelebration = touchpointConfig.showCelebration || false;
  const testimonial = touchpointConfig.testimonial || null;

  /**
   * Handle plan selection
   * If there's an onPlanSelected callback (from FeatureGate), call it and close
   * Otherwise, redirect to Stripe Checkout with selected price ID
   */
  const handlePlanSelect = async (planKey) => {
    if (planKey === currentTier) return; // Already on this plan

    // Update selected plan for visual indicator
    setSelectedPlanKey(planKey);
    setSelectedPlan(planKey);
    
    // If there's a callback (from FeatureGate unlock flow), use it
    if (safeContext.onPlanSelected && typeof safeContext.onPlanSelected === 'function') {
      logger.info('Plan selected via callback - returning to unlock screen:', { planKey });
      safeContext.onPlanSelected(planKey);
      onClose(); // Close the pricing modal
      return;
    }

    // Otherwise, proceed with direct checkout
    setIsLoading(true);

    try {
      const priceId = getPriceId(planKey);
      
      if (!priceId) {
        throw new Error(`No price ID found for plan: ${planKey}`);
      }

      logger.info('Selected plan:', { planKey, priceId, touchpoint });

      // Log conversion
      hideUpgradeModal(true, planKey);

      // Get Supabase auth token from Clerk
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!session) {
        throw new Error('Not authenticated - please sign in');
      }

      const clerkToken = await session.getToken({ template: 'supabase' });
      if (!clerkToken) {
        throw new Error('Failed to get authentication token');
      }

      // Get Supabase anon key for edge function authorization
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      logger.info('Token obtained, calling checkout:', { 
        hasToken: !!clerkToken, 
        tokenLength: clerkToken.length,
        functionUrl: `${supabaseUrl}/functions/v1/stripe-checkout`
      });

      // Call Stripe Checkout Edge Function
      const functionUrl = `${supabaseUrl}/functions/v1/stripe-checkout`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'X-Clerk-Token': clerkToken,
        },
        body: JSON.stringify({
          priceId,
          touchpoint,
          metadata: safeContext,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        logger.error('Checkout failed:', { status: response.status, error: data.error, data });
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
      
    } catch (error) {
      logger.error('Error selecting plan:', error);
      alert(`Error: ${error.message}\n\nPlease try again or contact support.`);
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (!isLoading) {
      hideUpgradeModal(false, null); // Log dismissal
      
      // If there's a callback to close the unlock modal, call it
      if (safeContext.onModalClose && typeof safeContext.onModalClose === 'function') {
        safeContext.onModalClose();
      }
      
      onClose();
    }
  };

  return (
    <div className="pricing-modal-overlay" onClick={handleClose}>
      <div className="pricing-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button 
          className="pricing-modal-close" 
          onClick={handleClose}
          disabled={isLoading}
          aria-label="Close"
        >
          <X size={20} strokeWidth={2} />
        </button>

        {/* Header */}
        <div className={`pricing-modal-header ${showCelebration ? 'celebration' : ''}`}>
          <h2 className="pricing-modal-title">{title}</h2>
          <p className="pricing-modal-subtitle">{subtitle}</p>
        </div>

        {/* Plans Grid */}
        <div className="pricing-modal-plans">
          {plans.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              isRecommended={plan.key === recommendedPlan}
              isCurrentPlan={plan.key === currentTier}
              isSelected={plan.key === selectedPlanKey}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>

        {/* What's Included - All Plans */}
        <div className="pricing-modal-benefits">
          <h3 className="pricing-modal-benefits-title">Every plan includes</h3>
          <div className="pricing-modal-benefits-grid">
            <div className="pricing-modal-benefit">All {learningUnits} units · {totalLessons} lessons</div>
            <div className="pricing-modal-benefit">Unlimited pronunciation practice</div>
            <div className="pricing-modal-benefit">Vocabulary dashboard</div>
            <div className="pricing-modal-benefit">Speed Match game</div>
          </div>
        </div>

        {/* Testimonial */}
        {testimonial && (
          <div className="pricing-modal-testimonial">
            <p className="pricing-modal-testimonial-text">{testimonial.text}</p>
            <p className="pricing-modal-testimonial-author">— {testimonial.author}</p>
          </div>
        )}

        {/* Footer */}
        <div className="pricing-modal-footer">
          <p className="pricing-modal-footer-text">
            Secure checkout · Instant access · Cancel anytime
          </p>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="pricing-modal-loading">
            <div className="pricing-modal-loading-content">
              <div className="pricing-modal-loading-spinner"></div>
              <p className="pricing-modal-loading-text">
                Redirecting to checkout...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PricingModal;
