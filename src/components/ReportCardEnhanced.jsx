/**
 * Enhanced ReportCard - Refactored with new architecture
 * Uses separated hooks and service layer for better performance
 * Follows DESIGN_PRINCIPLES.md for clean, minimal design
 * 
 * Features:
 * - Lazy-loaded unit/module details
 * - Section-level progress visualization
 * - Clean, scannable interface
 * - Proper caching and separation of concerns
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, Flame, TrendingUp, BookOpen, Clock, Award, Download } from 'lucide-react';
import { 
  useHeroStats, 
  useUnitProgress, 
  useRecentActivity,
  useUserProfile
} from '../hooks/useEnhancedProgress';
import UnitCard from './UnitCard';
import HeroStatsCard from './HeroStatsCard';
import { lessons } from '../lessons/lessonData';
import { generateDynamicUnitStructure } from '../lessons/unitStructureGenerator';
import { getLessonByModuleKey } from '../utils/moduleKeyMapper';
import '../styles/ReportCardEnhanced.css';

// LocalStorage key for persisting expanded units
const EXPANDED_UNITS_STORAGE_KEY = 'reportCard_expandedUnits';

function ReportCard({ userId = null, onExportPDF = null, isAdminView = false, onBack = null }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Initialize expandedUnits from localStorage
  const [expandedUnits, setExpandedUnits] = useState(() => {
    try {
      const stored = localStorage.getItem(EXPANDED_UNITS_STORAGE_KEY);
      if (stored) {
        return new Set(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load expanded units from localStorage:', error);
    }
    return new Set();
  });
  
  const [showAllActivity, setShowAllActivity] = useState(false);

  // Persist expandedUnits to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(EXPANDED_UNITS_STORAGE_KEY, JSON.stringify([...expandedUnits]));
    } catch (error) {
      console.warn('Failed to save expanded units to localStorage:', error);
    }
  }, [expandedUnits]);

  // Fetch data using separated hooks
  const { data: profile, loading: profileLoading } = useUserProfile(userId);
  const { data: heroStats, loading: heroStatsLoading } = useHeroStats(userId);
  const { data: unitProgress, loading: unitProgressLoading } = useUnitProgress(userId);
  const { data: recentActivity, loading: activityLoading } = useRecentActivity(userId, 20);

  // Get unit metadata from lesson structure
  const unitStructure = useMemo(() => {
    return generateDynamicUnitStructure(lessons);
  }, []);

  // Merge unit progress data with unit metadata
  const enrichedUnits = useMemo(() => {
    if (!unitProgress || !unitStructure) return [];

    return unitProgress
      .map(progressUnit => {
        // Parse unit_id - database stores numeric "1", "3", "13"
        const unitIdStr = progressUnit.unit_id || '';
        const unitNumber = parseInt(unitIdStr);
        
        // Skip if we can't parse a valid unit number
        if (isNaN(unitNumber) || unitNumber === 0) {
          console.warn('Invalid unit_id:', progressUnit.unit_id);
          return null;
        }
        
        // Find matching unit metadata
        const unitMeta = unitStructure.find(u => u.id === unitNumber);

        return {
          ...progressUnit,
          // Keep original unit_id format from database
          // Add metadata from unit structure
          title: unitMeta?.title || `Unit ${unitNumber}`,
          icon: unitMeta?.icon || '📚',
          color: unitMeta?.color || '#3b82f6',
          description: unitMeta?.description || '',
          // Preserve total_time_spent from getUnitProgress (calculated from section times)
          // Don't overwrite - it's already correctly calculated
        };
      })
      .filter(Boolean) // Remove null entries
      .sort((a, b) => parseInt(a.unit_id) - parseInt(b.unit_id));
  }, [unitProgress, unitStructure]);

  // Filter units to only show those with section activity
  const enrichedUnitsWithTime = useMemo(() => {
    if (!enrichedUnits) return [];

    // Only show units that will have modules with section activity
    return enrichedUnits.filter(unit => {
      // A unit should only show if it has modules that would appear in the enhanced report card
      // Since modules are filtered by section activity, we need to check if this unit would have any modules
      return unit.total_modules > 0; // Keep for now, will be filtered when modules are loaded
    });
  }, [enrichedUnits]);

  // Aggregate loading states - must check ALL data sources
  const loading = profileLoading || heroStatsLoading || unitProgressLoading;
  // Only show empty state if we're done loading AND have no data
  const hasData = !loading && heroStats && enrichedUnits && enrichedUnits.length > 0;

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

  // Format relative time
  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Get module display name (maps module_key to lesson title)
  const getModuleDisplayName = (moduleKeyOrId) => {
    // Try as module_key first
    const lesson = getLessonByModuleKey(moduleKeyOrId);
    if (lesson) {
      return lesson.title;
    }
    
    // Fallback: try as lesson id
    const lessonById = lessons.find(l => l.id === parseInt(moduleKeyOrId));
    return lessonById?.title || moduleKeyOrId;
  };

  // Toggle unit expansion
  const toggleUnit = (unitId) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  // Loading state
  if (loading) {
    return (
      <div className="report-card-enhanced">
        <div className="report-card-loading">
          <div className="loading-spinner" />
          <p>Loading report card...</p>
        </div>
      </div>
    );
  }

  // Error or no data state
  if (!hasData) {
    return (
      <div className="report-card-enhanced">
        <div className="report-card-empty">
          <BookOpen size={48} />
          <p>No progress data available yet</p>
          <span>Start learning to see your progress here</span>
        </div>
      </div>
    );
  }

  // Get student name
  const studentName = profile?.preferred_name || profile?.first_name || 'Student';

  return (
    <div className="report-card-enhanced">
      {/* Header */}
      <div className="report-card-header">
        {onBack && (
          <button className="report-card-back-btn" onClick={onBack}>
            <ChevronLeft size={20} />
            Back
          </button>
        )}

        <div className="report-card-title-section">
          <h1 className="report-title">
            {isAdminView ? `${studentName}'s Report Card` : 'Your Progress Report'}
          </h1>
          {profile?.last_active_at && (
            <p className="report-subtitle">
              Last active {formatRelativeTime(profile.last_active_at)}
            </p>
          )}
        </div>

        {onExportPDF && (
          <button className="report-card-export-btn" onClick={() => onExportPDF(heroStats)}>
            <Download size={18} />
            Export PDF
          </button>
        )}
      </div>

      {/* Hero Stats */}
      <section className="hero-stats-section">
        <HeroStatsCard 
          icon={Clock}
          value={formatDuration(heroStats.total_study_time || 0)}
          label="Study Time"
          color="#3b82f6"
        />
        <HeroStatsCard 
          icon={Flame}
          value={heroStats.streak_days || 0}
          label="Day Streak"
          color="#f59e0b"
        />
        <HeroStatsCard 
          icon={Award}
          value={`${heroStats.accuracy || 0}%`}
          label="Accuracy"
          color="#10b981"
        />
        <HeroStatsCard 
          icon={BookOpen}
          value={heroStats.words_learned || 0}
          label="Words Learned"
          color="#8b5cf6"
        />
      </section>

      {/* Tabs */}
      <section className="report-tabs-section">
        <div className="report-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={18} />
            <span>Overview</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <Clock size={18} />
            <span>Recent Activity</span>
          </button>
        </div>

        <div className="tabs-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <div className="unit-grid">
                {enrichedUnitsWithTime.map(unit => (
                  <UnitCard
                    key={unit.unit_id}
                    unit={unit}
                    userId={userId}
                    isExpanded={expandedUnits.has(unit.unit_id)}
                    onToggle={() => toggleUnit(unit.unit_id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="tab-panel">
              {activityLoading ? (
                <div className="activity-loading">
                  <span>Loading activity...</span>
                </div>
              ) : recentActivity && recentActivity.modules.length > 0 ? (
                <>
                  <div className="activity-table-container">
                    <table className="activity-table">
                      <thead>
                        <tr>
                          <th>Module</th>
                          <th>Time Spent</th>
                          <th>Completed</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(showAllActivity ? recentActivity.modules : recentActivity.modules.slice(0, 20)).map(module => (
                          <tr key={module.id} className="activity-row">
                            <td className="activity-module">{getModuleDisplayName(module.module_key)}</td>
                            <td className="activity-time">{formatDuration(module.time_spent_seconds || 0)}</td>
                            <td className="activity-date">{formatRelativeTime(module.completed_at)}</td>
                            <td className="activity-score">
                              {module.exam_score !== null ? `${module.exam_score}%` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {recentActivity.modules.length > 20 && (
                    <div className="activity-show-more">
                      <button
                        className="show-more-button"
                        onClick={() => setShowAllActivity(!showAllActivity)}
                      >
                        {showAllActivity
                          ? `Show less (showing ${recentActivity.modules.length} items)`
                          : `Show all (${recentActivity.modules.length} items)`
                        }
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="empty-message">No recent activity</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ReportCard;

