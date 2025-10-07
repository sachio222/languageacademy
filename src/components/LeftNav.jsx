import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { unitStructure } from '../lessons/lessonData';
import SpeakButton from './SpeakButton';
import '../styles/LeftNav.css';

// Normalize text for search (remove diacritics/accents)
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
};

// Strip "Module ##:" prefix from titles for navigation display only
const getNavTitle = (title) => {
  // Remove "Module ##:" prefix (e.g., "Module 1: Famous Words" -> "Famous Words")
  return title.replace(/^Module \d+:\s*/, '');
};

function LeftNav({ lessons, currentLesson, onLessonSelect, completedExercises, isCollapsed, onToggleCollapse }) {
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize all units as collapsed (accordion starts closed)
  const [collapsedUnits, setCollapsedUnits] = useState(new Set(unitStructure.map(unit => unit.id)));
  const [activeTab, setActiveTab] = useState('tree'); // 'tree' or 'vocab'
  const [stickyHeaders, setStickyHeaders] = useState(new Set());
  const navContentRef = useRef(null);

  // Toggle unit collapse (accordion behavior - only one open at a time)
  const toggleUnit = (unitId) => {
    setCollapsedUnits(prev => {
      const next = new Set();

      // If the clicked unit is currently collapsed, open it and close all others
      if (prev.has(unitId)) {
        // Add all unit IDs except the one being opened
        unitStructure.forEach(unit => {
          if (unit.id !== unitId) {
            next.add(unit.id);
          }
        });
      } else {
        // If the clicked unit is open, close it (and keep all others closed)
        unitStructure.forEach(unit => {
          next.add(unit.id);
        });
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

    const query = normalizeText(searchQuery);

    return unitStructure.map(unit => {
      const unitLessons = getLessonsForUnit(unit);
      const filtered = unitLessons.filter(lesson => {
        // Search in title
        if (normalizeText(lesson.title).includes(query)) return true;

        // Search in description
        if (lesson.description && normalizeText(lesson.description).includes(query)) return true;

        // Search in concepts
        if (lesson.concepts?.some(c =>
          (c.term && normalizeText(c.term).includes(query)) ||
          (c.explanation && normalizeText(c.explanation).includes(query))
        )) return true;

        // Search in vocabulary
        if (lesson.vocabularyReference?.some(v =>
          (v.french && normalizeText(v.french).includes(query)) ||
          (v.english && normalizeText(v.english).includes(query))
        )) return true;

        return false;
      });

      return filtered.length > 0 ? { ...unit, lessons: filtered } : null;
    }).filter(Boolean);
  }, [searchQuery, lessons]);

  // Set up intersection observer to detect sticky headers
  useEffect(() => {
    if (!navContentRef.current || isCollapsed || activeTab !== 'tree') return;

    const observer = new IntersectionObserver(
      (entries) => {
        setStickyHeaders(prev => {
          const next = new Set(prev);
          entries.forEach(entry => {
            const unitId = entry.target.dataset.unitId;
            if (unitId) {
              if (entry.intersectionRatio < 1 && entry.boundingClientRect.top < entry.rootBounds.top) {
                // Header is sticky (partially visible at top)
                next.add(unitId);
              } else {
                // Header is not sticky
                next.delete(unitId);
              }
            }
          });
          return next;
        });
      },
      {
        root: navContentRef.current,
        threshold: [0, 1],
        rootMargin: '-1px 0px 0px 0px'
      }
    );

    // Observe all unit headers
    const headers = navContentRef.current.querySelectorAll('.nav-unit-header');
    headers.forEach(header => observer.observe(header));

    return () => observer.disconnect();
  }, [isCollapsed, activeTab, filteredUnits]);

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
          title: getNavTitle(lesson.title)
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

    const query = normalizeText(searchQuery);
    return vocabularyIndex.filter(v =>
      normalizeText(v.french).includes(query) ||
      normalizeText(v.english).includes(query)
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
            <button
              className="nav-collapse-btn"
              onClick={onToggleCollapse}
              title="Collapse sidebar"
            >
              <ChevronLeft size={18} />
            </button>
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
          <div className="nav-content" ref={navContentRef}>
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
                          className={`nav-unit-header ${stickyHeaders.has(unit.id) ? 'sticky' : ''}`}
                          onClick={() => toggleUnit(unit.id)}
                          data-unit-id={unit.id}
                        >
                          <span className="nav-unit-icon">{unit.icon}</span>
                          <span className="nav-unit-title">{unit.title}</span>
                          <ChevronDown
                            size={14}
                            className={`nav-unit-chevron ${isCollapsed ? 'collapsed' : ''}`}
                          />
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
                                      {getNavTitle(lesson.title)}
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
                  filteredVocab.map((vocab, idx) => {
                    const handleSpeak = () => {
                      if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(vocab.french);
                        utterance.lang = 'fr-FR';
                        utterance.rate = 0.9;
                        window.speechSynthesis.speak(utterance);
                      }
                    };

                    return (
                      <div key={idx} className="nav-vocab-item">
                        <div
                          className="nav-vocab-word"
                          onClick={handleSpeak}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSpeak();
                            }
                          }}
                        >
                          <div className="nav-vocab-text">
                            <span className="nav-vocab-french">{vocab.french}</span>
                            <span className="nav-vocab-english">{vocab.english}</span>
                          </div>
                          <SpeakButton
                            text={vocab.french}
                            language="fr-FR"
                            size="medium"
                            className="nav-vocab-speaker"
                          />
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
                    );
                  })
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Collapsed state - show unit icons */}
      {isCollapsed && (
        <div className="nav-collapsed-content">
          <button
            className="nav-collapse-btn nav-expand-btn"
            onClick={onToggleCollapse}
            title="Expand sidebar"
          >
            <ChevronRight size={18} />
          </button>
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

