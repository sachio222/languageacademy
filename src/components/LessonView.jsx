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

function LessonView({ lesson, completedExercises, onExerciseComplete, onModuleComplete, totalModules }) {
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

  // Debug logging for exercise completion
  if (lesson.exercises) {
    const completed = lesson.exercises.filter(ex => completedExercises.has(ex.id)).length;
    const total = lesson.exercises.length;
    console.log(`Module ${lesson.id} completion: ${completed}/${total} exercises complete`);
    console.log('All exercises complete?', allExercisesComplete);
  }

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
    console.log('Lesson title:', lesson.title);
    console.log('Requesting navigation to module:', lesson.id + 1);
    if (onModuleComplete) {
      onModuleComplete(lesson.id, true); // true = go to next module
    } else {
      console.error('onModuleComplete callback not provided!');
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
    // Don't auto-show modal for fill-in-blank modules (they handle completion internally)
    if (allExercisesComplete && !showExam && !moduleCompleted && studyCompleted && !lesson.isFillInTheBlank) {
      // User completed all exercises, show completion modal
      setModuleCompleted(true);
    }
  }, [allExercisesComplete, showExam, moduleCompleted, studyCompleted, lesson.isFillInTheBlank]);

  return (
    <div className="lesson-view">
      {/* Module Complete Modal */}
      {moduleCompleted && (
        <ModuleCompleteModal
          lesson={lesson}
          onNextModule={handleNextModule}
          onBackToModules={() => { }} // No-op since sidebar handles navigation
          totalModules={totalModules}
        />
      )}

      <div className="lesson-header">
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
            unitNumber={lesson.unitNumber}
            onPassExam={() => handleNextModule()}
            onRetryUnit={() => { }} // User can select from sidebar
          />
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


