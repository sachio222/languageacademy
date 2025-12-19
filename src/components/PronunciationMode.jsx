import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Volume2, Play, RotateCcw, ChevronRight, AlertCircle } from 'lucide-react';
import { usePageTime } from '../hooks/usePageTime';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import { logger } from '../utils/logger';
import { splitTitle } from '../utils/moduleUtils';
import { useSpeech } from '../hooks/useSpeech';
import {
  assessPronunciation,
  testMicrophone,
  getScoreColor,
} from '../services/pronunciationService';
import {
  detectSyllables,
  getPhonemeTip,
  getEncouragingMessage,
  mapPhonemesToSyllables,
  needsImprovement,
} from '../utils/pronunciationUtils';
import SpeakButton from './SpeakButton';
import '../styles/PronunciationMode.css';

/**
 * Pronunciation Mode - World-Class Design
 * Combines best practices from Rosetta Stone, Duolingo, Babbel
 */

function PronunciationMode({ lesson, onFinishPronunciation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [userAudioBlob, setUserAudioBlob] = useState(null);
  const [microphoneReady, setMicrophoneReady] = useState(false);
  const [error, setError] = useState(null);
  const [recordingsCount, setRecordingsCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [focusMode, setFocusMode] = useState(null); // { syllable, index }
  const [audioLevel, setAudioLevel] = useState(0);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [showMicModal, setShowMicModal] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const completionCalled = useRef(false);
  const recordingTimerRef = useRef(null);
  const maxRecordingTimerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  const MAX_RECORDING_TIME = 5; // 5 seconds max

  // Use speech hook for high-quality TTS
  const { speak } = useSpeech();

  // Track page time
  const pageId = `pronunciation-${lesson?.moduleKey || 'unknown'}`;
  usePageTime(pageId, true);

  // Section progress tracking
  const { completeSectionProgress } = useSectionProgress();
  const { isAuthenticated } = useSupabaseProgress();

  // Extract moduleId
  const moduleId = lesson ? extractModuleId(lesson) : null;
  const { modulePrefix } = lesson ? splitTitle(lesson.title) : { modulePrefix: null };

  // Get vocabulary list
  const vocabulary = lesson?.vocabularyReference || [];
  const currentWord = vocabulary[currentIndex];

  // Detect syllables for current word
  const syllables = currentWord ? detectSyllables(currentWord.french) : [];

  // Check if this is a multi-word phrase (has spaces)
  const isPhrase = currentWord?.french.includes(' ');

  // Test microphone on mount
  useEffect(() => {
    testMicrophone().then(result => {
      if (result.success) {
        setMicrophoneReady(true);
        result.stream.getTracks().forEach(track => track.stop());
      } else {
        setError(result.message);
        setShowMicModal(true);
      }
    });
  }, []);

  // Auto-complete section
  useEffect(() => {
    const requiredRecordings = Math.ceil(vocabulary.length * 0.8);

    if (recordingsCount >= requiredRecordings && !completionCalled.current && isAuthenticated && moduleId) {
      completionCalled.current = true;

      completeSectionProgress(moduleId, 'pronunciation', {
        recordings_count: recordingsCount,
        total_vocabulary: vocabulary.length,
        completion_method: 'practiced_80_percent'
      });
    }
  }, [recordingsCount, vocabulary.length, isAuthenticated, moduleId, completeSectionProgress]);

  // Visualize audio levels while recording
  const visualizeAudio = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 256;
    microphone.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 255); // 0-1 range
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };

    updateLevel();
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true, // Enable automatic gain control for better volume
        }
      });

      // Visualize audio
      visualizeAudio(stream);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());

        // Stop audio visualization
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        // Validate recording has content (just check size, not time)
        if (audioBlob.size < 2000) {
          logger.warn('Recording too short or empty', {
            size: audioBlob.size
          });
          setError('Recording too short - hold longer and speak clearly');
          setRecordingTime(0);
          return;
        }

        setUserAudioBlob(audioBlob);

        // Show optimistic UI immediately
        setIsAssessing(true);

        // Assess pronunciation
        await handleAssessment(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      setRecordingTime(0);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(t => t + 0.1);
      }, 100);

      // Auto-stop after max time
      maxRecordingTimerRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          stopRecording();
        }
      }, MAX_RECORDING_TIME * 1000);

    } catch (error) {
      logger.error('Error starting recording:', error);
      setError('Microphone access denied');
      setShowMicModal(true);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);

      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (maxRecordingTimerRef.current) {
        clearTimeout(maxRecordingTimerRef.current);
      }
    }
  };

  // Handle pronunciation assessment
  const handleAssessment = async (audioBlob) => {
    try {
      const targetText = focusMode ? focusMode.syllable : currentWord.french;
      const result = await assessPronunciation(audioBlob, targetText);

      if (result.success) {
        logger.log('Assessment SUCCESS - Full Result:', {
          scores: result.scores,
          phonemesCount: result.phonemes?.length || 0,
          wordsCount: result.words?.length || 0,
          recognizedText: result.recognizedText
        });
        setAssessmentResult(result);
        setRecordingsCount(prev => prev + 1);
        setAttemptCount(prev => prev + 1);
        setError(null); // Clear any previous errors
      } else {
        logger.warn('Assessment FAILED:', {
          error: result.error,
          message: result.message
        });
        setError(result.message);
        setAssessmentResult(null);
        setUserAudioBlob(null); // Clear audio so user can try again
      }
    } catch (error) {
      logger.error('Assessment error:', error);
      setError('Assessment failed. Please try again.');
      setAssessmentResult(null);
    } finally {
      setIsAssessing(false);
    }
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
      resetForNewWord();
    } else {
      onFinishPronunciation();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      resetForNewWord();
    }
  };

  const resetForNewWord = () => {
    setAssessmentResult(null);
    setUserAudioBlob(null);
    setError(null);
    setAttemptCount(0);
    setFocusMode(null);
  };

  const handleTryAgain = () => {
    setAssessmentResult(null);
    setUserAudioBlob(null);
    setError(null);
  };

  const handlePracticeSyllable = (syllable, index) => {
    setFocusMode({ syllable, index });
    setAssessmentResult(null);
    setUserAudioBlob(null);
  };

  const handleExitFocusMode = () => {
    setFocusMode(null);
    setAssessmentResult(null);
    setUserAudioBlob(null);
  };

  // Play user's recording
  const playUserRecording = () => {
    if (userAudioBlob) {
      const audio = new Audio(URL.createObjectURL(userAudioBlob));
      audio.volume = 1.0; // Ensure maximum volume
      setIsPlayingBack(true);
      audio.play();
      audio.onended = () => setIsPlayingBack(false);
    }
  };

  const progress = ((currentIndex + 1) / vocabulary.length) * 100;

  // Safety check
  if (!lesson || !vocabulary || vocabulary.length === 0) {
    return (
      <div className="pronunciation-container">
        <div className="pronunciation-mode">
          <div className="pronunciation-header">
            {modulePrefix && <div className="module-prefix">{modulePrefix}</div>}
            <h2>🎤 Pronunciation Practice</h2>
            <p className="pronunciation-description">No vocabulary available.</p>
          </div>
        </div>
      </div>
    );
  }

  // Get syllable results if we have assessment
  const syllableResults = assessmentResult && assessmentResult.phonemes
    ? mapPhonemesToSyllables(assessmentResult.phonemes, syllables, currentWord.french)
    : syllables.map(s => ({ text: s, score: null, phonemes: [] }));

  const overallScore = assessmentResult?.scores?.pronunciation || null;
  const hasResults = assessmentResult && !isAssessing;

  // Detect device/browser for mic instructions
  const getMicInstructions = () => {
    const ua = navigator.userAgent;
    const isMac = /Mac/.test(ua);
    const isWindows = /Win/.test(ua);
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isChrome = /Chrome/.test(ua) && !/Edge/.test(ua);
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
    const isFirefox = /Firefox/.test(ua);

    if (isIOS) {
      return {
        device: 'iPhone/iPad',
        steps: [
          'Go to Settings > Safari > Camera & Microphone',
          'Set to "Ask" or "Allow"',
          'Reload this page and tap "Allow" when prompted'
        ]
      };
    } else if (isAndroid) {
      return {
        device: 'Android',
        steps: [
          'Tap the lock/info icon in the address bar',
          'Find "Microphone" permissions',
          'Set to "Allow"',
          'Reload this page'
        ]
      };
    } else if (isSafari && isMac) {
      return {
        device: 'Safari on Mac',
        steps: [
          'Click Safari > Settings for This Website',
          'Find "Microphone" and set to "Allow"',
          'Or: System Settings > Privacy & Security > Microphone',
          'Enable for Safari, then reload this page'
        ]
      };
    } else if (isChrome) {
      return {
        device: 'Chrome',
        steps: [
          'Click the camera/microphone icon in the address bar',
          'Select "Always allow"',
          'Click "Done" and reload this page'
        ]
      };
    } else if (isFirefox) {
      return {
        device: 'Firefox',
        steps: [
          'Click the microphone icon in the address bar',
          'Select "Allow" from the dropdown',
          'Reload this page'
        ]
      };
    } else {
      return {
        device: 'Your Browser',
        steps: [
          'Look for a microphone or permissions icon in your address bar',
          'Set microphone permissions to "Allow"',
          'Reload this page'
        ]
      };
    }
  };

  const micInstructions = getMicInstructions();

  return (
    <div className="pronunciation-container">
      {/* Microphone Permission Modal */}
      {showMicModal && (
        <div className="modal-overlay" onClick={() => setShowMicModal(false)}>
          <div className="modal-content mic-permission-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🎤 Microphone Access Required</h2>
            <p>To practice pronunciation, we need access to your microphone.</p>

            <div className="mic-instructions">
              <h3>Enable Microphone on {micInstructions.device}:</h3>
              <ol>
                {micInstructions.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  setShowMicModal(false);
                  // Try again
                  testMicrophone().then(result => {
                    if (result.success) {
                      setMicrophoneReady(true);
                      setError(null);
                      result.stream.getTracks().forEach(track => track.stop());
                    }
                  });
                }}
              >
                Try Again
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowMicModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pronunciation-mode">
        {/* Header */}
        <div className="pronunciation-header">
          {modulePrefix && <div className="module-prefix">{modulePrefix}</div>}
          <h2>🎤 Pronunciation Practice</h2>
          <p className="pronunciation-description">
            {focusMode
              ? `Focus practice: "${focusMode.syllable}"`
              : 'Say the word and get instant feedback'}
          </p>
          <div className="pronunciation-progress-container">
            <div className="pronunciation-progress-bar">
              <div
                className="pronunciation-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="pronunciation-counter">
              {currentIndex + 1}/{vocabulary.length}
            </span>
          </div>
        </div>

        {/* Main Content - Syllable-Centered */}
        <div className="pronunciation-content">
          {/* Navigation + Syllables Layout */}
          <div className="syllables-nav-layout">
            {/* Syllables - The Main Focus */}
            <div className="syllables-wrapper">
              <div className={`syllables-container ${isPhrase ? 'is-phrase' : ''}`}>
                {syllableResults.map((syllable, idx) => (
                  <button
                    key={idx}
                    className={`syllable-card ${isAssessing ? 'analyzing' : ''} ${syllable.score !== null ? 'has-result' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(syllable.text, 'fr-FR');
                    }}
                    title={`Click to hear "${syllable.text}"`}
                  >
                    {/* Syllable Text */}
                    <span
                      className="syllable-text"
                      style={{
                        color: syllable.score !== null ? getScoreColor(syllable.score) : '#1a1a1a'
                      }}
                    >
                      {syllable.text}
                    </span>

                    {/* Result or Analyzing State */}
                    {isAssessing && (
                      <div className="syllable-analyzing">
                        <div className="pulse-dot" style={{ animationDelay: `${idx * 0.15}s` }} />
                      </div>
                    )}

                    {syllable.score !== null && !isAssessing && (
                      <span
                        className="syllable-score-badge"
                        style={{
                          color: getScoreColor(syllable.score)
                        }}
                      >
                        {Math.round(syllable.score)}%
                      </span>
                    )}
                  </button>
                ))}
                {/* Speaker button for full word */}
                <SpeakButton
                  text={currentWord.french}
                  language="fr-FR"
                  size="large"
                  className="pronunciation-word-speaker"
                />
              </div>
            </div>
          </div>

          {/* Waveform - Directly Below Syllables */}
          <div className="waveform-wrapper">
            <button
              className="waveform-display"
              onClick={userAudioBlob ? playUserRecording : undefined}
              disabled={!userAudioBlob}
              style={{ cursor: userAudioBlob ? 'pointer' : 'default' }}
            >
              <div className="waveform">
                {[...Array(20)].map((_, i) => {
                  // Create sinus wave pattern for static display
                  const sinusHeight = 40 + Math.sin((i / 20) * Math.PI * 2) * 20;
                  const height = isRecording
                    ? `${30 + Math.random() * 60 * audioLevel}%`
                    : userAudioBlob
                      ? `${sinusHeight}%`
                      : '10%';

                  return (
                    <div
                      key={i}
                      className={`waveform-bar ${isRecording || userAudioBlob ? 'active' : ''} ${isRecording || isPlayingBack ? 'animating' : ''}`}
                      style={{
                        height,
                        animationDelay: `${i * 0.03}s`
                      }}
                    />
                  );
                })}
              </div>
            </button>
          </div>

          {/* Try Again - Only if any syllable is poor */}
          {hasResults && syllableResults.some(s => s.score !== null && needsImprovement(s.score)) && (
            <div className="try-again-inline">
              <button className="btn-try-again-inline" onClick={handleTryAgain}>
                <RotateCcw size={14} />
                Try again
              </button>
            </div>
          )}

          {/* Recording Button - Below Waveform */}
          {!hasResults && (
            <button
              className={`btn-record-hold ${isRecording ? 'recording' : ''}`}
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={isRecording ? stopRecording : undefined}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              disabled={!microphoneReady || isAssessing}
            >
              <div className="recording-circle-small">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="2"
                  />
                  {isRecording && (
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 175.929,
                        strokeDashoffset: 175.929 * (1 - recordingTime / MAX_RECORDING_TIME),
                        transform: 'rotate(-90deg)',
                        transformOrigin: '32px 32px',
                        transition: 'stroke-dashoffset 0.1s linear'
                      }}
                    />
                  )}
                </svg>
                <div className="circle-content-small">
                  <Mic size={18} className={`mic-icon ${isRecording ? 'active' : ''}`} />
                  {isRecording && (
                    <span className="timer-small">{recordingTime.toFixed(1)}s</span>
                  )}
                </div>
              </div>
              <span className="record-label">
                {isRecording ? 'Recording...' : 'Hold to record'}
              </span>
            </button>
          )}

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Results - Below Recording Area */}
          {hasResults && (
            <div className="results-section">
              {/* Overall Feedback Banner First */}
              <div className={`overall-feedback ${overallScore >= 80 ? 'success' : overallScore >= 60 ? 'okay' : 'needs-work'}`}>
                <span className="feedback-text">
                  {getEncouragingMessage(overallScore, syllableResults, attemptCount)}
                </span>
              </div>

              {/* Centered Next Button Second */}
              <div className="result-main-action">
                <button className="btn-next-main" onClick={handleNext}>
                  {overallScore >= 70 ? 'Next Word' : 'Skip Word'}
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Context Info - Below Next Word Button */}
              <div className="word-context">
                <div className="word-context-header">Definition</div>
                <div className="word-english">{currentWord.english}</div>
                {currentWord.note && (
                  <div className="word-note">{currentWord.note}</div>
                )}
              </div>

              {/* Problem Tips - If Any */}
              {syllableResults.some(s => s.score !== null && needsImprovement(s.score)) && (
                <div className="problem-tips-section">
                  {syllableResults
                    .filter(s => s.score !== null && needsImprovement(s.score))
                    .map((syllable, idx) => {
                      const worstPhoneme = syllable.phonemes
                        .filter(p => needsImprovement(p.accuracy))
                        .sort((a, b) => a.accuracy - b.accuracy)[0];

                      if (!worstPhoneme) return null;

                      const tip = getPhonemeTip(worstPhoneme.phoneme);

                      // Only show tip if it's not the generic fallback
                      if (tip.tip === "Practice this sound") return null;

                      return (
                        <div key={idx} className="tip-card">
                          <div className="tip-syllable-name">{syllable.text}</div>
                          <div className="tip-content">
                            <strong>{tip.name}:</strong> {tip.tip}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PronunciationMode;
