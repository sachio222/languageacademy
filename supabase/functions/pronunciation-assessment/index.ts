// Pronunciation Assessment via Azure Speech Service
// Supabase Edge Function - keeps API keys secure server-side
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const AZURE_SPEECH_KEY = Deno.env.get("AZURE_SPEECH_KEY");
const AZURE_REGION = Deno.env.get("AZURE_SPEECH_REGION") || "eastus";

interface AssessmentRequest {
  audioData: string; // base64 encoded audio
  referenceText: string; // Expected pronunciation
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Parse request
    const { audioData, referenceText }: AssessmentRequest = await req.json();

    if (!audioData || !referenceText) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: audioData and referenceText",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Check Azure configuration
    if (!AZURE_SPEECH_KEY) {
      console.error("Azure Speech Service not configured");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Azure Speech Service not configured on server",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Call Azure Speech Service REST API
    const endpoint = `https://${AZURE_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;

    // Build pronunciation assessment parameters
    const params = new URLSearchParams({
      language: "fr-FR",
      format: "detailed",
    });

    // Decode base64 audio
    const audioBytes = Uint8Array.from(atob(audioData), (c) => c.charCodeAt(0));

    // Create pronunciation assessment config as BASE64 encoded JSON (per Azure docs)
    const pronAssessmentConfig = {
      ReferenceText: referenceText,
      GradingSystem: "HundredMark",
      Granularity: "Phoneme",
      Dimension: "Comprehensive",
      EnableMiscue: "True",
      EnableProsodyAssessment: "True",
    };

    const pronAssessmentJson = JSON.stringify(pronAssessmentConfig);
    const pronAssessmentBase64 = btoa(pronAssessmentJson);

    console.log("Calling Azure API:", {
      endpoint: `${endpoint}?${params}`,
      audioSize: audioBytes.length,
      referenceText,
      configBase64Length: pronAssessmentBase64.length,
    });

    // Call Azure API - use ogg/opus for webm audio
    const response = await fetch(`${endpoint}?${params}`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
        "Content-Type": "audio/ogg; codecs=opus",
        "Pronunciation-Assessment": pronAssessmentBase64,
        Accept: "application/json",
      },
      body: audioBytes,
    });

    console.log("Azure response status:", response.status);

    const resultText = await response.text();
    console.log("Azure response body:", resultText);

    if (!response.ok) {
      console.error("Azure API error:", resultText);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Azure API error",
          message: `Azure returned ${response.status}: ${resultText}`,
          details: resultText,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const result = JSON.parse(resultText);

    // Parse pronunciation assessment from response
    const nbest = result.NBest?.[0];
    if (!nbest) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "no_speech",
          message: "No speech detected. Please try speaking louder.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const assessment = nbest.PronunciationAssessment;

    return new Response(
      JSON.stringify({
        success: true,
        recognizedText: result.DisplayText || nbest.Display,
        scores: {
          accuracy: assessment?.AccuracyScore || 0,
          pronunciation: assessment?.PronScore || 0,
          completeness: assessment?.CompletenessScore || 0,
          fluency: assessment?.FluencyScore || 0,
          prosody: assessment?.ProsodyScore || null,
        },
        words: nbest.Words || [],
        detailedResult: result,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Pronunciation assessment error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "assessment_error",
        message: error.message || "An error occurred during assessment",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});



