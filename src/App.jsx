import { useState, useEffect, Suspense, lazy } from 'react';
import AuthWrapper from './components/AuthWrapper';
import DevModeWrapper from './components/DevModeWrapper';
import LeftNav from './components/LeftNav';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import SafariTTSHelper from './components/SafariTTSHelper';
import OfflineIndicator from './components/OfflineIndicator';
import CookieBanner from './components/CookieBanner';
import AdminButtons from './components/AdminButtons';

// Lazy load heavy/conditional components
const ReferenceModules = lazy(() => import('./components/ReferenceModules'));
const VocabularyDashboard = lazy(() => import('./components/VocabularyDashboard'));
const DictionaryModal = lazy(() => import('./components/DictionaryModal'));
const FeedbackForm = lazy(() => import('./components/FeedbackForm'));
const FeedbackAdmin = lazy(() => import('./components/FeedbackAdmin'));
const CommunicationAdmin = lazy(() => import('./components/CommunicationAdmin'));
const CookieSettingsModal = lazy(() => import('./components/CookieSettingsModal'));
const BetaNoticeModal = lazy(() => import('./components/BetaNoticeModal'));
const ReportCardStudent = lazy(() => import('./components/ReportCardStudent'));
const ReportCardAdmin = lazy(() => import('./components/ReportCardAdmin'));
const WordOfTheDay = lazy(() => import('./components/WordOfTheDay'));
const WOTDHub = lazy(() => import('./components/WOTDHub'));
const UnsubscribePage = lazy(() => import('./components/UnsubscribePage'));
import { initializeClarity, identifyClarityUser, setClarityTag, trackClarityEvent, upgradeClaritySession } from './utils/clarity';
import { useSupabaseProgress } from './contexts/SupabaseProgressContext';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useAuth } from './hooks/useAuth';
import { useSupabaseClient } from './hooks/useSupabaseClient';
import { useNavigation } from './hooks/useNavigation';
import { useAdmin } from './hooks/useAdmin';
import { useModuleCompletion } from './hooks/useModuleCompletion';
import { lessons } from './lessons/lessonData';
import { markBetaWelcomeAsSeen } from './utils/betaWelcomeTracking';
import { resetWelcomeFlags } from './utils/resetWelcomeFlags';
import './styles/App.css';
import './styles/Auth.css';
import './styles/OfflineIndicator.css';
import './styles/DevMode.css';
import './styles/DashboardHeader.css';
import './styles/ReferenceModules.css';
import { logger } from "./utils/logger";

function App() {
  // Check if we're in dev mode
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  // Determine if words learned button should be visible (always visible now)
  const showWordsLearned = true;

  // Cookie settings modal state
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [forceShowBanner, setForceShowBanner] = useState(false);

  // Beta notice modal state
  const [showBetaNotice, setShowBetaNotice] = useState(false);

  // Get auth info
  const { user, supabaseUser } = useAuth();
  const supabaseClient = useSupabaseClient();

  // Check URL params for special pages
  const urlParams = new URLSearchParams(window.location.search);
  const isWordOfTheDay = urlParams.get('wotd') || urlParams.get('word-of-the-day');
  const isUnsubscribe = urlParams.get('unsubscribe');
  
  // Unsubscribe page (standalone, no auth required)
  if (isUnsubscribe !== null) {
    return (
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <UnsubscribePage />
      </Suspense>
    );
  }
  
  // Word of the Day hub (standalone, no auth required)
  if (isWordOfTheDay) {
    return (
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <WOTDHub />
      </Suspense>
    );
  }

  // Supabase progress tracking (works in both dev and production mode)
  const supabaseProgress = useSupabaseProgress();
  const offlineSync = useOfflineSync();

  // Use Supabase data in both modes (with safe defaults)
  const completedExercises = supabaseProgress?.completedExercises || new Set();
  const isAuthenticated = supabaseProgress?.isAuthenticated || false;

  // Custom hooks for different concerns
  const navigation = useNavigation();
  const admin = useAdmin();
  const moduleCompletion = useModuleCompletion();

  // Identify user in Clarity when authenticated
  useEffect(() => {
    if (!isAuthenticated || !supabaseUser) return;
    
    // Identify user with their Supabase ID
    const userId = supabaseUser.id;
    const email = supabaseUser.email || 'unknown';
    const friendlyName = email.split('@')[0]; // Use email username as friendly name
    
    identifyClarityUser(userId, null, null, friendlyName);
    
    // Set custom tags for user segmentation
    setClarityTag('userType', supabaseUser.role || 'student');
    setClarityTag('hasSeenBetaWelcome', supabaseUser.has_seen_beta_welcome ? 'yes' : 'no');
  }, [isAuthenticated, supabaseUser]);

  // Track navigation to special views in Clarity
  useEffect(() => {
    if (!navigation.currentLesson) return;
    
    if (navigation.currentLesson === 'vocabulary') {
      trackClarityEvent('vocabularyDashboardOpened');
      setClarityTag('currentView', 'vocabulary');
      upgradeClaritySession('vocabulary dashboard access');
    } else if (navigation.currentLesson === 'reference') {
      trackClarityEvent('referenceModulesOpened');
      setClarityTag('currentView', 'reference');
    } else if (navigation.currentLesson === 'dictionary') {
      trackClarityEvent('dictionaryOpened');
      setClarityTag('currentView', 'dictionary');
    } else if (navigation.currentLesson === 'report-card') {
      trackClarityEvent('reportCardOpened');
      setClarityTag('currentView', 'reportCard');
    } else if (navigation.currentLesson === 'report-card-admin') {
      trackClarityEvent('reportCardAdminOpened');
      setClarityTag('currentView', 'reportCardAdmin');
    }
  }, [navigation.currentLesson]);

  // Track feedback form opens
  useEffect(() => {
    if (navigation.showFeedbackForm) {
      trackClarityEvent('feedbackFormOpened');
      upgradeClaritySession('feedback form opened');
    }
  }, [navigation.showFeedbackForm]);

  // Check if beta welcome modal should be shown
  useEffect(() => {
    // Always allow URL parameter override for testing
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pilotwelcome') === 'true') {
      setShowBetaNotice(true);
      return;
    }

    // Only show in production mode
    if (isDevMode) {
      return;
    }

    // Only show for authenticated users
    if (!isAuthenticated || !supabaseUser || !supabaseClient) {
      return;
    }

    // Only show if they have NOT seen the pilot welcome message before
    if (supabaseUser.has_seen_beta_welcome === true) {
      return;
    }

    // All criteria met - show the beta welcome modal
    setShowBetaNotice(true);
  }, [isAuthenticated, supabaseUser, supabaseClient, isDevMode]);

  // Exercise completion handler
  const handleExerciseComplete = async (exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent = 0, hintUsed = false, isCorrect = null) => {
    if (!isAuthenticated) {
      logger.log('Exercise completed but user not authenticated');
      return;
    }

    try {
      // Complete exercise in Supabase (works in both dev and production mode)
      if (!supabaseProgress) return false;
      const result = await supabaseProgress.completeExercise(
        exerciseId,
        moduleId,
        unitId,
        userAnswer,
        correctAnswer,
        timeSpent,
        hintUsed,
        isCorrect  // Pass through the test runner's result
      );

      // Analytics tracking is handled by AuthWrapper

      return result;
    } catch (error) {
      logger.error('Error completing exercise:', error);
      return false;
    }
  };

  // Module completion handler using the hook
  const handleModuleComplete = async (moduleId, examScore, timeSpent, goToNext = false) => {
    await moduleCompletion.handleModuleComplete(
      moduleId,
      examScore,
      timeSpent,
      goToNext,
      completedExercises,
      navigation.setCurrentLesson,
      navigation.urlManager
    );
  };

  // Admin: Reset welcome flags to simulate first-time experience
  const handleResetWelcomeFlags = async () => {
    if (!isAuthenticated || !supabaseUser || !supabaseClient) {
      logger.error('Cannot reset welcome flags: User not authenticated');
      return;
    }

    const confirmed = window.confirm(
      'Reset welcome screens to simulate first-time experience?\n\n' +
      'This will:\n' +
      '• Show the welcome screen again\n' +
      '• Show the pilot welcome modal again\n\n' +
      'Your progress will NOT be affected.'
    );

    if (!confirmed) return;

    const success = await resetWelcomeFlags(supabaseClient, supabaseUser);

    if (success) {
      // Reload page to show welcome screen
      window.location.reload();
    } else {
      alert('Failed to reset welcome flags. Please try again.');
    }
  };

  // Wrap content in DevModeWrapper if in dev mode
  const content = (
    <div className="app">
      <header className="app-header">
        <button
          className="mobile-menu-btn"
          onClick={() => navigation.setMobileNavOpen(!navigation.mobileNavOpen)}
          title="Toggle navigation menu"
        >
          ☰
        </button>
        <h1
          className="app-logo"
          onClick={navigation.handleBackToLanding}
          style={{ cursor: 'pointer' }}
          title="Back to landing page"
        >
          <img src="/img/logov2.png" alt="" className="app-logo-icon" />
          Language Academy
        </h1>
      </header>

      <LeftNav
        lessons={lessons}
        currentLesson={navigation.currentLesson}
        onLessonSelect={navigation.handleLessonSelect}
        completedExercises={completedExercises}
        isCollapsed={navigation.sidebarCollapsed}
        onToggleCollapse={() => navigation.setSidebarCollapsed(!navigation.sidebarCollapsed)}
        mobileNavOpen={navigation.mobileNavOpen}
        onCloseMobileNav={() => navigation.setMobileNavOpen(false)}
      />

      <main className="app-main">
        {navigation.showCommunicationAdmin ? (
          <div className="communication-admin-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading communication admin...</div>}>
              <CommunicationAdmin />
            </Suspense>
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            <button
              className="admin-close-btn"
              onClick={navigation.handleCloseCommunicationAdmin}
              title="Close Communication Admin"
            >
              ← Back to Lessons
            </button>
          </div>
        ) : navigation.showFeedbackAdmin ? (
          <div className="feedback-admin-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading admin panel...</div>}>
              <FeedbackAdmin onFeedbackChange={admin.refreshFeedbackCount} />
            </Suspense>
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            <button
              className="admin-close-btn"
              onClick={navigation.handleCloseAdmin}
              title="Close Admin"
            >
              ← Back to Lessons
            </button>
          </div>
        ) : navigation.currentLesson === 'report-card' ? (
          <div className="main-content-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading report card...</div>}>
              <ReportCardStudent onBack={navigation.handleBack} />
            </Suspense>
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
          </div>
        ) : navigation.currentLesson === 'report-card-admin' ? (
          <div className="main-content-wrapper">
            {admin.isAdmin ? (
              <Suspense fallback={<div className="loading-spinner">Loading admin dashboard...</div>}>
                <ReportCardAdmin onBack={navigation.handleBack} />
              </Suspense>
            ) : (
              <div className="error-screen">
                <h2>⚠️ Access Denied</h2>
                <p>You do not have permission to view this page.</p>
                <button onClick={navigation.handleBack}>Go Back</button>
              </div>
            )}
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
          </div>
        ) : navigation.currentLesson === 'reference' ? (
          <div className="main-content-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading reference modules...</div>}>
              <ReferenceModules
                onModuleSelect={navigation.handleLessonSelect}
                onBack={navigation.handleBack}
              />
            </Suspense>
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
          </div>
        ) : navigation.currentLesson === 'vocabulary' ? (
          <div className="main-content-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading vocabulary dashboard...</div>}>
              <VocabularyDashboard completedExercises={completedExercises} />
            </Suspense>
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
          </div>
        ) : navigation.currentLesson === 'dictionary' ? (
          <div className="main-content-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading dictionary...</div>}>
              <DictionaryModal
                isOpen={true}
                onClose={navigation.handleCloseDictionary}
              />
            </Suspense>
          </div>
        ) : navigation.currentLesson === 'word-of-the-day' ? (
          <div className="main-content-wrapper">
            <Suspense fallback={<div className="loading-spinner">Loading word of the day...</div>}>
              <WOTDHub />
            </Suspense>
          </div>
        ) : !navigation.currentLesson ? (
          <div className="main-content-wrapper">
            <LessonList
              lessons={lessons}
              onLessonSelect={navigation.handleLessonSelect}
              completedExercises={completedExercises}
              onShowReferenceModules={navigation.handleShowReferenceModules}
              onShowVocabularyDashboard={navigation.handleShowVocabularyDashboard}
              onShowReportCard={navigation.handleShowReportCard}
              showWordsLearned={showWordsLearned}
              isAdmin={admin.isAdmin}
            />
            <button
              className="feedback-fab"
              onClick={() => navigation.setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            {!navigation.currentLesson && (
              <AdminButtons
                key="modules-page-admin-buttons"
                isAdmin={admin.isAdmin}
                newFeedbackCount={admin.newFeedbackCount}
                onResetWelcome={handleResetWelcomeFlags}
                onShowReportCardAdmin={navigation.handleShowReportCardAdmin}
                onShowFeedbackAdmin={navigation.handleShowAdmin}
                onShowCommunicationAdmin={navigation.handleShowCommunicationAdmin}
              />
            )}
          </div>
        ) : (
          (() => {
            const lesson = lessons.find(l => l.id === navigation.currentLesson);
            if (!lesson) {
              return (
                <div className="error-screen">
                  <h2>⚠️ Module Not Found</h2>
                  <p>Could not find module with ID: {navigation.currentLesson}</p>
                </div>
              );
            }
            const unitInfo = moduleCompletion.getUnitForLesson(lesson.id);
            return (
              <div className="lesson-content-wrapper">
                <LessonView
                  key={lesson.id}
                  lesson={lesson}
                  unitInfo={unitInfo}
                  onBack={navigation.handleBack}
                  completedExercises={completedExercises}
                  onExerciseComplete={handleExerciseComplete}
                  onModuleComplete={handleModuleComplete}
                  totalModules={lessons.length}
                />
                <button
                  className="feedback-fab"
                  onClick={() => navigation.setShowFeedbackForm(true)}
                  title="Give Early Feedback"
                >
                  💬
                </button>
              </div>
            );
          })()
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with love • Inspired by cognitive science research
          {' • '}
          <button
            onClick={() => setForceShowBanner(true)}
            className="cookie-manage-link"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              padding: 0,
              margin: 0
            }}
          >
            Manage Cookies
          </button>
          {' • '}
          <a 
            href="mailto:support@languageacademy.io"
            style={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Contact
          </a>
        </p>
      </footer>

      <SafariTTSHelper />
      {!isDevMode && <OfflineIndicator />}

      {navigation.showFeedbackForm && (
        <Suspense fallback={null}>
          <FeedbackForm
            isOpen={navigation.showFeedbackForm}
            onClose={() => navigation.setShowFeedbackForm(false)}
          />
        </Suspense>
      )}

      <CookieBanner
        onConsent={(accepted) => {
          if (accepted) {
            initializeClarity();
          }
          setForceShowBanner(false);
        }}
        onShowDetails={() => setShowCookieModal(true)}
        forceShow={forceShowBanner}
        supabaseClient={supabaseClient}
        supabaseUser={supabaseUser}
        key={forceShowBanner ? 'force-show' : 'normal'}
      />

      {showCookieModal && (
        <Suspense fallback={null}>
          <CookieSettingsModal
            isOpen={showCookieModal}
            onClose={() => setShowCookieModal(false)}
            onConsentChange={(accepted) => {
              if (accepted) {
                initializeClarity();
              }
              // Close the banner when consent is saved via modal
              setForceShowBanner(false);
            }}
            supabaseClient={supabaseClient}
            supabaseUser={supabaseUser}
          />
        </Suspense>
      )}

      {showBetaNotice && (
        <Suspense fallback={null}>
          <BetaNoticeModal
            isOpen={showBetaNotice}
            onClose={async () => {
              setShowBetaNotice(false);
              // Remove pilotwelcome query parameter from URL
              const urlParams = new URLSearchParams(window.location.search);
              if (urlParams.get('pilotwelcome') === 'true') {
                urlParams.delete('pilotwelcome');
                const newUrl = new URL(window.location);
                newUrl.search = urlParams.toString();
                window.history.replaceState({}, '', newUrl);
              }
              // Mark beta welcome as seen in database for authenticated users
              if (isAuthenticated && supabaseUser && supabaseClient) {
                await markBetaWelcomeAsSeen(supabaseClient, supabaseUser);
              }
            }}
          />
        </Suspense>
      )}
    </div>
  );

  return isDevMode ? (
    <DevModeWrapper>{content}</DevModeWrapper>
  ) : (
    <AuthWrapper 
      onBackToLanding={navigation.handleBackToLanding} 
      onOpenDictionary={navigation.handleOpenDictionary}
      onShowReportCard={navigation.handleShowReportCard}
    >
      {content}
    </AuthWrapper>
  );
}

export default App;
