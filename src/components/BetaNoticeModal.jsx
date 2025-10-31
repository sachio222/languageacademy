import { useEffect } from 'react';
import '../styles/BetaNoticeModal.css';

function BetaNoticeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="beta-notice-backdrop" onClick={handleBackdropClick}>
      <div className="beta-notice-modal">
        <div className="beta-notice-header">
          <h1 className="beta-notice-header-title">Welcome pilot users!</h1>
          <button
            className="beta-notice-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="beta-notice-content">
          <div className="beta-notice-intro-section">
            <img
              src="/img/logov1.png"
              alt="Language Academy Logo"
              className="beta-notice-logo"
            />
            <p className="beta-notice-intro">
              Welcome to Language Academy's <strong>official pre-market release pilot test</strong>.
            </p>
          </div>

          <div className="beta-notice-body">
            <p>
              This is a free, pre-production version of our language learning platform.
              As pilot testers, you are among the first to experience our innovative approach
              to language acquisition, informed by cognitive science research and modern
              pedagogical principles.
            </p>

            <p>
              While we have invested significant effort in ensuring a high-quality experience,
              you may encounter occasional <strong>bugs or inconsistencies</strong> as we continue
              to refine and enhance the platform.
            </p>

            <div className="beta-notice-request">
              <p>
                After you have had the opportunity to use the platform for some time,
                we would be most grateful if you could share your thoughts with us:
              </p>
              <ul>
                <li>What aspects did you find most valuable or engaging?</li>
                <li>What elements did not meet your expectations?</li>
                <li>What features or content would you like to see more of?</li>
                <li>Were there any areas that caused confusion or difficulty?</li>
              </ul>
            </div>

            <p className="beta-notice-closing">
              Your feedback is invaluable in helping us create the best possible learning
              experience. We appreciate your participation and patience as we work toward
              our official launch.
            </p>

            <div className="beta-notice-signature">
              <p className="beta-notice-signature-message">
                Good luck, and thank you.
              </p>
              <p className="beta-notice-signature-name">J. S. Krajewski</p>
              <p className="beta-notice-signature-title">Headmaster, Language Academy</p>
            </div>
          </div>

          <div className="beta-notice-actions">
            <button onClick={onClose} className="beta-notice-continue-btn">
              Begin Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetaNoticeModal;

