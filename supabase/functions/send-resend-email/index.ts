// Send Email via Resend - Production-safe with graceful failure
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const isResendConfigured = !!RESEND_API_KEY;

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  email_type: string;
  user_id?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // SAFE JSON PARSING
    let requestData: EmailRequest;
    try {
      const text = await req.text();
      console.log("Request body:", text);
      requestData = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { to, subject, html, email_type, user_id, metadata = {} } = requestData;

    // GRACEFUL CHECK 1: Is Resend configured?
    if (!isResendConfigured) {
      console.log(`Resend not configured - skipping ${email_type} email to ${to}`);
      
      // Log the skip
      if (user_id) {
        await supabaseAdmin.from("email_logs").insert({
          user_id,
          email_type,
          recipient_email: to,
          subject,
          sent_at: new Date().toISOString(),
          status: "skipped",
          provider: "resend",
          failure_reason: "resend_not_configured",
          metadata
        });
      }

      return new Response(
        JSON.stringify({ 
          success: false,
          skipped: true,
          reason: "resend_not_configured" 
        }),
        { 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // GRACEFUL CHECK 2: Check user preferences (if user_id provided)
    if (user_id) {
      const { data: prefs } = await supabaseAdmin
        .from("notification_preferences")
        .select("email_enabled")
        .eq("user_id", user_id)
        .single();

      if (prefs && !prefs.email_enabled) {
        console.log(`User ${user_id} has emails disabled - skipping ${email_type}`);
        
        await supabaseAdmin.from("email_logs").insert({
          user_id,
          email_type,
          recipient_email: to,
          subject,
          sent_at: new Date().toISOString(),
          status: "skipped",
          provider: "resend",
          failure_reason: "user_opted_out",
          metadata
        });

        return new Response(
          JSON.stringify({ success: false, reason: "user_opted_out" }),
          { 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            } 
          }
        );
      }
    }

    // SEND EMAIL via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY!}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Language Academy <support@languageacademy.io>",
        to: to, // String, not array
        subject: subject,
        html: html,
        headers: {
          "List-Unsubscribe": `<https://languageacademy.io?unsubscribe&type=${email_type}${user_id ? '&user=' + user_id : ''}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
        }
      })
    });

    const resendData = await resendResponse.json();

    // Log the send attempt
    if (user_id) {
      await supabaseAdmin.from("email_logs").insert({
        user_id,
        email_type,
        recipient_email: to,
        subject,
        sent_at: new Date().toISOString(),
        status: resendResponse.ok ? "delivered" : "failed",
        provider: "resend",
        provider_response: resendData,
        failure_reason: resendResponse.ok ? null : "resend_api_error",
        metadata
      });
    }

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: resendData,
          reason: "resend_api_error"
        }),
        { status: resendResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        email_id: resendData.id
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );

  } catch (error) {
    console.error("Error in send-resend-email:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        reason: "unexpected_error"
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );
  }
});

