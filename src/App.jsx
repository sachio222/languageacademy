import { useState, useEffect } from 'react';
import AuthWrapper from './components/AuthWrapper';
import DevModeWrapper from './components/DevModeWrapper';
import LeftNav from './components/LeftNav';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import ReferenceModules from './components/ReferenceModules';
import VocabularyDashboard from './components/VocabularyDashboard';
import DictionaryModal from './components/DictionaryModal';
import SafariTTSHelper from './components/SafariTTSHelper';
import OfflineIndicator from './components/OfflineIndicator';
import FeedbackForm from './components/FeedbackForm';
import FeedbackAdmin from './components/FeedbackAdmin';
import { useSupabaseProgress } from './contexts/SupabaseProgressContext';
import { useAnalytics } from './hooks/useAnalytics';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useAuth } from './hooks/useAuth';
import { lessons, unitStructure } from './lessons/lessonData';
import { extractModuleId, extractUnitId, LocalStorageManager } from './utils/progressSync';
import './styles/App.css';
import './styles/Auth.css';
import './styles/OfflineIndicator.css';
import './styles/DevMode.css';
import './styles/DashboardHeader.css';
import './styles/ReferenceModules.css';

function App() {
  // Initialize currentLesson from URL query string with validation
  const getInitialLesson = () => {
    const params = new URLSearchParams(window.location.search);
    const moduleParam = params.get('module');
    const referenceParam = params.get('reference');
    const vocabularyParam = params.get('vocabulary');
    const dictionaryParam = params.get('dictionary');

    if (referenceParam === 'true') {
      return 'reference';
    }

    if (vocabularyParam === 'true') {
      return 'vocabulary';
    }

    if (dictionaryParam === 'true') {
      return 'dictionary';
    }

    if (moduleParam) {
      const moduleId = parseInt(moduleParam, 10);
      // Validate: must be a valid number and module must exist
      if (!isNaN(moduleId) && moduleId > 0 && lessons.find(l => l.id === moduleId)) {
        return moduleId;
      }
      // Invalid module param - clean slate
      const url = new URL(window.location);
      url.searchParams.delete('module');
      url.searchParams.delete('view');
      url.searchParams.delete('exercise');
      url.searchParams.delete('sentence');
      url.searchParams.delete('question');
      url.searchParams.delete('section');
      url.searchParams.delete('reference');
      window.history.replaceState({}, '', url);
    }
    return null;
  };

  const [currentLesson, setCurrentLesson] = useState(getInitialLesson);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === 'true';
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showReferenceModules, setShowReferenceModules] = useState(false);

  // Check if we're in dev mode
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  // Get auth info for admin access control
  const { user, supabaseUser, supabaseClient } = useAuth();

  // Supabase progress tracking (works in both dev and production mode)
  const supabaseProgress = useSupabaseProgress();
  const analytics = useAnalytics();
  const offlineSync = useOfflineSync();

  // Track new feedback count for admin badge
  const [newFeedbackCount, setNewFeedbackCount] = useState(0);

  // Use Supabase data in both modes (with safe defaults)
  const completedExercises = supabaseProgress?.completedExercises || new Set();
  const isAuthenticated = supabaseProgress?.isAuthenticated || false;

  // Admin access control - only allow specific user
  const ADMIN_CLERK_USER_ID = 'user_33nSyBPwjQvGcy5w9GJgCyK5KY0';
  const ADMIN_SUPABASE_USER_ID = '35e33bec-de10-4d70-86a3-c992fc7655dc';

  const isAdmin = user?.id === ADMIN_CLERK_USER_ID || supabaseUser?.id === ADMIN_SUPABASE_USER_ID;

  // Function to refresh feedback count (can be called from admin panel)
  const refreshFeedbackCount = async () => {
    if (!isAdmin || !supabaseClient) return;

    try {
      const { count, error } = await supabaseClient
        .from('feedback')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      if (!error) {
        setNewFeedbackCount(count || 0);
      }
    } catch (error) {
      console.error('Error fetching feedback count:', error);
    }
  };

  // Fetch new feedback count for admin badge
  useEffect(() => {
    if (!isAdmin || !supabaseClient) return;
    let cancelled = false;

    const fetchNewFeedbackCount = async () => {
      try {
        const { count, error } = await supabaseClient
          .from('feedback')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        if (!cancelled && !error) {
          setNewFeedbackCount(count || 0);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching feedback count:', error);
        }
      }
    };

    fetchNewFeedbackCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchNewFeedbackCount, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isAdmin, supabaseClient]);

  // Handle browser back/forward buttons with validation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const moduleParam = params.get('module');
      const referenceParam = params.get('reference');
      const adminParam = params.get('admin');

      // Handle admin parameter
      setShowFeedbackAdmin(adminParam === 'true');

      if (referenceParam === 'true') {
        setCurrentLesson('reference');
      } else if (moduleParam) {
        const moduleId = parseInt(moduleParam, 10);
        // Validate module exists
        if (!isNaN(moduleId) && moduleId > 0 && lessons.find(l => l.id === moduleId)) {
          setCurrentLesson(moduleId);
        } else {
          // Invalid module - go to module list and clean slate
          setCurrentLesson(null);
          const url = new URL(window.location);
          url.searchParams.delete('module');
          url.searchParams.delete('view');
          url.searchParams.delete('exercise');
          url.searchParams.delete('sentence');
          url.searchParams.delete('question');
          url.searchParams.delete('section');
          url.searchParams.delete('reference');
          window.history.replaceState({}, '', url);
        }
      } else {
        setCurrentLesson(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Helper function to get unit info for a lesson
  const getUnitForLesson = (lessonId) => {
    return unitStructure.find(unit => {
      const [start, end] = unit.lessonRange;
      return lessonId >= start && lessonId <= end;
    });
  };

  const handleLessonSelect = (lessonId) => {
    setCurrentLesson(lessonId);

    // Clean slate: set new module and clear all module-specific params
    const url = new URL(window.location);
    url.searchParams.set('module', lessonId);
    url.searchParams.delete('view');
    url.searchParams.delete('exercise');
    url.searchParams.delete('sentence');   // fill-in-blank
    url.searchParams.delete('question');   // module exam
    url.searchParams.delete('section');    // unit exam
    window.history.pushState({}, '', url);

    window.scrollTo(0, 0);

    // Track module visit for analytics
    if (isAuthenticated) {
      analytics.trackModuleVisit(extractModuleId({ id: lessonId }));
    }
  };

  const handleBack = () => {
    setCurrentLesson(null);

    // Clean slate: clear all query params when returning to module list
    const url = new URL(window.location);
    url.searchParams.delete('module');
    url.searchParams.delete('view');
    url.searchParams.delete('exercise');
    url.searchParams.delete('sentence');
    url.searchParams.delete('question');
    url.searchParams.delete('section');
    url.searchParams.delete('reference');
    window.history.pushState({}, '', url);
  };

  const handleShowReferenceModules = () => {
    setCurrentLesson('reference');
    const url = new URL(window.location);
    url.searchParams.set('reference', 'true');
    url.searchParams.delete('module');
    url.searchParams.delete('view');
    url.searchParams.delete('exercise');
    url.searchParams.delete('sentence');
    url.searchParams.delete('question');
    url.searchParams.delete('section');
    window.history.pushState({}, '', url);
  };

  const handleShowVocabularyDashboard = () => {
    setCurrentLesson('vocabulary');
    const url = new URL(window.location);
    url.searchParams.set('vocabulary', 'true');
    url.searchParams.delete('module');
    url.searchParams.delete('view');
    url.searchParams.delete('exercise');
    url.searchParams.delete('sentence');
    url.searchParams.delete('question');
    url.searchParams.delete('section');
    url.searchParams.delete('reference');
    window.history.pushState({}, '', url);
  };

  const handleBackToLanding = () => {
    setCurrentLesson(null);

    // Clean slate: clear all query params when returning to module list
    const url = new URL(window.location);
    url.searchParams.delete('module');
    url.searchParams.delete('view');
    url.searchParams.delete('exercise');
    url.searchParams.delete('sentence');
    url.searchParams.delete('question');
    url.searchParams.delete('section');
    window.history.pushState({}, '', url);
  };

  const handleExerciseComplete = async (exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent = 0, hintUsed = false, isCorrect = null) => {
    if (!isAuthenticated) {
      console.log('Exercise completed but user not authenticated');
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

      // Track analytics
      await analytics.trackExerciseAttempt(exerciseId, result);

      if (timeSpent > 0) {
        await analytics.updateStudyTime(timeSpent);
      }

      return result;
    } catch (error) {
      console.error('Error completing exercise:', error);
      return false;
    }
  };

  const handleModuleComplete = async (moduleId, examScore, timeSpent, goToNext = false) => {
    console.log('Module complete - moduleId:', moduleId, 'type:', typeof moduleId, 'score:', examScore, 'goToNext:', goToNext);
    console.log('[DEBUG] handleModuleComplete called!');

    if (!moduleId) {
      console.error('handleModuleComplete called with null/undefined moduleId');
      return;
    }

    if (isAuthenticated && supabaseProgress) {
      try {
        const lesson = lessons.find(l => l.id === moduleId);
        const unitInfo = getUnitForLesson(moduleId);

        console.log('[DEBUG] Found lesson:', lesson ? lesson.title : 'NOT FOUND');
        console.log('[DEBUG] Found unitInfo:', unitInfo ? unitInfo.title : 'NOT FOUND');
        console.log('[DEBUG] lesson.isUnitExam:', lesson?.isUnitExam);

        if (lesson && unitInfo) {
          // Debug logging for unit exams
          if (lesson.isUnitExam) {
            console.log(`[DEBUG] Unit exam completion - moduleId: ${moduleId}`);
            console.log(`[DEBUG] lesson.exercises?.length:`, lesson.exercises?.length);
            console.log(`[DEBUG] lesson.exerciseConfig?.items?.length:`, lesson.exerciseConfig?.items?.length);
            console.log(`[DEBUG] lesson.isUnitExam:`, lesson.isUnitExam);
            console.log(`[DEBUG] examScore:`, examScore);
          }

          // For unit exams, use the actual exercise count from exerciseConfig if exercises array is empty
          // For help modules, use 1 as the exercise count for completion purposes
          const isUnitExam = lesson.isUnitExam;
          const isHelpModule = lesson.isHelpModule;

          let actualExerciseCount;
          if (isHelpModule) {
            actualExerciseCount = 1; // Help modules are considered "1 exercise" for completion
          } else if (isUnitExam && (!lesson.exercises || lesson.exercises.length === 0)) {
            actualExerciseCount = lesson.exerciseConfig?.items?.length || 0;
          } else {
            actualExerciseCount = lesson.exercises?.length || 0;
          }

          if (lesson.isUnitExam) {
            console.log(`[DEBUG] Using actualExerciseCount: ${actualExerciseCount}`);
          }

          // Update module progress
          await supabaseProgress.updateModuleProgress(
            extractModuleId(lesson),
            extractUnitId(unitInfo),
            actualExerciseCount,
            actualExerciseCount, // All exercises completed
            true, // Study mode completed
            examScore,
            timeSpent
          );

          // Update unit progress
          const unitLessons = lessons.filter(l => {
            const [start, end] = unitInfo.lessonRange;
            return l.id >= start && l.id <= end;
          });

          const completedCount = unitLessons.filter(l => {
            const completed = l.exercises.filter(ex => completedExercises.has(ex.id)).length;
            return completed === l.exercises.length;
          }).length;

          await supabaseProgress.updateUnitProgress(
            extractUnitId(unitInfo),
            unitInfo.title,
            unitLessons.length,
            completedCount + 1 // Include the just-completed module
          );
        }
      } catch (error) {
        console.error('Error updating module progress:', error);
      }
    }

    if (goToNext) {
      console.log('goToNext is true, finding next module after:', moduleId);

      // Go to next module - find the next lesson in sequence
      const currentIndex = lessons.findIndex(l => l.id === moduleId);
      console.log('Current module index in lessons array:', currentIndex, 'Total lessons:', lessons.length);

      if (currentIndex === -1) {
        console.error('Current module not found in lessons array. moduleId:', moduleId, 'Type:', typeof moduleId);
        console.error('Available lesson IDs:', lessons.map(l => l.id));
        alert('Error: Could not find current module. Returning to module list.');
        setCurrentLesson(null);

        // Clean slate: clear all params
        const url = new URL(window.location);
        url.searchParams.delete('module');
        url.searchParams.delete('view');
        url.searchParams.delete('exercise');
        url.searchParams.delete('sentence');
        url.searchParams.delete('question');
        url.searchParams.delete('section');
        window.history.pushState({}, '', url);

        return;
      }

      const nextModule = lessons[currentIndex + 1];
      console.log('Next module:', nextModule ? `ID ${nextModule.id} - ${nextModule.title}` : 'NONE (end of lessons)');

      if (nextModule && nextModule.id) {
        console.log('✓ Navigating from module', moduleId, 'to', nextModule.id);
        setCurrentLesson(nextModule.id);

        // Clean slate: set new module and clear all module-specific params
        const url = new URL(window.location);
        url.searchParams.set('module', nextModule.id);
        url.searchParams.delete('view');
        url.searchParams.delete('exercise');
        url.searchParams.delete('sentence');
        url.searchParams.delete('question');
        url.searchParams.delete('section');
        window.history.pushState({}, '', url);

        window.scrollTo(0, 0);

        // Track analytics for new module
        if (isAuthenticated) {
          analytics.trackModuleVisit(extractModuleId(nextModule));
        }
      } else {
        // No more modules - completed all!
        console.log('Completed all modules!');
        alert('🎉 Congratulations! You\'ve completed all available modules!');
        setCurrentLesson(null);

        // Clean slate: clear all params
        const url = new URL(window.location);
        url.searchParams.delete('module');
        url.searchParams.delete('view');
        url.searchParams.delete('exercise');
        url.searchParams.delete('sentence');
        url.searchParams.delete('question');
        url.searchParams.delete('section');
        window.history.pushState({}, '', url);

        window.scrollTo(0, 0);
      }
    }
  };


  // Wrap content in DevModeWrapper if in dev mode
  const content = (
    <div className="app">
      <header className="app-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          title="Toggle navigation menu"
        >
          ☰
        </button>
        <h1
          className="app-logo"
          onClick={handleBackToLanding}
          style={{ cursor: 'pointer' }}
          title="Back to landing page"
        >
          🎓 Language Academy
        </h1>
      </header>

      <LeftNav
        lessons={lessons}
        currentLesson={currentLesson}
        onLessonSelect={handleLessonSelect}
        completedExercises={completedExercises}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileNavOpen={mobileNavOpen}
        onCloseMobileNav={() => setMobileNavOpen(false)}
      />

      <main className="app-main">
        {showFeedbackAdmin ? (
          <div className="feedback-admin-wrapper">
            <FeedbackAdmin onFeedbackChange={refreshFeedbackCount} />
            <button
              className="feedback-fab"
              onClick={() => setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            <button
              className="admin-close-btn"
              onClick={() => {
                setShowFeedbackAdmin(false);
                const url = new URL(window.location);
                url.searchParams.delete('admin');
                window.history.pushState({}, '', url);
              }}
              title="Close Admin"
            >
              ← Back to Lessons
            </button>
          </div>
        ) : currentLesson === 'reference' ? (
          <div className="main-content-wrapper">
            <ReferenceModules
              onModuleSelect={handleLessonSelect}
              onBack={handleBack}
            />
            <button
              className="feedback-fab"
              onClick={() => setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            {isAdmin && (
              <button
                className="admin-btn"
                onClick={() => setShowAdmin(true)}
                title="Admin Panel"
              >
                ⚙️
              </button>
            )}
          </div>
        ) : currentLesson === 'vocabulary' ? (
          <div className="main-content-wrapper">
            <VocabularyDashboard completedExercises={completedExercises} />
            <button
              className="feedback-fab"
              onClick={() => setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            {isAdmin && (
              <button
                className="admin-btn"
                onClick={() => {
                  setShowFeedbackAdmin(true);
                  const url = new URL(window.location);
                  url.searchParams.set('admin', 'true');
                  window.history.pushState({}, '', url);
                }}
                title="View Feedback Admin"
              >
                📊
                {newFeedbackCount > 0 && (
                  <span className="admin-badge">{newFeedbackCount}</span>
                )}
              </button>
            )}
          </div>
        ) : currentLesson === 'dictionary' ? (
          <div className="main-content-wrapper">
            <DictionaryModal
              isOpen={true}
              onClose={() => {
                const url = new URL(window.location);
                url.searchParams.delete('dictionary');
                url.searchParams.delete('word');
                window.history.pushState({}, '', url);
                setCurrentLesson(null);
              }}
            />
          </div>
        ) : !currentLesson ? (
          <div className="main-content-wrapper">
            <LessonList
              lessons={lessons}
              onLessonSelect={handleLessonSelect}
              completedExercises={completedExercises}
              onShowReferenceModules={handleShowReferenceModules}
              onShowVocabularyDashboard={handleShowVocabularyDashboard}
            />
            <button
              className="feedback-fab"
              onClick={() => setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            {isAdmin && (
              <button
                className="admin-btn"
                onClick={() => {
                  setShowFeedbackAdmin(true);
                  const url = new URL(window.location);
                  url.searchParams.set('admin', 'true');
                  window.history.pushState({}, '', url);
                }}
                title="View Feedback Admin"
              >
                📊
                {newFeedbackCount > 0 && (
                  <span className="admin-badge">{newFeedbackCount}</span>
                )}
              </button>
            )}
          </div>
        ) : (
          (() => {
            const lesson = lessons.find(l => l.id === currentLesson);
            if (!lesson) {
              return (
                <div className="error-screen">
                  <h2>⚠️ Module Not Found</h2>
                  <p>Could not find module with ID: {currentLesson}</p>
                </div>
              );
            }
            const unitInfo = getUnitForLesson(lesson.id);
            return (
              <div className="lesson-content-wrapper">
                <LessonView
                  key={lesson.id}
                  lesson={lesson}
                  unitInfo={unitInfo}
                  onBack={handleBack}
                  completedExercises={completedExercises}
                  onExerciseComplete={handleExerciseComplete}
                  onModuleComplete={handleModuleComplete}
                  totalModules={lessons.length}
                />
                <button
                  className="feedback-fab"
                  onClick={() => setShowFeedbackForm(true)}
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
        <p>Built with love • Inspired by cognitive science research  • Grammar Linting Enabled</p>
      </footer>

      <SafariTTSHelper />
      {!isDevMode && <OfflineIndicator />}

      <FeedbackForm
        isOpen={showFeedbackForm}
        onClose={() => setShowFeedbackForm(false)}
      />
    </div>
  );

  return isDevMode ? (
    <DevModeWrapper>{content}</DevModeWrapper>
  ) : (
    <AuthWrapper onBackToLanding={handleBackToLanding}>{content}</AuthWrapper>
  );
}

export default App;


