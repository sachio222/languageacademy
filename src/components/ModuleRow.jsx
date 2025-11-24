/**
 * ModuleRow - Individual module display in report card
 * Shows module info with section progress bar
 * 
 * Design: Clean, scannable list item with visual progress indicator
 */

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import SectionProgressBar from './SectionProgressBar';
import ModuleSectionDetails from './ModuleSectionDetails';
import { lessons } from '../lessons/lessonData';
import { splitTitle } from '../utils/moduleUtils';
import '../styles/ModuleRow.css';

const ModuleRow = ({ module, userId }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const isCompleted = !!module.completed_at;
  const completionPercentage = module.completion_percentage || 0;

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
          </div>

          <div className="module-row-stats">
            <div className="module-row-stat">
              <span className="module-row-stat-label">Time</span>
              <span className="module-row-stat-value">
                {formatDuration(module.time_spent || 0)}
              </span>
            </div>

            <div className="module-row-stat">
              <span className="module-row-stat-label">Progress</span>
              <span className="module-row-stat-value">
                {completionPercentage}%
              </span>
            </div>

            {module.completed_at && (
              <div className="module-row-stat">
                <span className="module-row-stat-label">Completed</span>
                <span className="module-row-stat-value">
                  {formatDate(module.completed_at)}
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

