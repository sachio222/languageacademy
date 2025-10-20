import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import './FeedbackAdmin.css';

const FeedbackAdmin = ({ onFeedbackChange }) => {
  const { supabaseClient } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    if (!supabaseClient) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        // Always fetch all feedback for counts
        const { data: allData, error: allError } = await supabaseClient
          .from('feedback')
          .select('*')
          .order('created_at', { ascending: false });

        if (allError) throw allError;

        if (!cancelled) {
          setAllFeedback(allData || []);

          // Filter for display
          const filteredData = filter === 'all'
            ? allData
            : (allData || []).filter(f => f.status === filter);

          setFeedback(filteredData || []);
        }
      } catch (error) {
        if (!cancelled) console.error('Error fetching feedback:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [filter, supabaseClient]);

  const fetchFeedback = async () => {
    if (!supabaseClient) return;

    try {
      setLoading(true);

      // Always fetch all feedback for counts
      const { data: allData, error: allError } = await supabaseClient
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (allError) throw allError;

      setAllFeedback(allData || []);

      // Filter for display
      const filteredData = filter === 'all'
        ? allData
        : (allData || []).filter(f => f.status === filter);

      setFeedback(filteredData || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabaseClient
        .from('feedback')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Refresh the list
      fetchFeedback();

      // Refresh the badge count
      if (onFeedbackChange) {
        onFeedbackChange();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteFeedback = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this feedback?')) {
      return;
    }

    try {
      const { error } = await supabaseClient
        .from('feedback')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh the list
      fetchFeedback();

      // Refresh the badge count
      if (onFeedbackChange) {
        onFeedbackChange();
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'reviewed': return '#f59e0b';
      case 'resolved': return '#10b981';
      case 'dismissed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'New';
      case 'reviewed': return 'Reviewed';
      case 'resolved': return 'Resolved';
      case 'dismissed': return 'Dismissed';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="feedback-admin">
        <div className="loading">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="feedback-admin">
      <div className="feedback-admin-header">
        <h1>Feedback Admin</h1>
        <div className="feedback-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({allFeedback.length})
          </button>
          <button
            className={filter === 'new' ? 'active' : ''}
            onClick={() => setFilter('new')}
          >
            New ({allFeedback.filter(f => f.status === 'new').length})
          </button>
          <button
            className={filter === 'reviewed' ? 'active' : ''}
            onClick={() => setFilter('reviewed')}
          >
            Reviewed ({allFeedback.filter(f => f.status === 'reviewed').length})
          </button>
          <button
            className={filter === 'resolved' ? 'active' : ''}
            onClick={() => setFilter('resolved')}
          >
            Resolved ({allFeedback.filter(f => f.status === 'resolved').length})
          </button>
          <button
            className={filter === 'dismissed' ? 'active' : ''}
            onClick={() => setFilter('dismissed')}
          >
            Dismissed ({allFeedback.filter(f => f.status === 'dismissed').length})
          </button>
        </div>
      </div>

      <div className="feedback-list">
        {feedback.length === 0 ? (
          <div className="empty-state">
            <p>No feedback found for the selected filter.</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div
              key={item.id}
              className={`feedback-item ${selectedFeedback?.id === item.id ? 'selected' : ''}`}
              onClick={() => setSelectedFeedback(item)}
            >
              <div className="feedback-item-header">
                <div className="feedback-meta">
                  <span className="feedback-category">{item.category}</span>
                  <span
                    className="feedback-status"
                    style={{ color: getStatusColor(item.status) }}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </div>
                <div className="feedback-date">{formatDate(item.created_at)}</div>
              </div>

              <div className="feedback-content">
                <p className="feedback-text">{item.feedback}</p>
                {(item.name || item.email) && (
                  <div className="feedback-contact">
                    {item.name && <span>From: {item.name}</span>}
                    {item.email && <span>Email: {item.email}</span>}
                  </div>
                )}
              </div>

              <div className="feedback-actions">
                {item.status === 'new' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(item.id, 'reviewed');
                      }}
                      className="action-btn review-btn"
                    >
                      Mark Reviewed
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(item.id, 'dismissed');
                      }}
                      className="action-btn dismiss-btn"
                    >
                      Dismiss
                    </button>
                  </>
                )}
                {item.status === 'reviewed' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(item.id, 'resolved');
                      }}
                      className="action-btn resolve-btn"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(item.id, 'dismissed');
                      }}
                      className="action-btn dismiss-btn"
                    >
                      Dismiss
                    </button>
                  </>
                )}
                {item.status === 'resolved' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(item.id, 'reviewed');
                    }}
                    className="action-btn reopen-btn"
                  >
                    Reopen
                  </button>
                )}
                {item.status === 'dismissed' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(item.id, 'new');
                      }}
                      className="action-btn reopen-btn"
                    >
                      Reopen
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFeedback(item.id);
                      }}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedFeedback && (
        <div className="feedback-detail">
          <div className="feedback-detail-header">
            <h3>Feedback Details</h3>
            <button
              className="close-detail"
              onClick={() => setSelectedFeedback(null)}
            >
              ×
            </button>
          </div>
          <div className="feedback-detail-content">
            <div className="detail-section">
              <label>Category:</label>
              <span>{selectedFeedback.category}</span>
            </div>
            <div className="detail-section">
              <label>Status:</label>
              <span style={{ color: getStatusColor(selectedFeedback.status) }}>
                {getStatusLabel(selectedFeedback.status)}
              </span>
            </div>
            <div className="detail-section">
              <label>Submitted:</label>
              <span>{formatDate(selectedFeedback.created_at)}</span>
            </div>
            {selectedFeedback.name && (
              <div className="detail-section">
                <label>Name:</label>
                <span>{selectedFeedback.name}</span>
              </div>
            )}
            {selectedFeedback.email && (
              <div className="detail-section">
                <label>Email:</label>
                <span>{selectedFeedback.email}</span>
              </div>
            )}
            <div className="detail-section">
              <label>Feedback:</label>
              <div className="feedback-text-detail">{selectedFeedback.feedback}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackAdmin;
