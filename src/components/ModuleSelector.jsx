import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
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

function ModuleSelector({ lesson, onSectionSelect, moduleProgress, sectionProgress, completedExercises }) {
  const { isAuthenticated } = useSupabaseProgress();
  const moduleId = extractModuleId(lesson);
  const { modulePrefix, mainTitle } = splitTitle(lesson.title);
  
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
    // Prevent click on premium/coming soon sections
    if (section.isPremium || section.comingSoon) {
      logger.log(`Section ${section.id} is coming soon`);
      return;
    }

    if (section.isSpecial) {
      const allComplete = availableSections
        .filter(s => !s.isSpecial && !s.isPremium && !s.comingSoon)
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
      </div>

      <div className="module-selector-grid">
        {availableSections.map((section) => {
          const status = getSectionStatusForLesson(section);
          const isActive = currentSection?.id === section.id && status === 'active';
          const isCompleted = status === 'completed';
          const isDisabled = status === 'disabled' || status === 'locked';
          const isLocked = status === 'locked';

          const isPremiumCard = section.isPremium || section.comingSoon;

          return (
            <button
              key={section.id}
              className={`module-selector-card ${status} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''} ${isPremiumCard ? 'premium' : ''}`}
              onClick={() => handleSectionClick(section)}
              disabled={isDisabled || isPremiumCard}
              style={{
                '--section-color': section.color,
              }}
              title={
                isPremiumCard 
                  ? 'Coming Soon - Premium Feature' 
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
                  {isPremiumCard ? (
                    <div className="premium-badges">
                      {section.isPremium && (
                        <div className="premium-badge">Premium</div>
                      )}
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
    </div>
  );
}

export default ModuleSelector;

