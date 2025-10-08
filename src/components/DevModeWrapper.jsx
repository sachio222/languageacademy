import { useState, useEffect } from 'react'

/**
 * Development Mode Wrapper - Bypasses authentication for quick testing
 * Uses localStorage to persist progress without requiring database
 */
function DevModeWrapper({ children }) {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className={showBanner ? 'dev-mode-wrapper' : ''}>
      {showBanner && (
        <div className="dev-mode-banner">
          <div className="dev-mode-content">
            <span className="dev-badge">🚀 DEV MODE</span>
            <span className="dev-message">
              Dev Mode: Authentication bypassed. Progress saved to Supabase database.
            </span>
            <button
              className="dev-close"
              onClick={() => setShowBanner(false)}
              title="Hide banner"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default DevModeWrapper
