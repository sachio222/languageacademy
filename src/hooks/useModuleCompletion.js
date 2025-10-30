import { useCallback } from 'react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { lessons, unitStructure } from '../lessons/lessonData';
import { extractModuleId, extractUnitId } from '../utils/progressSync';
import { logger } from '../utils/logger';

export const useModuleCompletion = () => {
  const supabaseProgress = useSupabaseProgress();

  // Helper function to get unit info for a lesson
  const getUnitForLesson = useCallback((lessonId) => {
    return unitStructure.find(unit => {
      const [start, end] = unit.lessonRange;
      return lessonId >= start && lessonId <= end;
    });
  }, []);

  // Handle module completion
  const handleModuleComplete = useCallback(async (
    moduleId, 
    examScore, 
    timeSpent, 
    goToNext = false,
    completedExercises,
    setCurrentLesson,
    urlManager
  ) => {
    logger.log('Module complete - moduleId:', moduleId, 'type:', typeof moduleId, 'score:', examScore, 'goToNext:', goToNext);

    if (!moduleId) {
      logger.error('handleModuleComplete called with null/undefined moduleId');
      return;
    }

    if (supabaseProgress) {
      try {
        const lesson = lessons.find(l => l.id === moduleId);
        const unitInfo = getUnitForLesson(moduleId);

        logger.log('[DEBUG] Found lesson:', lesson ? lesson.title : 'NOT FOUND');
        logger.log('[DEBUG] Found unitInfo:', unitInfo ? unitInfo.title : 'NOT FOUND');

        if (lesson && unitInfo) {
          // Debug logging for unit exams
          if (lesson.isUnitExam) {
            logger.log(`[DEBUG] Unit exam completion - moduleId: ${moduleId}`);
            logger.log(`[DEBUG] lesson.exercises?.length:`, lesson.exercises?.length);
            logger.log(`[DEBUG] lesson.exerciseConfig?.items?.length:`, lesson.exerciseConfig?.items?.length);
            logger.log(`[DEBUG] lesson.isUnitExam:`, lesson.isUnitExam);
            logger.log(`[DEBUG] examScore:`, examScore);
          }

          // Calculate actual exercise count
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
            logger.log(`[DEBUG] Using actualExerciseCount: ${actualExerciseCount}`);
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
        logger.error('Error updating module progress:', error);
      }
    }

    if (goToNext) {
      logger.log('goToNext is true, finding next module after:', moduleId);

      // Go to next module - find the next lesson in sequence
      const currentIndex = lessons.findIndex(l => l.id === moduleId);
      logger.log('Current module index in lessons array:', currentIndex, 'Total lessons:', lessons.length);

      if (currentIndex === -1) {
        logger.error('Current module not found in lessons array. moduleId:', moduleId, 'Type:', typeof moduleId);
        logger.error('Available lesson IDs:', lessons.map(l => l.id));
        alert('Error: Could not find current module. Returning to module list.');
        setCurrentLesson(null);
        urlManager.cleanUrl();
        return;
      }

      const nextModule = lessons[currentIndex + 1];
      logger.log('Next module:', nextModule ? `ID ${nextModule.id} - ${nextModule.title}` : 'NONE (end of lessons)');

      if (nextModule && nextModule.id) {
        logger.log('✓ Navigating from module', moduleId, 'to', nextModule.id);
        setCurrentLesson(nextModule.id);
        urlManager.setModule(nextModule.id);
        window.scrollTo(0, 0);
      } else {
        // No more modules - completed all!
        logger.log('Completed all modules!');
        alert('🎉 Congratulations! You\'ve completed all available modules!');
        setCurrentLesson(null);
        urlManager.cleanUrl();
        window.scrollTo(0, 0);
      }
    }
  }, [supabaseProgress, getUnitForLesson]);

  return {
    handleModuleComplete,
    getUnitForLesson
  };
};
