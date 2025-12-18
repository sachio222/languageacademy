import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Mail,
  Copy,
  Download,
  X,
  Loader2
} from 'lucide-react';
import { useAllStudentsData } from '../hooks/useAllStudentsData';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import { useToast } from '../hooks/useToast';
import Toast from './Toast';
import ReportCard from './ReportCardEnhanced';
import '../styles/ReportCardAdmin.css';

function ReportCardAdmin({ onBack = null }) {
  const {
    students,
    loading,
    error,
    overviewStats,
    filters,
    pagination,
    applyFilters,
    nextPage,
    prevPage,
    goToPage,
    fetchAllMatching
  } = useAllStudentsData();

  const supabaseClient = useSupabaseClient();
  const { toasts, showToast, hideToast } = useToast();

  // Local state for search input (debounced)
  const [searchInput, setSearchInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInsights, setShowInsights] = useState(false);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  const searchTimeoutRef = useRef(null);

  // Debounced search - apply filters after user stops typing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      applyFilters({
        ...filters,
        searchQuery: searchInput
      });
    }, 400); // 400ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchInput]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedStudent) {
        setSelectedStudent(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedStudent]);

  // Handle filter status change
  const handleStatusFilter = useCallback((status) => {
    const newStatus = filters.statusFilter === status ? 'all' : status;
    applyFilters({
      ...filters,
      statusFilter: newStatus
    });
  }, [filters, applyFilters]);

  // Handle sort
  const handleSort = useCallback((field) => {
    const newDirection = filters.sortField === field && filters.sortDirection === 'desc' ? 'asc' : 'desc';
    applyFilters({
      ...filters,
      sortField: field,
      sortDirection: newDirection
    });
  }, [filters, applyFilters]);

  // Get sort icon
  const getSortIcon = useCallback((field) => {
    if (filters.sortField !== field) return null;
    return filters.sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  }, [filters.sortField, filters.sortDirection]);

  // Format time
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    }
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Never';

    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', class: 'status-active' },
      recent: { label: 'Recent', class: 'status-active' },
      'at-risk': { label: 'At Risk', class: 'status-at-risk' },
      inactive: { label: 'Inactive', class: 'status-inactive' }
    };

    const badge = badges[status] || badges.inactive;
    return <span className={`status-badge ${badge.class}`}>{badge.label}</span>;
  };

  // Copy email list to clipboard (ALL matching students, not just current page)
  const copyEmailList = async () => {
    try {
      setBulkActionLoading(true);
      const allStudents = await fetchAllMatching();

      const emails = allStudents
        .filter(s => s.email)
        .map(s => s.email)
        .join(', ');

      await navigator.clipboard.writeText(emails);
      showToast(`Copied ${allStudents.length} email addresses to clipboard`, 'success');
    } catch (err) {
      showToast('Failed to copy emails', 'error');
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Escape CSV field (handles commas, quotes, newlines)
  const escapeCsvField = (field) => {
    if (field == null) return '';
    const str = String(field);
    // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Export to CSV (ALL matching students, not just current page)
  const exportToCSV = async () => {
    try {
      setBulkActionLoading(true);
      const allStudents = await fetchAllMatching();

      if (allStudents.length === 0) {
        showToast('No students to export', 'info');
        return;
      }

      // Fetch stats for all students (batched)
      const userIds = allStudents.map(s => s.id);

      // Get modules and exercises for all students
      const [modulesResult, exercisesResult] = await Promise.all([
        supabaseClient.from('module_progress')
          .select('user_id, completed_at')
          .in('user_id', userIds)
          .not('completed_at', 'is', null),
        supabaseClient.from('exercise_completions')
          .select('user_id, is_correct')
          .in('user_id', userIds)
      ]);

      // Group by user
      const modulesByUser = {};
      const exercisesByUser = {};

      (modulesResult.data || []).forEach(m => {
        if (!modulesByUser[m.user_id]) modulesByUser[m.user_id] = [];
        modulesByUser[m.user_id].push(m);
      });

      (exercisesResult.data || []).forEach(e => {
        if (!exercisesByUser[e.user_id]) exercisesByUser[e.user_id] = [];
        exercisesByUser[e.user_id].push(e);
      });

      // Build CSV
      const headers = ['Name', 'Email', 'Streak', 'Modules', 'Accuracy', 'Total Time', 'Status', 'Last Active'];
      const rows = allStudents.map(s => {
        const modules = modulesByUser[s.id] || [];
        const exercises = exercisesByUser[s.id] || [];
        const correct = exercises.filter(e => e.is_correct).length;
        const total = exercises.length;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

        const calculateEngagementStatus = (lastActiveAt) => {
          if (!lastActiveAt) return 'inactive';
          const hoursSince = (new Date() - new Date(lastActiveAt)) / (1000 * 60 * 60);
          if (hoursSince < 24) return 'active';
          if (hoursSince < 24 * 3) return 'recent';
          if (hoursSince < 24 * 7) return 'at-risk';
          return 'inactive';
        };

        return [
          escapeCsvField(`${s.first_name || ''} ${s.last_name || ''}`.trim() || s.preferred_name || 'N/A'),
          escapeCsvField(s.email || ''),
          s.streak_days || 0,
          modules.length,
          `${accuracy}%`,
          formatDuration(s.total_study_time_seconds || 0),
          calculateEngagementStatus(s.last_active_at),
          formatRelativeTime(s.last_active_at)
        ];
      });

      const csv = [headers, ...rows]
        .map(row => row.map(field => escapeCsvField(field)).join(','))
        .join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      showToast(`Exported ${allStudents.length} students to CSV`, 'success');
    } catch (err) {
      showToast('Failed to export CSV', 'error');
    } finally {
      setBulkActionLoading(false);
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="report-card-admin">
        <div className="admin-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading student data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-card-admin">
        <div className="admin-error">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  const hasActiveFilters = filters.searchQuery || filters.statusFilter !== 'all';
  const showingCount = students.length;
  const totalCount = pagination.total;

  return (
    <div className="report-card-admin">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>

      <div className="admin-header">
        {onBack && (
          <button className="report-card-back-btn" onClick={onBack}>
            ← Back to Modules
          </button>
        )}
        <h1>Student Report Cards</h1>
        <p className="admin-subtitle">Monitor progress and engagement across all students</p>
      </div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <div className="overview-card">
          <div className="overview-icon">
            <Users />
          </div>
          <div className="overview-content">
            <div className="overview-value">{overviewStats.totalStudents}</div>
            <div className="overview-label">Total Students</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <BookOpen />
          </div>
          <div className="overview-content">
            <div className="overview-value">{overviewStats.avgModulesPerStudent}</div>
            <div className="overview-label">Avg Modules/Student</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <Clock />
          </div>
          <div className="overview-content">
            <div className="overview-value">{formatDuration(overviewStats.avgStudyTime)}</div>
            <div className="overview-label">Avg Study Time</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon">
            <TrendingUp />
          </div>
          <div className="overview-content">
            <div className="overview-value">{overviewStats.totalModules}</div>
            <div className="overview-label">Total Modules Completed</div>
          </div>
        </div>
      </div>

      {/* Engagement Alerts */}
      <div className="engagement-alerts">
        <button
          className={`alert-badge active ${filters.statusFilter === 'active' ? 'selected' : ''}`}
          onClick={() => handleStatusFilter('active')}
        >
          <span className="alert-dot active"></span>
          <span>{overviewStats.activeCount} Active</span>
        </button>
        <button
          className={`alert-badge at-risk ${filters.statusFilter === 'at-risk' ? 'selected' : ''}`}
          onClick={() => handleStatusFilter('at-risk')}
        >
          <span className="alert-dot at-risk"></span>
          <span>{overviewStats.atRiskCount} At Risk</span>
        </button>
        <button
          className={`alert-badge inactive ${filters.statusFilter === 'inactive' ? 'selected' : ''}`}
          onClick={() => handleStatusFilter('inactive')}
        >
          <span className="alert-dot inactive"></span>
          <span>{overviewStats.inactiveCount} Inactive</span>
        </button>
        {filters.statusFilter !== 'all' && (
          <button className="clear-filter" onClick={() => handleStatusFilter('all')}>
            Clear Filter
          </button>
        )}
      </div>

      {/* Search and Actions */}
      <div className="table-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search students"
          />
        </div>

        <div className="table-actions">
          <button
            className="action-button"
            onClick={copyEmailList}
            disabled={bulkActionLoading || totalCount === 0}
          >
            {bulkActionLoading ? <Loader2 size={18} className="spinning" /> : <Copy size={18} />}
            <span>Copy Emails {hasActiveFilters && '(Filtered)'}</span>
          </button>
          <button
            className="action-button"
            onClick={exportToCSV}
            disabled={bulkActionLoading || totalCount === 0}
          >
            {bulkActionLoading ? <Loader2 size={18} className="spinning" /> : <Download size={18} />}
            <span>Export CSV {hasActiveFilters && '(Filtered)'}</span>
          </button>
          <button
            className="action-button primary"
            onClick={() => setShowInsights(!showInsights)}
          >
            <Mail size={18} />
            <span>Communication Insights</span>
          </button>
        </div>
      </div>

      {/* Results count */}
      {hasActiveFilters && (
        <div className="results-count">
          Showing {showingCount} of {totalCount} students
          {filters.searchQuery && ` matching "${filters.searchQuery}"`}
        </div>
      )}

      {/* Student Table */}
      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="sortable">
                <span>Name</span>
                {getSortIcon('name')}
              </th>
              <th onClick={() => handleSort('email')} className="sortable">
                <span>Email</span>
                {getSortIcon('email')}
              </th>
              <th onClick={() => handleSort('streak')} className="sortable">
                <span>Streak</span>
                {getSortIcon('streak')}
              </th>
              <th onClick={() => handleSort('modules')} className="sortable">
                <span>Modules</span>
                {getSortIcon('modules')}
              </th>
              <th onClick={() => handleSort('accuracy')} className="sortable">
                <span>Accuracy</span>
                {getSortIcon('accuracy')}
              </th>
              <th onClick={() => handleSort('total_time')} className="sortable">
                <span>Total Time</span>
                {getSortIcon('total_time')}
              </th>
              <th onClick={() => handleSort('last_active')} className="sortable">
                <span>Last Active</span>
                {getSortIcon('last_active')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                <span>Status</span>
                {getSortIcon('status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-row">
                  {hasActiveFilters
                    ? 'No students match your filters'
                    : 'No students enrolled yet'}
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="student-row"
                >
                  <td className="student-name">
                    {student.first_name || student.preferred_name || 'N/A'}
                    {student.last_name && ` ${student.last_name}`}
                  </td>
                  <td className="student-email">{student.email || 'N/A'}</td>
                  <td>{student.streak_days || 0}</td>
                  <td>{student.stats.modulesCompleted || 0}</td>
                  <td>{student.stats.accuracy || 0}%</td>
                  <td>{formatDuration(student.total_study_time_seconds || 0)}</td>
                  <td>{formatRelativeTime(student.last_active_at)}</td>
                  <td>{getStatusBadge(student.stats.engagementStatus)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={!pagination.hasPrev}
            className="pagination-button"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>

          <div className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
            <span className="pagination-count">({pagination.total} students)</span>
          </div>

          <button
            onClick={nextPage}
            disabled={!pagination.hasNext}
            className="pagination-button"
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Communication Insights Panel */}
      {showInsights && (
        <div className="insights-panel">
          <div className="insights-header">
            <h2>Communication Insights</h2>
            <button
              className="close-insights"
              onClick={() => setShowInsights(false)}
              aria-label="Close insights panel"
            >
              <X size={20} />
            </button>
          </div>
          <div className="insights-content">
            <p className="insights-description">
              Identify students who need communication based on their engagement and progress.
            </p>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Re-engagement Needed</h3>
                <p className="insight-count">
                  {overviewStats.inactiveCount} students
                </p>
                <button
                  className="insight-action"
                  onClick={() => {
                    handleStatusFilter('inactive');
                    setShowInsights(false);
                  }}
                >
                  View Students
                </button>
              </div>

              <div className="insight-card">
                <h3>At Risk (3-7 days)</h3>
                <p className="insight-count">
                  {overviewStats.atRiskCount} students
                </p>
                <button
                  className="insight-action"
                  onClick={() => {
                    handleStatusFilter('at-risk');
                    setShowInsights(false);
                  }}
                >
                  View Students
                </button>
              </div>

              <div className="insight-card">
                <h3>Active & Engaged</h3>
                <p className="insight-count">
                  {overviewStats.activeCount} students
                </p>
                <button
                  className="insight-action"
                  onClick={() => {
                    handleStatusFilter('active');
                    setShowInsights(false);
                  }}
                >
                  View Students
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="student-modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="student-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div className="modal-title">
                <h2>
                  {selectedStudent.first_name || selectedStudent.preferred_name || 'Student'}
                  {selectedStudent.last_name && ` ${selectedStudent.last_name}`}
                </h2>
                <p className="modal-subtitle">{selectedStudent.email}</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-content">
              <ReportCard userId={selectedStudent.id} isAdminView={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportCardAdmin;

