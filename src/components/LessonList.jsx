import { calculateLessonProgress } from '../lessons/testRunner';
import { unitStructure } from '../lessons/lessonData';
import { Award, BookOpen, TextCursorInput, Sparkles, Grid3x3, List, ChevronDown, ChevronUp, BadgeCheck } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import React, { useState, useEffect } from 'react';

function LessonList({ lessons, onLessonSelect, completedExercises, onShowReferenceModules, onShowVocabularyDashboard, onShowReportCard, showWordsLearned, isAdmin }) {
  const { moduleProgress } = useSupabaseProgress();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'split'
  const [selectedModuleId, setSelectedModuleId] = useState(null);


  // Handle view mode change and auto-select next lesson
  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    if (newViewMode === 'split' && !selectedModuleId) {
      const nextLessonId = findNextIncompleteLesson();
      if (nextLessonId) {
        setSelectedModuleId(nextLessonId);
      }
    }
  };
  // Helper to get exercise count for different module types
  const getExerciseCount = (lesson) => {
    if (lesson.isFillInTheBlank && lesson.sentences) {
      return lesson.sentences.length;
    }
    if (lesson.isUnitExam && lesson.exerciseConfig?.items) {
      return lesson.exerciseConfig.items.length;
    }
    if (lesson.isHelpModule) {
      // Help modules are considered "1 exercise" for completion purposes
      return 1;
    }
    return lesson.exercises?.length || 0;
  };

  // Helper to get completed exercise count
  const getCompletedCount = (lesson) => {
    // For fill-in-blank, exams, and help modules, check module_progress table
    if (lesson.isFillInTheBlank || lesson.isUnitExam || lesson.isHelpModule) {
      const modId = extractModuleId(lesson);
      const modProgress = moduleProgress?.[modId];
      // If module is marked complete, return total count
      return modProgress?.completed_at ? getExerciseCount(lesson) : 0;
    }
    // Normal modules: count individual exercises
    return lesson.exercises?.filter(ex => completedExercises.has(ex.id)).length || 0;
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
        const completed = getCompletedCount(lesson);
        const total = getExerciseCount(lesson);
        const progress = calculateLessonProgress(completed, total);
        if (progress < 100) {
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
        const completed = getCompletedCount(lesson);
        const total = getExerciseCount(lesson);
        const progress = calculateLessonProgress(completed, total);
        if (progress < 100) {
          return unitInfo.id;
        }
      }
    }
    return null; // All lessons complete
  };

  // Get the next lesson ID for highlighting
  const nextLessonId = findNextIncompleteLesson();

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
  }, [moduleProgress, completedExercises, hasInitializedCollapse]);

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
    const completedLessons = unitLessons.filter(lesson => {
      const completed = getCompletedCount(lesson);
      const total = getExerciseCount(lesson);
      return completed === total && total > 0;
    }).length;
    return { completed: completedLessons, total: unitLessons.length };
  };

  return (
    <div className="lesson-list">
      {/* Dashboard Header */}
      <DashboardHeader
        completedExercises={completedExercises}
        onLessonSelect={onLessonSelect}
        onShowReferenceModules={onShowReferenceModules}
        onShowVocabularyDashboard={onShowVocabularyDashboard}
        onShowReportCard={onShowReportCard}
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
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('grid')}
              title="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('split')}
              title="Split view"
            >
              <List size={18} />
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
                    <h3 className="unit-title">{unitInfo.title}</h3>
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
                    const completed = getCompletedCount(lesson);
                    const total = getExerciseCount(lesson);
                    const progress = calculateLessonProgress(completed, total);
                    const isComplete = progress === 100;
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
                            {completed}/{total} exercises
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
                const completedCount = getCompletedCount(lesson);
                const totalCount = getExerciseCount(lesson);
                const progress = calculateLessonProgress(completedCount, totalCount);
                if (progress === 100) {
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
                    const completed = getCompletedCount(lesson);
                    const total = getExerciseCount(lesson);
                    const progress = calculateLessonProgress(completed, total);
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
                    const completed = getCompletedCount(lesson);
                    const total = getExerciseCount(lesson);
                    const progress = calculateLessonProgress(completed, total);
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
          <div className="split-view-detail">
            {selectedModuleId ? (() => {
              const lesson = lessons.find(l => l.id === selectedModuleId);
              if (!lesson) return null;

              const completed = getCompletedCount(lesson);
              const total = getExerciseCount(lesson);
              const progress = calculateLessonProgress(completed, total);
              const isComplete = progress === 100;

              return (
                <div className="split-detail-content">
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
        </div>
      )}
    </div>
  );
}

export default LessonList;


