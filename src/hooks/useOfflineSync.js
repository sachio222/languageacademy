import { useState, useEffect, useCallback } from 'react'
import { LocalStorageManager, isOnline } from '../utils/progressSync'
import { useSupabaseProgress } from './useSupabaseProgress'

/**
 * Hook for handling offline synchronization of progress data
 */
export const useOfflineSync = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [pendingActions, setPendingActions] = useState([])
  const [syncInProgress, setSyncInProgress] = useState(false)
  
  const {
    completeExercise,
    updateModuleProgress,
    updateConceptUnderstanding,
    recordExamAttempt,
    isAuthenticated
  } = useSupabaseProgress()

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      syncPendingActions()
    }
    
    const handleOffline = () => {
      setIsOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load pending actions from localStorage on mount
    const stored = LocalStorageManager.getItem('pendingActions')
    if (stored && Array.isArray(stored)) {
      setPendingActions(stored)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Save pending actions to localStorage whenever they change
  useEffect(() => {
    LocalStorageManager.setItem('pendingActions', pendingActions)
  }, [pendingActions])

  // Add action to pending queue
  const queueAction = useCallback((action) => {
    const actionWithId = {
      ...action,
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString()
    }
    
    setPendingActions(prev => [...prev, actionWithId])
    
    // If online, try to sync immediately
    if (isOnline() && isAuthenticated) {
      syncPendingActions()
    }
  }, [isAuthenticated])

  // Sync all pending actions
  const syncPendingActions = useCallback(async () => {
    if (!isAuthenticated || syncInProgress || pendingActions.length === 0) {
      return
    }

    setSyncInProgress(true)

    const successfulActions = []
    const failedActions = []

    for (const action of pendingActions) {
      try {
        await executeAction(action)
        successfulActions.push(action.id)
      } catch (error) {
        console.error('Failed to sync action:', action, error)
        failedActions.push(action)
      }
    }

    // Remove successful actions
    setPendingActions(prev => 
      prev.filter(action => !successfulActions.includes(action.id))
    )

    setSyncInProgress(false)

    // Return sync results
    return {
      synced: successfulActions.length,
      failed: failedActions.length,
      total: pendingActions.length
    }
  }, [pendingActions, isAuthenticated, syncInProgress])

  // Execute a single action
  const executeAction = async (action) => {
    switch (action.type) {
      case 'COMPLETE_EXERCISE':
        return await completeExercise(
          action.data.exerciseId,
          action.data.moduleId,
          action.data.unitId,
          action.data.userAnswer,
          action.data.correctAnswer,
          action.data.timeSpent,
          action.data.hintUsed
        )
      
      case 'UPDATE_MODULE_PROGRESS':
        return await updateModuleProgress(
          action.data.moduleId,
          action.data.unitId,
          action.data.totalExercises,
          action.data.completedCount,
          action.data.studyCompleted,
          action.data.examScore,
          action.data.timeSpent
        )
      
      case 'UPDATE_CONCEPT_UNDERSTANDING':
        return await updateConceptUnderstanding(
          action.data.moduleId,
          action.data.conceptIndex,
          action.data.conceptTerm,
          action.data.understood
        )
      
      case 'RECORD_EXAM_ATTEMPT':
        return await recordExamAttempt(
          action.data.examType,
          action.data.examId,
          action.data.totalQuestions,
          action.data.correctAnswers,
          action.data.scorePercentage,
          action.data.timeSpent,
          action.data.answers,
          action.data.passed
        )
      
      default:
        throw new Error(`Unknown action type: ${action.type}`)
    }
  }

  // Wrapper functions for offline-aware actions
  const offlineCompleteExercise = useCallback(async (exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent, hintUsed) => {
    if (isOnline() && isAuthenticated) {
      try {
        return await completeExercise(exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent, hintUsed)
      } catch (error) {
        // If online but request fails, queue for later
        queueAction({
          type: 'COMPLETE_EXERCISE',
          data: { exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent, hintUsed }
        })
        throw error
      }
    } else {
      // Queue for when back online
      queueAction({
        type: 'COMPLETE_EXERCISE',
        data: { exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent, hintUsed }
      })
      return true // Optimistic response
    }
  }, [isAuthenticated, queueAction, completeExercise])

  const offlineUpdateConceptUnderstanding = useCallback(async (moduleId, conceptIndex, conceptTerm, understood) => {
    if (isOnline() && isAuthenticated) {
      try {
        return await updateConceptUnderstanding(moduleId, conceptIndex, conceptTerm, understood)
      } catch (error) {
        queueAction({
          type: 'UPDATE_CONCEPT_UNDERSTANDING',
          data: { moduleId, conceptIndex, conceptTerm, understood }
        })
        throw error
      }
    } else {
      queueAction({
        type: 'UPDATE_CONCEPT_UNDERSTANDING',
        data: { moduleId, conceptIndex, conceptTerm, understood }
      })
    }
  }, [isAuthenticated, queueAction, updateConceptUnderstanding])

  const offlineRecordExamAttempt = useCallback(async (examType, examId, totalQuestions, correctAnswers, scorePercentage, timeSpent, answers, passed) => {
    if (isOnline() && isAuthenticated) {
      try {
        return await recordExamAttempt(examType, examId, totalQuestions, correctAnswers, scorePercentage, timeSpent, answers, passed)
      } catch (error) {
        queueAction({
          type: 'RECORD_EXAM_ATTEMPT',
          data: { examType, examId, totalQuestions, correctAnswers, scorePercentage, timeSpent, answers, passed }
        })
        throw error
      }
    } else {
      queueAction({
        type: 'RECORD_EXAM_ATTEMPT',
        data: { examType, examId, totalQuestions, correctAnswers, scorePercentage, timeSpent, answers, passed }
      })
    }
  }, [isAuthenticated, queueAction, recordExamAttempt])

  // Clear all pending actions (useful for testing or reset)
  const clearPendingActions = useCallback(() => {
    setPendingActions([])
    LocalStorageManager.removeItem('pendingActions')
  }, [])

  return {
    isOffline,
    pendingActions,
    syncInProgress,
    pendingCount: pendingActions.length,
    
    // Actions
    syncPendingActions,
    clearPendingActions,
    
    // Offline-aware wrappers
    offlineCompleteExercise,
    offlineUpdateConceptUnderstanding,
    offlineRecordExamAttempt
  }
}
