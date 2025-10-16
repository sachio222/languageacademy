import { useState, useEffect } from 'react';
import AuthWrapper from './components/AuthWrapper';
import DevModeWrapper from './components/DevModeWrapper';
import LeftNav from './components/LeftNav';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
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

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Check if we're in dev mode
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  // Get auth info for admin access control
  const { user, supabaseUser } = useAuth();

  // Supabase progress tracking (works in both dev and production mode)
  const supabaseProgress = useSupabaseProgress();
  const analytics = useAnalytics();
  const offlineSync = useOfflineSync();

  // Use Supabase data in both modes (with safe defaults)
  const completedExercises = supabaseProgress?.completedExercises || new Set();
  const isAuthenticated = supabaseProgress?.isAuthenticated || false;

  // Admin access control - only allow specific user
  const ADMIN_CLERK_USER_ID = 'user_33nSyBPwjQvGcy5w9GJgCyK5KY0';
  const ADMIN_SUPABASE_USER_ID = '35e33bec-de10-4d70-86a3-c992fc7655dc';

  const isAdmin = user?.id === ADMIN_CLERK_USER_ID || supabaseUser?.id === ADMIN_SUPABASE_USER_ID;

  // Helper function to get unit info for a lesson
  const getUnitForLesson = (lessonId) => {
    return unitStructure.find(unit => {
      const [start, end] = unit.lessonRange;
      return lessonId >= start && lessonId <= end;
    });
  };

  const handleLessonSelect = (lessonId) => {
    setCurrentLesson(lessonId);
    window.scrollTo(0, 0);

    // Track module visit for analytics
    if (isAuthenticated) {
      analytics.trackModuleVisit(extractModuleId({ id: lessonId }));
    }
  };

  const handleBack = () => {
    setCurrentLesson(null);
  };

  const handleBackToLanding = () => {
    setCurrentLesson(null);
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

    if (!moduleId) {
      console.error('handleModuleComplete called with null/undefined moduleId');
      return;
    }

    if (isAuthenticated && supabaseProgress) {
      try {
        const lesson = lessons.find(l => l.id === moduleId);
        const unitInfo = getUnitForLesson(moduleId);

        if (lesson && unitInfo) {
          // Update module progress
          await supabaseProgress.updateModuleProgress(
            extractModuleId(lesson),
            extractUnitId(unitInfo),
            lesson.exercises?.length || 0,
            lesson.exercises?.length || 0, // All exercises completed
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
        return;
      }

      const nextModule = lessons[currentIndex + 1];
      console.log('Next module:', nextModule ? `ID ${nextModule.id} - ${nextModule.title}` : 'NONE (end of lessons)');

      if (nextModule && nextModule.id) {
        console.log('✓ Navigating from module', moduleId, 'to', nextModule.id);
        setCurrentLesson(nextModule.id);
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
            <FeedbackAdmin />
            <button
              className="feedback-fab"
              onClick={() => setShowFeedbackForm(true)}
              title="Give Early Feedback"
            >
              💬
            </button>
            <button
              className="admin-close-btn"
              onClick={() => setShowFeedbackAdmin(false)}
              title="Close Admin"
            >
              ← Back to Lessons
            </button>
          </div>
        ) : !currentLesson ? (
          <div className="main-content-wrapper">
            <LessonList
              lessons={lessons}
              onLessonSelect={handleLessonSelect}
              completedExercises={completedExercises}
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
                onClick={() => setShowFeedbackAdmin(true)}
                title="View Feedback Admin"
              >
                📊
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


