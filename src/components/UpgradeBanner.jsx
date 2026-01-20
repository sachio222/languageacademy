import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import '../styles/Pricing.css';

/**
 * UpgradeBanner Component
 * 
 * Dismissible banner for soft upgrade prompts
 * Used for non-blocking conversion touchpoints
 * 
 * Props:
 * - variant: string - Banner variant ('pronunciation-limit', 'weekly-upgrade', etc.)
 * - title: string - Banner title
 * - description: string - Banner description
 * - onUpgrade: function - Callback when upgrade is clicked (optional, uses showUpgradeModal by default)
 * - ctaText: string - CTA button text
 * - dismissible: boolean - Whether banner can be dismissed
 * - className: string - Additional CSS classes
 */
function UpgradeBanner({
  variant = 'default',
  title,
  description,
  onUpgrade,
  ctaText = 'Upgrade Now',
  dismissible = true,
  className = ''
}) {
  const { showUpgradeModal } = useSubscription();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't render if dismissed
  if (isDismissed) return null;

  /**
   * Handle upgrade click
   */
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      // Use default showUpgradeModal with variant as touchpoint
      showUpgradeModal(variant);
    }
  };

  /**
   * Handle dismiss
   */
  const handleDismiss = () => {
    setIsDismissed(true);
    
    // Store dismissal in localStorage to prevent showing again this session
    try {
      const dismissedBanners = JSON.parse(localStorage.getItem('dismissedUpgradeBanners') || '{}');
      dismissedBanners[variant] = {
        dismissedAt: new Date().toISOString(),
        sessionId: sessionStorage.getItem('sessionId') || 'unknown'
      };
      localStorage.setItem('dismissedUpgradeBanners', JSON.stringify(dismissedBanners));
    } catch (error) {
      // Silent fail if localStorage not available
    }
  };

  return (
    <div className={`upgrade-banner ${className}`}>
      <div className="upgrade-banner-icon">
        <Sparkles size={24} strokeWidth={2} />
      </div>

      <div className="upgrade-banner-content">
        <h4 className="upgrade-banner-title">{title}</h4>
        {description && (
          <p className="upgrade-banner-description">{description}</p>
        )}
      </div>

      <div className="upgrade-banner-actions">
        <button 
          className="upgrade-banner-cta"
          onClick={handleUpgrade}
        >
          {ctaText}
        </button>

        {dismissible && (
          <button 
            className="upgrade-banner-dismiss"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <X size={20} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Hook to check if a banner has been dismissed this session
 */
export function useBannerDismissal(variant) {
  try {
    const dismissedBanners = JSON.parse(localStorage.getItem('dismissedUpgradeBanners') || '{}');
    return !!dismissedBanners[variant];
  } catch (error) {
    return false;
  }
}

/**
 * Clear all dismissed banners (useful for testing or after successful upgrade)
 */
export function clearDismissedBanners() {
  try {
    localStorage.removeItem('dismissedUpgradeBanners');
  } catch (error) {
    // Silent fail
  }
}

export default UpgradeBanner;
