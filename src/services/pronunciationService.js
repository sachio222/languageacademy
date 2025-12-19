/**
 * Pronunciation Assessment Service
 * Handles Azure Speech Service integration for pronunciation feedback
 */

import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { logger } from "../utils/logger";
import { convertWebmToWav } from "../utils/audioConverter";

// Token cache to avoid repeated requests
let cachedToken = null;
let tokenExpiry = null;

/**
 * Get Azure Speech authorization token from backend
 * Token is valid for 10 minutes and cached
 */
const getAuthToken = async () => {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-speech-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get authorization token");
    }

    const data = await response.json();

    // Cache token (expires in 10 minutes, refresh 30s early)
    cachedToken = { token: data.token, region: data.region };
    tokenExpiry = Date.now() + (data.expiresIn - 30) * 1000;

    return cachedToken;
  } catch (error) {
    logger.error("Error getting auth token:", error);
    throw error;
  }
};

/**
 * Assess pronunciation using Azure Speech Service
 * Uses token-based auth (official secure pattern)
 *
 * @param {Blob} audioBlob - Recorded audio blob
 * @param {string} referenceText - The expected text (what they should say)
 * @returns {Promise<Object>} Assessment results with scores and phoneme-level feedback
 */
export const assessPronunciation = async (audioBlob, referenceText) => {
  // Get authorization token from backend
  const authConfig = await getAuthToken();

  try {
    logger.log("Starting pronunciation assessment", {
      referenceText,
      audioSize: audioBlob.size,
    });

    // Convert webm to WAV (Azure SDK requires WAV format)
    const wavBlob = await convertWebmToWav(audioBlob);
    const audioBuffer = await wavBlob.arrayBuffer();

    // Create speech config with authorization token (NOT subscription key)
    const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(
      authConfig.token,
      authConfig.region
    );
    speechConfig.speechRecognitionLanguage = "fr-FR";

    // Create pronunciation assessment config
    const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
      referenceText,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true // Enable miscue calculation
    );

    // Enable prosody assessment
    pronunciationConfig.enableProsodyAssessment = true;

    // Create audio config from the recorded audio
    const audioConfig = sdk.AudioConfig.fromWavFileInput(
      new File([audioBuffer], "audio.wav")
    );

    // Create speech recognizer
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // Apply pronunciation assessment config
    pronunciationConfig.applyTo(recognizer);

    // Perform recognition and assessment
    const result = await new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        (result) => {
          recognizer.close();
          resolve(result);
        },
        (error) => {
          recognizer.close();
          reject(error);
        }
      );
    });

    logger.log("Azure recognition result:", {
      reason: result.reason,
      text: result.text,
    });

    // Check if recognition was successful
    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
      const assessmentResult =
        sdk.PronunciationAssessmentResult.fromResult(result);

      logger.log("Pronunciation assessment complete", {
        accuracyScore: assessmentResult.accuracyScore,
        pronunciationScore: assessmentResult.pronunciationScore,
        completenessScore: assessmentResult.completenessScore,
        fluencyScore: assessmentResult.fluencyScore,
      });

      // Parse detailed results from JSON
      const detailedResult = JSON.parse(
        result.properties.getProperty(
          sdk.PropertyId.SpeechServiceResponse_JsonResult
        )
      );

      // Validate the assessment result
      const recognizedText = result.text.trim();
      const isPunctuation = /^[.,!?;:\-_]+$/.test(recognizedText);
      const hasValidScore = assessmentResult.pronunciationScore > 0;
      const hasMinimalCompleteness = assessmentResult.completenessScore > 10;

      // Reject invalid assessments (e.g., when user said wrong word or gibberish)
      if (isPunctuation || !hasValidScore || !hasMinimalCompleteness) {
        logger.warn("Invalid assessment detected", {
          recognizedText,
          isPunctuation,
          hasValidScore,
          hasMinimalCompleteness,
          expected: referenceText,
        });
        return {
          success: false,
          error: "wrong_word",
          message: `We couldn't understand that. Please try saying "${referenceText}" clearly.`,
        };
      }

      return {
        success: true,
        recognizedText: result.text,
        scores: {
          accuracy: assessmentResult.accuracyScore,
          pronunciation: assessmentResult.pronunciationScore,
          completeness: assessmentResult.completenessScore,
          fluency: assessmentResult.fluencyScore,
          prosody: assessmentResult.prosodyScore || null,
        },
        words: parseWordResults(detailedResult),
        phonemes: parsePhonemeResults(detailedResult),
        feedback: generateFeedback(assessmentResult, detailedResult),
      };
    } else if (result.reason === sdk.ResultReason.NoMatch) {
      logger.warn("No speech recognized");
      return {
        success: false,
        error: "no_speech",
        message:
          "No speech detected. Please try speaking louder and closer to the microphone.",
      };
    } else {
      logger.error("Recognition failed:", result.errorDetails);
      return {
        success: false,
        error: "recognition_failed",
        message:
          result.errorDetails || "Speech recognition failed. Please try again.",
      };
    }
  } catch (error) {
    logger.error("Pronunciation assessment error:", error);
    return {
      success: false,
      error: "assessment_error",
      message:
        error.message ||
        "An error occurred during assessment. Please try again.",
    };
  }
};

/**
 * Parse word-level results from Azure response
 */
const parseWordResults = (detailedResult) => {
  try {
    const words = detailedResult?.NBest?.[0]?.Words || [];
    return words.map((word) => ({
      word: word.Word,
      accuracy: word.PronunciationAssessment?.AccuracyScore || 0,
      errorType: word.PronunciationAssessment?.ErrorType || "None",
      offset: word.Offset,
      duration: word.Duration,
    }));
  } catch (error) {
    logger.error("Error parsing word results:", error);
    return [];
  }
};

/**
 * Parse phoneme-level results from Azure response
 */
const parsePhonemeResults = (detailedResult) => {
  try {
    const words = detailedResult?.NBest?.[0]?.Words || [];
    const allPhonemes = [];

    words.forEach((word) => {
      const phonemes = word.Phonemes || [];
      phonemes.forEach((phoneme) => {
        allPhonemes.push({
          phoneme: phoneme.Phoneme,
          accuracy: phoneme.PronunciationAssessment?.AccuracyScore || 0,
          word: word.Word,
          offset: phoneme.Offset,
          duration: phoneme.Duration,
        });
      });
    });

    return allPhonemes;
  } catch (error) {
    logger.error("Error parsing phoneme results:", error);
    return [];
  }
};

/**
 * Generate human-readable feedback based on assessment results
 */
const generateFeedback = (assessmentResult, detailedResult) => {
  const score = assessmentResult.pronunciationScore;
  const thresholds = {
    excellent: 90,
    good: 75,
    okay: 60,
    poor: 0,
  };

  const feedback = {
    overall: "",
    level: "",
    tips: [],
  };

  // Overall feedback based on score
  if (score >= thresholds.excellent) {
    feedback.overall = "Excellent! Your pronunciation sounds native-like.";
    feedback.level = "excellent";
  } else if (score >= thresholds.good) {
    feedback.overall =
      "Very good! Your pronunciation is clear and understandable.";
    feedback.level = "good";
  } else if (score >= thresholds.okay) {
    feedback.overall = "Good effort! Keep practicing to improve clarity.";
    feedback.level = "okay";
  } else {
    feedback.overall =
      "Keep practicing! Focus on the sounds highlighted below.";
    feedback.level = "poor";
  }

  // Add specific tips based on detailed results
  try {
    const words = detailedResult?.NBest?.[0]?.Words || [];
    const problemWords = words.filter(
      (w) => (w.PronunciationAssessment?.AccuracyScore || 0) < 60
    );

    if (problemWords.length > 0) {
      feedback.tips.push(
        `Pay special attention to: ${problemWords
          .map((w) => w.Word)
          .join(", ")}`
      );
    }

    // Fluency feedback
    if (assessmentResult.fluencyScore < 60) {
      feedback.tips.push(
        "Try speaking at a more natural pace, not too fast or slow."
      );
    }

    // Completeness feedback
    if (assessmentResult.completenessScore < 80) {
      feedback.tips.push(
        "Make sure to pronounce all parts of the word clearly."
      );
    }
  } catch (error) {
    logger.error("Error generating tips:", error);
  }

  return feedback;
};

/**
 * Test microphone access and return audio stream
 */
export const testMicrophone = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    logger.log("Microphone access granted");
    return { success: true, stream };
  } catch (error) {
    logger.error("Microphone access denied:", error);
    return {
      success: false,
      error: "microphone_denied",
      message:
        "Microphone access denied. Please allow microphone access to use pronunciation practice.",
    };
  }
};

/**
 * Get score color based on thresholds
 */
export const getScoreColor = (score) => {
  const thresholds = {
    excellent: 90,
    good: 75,
    okay: 60,
    poor: 0,
  };

  if (score >= thresholds.excellent) return "#10B981"; // green
  if (score >= thresholds.good) return "#84CC16"; // light green
  if (score >= thresholds.okay) return "#F59E0B"; // yellow
  return "#EF4444"; // red
};

/**
 * Get score label based on thresholds
 */
export const getScoreLabel = (score) => {
  const thresholds = {
    excellent: 90,
    good: 75,
    okay: 60,
    poor: 0,
  };

  if (score >= thresholds.excellent) return "Excellent";
  if (score >= thresholds.good) return "Very Good";
  if (score >= thresholds.okay) return "Good";
  return "Needs Practice";
};
