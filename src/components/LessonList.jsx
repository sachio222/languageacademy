import { unitStructure } from '../lessons/lessonData';
import { Award, BookOpen, TextCursorInput, Sparkles, Grid3x3, List, ChevronDown, ChevronUp, BadgeCheck, X } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import JoinClassBanner from './JoinClassBanner';
import JoinClass from './JoinClass';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useSectionProgress } from '../hooks/useSectionProgress';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import { getModuleCompletionStatus, getModuleCompletionPercentage, isModuleComplete, getExerciseCount } from '../utils/moduleCompletion';
import React, { useState, useEffect, useMemo } from 'react';

function LessonList({ lessons, onLessonSelect, completedExercises, onShowReferenceModules, onShowVocabularyDashboard, onShowReportCard, onShowTeacherClasses, showWordsLearned, isAdmin }) {
  const { moduleProgress } = useSupabaseProgress();
  const { sectionProgress } = useSectionProgress();
  const { profile } = useAuth();
  const supabaseClient = useSupabaseClient();
  const [viewMode, setViewMode] = useState('split'); // 'grid' or 'split'
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [showJoinClass, setShowJoinClass] = useState(false);
  const [hasClasses, setHasClasses] = useState(null); // null = loading, true/false = result


  // Handle view mode change and auto-select next lesson
  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    // Don't auto-select on mobile to avoid blocking the screen
    if (newViewMode === 'split' && !selectedModuleId && !isMobile) {
      const nextLessonId = findNextIncompleteLesson();
      if (nextLessonId) {
        setSelectedModuleId(nextLessonId);
      }
    }
  };
  // Calculate completion for a lesson using unified completion service
  const getLessonCompletion = (lesson) => {
    return getModuleCompletionPercentage(lesson, sectionProgress, moduleProgress);
  };

  // Check if lesson is complete using unified completion service
  const isLessonComplete = (lesson) => {
    return isModuleComplete(lesson, sectionProgress, moduleProgress);
  };

  // Group lessons by pedagogical unit
  const getLessonsForUnit = (unitInfo) => {
    const [start, end] = unitInfo.lessonRange;
    return lessons.filter(lesson => lesson.id >= start && lesson.id <= end);
  };

  // Function to find the next incomplete lesson
  const findNextIncompleteLesson = () => {
    for (const unitInfo of unitStructure) {
      const unitLessons = getLessonsForUnit(unitInfo);
      for (const lesson of unitLessons) {
        if (!isLessonComplete(lesson)) {
          return lesson.id;
        }
      }
    }
    return null; // All lessons complete
  };

  // Find which unit contains the next incomplete lesson
  const findUnitWithNextLesson = () => {
    for (const unitInfo of unitStructure) {
      const unitLessons = getLessonsForUnit(unitInfo);
      for (const lesson of unitLessons) {
        if (!isLessonComplete(lesson)) {
          return unitInfo.id;
        }
      }
    }
    return null; // All lessons complete
  };

  // Get the next lesson ID for highlighting (memoized to recalculate when progress changes)
  const nextLessonId = useMemo(() => {
    return findNextIncompleteLesson();
  }, [moduleProgress, sectionProgress, lessons]);

  // Track which units have collapsed completed modules (by default, all are collapsed)
  const [collapsedCompletedInUnits, setCollapsedCompletedInUnits] = useState(
    new Set(unitStructure.map(unit => unit.id))
  );

  // Track which units are collapsed in grid view (default: all collapsed except current unit)
  const [collapsedUnits, setCollapsedUnits] = useState(new Set());
  const [hasInitializedCollapse, setHasInitializedCollapse] = useState(false);

  // Initialize collapsed state once progress data is loaded
  useEffect(() => {
    if (!hasInitializedCollapse && moduleProgress && Object.keys(moduleProgress).length > 0) {
      const currentUnitId = findUnitWithNextLesson();
      const allUnitIds = unitStructure.map(unit => unit.id);
      setCollapsedUnits(new Set(allUnitIds.filter(id => id !== currentUnitId)));
      setHasInitializedCollapse(true);
    }
  }, [moduleProgress, sectionProgress, hasInitializedCollapse]);

  // Track window size for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if student is in any classes (for banner display)
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!profile || !supabaseClient) {
        return;
      }

      // TEMP: Force show banner for super_admin to preview
      // Remove this block after testing
      const params = new URLSearchParams(window.location.search);
      if (params.get('preview-banner') === 'true') {
        setHasClasses(false); // Show banner
        return;
      }

      // Don't show banner for teachers/admins
      if (profile.role !== 'student') {
        setHasClasses(true);
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('class_enrollments')
          .select('id')
          .eq('student_id', profile.id)
          .eq('status', 'active')
          .limit(1);

        if (error) throw error;

        setHasClasses(data && data.length > 0);
      } catch (err) {
        setHasClasses(true); // On error, don't show banner
      }
    };

    checkEnrollment();
  }, [profile, supabaseClient]);

  // Auto-select next lesson when in split view and no lesson is selected
  // Wait for progress data to be loaded before selecting
  // Skip auto-selection on mobile to avoid blocking the screen
  useEffect(() => {
    if (
      viewMode === 'split' &&
      !selectedModuleId &&
      nextLessonId &&
      moduleProgress &&
      Object.keys(moduleProgress).length > 0 &&
      !isMobile // Don't auto-select on mobile
    ) {
      setSelectedModuleId(nextLessonId);
    }
  }, [viewMode, selectedModuleId, nextLessonId, moduleProgress, isMobile]);

  // Toggle showing completed modules for a unit
  const toggleShowCompleted = (unitId) => {
    setCollapsedCompletedInUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
      } else {
        next.add(unitId);
      }
      return next;
    });
  };

  // Toggle unit accordion in grid view
  const toggleUnitCollapse = (unitId) => {
    setCollapsedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
      } else {
        next.add(unitId);
      }
      return next;
    });
  };

  const getUnitProgress = (unitInfo) => {
    const unitLessons = getLessonsForUnit(unitInfo);
    const completedLessons = unitLessons.filter(lesson => isLessonComplete(lesson)).length;
    return { completed: completedLessons, total: unitLessons.length };
  };

  return (
    <div className="lesson-list">
      {/* Join class banner (only for students not in any class) */}
      {hasClasses === false && (
        <JoinClassBanner onJoinClass={() => setShowJoinClass(true)} />
      )}

      {/* Join class modal */}
      {showJoinClass && (
        <JoinClass onClose={() => setShowJoinClass(false)} />
      )}

      {/* Dashboard Header */}
      <DashboardHeader
        completedExercises={completedExercises}
        onLessonSelect={onLessonSelect}
        onShowReferenceModules={onShowReferenceModules}
        onShowVocabularyDashboard={onShowVocabularyDashboard}
        onShowReportCard={onShowReportCard}
        onShowTeacherClasses={onShowTeacherClasses}
        showWordsLearned={showWordsLearned}
        isAdmin={isAdmin}
      />

      <div className="lesson-list-header">
        <div className="lesson-list-header-content">
          <div>
            <h2>All Lessons</h2>
            <p>Master French through guided lessons and real stories</p>
          </div>
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('split')}
              title="Split view"
            >
              <List size={18} />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('grid')}
              title="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        // Original grid view
        unitStructure.map((unitInfo) => {
          const unitLessons = getLessonsForUnit(unitInfo);
          const { completed, total } = getUnitProgress(unitInfo);
          const unitComplete = completed === total;
          const isCollapsed = collapsedUnits.has(unitInfo.id);

          return (
            <div key={unitInfo.id} className={`unit-section ${isCollapsed ? 'unit-collapsed' : ''}`}>
              <div
                className="unit-header unit-header-accordion"
                onClick={() => toggleUnitCollapse(unitInfo.id)}
              >
                <div className="unit-icon">{unitInfo.icon}</div>
                <div className="unit-content">
                  <div className="unit-title-row">
                    <h3 className="unit-title">
                      {unitInfo.title}
                    </h3>
                    {unitComplete && (
                      <span className="unit-badge-complete">
                        <BadgeCheck size={16} strokeWidth={2} />
                        <span>Complete</span>
                      </span>
                    )}
                  </div>
                  {!isCollapsed && <p className="unit-description">{unitInfo.description}</p>}
                  {isCollapsed && (
                    <div className="unit-collapsed-info">
                      <span className="unit-collapsed-count">{completed}/{total}</span>
                      <span className="unit-collapsed-separator">•</span>
                      <span className="unit-collapsed-description">{unitInfo.description}</span>
                    </div>
                  )}
                </div>
                <button
                  className="unit-accordion-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUnitCollapse(unitInfo.id);
                  }}
                  aria-label={isCollapsed ? 'Expand unit' : 'Collapse unit'}
                >
                  {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </button>
              </div>

              {!isCollapsed && (
                <div className="lessons-grid">
                  {unitLessons.map((lesson) => {
                    const progress = getLessonCompletion(lesson);
                    const isComplete = isLessonComplete(lesson);
                    const isNextLesson = lesson.id === nextLessonId;

                    return (
                      <div
                        key={lesson.id}
                        className={`lesson-card ${isComplete ? 'complete' : ''} ${lesson.isReadingComprehension ? 'reading-milestone' : ''} ${lesson.isUnitExam ? 'final-exam' : ''} ${lesson.isFillInTheBlank ? 'fill-in-blank' : ''} ${isNextLesson ? 'next-lesson' : ''}`}
                        onClick={() => onLessonSelect(lesson.id)}
                      >
                        <div className="lesson-card-header">
                          {lesson.isUnitExam && (
                            <Award size={20} className="lesson-exam-icon" />
                          )}
                          {lesson.isReadingComprehension && (
                            <BookOpen size={20} className="lesson-reading-icon" />
                          )}
                          {lesson.isFillInTheBlank && (
                            <TextCursorInput size={20} className="lesson-practice-icon" />
                          )}
                          {lesson.isHelpModule && (
                            <Sparkles size={20} className="lesson-help-icon" />
                          )}
                          <h3>{lesson.title}</h3>
                          {isComplete && <span className="badge-complete">✓</span>}
                        </div>

                        <p className="lesson-description">{lesson.description}</p>

                        <div className="lesson-stats">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="progress-text">
                            {progress}% complete
                          </span>
                        </div>

                        {lesson.concepts.length > 0 && (
                          <div className="lesson-concepts">
                            <strong>Concepts:</strong>
                            <ul>
                              {lesson.concepts.slice(0, 2).map((concept, idx) => (
                                <li key={idx}>{concept.term}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        // Split view
        <div className="split-view-container">
          <div className="split-view-list">
            {unitStructure.map((unitInfo) => {
              const unitLessons = getLessonsForUnit(unitInfo);
              const { completed, total } = getUnitProgress(unitInfo);

              // Separate incomplete and complete lessons
              const incompleteLessons = [];
              const completedLessons = [];

              unitLessons.forEach(lesson => {
                if (isLessonComplete(lesson)) {
                  completedLessons.push(lesson);
                } else {
                  incompleteLessons.push(lesson);
                }
              });

              const showCompleted = !collapsedCompletedInUnits.has(unitInfo.id);

              return (
                <div key={unitInfo.id} className="split-unit-section">
                  <div className="split-unit-header">
                    <span className="split-unit-icon">{unitInfo.icon}</span>
                    <span className="split-unit-title">{unitInfo.title}</span>
                    <span className="split-unit-count">{completed}/{total}</span>
                  </div>

                  {/* Show incomplete lessons */}
                  {incompleteLessons.map((lesson) => {
                    const progress = getLessonCompletion(lesson);
                    const isSelected = selectedModuleId === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`split-lesson-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedModuleId(lesson.id)}
                      >
                        <div className="split-lesson-header">
                          {lesson.isUnitExam && <Award size={16} className="split-lesson-icon exam" />}
                          {lesson.isReadingComprehension && <BookOpen size={16} className="split-lesson-icon reading" />}
                          {lesson.isFillInTheBlank && <TextCursorInput size={16} className="split-lesson-icon practice" />}
                          {lesson.isHelpModule && <Sparkles size={16} className="split-lesson-icon help" />}
                          {!lesson.isUnitExam && !lesson.isReadingComprehension && !lesson.isFillInTheBlank && !lesson.isHelpModule && (
                            <span className="split-lesson-number">{lesson.id}</span>
                          )}
                          <span className="split-lesson-title">{lesson.title.replace(/^Module \d+:\s*/, '')}</span>
                        </div>
                        <div className="split-lesson-progress-bar">
                          <div
                            className="split-lesson-progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/* Show completed toggle button */}
                  {completedLessons.length > 0 && (
                    <button
                      className="split-unit-show-completed"
                      onClick={() => toggleShowCompleted(unitInfo.id)}
                    >
                      {showCompleted ? 'Hide' : 'Show'} {completedLessons.length} completed
                    </button>
                  )}

                  {/* Show completed lessons if expanded */}
                  {showCompleted && completedLessons.map((lesson) => {
                    const progress = getLessonCompletion(lesson);
                    const isSelected = selectedModuleId === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`split-lesson-item complete ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedModuleId(lesson.id)}
                      >
                        <div className="split-lesson-header">
                          {lesson.isUnitExam && <Award size={14} className="split-lesson-icon exam" />}
                          {lesson.isReadingComprehension && <BookOpen size={14} className="split-lesson-icon reading" />}
                          {lesson.isFillInTheBlank && <TextCursorInput size={14} className="split-lesson-icon practice" />}
                          {lesson.isHelpModule && <Sparkles size={14} className="split-lesson-icon help" />}
                          {!lesson.isUnitExam && !lesson.isReadingComprehension && !lesson.isFillInTheBlank && !lesson.isHelpModule && (
                            <span className="split-lesson-number">{lesson.id}</span>
                          )}
                          <span className="split-lesson-title">{lesson.title.replace(/^Module \d+:\s*/, '')}</span>
                          <span className="split-lesson-check">✓</span>
                        </div>
                        <div className="split-lesson-progress-bar">
                          <div
                            className="split-lesson-progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <>
            {/* Mobile backdrop overlay */}
            {selectedModuleId && (
              <div
                className="split-detail-backdrop"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModuleId(null);
                }}
              />
            )}

            <div className={`split-view-detail ${selectedModuleId ? 'mobile-open' : ''}`}>
              {selectedModuleId ? (() => {
                const lesson = lessons.find(l => l.id === selectedModuleId);
                if (!lesson) return null;

                const completionStatus = getModuleCompletionStatus(lesson, sectionProgress, moduleProgress);
                const progress = completionStatus.percentage;
                const isComplete = completionStatus.isComplete;
                // For display: show section completion counts, or fall back to exercise count
                const completed = completionStatus.completedCount;
                const total = completionStatus.totalCount || getExerciseCount(lesson);

                return (
                  <div className="split-detail-content">
                    {/* Mobile close button */}
                    <button
                      className="split-detail-close-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedModuleId(null);
                      }}
                      aria-label="Close"
                    >
                      <X />
                    </button>

                    <div className="split-detail-header">
                      {lesson.isUnitExam && <Award size={24} className="split-detail-icon exam" />}
                      {lesson.isReadingComprehension && <BookOpen size={24} className="split-detail-icon reading" />}
                      {lesson.isFillInTheBlank && <TextCursorInput size={24} className="split-detail-icon practice" />}
                      {lesson.isHelpModule && <Sparkles size={24} className="split-detail-icon help" />}
                      <h2>{lesson.title}</h2>
                      {isComplete && <span className="split-detail-badge">✓ Complete</span>}
                    </div>

                    <p className="split-detail-description">{lesson.description}</p>

                    <div className="split-detail-action-row">
                      <div className="split-detail-stats-inline">
                        <div className="split-stat-inline">
                          <span className="split-stat-value-inline">{completed}/{total}</span>
                          <span className="split-stat-label-inline">Exercises</span>
                        </div>
                        <div className="split-stat-inline">
                          <span className="split-stat-value-inline">{progress}%</span>
                          <span className="split-stat-label-inline">Complete</span>
                        </div>
                      </div>
                      <button
                        className="split-detail-start-btn"
                        onClick={() => onLessonSelect(lesson.id)}
                      >
                        {isComplete ? 'Review Lesson' : 'Start'}
                      </button>
                    </div>

                    <div className="split-detail-progress">
                      <div className="split-detail-progress-bar">
                        <div
                          className="split-detail-progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {lesson.concepts && lesson.concepts.length > 0 && (
                      <div className="split-detail-concepts">
                        <h3>Key Concepts</h3>
                        <ul>
                          {lesson.concepts.map((concept, idx) => (
                            <li key={idx}>
                              <strong>{concept.term}</strong>
                              {concept.definition && `: ${concept.definition}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })() : (
                <div className="split-detail-empty">
                  <p>Select a lesson to view details</p>
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default LessonList;


