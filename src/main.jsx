import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { SupabaseProgressProvider } from './contexts/SupabaseProgressContext'
import App from './App.jsx'
import { initializePerformanceMonitoring } from './utils/performanceMonitor'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Initialize performance monitoring
initializePerformanceMonitoring()

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


