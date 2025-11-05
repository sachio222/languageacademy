import { useState, useEffect, useRef } from 'react';
import ExercisePane from './ExercisePane';
import ConceptPane from './ConceptPane';
import ConceptIntro from './ConceptIntro';
import StudyMode from './StudyMode';
import SpeedMatch from './SpeedMatch';
import VocabularyReference from './VocabularyReference';
import RightSidebar from './RightSidebar';
import ModuleExam from './ModuleExam';
import UnitExam from './UnitExam';
import ModuleCompleteModal from './ModuleCompleteModal';
import FillInTheBlank from './FillInTheBlank';
import PhonicsView from './PhonicsView';
import VerbPatternHelp from './VerbPatternHelp';
import LiaisonHelp from './LiaisonHelp';
import CognatesHelp from './CognatesHelp';
import QuestionsHelp from './QuestionsHelp';
import { extractModuleId, extractUnitId } from '../utils/progressSync';
import { RotateCcw, Award } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { usePageTime } from '../hooks/usePageTime';
import { useModuleTime } from '../hooks/useModuleTime';
import { getUnitIdForLesson } from '../utils/unitHelpers';
import { logger } from "../utils/logger";
import { trackClarityEvent, setClarityTag } from '../utils/clarity';

function LessonView({ lesson, unitInfo, onBack, completedExercises, onExerciseComplete, onModuleComplete, totalModules }) {
  // Helper to get initial exercise index from URL (1-based to 0-based) with validation
  const getInitialExerciseIndex = () => {
    const params = new URLSearchParams(window.location.search);
    const exerciseParam = params.get('exercise');
    if (exerciseParam) {
      const exerciseNum = parseInt(exerciseParam, 10);
      const maxExercises = lesson.exercises?.length || 0;
      // Validate: must be valid number, >= 1, and within bounds
      if (!isNaN(exerciseNum) && exerciseNum >= 1 && exerciseNum <= maxExercises) {
        return exerciseNum - 1; // Convert 1-based to 0-based
      }
      // Invalid exercise - clear from URL
      if (exerciseNum < 1 || exerciseNum > maxExercises) {
        const url = new URL(window.location);
        url.searchParams.delete('exercise');
        window.history.replaceState({}, '', url);
      }
    }
    return 0;
  };

  // Helper to get initial view state from URL with validation
  const getInitialViewState = () => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');

    // Check if this is a special module type that skips intro/study
    const isReading = lesson.skipStudyMode || lesson.isReadingComprehension;
    const isUnitExam = lesson.isUnitExam;
    const isFillInBlank = lesson.isFillInTheBlank;
    const isPhonics = lesson.isPhonicsReference;
    const isHelpModule = lesson.isHelpModule;

    if (isReading || isUnitExam || isFillInBlank || isPhonics || isHelpModule) {
      // Special modules don't use view parameter - clear it if present
      if (view) {
        const url = new URL(window.location);
        url.searchParams.delete('view');
        window.history.replaceState({}, '', url);
      }
      return {
        showIntro: false,
        isStudying: false,
        studyCompleted: true,
        showSpeedMatch: false,
        speedMatchCompleted: true,
        showExam: false
      };
    }

    // Normal modules: validate view parameter
    const validViews = ['intro', 'study', 'speedmatch', 'practice', 'exam'];

    // If view is invalid, clear it and default to intro
    if (view && !validViews.includes(view)) {
      const url = new URL(window.location);
      url.searchParams.delete('view');
      window.history.replaceState({}, '', url);
      return { showIntro: true, isStudying: false, studyCompleted: false, showSpeedMatch: false, speedMatchCompleted: false, showExam: false };
    }

    // Valid views
    switch (view) {
      case 'intro':
        return { showIntro: true, isStudying: false, studyCompleted: false, showSpeedMatch: false, speedMatchCompleted: false, showExam: false };
      case 'study':
        return { showIntro: false, isStudying: true, studyCompleted: false, showSpeedMatch: false, speedMatchCompleted: false, showExam: false };
      case 'speedmatch':
        return { showIntro: false, isStudying: false, studyCompleted: true, showSpeedMatch: true, speedMatchCompleted: false, showExam: false };
      case 'practice':
        return { showIntro: false, isStudying: false, studyCompleted: true, showSpeedMatch: false, speedMatchCompleted: true, showExam: false };
      case 'exam':
        return { showIntro: false, isStudying: false, studyCompleted: true, showSpeedMatch: false, speedMatchCompleted: true, showExam: true };
      default:
        // Default to intro for normal modules
        return { showIntro: true, isStudying: false, studyCompleted: false, showSpeedMatch: false, speedMatchCompleted: false, showExam: false };
    }
  };

  const initialState = getInitialViewState();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(getInitialExerciseIndex);
  const [showIntro, setShowIntro] = useState(initialState.showIntro);
  const [isStudying, setIsStudying] = useState(initialState.isStudying);
  const [studyCompleted, setStudyCompleted] = useState(initialState.studyCompleted);
  const [showSpeedMatch, setShowSpeedMatch] = useState(initialState.showSpeedMatch);
  const [speedMatchCompleted, setSpeedMatchCompleted] = useState(initialState.speedMatchCompleted);
  const [showExam, setShowExam] = useState(initialState.showExam);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [moduleTimeSpent, setModuleTimeSpent] = useState(0);

  // Track page time for study time analytics (global total)
  const pageId = `lesson-${lesson.id}`;
  const { totalTime: pageTime, isTracking } = usePageTime(pageId, true);

  // Track module and unit specific time with proper idle detection
  const moduleId = lesson.id?.toString() || 'unknown';
  const unitId = getUnitIdForLesson(lesson.id);
  const { totalTime: moduleTime, isTracking: isTrackingModule } = useModuleTime(moduleId, unitId, true);

  // Legacy module time tracking (will be removed)
  const moduleStartTimeRef = useRef(Date.now());

  const { supabaseClient, supabaseUser, isAuthenticated, moduleProgress } = useSupabaseProgress();

  if (!lesson) return null;

  const currentExercise = lesson.exercises?.[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (lesson.exercises?.length || 0) - 1;

  // Generate vocabulary reference from lesson
  const vocabularyItems = lesson.vocabularyReference || [];

  // Helper to update URL view parameter
  const updateViewInUrl = (view) => {
    const url = new URL(window.location);
    if (view) {
      url.searchParams.set('view', view);
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState({}, '', url);
  };

  // Helper to update exercise index in URL (0-based to 1-based)
  const updateExerciseInUrl = (exerciseIndex) => {
    const url = new URL(window.location);
    const exerciseNum = exerciseIndex + 1; // Convert 0-based to 1-based
    url.searchParams.set('exercise', exerciseNum);
    window.history.pushState({}, '', url);
  };

  // Wrapper for exercise completion that shows modal when last exercise is completed
  const handleExerciseCompleteWrapper = async (exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent = 0, hintUsed = false, isCorrect = null) => {
    // Call the original completion handler from App
    const wasSuccessful = await onExerciseComplete(exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent, hintUsed, isCorrect);

    // If this was the last exercise AND it was completed successfully, show modal
    if (isLastExercise && wasSuccessful && studyCompleted && !lesson.isFillInTheBlank) {
      // Calculate time spent
      const timeSpentOnModule = Math.round((Date.now() - moduleStartTimeRef.current) / 1000);
      setModuleTimeSpent(timeSpentOnModule);
      setModuleCompleted(true);
    }

    return wasSuccessful;
  };

  const handleNext = () => {
    if (!isLastExercise) {
      const newIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(newIndex);
      updateExerciseInUrl(newIndex);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      const newIndex = currentExerciseIndex - 1;
      setCurrentExerciseIndex(newIndex);
      updateExerciseInUrl(newIndex);
    }
  };

  const handleStartStudying = () => {
    setShowIntro(false);
    setIsStudying(true);
    setCurrentExerciseIndex(0);
    updateViewInUrl('study');
    updateExerciseInUrl(0);
  };

  const handleFinishStudying = () => {
    setIsStudying(false);
    setStudyCompleted(true);

    // Check if module has vocabulary for Speed Match
    if (lesson.vocabularyReference && lesson.vocabularyReference.length >= 4) {
      setShowSpeedMatch(true);
      updateViewInUrl('speedmatch');
    } else {
      // Skip Speed Match if not enough vocabulary
      setSpeedMatchCompleted(true);
      setCurrentExerciseIndex(0);
      updateViewInUrl('practice');
      updateExerciseInUrl(0);
    }
  };

  const handleFinishSpeedMatch = () => {
    setShowSpeedMatch(false);
    setSpeedMatchCompleted(true);
    setCurrentExerciseIndex(0);
    updateViewInUrl('practice');
    updateExerciseInUrl(0);
  };

  const handleSkipStudy = () => {
    setIsStudying(false);
    setStudyCompleted(true);
    setSpeedMatchCompleted(true); // Also skip Speed Match
    setCurrentExerciseIndex(0);
    updateViewInUrl('practice');
    updateExerciseInUrl(0);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
    setIsStudying(false);
    setStudyCompleted(true);
    setCurrentExerciseIndex(0);
    updateViewInUrl('practice');
    updateExerciseInUrl(0);
  };

  const handleBackToLesson = () => {
    setIsStudying(true);
    setStudyCompleted(false);
    setCurrentExerciseIndex(0);
    updateViewInUrl('study');
    updateExerciseInUrl(0);
  };

  const handleBackToConcepts = () => {
    setShowIntro(true);
    setIsStudying(false);
    setStudyCompleted(false);
    setCurrentExerciseIndex(0);
    updateViewInUrl('intro');
    updateExerciseInUrl(0);
  };

  const handleTakeExam = () => {
    setModuleCompleted(false); // Close completion modal
    setShowExam(true);
    updateViewInUrl('exam');
    updateExerciseInUrl(0);
  };

  const handlePassExam = (examScore, timeSpent) => {
    // Module exam passed! Show completion screen
    setModuleCompleted(true);
    setShowExam(false);
    setModuleTimeSpent(timeSpent);
    updateViewInUrl(null); // Clear view when showing completion modal
    updateExerciseInUrl(0);

    // Update database with exam score (time is tracked by useModuleTime)
    if (onModuleComplete) {
      onModuleComplete(lesson.id, examScore, 0, false); // timeSpent = 0, managed by useModuleTime
    }
  };

  const handleRetryLesson = () => {
    setShowExam(false);
    setIsStudying(true);
    setCurrentExerciseIndex(0);
    updateViewInUrl('study');
    updateExerciseInUrl(0);
  };

  const handleRetakeExercises = async () => {
    if (!isAuthenticated || !supabaseUser || !supabaseClient) {
      alert('You must be signed in to reset progress');
      return;
    }

    const confirmed = window.confirm(
      'Reset all answers for this module? You\'ll start fresh and can see the exercises again.'
    );

    if (!confirmed) return;

    try {
      const modId = extractModuleId(lesson);
      // Delete all exercise completions for this module
      const { error } = await supabaseClient
        .from('exercise_completions')
        .delete()
        .eq('user_id', supabaseUser.id)
        .eq('module_id', modId);

      if (error) throw error;

      // Reload page to refresh state
      window.location.reload();
    } catch (err) {
      logger.error('Error resetting module:', err);
      alert('Failed to reset module. Please try again.');
    }
  };

  const handleNextModule = () => {
    if (!lesson || !lesson.id) {
      logger.error('No lesson or lesson ID available');
      return;
    }

    logger.log('handleNextModule - Current lesson ID:', lesson.id, 'Title:', lesson.title);

    if (!onModuleComplete) {
      logger.error('onModuleComplete callback not provided!');
      return;
    }

    // Pass lesson.id explicitly, with goToNext flag
    const currentModuleId = lesson.id;
    logger.log('Calling onModuleComplete with moduleId:', currentModuleId);
    onModuleComplete(currentModuleId, 100, 0, true); // timeSpent = 0, managed by useModuleTime
  };

  const handleResetModule = async () => {
    if (!isAuthenticated || !supabaseUser || !supabaseClient) {
      alert('You must be signed in to reset progress');
      return;
    }

    const confirmed = window.confirm(
      'Reset all progress for this module? This will delete all your answers and you\'ll start fresh.'
    );

    if (!confirmed) return;

    setResetting(true);
    try {
      const modId = extractModuleId(lesson);

      // Delete all exercise completions for this module
      const { error } = await supabaseClient
        .from('exercise_completions')
        .delete()
        .eq('user_id', supabaseUser.id)
        .eq('module_id', modId);

      if (error) throw error;

      // For unit exams, help modules, and fill-in-blank, also clear the module_progress completion
      if (lesson.isUnitExam || lesson.isHelpModule || lesson.isFillInTheBlank) {
        logger.log('[DEBUG] Clearing module completion from module_progress');
        const { error: progressError } = await supabaseClient
          .from('module_progress')
          .delete()
          .eq('user_id', supabaseUser.id)
          .eq('module_id', modId);

        if (progressError) throw progressError;
      }

      // For help modules, also clear concept understanding (the "Understood" checkmarks)
      if (lesson.isHelpModule) {
        logger.log('[DEBUG] Clearing concept understanding for help module');
        const { error: conceptError } = await supabaseClient
          .from('concept_understanding')
          .delete()
          .eq('user_id', supabaseUser.id)
          .eq('module_id', modId);

        if (conceptError) throw conceptError;
      }

      // Reload page to refresh state
      window.location.reload();
    } catch (err) {
      logger.error('Error resetting module:', err);
      alert('Failed to reset module. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  // Handle browser back/forward for view changes within same module
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      const moduleParam = params.get('module');
      const exerciseParam = params.get('exercise');
      const currentModuleId = parseInt(moduleParam, 10);

      // Only handle view changes for current module
      if (currentModuleId === lesson.id) {
        const isReading = lesson.skipStudyMode || lesson.isReadingComprehension;
        const isUnitExam = lesson.isUnitExam;
        const isFillInBlank = lesson.isFillInTheBlank;
        const isPhonics = lesson.isPhonicsReference;

        // Restore exercise index (convert 1-based to 0-based) with validation
        if (exerciseParam) {
          const exerciseNum = parseInt(exerciseParam, 10);
          const maxExercises = lesson.exercises?.length || 0;
          if (!isNaN(exerciseNum) && exerciseNum >= 1 && exerciseNum <= maxExercises) {
            setCurrentExerciseIndex(exerciseNum - 1);
          } else {
            // Invalid exercise number - reset to 0
            setCurrentExerciseIndex(0);
            const url = new URL(window.location);
            url.searchParams.delete('exercise');
            window.history.replaceState({}, '', url);
          }
        } else {
          setCurrentExerciseIndex(0);
        }

        // Skip view changes for special module types
        if (isReading || isUnitExam || isFillInBlank || isPhonics) return;

        // Update view state based on URL
        switch (view) {
          case 'intro':
            setShowIntro(true);
            setIsStudying(false);
            setStudyCompleted(false);
            setShowExam(false);
            break;
          case 'study':
            setShowIntro(false);
            setIsStudying(true);
            setStudyCompleted(false);
            setShowExam(false);
            break;
          case 'practice':
            setShowIntro(false);
            setIsStudying(false);
            setStudyCompleted(true);
            setShowExam(false);
            break;
          case 'exam':
            setShowIntro(false);
            setIsStudying(false);
            setStudyCompleted(true);
            setShowExam(true);
            break;
          default:
            setShowIntro(true);
            setIsStudying(false);
            setStudyCompleted(false);
            setShowExam(false);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lesson.id]);

  // Reset state when lesson changes (new module loads)
  useEffect(() => {
    // Skip EVERYTHING for reading comprehension, unit exams, fill-in-blank, phonics, or help - go straight to content
    const isReading = lesson.skipStudyMode || lesson.isReadingComprehension;
    const isUnitExam = lesson.isUnitExam;
    const isFillInBlank = lesson.isFillInTheBlank;
    const isPhonics = lesson.isPhonicsReference;
    const isHelpModule = lesson.isHelpModule;

    // Get the view from URL to determine initial state
    const params = new URLSearchParams(window.location.search);
    const urlView = params.get('view');
    const urlExercise = params.get('exercise');

    // Determine exercise index from URL (only reset to 0 if not specified)
    let exerciseIndex = 0;
    if (urlExercise) {
      const exerciseNum = parseInt(urlExercise, 10);
      if (!isNaN(exerciseNum) && exerciseNum >= 1) {
        exerciseIndex = exerciseNum - 1; // Convert 1-based to 0-based
      }
    }

    // For special module types, always go straight to practice
    if (isReading || isUnitExam || isFillInBlank || isPhonics || isHelpModule) {
      setShowIntro(false);
      setIsStudying(false);
      setStudyCompleted(true);
      setShowExam(false);
      setModuleCompleted(false);
      setCurrentExerciseIndex(exerciseIndex);
      // Don't update URL for special modules - they don't have views
    } else {
      // Normal modules: use URL view or default to intro
      switch (urlView) {
        case 'intro':
          setShowIntro(true);
          setIsStudying(false);
          setStudyCompleted(false);
          setShowExam(false);
          break;
        case 'study':
          setShowIntro(false);
          setIsStudying(true);
          setStudyCompleted(false);
          setShowExam(false);
          break;
        case 'practice':
          setShowIntro(false);
          setIsStudying(false);
          setStudyCompleted(true);
          setShowExam(false);
          break;
        case 'exam':
          setShowIntro(false);
          setIsStudying(false);
          setStudyCompleted(true);
          setShowExam(true);
          break;
        default:
          // Default to intro
          setShowIntro(true);
          setIsStudying(false);
          setStudyCompleted(false);
          setShowExam(false);
          // Set URL to intro as default
          updateViewInUrl('intro');
      }
      setModuleCompleted(false);
      setCurrentExerciseIndex(exerciseIndex);
    }

    // Reset module start time when lesson changes
    moduleStartTimeRef.current = Date.now();
    
    // Track module view in Clarity
    trackClarityEvent('moduleViewed');
    setClarityTag('currentModule', lesson.title);
    setClarityTag('currentUnit', unitInfo?.title || 'Unknown');
    
    if (isUnitExam) {
      setClarityTag('moduleType', 'unitExam');
    } else if (isReading) {
      setClarityTag('moduleType', 'reading');
    } else if (isFillInBlank) {
      setClarityTag('moduleType', 'fillInBlank');
    } else if (isHelpModule) {
      setClarityTag('moduleType', 'helpModule');
    } else {
      setClarityTag('moduleType', 'standard');
    }
  }, [lesson.id]); // Only run when lesson changes

  // Close modal without navigating
  const handleCloseModal = () => {
    setModuleCompleted(false);
  };

  return (
    <div className="lesson-view">
      {/* Module Complete Modal */}
      {moduleCompleted && (
        <ModuleCompleteModal
          lesson={lesson}
          onNextModule={handleNextModule}
          onBackToModules={onBack}
          onClose={handleCloseModal}
          onTakeExam={handleTakeExam}
          onRetakeExercises={handleRetakeExercises}
          totalModules={totalModules}
          hasNextModule={lesson.id < totalModules}
          timeSpent={moduleTimeSpent}
        />
      )}

      <div className="lesson-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Modules
        </button>
        <div className="lesson-title-container">
          {unitInfo && !unitInfo.isReference && (
            <div className="unit-badge" style={{ borderColor: unitInfo.color, color: unitInfo.color }}>
              {unitInfo.icon} Unit {unitInfo.id}
            </div>
          )}
          <h2 className="lesson-title-desktop">{lesson.title}</h2>
          <h2 className="lesson-title-compact">Module {lesson.id}</h2>
        </div>
        {isAuthenticated && (
          <button
            className="btn-reset-module"
            onClick={handleResetModule}
            disabled={resetting}
            title="Reset all progress for this module"
          >
            <RotateCcw size={14} />
            {resetting ? 'Resetting...' : 'Reset'}
          </button>
        )}
        <div className="exercise-progress">
          {showIntro ? (
            <span>📖 Introduction</span>
          ) : isStudying ? (
            <span>📚 Study Mode</span>
          ) : showExam ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: '#f59e0b' }} />
              Final Exam
            </span>
          ) : moduleCompleted ? (
            <span>✅ Module Complete!</span>
          ) : lesson.isHelpModule ? (
            <span>📚 Help Module</span>
          ) : (
            <span>Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}</span>
          )}
        </div>
      </div>

      {/* Mobile Simplified Header */}
      <div className="lesson-header-mobile">
        <button className="btn-back-mobile" onClick={onBack}>
          Modules
        </button>
        <div className="lesson-title-mobile">
          <h2>Module {lesson.id}</h2>
        </div>
      </div>

      {lesson.isHelpModule ? (
        lesson.moduleKey?.includes('liaison-help') ? (
          <LiaisonHelp
            onComplete={handleNextModule}
            moduleId={lesson.id}
            lesson={lesson}
            onModuleComplete={onModuleComplete}
          />
        ) : lesson.moduleKey?.includes('cognates-help') ? (
          <CognatesHelp
            onComplete={handleNextModule}
            moduleId={lesson.id}
            lesson={lesson}
            onModuleComplete={onModuleComplete}
          />
        ) : lesson.moduleKey?.includes('questions-help') ? (
          <QuestionsHelp
            onComplete={handleNextModule}
            moduleId={lesson.id}
            lesson={lesson}
            onModuleComplete={onModuleComplete}
          />
        ) : (
          <VerbPatternHelp
            onComplete={handleNextModule}
            moduleId={lesson.id}
            lesson={lesson}
            onModuleComplete={onModuleComplete}
          />
        )
      ) : lesson.isPhonicsReference ? (
        <PhonicsView />
      ) : showIntro && !lesson.isReadingComprehension && !lesson.isUnitExam && !lesson.isFillInTheBlank ? (
        <div className="intro-container">
          <div className="intro-skip">
            <button className="btn-skip" onClick={handleSkipIntro}>
              Skip to Practice →
            </button>
          </div>
          <ConceptIntro
            lesson={lesson}
            onStartStudying={handleStartStudying}
          />
        </div>
      ) : lesson.isFillInTheBlank ? (
        <div className="fill-in-blank-container">
          <FillInTheBlank
            module={lesson}
            onComplete={(passed) => {
              if (passed) {
                handleNextModule();
              }
              // User can select another module from sidebar
            }}
            onBack={onBack}
          />
        </div>
      ) : lesson.isUnitExam ? (
        <div className="unit-exam-container">
          <UnitExam
            lesson={lesson}
            unitNumber={lesson.unitNumber}
            onPassExam={() => handleNextModule()}
            onRetryUnit={onBack}
          />
        </div>
      ) : showExam ? (
        <ModuleExam
          lesson={lesson}
          onPassExam={handlePassExam}
          onRetryLesson={handleRetryLesson}
          unitInfo={unitInfo}
        />
      ) : isStudying ? (
        <div className="study-container">
          <div className="study-intro">
            <button className="btn-back-to-concepts" onClick={handleBackToConcepts}>
              ← Back to Concepts
            </button>
            <div className="study-skip-group">
              <button className="btn-skip-small" onClick={handleFinishStudying}>
                ⚡
              </button>
              <button className="btn-skip" onClick={handleSkipStudy}>
                Skip Study Mode →
              </button>
            </div>
          </div>
          <StudyMode
            exercises={lesson.exercises}
            onFinishStudying={handleFinishStudying}
            currentExerciseIndex={currentExerciseIndex}
            updateExerciseInUrl={updateExerciseInUrl}
          />
        </div>
      ) : showSpeedMatch ? (
        <SpeedMatch
          vocabulary={lesson.vocabularyReference}
          onFinish={handleFinishSpeedMatch}
        />
      ) : lesson.isReadingComprehension ? (
        <div className="reading-module-layout">
          <ExercisePane
            exercise={currentExercise}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirstExercise={currentExerciseIndex === 0}
            isLastExercise={isLastExercise}
            isCompleted={completedExercises.has(currentExercise.id)}
            onComplete={handleExerciseCompleteWrapper}
            studyCompleted={studyCompleted}
            readingPassage={lesson.readingPassage}
            onBackToLesson={lesson.isReadingComprehension ? null : handleBackToLesson}
            moduleId={extractModuleId(lesson)}
            unitId={extractUnitId(unitInfo)}
          />
        </div>
      ) : (
        <div className="lesson-content">
          <div className="left-pane">
            <ExercisePane
              exercise={currentExercise}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstExercise={currentExerciseIndex === 0}
              isLastExercise={isLastExercise}
              isCompleted={completedExercises.has(currentExercise.id)}
              onComplete={handleExerciseCompleteWrapper}
              studyCompleted={studyCompleted}
              readingPassage={lesson.readingPassage}
              onBackToLesson={lesson.isReadingComprehension ? null : handleBackToLesson}
              moduleId={extractModuleId(lesson)}
              unitId={extractUnitId(unitInfo)}
            />
          </div>

          <div className="right-pane">
            <RightSidebar
              concepts={lesson.concepts}
              vocabulary={vocabularyItems}
              moduleId={extractModuleId(lesson)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonView;


