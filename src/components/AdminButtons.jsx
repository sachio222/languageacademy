import React from 'react';
import '../styles/AdminButtons.css';

const AdminButtons = ({ 
  isAdmin, 
  newFeedbackCount, 
  onResetWelcome, 
  onShowReportCardAdmin,
  onShowFeedbackAdmin,
  onShowCommunicationAdmin 
}) => {
  if (!isAdmin) return null;

  return (
    <div className="admin-button-bar">
      <button
        className="admin-button admin-button-email"
        onClick={onShowCommunicationAdmin}
        title="Communication Admin (Emails)"
      >
        📧
      </button>
      <button
        className="admin-button admin-button-reset"
        onClick={onResetWelcome}
        title="Simulate First-Time Experience (Reset Welcome Screens)"
      >
        🔄
      </button>
      <button
        className="admin-button admin-button-report"
        onClick={onShowReportCardAdmin}
        title="View Report Card Admin"
      >
        📋
      </button>
      <button
        className="admin-button admin-button-feedback"
        onClick={onShowFeedbackAdmin}
        title="View Feedback Admin"
      >
        📊
        {newFeedbackCount > 0 && (
          <span className="admin-badge">{newFeedbackCount}</span>
        )}
      </button>
    </div>
  );
};

export default AdminButtons;

