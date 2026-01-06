// Get Azure Speech Token - Official Secure Pattern
// Returns a short-lived authorization token (10 min expiry)
// Client uses token, NOT subscription key
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const AZURE_SPEECH_KEY = Deno.env.get("AZURE_SPEECH_KEY");
const AZURE_REGION = Deno.env.get("AZURE_SPEECH_REGION") || "eastus";

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    if (!AZURE_SPEECH_KEY) {
      return new Response(
        JSON.stringify({ error: "Azure Speech Service not configured" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Exchange subscription key for authorization token
    // Token expires in 10 minutes
    const tokenEndpoint = `https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;

    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
        "Content-Length": "0",
      },
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token generation failed:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to generate token",
          details: error,
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

    const token = await tokenResponse.text();

    return new Response(
      JSON.stringify({
        token,
        region: AZURE_REGION,
        expiresIn: 600, // 10 minutes in seconds
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
    console.error("Token generation error:", error);
    return new Response(
      JSON.stringify({
        error: "Token generation failed",
        message: error.message,
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



