/**
 * ModuleRow - Individual module display in report card
 * Shows module info with section progress bar
 * 
 * Design: Clean, scannable list item with visual progress indicator
 */

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import SectionProgressBar from './SectionProgressBar';
import ModuleSectionDetails from './ModuleSectionDetails';
import { lessons } from '../lessons/lessonData';
import { splitTitle } from '../utils/moduleUtils';
import { SECTION_REGISTRY } from '../config/sectionRegistry';
import { 
  isSectionComplete, 
  getModuleCompletionFromSectionsDetail,
  parseSectionsDetail 
} from '../utils/moduleCompletion';
import '../styles/ModuleRow.css';

// LocalStorage key for persisting expanded modules
const EXPANDED_MODULES_STORAGE_KEY = 'reportCard_expandedModules';

const ModuleRow = ({ module, userId }) => {
  // Initialize showDetails from localStorage
  const [showDetails, setShowDetails] = useState(() => {
    try {
      const stored = localStorage.getItem(EXPANDED_MODULES_STORAGE_KEY);
      if (stored) {
        const expandedModules = JSON.parse(stored);
        return expandedModules.includes(module.module_key);
      }
    } catch (error) {
      console.warn('Failed to load expanded modules from localStorage:', error);
    }
    return false;
  });

  // Persist showDetails to localStorage whenever it changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXPANDED_MODULES_STORAGE_KEY);
      let expandedModules = stored ? JSON.parse(stored) : [];
      
      if (showDetails) {
        // Add to expanded list if not already there
        if (!expandedModules.includes(module.module_key)) {
          expandedModules.push(module.module_key);
        }
      } else {
        // Remove from expanded list
        expandedModules = expandedModules.filter(key => key !== module.module_key);
      }
      
      localStorage.setItem(EXPANDED_MODULES_STORAGE_KEY, JSON.stringify(expandedModules));
    } catch (error) {
      console.warn('Failed to save expanded modules to localStorage:', error);
    }
  }, [showDetails, module.module_key]);

  // Format duration
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Find lesson by module key and get proper title
  const lesson = lessons.find(l => l.moduleKey === module.module_key);
  const fullTitle = lesson?.title || module.module_key;
  
  // Use the same splitTitle logic as other components
  const { mainTitle } = splitTitle(fullTitle);

  // Calculate completion using unified completion service
  const { 
    percentage: completionPercentage, 
    isComplete: isCompleted, 
    lastCompletedDate 
  } = getModuleCompletionFromSectionsDetail(module, lesson);

  // Parse sections to show completed ones (with passing scores)
  const getCompletedSections = () => {
    if (!module.sections_detail) return [];
    
    const sections = parseSectionsDetail(module.sections_detail);

    return Object.entries(sections)
      .filter(([sectionId, data]) => isSectionComplete(sectionId, data))
      .map(([sectionId, data]) => {
        const section = SECTION_REGISTRY[sectionId];
        return section ? {
          id: sectionId,
          label: section.label.replace('\n', ' '),
          color: section.color,
          timeSpent: data.time_spent || 0
        } : null;
      })
      .filter(Boolean);
  };

  const completedSections = getCompletedSections();

  return (
    <>
      <div 
        className={`module-row ${isCompleted ? 'completed' : 'in-progress'}`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="module-row-main">
          <div className="module-row-info">
            <div className="module-row-header">
              <h4 className="module-row-title">{mainTitle}</h4>
              {isCompleted && (
                <span className="module-row-badge">✓</span>
              )}
            </div>
            
            <SectionProgressBar 
              sectionsDetail={module.sections_detail} 
              moduleKey={module.module_key}
            />

            {/* Show completed sections when NOT expanded */}
            {!showDetails && completedSections.length > 0 && (
              <div className="module-row-sections-preview">
                {completedSections.map(section => (
                  <div 
                    key={section.id}
                    className="section-preview-badge"
                    style={{ 
                      borderLeftColor: section.color,
                    }}
                  >
                    <span className="section-preview-check">✓</span>
                    <span className="section-preview-label">{section.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="module-row-stats">
            <div className="module-row-stat">
              <span className="module-row-stat-label">Time</span>
              <span className="module-row-stat-value">
                {formatDuration(module.time_spent_seconds || 0)}
                {module.time_source === 'module' && (
                  <span className="time-source-badge" title="Time data from old system (section-level detail not available)">*</span>
                )}
              </span>
            </div>

            <div className="module-row-stat">
              <span className="module-row-stat-label">Progress</span>
              <span className="module-row-stat-value">
                {completionPercentage}%
              </span>
            </div>

            {lastCompletedDate && isCompleted && (
              <div className="module-row-stat">
                <span className="module-row-stat-label">Completed</span>
                <span className="module-row-stat-value">
                  {formatDate(lastCompletedDate)}
                </span>
              </div>
            )}

            <button 
              className="module-row-expand"
              aria-label="Show details"
            >
              <ChevronRight 
                size={18} 
                className={showDetails ? 'rotated' : ''}
              />
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <ModuleSectionDetails 
          moduleKey={module.module_key}
          sectionsDetail={module.sections_detail}
          userId={userId}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ModuleRow;

