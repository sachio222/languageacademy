import { useState, useRef, useEffect } from 'react';
import { checkAnswer } from '../linter/frenchLinter';
import FrenchCharacterPicker from './FrenchCharacterPicker';
import { Award } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId, extractUnitId } from '../utils/progressSync';

/**
 * Unit Exam - Comprehensive test covering an entire unit
 * Tests ability to write complete French sentences from scratch
 */
function UnitExam({ lesson, unitNumber, onPassExam, onRetryUnit }) {
  const { isAuthenticated, supabaseUser, supabaseClient } = useAuth();
  const supabaseProgress = useSupabaseProgress();
  // Helper to get initial section index from URL (1-based to 0-based) with validation
  const getInitialSectionIndex = () => {
    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get('section');
    if (sectionParam) {
      const sectionNum = parseInt(sectionParam, 10);
      // Note: examData is built below, so we can't validate max here yet
      // Will validate in the popstate handler instead
      if (!isNaN(sectionNum) && sectionNum >= 1) {
        return sectionNum - 1; // Convert 1-based to 0-based
      }
      // Invalid section - clear from URL
      if (isNaN(sectionNum) || sectionNum < 1) {
        const url = new URL(window.location);
        url.searchParams.delete('section');
        window.history.replaceState({}, '', url);
      }
    }
    return 0;
  };

  const [currentSection, setCurrentSection] = useState(getInitialSectionIndex);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [completionCalled, setCompletionCalled] = useState(false);
  const inputRefs = useRef({});

  // Mark exam complete in database when passed (without navigating)
  useEffect(() => {
    const markComplete = async () => {
      if (results && results.passed && !completionCalled && isAuthenticated && supabaseProgress && lesson) {
        console.log('[DEBUG] Marking unit exam complete in database');
        setCompletionCalled(true);

        try {
          const moduleId = extractModuleId(lesson);
          const actualExerciseCount = lesson.exercises?.length || lesson.exerciseConfig?.items?.length || 0;

          await supabaseProgress.updateModuleProgress(
            moduleId,
            unitNumber.toString(),
            actualExerciseCount,
            actualExerciseCount,
            true, // studyCompleted
            Math.round((results.totalCorrect / results.totalQuestions) * 100), // examScore
            0 // timeSpent (can be improved later)
          );

          console.log('[DEBUG] Unit exam marked complete in database');
        } catch (error) {
          console.error('Error marking unit exam complete:', error);
        }
      }
    };

    markComplete();
  }, [results, completionCalled, isAuthenticated, supabaseProgress, lesson, unitNumber]);

  // Use lesson exercises if provided (Units 2+), otherwise use hardcoded Unit 1
  const examData = lesson ? {
    title: lesson.title,
    description: lesson.description,
    passingScore: 0.8, // 80%
    sections: [
      {
        title: `Unit ${unitNumber} Comprehensive Test`,
        subtitle: "All concepts from this unit",
        questions: lesson.exercises.map(ex => ({
          id: ex.id,
          prompt: ex.prompt,
          expectedAnswer: ex.expectedAnswer,
          hint: ex.hint,
          acceptableAnswers: ex.acceptableAnswers || [],
        })),
      },
    ],
  } : {
    // Fallback: Unit 1 Exam - Cover lessons 1-9
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
            prompt: "you are a woman (informal)",
            expectedAnswer: "tu es une femme",
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
            prompt: "I am a man but she is a woman",
            expectedAnswer: "je suis un homme mais tu es une femme",
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

  // Helper to update section index in URL (0-based to 1-based)
  const updateSectionInUrl = (sectionIndex) => {
    const url = new URL(window.location);
    const sectionNum = sectionIndex + 1; // Convert 0-based to 1-based
    url.searchParams.set('section', sectionNum);
    window.history.pushState({}, '', url);
  };

  // Validate initial section index once examData is available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get('section');
    if (sectionParam) {
      const sectionNum = parseInt(sectionParam, 10);
      // If section is out of bounds, reset to 0
      if (sectionNum > examData.sections.length || sectionNum < 1) {
        setCurrentSection(0);
        const url = new URL(window.location);
        url.searchParams.delete('section');
        window.history.replaceState({}, '', url);
      }
    }
  }, []); // Run once on mount

  // Handle browser back/forward navigation with validation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      if (sectionParam) {
        const sectionNum = parseInt(sectionParam, 10);
        if (!isNaN(sectionNum) && sectionNum >= 1 && sectionNum <= examData.sections.length) {
          setCurrentSection(sectionNum - 1); // Convert 1-based to 0-based
        } else {
          // Invalid section - reset to 0
          setCurrentSection(0);
          const url = new URL(window.location);
          url.searchParams.delete('section');
          window.history.replaceState({}, '', url);
        }
      } else {
        setCurrentSection(0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [examData.sections.length]);

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
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      updateSectionInUrl(newSection);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      const newSection = currentSection - 1;
      setCurrentSection(newSection);
      updateSectionInUrl(newSection);
      window.scrollTo(0, 0);
    }
  };

  const handleKeyDown = (e, currentQuestionId) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Find the next unanswered question in the current section
      const currentSectionData = examData.sections[currentSection];
      const currentQuestionIndex = currentSectionData.questions.findIndex(q => q.id === currentQuestionId);

      // Look for next unanswered question in current section
      let nextQuestionIndex = -1;
      for (let i = currentQuestionIndex + 1; i < currentSectionData.questions.length; i++) {
        if (!answers[currentSectionData.questions[i].id]?.trim()) {
          nextQuestionIndex = i;
          break;
        }
      }

      // If no unanswered question found after current, look from beginning of section
      if (nextQuestionIndex === -1) {
        for (let i = 0; i < currentQuestionIndex; i++) {
          if (!answers[currentSectionData.questions[i].id]?.trim()) {
            nextQuestionIndex = i;
            break;
          }
        }
      }

      // If found an unanswered question, scroll to it
      if (nextQuestionIndex !== -1) {
        const nextQuestionId = currentSectionData.questions[nextQuestionIndex].id;
        const nextInput = inputRefs.current[nextQuestionId];
        if (nextInput) {
          nextInput.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          setTimeout(() => nextInput.focus(), 300); // Focus after scroll completes
        }
      } else {
        // All questions in current section are answered, move to next section if available
        if (currentSection < examData.sections.length - 1) {
          handleNextSection();
        }
      }
    }
  };

  const handleSubmitExam = () => {
    // Grade all answers
    const gradedResults = examData.sections.map((section) => {
      const questionResults = section.questions.map((question) => {
        const userAnswer = answers[question.id] || '';
        const matchResult = checkAnswer(userAnswer, question.expectedAnswer, {
          caseSensitive: false,
          exactMatch: false,
        });

        return {
          question,
          userAnswer: userAnswer,
          isCorrect: matchResult.isMatch,
          hasAccentWarning: matchResult.hasAccentWarning,
          warningMessage: matchResult.warningMessage,
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
                  You've mastered Unit {unitNumber}! Ready for the next challenge.
                </p>
              </div>
              <button
                className="btn-primary btn-large"
                onClick={() => onPassExam(unitNumber)}
              >
                Continue to Unit {unitNumber + 1} →
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
                  onClick={async () => {
                    // Reset local state
                    setSubmitted(false);
                    setAnswers({});
                    setCurrentSection(0);
                    setResults(null);
                    setCompletionCalled(false);
                    updateSectionInUrl(0);

                    // Reset completion status in database
                    if (isAuthenticated && supabaseProgress && lesson) {
                      try {
                        console.log('[DEBUG] Resetting unit exam completion in database');
                        const moduleId = extractModuleId(lesson);
                        const unitInfo = { id: unitNumber }; // Create minimal unitInfo

                        // Clear the completion by setting completed_at to null
                        await supabaseProgress.updateModuleProgress(
                          moduleId,
                          unitNumber.toString(),
                          0, // totalExercises
                          0, // completedCount  
                          false, // studyCompleted
                          null, // examScore (null = not completed)
                          0 // timeSpent
                        );

                        console.log('[DEBUG] Unit exam completion cleared from database');
                      } catch (error) {
                        console.error('Error resetting unit exam completion:', error);
                      }
                    }
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
                      {result.hasAccentWarning && (
                        <div className="exam-item-warning">
                          {result.warningMessage}
                        </div>
                      )}
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
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={24} style={{ color: '#f59e0b' }} />
          {examData.title}
        </h2>
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
                    <span className="answered-check">✓ answered</span>
                  )}
                </span>
              </div>

              <div className="question-prompt">
                <strong>Translate to French:</strong> {question.prompt}
              </div>

              <div className="answer-input">
                <input
                  ref={(el) => inputRefs.current[question.id] = el}
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, question.id)}
                  placeholder="Type your French answer here..."
                  className={answers[question.id]?.trim() ? 'answered' : ''}
                />
                <FrenchCharacterPicker
                  inputRef={{ current: inputRefs.current[question.id] }}
                  onCharacterClick={(value) => handleAnswerChange(question.id, value)}
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

