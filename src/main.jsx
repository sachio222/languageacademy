import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { SupabaseProgressProvider } from './contexts/SupabaseProgressContext'
import App from './App.jsx'
import { initializePerformanceMonitoring } from './utils/performanceMonitor'
import { initializeClarity, trackUTMParameters } from './utils/clarity';
import { logger } from "./utils/logger";
import { Analytics } from '@vercel/analytics/react';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Initialize performance monitoring
initializePerformanceMonitoring()

// Suppress Clarity-related unhandled promise rejections
// Microsoft Clarity's iframe can cause "Failed to fetch" errors that don't affect functionality
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;
  const errorMessage = error?.message || '';
  const errorStack = error?.stack || '';
  
  // Suppress Clarity-related fetch errors from frame_ant.js
  if (errorMessage.includes('Failed to fetch') && 
      (errorStack.includes('frame_ant') || errorStack.includes('clarity'))) {
    event.preventDefault();
    // Silently ignore - these errors don't affect functionality
    return;
  }
});

// Auto-initialize Clarity if consent already given (for returning users)
initializeClarity()

// Track UTM parameters and referrer for campaign tracking
// This runs immediately to capture initial landing page parameters
trackUTMParameters()

// Always wrap with provider - the hook inside handles auth timing
function AppWithProviders() {
  return (
    <SupabaseProgressProvider>
      <App />
    </SupabaseProgressProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <AppWithProviders />
    <Analytics />
  </ClerkProvider>
)


