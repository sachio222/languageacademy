/**
 * Section Registry - Centralized configuration for all module sections
 * Provides flexible section management with completion logic and time tracking
 */

// Section Registry - Single source of truth for all sections
export const SECTION_REGISTRY = {
  "vocabulary-intro": {
    id: "vocabulary-intro",
    label: "Vocabulary\nIntro",
    view: "intro",
    color: "#8B5CF6",
    pexelsImage:
      "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 1,
    enabled: true,

    // Completion logic function
    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["vocabulary-intro"];

      // Check if explicitly completed via section tracking
      if (sectionData?.completed_at) return "completed";

      // Legacy: Check if all concepts understood (new logic we discussed)
      if (lesson.concepts && lesson.concepts.length > 0) {
        const conceptsUnderstood =
          sectionData?.progress_data?.concepts_understood || 0;
        if (conceptsUnderstood >= lesson.concepts.length) return "completed";
      }

      // Legacy: Complete if study mode or practice started
      if (
        moduleProgress?.study_mode_completed ||
        moduleProgress?.completed_exercises > 0
      ) {
        return "completed";
      }

      return "active"; // First section is always active
    },

    // Prerequisites (empty for first section)
    requires: [],

    // Feature flags and requirements
    features: ["concepts", "vocabulary"],
    timeTracking: true,
  },

  "flash-cards": {
    id: "flash-cards",
    label: "Flash\nCards",
    view: "study",
    color: "#3B82F6",
    pexelsImage:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 2,
    enabled: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["flash-cards"];

      // Check section-specific completion
      if (sectionData?.completed_at) return "completed";

      // Legacy: Check module progress
      if (moduleProgress?.study_mode_completed) return "completed";

      return "incomplete";
    },

    requires: ["vocabulary-intro"],
    features: ["flashcards", "spaced-repetition"],
    timeTracking: true,
  },

  "speed-match": {
    id: "speed-match",
    label: "Speed\nMatch",
    view: "speedmatch",
    color: "#10B981",
    pexelsImage:
      "https://images.pexels.com/photos/13633156/pexels-photo-13633156.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 3,
    enabled: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["speed-match"];

      // Check if speed match was actually completed with a score
      if (sectionData?.completed_at && sectionData?.progress_data?.score) {
        return "completed";
      }

      // Legacy fallback: assume completed if practice started (old logic)
      if (moduleProgress?.completed_exercises > 0) return "completed";

      return "incomplete";
    },

    requires: ["flash-cards"],
    features: ["games", "timing"],
    timeTracking: true,

    // Minimum vocabulary required for speed match
    minVocabulary: 4,
  },

  writing: {
    id: "writing",
    label: "Writing",
    view: "practice",
    color: "#F59E0B",
    pexelsImage:
      "https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 4,
    enabled: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["writing"];

      // Check section-specific completion
      if (sectionData?.completed_at) return "completed";

      // Check if all exercises completed
      const totalExercises = lesson.exercises?.length || 0;
      if (moduleProgress?.completed_exercises >= totalExercises)
        return "completed";

      return "incomplete";
    },

    requires: ["speed-match"],
    features: ["exercises", "practice"],
    timeTracking: true,
  },

  pronunciation: {
    id: "pronunciation",
    label: "Pronunciation",
    view: "pronunciation",
    color: "#EF4444",
    pexelsImage:
      "https://images.pexels.com/photos/164960/pexels-photo-164960.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 5,
    enabled: true,
    isPremium: true,
    comingSoon: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["pronunciation"];

      if (sectionData?.completed_at) return "completed";

      // Custom pronunciation completion logic
      const pronunciationData = sectionData?.progress_data;
      const vocabularyCount = lesson.vocabularyReference?.length || 0;
      const recordingsCount = pronunciationData?.recordings_count || 0;

      // Complete if recorded 80% of vocabulary
      if (vocabularyCount > 0 && recordingsCount >= vocabularyCount * 0.8) {
        return "completed";
      }

      return "incomplete";
    },

    requires: ["writing"],
    features: ["speech-recognition", "audio"],
    timeTracking: true,
  },

  conversation: {
    id: "conversation",
    label: "Conversation",
    view: "conversation",
    color: "#06B6D4",
    pexelsImage:
      "https://images.pexels.com/photos/3886091/pexels-photo-3886091.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 6,
    enabled: true,
    isPremium: true,
    comingSoon: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["conversation"];

      if (sectionData?.completed_at) return "completed";

      // Custom conversation completion logic
      const conversationData = sectionData?.progress_data;
      const scenariosCompleted = conversationData?.scenarios_completed || 0;

      // Complete if completed 3 scenarios
      if (scenariosCompleted >= 3) return "completed";

      return "incomplete";
    },

    requires: ["pronunciation"],
    features: ["dialogue", "scenarios"],
    timeTracking: true,
  },

  "next-module": {
    id: "next-module",
    label: "Next\nModule →",
    view: "next",
    color: "#6B7280",
    pexelsImage:
      "https://images.pexels.com/photos/442584/pexels-photo-442584.jpeg",
    hasImage: true,
    order: 999,
    enabled: true,
    isSpecial: true,

    getCompletionStatus: (
      moduleProgress,
      sectionProgress,
      lesson,
      allSections
    ) => {
      // Check if all non-special, enabled, non-premium sections are complete
      const regularSections = allSections.filter(
        (s) => !s.isSpecial && s.enabled && !s.isPremium && !s.comingSoon
      );
      const allComplete = regularSections.every(
        (section) =>
          section.getCompletionStatus(
            moduleProgress,
            sectionProgress,
            lesson,
            allSections
          ) === "completed"
      );
      return allComplete ? "enabled" : "disabled";
    },

    requires: [], // Calculated dynamically
    features: ["navigation"],
    timeTracking: false, // No time tracking for navigation
  },
};

// Helper function to get active sections for a module
export const getActiveSections = (moduleType = "standard") => {
  return Object.values(SECTION_REGISTRY)
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);
};

// Helper function to check if section should be available for a lesson
export const isSectionAvailable = (sectionId, lesson) => {
  const section = SECTION_REGISTRY[sectionId];
  if (!section || !section.enabled) return false;

  // Check minimum vocabulary requirement
  if (
    section.minVocabulary &&
    (!lesson.vocabularyReference ||
      lesson.vocabularyReference.length < section.minVocabulary)
  ) {
    return false;
  }

  // Add other availability checks here (e.g., module-specific rules)
  return true;
};

// Helper function to check prerequisites
export const arePrerequisitesMet = (
  sectionId,
  moduleProgress,
  sectionProgress,
  lesson
) => {
  const section = SECTION_REGISTRY[sectionId];
  if (!section || !section.requires || section.requires.length === 0)
    return true;

  const allSections = getActiveSections();

  return section.requires.every((requiredSectionId) => {
    const requiredSection = SECTION_REGISTRY[requiredSectionId];
    if (!requiredSection) return false;

    const status = requiredSection.getCompletionStatus(
      moduleProgress,
      sectionProgress,
      lesson,
      allSections
    );
    return status === "completed";
  });
};

// Helper function to get section status with prerequisite checking
export const getSectionStatus = (
  sectionId,
  moduleProgress,
  sectionProgress,
  lesson
) => {
  const section = SECTION_REGISTRY[sectionId];
  if (!section) return "incomplete";

  const allSections = getActiveSections();

  // Check prerequisites first
  if (
    !arePrerequisitesMet(sectionId, moduleProgress, sectionProgress, lesson)
  ) {
    return "locked";
  }

  // Get completion status from section logic
  return section.getCompletionStatus(
    moduleProgress,
    sectionProgress,
    lesson,
    allSections
  );
};
