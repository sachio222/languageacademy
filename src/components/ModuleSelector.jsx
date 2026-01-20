import { useState, useEffect, Suspense, lazy } from 'react';
import { Check } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useSubscription } from '../hooks/useSubscription';
import { extractModuleId } from '../utils/progressSync';
import { logger } from '../utils/logger';
import { splitTitle } from '../utils/moduleUtils';
import {
  SECTION_REGISTRY,
  getActiveSections,
  isSectionAvailable,
  getSectionStatus
} from '../config/sectionRegistry';
import '../styles/ModuleSelector.css';

const FeatureGate = lazy(() => import('./FeatureGate'));

// Lazy load images for performance
const LazyImage = ({ src, alt, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = src;
  }, [src]);

  if (imageError) {
    return null; // Fallback to background color if image fails
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundImage: imageLoaded ? `url(${src})` : 'none',
        transition: 'opacity 0.3s ease',
        opacity: imageLoaded ? 1 : 0,
      }}
      aria-label={alt}
    />
  );
};

/**
 * Module Selector - Grid-based navigation for module sections
 * Shows all available sections with completion status
 */

// Sections now loaded from centralized registry
// This allows for flexible section management and easy addition/removal

function ModuleSelector({ lesson, onSectionSelect, moduleProgress, sectionProgress, completedExercises, subscription }) {
  const { isAuthenticated, profile } = useSupabaseProgress();
  // Use passed subscription or create fallback (for backward compatibility)
  const fallbackSubscription = useSubscription();
  const subscriptionHook = subscription || fallbackSubscription;
  
  const moduleId = extractModuleId(lesson);
  const { modulePrefix, mainTitle } = splitTitle(lesson.title);
  
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [lockedSectionName, setLockedSectionName] = useState('');

  // Check if user has premium access (super_admin gets premium)
  const hasPremiumAccess = profile?.role === 'super_admin';

  // Note: We keep the unlock modal open even when pricing modal opens
  // This allows the user to return to the unlock screen after selecting a plan

  // Debug logging
  logger.log('ModuleSelector premium access check:', {
    profile,
    role: profile?.role,
    hasPremiumAccess
  });

  // Get available sections for this lesson
  const availableSections = getActiveSections()
    .filter(section => isSectionAvailable(section.id, lesson));

  // Get section status using centralized logic
  const getSectionStatusForLesson = (section) => {
    const progress = moduleProgress?.[moduleId];
    const moduleSectionProgress = sectionProgress?.[moduleId] || {};

    const status = getSectionStatus(section.id, progress, moduleSectionProgress, lesson);

    // Debug logging for vocabulary-intro
    if (section.id === 'vocabulary-intro') {
      logger.log('ModuleSelector: vocabulary-intro status check', {
        sectionId: section.id,
        moduleId,
        progress,
        moduleSectionProgress,
        status,
        sectionProgressKeys: Object.keys(sectionProgress || {}),
        hasVocabIntroData: !!moduleSectionProgress['vocabulary-intro']
      });
    }

    return status;
  };

  // Get current active section from URL
  const getCurrentSection = () => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'selector' || !view) {
      // If on selector or no view, find the active section
      return availableSections.find(s => getSectionStatusForLesson(s) === 'active') || availableSections[0];
    }
    return availableSections.find(s => s.view === view) || availableSections[0];
  };

  const currentSection = getCurrentSection();

  const handleSectionClick = (section) => {
    // Check subscription access first (pass lesson ID for unit-based access)
    const hasSubscriptionAccess = subscriptionHook.canAccessSectionById(section.id, lesson.id);
    
    // If locked due to subscription OR premium/coming soon, show modal
    if (!hasSubscriptionAccess || ((section.isPremium || section.comingSoon) && !hasPremiumAccess)) {
      logger.log(`Section ${section.id} requires upgrade`);
      const sectionName = section.label.replace('\n', ' ');
      setLockedSectionName(section.comingSoon ? `${sectionName} (Coming Soon)` : sectionName);
      setShowUnlockModal(true);
      return;
    }

    if (section.isSpecial) {
      const allComplete = availableSections
        .filter(s => !s.isSpecial && (!s.isPremium || hasPremiumAccess) && (!s.comingSoon || hasPremiumAccess))
        .every(s => getSectionStatusForLesson(s) === 'completed');

      if (!allComplete) {
        logger.log('Next Module disabled - not all sections complete');
        return;
      }

      // Navigate to next module
      onSectionSelect('next');
      return;
    }

    // Check if section is locked due to prerequisites
    const status = getSectionStatusForLesson(section);
    if (status === 'locked') {
      logger.log(`Section ${section.id} is locked - prerequisites not met`);
      return;
    }

    // Navigate to section
    onSectionSelect(section.view);
  };

  return (
    <div className="module-selector">
      {/* Module Header */}
      <div className="module-selector-header">
        {modulePrefix && (
          <div className="module-selector-prefix">
            {modulePrefix}
          </div>
        )}
        <h2 className="module-selector-title">{mainTitle}</h2>
        {lesson.description && (
          <p className="module-selector-description">{lesson.description}</p>
        )}

        {/* Vocabulary Preview */}
        {lesson.vocabularyReference && lesson.vocabularyReference.length > 0 && (
          <div className="vocab-preview">
            <div className="vocab-preview-label">You'll learn:</div>
            <div className="vocab-preview-grid">
              {lesson.vocabularyReference.map((word, idx) => (
                <div
                  key={idx}
                  className="vocab-preview-word"
                  onClick={() => onSectionSelect('intro')}
                >
                  <span className="vocab-word-french">{word.french}</span>
                  <span className="vocab-word-english">{word.english}</span>
                </div>
              ))}
            </div>
            <button
              className="vocab-preview-see-all"
              onClick={() => onSectionSelect('intro')}
            >
              See all {lesson.vocabularyReference.length} words →
            </button>
          </div>
        )}
      </div>

      <div className="module-selector-grid">
        {availableSections.map((section) => {
          const status = getSectionStatusForLesson(section);
          const isActive = currentSection?.id === section.id && status === 'active';
          const isCompleted = status === 'completed';
          const isLocked = status === 'locked';

          // Check subscription access for this section (pass lesson ID for unit-based access)
          const hasSubscriptionAccess = subscriptionHook.canAccessSectionById(section.id, lesson.id);
          const isSubscriptionLocked = !hasSubscriptionAccess;

          const isPremiumCard = (section.isPremium || section.comingSoon) && !hasPremiumAccess;

          // Disable logic:
          // - Prerequisites not met + NOT subscription/premium issue: disabled
          // - All subscription-locked and premium cards: NOT disabled (clickable to show modal)
          const isDisabled = isLocked && !isSubscriptionLocked && !isPremiumCard;

          return (
            <button
              key={section.id}
              className={`module-selector-card ${status} ${isActive ? 'active' : ''} ${(isLocked || isPremiumCard || isSubscriptionLocked) ? 'locked' : ''} ${isPremiumCard ? 'premium' : ''} ${isSubscriptionLocked ? 'subscription-locked' : ''}`}
              onClick={() => handleSectionClick(section)}
              disabled={isDisabled}
              style={{
                '--section-color': section.color,
                cursor: (isSubscriptionLocked || isPremiumCard) ? 'pointer' : undefined
              }}
              title={
                isSubscriptionLocked || isPremiumCard
                  ? 'Click to upgrade'
                  : isLocked
                    ? 'Complete previous sections to unlock'
                    : ''
              }
            >
              {/* Background Image */}
              {section.hasImage && section.pexelsImage ? (
                <>
                  <LazyImage
                    src={section.pexelsImage}
                    alt={section.label}
                    className="module-selector-card-image"
                    style={{
                      backgroundColor: section.color,
                    }}
                  />
                  <div className="module-selector-card-scrim" />
                </>
              ) : (
                <div
                  className="module-selector-card-image"
                  style={{
                    backgroundColor: section.color,
                  }}
                />
              )}

              {/* Content Overlay */}
              <div className="module-selector-card-content">
                {/* Status Indicator - Top */}
                <div className="module-selector-card-status">
                  {isSubscriptionLocked || isPremiumCard ? (
                    <div className="premium-badges">
                      <div className="premium-badge">Premium</div>
                      {section.comingSoon && (
                        <div className="coming-soon-badge">Coming Soon</div>
                      )}
                    </div>
                  ) : !section.isSpecial ? (
                    <>
                      {isCompleted && (
                        <div className="status-checkmark">
                          <Check size={16} />
                        </div>
                      )}
                      {!isCompleted && (
                        <div className="status-circle-dashed" />
                      )}
                    </>
                  ) : null}
                </div>

                {/* Label - Bottom */}
                <div className="module-selector-card-label">
                  {section.label.split('\n').map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="unlock-modal-overlay" onClick={() => setShowUnlockModal(false)}>
          <div className="unlock-modal-content" onClick={(e) => e.stopPropagation()}>
            <Suspense fallback={<div>Loading...</div>}>
              <FeatureGate
                feature="all-sections"
                touchpoint="section-lock"
                title={`Unlock ${lockedSectionName}`}
                description="Get full access to all sections in every module"
                showPrompt={true}
                subscriptionHook={subscriptionHook}
                metadata={{
                  sectionName: lockedSectionName,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  onUnlockModalClose: () => setShowUnlockModal(false)
                }}
              />
            </Suspense>
            <button 
              className="unlock-modal-close"
              onClick={() => setShowUnlockModal(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleSelector;

