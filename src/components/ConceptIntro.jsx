import { useState, useEffect, Fragment, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import SpeakButton from './SpeakButton';
import UnderstoodButton from './UnderstoodButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { useSectionTime } from '../hooks/useSectionTime';
import { extractModuleId } from '../utils/progressSync';
import { getTTSText, selectBestVoice } from '../utils/ttsUtils';
import { renderGenderSplitText, getGenderClass, hasGenderSplit } from '../utils/genderSplitUtils.jsx';
import { isNewVocabSection, createVocabRowClickHandler, toggleSetItem } from '../utils/vocabularyUtils';
import { logger } from "../utils/logger";
import { splitTitle } from '../utils/moduleUtils';

/**
 * Concept Introduction - Initial exposure phase
 * Shows all vocabulary and concepts before study mode
 * Based on cognitive science: exposure → encoding → retrieval
 */

function ConceptIntro({ lesson, onStartStudying }) {
  const [showVocab, setShowVocab] = useState(true);
  const [showConcepts, setShowConcepts] = useState(true);
  const [understoodConcepts, setUnderstoodConcepts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const vocabularyItems = lesson.vocabularyReference || [];
  const isFirstLesson = lesson.id === 1;
  const moduleId = extractModuleId(lesson);

  // Show help section by default on first lesson
  const [helpRequested, setHelpRequested] = useState(isFirstLesson);
  const [showHelp, setShowHelp] = useState(isFirstLesson);

  // Get Supabase progress functions
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

  // Section progress and time tracking
  const { updateSectionProgress, completeSectionProgress } = useSectionProgress();
  useSectionTime(moduleId, 'vocabulary-intro', true);

  // Load understood concepts from database when module loads
  useEffect(() => {
    const loadUnderstoodConcepts = async () => {
      if (!isAuthenticated || !supabaseUser || !moduleId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('concept_understanding')
          .select('concept_index')
          .eq('user_id', supabaseUser.id)
          .eq('module_key', moduleId);

        if (error) throw error;

        const understoodSet = new Set(data.map(c => c.concept_index));
        setUnderstoodConcepts(understoodSet);
      } catch (error) {
        logger.error('Error loading understood concepts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodConcepts();
  }, [lesson.id, moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  // Functions for managing understood concepts
  const toggleUnderstood = useCallback(async (conceptIndex) => {
    logger.log('ConceptIntro: toggleUnderstood called', conceptIndex);
    const isCurrentlyUnderstood = understoodConcepts.has(conceptIndex);
    const newUnderstood = !isCurrentlyUnderstood;

    // Optimistic update
    setUnderstoodConcepts(prev => toggleSetItem(prev, conceptIndex, newUnderstood));

    // Save to Supabase
    if (isAuthenticated && moduleId && lesson.concepts[conceptIndex]) {
      try {
        logger.log('ConceptIntro: Saving to Supabase...');
        await updateConceptUnderstanding(
          moduleId,
          conceptIndex,
          lesson.concepts[conceptIndex].term,
          newUnderstood
        );
        logger.log('ConceptIntro: Saved successfully');
      } catch (error) {
        logger.error('ConceptIntro: Error saving:', error);
        // Revert on error
        setUnderstoodConcepts(prev => toggleSetItem(prev, conceptIndex, isCurrentlyUnderstood));
      }
    }
  }, [understoodConcepts, isAuthenticated, moduleId, lesson.concepts, updateConceptUnderstanding]);

  const getProgressStats = useCallback(() => {
    if (!lesson.concepts || lesson.concepts.length === 0) return { understood: 0, total: 0, percentage: 0 };
    const total = lesson.concepts.length;
    const understood = understoodConcepts.size;
    const percentage = Math.round((understood / total) * 100);
    return { understood, total, percentage };
  }, [lesson.concepts, understoodConcepts.size]);

  // Memoize progress stats to avoid recalculating
  const progressStats = useMemo(() => getProgressStats(), [getProgressStats]);

  // Auto-complete vocabulary intro section when all concepts are understood
  useEffect(() => {
    const allConceptsUnderstood = lesson.concepts &&
      lesson.concepts.length > 0 &&
      understoodConcepts.size === lesson.concepts.length;

    logger.log('ConceptIntro: Checking auto-completion', {
      hasLessonConcepts: !!lesson.concepts,
      conceptsLength: lesson.concepts?.length || 0,
      understoodCount: understoodConcepts.size,
      allConceptsUnderstood,
      isAuthenticated,
      moduleId
    });

    if (allConceptsUnderstood && isAuthenticated && moduleId) {
      logger.log('ConceptIntro: Auto-completing vocabulary intro section...');

      // Update section progress to mark intro as complete
      completeSectionProgress(moduleId, 'vocabulary-intro', {
        concepts_understood: understoodConcepts.size,
        total_concepts: lesson.concepts.length,
        completion_method: 'all_concepts_understood'
      }).then(result => {
        logger.log('ConceptIntro: Section completion successful', result);
      }).catch(error => {
        logger.error('ConceptIntro: Error completing vocabulary intro section:', error);
      });

      logger.log('ConceptIntro: Vocabulary intro section auto-completed - all concepts understood');
    }
  }, [understoodConcepts, lesson.concepts, isAuthenticated, moduleId, completeSectionProgress]);

  const { modulePrefix, mainTitle } = splitTitle(lesson.title);

  return (
    <div className="concept-intro">
      <div className="intro-header">
        {modulePrefix && (
          <div className="module-prefix">
            {modulePrefix}
          </div>
        )}
        <h2>{mainTitle}</h2>
        <p className="intro-description">{lesson.description}</p>
      </div>

      <div className="intro-content">
        {/* Vocabulary Table */}
        {vocabularyItems.length > 0 && (
          <div className="intro-section">
            <div
              className="intro-section-header"
              onClick={() => setShowVocab(!showVocab)}
            >
              <h3>📚 Vocabulary You'll Learn</h3>
              <button className="toggle-btn">
                {showVocab ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {showVocab && (
              <div className="vocab-intro-table">
                <table>
                  <thead>
                    <tr>
                      <th>French</th>
                      <th>English</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocabularyItems.map((item, idx) => {
                      const isSplitWord = hasGenderSplit(item.french, item.note);
                      const genderClass = getGenderClass(item.note, isSplitWord);
                      const needsDivider = isNewVocabSection(item, idx);

                      // Create handler outside of JSX for better performance
                      const handleRowClick = createVocabRowClickHandler(
                        item.french,
                        item.ttsText,
                        getTTSText,
                        selectBestVoice,
                        logger
                      );

                      return (
                        <Fragment key={`vocab-${idx}`}>
                          {needsDivider && (
                            <tr className="vocab-divider">
                              <td colSpan={3}>
                                <div className="vocab-section-break"></div>
                              </td>
                            </tr>
                          )}
                          <tr
                            onClick={handleRowClick}
                            className="vocab-row-clickable"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleRowClick(e);
                              }
                            }}
                          >
                            <td className={`vocab-french-intro ${genderClass}`}>
                              <div className="vocab-with-audio">
                                {renderGenderSplitText(item.french, item.note)}
                                <SpeakButton text={item.french} ttsText={item.ttsText} language="fr-FR" size="small" />
                              </div>
                            </td>
                            <td className="vocab-english-intro">{item.english}</td>
                            <td className="vocab-note-intro">{item.note || '—'}</td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Concepts */}
        {lesson.concepts && lesson.concepts.length > 0 && (
          <div className="intro-section">
            <div
              className="intro-section-header"
              onClick={() => setShowConcepts(!showConcepts)}
            >
              <div className="concepts-header-content">
                <h3>💡 Key Concepts</h3>
                <div className="concepts-progress">
                  {progressStats.understood}/{progressStats.total} understood ({progressStats.percentage}%)
                </div>
              </div>
              <button className="toggle-btn">
                {showConcepts ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {showConcepts && (
              <div className="concepts-intro-list">
                {lesson.concepts.map((concept, idx) => {
                  const isUnderstood = understoodConcepts.has(idx);
                  return (
                    <section key={idx} className={`concept-section ${isUnderstood ? 'understood' : ''}`}>
                      <div className="concept-section-header">
                        <h2>{concept.term}</h2>
                        {isUnderstood && (
                          <div className="concept-check-badge">
                            <Check size={18} />
                          </div>
                        )}
                      </div>
                      <div className="concept-section-content">
                        <p className="concept-definition">
                          {concept.definition}
                        </p>
                        <div className="concept-example-block">
                          <div className="example-label">Example</div>
                          <div className="example-text">{concept.example}</div>
                        </div>
                      </div>
                      <div className="concept-section-footer">
                        <UnderstoodButton
                          isUnderstood={isUnderstood}
                          onClick={() => toggleUnderstood(idx)}
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Learning Tips - Only show on first lesson, or if user requests help */}
        {(isFirstLesson || helpRequested) && (
          <div className="intro-section">
            <div
              className="intro-section-header"
              onClick={() => setShowHelp(!showHelp)}
            >
              <h3>ℹ️ How This Module Works</h3>
              <button className="toggle-btn">
                {showHelp ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {showHelp && (
              <div className="learning-tip">
                <ol>
                  <li>
                    <strong>Review this page</strong> - Get familiar with what
                    you'll learn
                  </li>
                  <li>
                    <strong>Study Mode</strong> - See questions and answers
                    (flashcards)
                  </li>
                  <li>
                    <strong>Practice</strong> - Try it yourself with support
                  </li>
                  <li>
                    <strong>Final Exam</strong> - Test your knowledge (80% to pass)
                  </li>
                </ol>
                <p className="tip-note">
                  💡 <strong>Tip:</strong> Take your time reviewing this page.
                  Exposure is the first step to learning!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="intro-actions">
        {!isFirstLesson && !helpRequested && (
          <button
            className="btn-help-link"
            onClick={() => {
              setHelpRequested(true);
              setShowHelp(true);
            }}
          >
            Not sure what to do? Click here
          </button>
        )}
        
        {showIncompleteWarning && (
          <div className="incomplete-warning">
            {(() => {
              const totalConcepts = lesson.concepts?.length || 0;
              const remaining = totalConcepts - understoodConcepts.size;
              const baseMessage = "Please mark all key concepts as understood before continuing";
              
              if (remaining === 0 || understoodConcepts.size === 0) {
                return baseMessage;
              } else if (remaining === 1) {
                return `${baseMessage} - 1 more to go!`;
              } else {
                return `${baseMessage} - ${remaining} more to go!`;
              }
            })()}
          </div>
        )}
        
        <button 
          className="btn-primary btn-large" 
          onClick={() => {
            const totalConcepts = lesson.concepts?.length || 0;
            const allUnderstood = understoodConcepts.size === totalConcepts && totalConcepts > 0;
            
            if (!allUnderstood && totalConcepts > 0) {
              setShowIncompleteWarning(true);
              setTimeout(() => setShowIncompleteWarning(false), 4000);
            } else {
              onStartStudying();
            }
          }}
        >
          Study Mode →
        </button>
      </div>
    </div>
  );
}

export default ConceptIntro;

