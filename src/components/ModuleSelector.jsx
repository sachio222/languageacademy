import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import { logger } from '../utils/logger';
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

// Section configuration - easy to extend/modify
// Using relevant Pexels images optimized for each section
const SECTIONS = [
  {
    id: 'vocabulary-intro',
    label: 'Vocabulary\nIntro',
    view: 'intro',
    color: '#8B5CF6', // Purple
    pexelsImage: 'https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    hasImage: true,
  },
  {
    id: 'flash-cards',
    label: 'Flash\nCards',
    view: 'study',
    color: '#3B82F6', // Blue
    pexelsImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    hasImage: true,
  },
  {
    id: 'speed-match',
    label: 'Speed\nMatch',
    view: 'speedmatch',
    color: '#10B981', // Green
    pexelsImage: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    hasImage: true,
  },
  {
    id: 'writing',
    label: 'Writing',
    view: 'practice',
    color: '#F59E0B', // Orange
    pexelsImage: 'https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    hasImage: true,
  },
  {
    id: 'pronunciation',
    label: 'Pronunciation',
    view: 'pronunciation',
    color: '#EF4444', // Red
    pexelsImage: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    hasImage: true,
  },
  {
    id: 'conversation',
    label: 'Conversation',
    view: 'conversation',
    color: '#06B6D4', // Cyan
    pexelsImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    hasImage: true,
  },
  {
    id: 'next-module',
    label: 'Next\nModule →',
    view: 'next',
    color: '#6B7280', // Grey
    hasImage: false,
    isSpecial: true,
  },
];

// Helper function to split module title (same as ConceptIntro)
const splitTitle = (title) => {
  const moduleMatch = title.match(/^(Module \d+|Reference [IVX]+):\s*(.*)$/);
  if (moduleMatch) {
    return {
      modulePrefix: moduleMatch[1],
      mainTitle: moduleMatch[2]
    };
  }
  return {
    modulePrefix: null,
    mainTitle: title
  };
};

function ModuleSelector({ lesson, onSectionSelect, moduleProgress, completedExercises }) {
  const { isAuthenticated } = useSupabaseProgress();
  const moduleId = extractModuleId(lesson);
  const { modulePrefix, mainTitle } = splitTitle(lesson.title);
  
  // Determine completion status for each section
  const getSectionStatus = (section) => {
    if (section.isSpecial) {
      // Next Module is enabled when all other sections are complete
      const progress = moduleProgress?.[moduleId];
      const totalExercises = lesson.exercises?.length || 0;
      const allComplete = progress && 
        progress.study_mode_completed && 
        progress.completed_exercises >= totalExercises;
      return allComplete ? 'enabled' : 'disabled';
    }

    // Check if section has been visited/completed
    const progress = moduleProgress?.[moduleId];
    if (!progress) {
      // First section (vocabulary intro) is active by default
      return section.id === 'vocabulary-intro' ? 'active' : 'incomplete';
    }

    switch (section.id) {
      case 'vocabulary-intro':
        // Intro is considered complete if user has started study mode or practice
        return progress.study_mode_completed || progress.completed_exercises > 0 ? 'completed' : 'active';
      
      case 'flash-cards':
        return progress.study_mode_completed ? 'completed' : 'incomplete';
      
      case 'speed-match':
        // Speed match complete if practice has started (assumes speed match was done)
        return progress.completed_exercises > 0 ? 'completed' : 'incomplete';
      
      case 'writing':
        // Writing complete if all exercises are done
        const totalExercises = lesson.exercises?.length || 0;
        return progress.completed_exercises >= totalExercises ? 'completed' : 'incomplete';
      
      case 'pronunciation':
        // Not yet implemented - always incomplete
        return 'incomplete';
      
      case 'conversation':
        // Not yet implemented - always incomplete
        return 'incomplete';
      
      default:
        return 'incomplete';
    }
  };

  // Get current active section from URL
  const getCurrentSection = () => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'selector' || !view) {
      // If on selector or no view, find the active section
      return SECTIONS.find(s => getSectionStatus(s) === 'active') || SECTIONS[0];
    }
    return SECTIONS.find(s => s.view === view) || SECTIONS[0];
  };

  const currentSection = getCurrentSection();

  const handleSectionClick = (section) => {
    if (section.isSpecial) {
      const allComplete = SECTIONS
        .filter(s => !s.isSpecial)
        .every(s => getSectionStatus(s) === 'completed');
      
      if (!allComplete) {
        logger.log('Next Module disabled - not all sections complete');
        return;
      }
      
      // Navigate to next module
      onSectionSelect('next');
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
        {SECTIONS.map((section) => {
          const status = getSectionStatus(section);
          const isActive = currentSection.id === section.id && status === 'active';
          const isCompleted = status === 'completed';
          const isDisabled = status === 'disabled';

          return (
            <button
              key={section.id}
              className={`module-selector-card ${status} ${isActive ? 'active' : ''}`}
              onClick={() => handleSectionClick(section)}
              disabled={isDisabled}
              style={{
                '--section-color': section.color,
              }}
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
                  {isCompleted && (
                    <div className="status-checkmark">
                      <Check size={16} />
                    </div>
                  )}
                  {!isCompleted && !isActive && (
                    <div className="status-circle-dashed" />
                  )}
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

