/**
 * SectionProgressBar - Visual representation of section completion
 * Shows color-coded segments for each completed section with time spent
 * 
 * Design principles:
 * - Visual-first approach (no tree views)
 * - Clean, minimal design
 * - Progressive disclosure (details on hover/click)
 */

import React from 'react';
import { SECTION_REGISTRY } from '../config/sectionRegistry';
import '../styles/SectionProgressBar.css';

const SectionProgressBar = ({ sectionsDetail, moduleKey }) => {
  if (!sectionsDetail) return null;

  // Parse sections from JSONB
  const sections = typeof sectionsDetail === 'string' 
    ? JSON.parse(sectionsDetail) 
    : sectionsDetail;

  const completedSections = Object.entries(sections).filter(
    ([_, data]) => data.completed_at
  );

  if (completedSections.length === 0) {
    return (
      <div className="section-progress-bar empty">
        <span className="section-progress-empty-text">Not started</span>
      </div>
    );
  }

  // Calculate total time for proportional widths
  const totalTime = completedSections.reduce(
    (sum, [_, data]) => sum + (data.time_spent || 0), 
    0
  );

  // Format duration
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  return (
    <div className="section-progress-bar">
      {completedSections.map(([sectionId, data]) => {
        const section = SECTION_REGISTRY[sectionId];
        if (!section) return null;

        const width = totalTime > 0 
          ? `${((data.time_spent || 0) / totalTime) * 100}%` 
          : `${100 / completedSections.length}%`;

        return (
          <div
            key={sectionId}
            className="section-segment"
            style={{
              width,
              backgroundColor: section.color || '#999',
            }}
            title={`${section.label.replace('\n', ' ')}: ${formatDuration(data.time_spent || 0)}`}
            data-section={section.label}
          >
            <span className="section-segment-tooltip">
              {section.label.replace('\n', ' ')}: {formatDuration(data.time_spent || 0)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SectionProgressBar;

