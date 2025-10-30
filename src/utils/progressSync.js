// Progress synchronization utilities

/**
 * Calculate lesson progress percentage
 */
export const calculateLessonProgress = (completedCount, totalCount) => {
  if (totalCount === 0) return 0
  return Math.round((completedCount / totalCount) * 100)
}

/**
 * Calculate unit progress from lessons
 */
export const calculateUnitProgress = (lessons, completedExercises) => {
  if (!lessons || lessons.length === 0) return { completed: 0, total: 0 }
  
  const completedLessons = lessons.filter(lesson => {
    const completed = lesson.exercises.filter(ex => completedExercises.has(ex.id)).length
    return completed === lesson.exercises.length
  }).length
  
  return { completed: completedLessons, total: lessons.length }
}

/**
 * Get module completion status from Supabase data
 */
export const getModuleCompletionStatus = (moduleId, moduleProgress, completedExercises, totalExercises) => {
  const progress = moduleProgress[moduleId]
  if (!progress) return { completed: false, score: null, timeSpent: 0 }
  
  const exercisesComplete = Array.from(completedExercises).filter(exId => 
    exId.startsWith(moduleId) || exId.includes(moduleId)
  ).length >= totalExercises
  
  return {
    completed: progress.completed_at !== null && exercisesComplete,
    score: progress.exam_score,
    timeSpent: progress.time_spent_seconds || 0,
    studyCompleted: progress.study_mode_completed || false
  }
}

/**
 * Format time duration for display
 */
export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

/**
 * Format streak display
 */
export const formatStreak = (days) => {
  if (days === 0) return 'Start your streak!'
  if (days === 1) return '1 day streak 🔥'
  return `${days} day streak ${'🔥'.repeat(Math.min(days, 5))}`
}

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

/**
 * Debounce function for reducing API calls
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      
      const delay = baseDelay * Math.pow(2, i)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

/**
 * Validate exercise answer (handles accents, case, spacing)
 */
export const validateAnswer = (userAnswer, correctAnswer) => {
  const normalize = (str) => {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/\s+/g, ' ') // Normalize spaces
  }
  
  return normalize(userAnswer) === normalize(correctAnswer)
}

/**
 * Extract module/unit IDs from lesson structure
 */
export const extractModuleId = (lesson) => {
  return lesson.id?.toString() || 'unknown'
}

export const extractUnitId = (unitInfo) => {
  return unitInfo?.unit?.toString() || 'unknown'
}

/**
 * Generate analytics event data
 */
export const createAnalyticsEvent = (eventType, data) => {
  return {
    type: eventType,
    timestamp: new Date().toISOString(),
    ...data
  }
}

/**
 * Check if user is offline
 */
export const isOnline = () => {
  return navigator.onLine
}

/**
 * Local storage helpers for offline caching
 */
export const LocalStorageManager = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      logger.warn('Failed to save to localStorage:', error)
    }
  },
  
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      logger.warn('Failed to read from localStorage:', error)
      return null
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      logger.warn('Failed to remove from localStorage:', error)
    }
  }
}
