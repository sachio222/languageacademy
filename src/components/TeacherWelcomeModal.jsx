/**
 * TeacherWelcomeModal - First-time teacher onboarding
 * Explains class system with clean, minimal design
 */

import { Users, Copy, TrendingUp, X } from 'lucide-react';
import '../styles/TeacherWelcomeModal.css';

function TeacherWelcomeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleGetStarted = () => {
    localStorage.setItem('teacher_welcome_seen', 'true');
    onClose();
  };

  return (
    <div className="teacher-welcome-overlay" onClick={onClose}>
      <div className="teacher-welcome-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="teacher-welcome-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="teacher-welcome-content">
          <div className="teacher-welcome-icon">
            <Users size={48} />
          </div>

          <h2>Welcome to Classes</h2>

          <p className="teacher-welcome-intro">
            Manage your classes and track student progress, all while students keep full control of their learning journey.
          </p>

          <div className="teacher-welcome-steps">
            <div className="welcome-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create a Class</h3>
                <p>Give it a name, term, and period. Get a unique 6-character join code.</p>
              </div>
            </div>

            <div className="welcome-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Share Join Code</h3>
                <p>Students enter the code to join your class. That's it—no complicated setup.</p>
              </div>
            </div>

            <div className="welcome-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Track Progress</h3>
                <p>View each student's modules completed, accuracy, study time, and engagement.</p>
              </div>
            </div>
          </div>

          <div className="teacher-welcome-note">
            <p><strong>Note:</strong> Students can use Language Academy with or without joining a class. Their progress is always preserved.</p>
          </div>

          <button
            className="teacher-welcome-btn"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherWelcomeModal;
