/**
 * Environment-aware logging utility
 * Only logs in development mode, silent in production
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  error: (...args) => {
    // Always log errors, even in production
    console.error(...args);
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  
  // Special method for analytics/debugging that should be silent in production
  analytics: (...args) => {
    if (isDevelopment) {
      console.log('[ANALYTICS]', ...args);
    }
  },
  
  // Method for performance logging
  performance: (...args) => {
    if (isDevelopment) {
      console.log('[PERFORMANCE]', ...args);
    }
  }
};

// Default export for convenience
export default logger;
