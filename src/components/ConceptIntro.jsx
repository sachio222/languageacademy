import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import SpeakButton from './SpeakButton';

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

  const vocabularyItems = lesson.vocabularyReference || [];
  const isFirstLesson = lesson.id === 1;

  // Show help section by default on first lesson
  const [helpRequested, setHelpRequested] = useState(isFirstLesson);
  const [showHelp, setShowHelp] = useState(isFirstLesson);

  // Reset understood state when lesson changes
  useEffect(() => {
    setUnderstoodConcepts(new Set());
  }, [lesson.id]);

  // Functions for managing understood concepts
  const toggleUnderstood = (conceptIndex) => {
    setUnderstoodConcepts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(conceptIndex)) {
        newSet.delete(conceptIndex);
      } else {
        newSet.add(conceptIndex);
      }
      return newSet;
    });
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
                      const getGenderClass = (note) => {
                        if (!note) return '';
                        const noteLower = note.toLowerCase();
                        if (noteLower.includes('feminine')) return 'feminine';
                        if (noteLower.includes('masculine')) return 'masculine';
                        return '';
                      };
                      const genderClass = getGenderClass(item.note);

                      const handleRowClick = () => {
                        if (!item.french) return;

                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(item.french);
                          utterance.lang = 'fr-FR';
                          utterance.rate = 0.9;
                          utterance.pitch = 1.0;
                          utterance.volume = 1.0;
                          window.speechSynthesis.speak(utterance);
                        }
                      };

                      return (
                        <tr
                          key={idx}
                          onClick={handleRowClick}
                          className="vocab-row-clickable"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleRowClick();
                            }
                          }}
                        >
                          <td className={`vocab-french-intro ${genderClass}`}>
                            <div className="vocab-with-audio">
                              {item.french}
                              <SpeakButton text={item.french} language="fr-FR" size="small" />
                            </div>
                          </td>
                          <td className="vocab-english-intro">{item.english}</td>
                          <td className="vocab-note-intro">{item.note || '—'}</td>
                        </tr>
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

