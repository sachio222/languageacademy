import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { SupabaseProgressProvider } from './contexts/SupabaseProgressContext'
import App from './App.jsx'
import { initializePerformanceMonitoring } from './utils/performanceMonitor'
import clarity from '@microsoft/clarity'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Initialize performance monitoring
initializePerformanceMonitoring()

// Initialize Microsoft Clarity
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID
const isProduction = import.meta.env.PROD
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

// Only initialize Clarity if we have a project ID and we're not in development mode
if (CLARITY_PROJECT_ID && (isProduction || !isLocalhost)) {
  console.log('Initializing Microsoft Clarity for:', window.location.hostname)
  clarity.init(CLARITY_PROJECT_ID)
} else if (CLARITY_PROJECT_ID) {
  console.log('Clarity not initialized - development mode detected')
} else {
  console.log('Clarity not initialized - no project ID found')
}

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
  </ClerkProvider>
)


