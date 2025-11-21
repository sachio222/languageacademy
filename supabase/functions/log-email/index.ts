// Log Email to Database - For n8n workflows
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface EmailLogRequest {
  user_id?: string;
  email_type: string;
  recipient_email: string;
  subject?: string;
  sent_at?: string;
  status: string; // 'delivered', 'failed', 'skipped'
  provider?: string; // 'resend' or 'mailerlite'
  metadata?: Record<string, any>;
  queue_id?: string;
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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed. Use POST." }),
      { 
        status: 405, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );
  }

  // Initialize Supabase client
  let supabaseAdmin;
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Server configuration error",
          reason: "missing_env_vars"
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

    supabaseAdmin = createClient(supabaseUrl, supabaseKey);
  } catch (initError) {
    console.error("Failed to initialize Supabase client:", initError);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to initialize database connection",
        reason: "init_error"
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

  try {
    // Parse request body
    let logData: EmailLogRequest;
    try {
      const text = await req.text();
      console.log("Log email request:", text);
      logData = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!logData.email_type || !logData.recipient_email || !logData.status) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields: email_type, recipient_email, and status are required",
          received: { 
            hasEmailType: !!logData.email_type,
            hasRecipientEmail: !!logData.recipient_email,
            hasStatus: !!logData.status
          }
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // Prepare insert data
    const insertData: any = {
      user_id: logData.user_id || null,
      email_type: logData.email_type,
      recipient_email: logData.recipient_email,
      subject: logData.subject || null,
      sent_at: logData.sent_at || new Date().toISOString(),
      status: logData.status,
      provider: logData.provider || 'resend',
      metadata: logData.metadata || {},
      queue_id: logData.queue_id || null,
    };

    // Insert into email_logs
    const { data, error } = await supabaseAdmin
      .from("email_logs")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message,
          reason: "database_error"
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

    return new Response(
      JSON.stringify({ 
        success: true,
        id: data.id,
        message: "Email logged successfully"
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );

  } catch (error) {
    console.error("Error in log-email:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unexpected error",
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




