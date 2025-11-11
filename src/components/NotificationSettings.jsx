import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNotificationPreferences } from '../hooks/useNotificationPreferences';
import '../styles/NotificationSettings.css';

function NotificationSettings({ isOpen, onClose }) {
  const { preferences, loading, saving, updatePreferences, toggleAllEmails } = useNotificationPreferences();
  const [localPrefs, setLocalPrefs] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Load preferences into local state
  useEffect(() => {
    if (preferences) {
      setLocalPrefs(preferences);
    }
  }, [preferences]);

  const handleToggle = (key) => {
    if (!localPrefs) return;
    setLocalPrefs({ ...localPrefs, [key]: !localPrefs[key] });
    setHasChanges(true);
  };

  const handleTimezoneChange = (e) => {
    setLocalPrefs({ ...localPrefs, timezone: e.target.value });
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges) {
      onClose();
      return;
    }

    const updates = {};
    Object.keys(localPrefs).forEach(key => {
      if (localPrefs[key] !== preferences[key]) {
        updates[key] = localPrefs[key];
      }
    });

    const result = await updatePreferences(updates);
    if (result.success) {
      setHasChanges(false);
      onClose();
    }
  };

  const handleCancel = () => {
    setLocalPrefs(preferences);
    setHasChanges(false);
    onClose();
  };

  const handleMasterToggle = () => {
    handleToggle('email_enabled');
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // Common timezones
  const commonTimezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Toronto',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  return (
    <div className="notification-settings-backdrop" onClick={handleBackdropClick}>
      <div className="notification-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notification-settings-header">
          <h2>Email Notifications</h2>
          <button
            className="notification-settings-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="notification-settings-loading">
            Loading preferences...
          </div>
        ) : (
          <>
            <div className="notification-settings-content">
              {/* Master Toggle */}
              <div className="notification-settings-section">
                <div className="notification-settings-master-toggle">
                  <div className="notification-settings-toggle-info">
                    <h3>Email Notifications</h3>
                    <p className="notification-settings-description">
                      Master control for all email communications. Turn this off to stop receiving any emails from Language Academy.
                    </p>
                  </div>
                  <label className="notification-toggle-switch">
                    <input
                      type="checkbox"
                      checked={localPrefs?.email_enabled || false}
                      onChange={handleMasterToggle}
                      disabled={saving}
                    />
                    <span className="notification-toggle-slider"></span>
                  </label>
                </div>
              </div>

              {/* Individual Email Type Toggles */}
              <div className="notification-settings-section">
                <h3>Email Preferences</h3>
                <p className="notification-settings-section-description">
                  Choose which types of emails you'd like to receive
                </p>

                <div className="notification-settings-toggle-list">
                  <div className="notification-settings-toggle-row">
                    <div className="notification-settings-toggle-info">
                      <h4>Word of the Day</h4>
                      <p>Daily French word with quiz, examples, and etymology</p>
                    </div>
                    <label className="notification-toggle-switch">
                      <input
                        type="checkbox"
                        checked={localPrefs?.word_of_day !== false}
                        onChange={() => handleToggle('word_of_day')}
                        disabled={!localPrefs?.email_enabled || saving}
                      />
                      <span className="notification-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-settings-toggle-row">
                    <div className="notification-settings-toggle-info">
                      <h4>Review Reminders</h4>
                      <p>Spaced repetition reminders to review completed modules (sent 2 days after completion)</p>
                    </div>
                    <label className="notification-toggle-switch">
                      <input
                        type="checkbox"
                        checked={localPrefs?.review_reminders || false}
                        onChange={() => handleToggle('review_reminders')}
                        disabled={!localPrefs?.email_enabled || saving}
                      />
                      <span className="notification-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-settings-toggle-row">
                    <div className="notification-settings-toggle-info">
                      <h4>Module Nudges</h4>
                      <p>Friendly encouragement to finish modules you've almost completed</p>
                    </div>
                    <label className="notification-toggle-switch">
                      <input
                        type="checkbox"
                        checked={localPrefs?.module_nudges || false}
                        onChange={() => handleToggle('module_nudges')}
                        disabled={!localPrefs?.email_enabled || saving}
                      />
                      <span className="notification-toggle-slider"></span>
                    </label>
                  </div>

                  {/* Dynamic templates from database */}
                  {templates.filter(t => !['welcome', 'review_reminder', 'module_nudge'].includes(t.template_type)).map(template => {
                    const prefKey = template.template_type.replace(/-/g, '_');
                    return (
                      <div key={template.id} className="notification-settings-toggle-row">
                        <div className="notification-settings-toggle-info">
                          <h4>{template.template_name}</h4>
                          <p>{template.trigger_type === 'automatic' ? 'Automatic' : 'Manual'} email</p>
                        </div>
                        <label className="notification-toggle-switch">
                          <input
                            type="checkbox"
                            checked={localPrefs?.[prefKey] !== false}
                            onChange={() => handleToggle(prefKey)}
                            disabled={!localPrefs?.email_enabled || saving}
                          />
                          <span className="notification-toggle-slider"></span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timezone Selection */}
              <div className="notification-settings-section">
                <h3>Timezone</h3>
                <p className="notification-settings-section-description">
                  Used for scheduling future emails (like daily notifications)
                </p>
                <select
                  value={localPrefs?.timezone || 'UTC'}
                  onChange={handleTimezoneChange}
                  disabled={saving}
                  className="notification-settings-timezone-select"
                >
                  {commonTimezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="notification-settings-actions">
              <button
                onClick={handleCancel}
                className="notification-settings-cancel-btn"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="notification-settings-save-btn"
                disabled={!hasChanges || saving}
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationSettings;

