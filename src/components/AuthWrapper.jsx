import { SignIn, SignUp, UserButton, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LandingPage from './LandingPage'
import '../styles/Landing.css'

function AuthWrapper({ children, onBackToLanding }) {
  const { isAuthenticated, loading } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)
  const [showAuthForms, setShowAuthForms] = useState(false)
  const [showLanding, setShowLanding] = useState(false)

  // Handle navigation back to landing page
  const handleBackToLanding = () => {
    setShowLanding(true)
    setShowAuthForms(false)
    if (onBackToLanding) {
      onBackToLanding()
    }
  }

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
          showName={true}
          afterSignOutUrl="/"
        />
      </div>
      {children}
    </div>
  )
}

export default AuthWrapper
