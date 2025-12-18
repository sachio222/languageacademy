import { useState, useEffect, useCallback } from "react";
import { useUrlManager } from "./useUrlManager";

export const useNavigation = () => {
  const urlManager = useUrlManager();
  const [currentLesson, setCurrentLesson] = useState(
    urlManager.getInitialLesson
  );
  const [previousLesson, setPreviousLesson] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showReferenceModules, setShowReferenceModules] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("admin") === "true";
  });
  const [showCommunicationAdmin, setShowCommunicationAdmin] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("communication-admin") === "true";
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      urlManager.handlePopState(setCurrentLesson, setShowFeedbackAdmin);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [urlManager]);

  // Navigation handlers
  const handleLessonSelect = useCallback(
    (lessonId) => {
      setCurrentLesson(lessonId);
      urlManager.setModule(lessonId);
      window.scrollTo(0, 0);
    },
    [urlManager]
  );

  const handleBack = useCallback(() => {
    setCurrentLesson(null);
    urlManager.cleanUrl();
  }, [urlManager]);

  const handleShowReferenceModules = useCallback(() => {
    setCurrentLesson("reference");
    urlManager.setReference();
  }, [urlManager]);

  const handleShowVocabularyDashboard = useCallback(() => {
    setCurrentLesson("vocabulary");
    urlManager.setVocabulary();
  }, [urlManager]);

  const handleShowReportCard = useCallback(() => {
    setCurrentLesson("report-card");
    urlManager.setReportCard();
  }, [urlManager]);

  const handleShowReportCardAdmin = useCallback(() => {
    setCurrentLesson("report-card-admin");
    urlManager.setReportCardAdmin();
  }, [urlManager]);

  const handleShowTeacherClasses = useCallback(() => {
    setCurrentLesson("teacher-classes");
    const params = new URLSearchParams(window.location.search);
    params.set("view", "teacher-classes");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, []);

  const handleBackToLanding = useCallback(() => {
    setCurrentLesson(null);
    urlManager.cleanUrl();
  }, [urlManager]);

  const handleOpenDictionary = useCallback(() => {
    // Store the current lesson before switching to dictionary
    if (currentLesson !== "dictionary") {
      setPreviousLesson(currentLesson);
    }
    setCurrentLesson("dictionary");
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

  const handleShowCommunicationAdmin = useCallback(() => {
    setShowCommunicationAdmin(true);
    const params = new URLSearchParams(window.location.search);
    params.set("communication-admin", "true");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, []);

  const handleCloseCommunicationAdmin = useCallback(() => {
    setShowCommunicationAdmin(false);
    const params = new URLSearchParams(window.location.search);
    params.delete("communication-admin");
    const newSearch = params.toString();
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${newSearch ? "?" + newSearch : ""}`
    );
  }, []);

  return {
    // State
    currentLesson,
    previousLesson,
    sidebarCollapsed,
    mobileNavOpen,
    showReferenceModules,
    showFeedbackForm,
    showFeedbackAdmin,
    showCommunicationAdmin,

    // Setters
    setCurrentLesson,
    setSidebarCollapsed,
    setMobileNavOpen,
    setShowReferenceModules,
    setShowFeedbackForm,
    setShowFeedbackAdmin,
    setShowCommunicationAdmin,

    // Handlers
    handleLessonSelect,
    handleBack,
    handleShowReferenceModules,
    handleShowVocabularyDashboard,
    handleShowReportCard,
    handleShowReportCardAdmin,
    handleShowTeacherClasses,
    handleBackToLanding,
    handleOpenDictionary,
    handleCloseDictionary,
    handleShowAdmin,
    handleCloseAdmin,
    handleShowCommunicationAdmin,
    handleCloseCommunicationAdmin,

    // URL Manager
    urlManager,
  };
};
