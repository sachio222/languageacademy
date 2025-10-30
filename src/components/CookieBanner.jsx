import { useState, useEffect } from 'react';
import { revokeClarityConsent } from '../utils/clarity';
import '../styles/CookieBanner.css';

export const CONSENT_KEY = 'clarity-consent';

// Check if Clarity is configured
const isClarityConfigured = () => {
  const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;
  const isProduction = import.meta.env.PROD;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return CLARITY_PROJECT_ID && (isProduction || !isLocalhost);
};

function CookieBanner({ onConsent, onShowDetails, forceShow = false }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if Clarity is configured and user hasn't made a choice
    if (!isClarityConfigured() && !forceShow) {
      return;
    }

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === null || forceShow) {
      if (forceShow) {
        // Show immediately when forced (user clicked "Manage Cookies")
        setShow(true);
      } else {
        // Small delay to let users start using the site on first visit
        const timer = setTimeout(() => {
          setShow(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else if (consent !== null && !forceShow) {
      // If consent exists and not forced to show, hide the banner
      setShow(false);
    }
  }, [forceShow]);

  // Listen for consent changes from the modal
  useEffect(() => {
    const handleConsentChange = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (consent !== null && !forceShow) {
        // Close banner if consent was saved and we're not forcing it to show
        setShow(false);
      }
    };

    // Check immediately
    handleConsentChange();

    // Listen for storage changes (in case consent is updated from another tab/window)
    window.addEventListener('storage', handleConsentChange);

    // Listen for custom event for same-tab updates
    window.addEventListener('cookieConsentSaved', handleConsentChange);

    return () => {
      window.removeEventListener('storage', handleConsentChange);
      window.removeEventListener('cookieConsentSaved', handleConsentChange);
    };
  }, [forceShow]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShow(false);
    onConsent(true);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setShow(false);
    // Disable Clarity tracking immediately
    revokeClarityConsent();
    onConsent(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <p className="cookie-banner-text">
          This site uses cookies to help with developing the user experience. We use analytics cookies to understand how you use the site. We do not use cookies for advertising or sell your data. {' '}
          <button
            onClick={onShowDetails}
            className="cookie-details-link"
          >
            More details
          </button>
        </p>
        <div className="cookie-banner-actions">
          <button onClick={handleReject} className="cookie-reject-btn">
            Reject
          </button>
          <button onClick={handleAccept} className="cookie-accept-btn">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;

