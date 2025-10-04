import { useState, useMemo } from 'react';
import { unitStructure } from '../lessons/lessonData';
import '../styles/LeftNav.css';

function LeftNav({ lessons, currentLesson, onLessonSelect, completedExercises, isCollapsed, onToggleCollapse }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedUnits, setCollapsedUnits] = useState(new Set());
  const [activeTab, setActiveTab] = useState('tree'); // 'tree' or 'vocab'

  // Toggle unit collapse
  const toggleUnit = (unitId) => {
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

  // Get lessons for a unit
  const getLessonsForUnit = (unitInfo) => {
    const [start, end] = unitInfo.lessonRange;
    return lessons.filter(lesson => lesson.id >= start && lesson.id <= end);
  };

  // Search/filter lessons
  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) {
      return unitStructure.map(unit => ({
        ...unit,
        lessons: getLessonsForUnit(unit)
      }));
    }

    const query = searchQuery.toLowerCase();

    return unitStructure.map(unit => {
      const unitLessons = getLessonsForUnit(unit);
      const filtered = unitLessons.filter(lesson => {
        // Search in title
        if (lesson.title.toLowerCase().includes(query)) return true;

        // Search in description
        if (lesson.description?.toLowerCase().includes(query)) return true;

        // Search in concepts
        if (lesson.concepts?.some(c =>
          c.term?.toLowerCase().includes(query) ||
          c.explanation?.toLowerCase().includes(query)
        )) return true;

        // Search in vocabulary
        if (lesson.vocabularyReference?.some(v =>
          v.french?.toLowerCase().includes(query) ||
          v.english?.toLowerCase().includes(query)
        )) return true;

        return false;
      });

      return filtered.length > 0 ? { ...unit, lessons: filtered } : null;
    }).filter(Boolean);
  }, [searchQuery, lessons]);

  // Build vocabulary index
  const vocabularyIndex = useMemo(() => {
    const index = new Map();

    lessons.forEach(lesson => {
      lesson.vocabularyReference?.forEach(vocab => {
        const word = vocab.french;
        if (!index.has(word)) {
          index.set(word, {
            french: vocab.french,
            english: vocab.english,
            lessons: []
          });
        }
        index.get(word).lessons.push({
          id: lesson.id,
          title: lesson.title
        });
      });
    });

    return Array.from(index.values()).sort((a, b) =>
      a.french.localeCompare(b.french)
    );
  }, [lessons]);

  // Filter vocabulary index
  const filteredVocab = useMemo(() => {
    if (!searchQuery.trim()) return vocabularyIndex;

    const query = searchQuery.toLowerCase();
    return vocabularyIndex.filter(v =>
      v.french.toLowerCase().includes(query) ||
      v.english.toLowerCase().includes(query)
    );
  }, [vocabularyIndex, searchQuery]);

  // Calculate completion for a lesson
  const getLessonCompletion = (lesson) => {
    if (!lesson.exercises) return 0;
    const completed = lesson.exercises.filter(ex =>
      completedExercises.has(ex.id)
    ).length;
    return Math.round((completed / lesson.exercises.length) * 100);
  };

  return (
    <aside className={`left-nav ${isCollapsed ? 'collapsed' : ''}`}>
      {!isCollapsed && (
        <>
          {/* Search Bar */}
          <div className="nav-search">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search modules, vocab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
            <kbd className="search-kbd">⌘K</kbd>
          </div>

          {/* Tabs */}
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'tree' ? 'active' : ''}`}
              onClick={() => setActiveTab('tree')}
            >
              Modules
            </button>
            <button
              className={`nav-tab ${activeTab === 'vocab' ? 'active' : ''}`}
              onClick={() => setActiveTab('vocab')}
            >
              Vocabulary
            </button>
          </div>

          {/* Content */}
          <div className="nav-content">
            {activeTab === 'tree' ? (
              // Module Tree View
              <div className="nav-tree">
                {filteredUnits.length === 0 ? (
                  <div className="nav-empty">
                    No modules found for "{searchQuery}"
                  </div>
                ) : (
                  filteredUnits.map(unit => {
                    const isCollapsed = collapsedUnits.has(unit.id);
                    const unitLessons = unit.lessons;

                    return (
                      <div key={unit.id} className="nav-unit">
                        <div
                          className="nav-unit-header"
                          onClick={() => toggleUnit(unit.id)}
                        >
                          <span className="nav-unit-icon">{unit.icon}</span>
                          <span className="nav-unit-title">{unit.title}</span>
                          <span className={`nav-unit-chevron ${isCollapsed ? 'collapsed' : ''}`}>
                            ▼
                          </span>
                        </div>

                        {!isCollapsed && (
                          <div className="nav-unit-lessons">
                            {unitLessons.map(lesson => {
                              const isActive = currentLesson === lesson.id;
                              const completion = getLessonCompletion(lesson);
                              const isComplete = completion === 100;

                              return (
                                <div
                                  key={lesson.id}
                                  className={`nav-lesson ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                                  onClick={() => onLessonSelect(lesson.id)}
                                >
                                  <div className="nav-lesson-main">
                                    <span className="nav-lesson-number">
                                      {lesson.id}
                                    </span>
                                    <span className="nav-lesson-title">
                                      {lesson.title}
                                    </span>
                                    {isComplete && (
                                      <span className="nav-lesson-check">✓</span>
                                    )}
                                  </div>
                                  {!isComplete && completion > 0 && (
                                    <div className="nav-lesson-progress">
                                      <div
                                        className="nav-lesson-progress-bar"
                                        style={{ width: `${completion}%` }}
                                      />
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
                )}
              </div>
            ) : (
              // Vocabulary Index View
              <div className="nav-vocab">
                {filteredVocab.length === 0 ? (
                  <div className="nav-empty">
                    No vocabulary found for "{searchQuery}"
                  </div>
                ) : (
                  filteredVocab.map((vocab, idx) => (
                    <div key={idx} className="nav-vocab-item">
                      <div className="nav-vocab-word">
                        <span className="nav-vocab-french">{vocab.french}</span>
                        <span className="nav-vocab-english">{vocab.english}</span>
                      </div>
                      <div className="nav-vocab-lessons">
                        {vocab.lessons.map(lesson => (
                          <button
                            key={lesson.id}
                            className="nav-vocab-lesson-link"
                            onClick={() => onLessonSelect(lesson.id)}
                          >
                            #{lesson.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Collapsed state - show unit icons */}
      {isCollapsed && (
        <div className="nav-collapsed-content">
          {unitStructure.map(unit => {
            const unitLessons = getLessonsForUnit(unit);
            const completed = unitLessons.filter(lesson =>
              lesson.exercises.every(ex => completedExercises.has(ex.id))
            ).length;
            const total = unitLessons.length;
            const progress = Math.round((completed / total) * 100);

            return (
              <div
                key={unit.id}
                className="nav-collapsed-unit"
                onClick={onToggleCollapse}
                title={`${unit.title}: ${completed}/${total} complete`}
              >
                <span className="collapsed-unit-icon">{unit.icon}</span>
                <span className="collapsed-unit-progress">{progress}%</span>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}

export default LeftNav;

