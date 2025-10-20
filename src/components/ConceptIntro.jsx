import { useState, useEffect, Fragment } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import { getTTSText } from '../utils/ttsUtils';
import { renderGenderSplitText, getGenderClass, hasGenderSplit } from '../utils/genderSplitUtils.jsx';

/**
 * Select the best available voice for a given language
 * Same logic as SpeakButton for consistent quality
 */
function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (Chrome - usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Safari/macOS enhanced voices (look for specific high-quality French voices)
  if (langCode === 'fr') {
    const safariEnhancedVoice = matchingVoices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes("amélie") ||
        nameLower.includes("amelie") ||
        nameLower.includes("thomas") ||
        nameLower.includes("audrey") ||
        nameLower.includes("marie") ||
        nameLower.includes("enhanced") ||
        nameLower.includes("premium") ||
        nameLower.includes("neural") ||
        (nameLower.includes("compact") && nameLower.includes("fr"));
    });
    if (safariEnhancedVoice) return safariEnhancedVoice;
  }

  // Priority 3: General enhanced voices
  const enhancedVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("neural") ||
      v.name.toLowerCase().includes("compact")
  );
  if (enhancedVoice) return enhancedVoice;

  // Priority 4: Female voices (often sound more natural)
  const femaleVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("karen") ||
      v.name.toLowerCase().includes("fiona") ||
      v.name.toLowerCase().includes("amelie") ||
      v.name.toLowerCase().includes("amélie") ||
      v.name.toLowerCase().includes("paulina") ||
      v.name.toLowerCase().includes("marie") ||
      v.name.toLowerCase().includes("celine") ||
      v.name.toLowerCase().includes("céline") ||
      v.name.toLowerCase().includes("audrey") ||
      v.name.toLowerCase().includes("aurelie") ||
      v.name.toLowerCase().includes("aurélie")
  );
  if (femaleVoice) return femaleVoice;

  // Priority 5: Avoid low-quality voices
  const decentVoice = matchingVoices.find(
    (v) =>
      !v.name.toLowerCase().includes("alex") &&
      !v.name.toLowerCase().includes("fred") &&
      !v.name.toLowerCase().includes("ralph") &&
      !v.name.toLowerCase().includes("male") &&
      !v.name.toLowerCase().includes("daniel") &&
      !v.name.toLowerCase().includes("junior")
  );
  if (decentVoice) return decentVoice;

  // Last resort: Return first matching voice
  return matchingVoices[0];
}

/**
 * Concept Introduction - Initial exposure phase
 * Shows all vocabulary and concepts before study mode
 * Based on cognitive science: exposure → encoding → retrieval
 */

// Helper function to split module title
const splitTitle = (title) => {
  const moduleMatch = title.match(/^(Module \d+|Reference [IVX]+):\s*(.*)$/);
  if (moduleMatch) {
    return {
      modulePrefix: moduleMatch[1],
      mainTitle: moduleMatch[2]
    };
  }
  return {
    modulePrefix: null,
    mainTitle: title
  };
};

function ConceptIntro({ lesson, onStartStudying }) {
  const [showVocab, setShowVocab] = useState(true);
  const [showConcepts, setShowConcepts] = useState(true);
  const [understoodConcepts, setUnderstoodConcepts] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const vocabularyItems = lesson.vocabularyReference || [];
  const isFirstLesson = lesson.id === 1;
  const moduleId = extractModuleId(lesson);

  // Show help section by default on first lesson
  const [helpRequested, setHelpRequested] = useState(isFirstLesson);
  const [showHelp, setShowHelp] = useState(isFirstLesson);

  // Get Supabase progress functions
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

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
          .eq('module_id', moduleId);

        if (error) throw error;

        const understoodSet = new Set(data.map(c => c.concept_index));
        setUnderstoodConcepts(understoodSet);
      } catch (error) {
        console.error('Error loading understood concepts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodConcepts();
  }, [lesson.id, moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  // Functions for managing understood concepts
  const toggleUnderstood = async (conceptIndex) => {
    console.log('ConceptIntro: toggleUnderstood called', conceptIndex);
    const isCurrentlyUnderstood = understoodConcepts.has(conceptIndex);
    const newUnderstood = !isCurrentlyUnderstood;

    // Optimistic update
    setUnderstoodConcepts(prev => {
      const newSet = new Set(prev);
      if (newUnderstood) {
        newSet.add(conceptIndex);
      } else {
        newSet.delete(conceptIndex);
      }
      return newSet;
    });

    // Save to Supabase
    if (isAuthenticated && moduleId && lesson.concepts[conceptIndex]) {
      try {
        console.log('ConceptIntro: Saving to Supabase...');
        await updateConceptUnderstanding(
          moduleId,
          conceptIndex,
          lesson.concepts[conceptIndex].term,
          newUnderstood
        );
        console.log('ConceptIntro: Saved successfully');
      } catch (error) {
        console.error('ConceptIntro: Error saving:', error);
        // Revert on error
        setUnderstoodConcepts(prev => {
          const newSet = new Set(prev);
          if (isCurrentlyUnderstood) {
            newSet.add(conceptIndex);
          } else {
            newSet.delete(conceptIndex);
          }
          return newSet;
        });
      }
    }
  };

  const getProgressStats = () => {
    if (!lesson.concepts || lesson.concepts.length === 0) return { understood: 0, total: 0, percentage: 0 };
    const total = lesson.concepts.length;
    const understood = understoodConcepts.size;
    const percentage = Math.round((understood / total) * 100);
    return { understood, total, percentage };
  };

  const { modulePrefix, mainTitle } = splitTitle(lesson.title);

  return (
    <div className="concept-intro">
      <div className="intro-header">
        {modulePrefix && (
          <div className="module-prefix">
            {modulePrefix}
          </div>
        )}
        <h2>📖 {mainTitle}</h2>
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

                      // Detect if this is the start of a new verb/section
                      const isNewSection = (item, index) => {
                        if (index === 0) return false;
                        const note = (item.note || '').toLowerCase();
                        // ONLY check note field - don't guess from french word!
                        return note.includes('regular -er verb') ||
                          note.includes('regular -ir verb') ||
                          note.includes('irregular -ir verb') ||
                          note.includes('irregular verb') ||
                          note.includes('impersonal') ||
                          note.includes('causative') ||
                          note.includes('section divider');
                      };
                      const needsDivider = isNewSection(item, idx);

                      const handleRowClick = (e) => {
                        if (!item.french) return;

                        // Use ttsText if available, otherwise apply global TTS corrections
                        const speechText = item.ttsText || getTTSText(item.french);

                        // Use same high-quality voice selection as SpeakButton
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();

                          const utterance = new SpeechSynthesisUtterance(speechText);
                          utterance.lang = 'fr-FR';
                          utterance.rate = 0.9;
                          utterance.pitch = 1.0;
                          utterance.volume = 1.0;

                          let voices = window.speechSynthesis.getVoices();

                          // Handle async voice loading (some browsers load voices asynchronously)
                          if (voices.length === 0) {
                            window.speechSynthesis.addEventListener("voiceschanged", () => {
                              voices = window.speechSynthesis.getVoices();
                              const bestVoice = selectBestVoice(voices, utterance.lang);
                              if (bestVoice) {
                                utterance.voice = bestVoice;
                                console.log(`Concept vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
                              }
                              window.speechSynthesis.speak(utterance);
                            });
                          } else {
                            const bestVoice = selectBestVoice(voices, utterance.lang);
                            if (bestVoice) {
                              utterance.voice = bestVoice;
                              console.log(`Concept vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
                            }
                            window.speechSynthesis.speak(utterance);
                          }
                        }
                      };

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
                  {getProgressStats().understood}/{getProgressStats().total} understood ({getProgressStats().percentage}%)
                </div>
              </div>
              <button className="toggle-btn">
                {showConcepts ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {showConcepts && (
              <div className="concepts-intro-grid">
                {lesson.concepts.map((concept, idx) => {
                  const isUnderstood = understoodConcepts.has(idx);
                  return (
                    <div key={idx} className={`concept-intro-card ${isUnderstood ? 'understood' : ''}`}>
                      <div className="concept-card-header">
                        <h4>{concept.term}</h4>
                        {isUnderstood && (
                          <div className="concept-check">
                            <Check size={20} />
                          </div>
                        )}
                      </div>
                      <div className="concept-card-body">
                        <p className="concept-intro-definition">
                          {concept.definition}
                        </p>
                        <div className="concept-intro-example">
                          <strong>Example</strong>
                          <code>{concept.example}</code>
                        </div>
                        <button
                          className={`understood-btn ${isUnderstood ? 'understood' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleUnderstood(idx);
                          }}
                        >
                          Understood
                        </button>
                      </div>
                    </div>
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
        <button className="btn-primary btn-large" onClick={onStartStudying}>
          Start Studying →
        </button>
      </div>
    </div>
  );
}

export default ConceptIntro;

