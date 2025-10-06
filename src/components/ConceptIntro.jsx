import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SpeakButton from './SpeakButton';

/**
 * Concept Introduction - Initial exposure phase
 * Shows all vocabulary and concepts before study mode
 * Based on cognitive science: exposure → encoding → retrieval
 */
function ConceptIntro({ lesson, onStartStudying }) {
  const [showVocab, setShowVocab] = useState(true);
  const [showConcepts, setShowConcepts] = useState(true);

  const vocabularyItems = lesson.vocabularyReference || [];
  const isFirstLesson = lesson.id === 1;

  // Show help section by default on first lesson
  const [helpRequested, setHelpRequested] = useState(isFirstLesson);
  const [showHelp, setShowHelp] = useState(isFirstLesson);

  return (
    <div className="concept-intro">
      <div className="intro-header">
        <h2>📖 {lesson.title}</h2>
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
              <h3>💡 Key Concepts</h3>
              <button className="toggle-btn">
                {showConcepts ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {showConcepts && (
              <div className="concepts-intro-grid">
                {lesson.concepts.map((concept, idx) => (
                  <div key={idx} className="concept-intro-card">
                    <div className="concept-card-header">
                      <h4>{concept.term}</h4>
                    </div>
                    <div className="concept-card-body">
                      <p className="concept-intro-definition">
                        {concept.definition}
                      </p>
                      <div className="concept-intro-example">
                        <strong>Example</strong>
                        <code>{concept.example}</code>
                      </div>
                    </div>
                  </div>
                ))}
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

