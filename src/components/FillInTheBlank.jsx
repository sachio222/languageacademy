/**
 * Fill In The Blank - Typeform-style interactive sentence completion
 * Users fill in blanks one sentence at a time with a clean, centered UI
 */
import { useState, useRef, useEffect } from 'react';
import { checkAnswer } from '../linter/frenchLinter';
import FrenchCharacterPicker from './FrenchCharacterPicker';
import '../styles/FillInTheBlank.css';

function FillInTheBlank({ module, onComplete }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [isCorrect, setIsCorrect] = useState({});
  const [showResults, setShowResults] = useState(false);
  const inputRefs = useRef({});

  const sentences = module.sentences || [];
  const currentSentence = sentences[currentSentenceIndex];
  const isLastSentence = currentSentenceIndex === sentences.length - 1;

  // Calculate score by sentence (not by blank)
  const sentenceResults = sentences.map((sentence, idx) => {
    // Check if ALL blanks in this sentence are correct
    return sentence.blanks.every((blank, blankIdx) => {
      const key = `${idx}-${blankIdx}`;
      return isCorrect[key] === true;
    });
  });

  const correctCount = sentenceResults.filter(Boolean).length;
  const totalCount = sentences.length;
  const score = totalCount > 0 ? correctCount / totalCount : 0;
  const passed = score >= 0.8;

  useEffect(() => {
    // Focus first blank when sentence loads
    if (currentSentence?.blanks?.[0]) {
      const firstBlankKey = `${currentSentenceIndex}-0`;
      setTimeout(() => {
        inputRefs.current[firstBlankKey]?.focus();
      }, 100);
    }
  }, [currentSentenceIndex, currentSentence]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyboardNav = (e) => {
      // Don't interfere if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      if (e.key === 'ArrowLeft' && currentSentenceIndex > 0) {
        e.preventDefault();
        setCurrentSentenceIndex(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && currentSentenceIndex < sentences.length - 1) {
        e.preventDefault();
        setCurrentSentenceIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyboardNav);
    return () => window.removeEventListener('keydown', handleKeyboardNav);
  }, [currentSentenceIndex, sentences.length]);

  const handleAnswerChange = (sentenceIdx, blankIdx, value) => {
    const key = `${sentenceIdx}-${blankIdx}`;
    setAnswers(prev => ({ ...prev, [key]: value }));

    // Clear feedback AND isCorrect when user starts typing again
    if (feedback[key]) {
      setFeedback(prev => ({ ...prev, [key]: null }));
      setIsCorrect(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const handleCheckAnswer = () => {
    if (!currentSentence) return;

    // Check each blank
    const newFeedback = {};
    const newIsCorrect = {};
    let allCorrect = true;

    currentSentence.blanks.forEach((blank, idx) => {
      const key = `${currentSentenceIndex}-${idx}`;
      const userAnswer = answers[key] || '';

      const result = checkAnswer(userAnswer, blank.answer);

      newFeedback[key] = result.feedback;
      newIsCorrect[key] = result.isMatch;

      if (!result.isMatch) {
        allCorrect = false;
      }
    });

    setFeedback(prev => ({ ...prev, ...newFeedback }));
    setIsCorrect(prev => ({ ...prev, ...newIsCorrect }));

    // If all correct and not last sentence, auto-advance after short delay
    if (allCorrect && !isLastSentence) {
      setTimeout(() => {
        setCurrentSentenceIndex(prev => prev + 1);
      }, 1200);
    } else if (allCorrect && isLastSentence) {
      // Show results
      setTimeout(() => {
        setShowResults(true);
      }, 1200);
    }
  };

  const handleKeyDown = (e, sentenceIdx, blankIdx) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // If this is the last blank, check answer
      if (blankIdx === currentSentence.blanks.length - 1) {
        handleCheckAnswer();
      } else {
        // Move to next blank
        const nextKey = `${sentenceIdx}-${blankIdx + 1}`;
        inputRefs.current[nextKey]?.focus();
      }
    }
  };

  const handleCharacterInsert = (sentenceIdx, blankIdx, char) => {
    const key = `${sentenceIdx}-${blankIdx}`;
    const currentValue = answers[key] || '';
    const input = inputRefs.current[key];

    if (input) {
      const start = input.selectionStart || currentValue.length;
      const end = input.selectionEnd || currentValue.length;
      const newValue = currentValue.slice(0, start) + char + currentValue.slice(end);

      setAnswers(prev => ({ ...prev, [key]: newValue }));

      // Set cursor position after inserted character
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
  };

  const handleRetry = () => {
    setCurrentSentenceIndex(0);
    setAnswers({});
    setFeedback({});
    setIsCorrect({});
    setShowResults(false);
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete(passed);
    }
  };

  const renderSentence = (sentence, sentenceIdx) => {
    const parts = [];
    let lastIndex = 0;

    // Sort blanks by position
    const sortedBlanks = [...sentence.blanks].sort((a, b) => a.position - b.position);

    sortedBlanks.forEach((blank, blankIdx) => {
      // Add text before blank
      if (blank.position > lastIndex) {
        parts.push(
          <span key={`text-${blankIdx}`} className="sentence-text">
            {sentence.text.slice(lastIndex, blank.position)}
          </span>
        );
      }

      // Add blank input
      const key = `${sentenceIdx}-${blankIdx}`;
      const hasAnswer = answers[key] && answers[key].trim().length > 0;
      const inputIsCorrect = isCorrect[key];
      const inputFeedback = feedback[key];

      parts.push(
        <span key={`blank-${blankIdx}`} className="blank-wrapper">
          <input
            ref={el => {
              if (el) {
                inputRefs.current[key] = el;
                el.dataset.lastFocused = 'false';
              }
            }}
            type="text"
            className={`blank-input ${hasAnswer && inputIsCorrect === true ? 'correct' : ''} ${hasAnswer && inputIsCorrect === false ? 'incorrect' : ''}`}
            value={answers[key] || ''}
            onChange={(e) => handleAnswerChange(sentenceIdx, blankIdx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, sentenceIdx, blankIdx)}
            onFocus={(e) => {
              // Mark this input as last focused
              Object.keys(inputRefs.current).forEach(k => {
                if (inputRefs.current[k]) {
                  inputRefs.current[k].dataset.lastFocused = 'false';
                }
              });
              e.target.dataset.lastFocused = 'true';
            }}
            placeholder=""
            autoComplete="off"
            spellCheck="false"
            style={{ width: `${blank.answer.length * 30 + 80}px` }}
          />
          {blank.hint && (
            <span className="blank-hint">({blank.hint})</span>
          )}
          {inputFeedback && (
            <div className={`blank-feedback ${inputIsCorrect ? 'correct' : 'incorrect'}`}>
              {inputIsCorrect ? '✓ Correct!' : `✗ ${inputFeedback}`}
            </div>
          )}
        </span>
      );

      // Move past the blank position - just skip 1 character (the space placeholder)
      lastIndex = blank.position + 1;
    });

    // Add remaining text
    if (lastIndex < sentence.text.length) {
      parts.push(
        <span key="text-end" className="sentence-text">
          {sentence.text.slice(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  if (showResults) {
    return (
      <div className="fill-in-blank-results">
        <div className="results-content">
          <div className="results-score">
            <div className={`score-circle ${passed ? 'pass' : 'fail'}`}>
              {Math.round(score * 100)}%
            </div>
            <h2>{passed ? '🎉 Great Job!' : '📚 Keep Practicing'}</h2>
            <p>
              You got {correctCount} out of {totalCount} sentences correct.
            </p>
            {passed && (
              <p className="pass-message">
                You've mastered these patterns! Ready for the next challenge?
              </p>
            )}
            {!passed && (
              <p className="fail-message">
                Review the material and try again. You need 80% to pass.
              </p>
            )}
          </div>

          <div className="results-actions">
            {!passed && (
              <button className="btn-retry" onClick={handleRetry}>
                🔄 Try Again
              </button>
            )}
            <button
              className={passed ? "btn-continue" : "btn-back"}
              onClick={handleFinish}
            >
              {passed ? 'Continue' : '← Back to Modules'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fill-in-blank-container">
      <div className="fill-in-blank-header">
        <div className="progress-indicator">
          <span className="current-number">{currentSentenceIndex + 1}</span>
          <span className="progress-separator">/</span>
          <span className="total-number">{sentences.length}</span>
        </div>
      </div>

      <div className="question-content">
        {currentSentence && (
          <>
            {/* Top Part: Left Arrow, Sentence, Right Arrow */}
            <div className="top-part">
              <div className="nav-arrow-left">
                {currentSentenceIndex > 0 && (
                  <button
                    className="nav-btn nav-btn-prev"
                    onClick={() => setCurrentSentenceIndex(prev => prev - 1)}
                    aria-label="Previous sentence"
                  >
                    ←
                  </button>
                )}
              </div>

              <div className="sentence-area">
                <div className="sentence-display">
                  {renderSentence(currentSentence, currentSentenceIndex)}
                </div>

                {currentSentence.instruction && (
                  <div className="sentence-instruction">
                    {currentSentence.instruction}
                  </div>
                )}
              </div>

              <div className="nav-arrow-right">
                {currentSentenceIndex < sentences.length - 1 && (
                  <button
                    className="nav-btn nav-btn-next"
                    onClick={() => setCurrentSentenceIndex(prev => prev + 1)}
                    aria-label="Next sentence"
                  >
                    →
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Part: Special Characters */}
            <div className="bottom-part">
              <FrenchCharacterPicker
                onCharacterSelect={(char) => {
                  // Find which input was last focused
                  let targetKey = null;

                  // Check all inputs to find the one that should receive the character
                  for (const key in inputRefs.current) {
                    const input = inputRefs.current[key];
                    if (input && input.dataset.lastFocused === 'true') {
                      targetKey = key;
                      break;
                    }
                  }

                  // If no input was marked, use the first blank of current sentence
                  if (!targetKey) {
                    targetKey = `${currentSentenceIndex}-0`;
                  }

                  const [sentenceIdx, blankIdx] = targetKey.split('-').map(Number);
                  handleCharacterInsert(sentenceIdx, blankIdx, char);
                }}
              />
            </div>
          </>
        )}
      </div>

      <div className="fill-in-blank-actions">
        <button
          className="btn-check-answer"
          onClick={handleCheckAnswer}
        >
          Check Answer
        </button>
      </div>

      <div className="fill-in-blank-hint">
        💡 Press Enter to move to the next blank or check your answer
      </div>
    </div>
  );
}

export default FillInTheBlank;
