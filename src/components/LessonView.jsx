import { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import { Home } from 'lucide-react';
import ExercisePane from './ExercisePane';
import ConceptPane from './ConceptPane';
import ConceptIntro from './ConceptIntro';
import StudyMode from './StudyMode';
import SpeedMatch from './SpeedMatch';
import PronunciationMode from './PronunciationMode';
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
import ModuleSelector from './ModuleSelector';
import ModuleSectionHeader from './ModuleSectionHeader';
import { extractModuleId, extractUnitId } from '../utils/progressSync';
import { RotateCcw, Award } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { usePageTime } from '../hooks/usePageTime';
import { useModuleTime } from '../hooks/useModuleTime';
import { useSectionTime } from '../hooks/useSectionTime';
import { getUnitIdForLesson } from '../utils/unitHelpers';
import { getSectionStatus, getActiveSections, isSectionAvailable } from '../config/sectionRegistry';
import { logger } from "../utils/logger";
import { splitTitle } from '../utils/moduleUtils';
import { trackClarityEvent, setClarityTag } from '../utils/clarity';

// View state types
const VIEW_STATES = {
  SELECTOR: 'selector',
  INTRO: 'intro',
  STUDY: 'study',
  SPEEDMATCH: 'speedmatch',
  PRACTICE: 'practice',
  PRONUNCIATION: 'pronunciation',
  CONVERSATION: 'conversation',
  EXAM: 'exam',
  SPECIAL: 'special' // For special module types that bypass normal flow
};

// Section ID constants (replaces magic strings)
const SECTION_IDS = {
  PRACTICE_EXERCISES: 'practice-exercises',
  EXAM_QUESTIONS: 'exam-questions',
  INTERACTIVE_HELP: 'interactive-help',
  READING_PASSAGE: 'reading-passage',
  REFERENCE_CONTENT: 'reference-content',
  VOCABULARY_INTRO: 'vocabulary-intro',
  FLASH_CARDS: 'flash-cards',
  WRITING: 'writing',
  SPEED_MATCH: 'speed-match',
  EXAM: 'exam'
};

// Action types
const VIEW_ACTIONS = {
  SET_VIEW: 'SET_VIEW',
  SET_STUDY_COMPLETED: 'SET_STUDY_COMPLETED',
  SET_SPEEDMATCH_COMPLETED: 'SET_SPEEDMATCH_COMPLETED',
  SET_CURRENT_SECTION: 'SET_CURRENT_SECTION',
  SET_VIEW_WITH_COMPLETION: 'SET_VIEW_WITH_COMPLETION', // Combined action for multiple dispatches
  RESET: 'RESET'
};

// Initial view state structure
const createInitialViewState = (view, studyCompleted = false, speedMatchCompleted = false, currentSection = null) => ({
  view,
  studyCompleted,
  speedMatchCompleted,
  currentSection
});

// Helper function to get view state configuration (eliminates duplicate switch statements)
const getViewStateConfig = (view) => {
  switch (view) {
    case VIEW_STATES.SELECTOR:
      return createInitialViewState(VIEW_STATES.SELECTOR, false, false);
    case VIEW_STATES.INTRO:
      return createInitialViewState(VIEW_STATES.INTRO, false, false);
    case VIEW_STATES.STUDY:
      return createInitialViewState(VIEW_STATES.STUDY, false, false);
    case VIEW_STATES.SPEEDMATCH:
      return createInitialViewState(VIEW_STATES.SPEEDMATCH, true, false);
    case VIEW_STATES.PRACTICE:
      return createInitialViewState(VIEW_STATES.PRACTICE, true, true);
    case VIEW_STATES.PRONUNCIATION:
      return createInitialViewState(VIEW_STATES.PRONUNCIATION, true, true, 'pronunciation');
    case VIEW_STATES.CONVERSATION:
      return createInitialViewState(VIEW_STATES.CONVERSATION, true, true, 'conversation');
    case VIEW_STATES.EXAM:
      return createInitialViewState(VIEW_STATES.EXAM, true, true);
    default:
      return createInitialViewState(VIEW_STATES.SELECTOR, false, false);
  }
};

// View state reducer
const viewStateReducer = (state, action) => {
  switch (action.type) {
    case VIEW_ACTIONS.SET_VIEW:
      return {
        ...state,
        view: action.payload,
        // Reset section when changing views (except for pronunciation/conversation)
        currentSection: action.payload === 'pronunciation' || action.payload === 'conversation'
          ? action.payload
          : null
      };

    case VIEW_ACTIONS.SET_STUDY_COMPLETED:
      return {
        ...state,
        studyCompleted: action.payload
      };

    case VIEW_ACTIONS.SET_SPEEDMATCH_COMPLETED:
      return {
        ...state,
        speedMatchCompleted: action.payload
      };

    case VIEW_ACTIONS.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload
      };

    case VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION:
      // Combined action to set view and completion status in one dispatch
      return {
        ...state,
        view: action.payload.view,
        studyCompleted: action.payload.studyCompleted ?? state.studyCompleted,
        speedMatchCompleted: action.payload.speedMatchCompleted ?? state.speedMatchCompleted,
        currentSection: action.payload.currentSection ?? null
      };

    case VIEW_ACTIONS.RESET:
      return action.payload;

    default:
      return state;
  }
};

// URL utility functions (abstracts window manipulation)
const urlUtils = {
  getSearchParam: (key) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },

  setSearchParam: (key, value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url);
  },

  deleteSearchParam: (key) => {
    const url = new URL(window.location);
    url.searchParams.delete(key);
    window.history.replaceState({}, '', url);
  },

  reload: () => {
    window.location.reload();
  }
};

function LessonView({ lesson, unitInfo, onBack, completedExercises, onExerciseComplete, onModuleComplete, totalModules }) {
  // Memoize module ID to avoid duplicate calls
  const moduleId = useMemo(() => extractModuleId(lesson), [lesson]);

  // Helper function to detect module types (replaces repeated checks)
  const getModuleTypeFlags = useMemo(() => {
    return {
      isReading: lesson.skipStudyMode || lesson.isReadingComprehension,
      isUnitExam: lesson.isUnitExam,
      isFillInBlank: lesson.isFillInTheBlank,
      isPhonics: lesson.isPhonicsReference,
      isHelpModule: lesson.isHelpModule,
      isSpecial: (lesson.skipStudyMode || lesson.isReadingComprehension) ||
        lesson.isUnitExam ||
        lesson.isFillInTheBlank ||
        lesson.isPhonicsReference ||
        lesson.isHelpModule
    };
  }, [lesson]);

  // Helper to get initial exercise index from URL (1-based to 0-based) with validation
  const getInitialExerciseIndex = () => {
    const exerciseParam = urlUtils.getSearchParam('exercise');
    if (exerciseParam) {
      const exerciseNum = parseInt(exerciseParam, 10);
      const maxExercises = lesson.exercises?.length || 0;
      // Validate: must be valid number, >= 1, and within bounds
      if (!isNaN(exerciseNum) && exerciseNum >= 1 && exerciseNum <= maxExercises) {
        return exerciseNum - 1; // Convert 1-based to 0-based
      }
      // Invalid exercise - clear from URL
      if (exerciseNum < 1 || exerciseNum > maxExercises) {
        urlUtils.deleteSearchParam('exercise');
      }
    }
    return 0;
  };

  // Helper to get initial view state from URL with validation
  const getInitialViewState = () => {
    const view = urlUtils.getSearchParam('view');

    // Check if this is a special module type that skips intro/study
    if (getModuleTypeFlags.isSpecial) {
      // Special modules don't use view parameter - clear it if present
      if (view) {
        urlUtils.deleteSearchParam('view');
      }
      return createInitialViewState(VIEW_STATES.SPECIAL, true, true);
    }

    // Normal modules: validate view parameter
    const validViews = Object.values(VIEW_STATES).filter(v => v !== VIEW_STATES.SPECIAL);

    // If view is invalid or missing, default to selector
    if (!view || !validViews.includes(view)) {
      return createInitialViewState(VIEW_STATES.SELECTOR, false, false);
    }

    // Use helper function instead of duplicate switch
    return getViewStateConfig(view);
  };

  const initialState = getInitialViewState();
  const [viewState, dispatchViewState] = useReducer(viewStateReducer, initialState);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(getInitialExerciseIndex);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [moduleTimeSpent, setModuleTimeSpent] = useState(0);

  // Track page time for study time analytics (global total)
  const pageId = `lesson-${lesson.id}`;
  usePageTime(pageId, true);

  // Track module and unit specific time with proper idle detection
  const unitId = getUnitIdForLesson(lesson.id);
  useModuleTime(moduleId, unitId, true);

  // Track section-specific time based on current view state and module type
  const currentSectionId = useMemo(() => {
    // For special module types, use their dedicated sections
    if (getModuleTypeFlags.isFillInBlank) return SECTION_IDS.PRACTICE_EXERCISES;
    if (getModuleTypeFlags.isUnitExam) return SECTION_IDS.EXAM_QUESTIONS;
    if (getModuleTypeFlags.isHelpModule) return SECTION_IDS.INTERACTIVE_HELP;
    if (getModuleTypeFlags.isReading) return SECTION_IDS.READING_PASSAGE;
    if (getModuleTypeFlags.isPhonics) return SECTION_IDS.REFERENCE_CONTENT;

    // For standard modules, use view state mapping
    const sectionMap = {
      [VIEW_STATES.SELECTOR]: null,  // Don't track time on menu/selector screen
      [VIEW_STATES.INTRO]: SECTION_IDS.VOCABULARY_INTRO,
      [VIEW_STATES.STUDY]: SECTION_IDS.FLASH_CARDS,
      [VIEW_STATES.PRACTICE]: SECTION_IDS.WRITING,
      [VIEW_STATES.SPEEDMATCH]: SECTION_IDS.SPEED_MATCH,
      [VIEW_STATES.EXAM]: SECTION_IDS.EXAM
    };

    return sectionMap[viewState.view] || null;
  }, [getModuleTypeFlags, viewState.view]);
  useSectionTime(moduleId, currentSectionId, !!currentSectionId);

  // Legacy module time tracking (will be removed)
  const moduleStartTimeRef = useRef(Date.now());

  // Track if completion has been recorded to prevent duplicates
  const completionRecordedRef = useRef(false);

  const { supabaseClient, supabaseUser, isAuthenticated, moduleProgress } = useSupabaseProgress();
  const { sectionProgress, isSectionCompleted, completeSectionProgress } = useSectionProgress();

  if (!lesson) return null;

  const currentExercise = lesson.exercises?.[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (lesson.exercises?.length || 0) - 1;

  // Helper functions to check view state (replacing boolean checks)
  const isView = (view) => viewState.view === view;
  const showSelector = isView(VIEW_STATES.SELECTOR);
  const showIntro = isView(VIEW_STATES.INTRO);
  const isStudying = isView(VIEW_STATES.STUDY);
  const showSpeedMatch = isView(VIEW_STATES.SPEEDMATCH);
  const showExam = isView(VIEW_STATES.EXAM);
  const studyCompleted = viewState.studyCompleted;
  const speedMatchCompleted = viewState.speedMatchCompleted;
  const currentSection = viewState.currentSection;

  // Calculate completed sections for selector view
  const sectionCount = useMemo(() => {
    if (!showSelector) return { completed: 0, total: 0 };

    const availableSections = getActiveSections()
      .filter(section => isSectionAvailable(section.id, lesson))
      .filter(section => !section.isPremium && !section.comingSoon && !section.isSpecial);

    const completedCount = availableSections.filter(section => {
      const status = getSectionStatus(section.id, moduleProgress?.[moduleId], sectionProgress?.[moduleId] || {}, lesson);
      return status === 'completed';
    }).length;

    return { completed: completedCount, total: availableSections.length };
  }, [showSelector, moduleProgress, sectionProgress, moduleId, lesson]);

  // Generate vocabulary reference from lesson
  const vocabularyItems = lesson.vocabularyReference || [];

  // Helper to update URL view parameter
  const updateViewInUrl = (view) => {
    urlUtils.setSearchParam('view', view);
  };

  // Helper to update exercise index in URL (0-based to 1-based)
  const updateExerciseInUrl = (exerciseIndex) => {
    const exerciseNum = exerciseIndex + 1; // Convert 0-based to 1-based
    urlUtils.setSearchParam('exercise', exerciseNum.toString());
  };

  // Wrapper for exercise completion that shows modal when last exercise is completed
  const handleExerciseCompleteWrapper = async (exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent = 0, hintUsed = false, isCorrect = null) => {
    // Call the original completion handler from App
    const wasSuccessful = await onExerciseComplete(exerciseId, moduleId, unitId, userAnswer, correctAnswer, timeSpent, hintUsed, isCorrect);

    // If this was the last exercise AND it was completed successfully, show modal
    if (isLastExercise && wasSuccessful && studyCompleted && !getModuleTypeFlags.isFillInBlank) {
      // Complete the appropriate section based on module type
      if (isAuthenticated && moduleId) {
        if (getModuleTypeFlags.isReading) {
          // Complete reading-passage section for reading comprehension modules
          logger.log('LessonView: Auto-completing reading-passage section - all exercises completed');

          completeSectionProgress(moduleId, SECTION_IDS.READING_PASSAGE, {
            exercises_completed: lesson.exercises.length,
            completion_method: 'all_exercises_completed'
          }).then(result => {
            logger.log('LessonView: Reading-passage section completion successful', result);
          }).catch(error => {
            logger.error('LessonView: Error completing reading-passage section:', error);
          });
        } else {
          // Complete writing section for standard modules
          logger.log('LessonView: Auto-completing writing section - last exercise completed');

          completeSectionProgress(moduleId, SECTION_IDS.WRITING, {
            exercises_completed: lesson.exercises.length,
            completion_method: 'all_exercises_completed'
          }).then(result => {
            logger.log('LessonView: Writing section completion successful', result);
          }).catch(error => {
            logger.error('LessonView: Error completing writing section:', error);
          });
        }
      }

      // Calculate time spent
      const timeSpentOnModule = Math.round((Date.now() - moduleStartTimeRef.current) / 1000);
      setModuleTimeSpent(timeSpentOnModule);
      setModuleCompleted(true);
      // Reset completion tracking when modal shows
      completionRecordedRef.current = false;
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

  const handleSectionSelect = (view) => {
    if (view === 'next') {
      handleNextModule();
      return;
    }

    // Use combined dispatch action to batch multiple state updates
    const viewConfig = getViewStateConfig(view || VIEW_STATES.SELECTOR);
    dispatchViewState({
      type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
      payload: viewConfig
    });

    if (view === 'study' || view === 'practice') {
      setCurrentExerciseIndex(0);
      updateExerciseInUrl(0);
    }

    updateViewInUrl(view || VIEW_STATES.SELECTOR);
  };

  const handleBackToSelector = () => {
    dispatchViewState({ type: VIEW_ACTIONS.SET_VIEW, payload: VIEW_STATES.SELECTOR });
    dispatchViewState({ type: VIEW_ACTIONS.SET_CURRENT_SECTION, payload: null });
    updateViewInUrl('selector');
  };

  const handleStartStudying = () => {
    dispatchViewState({ type: VIEW_ACTIONS.SET_VIEW, payload: VIEW_STATES.STUDY });
    setCurrentExerciseIndex(0);
    updateViewInUrl('study');
    updateExerciseInUrl(0);
  };

  const handleFinishStudying = () => {
    // Check if module has vocabulary for Speed Match
    if (lesson.vocabularyReference && lesson.vocabularyReference.length >= 4) {
      dispatchViewState({
        type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
        payload: getViewStateConfig(VIEW_STATES.SPEEDMATCH)
      });
      updateViewInUrl('speedmatch');
    } else {
      // Skip Speed Match if not enough vocabulary
      dispatchViewState({
        type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
        payload: getViewStateConfig(VIEW_STATES.PRACTICE)
      });
      setCurrentExerciseIndex(0);
      updateViewInUrl('practice');
      updateExerciseInUrl(0);
    }
  };

  const handleFinishSpeedMatch = () => {
    dispatchViewState({
      type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
      payload: getViewStateConfig(VIEW_STATES.PRACTICE)
    });
    setCurrentExerciseIndex(0);
    updateViewInUrl('practice');
    updateExerciseInUrl(0);
  };

  const handleSkipStudy = () => {
    // Skip both Study and Speed Match
    dispatchViewState({
      type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
      payload: getViewStateConfig(VIEW_STATES.PRACTICE)
    });
    setCurrentExerciseIndex(0);
    updateViewInUrl('practice');
    updateExerciseInUrl(0);
  };

  const handleSkipIntro = () => {
    dispatchViewState({
      type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
      payload: getViewStateConfig(VIEW_STATES.PRACTICE)
    });
    setCurrentExerciseIndex(0);
    updateViewInUrl('practice');
    updateExerciseInUrl(0);
  };

  const handleBackToLesson = () => {
    dispatchViewState({
      type: VIEW_ACTIONS.SET_VIEW_WITH_COMPLETION,
      payload: getViewStateConfig(VIEW_STATES.STUDY)
    });
    setCurrentExerciseIndex(0);
    updateViewInUrl('study');
    updateExerciseInUrl(0);
  };

  const handleBackToConcepts = () => {
    handleBackToSelector();
  };

  const handleTakeExam = () => {
    setModuleCompleted(false); // Close completion modal
    dispatchViewState({ type: VIEW_ACTIONS.SET_VIEW, payload: VIEW_STATES.EXAM });
    updateViewInUrl('exam');
    updateExerciseInUrl(0);
  };

  const handlePassExam = (examScore, timeSpent) => {
    // Module exam passed! Show completion screen
    setModuleCompleted(true);
    setModuleTimeSpent(timeSpent);
    updateViewInUrl(null); // Clear view when showing completion modal
    updateExerciseInUrl(0);

    // Update database with exam score (time is tracked by useModuleTime)
    if (onModuleComplete) {
      onModuleComplete(lesson.id, examScore, 0, false); // timeSpent = 0, managed by useModuleTime
    }
  };

  const handleRetryLesson = () => {
    dispatchViewState({ type: VIEW_ACTIONS.SET_VIEW, payload: VIEW_STATES.STUDY });
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
      // Delete all exercise completions for this module
      const { error } = await supabaseClient
        .from('exercise_completions')
        .delete()
        .eq('user_id', supabaseUser.id)
        .eq('module_key', moduleId);

      if (error) throw error;

      // Reload page to refresh state
      urlUtils.reload();
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

    // Record completion if not already recorded, then navigate
    if (!completionRecordedRef.current) {
      logger.log('Recording module completion on next module click', { moduleId: lesson.id });
      completionRecordedRef.current = true;
      // Pass lesson.id explicitly, with goToNext flag
      const currentModuleId = lesson.id;
      logger.log('Calling onModuleComplete with moduleId:', currentModuleId);
      onModuleComplete(currentModuleId, 100, 0, true); // timeSpent = 0, managed by useModuleTime, goToNext = true
    } else {
      // Completion already recorded (from modal close), just trigger navigation
      // onModuleComplete handles navigation when goToNext = true
      logger.log('Completion already recorded, triggering navigation');
      onModuleComplete(lesson.id, 100, 0, true); // goToNext = true triggers navigation
    }
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
      // Delete all exercise completions for this module
      const { error } = await supabaseClient
        .from('exercise_completions')
        .delete()
        .eq('user_id', supabaseUser.id)
        .eq('module_key', moduleId);

      if (error) throw error;

      // For unit exams, help modules, and fill-in-blank, also clear the module_progress completion
      if (getModuleTypeFlags.isUnitExam || getModuleTypeFlags.isHelpModule || getModuleTypeFlags.isFillInBlank) {
        logger.log('[DEBUG] Clearing module completion from module_progress');
        const { error: progressError } = await supabaseClient
          .from('module_progress')
          .delete()
          .eq('user_id', supabaseUser.id)
          .eq('module_key', moduleId);

        if (progressError) throw progressError;
      }

      // For help modules, also clear concept understanding (the "Understood" checkmarks)
      if (getModuleTypeFlags.isHelpModule) {
        logger.log('[DEBUG] Clearing concept understanding for help module');
        const { error: conceptError } = await supabaseClient
          .from('concept_understanding')
          .delete()
          .eq('user_id', supabaseUser.id)
          .eq('module_key', moduleId);

        if (conceptError) throw conceptError;
      }

      // Reload page to refresh state
      urlUtils.reload();
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
        // Restore exercise index (convert 1-based to 0-based) with validation
        if (exerciseParam) {
          const exerciseNum = parseInt(exerciseParam, 10);
          const maxExercises = lesson.exercises?.length || 0;
          if (!isNaN(exerciseNum) && exerciseNum >= 1 && exerciseNum <= maxExercises) {
            setCurrentExerciseIndex(exerciseNum - 1);
          } else {
            // Invalid exercise number - reset to 0
            setCurrentExerciseIndex(0);
            urlUtils.deleteSearchParam('exercise');
          }
        } else {
          setCurrentExerciseIndex(0);
        }

        // Skip view changes for special module types
        if (getModuleTypeFlags.isSpecial && !getModuleTypeFlags.isHelpModule) return;

        // Update view state based on URL (use helper function instead of duplicate switch)
        const viewConfig = getViewStateConfig(view || VIEW_STATES.SELECTOR);
        dispatchViewState({ type: VIEW_ACTIONS.RESET, payload: viewConfig });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lesson.id]);

  // Reset state when lesson changes (new module loads)
  useEffect(() => {
    // Get the view from URL to determine initial state
    const urlView = urlUtils.getSearchParam('view');
    const urlExercise = urlUtils.getSearchParam('exercise');

    // Determine exercise index from URL (only reset to 0 if not specified)
    let exerciseIndex = 0;
    if (urlExercise) {
      const exerciseNum = parseInt(urlExercise, 10);
      if (!isNaN(exerciseNum) && exerciseNum >= 1) {
        exerciseIndex = exerciseNum - 1; // Convert 1-based to 0-based
      }
    }

    // For special module types, always go straight to practice
    if (getModuleTypeFlags.isSpecial) {
      dispatchViewState({ type: VIEW_ACTIONS.RESET, payload: createInitialViewState(VIEW_STATES.SPECIAL, true, true) });
      setModuleCompleted(false);
      setCurrentExerciseIndex(exerciseIndex);
      // Don't update URL for special modules - they don't have views
    } else {
      // Normal modules: use URL view or default to selector (use helper function instead of duplicate switch)
      const viewConfig = getViewStateConfig(urlView || VIEW_STATES.SELECTOR);
      dispatchViewState({ type: VIEW_ACTIONS.RESET, payload: viewConfig });

      if (!urlView) {
        // Set URL to selector as default
        updateViewInUrl('selector');
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

    if (getModuleTypeFlags.isUnitExam) {
      setClarityTag('moduleType', 'unitExam');
    } else if (getModuleTypeFlags.isReading) {
      setClarityTag('moduleType', 'reading');
    } else if (getModuleTypeFlags.isFillInBlank) {
      setClarityTag('moduleType', 'fillInBlank');
    } else if (getModuleTypeFlags.isHelpModule) {
      setClarityTag('moduleType', 'helpModule');
    } else {
      setClarityTag('moduleType', 'standard');
    }
  }, [lesson.id, getModuleTypeFlags]); // Only run when lesson changes

  // Reset completion tracking when lesson changes
  useEffect(() => {
    completionRecordedRef.current = false;
  }, [lesson.id]);

  // Close modal without navigating - but record completion first
  const handleCloseModal = () => {
    // Record completion if not already recorded
    if (!completionRecordedRef.current && lesson && lesson.id && onModuleComplete) {
      logger.log('Recording module completion on modal close', { moduleId: lesson.id });
      completionRecordedRef.current = true;
      // Record completion with score 100 (exercises completed) but don't navigate
      onModuleComplete(lesson.id, 100, 0, false); // timeSpent = 0 (managed by useModuleTime), goToNext = false
    }
    setModuleCompleted(false);
  };

  return (
    <div className="lesson-view">
      {/* Module Complete Modal */}
      {moduleCompleted && (
        <ModuleCompleteModal
          lesson={lesson}
          onNextModule={handleNextModule}
          onBackToModules={() => {
            // Record completion before going back
            if (!completionRecordedRef.current && lesson && lesson.id && onModuleComplete) {
              logger.log('Recording module completion on back to modules', { moduleId: lesson.id });
              completionRecordedRef.current = true;
              onModuleComplete(lesson.id, 100, 0, false); // goToNext = false
            }
            onBack();
          }}
          onClose={handleCloseModal}
          onTakeExam={handleTakeExam}
          onRetakeExercises={handleRetakeExercises}
          totalModules={totalModules}
          hasNextModule={lesson.id < totalModules}
          timeSpent={moduleTimeSpent}
        />
      )}

      <div className="lesson-view-container">
        <div className="lesson-header">
          <button className="btn-back" onClick={onBack}>
            <Home size={18} />
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
            {showSelector ? (
              <span>{sectionCount.completed}/{sectionCount.total} Done</span>
            ) : showIntro ? (
              <span>📖 Introduction</span>
            ) : isStudying ? (
              <span>📚 Study Mode</span>
            ) : showSpeedMatch ? (
              <span>⚡ Speed Match</span>
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
            <Home size={18} />
          </button>
          <div className="lesson-title-mobile">
            <h2>{splitTitle(lesson.title).mainTitle}</h2>
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
        ) : showSelector && !getModuleTypeFlags.isReading && !getModuleTypeFlags.isUnitExam && !getModuleTypeFlags.isFillInBlank ? (
          <ModuleSelector
            lesson={lesson}
            onSectionSelect={handleSectionSelect}
            moduleProgress={moduleProgress || {}}
            sectionProgress={sectionProgress}
            completedExercises={completedExercises}
          />
        ) : showIntro && !getModuleTypeFlags.isReading && !getModuleTypeFlags.isUnitExam && !getModuleTypeFlags.isFillInBlank ? (
          <>
            <ModuleSectionHeader
              sectionId="intro"
              moduleId={moduleId}
              lesson={lesson}
              onBack={handleBackToSelector}
            />
            <div className="intro-container">
              <ConceptIntro
                lesson={lesson}
                onStartStudying={handleStartStudying}
              />
            </div>
          </>
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
          <>
            <ModuleSectionHeader
              sectionId="study"
              moduleId={moduleId}
              lesson={lesson}
              onBack={handleBackToSelector}
            />
            <div className="study-container">
              <StudyMode
                exercises={lesson.exercises}
                onFinishStudying={handleFinishStudying}
                currentExerciseIndex={currentExerciseIndex}
                updateExerciseInUrl={updateExerciseInUrl}
                lesson={lesson}
              />
            </div>
          </>
        ) : showSpeedMatch ? (
          <div>
            <ModuleSectionHeader
              sectionId="speedmatch"
              moduleId={moduleId}
              lesson={lesson}
              onBack={handleBackToSelector}
            />
            <SpeedMatch
              vocabulary={lesson.vocabularyReference}
              onFinish={handleFinishSpeedMatch}
              lesson={lesson}
            />
          </div>
        ) : currentSection === 'pronunciation' ? (
          <div>
            <ModuleSectionHeader
              sectionId="pronunciation"
              moduleId={moduleId}
              lesson={lesson}
              onBack={handleBackToSelector}
            />
            <PronunciationMode
              lesson={lesson}
              onFinishPronunciation={handleBackToSelector}
            />
          </div>
        ) : currentSection === 'conversation' ? (
          <div>
            <ModuleSectionHeader
              sectionId="conversation"
              moduleId={moduleId}
              lesson={lesson}
              onBack={handleBackToSelector}
            />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Conversation section coming soon!</p>
            </div>
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
              onComplete={handleExerciseCompleteWrapper}
              studyCompleted={studyCompleted}
              readingPassage={lesson.readingPassage}
              onBackToLesson={getModuleTypeFlags.isReading ? null : handleBackToLesson}
              moduleId={moduleId}
              displayModuleId={lesson.id}
              unitId={extractUnitId(unitInfo)}
            />
          </div>
        ) : (
          <>
            <ModuleSectionHeader
              sectionId="practice"
              moduleId={moduleId}
              lesson={lesson}
              onBack={handleBackToSelector}
            />
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
                  onBackToLesson={null}
                  moduleId={moduleId}
                  displayModuleId={lesson.id}
                  unitId={extractUnitId(unitInfo)}
                />
              </div>

              <div className="right-pane">
                <RightSidebar
                  concepts={lesson.concepts}
                  vocabulary={vocabularyItems}
                  moduleId={moduleId}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LessonView;


