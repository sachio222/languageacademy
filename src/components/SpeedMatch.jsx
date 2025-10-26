/**
 * Speed Match - Quick-fire matching game
 * Appears after study mode completion
 */

import { useState, useEffect } from "react";
import { RotateCcw } from 'lucide-react';
import "../styles/SpeedMatch.css";

// Constants
const GAME_CONFIG = {
  TIMER_DURATION: 3000,
  TIMER_INTERVAL: 10,
  AUTO_ADVANCE_DELAY: 1500,
  WRONG_OPTIONS_COUNT: 3,
};

const ANSWER_TYPES = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  EMPTY: 'empty'
};

const GAME_STATES = {
  READY: 'ready',
  PREVIEW: 'preview',
  PLAYING: 'playing',
  CORRECT: 'correct',
  WRONG: 'wrong',
  TIMEUP: 'timeup',
  FINISHED: 'finished'
};

export default function SpeedMatch({ vocabulary, onFinish }) {
  const [gameState, setGameState] = useState(GAME_STATES.READY);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(GAME_CONFIG.TIMER_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const currentWord = vocabulary[currentIndex];
  const [answerOptions, setAnswerOptions] = useState([]);

  // Generate 4 answer options (1 correct + 3 random wrong)
  const generateNewOptions = () => {
    if (!currentWord) return [];

    const wrongAnswers = vocabulary
      .filter((_, idx) => idx !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, GAME_CONFIG.WRONG_OPTIONS_COUNT);

    const allOptions = [currentWord, ...wrongAnswers].sort(
      () => Math.random() - 0.5
    );

    return allOptions;
  };

  // Start game
  const startGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setGameState(GAME_STATES.PREVIEW);
  };

  // Restart to ready screen
  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setGameState(GAME_STATES.READY);
  };

  // Start the actual test after preview
  const startTest = () => {
    setTimer(GAME_CONFIG.TIMER_DURATION);
    setAnswerOptions(generateNewOptions());
    setGameState(GAME_STATES.PLAYING);
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;

    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - GAME_CONFIG.TIMER_INTERVAL), GAME_CONFIG.TIMER_INTERVAL);
      return () => clearTimeout(timeout);
    } else {
      // Time's up!
      setGameState(GAME_STATES.TIMEUP);
      setAnswers([...answers, ANSWER_TYPES.WRONG]);
      // Auto-advance if enabled
      if (autoAdvance) {
        setTimeout(() => nextQuestion(), GAME_CONFIG.AUTO_ADVANCE_DELAY);
      }
    }
  }, [timer, gameState, answers, autoAdvance]);

  // Handle answer selection
  const handleAnswer = (option) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    setSelectedAnswer(option);

    if (option.french === currentWord.french) {
      setGameState(GAME_STATES.CORRECT);
      setScore(score + 1);
      setAnswers([...answers, ANSWER_TYPES.CORRECT]);
    } else {
      setGameState(GAME_STATES.WRONG);
      setAnswers([...answers, ANSWER_TYPES.WRONG]);
    }

    // Auto-advance if enabled, otherwise wait for user to click Next
    if (autoAdvance) {
      setTimeout(() => nextQuestion(), GAME_CONFIG.AUTO_ADVANCE_DELAY);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentIndex + 1 >= vocabulary.length) {
      setGameState(GAME_STATES.FINISHED);
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setGameState(GAME_STATES.PREVIEW);
  };

  const getTimerClass = () => {
    let classes = "speed-match-timer-number";
    if (timer === 0) classes += " timer-danger";
    else if (timer <= 1000) classes += " timer-warning"; // Last 1 second
    else classes += " timer-normal";
    if (timer > 0) classes += " pulse";
    return classes;
  };

  const formatTimer = () => {
    const seconds = Math.floor(timer / 1000);
    const hundredths = Math.floor((timer % 1000) / 10);
    return (
      <>
        <span className="speed-match-timer-integer">{seconds}</span>
        <span className="speed-match-timer-decimal">.{hundredths.toString().padStart(2, '0')}</span>
      </>
    );
  };

  const getOptionClass = (option) => {
    const isSelected = selectedAnswer?.french === option.french;
    const isCorrect = option.french === currentWord?.french;
    const showResult = gameState !== GAME_STATES.PLAYING;

    if (showResult && isCorrect) return "speed-match-option correct";
    if (showResult && !isCorrect) return "speed-match-option wrong";
    if (gameState === GAME_STATES.PLAYING) return "speed-match-option";
    return "speed-match-option disabled";
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < vocabulary.length; i++) {
      const answer = answers[i];
      let starClass = "speed-match-star";

      if (answer === ANSWER_TYPES.CORRECT) {
        starClass += " correct";
      } else if (answer === ANSWER_TYPES.WRONG) {
        starClass += " wrong";
      } else {
        starClass += " empty";
      }

      // Add unique key to trigger animation only on state change
      stars.push(
        <span key={`${i}-${answer || ANSWER_TYPES.EMPTY}`} className={starClass}>
          ★
        </span>
      );
    }
    return stars;
  };

  const isPlayingState = [GAME_STATES.PLAYING, GAME_STATES.CORRECT, GAME_STATES.WRONG, GAME_STATES.TIMEUP].includes(gameState);

  return (
    <div className={`speed-match-container embedded ${isPlayingState ? "playing" : ""}`}>
      <div className="speed-match-intro">
        <button className="btn-back-to-study btn-skip" onClick={() => window.history.back()}>
          ← Back to Study Mode
        </button>
        <button className="btn-skip" onClick={onFinish}>
          Skip Speed Match →
        </button>
      </div>
      <div className="speed-match-content">
        {/* Ready Screen */}
        {gameState === GAME_STATES.READY && (
          <div className="speed-match-ready">


            <div className="speed-match-header">
              <div className="speed-match-stars">
                {renderStars()}
              </div>
              <div className="speed-match-progress">
                0 / {vocabulary.length}
              </div>
            </div>

            <h1>Speed Match</h1>
            <p>Quick-Fire Matching Challenge</p>
            <div className="speed-match-instructions">
              <h2>How to Play</h2>
              <ul>
                <li>You'll see a French word</li>
                <li>Pick the correct English translation from 4 options</li>
                <li>You have 3 seconds per word</li>
                <li>Try to get as many correct as possible!</li>
              </ul>

              <button onClick={startGame} className="speed-match-button">
                Start Game
              </button>

              <div className="speed-match-settings">
                <label className="speed-match-checkbox">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                  />
                  Auto-advance to next question
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Preview Screen - Show word before test */}
        {gameState === GAME_STATES.PREVIEW && (
          <div className="speed-match-preview">
            {/* <div className="speed-match-intro">
              <button className="btn-back-to-study" onClick={() => window.history.back()}>
                ← Back to Study Mode
              </button>
              <button className="btn-skip" onClick={onFinish}>
                Skip Speed Match →
              </button>
            </div> */}

            <div className="speed-match-header">
              <button
                onClick={restartGame}
                className="speed-match-restart"
                title="Restart Game"
              >
                <RotateCcw size={16} /> Restart
              </button>
              <div className="speed-match-header-center">
                <div className="speed-match-stars">
                  {renderStars()}
                </div>
                <div className="speed-match-progress">
                  {score} / {currentIndex + 1}
                </div>
              </div>
              <div></div>
            </div>

            <div className="speed-match-word-card">
              <div className="speed-match-word-label">
                Speed match
              </div>
              <div className="speed-match-word">
                {currentWord?.french}
              </div>
            </div>

            <div className="speed-match-preview-actions">
              <button onClick={startTest} className="speed-match-button">
                Ready
              </button>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {isPlayingState && (
          <div className="speed-match-playing">
            {/* <div className="speed-match-intro">
              <button className="btn-back-to-study" onClick={() => window.history.back()}>
                ← Back to Study Mode
              </button>
              <button className="btn-skip" onClick={onFinish}>
                Skip Speed Match →
              </button>
            </div> */}

            {/* Header */}
            <div className="speed-match-header">
              <button
                onClick={restartGame}
                className="speed-match-restart"
                title="Restart Game"
              >
                <RotateCcw size={16} /> Restart
              </button>
              <div className="speed-match-header-center">
                <div className="speed-match-stars">
                  {renderStars()}
                </div>
                <div className="speed-match-progress">
                  {score} / {currentIndex + 1}
                </div>
              </div>
              <div></div>
            </div>

            {/* Timer / Feedback */}
            <div className="speed-match-timer">
              {gameState === GAME_STATES.PLAYING ? (
                <div className={getTimerClass()}>
                  {formatTimer()}
                </div>
              ) : gameState === GAME_STATES.CORRECT ? (
                <div className="speed-match-feedback-correct">
                  Correct!
                  <div className="speed-match-time">
                    {formatTimer()}
                  </div>
                </div>
              ) : gameState === GAME_STATES.WRONG ? (
                <div className="speed-match-feedback-wrong">
                  Incorrect
                  <div className="speed-match-time">
                    {formatTimer()}
                  </div>
                </div>
              ) : gameState === GAME_STATES.TIMEUP ? (
                <div className="speed-match-feedback-wrong">
                  Time's Up!
                  <div className="speed-match-time">
                    0.00
                  </div>
                </div>
              ) : null}
            </div>

            {/* Answer Grid */}
            <div className="speed-match-grid">
              {answerOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={gameState !== GAME_STATES.PLAYING}
                  className={getOptionClass(option)}
                >
                  {option.englishFull || option.english}
                </button>
              ))}
            </div>

            {/* French Word to Match - Small at bottom */}
            <div className="speed-match-word-card small">
              <div className="speed-match-word-label small">
                Match this word
              </div>
              <div className="speed-match-word small">
                {currentWord?.french}
              </div>
            </div>

            {/* Continue Button */}
            {!autoAdvance && (gameState === GAME_STATES.CORRECT || gameState === GAME_STATES.WRONG || gameState === GAME_STATES.TIMEUP) && (
              <div className="speed-match-continue">
                <button onClick={nextQuestion} className="speed-match-button">
                  Continue
                </button>
              </div>
            )}

          </div>
        )}

        {/* Finished Screen */}
        {gameState === GAME_STATES.FINISHED && (
          <div className="speed-match-finished">
            {/* <div className="speed-match-intro">
              <button className="btn-back-to-study" onClick={() => window.history.back()}>
                ← Back to Study Mode
              </button>
              <button className="btn-skip" onClick={onFinish}>
                Skip Speed Match →
              </button>
            </div> */}

            <h1>Game Complete!</h1>
            <div className="speed-match-results">
              <div className="speed-match-final-score">
                {score} / {vocabulary.length}
              </div>
              <div className="speed-match-message">
                {score === vocabulary.length
                  ? "Perfect score! 🌟"
                  : score >= vocabulary.length * 0.8
                    ? "Great job! 🎉"
                    : score >= vocabulary.length * 0.6
                      ? "Good effort! 👍"
                      : "Keep practicing! 💪"}
              </div>
              <div className="speed-match-accuracy">
                Accuracy: {Math.round((score / vocabulary.length) * 100)}%
              </div>
              <button onClick={startGame} className="speed-match-button">
                Play Again
              </button>
              <button onClick={onFinish} className="speed-match-button-secondary">
                Continue to Practice →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

