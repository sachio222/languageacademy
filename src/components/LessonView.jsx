import { useState, useEffect } from 'react';
import ExercisePane from './ExercisePane';
import ConceptPane from './ConceptPane';
import ConceptIntro from './ConceptIntro';
import StudyMode from './StudyMode';
import VocabularyReference from './VocabularyReference';
import ModuleExam from './ModuleExam';
import UnitExam from './UnitExam';

function LessonView({ lesson, onBack, completedExercises, onExerciseComplete, onModuleComplete, totalModules }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isStudying, setIsStudying] = useState(false);
  const [studyCompleted, setStudyCompleted] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);

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
    setShowExam(true);
  };

  const handlePassExam = (goToNextImmediately = false) => {
    if (goToNextImmediately) {
      // Go directly to next module without showing completion screen
      if (onModuleComplete) {
        onModuleComplete(lesson.id, true);
      }
    } else {
      // Show completion screen first
      setModuleCompleted(true);
    }
  };

  const handleRetryLesson = () => {
    setShowExam(false);
    setIsStudying(true);
    setCurrentExerciseIndex(0);
  };

  const handleNextModule = () => {
    console.log('handleNextModule called for lesson', lesson.id);
    if (onModuleComplete) {
      onModuleComplete(lesson.id, true); // true = go to next module
    }
  };

  // Reset state when lesson changes (new module loads)
  useEffect(() => {
    // Skip EVERYTHING for reading comprehension or unit exams - go straight to exercises
    const isReading = lesson.skipStudyMode || lesson.isReadingComprehension;
    const isUnitExam = lesson.isUnitExam;

    setShowIntro(!isReading && !isUnitExam);  // No intro for reading or unit exams
    setIsStudying(false);
    setStudyCompleted(isReading || isUnitExam); // Mark as "studied" so exercises show
    setShowExam(false);
    setModuleCompleted(false);
    setCurrentExerciseIndex(0);
  }, [lesson.id]);

  // Auto-show exam option when all exercises complete
  useEffect(() => {
    if (allExercisesComplete && !showExam && !moduleCompleted) {
      // User completed all exercises, ready for exam
    }
  }, [allExercisesComplete, showExam, moduleCompleted]);

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Modules
        </button>
        <h2>{lesson.title}</h2>
        <div className="exercise-progress">
          {showIntro ? (
            <span>📖 Introduction</span>
          ) : isStudying ? (
            <span>📚 Study Mode</span>
          ) : showExam ? (
            <span>📝 Final Exam</span>
          ) : moduleCompleted ? (
            <span>✅ Module Complete!</span>
          ) : (
            <span>Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}</span>
          )}
        </div>
      </div>

      {showIntro && !lesson.isReadingComprehension && !lesson.isUnitExam ? (
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
      ) : lesson.isUnitExam ? (
        <div className="unit-exam-container">
          <UnitExam
            unitNumber={lesson.unitNumber}
            onPassExam={() => handleNextModule()}
            onRetryUnit={onBack}
          />
        </div>
      ) : moduleCompleted ? (
        <div className="module-complete-screen">
          <div className="completion-celebration">
            <h2>🎉 Module Complete!</h2>
            <p>You've mastered {lesson.title}</p>
            <div className="completion-stats">
              <div className="stat">
                <div className="stat-number">{lesson.exercises.length}</div>
                <div className="stat-label">Exercises Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">✓</div>
                <div className="stat-label">Exam Passed</div>
              </div>
            </div>
          </div>
          <div className="completion-actions">
            {lesson.id < totalModules && (
              <button className="btn-primary btn-large" onClick={handleNextModule}>
                Next Module →
              </button>
            )}
            <button className="btn-secondary" onClick={onBack}>
              Back to Modules
            </button>
          </div>
        </div>
      ) : showExam ? (
        <ModuleExam
          lesson={lesson}
          onPassExam={handlePassExam}
          onRetryLesson={handleRetryLesson}
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
          {allExercisesComplete && (
            <div className="ready-for-exam">
              <div className="exam-ready-message">
                🎉 Reading comprehension complete! You've mastered this passage!
              </div>
              <button className="btn-primary btn-exam" onClick={handleNextModule}>
                Continue to Next Module →
              </button>
            </div>
          )}

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
          />
        </div>
      ) : (
        <div className="lesson-content">
          <div className="left-pane">
            <ConceptPane concepts={lesson.concepts} />
            {vocabularyItems.length > 0 && (
              <VocabularyReference
                vocabulary={vocabularyItems}
                title="Quick Reference"
              />
            )}
          </div>

          <div className="right-pane">
            {allExercisesComplete && !lesson.isReadingComprehension && (
              <div className="ready-for-exam">
                <div className="exam-ready-message">
                  🎉 Module complete! You've mastered all exercises!
                </div>
                <button className="btn-primary btn-exam" onClick={handleNextModule}>
                  Continue to Next Module →
                </button>
              </div>
            )}

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
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonView;


