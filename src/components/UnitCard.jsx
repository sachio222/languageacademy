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
import '../styles/UnitCard.css';

const UnitCard = ({ unit, userId, isExpanded, onToggle }) => {
  // Lazy-load modules only when expanded
  const { data: modules, loading } = useUnitModules(userId, unit.unit_id, {
    enabled: isExpanded
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
              {formatDuration(unit.total_time_spent || 0)}
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

