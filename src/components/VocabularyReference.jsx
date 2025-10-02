import { useState } from 'react';

/**
 * Vocabulary Reference - Always-visible cheat sheet
 * Shows all vocabulary for current lesson
 */
function VocabularyReference({ vocabulary, title }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!vocabulary || vocabulary.length === 0) {
    return null;
  }

  // Helper to get gender class for color coding
  const getGenderClass = (note) => {
    if (!note) return '';
    const noteLower = note.toLowerCase();
    if (noteLower.includes('feminine')) return 'feminine';
    if (noteLower.includes('masculine')) return 'masculine';
    return '';
  };

  return (
    <div className="vocab-reference">
      <div
        className="vocab-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>📖 {title || 'Vocabulary Reference'}</h4>
        <button className="toggle-btn">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="vocab-table">
          <table>
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {vocabulary.map((item, idx) => {
                const genderClass = getGenderClass(item.note);
                return (
                  <tr key={idx}>
                    <td className={`vocab-french ${genderClass}`}>{item.french}</td>
                    <td className="vocab-english">{item.english}</td>
                    <td className="vocab-note">{item.note || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VocabularyReference;

