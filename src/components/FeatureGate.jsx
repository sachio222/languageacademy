import { useState } from 'react';
import { Lock, Sparkles, BookOpen, Award } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { FEATURE_DESCRIPTIONS, getPlanDisplay, getPriceId } from '../config/stripe.config';
import { unitStructure, lessons } from '../lessons/lessonData';
import { useSession } from '@clerk/clerk-react';
import { logger } from '../utils/logger';
import '../styles/FeatureGate.css';

/**
 * FeatureGate Component
 * 
 * Wraps locked features and shows upgrade prompt when accessed by free users
 * 
 * Usage:
 * <FeatureGate feature="vocabulary-dashboard">
 *   <VocabularyDashboard />
 * </FeatureGate>
 * 
 * Or as a standalone gate:
 * <FeatureGate feature="vocabulary-dashboard" showPrompt />
 */
function FeatureGate({
  feature,
  children,
  showPrompt = false,
  title,
  description,
  icon,
  customCTA,
  touchpoint,
  metadata = {},
  className = '',
  subscriptionHook
}) {
  // Use passed-in hook if available, otherwise create own instance
  const ownSubscription = useSubscription();
  const { canAccess, showUpgradeModal, getTierDisplayName } = subscriptionHook || ownSubscription;
  const { session } = useSession();
  
  // State for selected plan (defaults to monthly)
  const [selectedPlanKey, setSelectedPlanKey] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if user has access to this feature
  const hasAccess = canAccess(feature);

  // If user has access, render children normally
  if (hasAccess && !showPrompt) {
    return <>{children}</>;
  }

  // Get feature info from config or use props
  const featureInfo = FEATURE_DESCRIPTIONS[feature] || {
    title: title || 'Premium Feature',
    description: description || 'Upgrade to access this feature',
    icon: icon || '✨'
  };

  // Determine touchpoint for analytics
  const analyticsTouchpoint = touchpoint || `feature-${feature}`;

  // Get selected plan display info
  const selectedPlan = getPlanDisplay(selectedPlanKey);

  // Handle opening the pricing modal to change plan
  const handleSelectDifferentPlan = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    logger.info('Opening plan selector from unlock screen');
    
    showUpgradeModal(analyticsTouchpoint, {
      feature,
      ...metadata,
      selectedPlanKey: selectedPlanKey, // Pass current selection
      onPlanSelected: (planKey) => {
        logger.info('Plan selected - updating unlock screen:', { planKey });
        setSelectedPlanKey(planKey);
      },
      onModalClose: metadata?.onUnlockModalClose // Callback to close unlock modal
    });
  };

  // Handle confirm and pay (direct to checkout)
  const handleConfirmAndPay = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsProcessing(true);

    try {
      const priceId = getPriceId(selectedPlanKey);
      
      if (!priceId) {
        throw new Error(`No price ID found for plan: ${selectedPlanKey}`);
      }

      logger.info('Confirming plan:', { selectedPlanKey, priceId, touchpoint: analyticsTouchpoint });

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
          touchpoint: analyticsTouchpoint,
          metadata: {
            feature,
            ...metadata
          }
        })
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
      logger.error('Error in confirm and pay:', error);
      alert(error.message || 'Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  // Calculate dynamic stats
  const learningUnits = unitStructure.filter(u => !u.isReference).length;
  const totalLessons = lessons.length;
  
  // If showing prompt (locked feature), display upgrade UI
  return (
    <div className={`feature-gate ${className}`}>
      <div className="feature-gate-overlay">
        <div className="feature-gate-content">
          {/* Icon */}
          <div className="feature-gate-icon">
            <Lock size={48} strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="feature-gate-title">{selectedPlan.name} Plan</h2>

          {/* Price */}
          <div className="feature-gate-price">
            Price: {selectedPlan.price} {selectedPlan.interval}
          </div>

          {/* What's included - Muted info box */}
          <div className="feature-gate-info-box">
            <p className="feature-gate-info-text">
              Get complete access to all {learningUnits - 1} units ({totalLessons - 11} lessons), unlimited practice sections, and premium features.
            </p>
            <p className="feature-gate-billing-note">
              {selectedPlanKey === 'lifetime' ? (
                <>
                  <strong>One-time payment.</strong> Pay once and get lifetime access. Includes our 30-day money-back guarantee.
                </>
              ) : (
                <>
                  <strong>Flexible billing.</strong> Your subscription will automatically renew. Cancel anytime with our 30-day money-back guarantee.
                </>
              )}
            </p>
          </div>

          {/* Primary CTA Button */}
          <button 
            className="feature-gate-cta"
            onClick={handleConfirmAndPay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Redirecting...' : 'Go to checkout'}
          </button>
          
          {/* Secondary link */}
          <button 
            className="feature-gate-secondary-link" 
            onClick={handleSelectDifferentPlan}
            disabled={isProcessing}
          >
            Select a different package
          </button>
          
          {/* Footer note */}
          <p className="feature-gate-footer-note">
            Currently on {getTierDisplayName()} plan
          </p>
        </div>
      </div>

      {/* Blurred preview (if children provided) */}
      {children && (
        <div className="feature-gate-preview" aria-hidden="true">
          {children}
        </div>
      )}
    </div>
  );
}

export default FeatureGate;
