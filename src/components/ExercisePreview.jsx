import '../styles/ExercisePreview.css'

function ExercisePreview() {
  return (
    <div className="exercise-preview-container">
      <div className="exercise-preview-header">
        <div className="preview-badge">How it works</div>
        <h3>Composition in action</h3>
        <p>
          Build sentences from building blocks. Instant feedback guides you to fluency.
        </p>
      </div>

      <div className="exercise-card-isometric">
        <div className="exercise-prompt">
          <span className="prompt-label">Complete:</span>
          <span className="prompt-text">'I do my work tomorrow'</span>
        </div>

        <div className="sentence-display">
          <span className="sentence-text">Je </span>
          <span className="blank-wrapper">
            <span className="blank-input">fais</span>
            <span className="blank-hint">(faire for je)</span>
          </span>
          <span className="sentence-text"> mon travail </span>
          <span className="blank-wrapper">
            <span className="blank-input">demain</span>
            <span className="blank-hint">(tomorrow)</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ExercisePreview

