import { SignIn, SignUp, UserButton, useUser } from '@clerk/clerk-react'
import { useState, useEffect, lazy, Suspense } from 'react'
import { BookOpen, FileBarChart, Mail, BarChart3, Users, Crown, CreditCard } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext'
import { useAnalytics } from '../hooks/useAnalytics'
import { useSubscription } from '../hooks/useSubscription'
import LandingPage from './LandingPage'
import WelcomePage from './WelcomePage'
import NotificationSettings from './NotificationSettings'
import '../styles/Landing.css'

const PricingModal = lazy(() => import('./PricingModal'))

const JoinClass = lazy(() => import('./JoinClass'));

function AuthWrapper({ children, onBackToLanding, onOpenDictionary, onShowReportCard }) {
  const { isAuthenticated, loading, supabaseUser, profile } = useAuth()
  const { markWelcomeAsSeen } = useSupabaseProgress()
  const analytics = useAnalytics() // Track sessions on all authenticated pages
  const { 
    tier, 
    getTierDisplayName, 
    isPaid, 
    isLifetime, 
    isBeta, 
    showUpgradeModal,
    showPricingModal,
    pricingModalContext,
    hideUpgradeModal
  } = useSubscription()
  const [showSignUp, setShowSignUp] = useState(false)
  const [showAuthForms, setShowAuthForms] = useState(false)
  const [showLanding, setShowLanding] = useState(false)
  const [showJoinClass, setShowJoinClass] = useState(false)

  // Handle direct login from landing page
  const handleLogin = () => {
    setShowSignUp(false)
    setShowAuthForms(true)
  }
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check URL parameter first
    const params = new URLSearchParams(window.location.search)
    if (params.get('welcome') === 'true') {
      return true
    }
    // Don't show welcome initially - will be set by useEffect when auth state is known
    return false
  })
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showNotificationSettings, setShowNotificationSettings] = useState(() => {
    // Check if settings param is in URL
    const params = new URLSearchParams(window.location.search)
    return params.has('settings')
  })

  // Handle navigation back to landing page
  const handleBackToLanding = () => {
    setShowLanding(true)
    setShowAuthForms(false)
    if (onBackToLanding) {
      onBackToLanding()
    }
  }

  // Handle opening dictionary
  const handleOpenDictionary = () => {
    if (onOpenDictionary) {
      onOpenDictionary()
    }
  }

  // Handle authentication state change to show welcome page
  useEffect(() => {
    if (isAuthenticated && supabaseUser && !supabaseUser.has_seen_welcome) {
      setShowWelcome(true)
    }
  }, [isAuthenticated, supabaseUser])

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

  // Show welcome page only for authenticated users who haven't seen it
  if (isAuthenticated && showWelcome) {
    // Update URL to show welcome parameter
    const currentUrl = new URL(window.location)
    if (currentUrl.searchParams.get('welcome') !== 'true') {
      currentUrl.searchParams.set('welcome', 'true')
      window.history.replaceState({}, '', currentUrl)
    }

    return <WelcomePage
      onContinue={async () => {
        // Mark welcome as seen in database
        await markWelcomeAsSeen()
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
        onGetStarted={() => {
          setShowSignUp(true)
          setShowAuthForms(true)
        }}
        isAuthenticated={isAuthenticated}
        onBackToApp={() => setShowLanding(false)}
        onLogin={handleLogin}
      />
    }

    // Show auth forms after "Get Started" clicked
    return (
      <div className="auth-container">
        <div className="auth-content">
          {/* <div className="auth-header">
            <h1>
              <img src="/img/logov2.png" alt="" className="auth-logo-icon" />
              Language Academy
            </h1>
            <p>Create your account to start learning</p>
          </div> */}

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
                fallbackRedirectUrl="/"
              />
            ) : (
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none border border-gray-200 rounded-lg",
                  }
                }}
                fallbackRedirectUrl="/"
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

  // Handle opening report card
  const handleShowReportCard = () => {
    if (onShowReportCard) {
      onShowReportCard()
    }
  }

  // Handle opening customer portal
  const handleManageSubscription = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseClient = window.supabase;
      
      if (!supabaseClient) {
        throw new Error('Supabase client not initialized');
      }

      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const functionUrl = `${supabaseUrl}/functions/v1/stripe-portal`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open customer portal');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      alert(`Error: ${error.message}`);
    }
  }

  // Get tier badge icon and color
  const getTierBadge = () => {
    if (isBeta) return { icon: <Crown size={14} />, color: '#f59e0b', label: 'Beta Tester' };
    if (isLifetime) return { icon: <Crown size={14} />, color: '#8b5cf6', label: 'Lifetime' };
    if (isPaid) return { icon: <CreditCard size={14} />, color: '#10b981', label: getTierDisplayName() };
    return { icon: null, color: '#64748b', label: 'Free' };
  };
  
  const tierBadge = getTierBadge();

  return (
    <div className="authenticated-app">
      <div className="auth-header-container">
        <button
          className="dictionary-link-btn"
          onClick={handleOpenDictionary}
          title="Open Dictionary"
        >
          <BookOpen size={20} />
        </button>
        <div className="auth-header-bar">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
            showName={!isMobile}
            fallbackRedirectUrl="/"
          >
            <UserButton.MenuItems>
              {/* Subscription Status Display */}
              <UserButton.Action
                label={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0',
                    pointerEvents: 'none',
                    opacity: 0.9
                  }}>
                    <span style={{ 
                      fontSize: '13px', 
                      fontWeight: 600,
                      color: '#64748b'
                    }}>
                      Subscription
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      background: `${tierBadge.color}15`,
                      color: tierBadge.color,
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {tierBadge.icon}
                      {tierBadge.label}
                    </span>
                  </div>
                }
                onClick={() => {}}
              />
              
              {/* Manage Subscription (for paid users, not beta or lifetime) */}
              {isPaid && !isBeta && !isLifetime && (
                <UserButton.Action
                  label="Manage Subscription"
                  labelIcon={<CreditCard size={16} />}
                  onClick={handleManageSubscription}
                />
              )}

              {/* Upgrade Button (for free users) */}
              {!isPaid && !isBeta && (
                <UserButton.Action
                  label="Upgrade to Premium"
                  labelIcon={<Crown size={16} />}
                  onClick={() => showUpgradeModal('user-menu')}
                />
              )}

              {onShowReportCard && (
                <UserButton.Action
                  label="My Report Card"
                  labelIcon={<BarChart3 size={16} />}
                  onClick={handleShowReportCard}
                />
              )}
              {profile?.role === 'student' && (
                <UserButton.Action
                  label="Join a Class"
                  labelIcon={<Users size={16} />}
                  onClick={() => setShowJoinClass(true)}
                />
              )}
              <UserButton.Action
                label="Email Preferences"
                labelIcon={<Mail size={16} />}
                onClick={() => setShowNotificationSettings(true)}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
      {showJoinClass && (
        <Suspense fallback={null}>
          <JoinClass onClose={() => setShowJoinClass(false)} />
        </Suspense>
      )}
      {showPricingModal && (
        <Suspense fallback={null}>
          <PricingModal
            isOpen={showPricingModal}
            onClose={() => hideUpgradeModal(false)}
            context={pricingModalContext}
          />
        </Suspense>
      )}
      {children}
    </div>
  )
}

export default AuthWrapper
