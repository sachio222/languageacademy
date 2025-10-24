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
if (CLARITY_PROJECT_ID) {
  clarity.init(CLARITY_PROJECT_ID)
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


