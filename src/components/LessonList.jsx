import { calculateLessonProgress } from '../lessons/testRunner';
import { unitStructure } from '../lessons/lessonData';
import { Award, BookOpen, PenLine } from 'lucide-react';

function LessonList({ lessons, onLessonSelect, completedExercises }) {
  // Group lessons by pedagogical unit
  const getLessonsForUnit = (unitInfo) => {
    const [start, end] = unitInfo.lessonRange;
    return lessons.filter(lesson => lesson.id >= start && lesson.id <= end);
  };

  const getUnitProgress = (unitInfo) => {
    const unitLessons = getLessonsForUnit(unitInfo);
    const completedLessons = unitLessons.filter(lesson => {
      const completed = lesson.exercises.filter(ex =>
        completedExercises.has(ex.id)
      ).length;
      return completed === lesson.exercises.length;
    }).length;
    return { completed: completedLessons, total: unitLessons.length };
  };

  return (
    <div className="lesson-list">
      <div className="lesson-list-header">
        <h2>Choose Your Lesson</h2>
        <p>Each unit ends with a reading comprehension milestone</p>
      </div>

      {unitStructure.map((unitInfo) => {
        const unitLessons = getLessonsForUnit(unitInfo);
        const { completed, total } = getUnitProgress(unitInfo);
        const unitComplete = completed === total;

        return (
          <div key={unitInfo.id} className="unit-section">
            <div className="unit-header">
              <div className="unit-icon">{unitInfo.icon}</div>
              <div className="unit-content">
                <div className="unit-title-row">
                  <h3 className="unit-title">{unitInfo.title}</h3>
                  {unitComplete && <span className="unit-badge-complete">✓ Complete</span>}
                </div>
                <p className="unit-description">{unitInfo.description}</p>
                <div className="unit-progress">
                  <div className="unit-progress-bar">
                    <div
                      className="unit-progress-fill"
                      style={{
                        width: `${(completed / total) * 100}%`,
                        background: unitInfo.color
                      }}
                    ></div>
                  </div>
                  <span className="unit-progress-text">{completed}/{total} lessons complete</span>
                </div>
              </div>
            </div>

            <div className="lessons-grid">
              {unitLessons.map((lesson) => {
                const completed = lesson.exercises.filter(ex =>
                  completedExercises.has(ex.id)
                ).length;
                const total = lesson.exercises.length;
                const progress = calculateLessonProgress(completed, total);
                const isComplete = progress === 100;

                return (
                  <div
                    key={lesson.id}
                    className={`lesson-card ${isComplete ? 'complete' : ''} ${lesson.isReadingComprehension ? 'reading-milestone' : ''} ${lesson.isUnitExam ? 'final-exam' : ''} ${lesson.isFillInTheBlank ? 'fill-in-blank' : ''}`}
                    onClick={() => onLessonSelect(lesson.id)}
                  >
                    <div className="lesson-card-header">
                      {lesson.isUnitExam && (
                        <Award size={20} className="lesson-exam-icon" />
                      )}
                      {lesson.isReadingComprehension && (
                        <BookOpen size={20} className="lesson-reading-icon" />
                      )}
                      {lesson.isFillInTheBlank && (
                        <PenLine size={20} className="lesson-practice-icon" />
                      )}
                      <h3>{lesson.title}</h3>
                      {isComplete && <span className="badge-complete">✓</span>}
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
                        {completed}/{total} exercises
                      </span>
                    </div>

                    {lesson.concepts.length > 0 && (
                      <div className="lesson-concepts">
                        <strong>Concepts:</strong>
                        <ul>
                          {lesson.concepts.slice(0, 2).map((concept, idx) => (
                            <li key={idx}>{concept.term}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LessonList;


