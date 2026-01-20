import { Check } from 'lucide-react';
import '../styles/Pricing.css';

/**
 * PlanCard Component - Premium Design
 * 
 * Clean pricing card with:
 * - Plan name and price
 * - Badge for recommended/current plans
 * - Savings highlight
 * - Clear CTA button
 * 
 * @param {object} plan - Plan data from stripe.config.js
 * @param {boolean} isRecommended - Whether this is the recommended plan
 * @param {function} onSelect - Callback when plan is selected
 * @param {boolean} isCurrentPlan - Whether this is user's current plan
 * @param {boolean} isSelected - Whether this plan is currently selected
 */
function PlanCard({ 
  plan, 
  isRecommended = false, 
  onSelect, 
  isCurrentPlan = false,
  isSelected = false
}) {
  const {
    key,
    name,
    tagline,
    price,
    intervalShort,
    badge,
    badgeColor,
    cta,
    highlight,
    weeklyCost
  } = plan;

  const handleSelect = () => {
    if (!isCurrentPlan && onSelect) {
      onSelect(key);
    }
  };

  return (
    <div 
      className={`plan-card ${highlight ? 'plan-card-highlight' : ''} ${isCurrentPlan ? 'plan-card-current' : ''} ${isSelected ? 'plan-card-selected' : ''}`}
      onClick={isCurrentPlan ? undefined : handleSelect}
    >
      {/* Badge/Ribbon */}
      {badge && (
        <div 
          className="plan-card-badge"
          style={{ background: badgeColor || '#6366f1' }}
        >
          {badge}
        </div>
      )}

      {/* Selected indicator - subtle checkmark in corner */}
      {isSelected && !isCurrentPlan && !badge && (
        <div className="plan-card-selected-indicator">
          <Check size={16} strokeWidth={2.5} />
        </div>
      )}

      {/* Current plan indicator */}
      {isCurrentPlan && (
        <div className="plan-card-current-badge">
          <Check size={14} strokeWidth={2.5} />
          <span>Current Plan</span>
        </div>
      )}

      {/* Header */}
      <div className="plan-card-header">
        <h3 className="plan-card-name">{name}</h3>
        {tagline && <p className="plan-card-tagline">{tagline}</p>}
      </div>

      {/* Pricing */}
      <div className="plan-card-pricing">
        <div className="plan-card-price">
          <span className="plan-card-price-value">{price}</span>
          <span className="plan-card-price-interval">{intervalShort}</span>
        </div>
        
        {/* Weekly cost breakdown (for monthly/annual) */}
        {weeklyCost && (
          <div className="plan-card-weekly-cost">
            {weeklyCost}/week
          </div>
        )}
      </div>

      {/* CTA Button */}
      <button 
        className={`plan-card-cta ${highlight ? 'plan-card-cta-highlight' : ''} ${isCurrentPlan ? 'plan-card-cta-disabled' : ''}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent double-firing
          handleSelect();
        }}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : cta}
      </button>
    </div>
  );
}

export default PlanCard;
