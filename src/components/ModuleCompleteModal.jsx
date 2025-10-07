import '../styles/ModuleCompleteModal.css';

function ModuleCompleteModal({ lesson, onNextModule, onBackToModules, onTakeExam, totalModules }) {
  if (!lesson) return null;

  const hasNextModule = lesson.id < totalModules;
  const vocabularyItems = lesson.vocabularyReference || [];
  const concepts = lesson.concepts || [];

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
            {concepts.length > 0 && (
              <div className="stat-card">
                <div className="stat-icon">💡</div>
                <div className="stat-value">{concepts.length}</div>
                <div className="stat-label">Concepts</div>
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
          {/* Practice Exam Button - especially useful for reference modules */}
          {lesson.exercises && lesson.exercises.length > 0 && onTakeExam && (
            <button className="btn-secondary btn-large" onClick={onTakeExam}>
              📝 Take Practice Exam
            </button>
          )}
          {hasNextModule && (
            <button className="btn-primary btn-large" onClick={onNextModule}>
              Continue to Next Module →
            </button>
          )}
          <button
            className={hasNextModule ? "btn-secondary" : "btn-primary"}
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


