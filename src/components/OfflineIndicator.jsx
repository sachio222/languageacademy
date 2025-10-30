import { useState, useEffect } from 'react'
import { useOfflineSync } from '../hooks/useOfflineSync'
import { formatDuration } from '../utils/progressSync'
import { logger } from "../utils/logger";

/**
 * Component that shows offline status and pending sync actions
 */
function OfflineIndicator() {
  const { 
    isOffline, 
    pendingCount, 
    syncInProgress,
    syncPendingActions,
    clearPendingActions 
  } = useOfflineSync()
  
  const [showDetails, setShowDetails] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState(null)

  const handleSync = async () => {
    try {
      const result = await syncPendingActions()
      if (result && result.synced > 0) {
        setLastSyncTime(Date.now())
      }
    } catch (error) {
      logger.error('Sync failed:', error)
    }
  }

  // Auto-hide after coming back online
  useEffect(() => {
    if (!isOffline && pendingCount === 0) {
      const timer = setTimeout(() => {
        setShowDetails(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOffline, pendingCount])

  // Don't show if online and no pending actions
  if (!isOffline && pendingCount === 0) {
    return null
  }

  return (
    <div className={`offline-indicator ${isOffline ? 'offline' : 'online'}`}>
      <div className="offline-status" onClick={() => setShowDetails(!showDetails)}>
        <div className="status-icon">
          {isOffline ? '📴' : syncInProgress ? '🔄' : '📡'}
        </div>
        <div className="status-text">
          {isOffline ? (
            <span>Offline Mode</span>
          ) : syncInProgress ? (
            <span>Syncing...</span>
          ) : (
            <span>Online</span>
          )}
          {pendingCount > 0 && (
            <span className="pending-count">
              {pendingCount} pending
            </span>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="offline-details">
          <div className="detail-header">
            <h4>Sync Status</h4>
            <button 
              className="close-details"
              onClick={() => setShowDetails(false)}
            >
              ×
            </button>
          </div>
          
          <div className="detail-content">
            <p>
              <strong>Status:</strong> {isOffline ? 'Offline' : 'Online'}
            </p>
            
            {pendingCount > 0 && (
              <>
                <p>
                  <strong>Pending Actions:</strong> {pendingCount}
                </p>
                
                {!isOffline && (
                  <button 
                    className="btn-sync"
                    onClick={handleSync}
                    disabled={syncInProgress}
                  >
                    {syncInProgress ? 'Syncing...' : 'Sync Now'}
                  </button>
                )}
              </>
            )}
            
            {lastSyncTime && (
              <p className="last-sync">
                <strong>Last Sync:</strong> {formatDuration(Math.round((Date.now() - lastSyncTime) / 1000))} ago
              </p>
            )}
            
            <div className="offline-explanation">
              <small>
                {isOffline ? (
                  'Your progress is being saved locally. It will sync when you\'re back online.'
                ) : (
                  'Your progress is being synced to the cloud in real-time.'
                )}
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OfflineIndicator
