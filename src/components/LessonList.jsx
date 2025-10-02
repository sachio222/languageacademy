import { calculateLessonProgress } from '../lessons/testRunner';

function LessonList({ lessons, onLessonSelect, completedExercises }) {
  return (
    <div className="lesson-list">
      <div className="lesson-list-header">
        <h2>Choose Your Module</h2>
        <p>Complete exercises in order to unlock the next module</p>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson) => {
          const completed = lesson.exercises.filter(ex =>
            completedExercises.has(ex.id)
          ).length;
          const total = lesson.exercises.length;
          const progress = calculateLessonProgress(completed, total);
          const isComplete = progress === 100;

          return (
            <div
              key={lesson.id}
              className={`lesson-card ${isComplete ? 'complete' : ''}`}
              onClick={() => onLessonSelect(lesson.id)}
            >
              <div className="lesson-card-header">
                <h3>{lesson.title}</h3>
                {isComplete && <span className="badge-complete">✓ Complete</span>}
              </div>

              <p className="lesson-description">{lesson.description}</p>

              <div className="lesson-stats">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="progress-text">
                  {completed}/{total} exercises completed
                </span>
              </div>

              <div className="lesson-concepts">
                <strong>Concepts:</strong>
                <ul>
                  {lesson.concepts.slice(0, 2).map((concept, idx) => (
                    <li key={idx}>{concept.term}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LessonList;


