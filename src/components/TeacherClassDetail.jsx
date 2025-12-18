/**
 * TeacherClassDetail - Single class roster view
 * Reuses admin dashboard UI, filtered to one class
 */

import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, Users, Copy, Check, HelpCircle } from 'lucide-react';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import { useToast } from '../hooks/useToast';
import Toast from './Toast';
import TeacherWelcomeModal from './TeacherWelcomeModal';
import '../styles/TeacherClassDetail.css';

function TeacherClassDetail({ classData, onBack }) {
  const supabaseClient = useSupabaseClient();
  const { toasts, showToast, hideToast } = useToast();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Fetch students for this class
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabaseClient
          .from('teacher_class_dashboard')
          .select('*')
          .eq('class_id', classData.id)
          .order('last_name');

        if (error) throw error;

        setStudents(data || []);
      } catch (err) {
        showToast('Failed to load students', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classData.id, supabaseClient, showToast]);

  const copyJoinCode = async () => {
    await navigator.clipboard.writeText(classData.join_code);
    setCopiedCode(true);
    showToast('Join code copied to clipboard', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0m';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    }
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

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

  const getEngagementBadge = (status) => {
    const badges = {
      active: { label: 'Active', class: 'engagement-active' },
      recent: { label: 'Recent', class: 'engagement-active' },
      'at-risk': { label: 'At Risk', class: 'engagement-at-risk' },
      inactive: { label: 'Inactive', class: 'engagement-inactive' }
    };

    const badge = badges[status] || badges.inactive;
    return <span className={`engagement-badge ${badge.class}`}>{badge.label}</span>;
  };

  // Calculate class stats
  const classStats = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s =>
      s.engagement_status === 'active' || s.engagement_status === 'recent'
    ).length;
    const avgModules = totalStudents > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.modules_completed || 0), 0) / totalStudents * 10) / 10
      : 0;
    const avgAccuracy = totalStudents > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.accuracy || 0), 0) / totalStudents)
      : 0;

    return { totalStudents, activeStudents, avgModules, avgAccuracy };
  }, [students]);

  return (
    <div className="class-detail">
      {/* Toast notifications */}
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

      {/* Welcome modal */}
      <TeacherWelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
      />

      {/* Header */}
      <div className="class-detail-header">
        <button className="class-back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
          Back to Classes
        </button>

        <div className="class-title-section">
          <h1>{classData.name}</h1>
          <div className="class-meta">
            {classData.term && <span className="class-meta-tag">{classData.term}</span>}
            {classData.period && <span className="class-meta-tag">{classData.period}</span>}
          </div>
        </div>

        <div className="class-actions">
          <button
            className="help-btn-small"
            onClick={() => setShowWelcome(true)}
            title="How it works"
          >
            <HelpCircle size={18} />
          </button>

          <button className="join-code-btn" onClick={copyJoinCode}>
            {copiedCode ? <Check size={18} /> : <Copy size={18} />}
            <span>{copiedCode ? 'Copied!' : classData.join_code}</span>
          </button>
        </div>
      </div>

      {/* Class stats */}
      <div className="class-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <div className="stat-value">{classStats.totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value">{classStats.activeStudents}</div>
            <div className="stat-label">Active Students</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value">{classStats.avgModules}</div>
            <div className="stat-label">Avg Modules</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value">{classStats.avgAccuracy}%</div>
            <div className="stat-label">Avg Accuracy</div>
          </div>
        </div>
      </div>

      {/* Student roster */}
      <div className="roster-section">
        <h3>Class Roster</h3>

        {loading ? (
          <div className="roster-loading">
            <p>Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="roster-empty">
            <Users size={48} />
            <p>No students enrolled yet</p>
            <p className="roster-empty-hint">Share join code <strong>{classData.join_code}</strong> with students</p>
          </div>
        ) : (
          <div className="roster-table-container">
            <table className="roster-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Modules</th>
                  <th>Accuracy</th>
                  <th>Study Time</th>
                  <th>Last Active</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.student_id} className="roster-row">
                    <td className="student-name">
                      {student.first_name || student.preferred_name || 'Student'} {student.last_name || ''}
                    </td>
                    <td>{student.modules_completed || 0}</td>
                    <td>{student.accuracy || 0}%</td>
                    <td>{formatDuration(student.total_study_time_seconds || 0)}</td>
                    <td>{formatRelativeTime(student.last_active_at)}</td>
                    <td>{getEngagementBadge(student.engagement_status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherClassDetail;
