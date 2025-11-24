/**
 * ModuleSectionDetails - Detailed section breakdown modal/expandable
 * Shows each section's completion status, time spent, and progress data
 */

import React from 'react';
import { X, Clock, CheckCircle, Circle } from 'lucide-react';
import { SECTION_REGISTRY } from '../config/sectionRegistry';
import '../styles/ModuleSectionDetails.css';

const ModuleSectionDetails = ({ moduleKey, sectionsDetail, userId, onClose }) => {
  // Parse sections from JSONB
  const sections = sectionsDetail 
    ? (typeof sectionsDetail === 'string' ? JSON.parse(sectionsDetail) : sectionsDetail)
    : {};

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  // Get all available sections from registry
  const allSections = Object.values(SECTION_REGISTRY)
    .filter(s => !s.isSpecial && !s.comingSoon)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="module-section-details">
      <div className="section-details-header">
        <h4 className="section-details-title">Section Breakdown</h4>
        <button 
          className="section-details-close"
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={18} />
        </button>
      </div>

      <div className="section-details-list">
        {allSections.map(section => {
          const sectionData = sections[section.id];
          const isCompleted = sectionData?.completed_at;
          const timeSpent = sectionData?.time_spent || 0;

          return (
            <div 
              key={section.id}
              className={`section-detail-item ${isCompleted ? 'completed' : 'incomplete'}`}
            >
              <div className="section-detail-icon-wrapper">
                {isCompleted ? (
                  <CheckCircle size={20} className="section-detail-icon completed" />
                ) : (
                  <Circle size={20} className="section-detail-icon incomplete" />
                )}
              </div>

              <div className="section-detail-info">
                <div 
                  className="section-detail-color-bar"
                  style={{ backgroundColor: section.color }}
                />
                <span className="section-detail-label">
                  {section.label.replace('\n', ' ')}
                </span>
              </div>

              <div className="section-detail-stats">
                {timeSpent > 0 && (
                  <span className="section-detail-time">
                    <Clock size={14} />
                    {formatDuration(timeSpent)}
                  </span>
                )}
                {!isCompleted && timeSpent === 0 && (
                  <span className="section-detail-status">Not started</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSectionDetails;

