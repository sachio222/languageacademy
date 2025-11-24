/**
 * UnitCard - Clean card for unit-level progress
 * Expandable to show module details
 * 
 * Design: Card-based, visual hierarchy, generous spacing
 */

import React from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { useUnitModules } from '../hooks/useEnhancedProgress';
import ModuleRow from './ModuleRow';
import { lessons } from '../lessons/lessonData';
import { splitTitle } from '../utils/moduleUtils';
import '../styles/UnitCard.css';

const UnitCard = ({ unit, userId, isExpanded, onToggle }) => {
  // Load modules always to show completed preview when collapsed
  // This is a strategic tradeoff: slight initial load for better UX
  const { data: modules, loading } = useUnitModules(userId, unit.unit_id, {
    enabled: true // Always fetch to show preview
  });

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return '0m';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  const completionPercentage = unit.completion_percentage || 0;
  const totalModules = unit.total_modules || 0;
  const completedModules = unit.completed_modules || 0;
  
  // Always use unit.total_time_spent - it's already correctly calculated from section times
  // No need to recalculate from modules (redundant and causes race conditions)
  const unitTime = unit.total_time_spent || 0;

  return (
    <div className="unit-card">
      <button 
        className="unit-card-header"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="unit-card-title-section">
          <span className="unit-card-icon">{unit.icon || '📚'}</span>
          <div className="unit-card-title-wrapper">
            <h3 className="unit-card-title">
              {unit.title || `Unit ${unit.unit_id}`}
            </h3>
            <p className="unit-card-subtitle">
              {completedModules} of {totalModules} modules
            </p>
          </div>
        </div>

        <div className="unit-card-stats-section">
          <div className="unit-card-stat">
            <span className="unit-card-stat-value">{completionPercentage}%</span>
            <span className="unit-card-stat-label">Complete</span>
          </div>

          <div className="unit-card-stat">
            <span className="unit-card-stat-value">
              {formatDuration(unitTime)}
            </span>
            <span className="unit-card-stat-label">Study Time</span>
          </div>

          <div className="unit-card-expand-icon">
            <ChevronDown 
              size={20}
              className={isExpanded ? 'rotated' : ''}
            />
          </div>
        </div>
      </button>

      {/* Progress Ring */}
      <div className="unit-card-progress">
        <div 
          className="unit-card-progress-bar"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Collapsed Preview: Show completed modules */}
      {!isExpanded && modules && modules.length > 0 && (
        <div className="unit-card-preview">
          {modules
            .filter(m => m.completed_at) // Only show completed
            .slice(0, 6) // Max 6 to keep clean
            .map(module => {
              const lesson = lessons.find(l => l.moduleKey === module.module_key);
              const fullTitle = lesson?.title || module.module_key;
              const { mainTitle } = splitTitle(fullTitle);
              
              return (
                <div key={module.module_key} className="unit-card-preview-badge">
                  <span className="preview-badge-check">✓</span>
                  <span className="preview-badge-title">{mainTitle}</span>
                </div>
              );
            })}
          {modules.filter(m => m.completed_at).length > 6 && (
            <div className="unit-card-preview-more">
              +{modules.filter(m => m.completed_at).length - 6} more
            </div>
          )}
        </div>
      )}

      {/* Expandable Module List */}
      {isExpanded && (
        <div className="unit-card-content">
          {loading ? (
            <div className="unit-card-loading">
              <div className="loading-spinner-small" />
              <span>Loading modules...</span>
            </div>
          ) : modules && modules.length > 0 ? (
            <div className="unit-card-modules">
              {modules.map(module => (
                <ModuleRow 
                  key={module.module_key}
                  module={module}
                  userId={userId}
                />
              ))}
            </div>
          ) : (
            <div className="unit-card-empty">
              <BookOpen size={32} style={{ color: '#e0e0e0' }} />
              <span>No modules in progress yet</span>
              <p className="unit-card-empty-hint">Start learning to see your progress here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitCard;

