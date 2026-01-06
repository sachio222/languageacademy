/**
 * Secure Pronunciation Assessment Service
 * Uses backend API proxy to keep Azure keys secure
 */

import { logger } from "../utils/logger";
import { azureConfig } from "../config/azureConfig";

/**
 * Assess pronunciation using secure backend proxy
 *
 * @param {Blob} audioBlob - Recorded audio blob
 * @param {string} referenceText - The expected text (what they should say)
 * @returns {Promise<Object>} Assessment results with scores and phoneme-level feedback
 */
export const assessPronunciation = async (audioBlob, referenceText) => {
  try {
    logger.log("Starting pronunciation assessment (secure)", {
      referenceText,
      audioSize: audioBlob.size,
    });

    // Convert blob to base64 for API transmission (browser-compatible)
    const audioBuffer = await audioBlob.arrayBuffer();
    const bytes = new Uint8Array(audioBuffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const audioBase64 = btoa(binary);

    // Call Supabase Edge Function
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(
      `${supabaseUrl}/functions/v1/pronunciation-assessment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          audioData: audioBase64,
          referenceText: referenceText,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Log full error details for debugging
      logger.error("API Error Details:", result);
      throw new Error(result.message || result.error || "API request failed");
    }

    if (result.success) {
      logger.log("Pronunciation assessment complete", {
        accuracyScore: result.scores.accuracy,
        pronunciationScore: result.scores.pronunciation,
      });

      return {
        success: true,
        recognizedText: result.recognizedText,
        scores: result.scores,
        words: parseWordResults(result.words),
        phonemes: parsePhonemeResults(result.words),
        feedback: generateFeedback(result.scores, result.words),
      };
    } else {
      return result; // Return error from backend
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
 * Parse word-level results
 */
const parseWordResults = (words) => {
  try {
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
 * Parse phoneme-level results
 */
const parsePhonemeResults = (words) => {
  try {
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
 * Generate human-readable feedback
 */
const generateFeedback = (scores, words) => {
  const score = scores.pronunciation;
  const thresholds = azureConfig.pronunciationAssessment.thresholds;

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

  // Add specific tips
  try {
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

    if (scores.fluency < 60) {
      feedback.tips.push(
        "Try speaking at a more natural pace, not too fast or slow."
      );
    }

    if (scores.completeness < 80) {
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
 * Test microphone access
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
  const thresholds = azureConfig.pronunciationAssessment.thresholds;

  if (score >= thresholds.excellent) return "#10B981"; // green
  if (score >= thresholds.good) return "#84CC16"; // light green
  if (score >= thresholds.okay) return "#F59E0B"; // yellow
  return "#EF4444"; // red
};

/**
 * Get score label based on thresholds
 */
export const getScoreLabel = (score) => {
  const thresholds = azureConfig.pronunciationAssessment.thresholds;

  if (score >= thresholds.excellent) return "Excellent";
  if (score >= thresholds.good) return "Very Good";
  if (score >= thresholds.okay) return "Good";
  return "Needs Practice";
};


