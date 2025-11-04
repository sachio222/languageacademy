import { useState } from 'react';
import { ChevronDown, Flame, TrendingUp, BookOpen, Clock, Award, Target, Download } from 'lucide-react';
import { useReportCardData } from '../hooks/useReportCardData';
import { calculateCommunicationInsights } from '../utils/communicationInsights';
import '../styles/ReportCard.css';

/**
 * Shared ReportCard Component
 * Displays comprehensive progress report for any student
 * 
 * @param {string} userId - Student user ID (if null, shows current user)
 * @param {function} onExportPDF - Optional callback for PDF export
 * @param {boolean} isAdminView - Whether this is admin viewing another student
 */
function ReportCard({ userId = null, onExportPDF = null, isAdminView = false }) {
  const [timeRange, setTimeRange] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    progress: false,
    activity: false,
    vocabulary: false,
    performance: false
  });
  
  const { data, loading, error, refetch } = useReportCardData(userId, {
    includeDetailedProgress: true,
    timeRange
  });
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
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
      
      {/* Progress Overview Section */}
      <section className="report-section">
        <button
          className="section-header"
          onClick={() => toggleSection('progress')}
          aria-expanded={expandedSections.progress}
        >
          <div className="section-title">
            <TrendingUp size={20} />
            <h2>Progress Overview</h2>
          </div>
          <div className="section-summary">
            {progress.completedModulesCount} / {progress.totalModulesCount} modules
          </div>
          <ChevronDown
            size={20}
            className={`chevron ${expandedSections.progress ? 'expanded' : ''}`}
          />
        </button>
        
        {expandedSections.progress && (
          <div className="section-content">
            <div className="progress-stats">
              <div className="progress-stat">
                <span className="stat-label">Modules Completed</span>
                <span className="stat-value">{progress.completedModulesCount} / {progress.totalModulesCount}</span>
              </div>
              <div className="progress-stat">
                <span className="stat-label">Units Completed</span>
                <span className="stat-value">{progress.completedUnitsCount}</span>
              </div>
            </div>
            
            <div className="unit-progress-list">
              {progress.unitProgress.map(unit => (
                <div key={unit.id} className="unit-progress-item">
                  <div className="unit-header">
                    <span className="unit-icon">{unit.icon}</span>
                    <span className="unit-title">{unit.title}</span>
                    <span className="unit-percentage">{unit.percentage}%</span>
                  </div>
                  <div className="unit-progress-bar">
                    <div
                      className="unit-progress-fill"
                      style={{ width: `${unit.percentage}%` }}
                    />
                  </div>
                  <div className="unit-details">
                    <span>{unit.completed} / {unit.total} modules</span>
                    {unit.examScore !== null && (
                      <span className="exam-score">Exam: {unit.examScore}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Recent Activity Section */}
      <section className="report-section">
        <button
          className="section-header"
          onClick={() => toggleSection('activity')}
          aria-expanded={expandedSections.activity}
        >
          <div className="section-title">
            <Clock size={20} />
            <h2>Recent Activity</h2>
          </div>
          <div className="section-summary">
            {recentActivity.modules.length} recent modules
          </div>
          <ChevronDown
            size={20}
            className={`chevron ${expandedSections.activity ? 'expanded' : ''}`}
          />
        </button>
        
        {expandedSections.activity && (
          <div className="section-content">
            {recentActivity.modules.length === 0 ? (
              <p className="empty-message">No recent activity</p>
            ) : (
              <div className="activity-list">
                {recentActivity.modules.map(module => (
                  <div key={module.id} className="activity-item">
                    <div className="activity-icon">✓</div>
                    <div className="activity-content">
                      <div className="activity-title">{module.module_id}</div>
                      <div className="activity-date">
                        {formatRelativeTime(module.completed_at)}
                      </div>
                    </div>
                    {module.exam_score !== null && (
                      <div className="activity-score">{module.exam_score}%</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {recentActivity.exams.length > 0 && (
              <>
                <h3 className="subsection-title">Recent Exams</h3>
                <div className="exam-list">
                  {recentActivity.exams.map(exam => (
                    <div key={exam.id} className="exam-item">
                      <div className="exam-type">{exam.exam_type}</div>
                      <div className="exam-score">{exam.score_percentage}%</div>
                      <div className="exam-date">{formatRelativeTime(exam.completed_at)}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>
      
      {/* Vocabulary Section */}
      <section className="report-section">
        <button
          className="section-header"
          onClick={() => toggleSection('vocabulary')}
          aria-expanded={expandedSections.vocabulary}
        >
          <div className="section-title">
            <BookOpen size={20} />
            <h2>Vocabulary</h2>
          </div>
          <div className="section-summary">
            {vocabulary.totalWords} words learned
          </div>
          <ChevronDown
            size={20}
            className={`chevron ${expandedSections.vocabulary ? 'expanded' : ''}`}
          />
        </button>
        
        {expandedSections.vocabulary && (
          <div className="section-content">
            {Object.keys(vocabulary.byUnit).length === 0 ? (
              <p className="empty-message">No vocabulary learned yet</p>
            ) : (
              <div className="vocabulary-by-unit">
                {Object.entries(vocabulary.byUnit).map(([unitId, words]) => (
                  <div key={unitId} className="unit-vocabulary">
                    <h3 className="unit-vocabulary-title">
                      {unitId.replace('unit', 'Unit ')} ({words.length} words)
                    </h3>
                    <div className="vocabulary-words">
                      {words.slice(0, 20).map((word, idx) => (
                        <span key={idx} className="vocabulary-word">{word}</span>
                      ))}
                      {words.length > 20 && (
                        <span className="vocabulary-more">+{words.length - 20} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* Performance Section */}
      <section className="report-section">
        <button
          className="section-header"
          onClick={() => toggleSection('performance')}
          aria-expanded={expandedSections.performance}
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
            className={`chevron ${expandedSections.performance ? 'expanded' : ''}`}
          />
        </button>
        
        {expandedSections.performance && (
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

