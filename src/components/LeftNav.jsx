import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Award, BookOpen, TextCursorInput, Sparkles } from 'lucide-react';
import * as ReactWindow from 'react-window';
import { unitStructure } from '../lessons/lessonData';

const { List } = ReactWindow;
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import { getTTSText, selectBestVoice } from '../utils/ttsUtils';
import '../styles/LeftNav.css';
import { logger } from "../utils/logger";

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

// Vocabulary item component for virtualization
const VocabItem = ({ index, style, vocab, onLessonSelect, mobileNavOpen, onCloseMobileNav }) => {
  const item = vocab[index];

  const handleSpeak = useCallback(() => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speechText = getTTSText(item.french);
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let voices = window.speechSynthesis.getVoices();

    // Handle async voice loading (some browsers load voices asynchronously)
    if (voices.length === 0) {
      const handleVoicesChanged = () => {
        voices = window.speechSynthesis.getVoices();
        const bestVoice = selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          logger.log(`LeftNav vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
        }
        window.speechSynthesis.speak(utterance);
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
      };
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    } else {
      const bestVoice = selectBestVoice(voices, utterance.lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        logger.log(`LeftNav vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
      }
      window.speechSynthesis.speak(utterance);
    }
  }, [item.french]);

  return (
    <div style={{ ...style, paddingLeft: '0.75rem', paddingRight: '0.75rem' }}>
      <div className="nav-vocab-item">
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
            <span className="nav-vocab-french">{item.french}</span>
            <span className="nav-vocab-english">{item.english}</span>
          </div>
          <SpeakButton
            text={item.french}
            language="fr-FR"
            size="medium"
            className="nav-vocab-speaker"
          />
        </div>
        <div className="nav-vocab-lessons">
          {item.lessons.map(lesson => (
            <button
              key={`${item.french}-${lesson.id}`}
              className="nav-vocab-lesson-link"
              onClick={() => {
                onLessonSelect(lesson.id);
                if (mobileNavOpen) {
                  onCloseMobileNav();
                }
              }}
            >
              #{lesson.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function LeftNav({ lessons, currentLesson, onLessonSelect, completedExercises, isCollapsed, onToggleCollapse, mobileNavOpen, onCloseMobileNav }) {
  const { moduleProgress } = useSupabaseProgress();
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize all units as collapsed (accordion starts closed)
  const [collapsedUnits, setCollapsedUnits] = useState(new Set(unitStructure.map(unit => unit.id)));
  const [activeTab, setActiveTab] = useState('tree'); // 'tree' or 'vocab'
  const [stickyHeaders, setStickyHeaders] = useState(new Set());
  const [vocabListHeight, setVocabListHeight] = useState(600);
  const navContentRef = useRef(null);

  // Auto-expand unit containing current lesson
  useEffect(() => {
    if (currentLesson) {
      // Find which unit contains the current lesson
      const currentUnit = unitStructure.find(unit => {
        const [start, end] = unit.lessonRange;
        return currentLesson >= start && currentLesson <= end;
      });

      if (currentUnit) {
        // Expand this unit, collapse all others
        setCollapsedUnits(prev => {
          const next = new Set();
          unitStructure.forEach(unit => {
            if (unit.id !== currentUnit.id) {
              next.add(unit.id);
            }
          });
          return next;
        });
      }
    }
  }, [currentLesson]);

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

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileNavOpen]);

  // Update vocabulary list height when container size changes
  useEffect(() => {
    if (!navContentRef.current || activeTab !== 'vocab') return;

    const updateHeight = () => {
      if (navContentRef.current) {
        setVocabListHeight(navContentRef.current.clientHeight);
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navContentRef.current);

    return () => resizeObserver.disconnect();
  }, [activeTab, isCollapsed, mobileNavOpen]);

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

  // Calculate completion for a lesson
  const getLessonCompletion = (lesson) => {
    const total = getExerciseCount(lesson);
    if (total === 0) return 0;
    const completed = getCompletedCount(lesson);
    return Math.round((completed / total) * 100);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileNavOpen && (
        <div
          className="nav-overlay"
          onClick={onCloseMobileNav}
          aria-hidden="true"
        />
      )}

      <aside className={`left-nav ${isCollapsed && !mobileNavOpen ? 'collapsed' : ''} ${mobileNavOpen ? 'open' : ''}`}>
        {(!isCollapsed || mobileNavOpen) && (
          <>
            {/* Mobile Close Button */}
            {mobileNavOpen && (
              <button
                className="mobile-close-btn"
                onClick={onCloseMobileNav}
                title="Close navigation"
              >
                ✕
              </button>
            )}

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
                                    onClick={() => {
                                      onLessonSelect(lesson.id);
                                      if (mobileNavOpen) {
                                        onCloseMobileNav();
                                      }
                                    }}
                                  >
                                    <div className="nav-lesson-main">
                                      {lesson.isUnitExam ? (
                                        <span className="nav-lesson-exam-icon">
                                          <Award size={16} />
                                        </span>
                                      ) : lesson.isReadingComprehension ? (
                                        <span className="nav-lesson-reading-icon">
                                          <BookOpen size={16} />
                                        </span>
                                      ) : lesson.isFillInTheBlank ? (
                                        <span className="nav-lesson-practice-icon">
                                          <TextCursorInput size={16} />
                                        </span>
                                      ) : lesson.isHelpModule ? (
                                        <span className="nav-lesson-help-icon">
                                          <Sparkles size={16} />
                                        </span>
                                      ) : (
                                        <span className="nav-lesson-number">
                                          {lesson.id}
                                        </span>
                                      )}
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
                    <List
                      height={vocabListHeight}
                      rowCount={filteredVocab.length}
                      rowHeight={130}
                      width="100%"
                      overscanCount={5}
                      rowProps={{
                        vocab: filteredVocab,
                        onLessonSelect,
                        mobileNavOpen,
                        onCloseMobileNav
                      }}
                      rowComponent={VocabItem}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Collapsed state - show unit icons (but not on mobile when nav is open) */}
        {isCollapsed && !mobileNavOpen && (
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
              const completed = unitLessons.filter(lesson => {
                const completedCount = getCompletedCount(lesson);
                const totalCount = getExerciseCount(lesson);
                return completedCount === totalCount && totalCount > 0;
              }).length;
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
    </>
  );
}

export default LeftNav;

