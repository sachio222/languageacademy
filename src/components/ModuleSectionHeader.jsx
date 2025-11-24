import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { SECTION_REGISTRY } from '../config/sectionRegistry';
import { splitTitle } from '../utils/moduleUtils';
import '../styles/ModuleSectionHeader.css';

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
 * Module Section Header - Full-width header for section pages
 * Matches the selector card design (color, image, checkmark)
 * Now automatically checks completion status from database
 */

const SECTION_CONFIG = {
  'intro': {
    id: 'vocabulary-intro',
    label: 'Vocabulary Intro',
    color: '#8B5CF6',
    pexelsImage: 'https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop',
    hasImage: true,
  },
  'study': {
    id: 'flash-cards',
    label: 'Flash Cards',
    color: '#3B82F6',
    pexelsImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop',
    hasImage: true,
  },
  'speedmatch': {
    id: 'speed-match',
    label: 'Speed Match',
    color: '#10B981',
    pexelsImage: 'https://images.pexels.com/photos/13633156/pexels-photo-13633156.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop',
    hasImage: true,
  },
  'practice': {
    id: 'writing',
    label: 'Writing',
    color: '#F59E0B',
    pexelsImage: 'https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop',
    hasImage: true,
  },
  'pronunciation': {
    id: 'pronunciation',
    label: 'Pronunciation',
    color: '#EF4444',
    pexelsImage: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop',
    hasImage: true,
  },
  'conversation': {
    id: 'conversation',
    label: 'Conversation',
    color: '#06B6D4',
    pexelsImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop',
    hasImage: true,
  },
};

function ModuleSectionHeader({ sectionId, moduleId, lesson, onBack }) {
  const config = SECTION_CONFIG[sectionId] || SECTION_CONFIG['intro'];
  
  // Get reactive state from hooks
  const { sectionProgress } = useSectionProgress();
  const { moduleProgress } = useSupabaseProgress();
  
  // Calculate completion status (will re-render when state changes)
  const sectionRegistryId = config.id;
  const section = SECTION_REGISTRY[sectionRegistryId];
  const moduleSectionProgress = sectionProgress?.[moduleId] || {};
  const moduleProgressData = moduleProgress?.[moduleId];
  
  // This calculation happens on every render, so it's reactive
  const isCompleted = section?.getCompletionStatus?.(
    moduleProgressData,
    moduleSectionProgress,
    lesson
  ) === 'completed';

  // Extract module prefix from lesson title
  const { modulePrefix } = lesson ? splitTitle(lesson.title) : { modulePrefix: null };

  return (
    <div 
      className="module-section-header"
      style={{
        '--section-color': config.color,
      }}
    >
      {/* Background Image */}
      {config.hasImage && config.pexelsImage ? (
        <>
          <LazyImage
            src={config.pexelsImage}
            alt={config.label}
            className="module-section-header-image"
            style={{
              backgroundColor: config.color,
            }}
          />
          <div className="module-section-header-scrim" />
        </>
      ) : (
        <div 
          className="module-section-header-image"
          style={{
            backgroundColor: config.color,
          }}
        />
      )}
      
      {/* Content */}
      <div className="module-section-header-content">
        <button className="module-section-header-back" onClick={onBack}>
          ← Back to Menu
        </button>
        
        <div className="module-section-header-title-wrapper">
          {modulePrefix && (
            <div className="module-section-header-prefix">
              {modulePrefix}
            </div>
          )}
          <div className="module-section-header-title">
            {config.label}
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="module-section-header-status">
          {isCompleted && (
            <div className="status-checkmark">
              <Check size={20} />
            </div>
          )}
          {!isCompleted && (
            <div className="status-circle-dashed" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ModuleSectionHeader;

