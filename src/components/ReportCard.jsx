import { useState } from 'react';
import { ChevronDown, Flame, TrendingUp, BookOpen, Clock, Award, Target, Download } from 'lucide-react';
import { useReportCardData } from '../hooks/useReportCardData';
import { calculateCommunicationInsights } from '../utils/communicationInsights';
import { verifyTimeTracking } from '../utils/timeTrackingTest';
import { lessons } from '../lessons/lessonData';
import '../styles/ReportCard.css';

/**
 * Shared ReportCard Component
 * Displays comprehensive progress report for any student
 * 
 * @param {string} userId - Student user ID (if null, shows current user)
 * @param {function} onExportPDF - Optional callback for PDF export
 * @param {boolean} isAdminView - Whether this is admin viewing another student
 * @param {function} onBack - Optional callback for back navigation
 */
function ReportCard({ userId = null, onExportPDF = null, isAdminView = false, onBack = null }) {
  const [timeRange, setTimeRange] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [performanceExpanded, setPerformanceExpanded] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  const { data, loading, error, refetch } = useReportCardData(userId, {
    includeDetailedProgress: true,
    timeRange
  });

  // Verify time tracking consistency (development only)
  if (data && process.env.NODE_ENV === 'development') {
    verifyTimeTracking(data);
  }

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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to find lesson by module_id
  const findLessonByModuleId = (moduleId) => {
    if (!moduleId) return null;
    const moduleIdStr = String(moduleId);
    const isNumeric = /^\d+$/.test(moduleIdStr);

    if (isNumeric) {
      const moduleIdNum = parseInt(moduleIdStr, 10);
      return lessons.find((l) => l.id === moduleIdNum);
    } else {
      return lessons.find((l) => l.moduleKey === moduleId);
    }
  };

  // Get module display name with number (without "Module" prefix)
  const getModuleDisplayName = (moduleId) => {
    const lesson = findLessonByModuleId(moduleId);
    if (lesson && lesson.title) {
      // Remove "Module " prefix if it exists
      return lesson.title.replace(/^Module\s+/, '');
    }
    return `${moduleId}`;
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    if (onExportPDF) {
      onExportPDF(data);
    } else {
      // Lazy load jsPDF
      try {
        const { jsPDF } = await import('jspdf');
        await import('jspdf-autotable');
        generatePDF(data, jsPDF);
      } catch (err) {
        console.error('Failed to load PDF library:', err);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };

  // Generate PDF
  const generatePDF = (reportData, jsPDF) => {
    const doc = new jsPDF();
    const { profile, heroStats, progress } = reportData;

    const studentName = profile.first_name
      ? `${profile.first_name} ${profile.last_name || ''}`.trim()
      : profile.preferred_name || profile.email;

    // Title
    doc.setFontSize(20);
    doc.text('Progress Report Card', 105, 20, { align: 'center' });

    // Student info
    doc.setFontSize(12);
    doc.text(`Student: ${studentName}`, 20, 35);
    doc.text(`Generated: ${formatDate(new Date().toISOString())}`, 20, 42);

    // Hero stats
    doc.setFontSize(14);
    doc.text('Summary', 20, 55);
    doc.setFontSize(10);
    doc.text(`Study Time: ${formatDuration(heroStats.totalStudyTime)}`, 20, 65);
    doc.text(`Streak: ${heroStats.streakDays} days`, 20, 72);
    doc.text(`Accuracy: ${heroStats.accuracy}%`, 20, 79);
    doc.text(`Words Learned: ${heroStats.wordsLearned}`, 20, 86);

    // Progress
    doc.setFontSize(14);
    doc.text('Progress', 20, 100);
    doc.setFontSize(10);
    doc.text(`Modules Completed: ${progress.completedModulesCount} / ${progress.totalModulesCount}`, 20, 110);
    doc.text(`Units Completed: ${progress.completedUnitsCount}`, 20, 117);

    // Save
    doc.save(`report-card-${studentName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="report-card">
        <div className="report-card-loading">
          <div className="loading-spinner"></div>
          <p>Loading report card...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="report-card">
        <div className="report-card-error">
          <p className="error-message">{error}</p>
          <button onClick={refetch} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data) {
    return (
      <div className="report-card">
        <div className="report-card-empty">
          <BookOpen size={48} />
          <p>No activity yet</p>
          <p className="empty-subtitle">Start learning to see your progress here!</p>
        </div>
      </div>
    );
  }

  const { profile, heroStats, progress, recentActivity, vocabulary, performance } = data;

  const studentName = profile.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : profile.preferred_name || 'Student';

  return (
    <div className="report-card">
      {/* Header */}
      <div className="report-card-header">
        {onBack && (
          <button className="report-card-back-btn" onClick={onBack}>
            ← Back to Modules
          </button>
        )}
        <div className="header-content">
          <h1 className="report-title">
            {isAdminView ? `${studentName}'s Report Card` : 'Your Report Card'}
          </h1>
          <div className="header-actions">
            {/* Time Range Selector */}
            <div className="time-range-selector">
              <button
                className={timeRange === 'all' ? 'active' : ''}
                onClick={() => setTimeRange('all')}
              >
                All Time
              </button>
              <button
                className={timeRange === '7days' ? 'active' : ''}
                onClick={() => setTimeRange('7days')}
              >
                Last 7 Days
              </button>
              <button
                className={timeRange === '30days' ? 'active' : ''}
                onClick={() => setTimeRange('30days')}
              >
                Last 30 Days
              </button>
              <button
                className={timeRange === '90days' ? 'active' : ''}
                onClick={() => setTimeRange('90days')}
              >
                Last 90 Days
              </button>
            </div>

            {/* PDF Export Button (desktop only) */}
            <button
              className="export-pdf-button desktop-only"
              onClick={handleExportPDF}
              aria-label="Download report card as PDF"
            >
              <Download size={18} />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="hero-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatDuration(heroStats.totalStudyTime)}</div>
            <div className="stat-label">Study Time</div>
          </div>
        </div>

        <div className={`stat-card ${heroStats.streakDays > 0 ? 'streak-active' : ''}`}>
          <div className="stat-icon">
            <Flame />
          </div>
          <div className="stat-content">
            <div className="stat-value">{heroStats.streakDays}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Target />
          </div>
          <div className="stat-content">
            <div className="stat-value">{heroStats.accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen />
          </div>
          <div className="stat-content">
            <div className="stat-value">{heroStats.wordsLearned}</div>
            <div className="stat-label">Words Learned</div>
          </div>
        </div>
      </div>

      {/* Tabbed Section */}
      <section className="report-section report-section-tabs">
        <div className="tabs-header">
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
          <button
            className={`tab-button ${activeTab === 'vocabulary' ? 'active' : ''}`}
            onClick={() => setActiveTab('vocabulary')}
          >
            <BookOpen size={18} />
            <span>Vocabulary</span>
          </button>
        </div>

        <div className="tabs-content">
          {/* Recent Activity Tab */}
          {activeTab === 'activity' && (
            <div className="tab-panel">
              {recentActivity.modules.length === 0 && recentActivity.exams.length === 0 ? (
                <p className="empty-message">No recent activity</p>
              ) : (
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
                            <td className="activity-module">{getModuleDisplayName(module.module_id)}</td>
                            <td className="activity-time">{formatDuration(module.time_spent_seconds || 0)}</td>
                            <td className="activity-date">{formatRelativeTime(module.completed_at)}</td>
                            <td className="activity-score">
                              {module.exam_score !== null ? `${module.exam_score}%` : '—'}
                            </td>
                          </tr>
                        ))}
                        {(showAllActivity ? recentActivity.exams : recentActivity.exams.slice(0, 20)).map(exam => (
                          <tr key={exam.id} className="activity-row">
                            <td className="activity-module">{exam.exam_type}</td>
                            <td className="activity-time">—</td>
                            <td className="activity-date">{formatRelativeTime(exam.completed_at)}</td>
                            <td className="activity-score">{exam.score_percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {(recentActivity.modules.length > 20 || recentActivity.exams.length > 20) && (
                    <div className="activity-show-more">
                      <button
                        className="show-more-button"
                        onClick={() => setShowAllActivity(!showAllActivity)}
                      >
                        {showAllActivity
                          ? `Show less (showing ${recentActivity.modules.length + recentActivity.exams.length} items)`
                          : `Show all (${recentActivity.modules.length + recentActivity.exams.length} items)`
                        }
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <div className="chart-header">
                <h3 className="chart-title">Time & Progress by Unit</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: '#3b82f6' }}></div>
                    <span>Study Time</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: '#10b981' }}></div>
                    <span>Completion</span>
                  </div>
                </div>
              </div>

              <div className="unit-chart">
                {(() => {
                  const maxTime = Math.max(...progress.unitProgress.map(u => u.studyTime || 0), 1);

                  return progress.unitProgress.map(unit => (
                    <div key={unit.id} className="chart-column">
                      <div className="chart-bars">
                        <div
                          className="chart-bar time-bar"
                          style={{ height: `${((unit.studyTime || 0) / maxTime) * 100}%` }}
                          title={`${formatDuration(unit.studyTime || 0)}`}
                        >
                          <span className="bar-value">{formatDuration(unit.studyTime || 0)}</span>
                        </div>
                        <div
                          className="chart-bar completion-bar"
                          style={{ height: `${unit.percentage}%` }}
                          title={`${unit.percentage}% complete`}
                        >
                          <span className="bar-value">{unit.percentage}%</span>
                        </div>
                      </div>
                      <div className="chart-label">
                        <span className="chart-icon">{unit.icon}</span>
                        <span className="chart-unit-title">{unit.title}</span>
                        <span className="chart-modules">{unit.completed}/{unit.total}</span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Vocabulary Tab */}
          {activeTab === 'vocabulary' && (
            <div className="tab-panel">
              {Object.keys(vocabulary.byUnit).length === 0 ? (
                <p className="empty-message">No vocabulary learned yet</p>
              ) : (
                <div className="vocabulary-by-unit">
                  {Object.entries(vocabulary.byUnit).map(([unitId, words]) => {
                    const isExpanded = expandedUnits.has(unitId);
                    const displayWords = isExpanded ? words : words.slice(0, 20);
                    const hasMore = words.length > 20;

                    return (
                      <div key={unitId} className="unit-vocabulary">
                        <h3 className="unit-vocabulary-title">
                          {unitId.replace('unit', 'Unit ')} ({words.length} words)
                        </h3>
                        <div className="vocabulary-words">
                          {displayWords.map((word, idx) => (
                            <span key={idx} className="vocabulary-word">{word}</span>
                          ))}
                          {hasMore && (
                            <button
                              className="vocabulary-more"
                              onClick={() => {
                                const newExpanded = new Set(expandedUnits);
                                if (isExpanded) {
                                  newExpanded.delete(unitId);
                                } else {
                                  newExpanded.add(unitId);
                                }
                                setExpandedUnits(newExpanded);
                              }}
                            >
                              {isExpanded ? 'Show less' : `+${words.length - 20} more`}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Performance Section */}
      <section className="report-section">
        <button
          className="section-header"
          onClick={() => setPerformanceExpanded(!performanceExpanded)}
          aria-expanded={performanceExpanded}
        >
          <div className="section-title">
            <Award size={20} />
            <h2>Strengths & Areas to Improve</h2>
          </div>
          <div className="section-summary">
            {performance.strengths.length} strong units
          </div>
          <ChevronDown
            size={20}
            className={`chevron ${performanceExpanded ? 'expanded' : ''}`}
          />
        </button>

        {performanceExpanded && (
          <div className="section-content">
            {performance.strengths.length > 0 && (
              <>
                <h3 className="subsection-title strengths-title">Strengths (≥85% accuracy)</h3>
                <div className="performance-list">
                  {performance.strengths.map(unit => (
                    <div key={unit.unitId} className="performance-item strength">
                      <span className="performance-icon">{unit.icon}</span>
                      <span className="performance-title">{unit.title}</span>
                      <span className="performance-accuracy">{unit.accuracy}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {performance.weaknesses.length > 0 && (
              <>
                <h3 className="subsection-title weaknesses-title">Areas to Improve (&lt;70% accuracy)</h3>
                <div className="performance-list">
                  {performance.weaknesses.map(unit => (
                    <div key={unit.unitId} className="performance-item weakness">
                      <span className="performance-icon">{unit.icon}</span>
                      <span className="performance-title">{unit.title}</span>
                      <span className="performance-accuracy">{unit.accuracy}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {performance.strengths.length === 0 && performance.weaknesses.length === 0 && (
              <p className="empty-message">Complete more modules to see performance insights</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ReportCard;

