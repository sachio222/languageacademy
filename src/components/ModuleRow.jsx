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
import '../styles/ModuleRow.css';

// LocalStorage key for persisting expanded modules
const EXPANDED_MODULES_STORAGE_KEY = 'reportCard_expandedModules';

// Passing score threshold (80%)
const PASSING_SCORE = 80;

// Sections that require passing scores
const SECTIONS_WITH_SCORES = [
  'speed-match',
  'practice-exercises', 
  'exam-questions',
  'module-exam'
];

/**
 * Check if a section is truly complete:
 * - For sections with scores: Must have completed_at AND score >= 80%
 * - For other sections: Just needs completed_at
 */
const isSectionComplete = (sectionId, sectionData) => {
  if (!sectionData?.completed_at) return false;
  
  // Check if this section type requires a passing score
  if (SECTIONS_WITH_SCORES.includes(sectionId)) {
    // Extract score/accuracy from progress_data JSONB field
    let percentage = 0;
    if (sectionData.progress_data) {
      const progressData = typeof sectionData.progress_data === 'string' 
        ? JSON.parse(sectionData.progress_data)
        : sectionData.progress_data;
      // Speed Match uses 'accuracy', exams might use 'score' or 'percentage'
      percentage = progressData?.accuracy || progressData?.percentage || progressData?.score || 0;
    }
    return percentage >= PASSING_SCORE;
  }
  
  // Non-scored sections just need completed_at
  return true;
};

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

  // Calculate completion from sections_detail (NEW DATA) - not legacy module fields
  const calculateSectionBasedCompletion = () => {
    if (!module.sections_detail) return { percentage: 0, isCompleted: false, lastCompletedDate: null };
    
    const sections = typeof module.sections_detail === 'string' 
      ? JSON.parse(module.sections_detail) 
      : module.sections_detail;

    const sectionEntries = Object.entries(sections);
    if (sectionEntries.length === 0) return { percentage: 0, isCompleted: false, lastCompletedDate: null };

    // Count only sections that meet completion criteria (including passing scores)
    const completedSections = sectionEntries.filter(([sectionId, data]) => 
      isSectionComplete(sectionId, data)
    );
    
    const percentage = Math.round((completedSections.length / sectionEntries.length) * 100);
    const isCompleted = percentage === 100;
    
    // Get most recent completion date from truly completed sections
    const lastCompletedDate = completedSections.length > 0
      ? completedSections.reduce((latest, [_, data]) => {
          const sectionDate = new Date(data.completed_at);
          return sectionDate > latest ? sectionDate : latest;
        }, new Date(0))
      : null;

    return { percentage, isCompleted, lastCompletedDate };
  };

  const { percentage: completionPercentage, isCompleted, lastCompletedDate } = calculateSectionBasedCompletion();

  // Parse sections to show completed ones (with passing scores)
  const getCompletedSections = () => {
    if (!module.sections_detail) return [];
    
    const sections = typeof module.sections_detail === 'string' 
      ? JSON.parse(module.sections_detail) 
      : module.sections_detail;

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

