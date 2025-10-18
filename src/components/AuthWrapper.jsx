import { SignIn, SignUp, UserButton, useUser } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import LandingPage from './LandingPage'
import WelcomePage from './WelcomePage'
import '../styles/Landing.css'

function AuthWrapper({ children, onBackToLanding }) {
  const { isAuthenticated, loading } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)
  const [showAuthForms, setShowAuthForms] = useState(false)
  const [showLanding, setShowLanding] = useState(false)
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check URL parameter first
    const params = new URLSearchParams(window.location.search)
    if (params.get('welcome') === 'true') {
      return true
    }
    // Otherwise check if user has seen the welcome page before
    return !localStorage.getItem('hasSeenWelcome')
  })
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Handle navigation back to landing page
  const handleBackToLanding = () => {
    setShowLanding(true)
    setShowAuthForms(false)
    if (onBackToLanding) {
      onBackToLanding()
    }
  }

  // Handle window resize for responsive username display
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle browser back/forward for welcome page
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      if (params.get('welcome') === 'true') {
        setShowWelcome(true)
      } else {
        setShowWelcome(false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your account...</p>
        </div>
      </div>
    )
  }

  // Show welcome page for first-time visitors (both authenticated and unauthenticated)
  if (showWelcome) {
    // Update URL to show welcome parameter
    const currentUrl = new URL(window.location)
    if (currentUrl.searchParams.get('welcome') !== 'true') {
      currentUrl.searchParams.set('welcome', 'true')
      window.history.replaceState({}, '', currentUrl)
    }

    return <WelcomePage
      onContinue={() => {
        localStorage.setItem('hasSeenWelcome', 'true')
        setShowWelcome(false)

        // Remove welcome parameter from URL
        const url = new URL(window.location)
        url.searchParams.delete('welcome')
        window.history.replaceState({}, '', url)

        // Scroll to top when leaving welcome page
        window.scrollTo(0, 0)
      }}
    />
  }

  // Show landing page if user is not authenticated OR if they explicitly want to see it
  if (!isAuthenticated || showLanding) {

    // Show landing page first, then auth forms
    if (!showAuthForms) {
      return <LandingPage
        onGetStarted={() => setShowAuthForms(true)}
        isAuthenticated={isAuthenticated}
        onBackToApp={() => setShowLanding(false)}
      />
    }

    // Show auth forms after "Get Started" clicked
    return (
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>🎓 Language Academy</h1>
            <p>Create your account to start learning</p>
          </div>

          <div className="auth-toggle">
            <button
              onClick={() => setShowSignUp(false)}
              className={!showSignUp ? 'active' : ''}
            >
              Sign In
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className={showSignUp ? 'active' : ''}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form">
            {showSignUp ? (
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none border border-gray-200 rounded-lg",
                  }
                }}
                afterSignUpUrl="/"
              />
            ) : (
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none border border-gray-200 rounded-lg",
                  }
                }}
                afterSignInUrl="/"
              />
            )}
          </div>

          <button
            className="auth-back-link"
            onClick={() => setShowAuthForms(false)}
          >
            ← Back to landing page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="authenticated-app">
      <div className="auth-header-bar">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
          showName={!isMobile}
          afterSignOutUrl="/"
        />
      </div>
      {children}
    </div>
  )
}

export default AuthWrapper
