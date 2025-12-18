/**
 * JoinClass - Optional feature for students
 * Students can use the app independently OR join a teacher's class
 */

import { useState } from 'react';
import { Users, Check } from 'lucide-react';
import { useClasses } from '../hooks/useClasses';
import { useToast } from '../hooks/useToast';
import Toast from './Toast';
import '../styles/JoinClass.css';

function JoinClass({ onClose }) {
  const { joinClass } = useClasses();
  const { toasts, showToast, hideToast } = useToast();

  const [joinCode, setJoinCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joinedClassName, setJoinedClassName] = useState('');

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!joinCode.trim()) {
      showToast('Please enter a join code', 'error');
      return;
    }

    try {
      setJoining(true);
      const classData = await joinClass(joinCode.trim());
      setJoined(true);
      setJoinedClassName(classData.name);
      showToast(`Joined ${classData.name}!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to join class', 'error');
    } finally {
      setJoining(false);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="join-class-modal-overlay" onClick={handleClose}>
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

      <div className="join-class-modal" onClick={(e) => e.stopPropagation()}>
        {!joined ? (
          <>
            <div className="join-class-header">
              <div className="join-class-icon">
                <Users size={32} />
              </div>
              <h2>Join a Class</h2>
              <p>Enter the join code your teacher shared with you</p>
            </div>

            <form onSubmit={handleJoin} className="join-class-form">
              <div className="join-code-input-group">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  maxLength={6}
                  autoFocus
                  className="join-code-input"
                  disabled={joining}
                />
              </div>

              <div className="join-class-actions">
                <button
                  type="button"
                  className="join-cancel-btn"
                  onClick={handleClose}
                  disabled={joining}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="join-submit-btn"
                  disabled={joining || !joinCode.trim()}
                >
                  {joining ? 'Joining...' : 'Join Class'}
                </button>
              </div>
            </form>

            <div className="join-class-note">
              <p>Note: You can use Language Academy with or without joining a class.</p>
            </div>
          </>
        ) : (
          <>
            <div className="join-class-success">
              <div className="success-icon">
                <Check size={48} />
              </div>
              <h2>Successfully Joined!</h2>
              <p>You're now enrolled in <strong>{joinedClassName}</strong></p>
            </div>

            <div className="join-class-actions">
              <button
                className="join-done-btn"
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default JoinClass;
