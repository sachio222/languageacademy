import { useState } from 'react';

/**
 * Concept Introduction - Initial exposure phase
 * Shows all vocabulary and concepts before study mode
 * Based on cognitive science: exposure → encoding → retrieval
 */
function ConceptIntro({ lesson, onStartStudying }) {
  const [showVocab, setShowVocab] = useState(true);
  const [showConcepts, setShowConcepts] = useState(true);

  const vocabularyItems = lesson.vocabularyReference || [];

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
              <button className="toggle-btn">{showVocab ? '▼' : '▶'}</button>
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

                      return (
                        <tr key={idx}>
                          <td className={`vocab-french-intro ${genderClass}`}>{item.french}</td>
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
              <button className="toggle-btn">{showConcepts ? '▼' : '▶'}</button>
            </div>

            {showConcepts && (
              <div className="concepts-intro-grid">
                {lesson.concepts.map((concept, idx) => (
                  <div key={idx} className="concept-intro-card">
                    <h4>{concept.term}</h4>
                    <p className="concept-intro-definition">
                      {concept.definition}
                    </p>
                    <div className="concept-intro-example">
                      <strong>Example:</strong> <code>{concept.example}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Learning Tips */}
        <div className="intro-section">
          <div className="learning-tip">
            <h4>🎯 How This Module Works:</h4>
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
        </div>
      </div>

      <div className="intro-actions">
        <button className="btn-primary btn-large" onClick={onStartStudying}>
          I'm Ready - Start Study Mode →
        </button>
      </div>
    </div>
  );
}

export default ConceptIntro;

