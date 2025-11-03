import { useState, useEffect, Suspense, lazy } from 'react';
import AuthWrapper from './components/AuthWrapper';
import DevModeWrapper from './components/DevModeWrapper';
import LeftNav from './components/LeftNav';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import SafariTTSHelper from './components/SafariTTSHelper';
import OfflineIndicator from './components/OfflineIndicator';
import CookieBanner from './components/CookieBanner';

// Lazy load heavy/conditional components
const ReferenceModules = lazy(() => import('./components/ReferenceModules'));
const VocabularyDashboard = lazy(() => import('./components/VocabularyDashboard'));
const DictionaryModal = lazy(() => import('./components/DictionaryModal'));
const FeedbackForm = lazy(() => import('./components/FeedbackForm'));
const FeedbackAdmin = lazy(() => import('./components/FeedbackAdmin'));
const CookieSettingsModal = lazy(() => import('./components/CookieSettingsModal'));
const BetaNoticeModal = lazy(() => import('./components/BetaNoticeModal'));
import { initializeClarity } from './utils/clarity';
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
        {navigation.showFeedbackAdmin ? (
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
            {admin.isAdmin && (
              <>
                <button
                  className="admin-reset-btn"
                  onClick={handleResetWelcomeFlags}
                  title="Simulate First-Time Experience (Reset Welcome Screens)"
                >
                  🔄
                </button>
                <button
                  className="admin-btn"
                  onClick={navigation.handleShowAdmin}
                  title="Admin Panel"
                >
                  ⚙️
                </button>
              </>
            )}
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
            {admin.isAdmin && (
              <>
                <button
                  className="admin-reset-btn"
                  onClick={handleResetWelcomeFlags}
                  title="Simulate First-Time Experience (Reset Welcome Screens)"
                >
                  🔄
                </button>
                <button
                  className="admin-btn"
                  onClick={navigation.handleShowAdmin}
                  title="View Feedback Admin"
                >
                  📊
                  {admin.newFeedbackCount > 0 && (
                    <span className="admin-badge">{admin.newFeedbackCount}</span>
                  )}
                </button>
              </>
            )}
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
        ) : !navigation.currentLesson ? (
          <div className="main-content-wrapper">
            <LessonList
              lessons={lessons}
              onLessonSelect={navigation.handleLessonSelect}
              completedExercises={completedExercises}
              onShowReferenceModules={navigation.handleShowReferenceModules}
              onShowVocabularyDashboard={navigation.handleShowVocabularyDashboard}
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
            {admin.isAdmin && (
              <>
                <button
                  className="admin-reset-btn"
                  onClick={handleResetWelcomeFlags}
                  title="Simulate First-Time Experience (Reset Welcome Screens)"
                >
                  🔄
                </button>
                <button
                  className="admin-btn"
                  onClick={navigation.handleShowAdmin}
                  title="View Feedback Admin"
                >
                  📊
                  {admin.newFeedbackCount > 0 && (
                    <span className="admin-badge">{admin.newFeedbackCount}</span>
                  )}
                </button>
              </>
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
                {admin.isAdmin && (
                  <>
                    <button
                      className="admin-reset-btn"
                      onClick={handleResetWelcomeFlags}
                      title="Simulate First-Time Experience (Reset Welcome Screens)"
                    >
                      🔄
                    </button>
                    <button
                      className="admin-btn"
                      onClick={navigation.handleShowAdmin}
                      title="View Feedback Admin"
                    >
                      📊
                      {admin.newFeedbackCount > 0 && (
                        <span className="admin-badge">{admin.newFeedbackCount}</span>
                      )}
                    </button>
                  </>
                )}
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
    <AuthWrapper onBackToLanding={navigation.handleBackToLanding} onOpenDictionary={navigation.handleOpenDictionary}>{content}</AuthWrapper>
  );
}

export default App;
