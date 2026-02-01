import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotificationRequest {
  type: "email_capture" | "contact_form";
  email: string;
  name?: string;
  venueName?: string;
  venueType?: string;
  message?: string;
}

const NOTIFICATION_EMAIL = "contact@tasklet.uk";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);
    const data: NotificationRequest = await req.json();

    if (!data.email) {
      throw new Error("Email is required");
    }

    let subject: string;
    let htmlContent: string;

    if (data.type === "email_capture") {
      subject = `🔔 New interest from ${data.email}`;
      htmlContent = `
        <h2>Someone dropped their email on Relay</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><em>Submitted via the email capture form on the homepage.</em></p>
      `;
    } else if (data.type === "contact_form") {
      subject = `📩 Demo request from ${data.name || data.email}`;
      htmlContent = `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Venue:</strong> ${data.venueName || "Not provided"}</p>
        <p><strong>Type:</strong> ${data.venueType || "Not provided"}</p>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
      `;
    } else {
      throw new Error("Invalid notification type");
    }

    const emailResponse = await resend.emails.send({
      from: "Relay <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject,
      html: htmlContent,
    });

    console.log("Notification email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
