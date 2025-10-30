import { useState, useEffect, useCallback } from 'react';
import { useUrlManager } from './useUrlManager';

export const useNavigation = () => {
  const urlManager = useUrlManager();
  const [currentLesson, setCurrentLesson] = useState(urlManager.getInitialLesson);
  const [previousLesson, setPreviousLesson] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showReferenceModules, setShowReferenceModules] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === 'true';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      urlManager.handlePopState(setCurrentLesson, setShowFeedbackAdmin);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [urlManager]);

  // Navigation handlers
  const handleLessonSelect = useCallback((lessonId) => {
    setCurrentLesson(lessonId);
    urlManager.setModule(lessonId);
    window.scrollTo(0, 0);
  }, [urlManager]);

  const handleBack = useCallback(() => {
    setCurrentLesson(null);
    urlManager.cleanUrl();
  }, [urlManager]);

  const handleShowReferenceModules = useCallback(() => {
    setCurrentLesson('reference');
    urlManager.setReference();
  }, [urlManager]);

  const handleShowVocabularyDashboard = useCallback(() => {
    setCurrentLesson('vocabulary');
    urlManager.setVocabulary();
  }, [urlManager]);

  const handleBackToLanding = useCallback(() => {
    setCurrentLesson(null);
    urlManager.cleanUrl();
  }, [urlManager]);

  const handleOpenDictionary = useCallback(() => {
    // Store the current lesson before switching to dictionary
    if (currentLesson !== 'dictionary') {
      setPreviousLesson(currentLesson);
    }
    setCurrentLesson('dictionary');
    urlManager.setDictionary();
  }, [currentLesson, urlManager]);

  const handleCloseDictionary = useCallback(() => {
    // Restore the previous lesson or go to main page if no previous lesson
    setCurrentLesson(previousLesson);
    setPreviousLesson(null);
    urlManager.cleanUrl();
  }, [previousLesson, urlManager]);

  const handleShowAdmin = useCallback(() => {
    setShowFeedbackAdmin(true);
    urlManager.setAdmin(true);
  }, [urlManager]);

  const handleCloseAdmin = useCallback(() => {
    setShowFeedbackAdmin(false);
    urlManager.setAdmin(false);
  }, [urlManager]);

  return {
    // State
    currentLesson,
    previousLesson,
    sidebarCollapsed,
    mobileNavOpen,
    showReferenceModules,
    showFeedbackForm,
    showFeedbackAdmin,
    
    // Setters
    setCurrentLesson,
    setSidebarCollapsed,
    setMobileNavOpen,
    setShowReferenceModules,
    setShowFeedbackForm,
    setShowFeedbackAdmin,
    
    // Handlers
    handleLessonSelect,
    handleBack,
    handleShowReferenceModules,
    handleShowVocabularyDashboard,
    handleBackToLanding,
    handleOpenDictionary,
    handleCloseDictionary,
    handleShowAdmin,
    handleCloseAdmin,
    
    // URL Manager
    urlManager
  };
};
