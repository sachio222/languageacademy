/**
 * Azure Speech Service Configuration
 *
 * Set up your Azure credentials as environment variables:
 * - VITE_AZURE_SPEECH_KEY: Your Azure Speech Service subscription key
 * - VITE_AZURE_SPEECH_REGION: Your Azure region (e.g., 'eastus', 'westus2')
 *
 * To get credentials:
 * 1. Go to https://portal.azure.com
 * 2. Create a Speech Service resource
 * 3. Copy the key and region from "Keys and Endpoint"
 */

export const azureConfig = {
  // Azure Speech Service credentials
  subscriptionKey: import.meta.env.VITE_AZURE_SPEECH_KEY || "",
  region: import.meta.env.VITE_AZURE_SPEECH_REGION || "eastus",

  // Language configuration for French pronunciation
  language: "fr-FR",

  // Pronunciation assessment configuration
  pronunciationAssessment: {
    // Assessment granularity: Phoneme (most detailed), Word, or FullText
    granularity: "Phoneme",

    // Dimension: Comprehensive (all metrics), Accuracy, Fluency, Completeness, or Prosody
    dimension: "Comprehensive",

    // Enable prosody (intonation, stress, rhythm) assessment
    enableProsody: true,

    // Enable miscue detection (omissions, insertions, mispronunciations)
    enableMiscue: true,

    // Score thresholds for visual feedback
    thresholds: {
      excellent: 90, // Green - native-like
      good: 75, // Light green - very good
      okay: 60, // Yellow - needs practice
      poor: 0, // Red - needs work
    },
  },
};

/**
 * Check if Azure is properly configured
 */
export const isAzureConfigured = () => {
  return !!(azureConfig.subscriptionKey && azureConfig.region);
};

/**
 * Get configuration error message if not configured
 */
export const getConfigError = () => {
  if (!azureConfig.subscriptionKey) {
    return "Azure Speech Service key not configured. Please set VITE_AZURE_SPEECH_KEY environment variable.";
  }
  if (!azureConfig.region) {
    return "Azure region not configured. Please set VITE_AZURE_SPEECH_REGION environment variable.";
  }
  return null;
};

