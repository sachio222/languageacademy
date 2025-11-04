import { useState, useMemo } from 'react';
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
  X
} from 'lucide-react';
import { useAllStudentsData } from '../hooks/useAllStudentsData';
import { useReportCardData } from '../hooks/useReportCardData';
import { calculateCommunicationInsights, calculateBatchInsights } from '../utils/communicationInsights';
import ReportCard from './ReportCard';
import '../styles/ReportCardAdmin.css';

function ReportCardAdmin() {
  const { students, loading, error, pagination, nextPage, prevPage, goToPage } = useAllStudentsData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInsights, setShowInsights] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let filtered = students;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(student => {
        const name = `${student.first_name || ''} ${student.last_name || ''}`.toLowerCase();
        const email = (student.email || '').toLowerCase();
        return name.includes(query) || email.includes(query);
      });
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => student.stats.engagementStatus === filterStatus);
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'name':
          aVal = (a.first_name || a.preferred_name || '').toLowerCase();
          bVal = (b.first_name || b.preferred_name || '').toLowerCase();
          break;
        case 'email':
          aVal = (a.email || '').toLowerCase();
          bVal = (b.email || '').toLowerCase();
          break;
        case 'streak':
          aVal = a.streak_days || 0;
          bVal = b.streak_days || 0;
          break;
        case 'modules':
          aVal = a.stats.modulesCompleted || 0;
          bVal = b.stats.modulesCompleted || 0;
          break;
        case 'accuracy':
          aVal = a.stats.accuracy || 0;
          bVal = b.stats.accuracy || 0;
          break;
        case 'total_time':
          aVal = a.total_study_time_seconds || 0;
          bVal = b.total_study_time_seconds || 0;
          break;
        case 'last_active':
          aVal = a.last_active_at ? new Date(a.last_active_at).getTime() : 0;
          bVal = b.last_active_at ? new Date(b.last_active_at).getTime() : 0;
          break;
        case 'status':
          // Sort by engagement status priority: active > recent > at-risk > inactive
          const statusOrder = { active: 0, recent: 1, 'at-risk': 2, inactive: 3 };
          aVal = statusOrder[a.stats.engagementStatus] ?? 4;
          bVal = statusOrder[b.stats.engagementStatus] ?? 4;
          break;
        default:
          aVal = a.created_at ? new Date(a.created_at).getTime() : 0;
          bVal = b.created_at ? new Date(b.created_at).getTime() : 0;
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  }, [students, searchQuery, sortField, sortDirection, filterStatus]);
  
  // Calculate overview stats
  const overviewStats = useMemo(() => {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        avgCompletionRate: 0,
        avgStudyTime: 0,
        totalModules: 0,
        active: 0,
        atRisk: 0,
        inactive: 0
      };
    }
    
    const totalModules = students.reduce((sum, s) => sum + (s.stats.modulesCompleted || 0), 0);
    const totalStudyTime = students.reduce((sum, s) => sum + (s.total_study_time_seconds || 0), 0);
    
    const engagementCounts = students.reduce((acc, student) => {
      const status = student.stats.engagementStatus;
      if (status === 'active' || status === 'recent') acc.active++;
      else if (status === 'at-risk') acc.atRisk++;
      else acc.inactive++;
      return acc;
    }, { active: 0, atRisk: 0, inactive: 0 });
    
    return {
      totalStudents: students.length,
      avgCompletionRate: Math.round((totalModules / students.length) * 100) / 100,
      avgStudyTime: Math.round(totalStudyTime / students.length),
      totalModules,
      ...engagementCounts
    };
  }, [students]);
  
  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };
  
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
  
  // Copy email list to clipboard
  const copyEmailList = (studentsList) => {
    const emails = studentsList
      .filter(s => s.email)
      .map(s => s.email)
      .join(', ');
    
    navigator.clipboard.writeText(emails);
    alert(`Copied ${studentsList.length} email addresses to clipboard`);
  };
  
  // Export to CSV
  const exportToCSV = (studentsList) => {
    const headers = ['Name', 'Email', 'Streak', 'Modules', 'Accuracy', 'Total Time', 'Status', 'Last Active'];
    const rows = studentsList.map(s => [
      `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.preferred_name || '',
      s.email || '',
      s.streak_days || 0,
      s.stats.modulesCompleted || 0,
      `${s.stats.accuracy || 0}%`,
      formatDuration(s.total_study_time_seconds || 0),
      s.stats.engagementStatus,
      formatRelativeTime(s.last_active_at)
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };
  
  if (loading && students.length === 0) {
    return (
      <div className="report-card-admin">
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading student data...</p>
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
  
  return (
    <div className="report-card-admin">
      <div className="admin-header">
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
            <div className="overview-value">{overviewStats.avgCompletionRate}</div>
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
          className={`alert-badge active ${filterStatus === 'active' || filterStatus === 'recent' ? 'selected' : ''}`}
          onClick={() => setFilterStatus(filterStatus === 'active' ? 'all' : 'active')}
        >
          <span className="alert-dot active"></span>
          <span>{overviewStats.active} Active</span>
        </button>
        <button
          className={`alert-badge at-risk ${filterStatus === 'at-risk' ? 'selected' : ''}`}
          onClick={() => setFilterStatus(filterStatus === 'at-risk' ? 'all' : 'at-risk')}
        >
          <span className="alert-dot at-risk"></span>
          <span>{overviewStats.atRisk} At Risk</span>
        </button>
        <button
          className={`alert-badge inactive ${filterStatus === 'inactive' ? 'selected' : ''}`}
          onClick={() => setFilterStatus(filterStatus === 'inactive' ? 'all' : 'inactive')}
        >
          <span className="alert-dot inactive"></span>
          <span>{overviewStats.inactive} Inactive</span>
        </button>
        {filterStatus !== 'all' && (
          <button className="clear-filter" onClick={() => setFilterStatus('all')}>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search students"
          />
        </div>
        
        <div className="table-actions">
          <button
            className="action-button"
            onClick={() => copyEmailList(filteredStudents)}
            disabled={filteredStudents.length === 0}
          >
            <Copy size={18} />
            <span>Copy Emails</span>
          </button>
          <button
            className="action-button"
            onClick={() => exportToCSV(filteredStudents)}
            disabled={filteredStudents.length === 0}
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button
            className="action-button primary"
            onClick={() => {
              const newValue = !showInsights;
              setShowInsights(newValue);
              // Scroll to panel when opening
              if (newValue) {
                setTimeout(() => {
                  const panel = document.querySelector('.insights-panel');
                  if (panel) {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }
            }}
          >
            <Mail size={18} />
            <span>Communication Insights</span>
          </button>
        </div>
      </div>
      
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
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-row">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'No students match your filters'
                    : 'No students enrolled yet'}
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => (
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
                  {students.filter(s => s?.stats?.engagementStatus === 'inactive').length} students
                </p>
                <button
                  className="insight-action"
                  onClick={() => {
                    setFilterStatus('inactive');
                    setShowInsights(false);
                  }}
                >
                  View Students
                </button>
              </div>
              
              <div className="insight-card">
                <h3>At Risk (3-7 days)</h3>
                <p className="insight-count">
                  {students.filter(s => s?.stats?.engagementStatus === 'at-risk').length} students
                </p>
                <button
                  className="insight-action"
                  onClick={() => {
                    setFilterStatus('at-risk');
                    setShowInsights(false);
                  }}
                >
                  View Students
                </button>
              </div>
              
              <div className="insight-card">
                <h3>Active & Engaged</h3>
                <p className="insight-count">
                  {students.filter(s => s?.stats?.engagementStatus === 'active' || s?.stats?.engagementStatus === 'recent').length} students
                </p>
                <button
                  className="insight-action"
                  onClick={() => {
                    setFilterStatus('active');
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

