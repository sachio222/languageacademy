import '../styles/ModuleCompleteModal.css';

function ModuleCompleteModal({ lesson, onNextModule, onBackToModules, onTakeExam, onRetakeExercises, totalModules, hasNextModule, timeSpent = 0 }) {
  if (!lesson) return null;

  // Use prop if provided, otherwise fallback to ID comparison
  const showNextButton = hasNextModule !== undefined ? hasNextModule : lesson.id < totalModules;
  const vocabularyItems = lesson.vocabularyReference || [];
  const concepts = lesson.concepts || [];

  // Format time spent
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
      // Close on backdrop click
      if (e.target.className === 'modal-overlay') {
        onBackToModules();
      }
    }}>
      <div className="modal-content module-complete-modal">
        <div className="modal-header">
          <h3>🎉 Module Complete</h3>
          {lesson.exercises && lesson.exercises.length > 0 && onRetakeExercises && (
            <button className="reset-exercises-link" onClick={onRetakeExercises}>
              Reset exercises
            </button>
          )}
        </div>

        <div className="modal-body">
          {/* Stats Section */}
          <div className="completion-stats">
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{lesson.exercises?.length || 0}</div>
              <div className="stat-label">Exercises</div>
            </div>
            {vocabularyItems.length > 0 && (
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-value">{vocabularyItems.length}</div>
                <div className="stat-label">Words</div>
              </div>
            )}
            {timeSpent > 0 && (
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{formatTime(timeSpent)}</div>
                <div className="stat-label">Time</div>
              </div>
            )}
          </div>

          {/* Vocabulary Summary */}
          {vocabularyItems.length > 0 && (
            <div className="summary-section">
              <h4>📖 Vocabulary Learned</h4>
              <div className="vocabulary-grid">
                {vocabularyItems.map((item, index) => (
                  <div key={index} className="vocabulary-summary-item">
                    <span className="vocab-french">{item.french}</span>
                    <span className="vocab-arrow">→</span>
                    <span className="vocab-english">{item.english}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concepts Summary */}
          {concepts.length > 0 && (
            <div className="summary-section">
              <h4>🎯 Key Concepts</h4>
              <div className="concepts-grid">
                {concepts.map((concept, index) => (
                  <div key={index} className="concept-summary-card">
                    <div className="concept-term">{concept.term}</div>
                    <div className="concept-definition">{concept.definition}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {showNextButton && (
            <button className="btn-primary btn-large" onClick={onNextModule}>
              Continue to Next Module →
            </button>
          )}
          <button
            className={showNextButton ? "btn-secondary" : "btn-primary"}
            onClick={onBackToModules}
          >
            Back to Modules
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModuleCompleteModal;


