/**
 * TeacherClasses - Class management for teachers
 * Optional enterprise feature - clean, minimal design
 */

import { useState } from 'react';
import { Plus, Users, ChevronRight, Copy, Check } from 'lucide-react';
import { useClasses } from '../hooks/useClasses';
import { useToast } from '../hooks/useToast';
import Toast from './Toast';
import '../styles/TeacherClasses.css';

function TeacherClasses({ onSelectClass }) {
  const { classes, loading, createClass } = useClasses();
  const { toasts, showToast, hideToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCreateClass = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const classData = {
      name: formData.get('name'),
      term: formData.get('term') || null,
      subject: formData.get('subject') || null,
      period: formData.get('period') || null
    };

    try {
      setCreating(true);
      await createClass(classData);
      setShowCreateModal(false);
      showToast('Class created successfully', 'success');
      e.target.reset();
    } catch (err) {
      showToast(err.message || 'Failed to create class', 'error');
    } finally {
      setCreating(false);
    }
  };

  const copyJoinCode = async (code) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Join code copied', 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="teacher-classes">
        <div className="teacher-classes-loading">
          <p>Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-classes">
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

      {/* Header */}
      <div className="teacher-classes-header">
        <div>
          <h1>My Classes</h1>
          <p className="teacher-classes-subtitle">
            {classes.length === 0
              ? 'Create your first class to get started'
              : `${classes.length} ${classes.length === 1 ? 'class' : 'classes'}`
            }
          </p>
        </div>

        <button
          className="create-class-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          <span>New Class</span>
        </button>
      </div>

      {/* Classes list */}
      {classes.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <h3>No classes yet</h3>
          <p>Create a class to start managing student progress</p>
          <button
            className="empty-state-btn"
            onClick={() => setShowCreateModal(true)}
          >
            Create Your First Class
          </button>
        </div>
      ) : (
        <div className="classes-grid">
          {classes.map(classItem => (
            <div
              key={classItem.id}
              className="class-card"
              onClick={() => onSelectClass(classItem)}
            >
              <div className="class-card-header">
                <h3>{classItem.name}</h3>
                <ChevronRight size={20} className="class-card-arrow" />
              </div>

              <div className="class-card-meta">
                {classItem.term && <span className="class-meta-tag">{classItem.term}</span>}
                {classItem.period && <span className="class-meta-tag">{classItem.period}</span>}
              </div>

              <div className="class-card-stats">
                <div className="class-stat">
                  <Users size={16} />
                  <span>{classItem.student_count} {classItem.student_count === 1 ? 'student' : 'students'}</span>
                </div>
              </div>

              <div className="class-card-footer">
                <button
                  className="copy-code-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyJoinCode(classItem.join_code);
                  }}
                >
                  {copiedCode === classItem.join_code ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Code: {classItem.join_code}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create class modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Class</h2>
            </div>

            <form onSubmit={handleCreateClass} className="modal-content">
              <div className="form-group">
                <label htmlFor="name">Class Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. French 1 - Period 2"
                  required
                  autoFocus
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="term">Term</label>
                  <input
                    type="text"
                    id="term"
                    name="term"
                    placeholder="e.g. Fall 2024"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="period">Period</label>
                  <input
                    type="text"
                    id="period"
                    name="period"
                    placeholder="e.g. Period 2"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g. French"
                  defaultValue="French"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-submit"
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherClasses;
