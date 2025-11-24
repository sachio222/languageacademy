/**
 * useHelpModuleCompletion - Shared logic for help module completion
 * Handles auto-completion, validation, and warning display
 * 
 * Reused by: VerbPatternHelp, QuestionsHelp, LiaisonHelp, CognatesHelp
 */

import { useState, useEffect, useCallback } from 'react';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { logger } from '../utils/logger';

export const useHelpModuleCompletion = (
  moduleId,
  understoodSections,
  totalSections,
  isAuthenticated
) => {
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);
  const { completeSectionProgress } = useSectionProgress();

  // Auto-complete interactive-help section when all sections understood
  useEffect(() => {
    const allSectionsUnderstood = understoodSections.size === totalSections;

    if (allSectionsUnderstood && isAuthenticated && moduleId) {
      logger.log(`Help module (${moduleId}): Auto-completing interactive-help section...`);

      completeSectionProgress(moduleId, 'interactive-help', {
        sections_understood: understoodSections.size,
        total_sections: totalSections,
        completion_method: 'all_sections_understood'
      }).then(result => {
        logger.log(`Help module (${moduleId}): Section completion successful`, result);
      }).catch(error => {
        logger.error(`Help module (${moduleId}): Error completing interactive-help section:`, error);
      });
    }
  }, [understoodSections.size, totalSections, isAuthenticated, moduleId, completeSectionProgress]);

  // Generate warning message
  const getWarningMessage = useCallback(() => {
    const remaining = totalSections - understoodSections.size;
    const baseMessage = "Please mark all sections as understood before continuing";
    
    if (remaining === 0 || understoodSections.size === 0) {
      return baseMessage;
    } else if (remaining === 1) {
      return `${baseMessage} - 1 more to go!`;
    } else {
      return `${baseMessage} - ${remaining} more to go!`;
    }
  }, [understoodSections.size, totalSections]);

  // Handle completion attempt
  const handleComplete = useCallback((onSuccess) => {
    const allUnderstood = understoodSections.size === totalSections;
    
    if (!allUnderstood) {
      setShowIncompleteWarning(true);
      setTimeout(() => setShowIncompleteWarning(false), 4000);
      return false;
    } else {
      if (onSuccess) onSuccess();
      return true;
    }
  }, [understoodSections.size, totalSections]);

  return {
    showIncompleteWarning,
    getWarningMessage,
    handleComplete,
    isComplete: understoodSections.size === totalSections
  };
};

