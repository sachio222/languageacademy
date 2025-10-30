import { useState, useEffect } from 'react';
import { CONSENT_KEY } from './CookieBanner';
import { initializeClarity, revokeClarityConsent } from '../utils/clarity';
import '../styles/CookieSettingsModal.css';

function CookieSettingsModal({ isOpen, onClose, onConsentChange }) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [originalAnalyticsEnabled, setOriginalAnalyticsEnabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const consent = localStorage.getItem(CONSENT_KEY);
      const enabled = consent === 'accepted';
      setAnalyticsEnabled(enabled);
      setOriginalAnalyticsEnabled(enabled);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setAnalyticsEnabled(!analyticsEnabled);
  };

  const handleSave = () => {
    if (analyticsEnabled) {
      // Enable analytics
      localStorage.setItem(CONSENT_KEY, 'accepted');
      initializeClarity();
      onConsentChange && onConsentChange(true);
    } else {
      // Disable analytics
      localStorage.setItem(CONSENT_KEY, 'rejected');
      revokeClarityConsent();
      onConsentChange && onConsentChange(false);
    }
    
    // Dispatch event to notify banner that consent was saved
    window.dispatchEvent(new Event('cookieConsentSaved'));
    
    onClose();
  };

  const handleCancel = () => {
    // Reset to original state
    setAnalyticsEnabled(originalAnalyticsEnabled);
    onClose();
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="cookie-settings-backdrop" onClick={handleBackdropClick}>
      <div className="cookie-settings-modal">
        <div className="cookie-settings-header">
          <h2>Cookie Preferences</h2>
          <button
            className="cookie-settings-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="cookie-settings-content">
          <div className="cookie-settings-section">
            <div className="cookie-settings-toggle-row">
              <div className="cookie-settings-toggle-info">
                <h3>Analytics</h3>
                <p className="cookie-settings-description">
                  We use Microsoft Clarity to understand how you use the site. This includes session recordings and heatmaps to help us improve the experience. We do not use this data for advertising purposes, and we do not sell or share your data with third parties for marketing.
                </p>
              </div>
              <label className="cookie-toggle-switch">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={handleToggle}
                />
                <span className="cookie-toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="cookie-settings-actions">
            <button onClick={handleCancel} className="cookie-settings-cancel-btn">
              Cancel
            </button>
            <button onClick={handleSave} className="cookie-settings-save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieSettingsModal;

