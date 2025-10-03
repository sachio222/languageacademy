import { useState } from 'react';

/**
 * Unit Exam - Comprehensive test covering an entire unit
 * Tests ability to write complete French sentences from scratch
 */
function UnitExam({ unitNumber, onPassExam, onRetryUnit }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  // Unit 1 Exam - Cover lessons 1-9
  const examData = {
    title: "Unit 1: Foundation Exam",
    description: "Test your ability to write basic French sentences",
    passingScore: 0.8, // 80%
    sections: [
      {
        title: "Section 1: Core Foundations",
        subtitle: "Pronouns, être, and avoir",
        questions: [
          {
            id: "1.1",
            prompt: "I am",
            expectedAnswer: "je suis",
            hint: "Use the verb être",
          },
          {
            id: "1.2",
            prompt: "you have (informal)",
            expectedAnswer: "tu as",
            hint: "Use the verb avoir with informal 'you'",
          },
          {
            id: "1.3",
            prompt: "she is",
            expectedAnswer: "elle est",
            hint: "Feminine pronoun + être",
          },
          {
            id: "1.4",
            prompt: "they have (masculine)",
            expectedAnswer: "ils ont",
            hint: "Masculine plural pronoun + avoir",
          },
          {
            id: "1.5",
            prompt: "we are",
            expectedAnswer: "nous sommes",
            hint: "First person plural + être",
          },
          {
            id: "1.6",
            prompt: "I have",
            expectedAnswer: "j'ai",
            hint: "Remember the apostrophe!",
          },
          {
            id: "1.7",
            prompt: "you are (formal)",
            expectedAnswer: "vous êtes",
            hint: "Formal 'you' + être",
          },
          {
            id: "1.8",
            prompt: "he has",
            expectedAnswer: "il a",
            hint: "Masculine singular pronoun + avoir",
          },
        ],
      },
      {
        title: "Section 2: Nouns & Articles",
        subtitle: "Articles, basic nouns, and plurals",
        questions: [
          {
            id: "2.1",
            prompt: "a cat",
            expectedAnswer: "un chat",
            hint: "Indefinite article + noun (masculine)",
          },
          {
            id: "2.2",
            prompt: "the book",
            expectedAnswer: "le livre",
            hint: "Definite article + noun (masculine)",
          },
          {
            id: "2.3",
            prompt: "a woman",
            expectedAnswer: "une femme",
            hint: "Indefinite article (feminine)",
          },
          {
            id: "2.4",
            prompt: "the house",
            expectedAnswer: "la maison",
            hint: "Definite article + noun (feminine)",
          },
          {
            id: "2.5",
            prompt: "the cats",
            expectedAnswer: "les chats",
            hint: "Plural definite article + noun",
          },
          {
            id: "2.6",
            prompt: "some books",
            expectedAnswer: "des livres",
            hint: "Plural indefinite article + noun",
          },
          {
            id: "2.7",
            prompt: "I have a dog",
            expectedAnswer: "j'ai un chien",
            hint: "Combine avoir + indefinite article + noun",
          },
          {
            id: "2.8",
            prompt: "she is a woman",
            expectedAnswer: "elle est une femme",
            hint: "être + indefinite article + noun",
          },
        ],
      },
      {
        title: "Section 3: Connectors & Full Sentences",
        subtitle: "Put it all together with connectors",
        questions: [
          {
            id: "3.1",
            prompt: "a cat and a dog",
            expectedAnswer: "un chat et un chien",
            hint: "Use 'et' (and) to connect two nouns",
          },
          {
            id: "3.2",
            prompt: "I have a book and a cat",
            expectedAnswer: "j'ai un livre et un chat",
            hint: "avoir + noun + et + noun",
          },
          {
            id: "3.3",
            prompt: "he is a man but she is a woman",
            expectedAnswer: "il est un homme mais elle est une femme",
            hint: "Use 'mais' (but) to connect two statements",
          },
          {
            id: "3.4",
            prompt: "we have the books",
            expectedAnswer: "nous avons les livres",
            hint: "nous + avoir + plural noun",
          },
          {
            id: "3.5",
            prompt: "they are the cats",
            expectedAnswer: "ils sont les chats",
            hint: "Masculine plural pronoun + être + plural noun",
          },
          {
            id: "3.6",
            prompt: "you have a house and a dog (informal)",
            expectedAnswer: "tu as une maison et un chien",
            hint: "tu + avoir + noun + et + noun",
          },
          {
            id: "3.7",
            prompt: "I am a man or a woman",
            expectedAnswer: "je suis un homme ou une femme",
            hint: "Use 'ou' (or) to connect two options",
          },
          {
            id: "3.8",
            prompt: "we have the cats and the dogs",
            expectedAnswer: "nous avons les chats et les chiens",
            hint: "nous + avoir + plural noun + et + plural noun",
          },
        ],
      },
    ],
  };

  const currentSectionData = examData.sections[currentSection];
  const allQuestions = examData.sections.flatMap((s) => s.questions);
  const answeredInSection = currentSectionData.questions.filter(
    (q) => answers[q.id]?.trim()
  ).length;
  const totalAnswered = allQuestions.filter((q) => answers[q.id]?.trim()).length;

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const normalizeAnswer = (answer) => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/['']/g, "'"); // Normalize apostrophes
  };

  const handleNextSection = () => {
    if (currentSection < examData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitExam = () => {
    // Grade all answers
    const gradedResults = examData.sections.map((section) => {
      const questionResults = section.questions.map((question) => {
        const userAnswer = normalizeAnswer(answers[question.id] || '');
        const expectedAnswer = normalizeAnswer(question.expectedAnswer);
        const isCorrect = userAnswer === expectedAnswer;

        return {
          question,
          userAnswer: answers[question.id] || '',
          isCorrect,
        };
      });

      const sectionScore = questionResults.filter((r) => r.isCorrect).length;
      return {
        section,
        questionResults,
        sectionScore,
        sectionTotal: section.questions.length,
      };
    });

    const totalCorrect = gradedResults.reduce(
      (sum, s) => sum + s.sectionScore,
      0
    );
    const totalQuestions = allQuestions.length;
    const passed = totalCorrect / totalQuestions >= examData.passingScore;

    setResults({
      gradedResults,
      totalCorrect,
      totalQuestions,
      passed,
      passingScore: Math.ceil(totalQuestions * examData.passingScore),
    });
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted && results) {
    const scorePercentage = Math.round(
      (results.totalCorrect / results.totalQuestions) * 100
    );

    return (
      <div className="unit-exam">
        <div className="exam-results">
          <div className="exam-results-header">
            <h2>📊 {examData.title} - Results</h2>
            <div className={`score ${results.passed ? 'passed' : 'failed'}`}>
              {scorePercentage}%
            </div>
          </div>

          {results.passed ? (
            <div className="exam-passed">
              <div className="exam-message">
                <h3>🎉 Outstanding! You passed the unit exam!</h3>
                <p>
                  You got {results.totalCorrect} out of {results.totalQuestions}{' '}
                  correct.
                </p>
                <p>
                  You've mastered Unit 1: Foundation! You can now form basic French
                  sentences with pronouns, verbs, nouns, and connectors.
                </p>
              </div>
              <button
                className="btn-primary btn-large"
                onClick={() => onPassExam(unitNumber)}
              >
                Continue to Unit 2 →
              </button>
            </div>
          ) : (
            <div className="exam-failed">
              <div className="exam-message">
                <h3>📚 Keep Practicing!</h3>
                <p>
                  You got {results.totalCorrect} out of {results.totalQuestions}{' '}
                  correct.
                </p>
                <p>You need {results.passingScore} correct to pass (80%).</p>
                <p>Review the unit material and try again - you're making progress!</p>
              </div>
              <div className="exam-actions">
                <button className="btn-secondary" onClick={onRetryUnit}>
                  Review Unit Lessons
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                    setCurrentSection(0);
                    setResults(null);
                  }}
                >
                  Retake Exam
                </button>
              </div>
            </div>
          )}

          {/* Section-by-section breakdown */}
          <div className="exam-breakdown">
            <h4>Results by Section:</h4>
            {results.gradedResults.map((sectionResult, sectionIdx) => (
              <div key={sectionIdx} className="section-results">
                <div className="section-results-header">
                  <h5>{sectionResult.section.title}</h5>
                  <span className="section-score">
                    {sectionResult.sectionScore} / {sectionResult.sectionTotal}
                  </span>
                </div>

                {sectionResult.questionResults.map((result, qIdx) => (
                  <div
                    key={qIdx}
                    className={`exam-item ${result.isCorrect ? 'correct' : 'incorrect'
                      }`}
                  >
                    <div className="exam-item-header">
                      <span className="exam-item-number">
                        {result.isCorrect ? '✓' : '✗'}
                      </span>
                      <span className="exam-item-prompt">
                        {result.question.prompt}
                      </span>
                    </div>
                    <div className="exam-item-details">
                      <div>
                        <strong>Your answer:</strong>{' '}
                        {result.userAnswer || '(no answer)'}
                      </div>
                      {!result.isCorrect && (
                        <div className="exam-item-correct">
                          <strong>Correct answer:</strong>{' '}
                          {result.question.expectedAnswer}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const allAnsweredInSection = currentSectionData.questions.every(
    (q) => answers[q.id]?.trim()
  );
  const allAnswered = allQuestions.every((q) => answers[q.id]?.trim());

  return (
    <div className="unit-exam">
      <div className="exam-header">
        <h2>📝 {examData.title}</h2>
        <p className="exam-description">{examData.description}</p>

        {/* Overall progress */}
        <div className="exam-overall-progress">
          <div className="progress-text">
            Overall Progress: {totalAnswered} / {allQuestions.length} answered
          </div>
          <div className="exam-progress-bar">
            <div
              className="exam-progress-fill"
              style={{ width: `${(totalAnswered / allQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section indicator */}
        <div className="section-indicators">
          {examData.sections.map((section, idx) => (
            <div
              key={idx}
              className={`section-indicator ${idx === currentSection ? 'active' : ''
                } ${section.questions.every((q) => answers[q.id]?.trim())
                  ? 'completed'
                  : ''
                }`}
            >
              Section {idx + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="exam-section">
        <div className="section-header">
          <h3>{currentSectionData.title}</h3>
          <p className="section-subtitle">{currentSectionData.subtitle}</p>
          <div className="section-progress">
            {answeredInSection} / {currentSectionData.questions.length} answered
          </div>
        </div>

        <div className="exam-questions">
          {currentSectionData.questions.map((question, idx) => (
            <div key={question.id} className="exam-question-card">
              <div className="question-header">
                <span className="question-number">
                  Question {idx + 1}
                  {answers[question.id]?.trim() && (
                    <span className="answered-check">✓</span>
                  )}
                </span>
              </div>

              <div className="question-prompt">
                <strong>Translate to French:</strong> {question.prompt}
              </div>

              <div className="answer-input">
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Type your French answer here..."
                  className={answers[question.id]?.trim() ? 'answered' : ''}
                />
              </div>

              {question.hint && (
                <div className="question-hint">
                  <strong>💡 Hint:</strong> {question.hint}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!allAnsweredInSection && currentSection < examData.sections.length - 1 && (
        <div className="exam-warning">
          ⚠️ Please answer all questions in this section before continuing
        </div>
      )}

      {!allAnswered && currentSection === examData.sections.length - 1 && (
        <div className="exam-warning">
          ⚠️ Please answer all questions in all sections before submitting
        </div>
      )}

      <div className="exam-navigation">
        <button
          className="btn-nav"
          onClick={handlePreviousSection}
          disabled={currentSection === 0}
        >
          ← Previous Section
        </button>

        <div className="exam-nav-center">
          Section {currentSection + 1} of {examData.sections.length}
        </div>

        {currentSection === examData.sections.length - 1 ? (
          <button
            className="btn-primary btn-submit"
            onClick={handleSubmitExam}
            disabled={!allAnswered}
          >
            Submit Exam
          </button>
        ) : (
          <button
            className="btn-nav"
            onClick={handleNextSection}
            disabled={!allAnsweredInSection}
          >
            Next Section →
          </button>
        )}
      </div>
    </div>
  );
}

export default UnitExam;

