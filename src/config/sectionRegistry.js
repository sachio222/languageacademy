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

    // Completion logic function - pure section-based (legacy fallbacks removed)
    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["vocabulary-intro"];

      // Check if explicitly completed via section tracking
      if (sectionData?.completed_at) return "completed";

      // Check if all concepts understood
      if (lesson.concepts && lesson.concepts.length > 0) {
        const conceptsUnderstood =
          sectionData?.progress_data?.concepts_understood || 0;
        if (conceptsUnderstood >= lesson.concepts.length) return "completed";
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

      // Check section-specific completion only
      if (sectionData?.completed_at) return "completed";

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

      // Also accept completion without score (for migrated data)
      if (sectionData?.completed_at) return "completed";

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

      // Check section-specific completion only
      if (sectionData?.completed_at) return "completed";

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
    isPremium: true, // Premium Feature
    comingSoon: false,

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

  // === SPECIAL MODULE TYPE SECTIONS ===
  // These sections are for modules that don't use the standard intro/study/practice flow

  "practice-exercises": {
    id: "practice-exercises",
    label: "Practice\nExercises",
    view: "practice",
    color: "#F59E0B",
    pexelsImage:
      "https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 1,
    enabled: true,
    isModuleTypeSection: true, // Flag for special handling

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["practice-exercises"];
      if (sectionData?.completed_at) return "completed";

      // Complete if module is completed (for fill-in-blank modules)
      if (moduleProgress?.completed_at) return "completed";

      return "active";
    },

    requires: [],
    features: ["fill-in-blank", "practice"],
    timeTracking: true,
  },

  "exam-questions": {
    id: "exam-questions",
    label: "Exam\nQuestions",
    view: "exam",
    color: "#EF4444",
    pexelsImage:
      "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 1,
    enabled: true,
    isModuleTypeSection: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["exam-questions"];
      if (sectionData?.completed_at) return "completed";

      // Complete if exam passed
      if (moduleProgress?.exam_score !== null) return "completed";

      return "active";
    },

    requires: [],
    features: ["exam", "assessment"],
    timeTracking: true,
  },

  "interactive-help": {
    id: "interactive-help",
    label: "Interactive\nHelp",
    view: "help",
    color: "#8B5CF6",
    pexelsImage:
      "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 1,
    enabled: true,
    isModuleTypeSection: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["interactive-help"];
      if (sectionData?.completed_at) return "completed";

      // Complete if module completed (help modules are simple)
      if (moduleProgress?.completed_at) return "completed";

      return "active";
    },

    requires: [],
    features: ["help", "interactive"],
    timeTracking: true,
  },

  "reading-passage": {
    id: "reading-passage",
    label: "Reading\nPassage",
    view: "reading",
    color: "#10B981",
    pexelsImage:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 1,
    enabled: true,
    isModuleTypeSection: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["reading-passage"];
      if (sectionData?.completed_at) return "completed";

      // Complete if all reading exercises done
      const totalExercises = lesson.exercises?.length || 0;
      if (
        totalExercises > 0 &&
        moduleProgress?.completed_exercises >= totalExercises
      ) {
        return "completed";
      }

      return "active";
    },

    requires: [],
    features: ["reading", "comprehension"],
    timeTracking: true,
  },

  "reference-content": {
    id: "reference-content",
    label: "Reference\nContent",
    view: "reference",
    color: "#6366F1",
    pexelsImage:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    hasImage: true,
    order: 1,
    enabled: true,
    isModuleTypeSection: true,

    getCompletionStatus: (moduleProgress, sectionProgress, lesson) => {
      const sectionData = sectionProgress?.["reference-content"];
      if (sectionData?.completed_at) return "completed";

      return "active"; // Reference modules are always available
    },

    requires: [],
    features: ["reference", "lookup"],
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
      // Check if all non-special, enabled, non-premium sections AVAILABLE FOR THIS LESSON are complete
      const regularSections = allSections.filter(
        (s) =>
          !s.isSpecial &&
          s.enabled &&
          !s.isPremium &&
          !s.comingSoon &&
          isSectionAvailable(s.id, lesson)
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

  // Special handling for module-type sections
  if (section.isModuleTypeSection) {
    // Only show module-type sections for appropriate module types
    if (sectionId === "practice-exercises" && !lesson.isFillInTheBlank)
      return false;
    if (sectionId === "exam-questions" && !lesson.isUnitExam) return false;
    if (sectionId === "interactive-help" && !lesson.isHelpModule) return false;
    if (sectionId === "reading-passage" && !lesson.isReadingComprehension)
      return false;
    if (sectionId === "reference-content" && !lesson.isPhonicsReference)
      return false;

    // Module-type sections are available if the module type matches
    return true;
  }

  // Hide standard sections for special module types (they use their own module-type sections)
  if (!section.isSpecial) {
    if (
      lesson.isFillInTheBlank ||
      lesson.isUnitExam ||
      lesson.isHelpModule ||
      lesson.isReadingComprehension ||
      lesson.isPhonicsReference
    ) {
      return false;
    }
  }

  // Check minimum vocabulary requirement for standard sections
  if (
    section.minVocabulary &&
    (!lesson.vocabularyReference ||
      lesson.vocabularyReference.length < section.minVocabulary)
  ) {
    return false;
  }

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
