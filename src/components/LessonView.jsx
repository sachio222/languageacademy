import { useState, useEffect } from 'react';
import ExercisePane from './ExercisePane';
import ConceptPane from './ConceptPane';
import ConceptIntro from './ConceptIntro';
import StudyMode from './StudyMode';
import VocabularyReference from './VocabularyReference';
import ModuleExam from './ModuleExam';
import UnitExam from './UnitExam';
import ModuleCompleteModal from './ModuleCompleteModal';
import FillInTheBlank from './FillInTheBlank';
import { extractModuleId, extractUnitId } from '../utils/progressSync';
import { RotateCcw, Award } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';

function LessonView({ lesson, unitInfo, onBack, completedExercises, onExerciseComplete, onModuleComplete, totalModules }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isStudying, setIsStudying] = useState(false);
  const [studyCompleted, setStudyCompleted] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [moduleTimeSpent, setModuleTimeSpent] = useState(0);

  const { supabaseClient, supabaseUser, isAuthenticated, moduleProgress } = useSupabaseProgress();

  if (!lesson) return null;

  const currentExercise = lesson.exercises?.[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (lesson.exercises?.length || 0) - 1;

  // Generate vocabulary reference from lesson
  const vocabularyItems = lesson.vocabularyReference || [];

  // Check if all exercises in this lesson are completed
  const allExercisesComplete = lesson.exercises?.every(ex =>
    completedExercises.has(ex.id)
  ) || false;

  const handleNext = () => {
    if (!isLastExercise) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  const handleStartStudying = () => {
    setShowIntro(false);
    setIsStudying(true);
  };

  const handleFinishStudying = () => {
    setIsStudying(false);
    setStudyCompleted(true);
  };

  const handleSkipStudy = () => {
    setIsStudying(false);
    setStudyCompleted(true);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
    setIsStudying(false);
    setStudyCompleted(true);
  };

  const handleBackToLesson = () => {
    setIsStudying(true);
    setStudyCompleted(false);
  };

  const handleBackToConcepts = () => {
    setShowIntro(true);
    setIsStudying(false);
    setStudyCompleted(false);
  };

  const handleTakeExam = () => {
    setModuleCompleted(false); // Close completion modal
    setShowExam(true);
  };

  const handlePassExam = (examScore, timeSpent) => {
    // Module exam passed! Show completion screen
    setModuleCompleted(true);
    setShowExam(false);
    setModuleTimeSpent(timeSpent);

    // Update database with exam score and time
    if (onModuleComplete) {
      onModuleComplete(lesson.id, examScore, timeSpent, false);
    }
  };

  const handleRetryLesson = () => {
    setShowExam(false);
    setIsStudying(true);
    setCurrentExerciseIndex(0);
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
      console.error('Error resetting module:', err);
      alert('Failed to reset module. Please try again.');
    }
  };

  const handleNextModule = () => {
    if (!lesson || !lesson.id) {
      console.error('No lesson or lesson ID available');
      return;
    }

    console.log('handleNextModule - Current lesson ID:', lesson.id, 'Title:', lesson.title);

    if (!onModuleComplete) {
      console.error('onModuleComplete callback not provided!');
      return;
    }

    // Pass lesson.id explicitly, with goToNext flag
    const currentModuleId = lesson.id;
    console.log('Calling onModuleComplete with moduleId:', currentModuleId);
    onModuleComplete(currentModuleId, 100, moduleTimeSpent || 0, true);
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

      // Reload page to refresh state
      window.location.reload();
    } catch (err) {
      console.error('Error resetting module:', err);
      alert('Failed to reset module. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  // Reset state when lesson changes (new module loads)
  useEffect(() => {
    // Skip EVERYTHING for reading comprehension, unit exams, or fill-in-blank - go straight to exercises
    const isReading = lesson.skipStudyMode || lesson.isReadingComprehension;
    const isUnitExam = lesson.isUnitExam;
    const isFillInBlank = lesson.isFillInTheBlank;

    setShowIntro(!isReading && !isUnitExam && !isFillInBlank);  // No intro for special module types
    setIsStudying(false);
    setStudyCompleted(isReading || isUnitExam || isFillInBlank); // Mark as "studied" so exercises show
    setShowExam(false);
    setModuleCompleted(false);
    setCurrentExerciseIndex(0);
  }, [lesson.id]);

  // Auto-show modal when all exercises complete
  useEffect(() => {
    // If modal is already showing but exercises are no longer all complete (due to revert), hide it
    if (moduleCompleted && !allExercisesComplete) {
      setModuleCompleted(false);
      return;
    }

    // Don't auto-show modal for fill-in-blank modules (they handle completion internally)
    if (allExercisesComplete && !showExam && !moduleCompleted && studyCompleted && !lesson.isFillInTheBlank) {
      // Delay to allow optimistic updates to be reverted if answer was incorrect
      const timeoutId = setTimeout(() => {
        // Re-check if all exercises are still complete after a brief delay
        const stillAllComplete = lesson.exercises?.every(ex =>
          completedExercises.has(ex.id)
        ) || false;

        if (!stillAllComplete) {
          return; // Don't show modal if exercises were reverted
        }

        // Load time from database if available
        const loadModuleTime = async () => {
          if (isAuthenticated && supabaseClient && supabaseUser) {
            try {
              const modId = extractModuleId(lesson);

              // Try to get from module_progress first
              const { data: moduleData } = await supabaseClient
                .from('module_progress')
                .select('time_spent_seconds')
                .eq('user_id', supabaseUser.id)
                .eq('module_id', modId)
                .single();

              if (moduleData?.time_spent_seconds) {
                setModuleTimeSpent(moduleData.time_spent_seconds);
              } else {
                // Sum up time from individual exercise completions
                const { data: exerciseData } = await supabaseClient
                  .from('exercise_completions')
                  .select('time_spent_seconds')
                  .eq('user_id', supabaseUser.id)
                  .eq('module_id', modId)
                  .eq('is_correct', true);

                if (exerciseData && exerciseData.length > 0) {
                  const totalTime = exerciseData.reduce((sum, ex) => sum + (ex.time_spent_seconds || 0), 0);
                  setModuleTimeSpent(totalTime);
                }
              }
            } catch (err) {
              // No time data, that's okay
            }
          }
          setModuleCompleted(true);
        };
        loadModuleTime();
      }, 100); // Small delay to allow revert to complete

      return () => clearTimeout(timeoutId);
    }
  }, [allExercisesComplete, showExam, moduleCompleted, studyCompleted, lesson.isFillInTheBlank, isAuthenticated, supabaseClient, supabaseUser, lesson, completedExercises]);

  return (
    <div className="lesson-view">
      {/* Module Complete Modal */}
      {moduleCompleted && (
        <ModuleCompleteModal
          lesson={lesson}
          onNextModule={handleNextModule}
          onBackToModules={onBack}
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
          <h2>{lesson.title}</h2>
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

      {showIntro && !lesson.isReadingComprehension && !lesson.isUnitExam && !lesson.isFillInTheBlank ? (
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
            <button className="btn-skip" onClick={handleSkipStudy}>
              Skip Study Mode →
            </button>
          </div>
          <StudyMode
            exercises={lesson.exercises}
            onFinishStudying={handleFinishStudying}
          />
        </div>
      ) : lesson.isReadingComprehension ? (
        <div className="reading-module-layout">
          <ExercisePane
            exercise={currentExercise}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirstExercise={currentExerciseIndex === 0}
            isLastExercise={isLastExercise}
            isCompleted={completedExercises.has(currentExercise.id)}
            onComplete={onExerciseComplete}
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
              onComplete={onExerciseComplete}
              studyCompleted={studyCompleted}
              readingPassage={lesson.readingPassage}
              onBackToLesson={lesson.isReadingComprehension ? null : handleBackToLesson}
              moduleId={extractModuleId(lesson)}
              unitId={extractUnitId(unitInfo)}
            />
          </div>

          <div className="right-pane">
            <ConceptPane
              concepts={lesson.concepts}
              moduleId={extractModuleId(lesson)}
            />
            {vocabularyItems.length > 0 && (
              <VocabularyReference
                vocabulary={vocabularyItems}
                title="Quick Reference"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonView;


