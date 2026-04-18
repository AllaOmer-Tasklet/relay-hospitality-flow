const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotificationRequest {
  type: "email_capture" | "contact_form" | "audit_request";
  email: string;
  name?: string;
  venueName?: string;
  venueType?: string;
  message?: string;
  monthlyEnquiries?: number;
  businessType?: string;
  estimatedLoss?: number;
}

const NOTIFICATION_EMAIL = "alla@tasklet.uk";

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const data: NotificationRequest = await req.json();

    if (!data.email) {
      throw new Error("Email is required");
    }

    let subject: string;
    let htmlContent: string;

    if (data.type === "email_capture") {
      subject = `🔔 New interest from ${data.email}`;
      htmlContent = `
        <h2>New email capture</h2>
        <p><strong>Email:</strong> ${data.email}</p>
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
    } else if (data.type === "audit_request") {
      subject = `🧮 Audit request from ${data.name || data.email}`;
      htmlContent = `
        <h2>New Audit Request</h2>
        <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Business type:</strong> ${data.businessType || "Not provided"}</p>
        <p><strong>Monthly enquiries:</strong> ${data.monthlyEnquiries ?? "Not provided"}</p>
        <p><strong>Estimated revenue lost:</strong> £${data.estimatedLoss ?? "Not provided"}</p>
      `;
    } else {
      throw new Error("Invalid notification type");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tasklet <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject,
        html: htmlContent,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", result);
      throw new Error(result.message || "Failed to send email");
    }

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
});
