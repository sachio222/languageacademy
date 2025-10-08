import { SignIn, SignUp, UserButton, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function AuthWrapper({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)

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

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>🎓 Language Academy</h1>
            <p>Master French through interactive lessons and real-time progress tracking.</p>
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

          <div className="auth-features">
            <h3>Why create an account?</h3>
            <ul>
              <li>✅ Save your progress across devices</li>
              <li>📊 Track your learning analytics</li>
              <li>🔥 Maintain your study streak</li>
              <li>🎯 Get personalized recommendations</li>
              <li>📱 Access on mobile and desktop</li>
            </ul>
          </div>
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
