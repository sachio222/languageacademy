// Performance monitoring utilities

/**
 * Performance metrics tracker
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map()
    this.observers = []
  }

  // Start timing an operation
  startTiming(operation) {
    const startTime = performance.now()
    return {
      operation,
      startTime,
      end: () => {
        const endTime = performance.now()
        const duration = endTime - startTime
        this.recordMetric(operation, duration)
        return duration
      }
    }
  }

  // Record a metric
  recordMetric(operation, duration, metadata = {}) {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, [])
    }
    
    const metric = {
      duration,
      timestamp: Date.now(),
      ...metadata
    }
    
    this.metrics.get(operation).push(metric)
    
    // Notify observers
    this.observers.forEach(callback => {
      callback(operation, metric)
    })
    
    // Log slow operations
    if (duration > 1000) { // > 1 second
      logger.warn(`Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`)
    }
  }

  // Get statistics for an operation
  getStats(operation) {
    const metrics = this.metrics.get(operation)
    if (!metrics || metrics.length === 0) {
      return null
    }

    const durations = metrics.map(m => m.duration)
    const sum = durations.reduce((a, b) => a + b, 0)
    const avg = sum / durations.length
    const min = Math.min(...durations)
    const max = Math.max(...durations)
    
    // Calculate median
    const sorted = [...durations].sort((a, b) => a - b)
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)]

    return {
      count: metrics.length,
      average: avg,
      median,
      min,
      max,
      total: sum
    }
  }

  // Get all operations and their stats
  getAllStats() {
    const stats = {}
    for (const [operation] of this.metrics) {
      stats[operation] = this.getStats(operation)
    }
    return stats
  }

  // Subscribe to metric updates
  subscribe(callback) {
    this.observers.push(callback)
    return () => {
      const index = this.observers.indexOf(callback)
      if (index > -1) {
        this.observers.splice(index, 1)
      }
    }
  }

  // Clear all metrics
  clear() {
    this.metrics.clear()
  }

  // Export metrics for analysis
  export() {
    const data = {}
    for (const [operation, metrics] of this.metrics) {
      data[operation] = metrics
    }
    return data
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// Helper function to measure async operations
export const measureAsync = async (operation, asyncFunction) => {
  const timer = performanceMonitor.startTiming(operation)
  try {
    const result = await asyncFunction()
    timer.end()
    return result
  } catch (error) {
    const duration = timer.end()
    performanceMonitor.recordMetric(`${operation}_error`, duration, { error: error.message })
    throw error
  }
}

// Helper function to measure sync operations
export const measureSync = (operation, syncFunction) => {
  const timer = performanceMonitor.startTiming(operation)
  try {
    const result = syncFunction()
    timer.end()
    return result
  } catch (error) {
    const duration = timer.end()
    performanceMonitor.recordMetric(`${operation}_error`, duration, { error: error.message })
    throw error
  }
}

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  return {
    startTiming: performanceMonitor.startTiming.bind(performanceMonitor),
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
    getStats: performanceMonitor.getStats.bind(performanceMonitor),
    getAllStats: performanceMonitor.getAllStats.bind(performanceMonitor),
    measureAsync,
    measureSync
  }
}

// Web Vitals monitoring
export const initWebVitalsMonitoring = () => {
  // Monitor Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          performanceMonitor.recordMetric('lcp', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          performanceMonitor.recordMetric('fid', entry.processingStart - entry.startTime)
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
  }

  // Monitor layout shifts (CLS)
  if ('PerformanceObserver' in window) {
    let clsValue = 0
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      performanceMonitor.recordMetric('cls', clsValue)
    })

    observer.observe({ entryTypes: ['layout-shift'] })
  }
}

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    }
  }
  return null
}

// Network monitoring
export const monitorNetworkRequests = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
          performanceMonitor.recordMetric('network_request', entry.duration, {
            url: entry.name,
            method: entry.initiatorType
          })
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })
  }
}

// Bundle size analysis
export const analyzeBundleSize = () => {
  const resources = performance.getEntriesByType('resource')
  const jsResources = resources.filter(r => r.name.endsWith('.js'))
  const cssResources = resources.filter(r => r.name.endsWith('.css'))
  
  const totalJSSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
  const totalCSSSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
  
  return {
    javascript: {
      count: jsResources.length,
      totalSize: totalJSSize,
      resources: jsResources.map(r => ({
        url: r.name,
        size: r.transferSize,
        loadTime: r.duration
      }))
    },
    css: {
      count: cssResources.length,
      totalSize: totalCSSSize,
      resources: cssResources.map(r => ({
        url: r.name,
        size: r.transferSize,
        loadTime: r.duration
      }))
    }
  }
}

// Initialize all monitoring
export const initializePerformanceMonitoring = () => {
  initWebVitalsMonitoring()
  monitorNetworkRequests()
  
  // Log performance summary every 30 seconds in development
  if (import.meta.env.DEV) {
    setInterval(() => {
      const stats = performanceMonitor.getAllStats()
      if (Object.keys(stats).length > 0) {
        logger.log('Performance Summary:', stats)
      }
    }, 30000)
  }
}
