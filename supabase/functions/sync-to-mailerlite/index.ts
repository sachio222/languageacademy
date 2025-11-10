// Sync to MailerLite - Simple webhook to add/update subscribers
// This is the ONLY Edge Function needed for the email system

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERLITE_API_KEY = Deno.env.get("MAILERLITE_API_KEY");

interface SyncRequest {
  event: string;
  user_id: string;
  email: string;
  name?: string;
  metadata?: {
    group?: string;
    modules_completed?: number;
    current_unit?: number;
    timezone?: string;
    [key: string]: any;
  };
}

serve(async (req) => {
  try {
    // Check if MailerLite is configured
    if (!MAILERLITE_API_KEY) {
      console.log("MAILERLITE_API_KEY not configured - skipping sync");
      return new Response(
        JSON.stringify({ 
          success: true,
          skipped: true,
          reason: "mailerlite_not_configured" 
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    const { event, user_id, email, name, metadata = {} }: SyncRequest = await req.json();

    console.log(`Syncing user to MailerLite: ${email} (${event})`);

    // Prepare subscriber data
    const subscriberData: any = {
      email: email,
      fields: {
        user_id: user_id,
        last_event: event,
        ...metadata
      }
    };

    // Add name if provided
    if (name) {
      subscriberData.fields.name = name;
    }

    // Add to group if specified
    if (metadata.group) {
      subscriberData.groups = [metadata.group];
    }

    // Add or update subscriber in MailerLite
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(subscriberData)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("MailerLite API error:", result);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: result,
          status: response.status
        }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully synced ${email} to MailerLite`);

    return new Response(
      JSON.stringify({ 
        success: true,
        subscriber_id: result.data?.id,
        event: event
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error syncing to MailerLite:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

